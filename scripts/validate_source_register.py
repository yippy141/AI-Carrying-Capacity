#!/usr/bin/env python3
"""Validate the AI Conversion Atlas source register."""

from __future__ import annotations

import argparse
import csv
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE_REGISTER = ROOT / "data" / "sources" / "source_register.csv"

REQUIRED_COLUMNS = [
    "source_id",
    "title_original",
    "title_english",
    "authors_org",
    "year",
    "language",
    "source_type",
    "url_or_doi",
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
MISSING_VALUES = {"", "missing", "n/a", "na", "none", "null"}


def is_missing(value: str | None) -> bool:
    return value is None or value.strip().lower() in MISSING_VALUES


def read_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        fieldnames = reader.fieldnames or []
        return fieldnames, list(reader)


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

        reliability_tier = (row.get("reliability_tier") or "").strip()
        if reliability_tier not in ALLOWED_RELIABILITY_TIERS:
            allowed = ", ".join(sorted(ALLOWED_RELIABILITY_TIERS))
            errors.append(
                f"{path}:{line_number}: reliability_tier must be one of {allowed}; "
                f"got {reliability_tier!r}"
            )

        searchable_source = " ".join(
            row.get(column) or ""
            for column in ("title_original", "title_english", "url_or_doi")
        ).lower()
        if "wikipedia.org" in searchable_source or "wikipedia" == (
            row.get("authors_org") or ""
        ).strip().lower():
            errors.append(f"{path}:{line_number}: Wikipedia is not an allowed source")

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
