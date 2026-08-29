#!/usr/bin/env python3
"""Validate only the blank Structural Profiles worksheet package."""

from __future__ import annotations

import csv
import re
import subprocess
import sys
from collections.abc import Iterable
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PACKAGE = Path("research/profile-coding")
TEMPLATES = PACKAGE / "templates"

STAGES_HEADER = [
    "stage_id",
    "parent_stage_id",
    "sector",
    "label",
    "description",
    "display_order",
    "leaf_status",
    "version",
]

PROFILE_HEADER = [
    "profile_id",
    "stage_id",
    "parent_stage_id",
    "sector",
    "workflow",
    "pathway_id",
    "application_context",
    "lifecycle_phase",
    "critical_path_role",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "rationale",
    "source_ids",
    "coding_confidence",
    "disagreement_summary",
    "selected_review_ids",
    "evidence_basis",
    "coding_as_of",
    "last_reviewed",
    "revisit_triggers",
    "proposed_by",
    "proposed_model",
    "reviewed_by",
    "independent_review_by",
    "approved_by",
    "coding_status",
    "review_status",
    "version",
    "changelog_note",
]

REVIEW_HEADER = [
    "review_id",
    "profile_id",
    "coder_type",
    "coder_role",
    "coder_name",
    "coder_model",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "rationale",
    "source_ids",
    "coding_as_of",
    "submitted_at",
    "submission_status",
    "notes",
]

COUNTRY_HEADER = [
    "country",
    "subnational_scope",
    "actor_scope",
    "profile_id",
    "pathway_id",
    "stage_applicability",
    "binding_status",
    "C1_accessible_capability",
    "C2_data_access_interoperability",
    "C3_organizational_integration",
    "C4_capital_and_asset_turnover",
    "C5_workforce_integration_skill",
    "C6_governance_procurement_fit",
    "C7_physical_build_test_capacity",
    "C8_ex_ante_commercialization_conditions",
    "source_ids",
    "evidence_basis",
    "confidence",
    "period",
    "coding_as_of",
    "last_reviewed",
    "revisit_triggers",
    "proposed_by",
    "proposed_model",
    "reviewed_by",
    "independent_review_by",
    "approved_by",
    "coding_status",
    "review_status",
    "version",
    "changelog_note",
]

GOVERNANCE_HEADER = [
    "governance_id",
    "profile_id",
    "country_or_jurisdiction",
    "subnational_scope",
    "actor_scope",
    "benefit_conversion_path",
    "hazard_conversion_path",
    "assurance_burden",
    "assurance_functions",
    "auditability",
    "reversibility",
    "externality_scale",
    "security_sensitivity",
    "concentration_of_control",
    "governance_latency",
    "rationale",
    "source_ids",
    "evidence_basis",
    "confidence",
    "period",
    "last_reviewed",
    "revisit_triggers",
    "proposed_by",
    "proposed_model",
    "reviewed_by",
    "independent_review_by",
    "approved_by",
    "coding_status",
    "review_status",
    "version",
    "changelog_note",
]

EXCEPTION_HEADER = [
    "exception_id",
    "profile_id",
    "stage_id",
    "sector",
    "pathway_id",
    "dimension",
    "fable_review_id",
    "independent_review_id",
    "fable_score",
    "independent_score",
    "fable_rationale",
    "independent_rationale",
    "fable_source_ids",
    "independent_source_ids",
    "fable_confidence",
    "independent_confidence",
    "exact_agreement_flag",
    "one_point_difference_flag",
    "difference_two_or_more_flag",
    "missing_score_flag",
    "contradictory_rationale_flag",
    "missing_evidence_flag",
    "scope_ambiguity_flag",
    "load_bearing_flag",
    "low_confidence_load_bearing_flag",
    "mandatory_fusion_domain_review_flag",
    "exception_summary",
    "owner_decision",
    "owner_decision_note",
    "resolution_status",
    "resolved_by",
    "resolved_at",
]

