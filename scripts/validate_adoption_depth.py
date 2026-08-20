#!/usr/bin/env python3
"""Validate canonical adoption-depth observations and their source integrity."""

from __future__ import annotations

import argparse
import csv
import re
import sys
from collections import defaultdict
from decimal import Decimal, InvalidOperation
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OBSERVATIONS = ROOT / "data" / "observations" / "adoption_depth.csv"
DEFAULT_SOURCE_REGISTER = ROOT / "data" / "sources" / "source_register.csv"

REQUIRED_COLUMNS = [
    "observation_id",
    "geography",
    "period",
    "panel",
    "measure",
    "value",
    "unit",
    "denominator",
    "survey_universe",
    "source_id",
    "evidence_label",
    "comparability_class",
    "definition",
    "caveat",
    "last_verified",
]

ALLOWED_EVIDENCE_LABELS = {
    "observed",
    "official-claim",
    "qualitative-coded",
    "estimated",
}
ALLOWED_COMPARABILITY_CLASSES = {
    "directly-comparable",
    "within-source-only",
    "not-directly-comparable",
    "context-only",
}
DIRECT_COMPARABILITY_CLASSES = {"directly-comparable", "within-source-only"}

MISSING_VALUES = {"", "missing", "n/a", "na", "none", "null", "unknown"}
FALSE_VALUES = {"false", "no", "0"}
REQUIRED_VALUE_COLUMNS = [
    column for column in REQUIRED_COLUMNS if column not in {"caveat"}
]
RESTRICTED_SOURCE_FAMILIES = {"ecb", "eurostat", "btos"}


class AdoptionDepthValidationError(ValueError):
    """Raised when one or more adoption-depth integrity checks fail."""

    def __init__(self, errors: list[str]):
        self.errors = tuple(errors)
        super().__init__("\n".join(errors))


def _read_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    try:
        with path.open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            return list(reader.fieldnames or []), list(reader)
    except FileNotFoundError as exc:
        raise AdoptionDepthValidationError([f"{path}: file not found"]) from exc


def _is_missing(value: str | None) -> bool:
    return value is None or value.strip().lower() in MISSING_VALUES


def _normalise_phrase(value: str | None) -> str:
    return " ".join((value or "").strip().lower().split())


def _row_text(row: dict[str, str]) -> str:
    return " ".join(
        row.get(column) or ""
        for column in (
            "period",
            "panel",
            "measure",
            "denominator",
            "survey_universe",
            "definition",
            "caveat",
        )
    ).lower()


def _detect_named_source_family(searchable: str) -> str | None:
    if (
        "eurostat" in searchable
        or "isoc_eb_ai" in searchable
        or "isoc-eb-ai" in searchable
    ):
        return "eurostat"
    if (
        "business trends and outlook survey" in searchable
        or re.search(r"\bbtos\b", searchable)
        or "census bureau" in searchable
        or "u.s. census" in searchable
        or "us census" in searchable
    ):
        return "btos"
    if (
        "european central bank" in searchable
        or re.search(r"\becb\b", searchable)
        or "survey on the access to finance" in searchable
        or re.search(r"\bsafe\b", searchable)
    ):
        return "ecb"

    return None


def _source_family(source: dict[str, str], row: dict[str, str]) -> str:
    source_text = " ".join(
        [
            source.get("source_id") or "",
            source.get("title_original") or "",
            source.get("title_english") or "",
            source.get("authors_org") or "",
            source.get("url_or_doi") or "",
        ]
    ).lower()
    family = _detect_named_source_family(source_text)
    if family is not None:
        return family

    family = _detect_named_source_family(_row_text(row))
    if family is not None:
        return family

    return f"source:{(source.get('source_id') or 'unknown').strip()}"


def _question_frame(row: dict[str, str], source_family: str) -> str:
    """Return a coarse question frame without conflating response categories."""

    text = _row_text(row)
    if source_family == "ecb":
        if any(token in text for token in ("investment", "expenditure", "spending plan")):
            return "ecb-ai-investment"
        return "ecb-safe-ai-use-intensity"

    if source_family == "eurostat":
        if any(token in text for token in ("investment", "expenditure", "productivity")):
            return "eurostat-non-adoption-measure"
        return "eurostat-listed-ai-technology-use"

    if source_family == "btos":
        if "produce goods or services" in text or "production of goods or services" in text:
            return "btos-pre-november-2025-production-use"
        if any(
            token in text
            for token in (
                "business function",
                "business functions",
                "comprehensive adopter",
                "comprehensive adoption",
            )
        ):
            return "btos-post-november-2025-business-functions"

    return f"{source_family}:{_normalise_phrase(row.get('panel'))}"


