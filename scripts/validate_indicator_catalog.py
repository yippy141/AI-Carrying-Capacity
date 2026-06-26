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
SOURCE_ID_SPLIT_PATTERN = re.compile(r"[;,]")


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


def has_explicit_qualitative_coding(row: dict[str, str]) -> bool:
    return (
        (row.get("evidence_label") or "").strip() == "qualitative-coded"
        and not is_missing(row.get("qualitative_coding"))
    )


def validate(
    indicator_catalog: Path = DEFAULT_INDICATOR_CATALOG,
    source_register: Path = DEFAULT_SOURCE_REGISTER,
) -> list[dict[str, str]]:
    source_rows = validate_source_register(source_register)
    valid_source_ids = {row["source_id"].strip() for row in source_rows}

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

        data_quality = (row.get("data_quality") or "").strip().lower()
        if data_quality not in ALLOWED_DATA_QUALITY:
            allowed = ", ".join(sorted(ALLOWED_DATA_QUALITY))
            errors.append(
                f"{indicator_catalog}:{line_number}: data_quality must be one of {allowed}; "
                f"got {data_quality!r}"
            )

        evidence_label = (row.get("evidence_label") or "").strip()
        if evidence_label not in ALLOWED_EVIDENCE_LABELS:
            allowed = ", ".join(sorted(ALLOWED_EVIDENCE_LABELS))
            errors.append(
                f"{indicator_catalog}:{line_number}: evidence_label must be one of {allowed}; "
                f"got {evidence_label!r}"
            )

        row_source_ids = parse_source_ids(row.get("source_ids"))
        unknown_source_ids = [
            source_id for source_id in row_source_ids if source_id not in valid_source_ids
        ]
        if unknown_source_ids:
            errors.append(
                f"{indicator_catalog}:{line_number}: unknown source_id reference(s): "
                f"{', '.join(unknown_source_ids)}"
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
