#!/usr/bin/env python3
"""Validate the AI Conversion Atlas source register."""

from __future__ import annotations

import argparse
import csv
import re
import sys
from datetime import date
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE_REGISTER = ROOT / "data" / "sources" / "source_register.csv"

REQUIRED_COLUMNS = [
    "source_id",
    "title_original",
    "title_english",
    "authors_org",
    "year",
    "publication_date",
    "access_date",
    "last_verified",
    "archive_url",
    "language",
    "source_type",
    "method_type",
    "claim_owner",
    "official_claim_status",
    "independent_validation_status",
    "url_or_doi",
    "original_language_url",
    "translation_reviewer",
    "translation_note",
    "reliability_tier",
    "geo_scope",
    "sector_scope",
    "key_claims",
    "useful_indicators",
    "limitations",
    "date_added",
    "added_by",
    "review_status",
    "placeholder",
    "notes",
]

ALLOWED_RELIABILITY_TIERS = {"A", "B", "C", "D", "E"}
ALLOWED_METHOD_TYPES = {
    "official_statistics",
    "law_or_regulation",
    "government_strategy",
    "administrative_data",
    "survey",
    "dataset",
    "peer_reviewed_paper",
    "working_paper",
    "think_tank_report",
    "corporate_filing",
    "corporate_report",
    "media_report",
    "expert_commentary",
    "model_estimate",
    "placeholder",
}
ALLOWED_OFFICIAL_CLAIM_STATUSES = {
    "not_official_claim",
    "official_target",
    "official_program_claim",
    "official_observed_statistic",
    "mixed",
    "placeholder",
}
ALLOWED_INDEPENDENT_VALIDATION_STATUSES = {
    "independently_validated",
    "partially_validated",
    "not_independently_validated",
    "not_applicable",
    "unknown",
    "placeholder",
}
ALLOWED_REVIEW_STATUSES = {"staged", "reviewed", "needs-check", "rejected", "placeholder"}
MISSING_VALUES = {"", "missing", "n/a", "na", "none", "null"}
TRUE_VALUES = {"true", "yes", "1"}
FALSE_VALUES = {"false", "no", "0"}


def is_missing(value: str | None) -> bool:
    return value is None or value.strip().lower() in MISSING_VALUES


def is_placeholder(row: dict[str, str]) -> bool:
    return (row.get("placeholder") or "").strip().lower() in TRUE_VALUES


def has_source_locator(value: str | None) -> bool:
    """Check locator syntax; actual fusion verification is pinned to its bank."""
    if is_missing(value):
        return False
    value = (value or "").strip()
    if re.fullmatch(r"(?:doi:)?10\.\d{4,9}/\S+", value, re.IGNORECASE):
        return True
    try:
        locator = urlsplit(value)
        return (
            locator.scheme in {"http", "https"}
            and bool(locator.hostname)
            and "." in locator.hostname
            and locator.hostname not in {"example.com", "example.org", "example.net"}
            and not any(character.isspace() for character in value)
        )
    except ValueError:
        return False


def empirical_source_restrictions(source: dict[str, str], evidence_label: str) -> list[str]:
    """Source review does not make a target or company report an empirical value."""
    if evidence_label not in {"observed", "estimated"}:
        return []
    restrictions = []
    if source.get("reliability_tier") in {"C", "D", "E"}:
        restrictions.append("empirical values cannot use tier C/D/E sources")
    if source.get("method_type") in {"expert_commentary", "placeholder"} or is_placeholder(source):
        restrictions.append("empirical values cannot use commentary/placeholder sources")
    if evidence_label == "observed":
        if source.get("official_claim_status") in {"official_target", "official_program_claim", "mixed"}:
            restrictions.append("official targets/programme claims cannot be observed empirical outcomes")
        if source.get("method_type") == "law_or_regulation" or source.get("source_type") == "official_regulator_status_page":
            restrictions.append("legal/regulatory status is not an observed empirical outcome")
        if (source.get("independent_validation_status") == "not_independently_validated"
                and source.get("method_type") in {"corporate_report", "media_report"}):
            restrictions.append("company/operator reporting is not independently observed empirical evidence")
    return restrictions


def read_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        fieldnames = reader.fieldnames or []
        return fieldnames, list(reader)


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