def _btos_vintages(row: dict[str, str]) -> set[str]:
    """Classify whether a BTOS row is before or after the November 2025 wording break."""

    period = _normalise_phrase(row.get("period")).replace("–", "-").replace("—", "-")
    text = _row_text(row)
    vintages: set[str] = set()

    years = {int(year) for year in re.findall(r"\b20\d{2}\b", period)}
    if any(year <= 2024 for year in years):
        vintages.add("pre-november-2025")
    if any(year >= 2026 for year in years):
        vintages.add("post-november-2025")

    for month in re.findall(r"\b2025-(\d{2})\b", period):
        month_number = int(month)
        vintages.add(
            "pre-november-2025" if month_number <= 10 else "post-november-2025"
        )

    if re.search(r"\b2025\s+q[1-3]\b|\bq[1-3]\s+2025\b", period):
        vintages.add("pre-november-2025")
    if re.search(r"\b2025\s+q4\b|\bq4\s+2025\b", period):
        # Q4 crosses the November wording change and cannot be one continuous BTOS row.
        vintages.update({"pre-november-2025", "post-november-2025"})

    pre_months = (
        "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|"
        "jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?"
    )
    post_months = "nov(?:ember)?|dec(?:ember)?"
    if re.search(rf"\b(?:{pre_months})\s+2025\b", period):
        vintages.add("pre-november-2025")
    if re.search(rf"\b(?:{post_months})\s+2025\b", period):
        vintages.add("post-november-2025")

    if "produce goods or services" in text or "production of goods or services" in text:
        vintages.add("pre-november-2025")
    if "business function" in text or "business functions" in text:
        vintages.add("post-november-2025")

    return vintages


def _format_lines(contexts: list[dict[str, object]]) -> str:
    return ", ".join(str(context["line_number"]) for context in contexts)


