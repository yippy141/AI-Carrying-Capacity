#!/usr/bin/env python3
"""Validate the scaffold for AI Conversion Atlas."""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path

from validate_adoption_depth import (
    AdoptionDepthValidationError,
    REQUIRED_COLUMNS as ADOPTION_DEPTH_COLUMNS,
    validate as validate_adoption_depth,
)
from validate_design_placeholders import validate as validate_design_placeholders


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
    "data/observations/adoption_depth.csv",
    "data/processed/country_sector_scores.json",
    "data/processed/v0_country_profiles.json",
    "data/processed/v0_indicator_metadata.json",
    "data/processed/v0_source_metadata.json",
    "data/processed/v0_sector_manufacturing.json",
    "data/processed/v0_compute_energy.json",
    "data/scenarios/v0_scenarios.json",
    "scripts/validate_source_register.py",
    "scripts/validate_indicator_catalog.py",
    "scripts/validate_adoption_depth.py",
    "scripts/validate_adoption_depth_test.py",
    "scripts/validate_design_placeholders.py",
    "scripts/validate_design_placeholders_test.py",
    "scripts/build_structural_profiles_workbooks.py",
    "scripts/validate_structural_profiles_worksheet.py",
    "scripts/validate_structural_profiles_worksheet_test.py",
    "scripts/build_structural_profiles_reconciliation.py",
    "scripts/build_structural_profiles_reconciliation.mjs",
    "scripts/apply_structural_profiles_owner_review.py",
    "scripts/validate_structural_profiles_reconciliation.py",
    "scripts/check_launch_readiness.py",
    "scripts/build_v0_dataset.py",
    "research/deep-research/README.md",
    "templates/deep_research_report.md",
    "templates/source_register_additions.csv",
    "templates/indicator_candidates.csv",
    "templates/claim_ledger.csv",
    "research/structural-profiles-pilot/worksheet/START_HERE.md",
    "research/structural-profiles-pilot/worksheet/RUBRIC.md",
    "research/structural-profiles-pilot/worksheet/OWNER_REVIEW_GUIDE.md",
    "research/structural-profiles-pilot/worksheet/worksheet-build-report.md",
    "research/structural-profiles-pilot/worksheet/unresolved_scope_ambiguities.md",
    "research/structural-profiles-pilot/worksheet/stages.csv",
    "research/structural-profiles-pilot/worksheet/stage_profiles_template.csv",
    "research/structural-profiles-pilot/worksheet/profile_coding_reviews_fable_template.csv",
    "research/structural-profiles-pilot/worksheet/profile_coding_reviews_blind_template.csv",
    "research/structural-profiles-pilot/worksheet/country_stage_modifiers_template.csv",
    "research/structural-profiles-pilot/worksheet/governance_overlay_template.csv",
    "research/structural-profiles-pilot/worksheet/owner_decisions_template.csv",
    "research/structural-profiles-pilot/worksheet/exception_report.schema.json",
    "research/structural-profiles-pilot/worksheet/structural_profiles_reference_and_owner_review.xlsx",
    "research/structural-profiles-pilot/worksheet/fable_submission_template.xlsx",
    "research/structural-profiles-pilot/worksheet/blind_submission_template.xlsx",
    "research/structural-profiles-pilot/reconciliation/RECONCILIATION_NOTE.md",
    "research/structural-profiles-pilot/reconciliation/seed_submission_v1.csv",
    "research/structural-profiles-pilot/reconciliation/independent_submission_v1.csv",
    "research/structural-profiles-pilot/reconciliation/comparison_audit_v1.csv",
    "research/structural-profiles-pilot/reconciliation/reconciliation_report_v1.json",
    "research/structural-profiles-pilot/reconciliation/owner_exceptions_v1.csv",
    "research/structural-profiles-pilot/reconciliation/owner_exception_review_v1.xlsx",
    "research/structural-profiles-pilot/reconciliation/owner_decisions_v1.csv",
    "research/structural-profiles-pilot/reconciliation/fusion_domain_review_queue_v1.csv",
    "research/structural-profiles-pilot/reconciliation/fusion_domain_review_brief_v1.md",
    "research/structural-profiles-pilot/reconciliation/evidence_gap_backlog_v1.csv",
    "research/structural-profiles-pilot/reconciliation/targeted_s5_adjudication_backlog_v1.csv",
]

EXPECTED_HEADERS = {
    "data/observations/adoption_depth.csv": ADOPTION_DEPTH_COLUMNS,
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
    "data/forecasts/forecast_register.csv": [
        "forecast_id",
        "question",
        "resolution_criteria",
        "resolution_source",
        "deadline",
        "initial_probability_range",
        "rationale",
        "framework_relevance",
        "update_triggers",
        "status",
        "author_review_status",
        "baseline_date",
        "lower_bound_rationale",
        "upper_bound_rationale",
        "last_updated",
        "update_history",
    ],
}

EXPECTED_HEADERS[
    "research/source-register/2026-07-11-deep-research-source-additions.csv"
] = EXPECTED_HEADERS["data/sources/source_register.csv"]

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
SUPERSEDED_IFR_VALUE = re.compile(r"\b(?:470|567)\b")
SUPERSEDED_CONTEXT = (
    "historical",
    "pre-revision",
    "earlier",
    "prior",
    "old denominator",
    "supersed",
    "no ifr basis",
)
PUBLIC_TEXT_ROOTS = ("app", "components", "content", "data/processed")


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


def validate_adoption_depth_data() -> None:
    try:
        validate_adoption_depth()
    except AdoptionDepthValidationError as exc:
        fail(
            "Adoption-depth observation validation failed:\n"
            + "\n".join(f"- {error}" for error in exc.errors)
        )


def validate_design_reference_values() -> None:
    errors = validate_design_placeholders()
    if errors:
        fail(
            "Design-reference placeholder validation failed:\n"
            + "\n".join(f"- {error}" for error in errors)
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


def validate_ifr_density_vintage() -> None:
    bad_references: list[str] = []
    for root_name in PUBLIC_TEXT_ROOTS:
        root = ROOT / root_name
        for path in root.rglob("*"):
            if path.suffix not in {".md", ".tsx", ".ts", ".json"}:
                continue
            for line_number, line in enumerate(
                path.read_text(encoding="utf-8").splitlines(), start=1
            ):
                lowered = line.lower()
                if not SUPERSEDED_IFR_VALUE.search(line):
                    continue
                if "robot" not in lowered and "density" not in lowered:
                    continue
                if not any(marker in lowered for marker in SUPERSEDED_CONTEXT):
                    bad_references.append(f"{path.relative_to(ROOT)}:{line_number}")
    if bad_references:
        fail(
            "Current China robot-density copy may not use 470 or 567 without "
            "an explicit historical/superseded marker:\n"
            + "\n".join(f"- {reference}" for reference in bad_references)
        )


def main() -> None:
    validate_required_paths()
    validate_csv_headers()
    validate_adoption_depth_data()
    validate_design_reference_values()
    validate_json_files()
    validate_report_names()
    validate_ifr_density_vintage()
    print("AI Conversion Atlas scaffold validation passed.")


if __name__ == "__main__":
    main()
