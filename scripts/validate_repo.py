#!/usr/bin/env python3
"""Validate the scaffold for AI Conversion Atlas."""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

REQUIRED_PATHS = [
    "README.md",
    "AGENTS.md",
    "docs/AGENT_BRIEF.md",
    "docs/AGENT_LOCKS.md",
    "docs/AGENT_RUNBOOK.md",
    "docs/METHOD.md",
    "docs/TASKS.md",
    "docs/DECISIONS.md",
    "docs/RESEARCH_INTAKE.md",
    "data/sources/source_register.csv",
    "data/indicators/indicator_catalog.csv",
    "data/claims/claim_ledger.csv",
    "data/processed/country_sector_scores.json",
    "data/processed/v0_country_profiles.json",
    "data/processed/v0_indicator_metadata.json",
    "data/processed/v0_source_metadata.json",
    "data/processed/v0_sector_manufacturing.json",
    "data/processed/v0_compute_energy.json",
    "data/scenarios/v0_scenarios.json",
    "scripts/validate_source_register.py",
    "scripts/validate_indicator_catalog.py",
    "scripts/check_launch_readiness.py",
    "scripts/build_v0_dataset.py",
    "research/deep-research/README.md",
    "templates/deep_research_report.md",
    "templates/source_register_additions.csv",
    "templates/indicator_candidates.csv",
    "templates/claim_ledger.csv",
]

EXPECTED_HEADERS = {
    "data/sources/source_register.csv": [
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
    ],
    "data/indicators/indicator_catalog.csv": [
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
    ],
    "data/claims/claim_ledger.csv": [
        "claim_id",
        "claim",
        "claim_type",
        "evidence_type",
        "source_ids",
        "counterevidence_source_ids",
        "confidence",
        "geography",
        "sector",
        "product_use_status",
        "caveat",
        "owner",
        "last_reviewed",
        "notes",
    ],
}

JSON_FILES = [
    "data/processed/country_sector_scores.json",
    "data/processed/v0_country_profiles.json",
    "data/processed/v0_indicator_metadata.json",
    "data/processed/v0_source_metadata.json",
    "data/processed/v0_sector_manufacturing.json",
    "data/processed/v0_compute_energy.json",
    "data/scenarios/v0_scenarios.json",
]

REPORT_NAME_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*\.md$")


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def read_csv_header(path: Path) -> list[str]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.reader(handle)
        try:
            return next(reader)
        except StopIteration:
            return []


def validate_required_paths() -> None:
    missing = [path for path in REQUIRED_PATHS if not (ROOT / path).exists()]
    if missing:
        fail("Missing required paths:\n" + "\n".join(f"- {path}" for path in missing))


def validate_csv_headers() -> None:
    for relative_path, expected in EXPECTED_HEADERS.items():
        actual = read_csv_header(ROOT / relative_path)
        if actual != expected:
            fail(
                f"Unexpected CSV header in {relative_path}\n"
                f"Expected: {expected}\n"
                f"Actual:   {actual}"
            )


def validate_json_files() -> None:
    for relative_path in JSON_FILES:
        with (ROOT / relative_path).open(encoding="utf-8") as handle:
            parsed = json.load(handle)
        metadata = parsed.get("metadata")
        if not isinstance(metadata, dict):
            fail(f"{relative_path} must include a metadata object.")
        if metadata.get("status") != "placeholder":
            print(f"NOTE: {relative_path} is no longer marked as placeholder.")


def validate_report_names() -> None:
    inbox = ROOT / "research" / "deep-research"
    bad_names = [
        path.name
        for path in inbox.glob("*.md")
        if path.name != "README.md" and not REPORT_NAME_PATTERN.match(path.name)
    ]
    if bad_names:
        fail(
            "Deep Research report filenames should match YYYY-MM-DD-topic.md:\n"
            + "\n".join(f"- {name}" for name in bad_names)
        )


def main() -> None:
    validate_required_paths()
    validate_csv_headers()
    validate_json_files()
    validate_report_names()
    print("AI Conversion Atlas scaffold validation passed.")


if __name__ == "__main__":
    main()
