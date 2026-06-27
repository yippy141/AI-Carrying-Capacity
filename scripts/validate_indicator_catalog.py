#!/usr/bin/env python3
"""Validate the AI Conversion Atlas indicator catalog."""

from __future__ import annotations

import argparse
import csv
import re
import sys
from pathlib import Path

from validate_source_register import DEFAULT_SOURCE_REGISTER
from validate_source_register import is_missing
from validate_source_register import is_placeholder as is_placeholder_source
from validate_source_register import validate as validate_source_register


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INDICATOR_CATALOG = ROOT / "data" / "indicators" / "indicator_catalog.csv"

REQUIRED_COLUMNS = [
    "indicator_id",
    "concept",
    "pillar",
    "possible_metric",
    "unit",
    "source_ids",
    "coverage",
    "update_frequency",
    "data_quality",
    "directionality",
    "normalization",
    "missingness_policy",
    "missing_reason",
    "attribution_strength",
    "input_output_role",
    "evidence_label",
    "qualitative_coding",
    "score",
    "placeholder",
    "notes",
]

ALLOWED_DATA_QUALITY = {"high", "medium", "low", "missing"}
ALLOWED_EVIDENCE_LABELS = {
    "observed",
    "official-claim",
    "qualitative-coded",
    "estimated",
    "missing",
}
ALLOWED_MISSING_REASONS = {
    "not_reviewed",
    "not_available",
    "not_comparable",
    "not_applicable",
    "confidential",
    "not_yet_measured",
    "source_unverified",
    "placeholder",
}
ALLOWED_ATTRIBUTION_STRENGTHS = {
    "descriptive",
    "before_after",
    "comparison_group",
    "quasi_causal",
    "causal",
    "model_based",
    "speculative",
    "not_applicable",
    "placeholder",
}
ALLOWED_INPUT_OUTPUT_ROLES = {
    "input",
    "process",
    "output",
    "outcome",
    "stress",
    "distribution",
    "context",
    "placeholder",
}
TRUE_VALUES = {"true", "yes", "1"}
FALSE_VALUES = {"false", "no", "0"}
SOURCE_ID_SPLIT_PATTERN = re.compile(r"[;,]")
EMPIRICAL_EVIDENCE_LABELS = {"observed", "estimated"}
EMPIRICAL_BLOCKED_TIERS = {"C", "D", "E"}
EMPIRICAL_BLOCKED_METHOD_TYPES = {"expert_commentary", "placeholder"}


def read_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        fieldnames = reader.fieldnames or []
        return fieldnames, list(reader)


def parse_source_ids(value: str | None) -> list[str]:
    if is_missing(value):
        return []
    return [
        source_id.strip()
        for source_id in SOURCE_ID_SPLIT_PATTERN.split(value or "")
        if not is_missing(source_id)
    ]


def has_score(value: str | None) -> bool:
    return not is_missing(value)


def is_placeholder_indicator(row: dict[str, str]) -> bool:
    return (row.get("placeholder") or "").strip().lower() in TRUE_VALUES


def has_explicit_qualitative_coding(row: dict[str, str]) -> bool:
    return (
        (row.get("evidence_label") or "").strip() == "qualitative-coded"
        and not is_missing(row.get("qualitative_coding"))
    )


def is_empirical_indicator(row: dict[str, str]) -> bool:
    evidence_label = (row.get("evidence_label") or "").strip()
    return evidence_label in EMPIRICAL_EVIDENCE_LABELS or has_score(row.get("score"))


def _validate_enum(
    *,
    errors: list[str],
    path: Path,
    line_number: int,
    row: dict[str, str],
    column: str,
    allowed_values: set[str],
) -> None:
    value = (row.get(column) or "").strip()
    if value not in allowed_values:
        allowed = ", ".join(sorted(allowed_values))
        errors.append(
            f"{path}:{line_number}: {column} must be one of {allowed}; got {value!r}"
        )