CSV_HEADERS = {
    "stages.csv": STAGES_HEADER,
    "stage_profiles.csv": PROFILE_HEADER,
    "profile_coding_reviews.csv": REVIEW_HEADER,
    "fable_submission.csv": REVIEW_HEADER,
    "blind_submission.csv": REVIEW_HEADER,
    "country_stage_modifiers.csv": COUNTRY_HEADER,
    "governance_overlay.csv": GOVERNANCE_HEADER,
    "exception_report.csv": EXCEPTION_HEADER,
}

REQUIRED_PACKAGE_FILES = [
    PACKAGE / "README.md",
    PACKAGE / "RUBRIC.md",
    PACKAGE / "OWNER_REVIEW_GUIDE.md",
    PACKAGE / "reports/worksheet-build-report.md",
    *(TEMPLATES / name for name in CSV_HEADERS),
]

SOFTWARE_SECTOR = "Software and AI R&D"
MANUFACTURING_SECTOR = "Manufacturing, discrete"
FUSION_SECTOR = "Fusion, magnetic confinement"

SOFTWARE_PATHWAY = "mature_software_delivery_and_maintenance"
MANUFACTURING_PATHWAY = "discrete_manufacturing_npi_and_operations"
FUSION_PATHWAY = "tokamak_research_to_pilot_plant_demonstration"
FROZEN_PATHWAYS = {SOFTWARE_PATHWAY, MANUFACTURING_PATHWAY, FUSION_PATHWAY}

SOFTWARE_SCOPE = (
    "Mature production-software feature development, debugging, testing, "
    "integration, deployment, operations, and maintenance in an established codebase"
)
MANUFACTURING_SCOPE = (
    "New-product introduction and operations in medium-to-high-volume discrete "
    "manufacturing, from product and process engineering through tooling, "
    "commissioning, quality, production, maintenance, and iterative improvement"
)
FUSION_SCOPE = (
    "Tokamak research through component and subsystem development, materials "
    "qualification, facility build, commissioning, integrated demonstration, "
    "and pilot-plant readiness"
)

SOFTWARE_LEAVES = [
    "requirements_and_architecture",
    "implementation",
    "verification_and_validation",
    "deployment",
    "operations_and_maintenance",
]
MANUFACTURING_LEAVES = [
    "product_design",
    "process_engineering",
    "supply_and_tooling",
    "retooling_and_commissioning",
    "production_planning_and_scheduling",
    "production_and_process_control",
    "quality_assurance",
    "maintenance_and_continuous_improvement",
]
FUSION_GROUPS = {
    "concept_and_design": ["theory_and_system_design"],
    "digital_experiment_loop": ["simulation", "experiment_selection"],
    "plasma_operations": ["diagnostics", "plasma_control"],
    "materials": ["materials_discovery_and_screening", "materials_qualification"],
    "plant_subsystems": [
        "magnets",
        "heating_and_current_drive",
        "plasma_facing_components",
        "tritium_and_fuel_cycle",
        "blankets",
    ],
    "build": ["component_fabrication", "construction"],
    "demonstration_and_assurance": [
        "commissioning",
        "reliability_demonstration",
    ],
    "approval_and_connection": ["licensing", "grid_integration"],
}
FUSION_LEAVES = [stage for stages in FUSION_GROUPS.values() for stage in stages]
ALL_LEAVES = SOFTWARE_LEAVES + MANUFACTURING_LEAVES + FUSION_LEAVES

EXPECTED_PROFILE_IDS = {
    stage_id: f"prf-{index:06d}" for index, stage_id in enumerate(ALL_LEAVES, 1)
}
PROFILE_ID_PATTERN = re.compile(r"^prf-[0-9]{6}$")

EMPTY_PROFILE_FIELDS = {
    "workflow",
    "lifecycle_phase",
    "S1",
    "S2",
    "S3",
    "S4",
    "S5",
    "rationale",
    "source_ids",
    "coding_confidence",
    "disagreement_summary",
    "selected_review_ids",
    "coding_as_of",
    "last_reviewed",
    "revisit_triggers",
    "proposed_by",
    "proposed_model",
    "reviewed_by",
    "independent_review_by",
    "approved_by",
    "version",
    "changelog_note",
}