def validate(
    observation_path: Path = DEFAULT_OBSERVATIONS,
    source_register_path: Path = DEFAULT_SOURCE_REGISTER,
) -> list[dict[str, str]]:
    """Validate the observation file and return its rows when all checks pass."""

    fieldnames, rows = _read_rows(observation_path)
    _, source_rows = _read_rows(source_register_path)
    errors: list[str] = []

    if fieldnames != REQUIRED_COLUMNS:
        errors.append(
            f"{observation_path}: header must exactly match the 15-column adoption-depth "
            f"schema; expected {REQUIRED_COLUMNS!r}, got {fieldnames!r}"
        )

    if not rows:
        errors.append(f"{observation_path}: at least one observation row is required")

    sources: dict[str, dict[str, str]] = {}
    duplicate_source_ids: set[str] = set()
    for source in source_rows:
        source_id = (source.get("source_id") or "").strip()
        if source_id in sources:
            duplicate_source_ids.add(source_id)
        elif source_id:
            sources[source_id] = source
    for source_id in sorted(duplicate_source_ids):
        errors.append(
            f"{source_register_path}: duplicate canonical source_id {source_id!r}"
        )

    seen_observation_ids: dict[str, int] = {}
    contexts: list[dict[str, object]] = []

    for line_number, raw_row in enumerate(rows, start=2):
        row = {
            column: (raw_row.get(column) or "").strip() for column in REQUIRED_COLUMNS
        }

        for column in REQUIRED_VALUE_COLUMNS:
            if _is_missing(row.get(column)):
                errors.append(
                    f"{observation_path}:{line_number}: {column} must not be missing"
                )

        observation_id = row["observation_id"]
        if not _is_missing(observation_id):
            if observation_id in seen_observation_ids:
                errors.append(
                    f"{observation_path}:{line_number}: duplicate observation_id "
                    f"{observation_id!r}; first seen on line "
                    f"{seen_observation_ids[observation_id]}"
                )
            else:
                seen_observation_ids[observation_id] = line_number

        value = row["value"]
        if not _is_missing(value):
            try:
                numeric_value = Decimal(value)
                if not numeric_value.is_finite():
                    raise InvalidOperation
            except InvalidOperation:
                errors.append(
                    f"{observation_path}:{line_number}: value must be a finite number; "
                    f"got {value!r}"
                )

        evidence_label = row["evidence_label"]
        if evidence_label not in ALLOWED_EVIDENCE_LABELS:
            errors.append(
                f"{observation_path}:{line_number}: evidence_label must be one of "
                f"{', '.join(sorted(ALLOWED_EVIDENCE_LABELS))}; got {evidence_label!r}"
            )

        comparability_class = row["comparability_class"]
        if comparability_class not in ALLOWED_COMPARABILITY_CLASSES:
            errors.append(
                f"{observation_path}:{line_number}: comparability_class must be one of "
                f"{', '.join(sorted(ALLOWED_COMPARABILITY_CLASSES))}; "
                f"got {comparability_class!r}"
            )

        source_id = row["source_id"]
        source = sources.get(source_id)
        if source is None:
            if not _is_missing(source_id):
                errors.append(
                    f"{observation_path}:{line_number}: source_id {source_id!r} does not "
                    "exist in the canonical source register"
                )
            continue

        review_status = (source.get("review_status") or "").strip().lower()
        if review_status != "reviewed":
            errors.append(
                f"{observation_path}:{line_number}: source_id {source_id!r} must have "
                f"review_status 'reviewed'; got {review_status!r}"
            )
        placeholder = (source.get("placeholder") or "").strip().lower()
        if placeholder not in FALSE_VALUES:
            errors.append(
                f"{observation_path}:{line_number}: source_id {source_id!r} must be a "
                "non-placeholder canonical source"
            )

        family = _source_family(source, row)
        contexts.append(
            {
                "line_number": line_number,
                "row": row,
                "family": family,
                "question_frame": _question_frame(row, family),
                "btos_vintages": _btos_vintages(row) if family == "btos" else set(),
            }
        )

    by_panel: dict[str, list[dict[str, object]]] = defaultdict(list)
    for context in contexts:
        row = context["row"]
        assert isinstance(row, dict)
        by_panel[_normalise_phrase(row.get("panel"))].append(context)

    for panel, panel_contexts in by_panel.items():
        comparable = [
            context
            for context in panel_contexts
            if isinstance(context["row"], dict)
            and context["row"].get("comparability_class")
            in DIRECT_COMPARABILITY_CLASSES
        ]
        if len(comparable) > 1:
            families = {str(context["family"]) for context in comparable}
            if len(families) > 1 and families & RESTRICTED_SOURCE_FAMILIES:
                errors.append(
                    f"{observation_path}: panel {panel!r} marks rows "
                    f"{_format_lines(comparable)} directly comparable across source "
                    f"families {', '.join(sorted(families))}"
                )

            for column, description in (
                ("denominator", "denominators"),
                ("survey_universe", "survey universes"),
                ("period", "periods/waves"),
            ):
                values = {
                    _normalise_phrase(context["row"].get(column))
                    for context in comparable
                    if isinstance(context["row"], dict)
                }
                if len(values) > 1:
                    errors.append(
                        f"{observation_path}: panel {panel!r} marks rows "
                        f"{_format_lines(comparable)} directly comparable despite "
                        f"incompatible {description}: {', '.join(sorted(values))}"
                    )

            question_frames = {
                str(context["question_frame"]) for context in comparable
            }
            if len(question_frames) > 1:
                errors.append(
                    f"{observation_path}: panel {panel!r} marks rows "
                    f"{_format_lines(comparable)} directly comparable despite "
                    f"incompatible question frames: {', '.join(sorted(question_frames))}"
                )

        btos_contexts = [
            context for context in panel_contexts if context["family"] == "btos"
        ]
        if btos_contexts:
            vintages: set[str] = set()
            for context in btos_contexts:
                context_vintages = context["btos_vintages"]
                assert isinstance(context_vintages, set)
                vintages.update(context_vintages)
            if {"pre-november-2025", "post-november-2025"}.issubset(vintages):
                errors.append(
                    f"{observation_path}: BTOS panel {panel!r} combines rows "
                    f"{_format_lines(btos_contexts)} across the November 2025 wording "
                    "break; pre-break 'produce goods or services' values and post-break "
                    "'any business function' values cannot form one continuous or "
                    "comparable series"
                )

    if errors:
        raise AdoptionDepthValidationError(errors)

    return rows


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "observation_file",
        nargs="?",
        type=Path,
        default=DEFAULT_OBSERVATIONS,
        help="Path to adoption_depth.csv",
    )
    parser.add_argument(
        "--source-register",
        type=Path,
        default=DEFAULT_SOURCE_REGISTER,
        help="Path to the canonical source register",
    )
    args = parser.parse_args()

    try:
        rows = validate(args.observation_file, args.source_register)
    except AdoptionDepthValidationError as exc:
        for error in exc.errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1

    print(f"Adoption-depth validation passed: {len(rows)} observations.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