def validate(path: Path = DEFAULT_SOURCE_REGISTER) -> list[dict[str, str]]:
    fieldnames, rows = read_rows(path)
    errors: list[str] = []

    missing_columns = [column for column in REQUIRED_COLUMNS if column not in fieldnames]
    if missing_columns:
        errors.append(
            f"{path}: missing required columns: {', '.join(missing_columns)}"
        )

    seen_source_ids: dict[str, int] = {}
    for line_number, row in enumerate(rows, start=2):
        source_id = (row.get("source_id") or "").strip()
        if is_missing(source_id):
            errors.append(f"{path}:{line_number}: source_id is required")
        elif source_id in seen_source_ids:
            first_line = seen_source_ids[source_id]
            errors.append(
                f"{path}:{line_number}: duplicate source_id {source_id!r}; "
                f"first seen on line {first_line}"
            )
        else:
            seen_source_ids[source_id] = line_number

        placeholder_value = (row.get("placeholder") or "").strip().lower()
        if placeholder_value not in TRUE_VALUES | FALSE_VALUES:
            errors.append(
                f"{path}:{line_number}: placeholder must be true or false; "
                f"got {placeholder_value!r}"
            )

        _validate_enum(
            errors=errors,
            path=path,
            line_number=line_number,
            row=row,
            column="reliability_tier",
            allowed_values=ALLOWED_RELIABILITY_TIERS,
        )
        _validate_enum(
            errors=errors,
            path=path,
            line_number=line_number,
            row=row,
            column="method_type",
            allowed_values=ALLOWED_METHOD_TYPES,
        )
        _validate_enum(
            errors=errors,
            path=path,
            line_number=line_number,
            row=row,
            column="official_claim_status",
            allowed_values=ALLOWED_OFFICIAL_CLAIM_STATUSES,
        )
        _validate_enum(
            errors=errors,
            path=path,
            line_number=line_number,
            row=row,
            column="independent_validation_status",
            allowed_values=ALLOWED_INDEPENDENT_VALIDATION_STATUSES,
        )
        _validate_enum(
            errors=errors,
            path=path,
            line_number=line_number,
            row=row,
            column="review_status",
            allowed_values=ALLOWED_REVIEW_STATUSES,
        )

        searchable_source = " ".join(
            row.get(column) or ""
            for column in (
                "title_original",
                "title_english",
                "url_or_doi",
                "original_language_url",
                "archive_url",
            )
        ).lower()
        if "wikipedia.org" in searchable_source or "wikipedia" == (
            row.get("authors_org") or ""
        ).strip().lower():
            errors.append(f"{path}:{line_number}: Wikipedia is not an allowed source")

        if is_placeholder(row):
            if (row.get("reliability_tier") or "").strip() != "E":
                errors.append(
                    f"{path}:{line_number}: placeholder rows must use reliability_tier E"
                )
            if (row.get("method_type") or "").strip() != "placeholder":
                errors.append(
                    f"{path}:{line_number}: placeholder rows must use method_type placeholder"
                )
            if (row.get("review_status") or "").strip() != "placeholder":
                errors.append(
                    f"{path}:{line_number}: placeholder rows must use review_status placeholder"
                )
        else:
            if (row.get("method_type") or "").strip() == "placeholder":
                errors.append(
                    f"{path}:{line_number}: non-placeholder rows cannot use method_type placeholder"
                )
            if (row.get("reliability_tier") or "").strip() == "E":
                errors.append(
                    f"{path}:{line_number}: non-placeholder rows cannot use reliability_tier E"
                )
            if (row.get("review_status") or "").strip() == "reviewed" and is_missing(
                row.get("url_or_doi")
            ):
                errors.append(
                    f"{path}:{line_number}: reviewed rows require url_or_doi"
                )
            if (row.get("review_status") or "").strip() == "reviewed" and is_missing(
                row.get("last_verified")
            ):
                errors.append(
                    f"{path}:{line_number}: reviewed rows require last_verified"
                )
            if (row.get("review_status") or "").strip() == "reviewed":
                if not has_source_locator(row.get("url_or_doi")):
                    errors.append(f"{path}:{line_number}: reviewed rows require a valid non-placeholder URL/DOI locator")
                try:
                    date.fromisoformat(row.get("last_verified") or "")
                except ValueError:
                    errors.append(f"{path}:{line_number}: reviewed last_verified must be an ISO date")
                if (row.get("method_type") == "law_or_regulation"
                        or row.get("source_type") == "official_regulator_status_page"):
                    if row.get("official_claim_status") != "not_official_claim":
                        errors.append(f"{path}:{line_number}: reviewed legal/regulatory records must use not_official_claim")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        raise SystemExit(1)

    return rows


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "source_register",
        nargs="?",
        type=Path,
        default=DEFAULT_SOURCE_REGISTER,
        help="Path to source_register.csv",
    )
    args = parser.parse_args()

    rows = validate(args.source_register)
    print(f"Source register validation passed: {len(rows)} rows.")


if __name__ == "__main__":
    main()