OWNER_DECISIONS = {
    "prefer_fable",
    "prefer_independent",
    "preserve_disagreement",
    "needs_domain_review",
    "needs_better_evidence",
}

ALLOWED_CHANGED_FILES = {
    "docs/DECISIONS.md",
    "docs/TASKS.md",
    "package.json",
    "scripts/validate_profile_worksheet.py",
    "scripts/validate_profile_worksheet_test.py",
}
ALLOWED_CHANGED_PREFIXES = ("research/profile-coding/",)


def read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        header = list(reader.fieldnames or [])
        rows = list(reader)
    return header, rows


def validate_headers_and_shapes(root: Path, errors: list[str]) -> dict[str, list[dict[str, str]]]:
    loaded: dict[str, list[dict[str, str]]] = {}
    for name, expected_header in CSV_HEADERS.items():
        path = root / TEMPLATES / name
        if not path.exists():
            continue
        header, rows = read_csv(path)
        loaded[name] = rows
        if header != expected_header:
            errors.append(f"{name}: unexpected header")
        for row_number, row in enumerate(rows, 2):
            if None in row or any(value is None for value in row.values()):
                errors.append(f"{name}:{row_number}: row width does not match header")
    return loaded


def expected_stage_scope(stage_id: str) -> tuple[str, str, str, str]:
    if stage_id in SOFTWARE_LEAVES:
        return "not_applicable", SOFTWARE_SECTOR, SOFTWARE_PATHWAY, SOFTWARE_SCOPE
    if stage_id in MANUFACTURING_LEAVES:
        return (
            "not_applicable",
            MANUFACTURING_SECTOR,
            MANUFACTURING_PATHWAY,
            MANUFACTURING_SCOPE,
        )
    for parent_id, leaves in FUSION_GROUPS.items():
        if stage_id in leaves:
            return parent_id, FUSION_SECTOR, FUSION_PATHWAY, FUSION_SCOPE
    raise KeyError(stage_id)


def validate_taxonomy(rows: list[dict[str, str]], errors: list[str]) -> dict[str, dict[str, str]]:
    if len(rows) != 39:
        errors.append(f"stages.csv: expected 39 taxonomy rows, found {len(rows)}")
    by_id: dict[str, dict[str, str]] = {}
    for row in rows:
        stage_id = row.get("stage_id", "")
        if not stage_id:
            errors.append("stages.csv: stage_id must not be blank")
            continue
        if stage_id in by_id:
            errors.append(f"stages.csv: duplicate stage_id {stage_id}")
        by_id[stage_id] = row

    expected_ids = set(ALL_LEAVES) | set(FUSION_GROUPS)
    missing = sorted(expected_ids - set(by_id))
    extra = sorted(set(by_id) - expected_ids)
    if missing:
        errors.append(f"stages.csv: missing frozen stages: {', '.join(missing)}")
    if extra:
        errors.append(f"stages.csv: unexpected stages: {', '.join(extra)}")

    for stage_id in ALL_LEAVES:
        row = by_id.get(stage_id)
        if not row:
            continue
        expected_parent, expected_sector, _, _ = expected_stage_scope(stage_id)
        if row.get("parent_stage_id") != expected_parent:
            errors.append(f"stages.csv: {stage_id} has incorrect parent_stage_id")
        if row.get("sector") != expected_sector:
            errors.append(f"stages.csv: {stage_id} has incorrect sector")
        if row.get("leaf_status") != "leaf":
            errors.append(f"stages.csv: {stage_id} must have leaf_status=leaf")

    for parent_id in FUSION_GROUPS:
        row = by_id.get(parent_id)
        if not row:
            continue
        if row.get("parent_stage_id") != "not_applicable":
            errors.append(f"stages.csv: parent {parent_id} must be a root row")
        if row.get("sector") != FUSION_SECTOR:
            errors.append(f"stages.csv: parent {parent_id} has incorrect sector")
        if row.get("leaf_status") != "parent":
            errors.append(f"stages.csv: {parent_id} must have leaf_status=parent")

    for row in rows:
        parent_id = row.get("parent_stage_id", "")
        if parent_id != "not_applicable" and parent_id not in by_id:
            errors.append(
                f"stages.csv: {row.get('stage_id', '<blank>')} references missing parent {parent_id}"
            )
        if row.get("description"):
            errors.append(
                f"stages.csv: {row.get('stage_id', '<blank>')} description must remain blank"
            )
        if row.get("version"):
            errors.append(
                f"stages.csv: {row.get('stage_id', '<blank>')} version must remain blank"
            )
    return by_id