def validate(
    indicator_catalog: Path = DEFAULT_INDICATOR_CATALOG,
    source_register: Path = DEFAULT_SOURCE_REGISTER,
) -> list[dict[str, str]]:
    source_rows = validate_source_register(source_register)
    source_by_id = {row["source_id"].strip(): row for row in source_rows}
    valid_source_ids = set(source_by_id)

    fieldnames, rows = read_rows(indicator_catalog)
    errors: list[str] = []

    missing_columns = [column for column in REQUIRED_COLUMNS if column not in fieldnames]
    if missing_columns:
        errors.append(
            f"{indicator_catalog}: missing required columns: {', '.join(missing_columns)}"
        )

    seen_indicator_ids: dict[str, int] = {}
    for line_number, row in enumerate(rows, start=2):
        indicator_id = (row.get("indicator_id") or "").strip()
        if is_missing(indicator_id):
            errors.append(f"{indicator_catalog}:{line_number}: indicator_id is required")
        elif indicator_id in seen_indicator_ids:
            first_line = seen_indicator_ids[indicator_id]
            errors.append(
                f"{indicator_catalog}:{line_number}: duplicate indicator_id {indicator_id!r}; "
                f"first seen on line {first_line}"
            )
        else:
            seen_indicator_ids[indicator_id] = line_number

        placeholder_value = (row.get("placeholder") or "").strip().lower()
        if placeholder_value not in TRUE_VALUES | FALSE_VALUES:
            errors.append(
                f"{indicator_catalog}:{line_number}: placeholder must be true or false; "
                f"got {placeholder_value!r}"
            )

        _validate_enum(
            errors=errors,
            path=indicator_catalog,
            line_number=line_number,
            row=row,
            column="data_quality",
            allowed_values=ALLOWED_DATA_QUALITY,
        )
        _validate_enum(
            errors=errors,
            path=indicator_catalog,
            line_number=line_number,
            row=row,
            column="evidence_label",
            allowed_values=ALLOWED_EVIDENCE_LABELS,
        )
        _validate_enum(
            errors=errors,
            path=indicator_catalog,
            line_number=line_number,
            row=row,
            column="missing_reason",
            allowed_values=ALLOWED_MISSING_REASONS,
        )
        _validate_enum(
            errors=errors,
            path=indicator_catalog,
            line_number=line_number,
            row=row,
            column="attribution_strength",
            allowed_values=ALLOWED_ATTRIBUTION_STRENGTHS,
        )
        _validate_enum(
            errors=errors,
            path=indicator_catalog,
            line_number=line_number,
            row=row,
            column="input_output_role",
            allowed_values=ALLOWED_INPUT_OUTPUT_ROLES,
        )

        data_quality = (row.get("data_quality") or "").strip().lower()
        evidence_label = (row.get("evidence_label") or "").strip()
        missing_reason = (row.get("missing_reason") or "").strip()
        pillar = (row.get("pillar") or "").strip()
        input_output_role = (row.get("input_output_role") or "").strip()

        row_source_ids = parse_source_ids(row.get("source_ids"))
        unknown_source_ids = [
            source_id for source_id in row_source_ids if source_id not in valid_source_ids
        ]
        if unknown_source_ids:
            errors.append(
                f"{indicator_catalog}:{line_number}: unknown source_id reference(s): "
                f"{', '.join(unknown_source_ids)}"
            )

        if (data_quality == "missing" or evidence_label == "missing") and is_missing(
            missing_reason
        ):
            errors.append(
                f"{indicator_catalog}:{line_number}: missing indicators require missing_reason"
            )

        if (
            has_score(row.get("score"))
            and not row_source_ids
            and not has_explicit_qualitative_coding(row)
        ):
            errors.append(
                f"{indicator_catalog}:{line_number}: score is not accepted without "
                "source_ids or explicit qualitative coding"
            )

        if pillar == "realized_outcomes" and input_output_role == "input":
            errors.append(
                f"{indicator_catalog}:{line_number}: realized_outcomes indicators cannot "
                "use input_output_role=input"
            )

        if evidence_label == "official-claim" and (
            pillar == "realized_outcomes" or input_output_role == "outcome"
        ):
            errors.append(
                f"{indicator_catalog}:{line_number}: official-claim indicators cannot be "
                "rendered as observed outcomes"
            )

        if is_empirical_indicator(row):
            for source_id in row_source_ids:
                source = source_by_id.get(source_id)
                if not source:
                    continue
                reliability_tier = (source.get("reliability_tier") or "").strip()
                method_type = (source.get("method_type") or "").strip()
                if reliability_tier in EMPIRICAL_BLOCKED_TIERS:
                    errors.append(
                        f"{indicator_catalog}:{line_number}: empirical indicator cannot use "
                        f"tier {reliability_tier} source {source_id}"
                    )
                if method_type in EMPIRICAL_BLOCKED_METHOD_TYPES:
                    errors.append(
                        f"{indicator_catalog}:{line_number}: empirical indicator cannot use "
                        f"method_type {method_type} source {source_id}"
                    )
                if is_placeholder_source(source):
                    errors.append(
                        f"{indicator_catalog}:{line_number}: empirical indicator cannot use "
                        f"placeholder source {source_id}"
                    )

        if is_placeholder_indicator(row):
            if missing_reason != "placeholder":
                errors.append(
                    f"{indicator_catalog}:{line_number}: placeholder rows must use "
                    "missing_reason=placeholder"
                )
            if (row.get("attribution_strength") or "").strip() != "placeholder":
                errors.append(
                    f"{indicator_catalog}:{line_number}: placeholder rows must use "
                    "attribution_strength=placeholder"
                )
            if input_output_role != "placeholder":
                errors.append(
                    f"{indicator_catalog}:{line_number}: placeholder rows must use "
                    "input_output_role=placeholder"
                )

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)

    return rows


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "indicator_catalog",
        nargs="?",
        type=Path,
        default=DEFAULT_INDICATOR_CATALOG,
        help="Path to indicator_catalog.csv",
    )
    parser.add_argument(
        "--source-register",
        type=Path,
        default=DEFAULT_SOURCE_REGISTER,
        help="Path to source_register.csv",
    )
    args = parser.parse_args()

    rows = validate(args.indicator_catalog, args.source_register)
    print(f"Indicator catalog validation passed: {len(rows)} rows.")


if __name__ == "__main__":
    main()