def validate_profiles(
    rows: list[dict[str, str]],
    stages: dict[str, dict[str, str]],
    errors: list[str],
) -> dict[str, dict[str, str]]:
    if len(rows) != 31:
        errors.append(f"stage_profiles.csv: expected exactly 31 leaf rows, found {len(rows)}")

    by_profile: dict[str, dict[str, str]] = {}
    seen_stages: set[str] = set()
    for row in rows:
        profile_id = row.get("profile_id", "")
        stage_id = row.get("stage_id", "")
        if not PROFILE_ID_PATTERN.fullmatch(profile_id):
            errors.append(f"stage_profiles.csv: unstable-looking profile_id {profile_id!r}")
        if profile_id in by_profile:
            errors.append(f"stage_profiles.csv: duplicate profile_id {profile_id}")
        by_profile[profile_id] = row
        if stage_id in seen_stages:
            errors.append(f"stage_profiles.csv: duplicate leaf profile for {stage_id}")
        seen_stages.add(stage_id)

        stage = stages.get(stage_id)
        if not stage:
            errors.append(f"stage_profiles.csv: unresolved stage_id {stage_id}")
            continue
        if stage.get("leaf_status") != "leaf":
            errors.append(f"stage_profiles.csv: whole-sector or parent profile prohibited for {stage_id}")
        if row.get("parent_stage_id") != stage.get("parent_stage_id"):
            errors.append(f"stage_profiles.csv: denormalized parent mismatch for {stage_id}")
        if row.get("sector") != stage.get("sector"):
            errors.append(f"stage_profiles.csv: denormalized sector mismatch for {stage_id}")

        try:
            expected_parent, expected_sector, expected_pathway, expected_scope = (
                expected_stage_scope(stage_id)
            )
        except KeyError:
            errors.append(f"stage_profiles.csv: {stage_id} is not a frozen anchor leaf")
            continue
        if row.get("parent_stage_id") != expected_parent:
            errors.append(f"stage_profiles.csv: frozen parent mismatch for {stage_id}")
        if row.get("sector") != expected_sector:
            errors.append(f"stage_profiles.csv: frozen sector mismatch for {stage_id}")
        if row.get("pathway_id") != expected_pathway:
            errors.append(f"stage_profiles.csv: unsupported pathway for {stage_id}")
        if row.get("application_context") != expected_scope:
            errors.append(f"stage_profiles.csv: frozen application scope mismatch for {stage_id}")
        if row.get("critical_path_role") != "not_assessed":
            errors.append(f"stage_profiles.csv: {stage_id} critical_path_role must be not_assessed")
        if row.get("evidence_basis") != "expert-coded":
            errors.append(f"stage_profiles.csv: {stage_id} must use evidence_basis=expert-coded")
        if row.get("coding_status") != "proposed":
            errors.append(f"stage_profiles.csv: {stage_id} must use coding_status=proposed")
        if row.get("review_status") != "staged":
            errors.append(f"stage_profiles.csv: {stage_id} must use review_status=staged")
        for field in EMPTY_PROFILE_FIELDS:
            if row.get(field):
                errors.append(f"stage_profiles.csv: {stage_id} invented or populated {field}")

        expected_profile_id = EXPECTED_PROFILE_IDS.get(stage_id)
        if expected_profile_id and profile_id != expected_profile_id:
            errors.append(
                f"stage_profiles.csv: stable profile_id for {stage_id} must remain {expected_profile_id}"
            )

    missing_leaves = sorted(set(ALL_LEAVES) - seen_stages)
    extra_stages = sorted(seen_stages - set(ALL_LEAVES))
    if missing_leaves:
        errors.append(f"stage_profiles.csv: missing leaf profiles: {', '.join(missing_leaves)}")
    if extra_stages:
        errors.append(f"stage_profiles.csv: non-anchor profiles: {', '.join(extra_stages)}")

    pathways = {row.get("pathway_id", "") for row in rows}
    if pathways != FROZEN_PATHWAYS:
        errors.append(
            "stage_profiles.csv: only the three frozen pathway IDs may appear; "
            f"found {sorted(pathways)}"
        )
    return by_profile


def validate_submission_templates(
    fable_rows: list[dict[str, str]],
    blind_rows: list[dict[str, str]],
    profiles: dict[str, dict[str, str]],
    errors: list[str],
) -> None:
    expected_ids = [EXPECTED_PROFILE_IDS[stage_id] for stage_id in ALL_LEAVES]
    for name, rows in (("fable_submission.csv", fable_rows), ("blind_submission.csv", blind_rows)):
        ids = [row.get("profile_id", "") for row in rows]
        if len(rows) != 31:
            errors.append(f"{name}: expected 31 blank submission rows, found {len(rows)}")
        if ids != expected_ids:
            errors.append(f"{name}: profile IDs must match the stable profile order")
        if len(set(ids)) != len(ids):
            errors.append(f"{name}: duplicate profile IDs")
        unresolved = sorted(set(ids) - set(profiles))
        if unresolved:
            errors.append(f"{name}: unresolved profile IDs: {', '.join(unresolved)}")

    fable_allowed = {
        "profile_id": None,
        "coder_type": "model",
        "coder_role": "seed_proposer",
        "coder_name": "fable",
        "coder_model": "claude-fable-5",
    }
    for row in fable_rows:
        profile_id = row.get("profile_id", "<blank>")
        for field in REVIEW_HEADER:
            value = row.get(field, "")
            if field == "profile_id":
                continue
            expected = fable_allowed.get(field, "")
            if value != expected:
                errors.append(
                    f"fable_submission.csv: {profile_id} field {field} must be "
                    f"{expected!r}, found {value!r}"
                )

    for row in blind_rows:
        profile_id = row.get("profile_id", "<blank>")
        for field in REVIEW_HEADER:
            value = row.get(field, "")
            if field == "profile_id":
                continue
            expected = "independent_coder" if field == "coder_role" else ""
            if value != expected:
                errors.append(
                    f"blind_submission.csv: {profile_id} cross-contamination or populated "
                    f"field {field}"
                )
        joined = " ".join(row.values()).lower()
        if "fable" in joined or "claude-fable-5" in joined:
            errors.append(f"blind_submission.csv: {profile_id} exposes Fable provenance")


def validate_country_modifier_rows(
    rows: list[dict[str, str]],
    profiles: dict[str, dict[str, str]],
    errors: list[str],
) -> None:
    c_fields = [field for field in COUNTRY_HEADER if re.fullmatch(r"C[1-8]_.+", field)]
    for index, row in enumerate(rows, 2):
        profile_id = row.get("profile_id", "")
        profile = profiles.get(profile_id)
        if not profile:
            errors.append(
                f"country_stage_modifiers.csv:{index}: unresolved profile_id {profile_id}"
            )
        elif row.get("pathway_id") != profile.get("pathway_id"):
            errors.append(
                f"country_stage_modifiers.csv:{index}: pathway_id must equal referenced profile pathway"
            )
        for field in c_fields:
            if row.get(field):
                errors.append(
                    f"country_stage_modifiers.csv:{index}: C coding populated in {field}"
                )


def validate_header_only_templates(
    loaded: dict[str, list[dict[str, str]]],
    profiles: dict[str, dict[str, str]],
    errors: list[str],
) -> None:
    country_rows = loaded.get("country_stage_modifiers.csv", [])
    validate_country_modifier_rows(country_rows, profiles, errors)
    for name in (
        "profile_coding_reviews.csv",
        "country_stage_modifiers.csv",
        "governance_overlay.csv",
        "exception_report.csv",
    ):
        rows = loaded.get(name, [])
        if rows:
            errors.append(f"{name}: template must contain headers only")


def validate_no_forbidden_content(root: Path, errors: list[str]) -> None:
    forbidden_terms = (
        "compressibility",
        "spectrum",
        "whole_sector",
        "whole-sector",
    )
    for name in CSV_HEADERS:
        path = root / TEMPLATES / name
        if not path.exists():
            continue
        with path.open(newline="", encoding="utf-8") as handle:
            for row_number, row in enumerate(csv.reader(handle), 1):
                for value in row:
                    lowered = value.lower()
                    if value.lstrip().startswith("="):
                        errors.append(f"{name}:{row_number}: formulas are prohibited")
                    if "%" in value:
                        errors.append(f"{name}:{row_number}: percentages are prohibited")
                    if any(term in lowered for term in forbidden_terms):
                        errors.append(f"{name}:{row_number}: superseded or aggregate content found")
                    if re.search(r"\b(?:80|40|15)%\b", value):
                        errors.append(f"{name}:{row_number}: placeholder percentage found")


def find_disallowed_changed_paths(paths: Iterable[str]) -> list[str]:
    disallowed = []
    for path in paths:
        normalized = path.strip()
        if not normalized:
            continue
        if normalized in ALLOWED_CHANGED_FILES:
            continue
        if normalized.startswith(ALLOWED_CHANGED_PREFIXES):
            continue
        disallowed.append(normalized)
    return sorted(set(disallowed))


def collect_changed_paths(root: Path) -> list[str]:
    commands = [
        ["git", "diff", "--name-only", "main...HEAD"],
        ["git", "diff", "--name-only"],
        ["git", "diff", "--cached", "--name-only"],
        ["git", "ls-files", "--others", "--exclude-standard"],
    ]
    changed: set[str] = set()
    for command in commands:
        result = subprocess.run(
            command,
            cwd=root,
            check=False,
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            raise RuntimeError(
                f"change-scope command failed: {' '.join(command)}: {result.stderr.strip()}"
            )
        changed.update(line for line in result.stdout.splitlines() if line)
    return sorted(changed)


def validate_change_scope(root: Path, errors: list[str]) -> None:
    try:
        changed = collect_changed_paths(root)
    except RuntimeError as exc:
        errors.append(str(exc))
        return
    disallowed = find_disallowed_changed_paths(changed)
    if disallowed:
        errors.append(
            "worksheet branch includes out-of-scope application, UI, figure, scenario, "
            "coupling, canonical-data, or other changes: " + ", ".join(disallowed)
        )


def validate(root: Path = ROOT, *, check_change_scope: bool = True) -> list[str]:
    errors: list[str] = []
    for relative_path in REQUIRED_PACKAGE_FILES:
        if not (root / relative_path).exists():
            errors.append(f"missing required worksheet file: {relative_path}")

    loaded = validate_headers_and_shapes(root, errors)
    stages = validate_taxonomy(loaded.get("stages.csv", []), errors)
    profiles = validate_profiles(loaded.get("stage_profiles.csv", []), stages, errors)
    validate_submission_templates(
        loaded.get("fable_submission.csv", []),
        loaded.get("blind_submission.csv", []),
        profiles,
        errors,
    )
    validate_header_only_templates(loaded, profiles, errors)
    validate_no_forbidden_content(root, errors)
    if check_change_scope:
        validate_change_scope(root, errors)
    return errors


def main() -> None:
    errors = validate()
    if errors:
        print("Structural Profiles worksheet validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        raise SystemExit(1)
    print(
        "Structural Profiles worksheet validation passed: "
        "39 taxonomy rows, 31 leaf profiles, 31 Fable shells, 31 blind shells."
    )


if __name__ == "__main__":
    main()
