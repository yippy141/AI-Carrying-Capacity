#!/usr/bin/env python3
"""Validate the blank, owner-reviewable Structural Profiles worksheet package."""

from __future__ import annotations

import argparse
import csv
import json
import re
import shutil
import tempfile
from pathlib import Path
from typing import Iterable

from openpyxl import load_workbook
from openpyxl.utils import column_index_from_string

try:
    from scripts.build_structural_profiles_workbooks import (
        ALLOWED_VALUES,
        BLIND_WORKBOOK,
        COUNTRY_HEADERS,
        DEFAULT_PACKAGE_DIR,
        FABLE_WORKBOOK,
        GOVERNANCE_HEADERS,
        OWNER_HEADERS,
        PROFILE_HEADERS,
        REFERENCE_WORKBOOK,
        REVIEW_HEADERS,
        STAGE_HEADERS,
        SUBMISSION_HEADERS,
        build_all,
    )
except ModuleNotFoundError:  # Supports direct execution from scripts/.
    from build_structural_profiles_workbooks import (  # type: ignore[no-redef]
        ALLOWED_VALUES,
        BLIND_WORKBOOK,
        COUNTRY_HEADERS,
        DEFAULT_PACKAGE_DIR,
        FABLE_WORKBOOK,
        GOVERNANCE_HEADERS,
        OWNER_HEADERS,
        PROFILE_HEADERS,
        REFERENCE_WORKBOOK,
        REVIEW_HEADERS,
        STAGE_HEADERS,
        SUBMISSION_HEADERS,
        build_all,
    )


EXPECTED_LEAVES = [
    "requirements_and_architecture",
    "implementation",
    "verification_and_validation",
    "deployment",
    "operations_and_maintenance",
    "product_design",
    "process_engineering",
    "supply_and_tooling",
    "retooling_and_commissioning",
    "production_planning_and_scheduling",
    "production_and_process_control",
    "quality_assurance",
    "maintenance_and_continuous_improvement",
    "theory_and_system_design",
    "simulation",
    "experiment_selection",
    "diagnostics",
    "plasma_control",
    "materials_discovery_and_screening",
    "materials_qualification",
    "magnets",
    "heating_and_current_drive",
    "plasma_facing_components",
    "tritium_and_fuel_cycle",
    "blankets",
    "component_fabrication",
    "construction",
    "commissioning",
    "reliability_demonstration",
    "licensing",
    "grid_integration",
]

EXPECTED_FUSION_PARENTS = {
    "concept_and_design",
    "digital_experiment_loop",
    "plasma_operations",
    "materials",
    "plant_subsystems",
    "build",
    "demonstration_and_assurance",
    "approval_and_connection",
}

EXPECTED_PATHWAYS = {
    **{
        stage: "mature_software_delivery_and_maintenance"
        for stage in EXPECTED_LEAVES[:5]
    },
    **{
        stage: "discrete_manufacturing_npi_and_operations"
        for stage in EXPECTED_LEAVES[5:13]
    },
    **{
        stage: "tokamak_research_to_pilot_plant_demonstration"
        for stage in EXPECTED_LEAVES[13:]
    },
}

EXPECTED_PROFILE_IDS = [f"sp-{index:04d}" for index in range(1, 32)]
S_FIELDS = ["S1", "S2", "S3", "S4", "S5"]
C_FIELDS = [field for field in COUNTRY_HEADERS if re.fullmatch(r"C[1-8]_.+", field)]
SCOPE_FIELDS = {
    "profile_id",
    "stage_id",
    "parent_stage_id",
    "sector",
    "workflow",
    "pathway_id",
    "application_context",
    "critical_path_role",
}

FABLE_IDENTITY = {
    "coder_type": "model",
    "coder_role": "seed_proposer",
    "coder_name": "fable",
    "coder_model": "claude-fable-5",
}

FORBIDDEN_BLIND_TEXT = ("fable", "claude-fable-5", "seed_proposer")
FORBIDDEN_DERIVED_HEADER_TOKENS = (
    "score",
    "average",
    "weighted",
    "composite",
    "percentage",
    "percent",
)

REFERENCE_SHEETS = [
    "START_HERE",
    "S1_S5_RUBRIC",
    "STAGE_TAXONOMY",
    "SCOPED_PROFILES",
    "EXCEPTION_RULES",
    "OWNER_DECISIONS",
    "COUNTRY_MODIFIERS_TEMPLATE",
    "GOVERNANCE_TEMPLATE",
    "DATA_DICTIONARY",
]


class WorksheetValidationError(ValueError):
    """Raised when one or more package checks fail."""

    def __init__(self, errors: list[str]):
        self.errors = errors
        super().__init__("\n".join(errors))


def read_csv_exact(
    path: Path, expected_headers: list[str], errors: list[str]
) -> list[dict[str, str]]:
    if not path.exists():
        errors.append(f"Missing required template: {path.name}")
        return []
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if reader.fieldnames != expected_headers:
            errors.append(
                f"{path.name} header must exactly match the canonical schema. "
                f"Expected {expected_headers}; found {reader.fieldnames}."
            )
            return []
        rows: list[dict[str, str]] = []
        for row_number, row in enumerate(reader, start=2):
            if None in row:
                errors.append(f"{path.name}:{row_number} has extra CSV fields.")
                continue
            rows.append({key: value or "" for key, value in row.items()})
        return rows


def validate_taxonomy(
    stages: list[dict[str, str]], errors: list[str]
) -> dict[str, dict[str, str]]:
    stage_by_id: dict[str, dict[str, str]] = {}
    for row_number, row in enumerate(stages, start=2):
        stage_id = row["stage_id"]
        if not stage_id:
            errors.append(f"stages.csv:{row_number} stage_id is required.")
            continue
        if stage_id in stage_by_id:
            errors.append(f"stages.csv has duplicate stage_id {stage_id!r}.")
        stage_by_id[stage_id] = row
        if row["leaf_status"] not in {"leaf", "parent"}:
            errors.append(
                f"stages.csv:{row_number} leaf_status must be leaf or parent."
            )

    for row_number, row in enumerate(stages, start=2):
        parent = row["parent_stage_id"]
        if parent != "not_applicable" and parent not in stage_by_id:
            errors.append(
                f"stages.csv:{row_number} parent_stage_id {parent!r} does not resolve."
            )
        if parent in stage_by_id and stage_by_id[parent]["leaf_status"] != "parent":
            errors.append(
                f"stages.csv:{row_number} parent_stage_id {parent!r} is not a parent row."
            )

    actual_leaves = [row["stage_id"] for row in stages if row["leaf_status"] == "leaf"]
    if actual_leaves != EXPECTED_LEAVES:
        missing = [stage for stage in EXPECTED_LEAVES if stage not in actual_leaves]
        extra = [stage for stage in actual_leaves if stage not in EXPECTED_LEAVES]
        errors.append(
            "stages.csv must contain every frozen leaf exactly once and in canonical "
            f"order. Missing={missing}; extra={extra}; actual_count={len(actual_leaves)}."
        )

    actual_parents = {
        row["stage_id"] for row in stages if row["leaf_status"] == "parent"
    }
    if actual_parents != EXPECTED_FUSION_PARENTS:
        errors.append(
            "stages.csv parent rows must be exactly the eight frozen fusion groups. "
            f"Found {sorted(actual_parents)}."
        )
    return stage_by_id


def validate_profiles(
    profiles: list[dict[str, str]],
    stage_by_id: dict[str, dict[str, str]],
    errors: list[str],
) -> dict[str, dict[str, str]]:
    profile_ids = [row["profile_id"] for row in profiles]
    if profile_ids != EXPECTED_PROFILE_IDS:
        errors.append(
            "stage_profiles_template.csv profile_ids must be the stable opaque sequence "
            f"{EXPECTED_PROFILE_IDS[0]} through {EXPECTED_PROFILE_IDS[-1]} in order."
        )
    if len(set(profile_ids)) != len(profile_ids):
        errors.append("stage_profiles_template.csv profile_ids must be unique.")
    for profile_id in profile_ids:
        if not re.fullmatch(r"sp-[0-9]{4}", profile_id):
            errors.append(f"profile_id {profile_id!r} is not a stable opaque package ID.")

    actual_stages = [row["stage_id"] for row in profiles]
    if actual_stages != EXPECTED_LEAVES:
        errors.append(
            "stage_profiles_template.csv must contain one row per frozen leaf in the "
            "same canonical order as stages.csv."
        )

    profile_by_id: dict[str, dict[str, str]] = {}
    for row_number, row in enumerate(profiles, start=2):
        profile_id = row["profile_id"]
        profile_by_id[profile_id] = row
        stage_id = row["stage_id"]
        taxonomy = stage_by_id.get(stage_id)
        if taxonomy is None:
            errors.append(
                f"stage_profiles_template.csv:{row_number} stage_id {stage_id!r} "
                "does not resolve in stages.csv."
            )
            continue
        if taxonomy["leaf_status"] != "leaf":
            errors.append(
                f"stage_profiles_template.csv:{row_number} must reference a leaf stage."
            )
        for field in ("parent_stage_id", "sector"):
            if row[field] != taxonomy[field]:
                errors.append(
                    f"stage_profiles_template.csv:{row_number} {field} must exactly "
                    f"match stages.csv for {stage_id}."
                )
        expected_pathway = EXPECTED_PATHWAYS.get(stage_id)
        if row["pathway_id"] != expected_pathway:
            errors.append(
                f"stage_profiles_template.csv:{row_number} pathway_id must be "
                f"{expected_pathway!r} for {stage_id}."
            )
        if not row["application_context"]:
            errors.append(
                f"stage_profiles_template.csv:{row_number} application_context must "
                "carry the frozen anchor scope."
            )
        if row["lifecycle_phase"]:
            errors.append(
                f"stage_profiles_template.csv:{row_number} lifecycle_phase must remain "
                "blank in this package pending substantive scope judgment."
            )
        if row["critical_path_role"] != "not_assessed":
            errors.append(
                f"stage_profiles_template.csv:{row_number} critical_path_role must be "
                "not_assessed in the blank package."
            )
        for field in PROFILE_HEADERS:
            if field not in SCOPE_FIELDS and row[field]:
                errors.append(
                    f"stage_profiles_template.csv:{row_number} {field} must remain blank "
                    "because only scope/taxonomy fields may be populated."
                )
    return profile_by_id


def validate_review_templates(
    fable_rows: list[dict[str, str]],
    blind_rows: list[dict[str, str]],
    profile_ids: list[str],
    errors: list[str],
) -> None:
    fable_order = [row["profile_id"] for row in fable_rows]
    blind_order = [row["profile_id"] for row in blind_rows]
    if fable_order != profile_ids or blind_order != profile_ids:
        errors.append(
            "Fable and blind CSV templates must contain the identical profile set and "
            "ordering as stage_profiles_template.csv."
        )
    if fable_order != blind_order:
        errors.append("Fable and blind CSV profile sets/order differ.")

    for row_number, row in enumerate(fable_rows, start=2):
        for field, expected in FABLE_IDENTITY.items():
            if row[field] != expected:
                errors.append(
                    f"profile_coding_reviews_fable_template.csv:{row_number} {field} "
                    f"must be {expected!r}."
                )
        for field in REVIEW_HEADERS:
            if field not in {"profile_id", *FABLE_IDENTITY} and row[field]:
                errors.append(
                    f"profile_coding_reviews_fable_template.csv:{row_number} {field} "
                    "must remain blank."
                )

    for row_number, row in enumerate(blind_rows, start=2):
        for field in REVIEW_HEADERS:
            if field != "profile_id" and row[field]:
                errors.append(
                    f"profile_coding_reviews_blind_template.csv:{row_number} {field} "
                    "must be neutral and blank."
                )
        joined = " ".join(row.values()).lower()
        if any(text in joined for text in FORBIDDEN_BLIND_TEXT):
            errors.append(
                f"profile_coding_reviews_blind_template.csv:{row_number} contains "
                "seed-coder identity or hints."
            )


def validate_country_modifier_pathways(
    modifiers: list[dict[str, str]],
    profile_by_id: dict[str, dict[str, str]],
    errors: list[str],
) -> None:
    """Enforce the canonical denormalized profile/pathway referential rule."""
    for row_number, row in enumerate(modifiers, start=2):
        if not any(row.values()):
            continue
        profile_id = row["profile_id"]
        profile = profile_by_id.get(profile_id)
        if profile is None:
            errors.append(
                f"country_stage_modifiers_template.csv:{row_number} profile_id "
                f"{profile_id!r} does not resolve."
            )
            continue
        if row["pathway_id"] != profile["pathway_id"]:
            errors.append(
                f"country_stage_modifiers_template.csv:{row_number} pathway_id "
                f"{row['pathway_id']!r} does not match referenced profile_id "
                f"{profile_id!r} pathway_id {profile['pathway_id']!r}."
            )


def validate_blank_rows(
    filename: str, rows: list[dict[str, str]], errors: list[str]
) -> None:
    populated = [index for index, row in enumerate(rows, start=2) if any(row.values())]
    if populated:
        errors.append(
            f"{filename} must be header-only in the blank package; populated rows: {populated}."
        )


def validate_no_invented_sources(
    named_rows: Iterable[tuple[str, list[dict[str, str]]]], errors: list[str]
) -> None:
    for filename, rows in named_rows:
        for row_number, row in enumerate(rows, start=2):
            for field in row:
                if "source_ids" in field and row[field]:
                    errors.append(
                        f"{filename}:{row_number} {field} must remain blank; source IDs "
                        "may not be invented in this package."
                    )


def validate_no_derived_headers(
    named_headers: Iterable[tuple[str, list[str]]], errors: list[str]
) -> None:
    for filename, headers in named_headers:
        for header in headers:
            lowered = header.lower()
            if any(token in lowered for token in FORBIDDEN_DERIVED_HEADER_TOKENS):
                errors.append(
                    f"{filename} contains prohibited derived field {header!r}; no sector "
                    "scores, averages, weighted composites, or ordinal percentages are allowed."
                )


def validate_exception_schema(path: Path, errors: list[str]) -> None:
    try:
        schema = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"exception_report.schema.json is unreadable: {exc}")
        return
    try:
        metadata = schema["properties"]["metadata"]["properties"]
        if metadata["comparison_key"]["const"] != ["profile_id", "s_dimension"]:
            errors.append("Exception schema must compare by profile_id and s_dimension.")
        aggregation = metadata["aggregation_rule"]["const"]
        if not all(token in aggregation for token in ("no_averaging", "midpoint", "consensus")):
            errors.append(
                "Exception schema must explicitly prohibit averaging, midpoint selection, "
                "and forced consensus."
            )
        flags = schema["$defs"]["exception"]["properties"]["flags"]["items"]["enum"]
        expected_flags = {
            "absolute_difference_ge_2",
            "extreme_0_vs_4",
            "potential_band_or_critical_path_change",
            "contradictory_rationales",
            "missing_or_incompatible_source_support",
            "low_confidence_load_bearing_stage",
            "scope_pathway_application_or_lifecycle_ambiguity",
        }
        if set(flags) != expected_flags:
            errors.append("Exception schema does not contain exactly the required flag set.")
        dispositions = schema["$defs"]["exception"]["properties"][
            "owner_disposition"
        ]["enum"]
        if set(dispositions) != {*ALLOWED_VALUES["owner_disposition"], None}:
            errors.append("Exception schema owner dispositions do not match the method task.")
        routine = schema["properties"]["routine_domain_reviews"]
        if routine.get("minItems") != 18 or routine.get("maxItems") != 18:
            errors.append("Exception schema must require all 18 fusion profiles for review.")
        routine_definition = schema["$defs"]["routineDomainReview"]["properties"]
        if routine_definition["owner_decision_required"].get("const") is not False:
            errors.append(
                "Routine fusion domain review must be distinct from an owner decision."
            )
    except (KeyError, TypeError) as exc:
        errors.append(f"Exception schema is missing required contract elements: {exc}")


def normalized(value: object) -> str:
    if value is None:
        return ""
    return str(value)


def sheet_table(
    workbook_path: Path,
    sheet_name: str,
    expected_headers: list[str],
    errors: list[str],
) -> list[dict[str, str]]:
    workbook = load_workbook(workbook_path, data_only=False)
    if sheet_name not in workbook.sheetnames:
        errors.append(f"{workbook_path.name} is missing sheet {sheet_name}.")
        return []
    sheet = workbook[sheet_name]
    actual_headers = [normalized(sheet.cell(3, column).value) for column in range(1, len(expected_headers) + 1)]
    if actual_headers != expected_headers:
        errors.append(
            f"{workbook_path.name}:{sheet_name} header mismatch. Expected "
            f"{expected_headers}; found {actual_headers}."
        )
        return []
    rows: list[dict[str, str]] = []
    for row_number in range(4, sheet.max_row + 1):
        values = [normalized(sheet.cell(row_number, column).value) for column in range(1, len(expected_headers) + 1)]
        if any(values):
            rows.append(dict(zip(expected_headers, values, strict=True)))
    return rows


def validation_column(validation_range: str) -> int | None:
    first_range = validation_range.split()[0]
    first_cell = first_range.split(":")[0].replace("$", "")
    match = re.match(r"([A-Z]+)[0-9]+", first_cell)
    return column_index_from_string(match.group(1)) if match else None


def workbook_dropdowns(workbook_path: Path, sheet_name: str) -> dict[str, list[str]]:
    workbook = load_workbook(workbook_path, data_only=False)
    sheet = workbook[sheet_name]
    headers = {
        column: normalized(sheet.cell(3, column).value)
        for column in range(1, sheet.max_column + 1)
    }
    found: dict[str, list[str]] = {}
    for validation in sheet.data_validations.dataValidation:
        if validation.type != "list":
            continue
        column = validation_column(str(validation.sqref))
        if column is None or not validation.formula1:
            continue
        formula = validation.formula1
        values = formula[1:-1].split(",") if formula.startswith('"') else [formula]
        found[headers.get(column, "")] = values
    return found


def validate_dropdowns(
    workbook_path: Path,
    sheet_name: str,
    expected: dict[str, list[str]],
    errors: list[str],
) -> None:
    actual = workbook_dropdowns(workbook_path, sheet_name)
    if actual != expected:
        errors.append(
            f"{workbook_path.name}:{sheet_name} allowed-value dropdowns must match the "
            f"canonical method. Expected {expected}; found {actual}."
        )


def validate_ordinal_dropdowns(
    workbook_path: Path,
    sheet_name: str,
    fields: set[str],
    errors: list[str],
) -> None:
    workbook = load_workbook(workbook_path, data_only=False)
    sheet = workbook[sheet_name]
    headers = {
        column: normalized(sheet.cell(3, column).value)
        for column in range(1, sheet.max_column + 1)
    }
    actual: set[str] = set()
    for validation in sheet.data_validations.dataValidation:
        if validation.type != "whole":
            continue
        if str(validation.formula1) != "0" or str(validation.formula2) != "4":
            errors.append(
                f"{workbook_path.name}:{sheet_name} has a noncanonical ordinal range."
            )
        column = validation_column(str(validation.sqref))
        if column:
            actual.add(headers.get(column, ""))
    if actual != fields:
        errors.append(
            f"{workbook_path.name}:{sheet_name} must validate exactly {sorted(fields)} "
            f"as whole-number 0-4 fields; found {sorted(actual)}."
        )


def validate_workbook_structure(
    workbook_path: Path,
    expected_sheets: list[str],
    errors: list[str],
) -> None:
    if not workbook_path.exists():
        errors.append(f"Missing required workbook: {workbook_path.name}")
        return
    workbook = load_workbook(workbook_path, data_only=False)
    if workbook.sheetnames != expected_sheets:
        errors.append(
            f"{workbook_path.name} sheet order/names mismatch. Expected "
            f"{expected_sheets}; found {workbook.sheetnames}."
        )
    for sheet in workbook.worksheets:
        for row in sheet.iter_rows():
            for cell in row:
                if cell.data_type == "f":
                    errors.append(
                        f"{workbook_path.name}:{sheet.title}!{cell.coordinate} contains a "
                        "formula; this blank package must not calculate S/C aggregates."
                    )
        if sheet.title != "START_HERE":
            if not sheet.freeze_panes:
                errors.append(f"{workbook_path.name}:{sheet.title} must freeze headers.")
            if not sheet.auto_filter.ref:
                errors.append(f"{workbook_path.name}:{sheet.title} must enable filters.")


def compare_rows(
    label: str,
    workbook_rows: list[dict[str, str]],
    csv_rows: list[dict[str, str]],
    fields: list[str],
    errors: list[str],
) -> None:
    workbook_view = [{field: row.get(field, "") for field in fields} for row in workbook_rows]
    csv_view = [{field: row.get(field, "") for field in fields} for row in csv_rows]
    if workbook_view != csv_view:
        errors.append(f"{label} does not match its CSV template.")


def validate_workbooks(
    package_dir: Path,
    stages: list[dict[str, str]],
    profiles: list[dict[str, str]],
    fable_rows: list[dict[str, str]],
    blind_rows: list[dict[str, str]],
    errors: list[str],
) -> None:
    reference_path = package_dir / REFERENCE_WORKBOOK
    fable_path = package_dir / FABLE_WORKBOOK
    blind_path = package_dir / BLIND_WORKBOOK

    validate_workbook_structure(reference_path, REFERENCE_SHEETS, errors)
    validate_workbook_structure(fable_path, ["S1_S5_RUBRIC", "SUBMISSION"], errors)
    validate_workbook_structure(blind_path, ["S1_S5_RUBRIC", "SUBMISSION"], errors)
    if not all(path.exists() for path in (reference_path, fable_path, blind_path)):
        return

    taxonomy_rows = sheet_table(
        reference_path, "STAGE_TAXONOMY", STAGE_HEADERS, errors
    )
    scoped_rows = sheet_table(
        reference_path, "SCOPED_PROFILES", PROFILE_HEADERS, errors
    )
    owner_rows = sheet_table(reference_path, "OWNER_DECISIONS", OWNER_HEADERS, errors)
    country_rows = sheet_table(
        reference_path, "COUNTRY_MODIFIERS_TEMPLATE", COUNTRY_HEADERS, errors
    )
    governance_rows = sheet_table(
        reference_path, "GOVERNANCE_TEMPLATE", GOVERNANCE_HEADERS, errors
    )
    compare_rows("Reference workbook taxonomy", taxonomy_rows, stages, STAGE_HEADERS, errors)
    compare_rows(
        "Reference workbook scoped profiles",
        scoped_rows,
        profiles,
        PROFILE_HEADERS,
        errors,
    )
    if owner_rows or country_rows or governance_rows:
        errors.append(
            "Reference workbook owner, country-modifier, and governance templates must "
            "contain no populated rows."
        )

    fable_submission = sheet_table(
        fable_path, "SUBMISSION", SUBMISSION_HEADERS, errors
    )
    blind_submission = sheet_table(
        blind_path, "SUBMISSION", SUBMISSION_HEADERS, errors
    )
    compare_rows(
        "Fable workbook canonical submission fields",
        fable_submission,
        fable_rows,
        REVIEW_HEADERS,
        errors,
    )
    compare_rows(
        "Blind workbook canonical submission fields",
        blind_submission,
        blind_rows,
        REVIEW_HEADERS,
        errors,
    )
    reference_fields = [
        "profile_id",
        "stage_id",
        "parent_stage_id",
        "sector",
        "workflow",
        "pathway_id",
        "application_context",
        "lifecycle_phase",
        "critical_path_role",
    ]
    compare_rows(
        "Fable workbook scope references",
        fable_submission,
        profiles,
        reference_fields,
        errors,
    )
    compare_rows(
        "Blind workbook scope references",
        blind_submission,
        profiles,
        reference_fields,
        errors,
    )
    fable_order = [row["profile_id"] for row in fable_submission]
    blind_order = [row["profile_id"] for row in blind_submission]
    if fable_order != blind_order or fable_order != EXPECTED_PROFILE_IDS:
        errors.append("Fable and blind workbooks must have identical profile sets/order.")

    for workbook_path, rows in (
        (reference_path, scoped_rows),
        (fable_path, fable_submission),
        (blind_path, blind_submission),
    ):
        for row_number, row in enumerate(rows, start=4):
            for field in S_FIELDS:
                if row.get(field, ""):
                    errors.append(
                        f"{workbook_path.name}:row {row_number} {field} must remain blank."
                    )
            if row.get("coding_confidence", ""):
                errors.append(
                    f"{workbook_path.name}:row {row_number} coding_confidence must be blank."
                )
            for field in row:
                if "source_ids" in field and row[field]:
                    errors.append(
                        f"{workbook_path.name}:row {row_number} {field} must remain blank."
                    )
    for row_number, row in enumerate(country_rows, start=4):
        for field in C_FIELDS:
            if row.get(field, ""):
                errors.append(
                    f"{reference_path.name}:row {row_number} {field} must remain blank."
                )

    blind_workbook = load_workbook(blind_path, data_only=False)
    blind_text = " ".join(
        normalized(cell.value)
        for sheet in blind_workbook.worksheets
        for row in sheet.iter_rows()
        for cell in row
        if cell.value is not None
    ).lower()
    blind_metadata = " ".join(
        normalized(value)
        for value in (
            blind_workbook.properties.creator,
            blind_workbook.properties.title,
            blind_workbook.properties.subject,
            blind_workbook.properties.description,
        )
    ).lower()
    if any(text in blind_text or text in blind_metadata for text in FORBIDDEN_BLIND_TEXT):
        errors.append("Blind workbook contains seed-coder identity, values, or hints.")

    validate_dropdowns(
        reference_path,
        "STAGE_TAXONOMY",
        {"leaf_status": ALLOWED_VALUES["leaf_status"]},
        errors,
    )
    validate_dropdowns(
        reference_path,
        "SCOPED_PROFILES",
        {
            "lifecycle_phase": ALLOWED_VALUES["lifecycle_phase"],
            "critical_path_role": ALLOWED_VALUES["critical_path_role"],
            "coding_confidence": ALLOWED_VALUES["coding_confidence"],
            "evidence_basis": ALLOWED_VALUES["evidence_basis"],
            "coding_status": ALLOWED_VALUES["coding_status"],
            "review_status": ALLOWED_VALUES["review_status"],
        },
        errors,
    )
    validate_dropdowns(
        reference_path,
        "OWNER_DECISIONS",
        {
            "owner_disposition": ALLOWED_VALUES["owner_disposition"],
            "S_dimension": ALLOWED_VALUES["S_dimension"],
        },
        errors,
    )
    validate_dropdowns(
        reference_path,
        "COUNTRY_MODIFIERS_TEMPLATE",
        {
            "actor_scope": ALLOWED_VALUES["actor_scope"],
            "stage_applicability": ALLOWED_VALUES["stage_applicability"],
            "binding_status": ALLOWED_VALUES["binding_status"],
            "evidence_basis": ALLOWED_VALUES["evidence_basis"],
            "coding_status": ALLOWED_VALUES["coding_status"],
            "review_status": ALLOWED_VALUES["review_status"],
        },
        errors,
    )
    validate_dropdowns(
        reference_path,
        "GOVERNANCE_TEMPLATE",
        {
            "actor_scope": ALLOWED_VALUES["actor_scope"],
            "evidence_basis": ALLOWED_VALUES["evidence_basis"],
            "coding_status": ALLOWED_VALUES["coding_status"],
            "review_status": ALLOWED_VALUES["review_status"],
        },
        errors,
    )
    for path in (fable_path, blind_path):
        validate_dropdowns(
            path,
            "SUBMISSION",
            {
                "coder_type": ALLOWED_VALUES["coder_type"],
                "coding_confidence": ALLOWED_VALUES["coding_confidence"],
                "submission_status": ALLOWED_VALUES["submission_status"],
            },
            errors,
        )
        validate_ordinal_dropdowns(path, "SUBMISSION", set(S_FIELDS), errors)
    validate_ordinal_dropdowns(
        reference_path, "SCOPED_PROFILES", set(S_FIELDS), errors
    )


def validate_reproducible_workbooks(package_dir: Path, errors: list[str]) -> None:
    input_names = [
        "stages.csv",
        "stage_profiles_template.csv",
        "profile_coding_reviews_fable_template.csv",
        "profile_coding_reviews_blind_template.csv",
        "country_stage_modifiers_template.csv",
        "governance_overlay_template.csv",
        "owner_decisions_template.csv",
    ]
    with tempfile.TemporaryDirectory() as temporary_directory:
        temporary = Path(temporary_directory)
        for name in input_names:
            shutil.copy2(package_dir / name, temporary / name)
        build_all(temporary)
        for name in (REFERENCE_WORKBOOK, FABLE_WORKBOOK, BLIND_WORKBOOK):
            committed = package_dir / name
            rebuilt = temporary / name
            if not committed.exists() or committed.read_bytes() != rebuilt.read_bytes():
                errors.append(
                    f"{name} is not the reproducible output of "
                    "scripts/build_structural_profiles_workbooks.py."
                )


def validate(package_dir: Path = DEFAULT_PACKAGE_DIR) -> dict[str, int]:
    package_dir = package_dir.resolve()
    errors: list[str] = []

    stages = read_csv_exact(package_dir / "stages.csv", STAGE_HEADERS, errors)
    profiles = read_csv_exact(
        package_dir / "stage_profiles_template.csv", PROFILE_HEADERS, errors
    )
    fable_rows = read_csv_exact(
        package_dir / "profile_coding_reviews_fable_template.csv",
        REVIEW_HEADERS,
        errors,
    )
    blind_rows = read_csv_exact(
        package_dir / "profile_coding_reviews_blind_template.csv",
        REVIEW_HEADERS,
        errors,
    )
    country_rows = read_csv_exact(
        package_dir / "country_stage_modifiers_template.csv", COUNTRY_HEADERS, errors
    )
    governance_rows = read_csv_exact(
        package_dir / "governance_overlay_template.csv", GOVERNANCE_HEADERS, errors
    )
    owner_rows = read_csv_exact(
        package_dir / "owner_decisions_template.csv", OWNER_HEADERS, errors
    )

    stage_by_id = validate_taxonomy(stages, errors)
    profile_by_id = validate_profiles(profiles, stage_by_id, errors)
    validate_review_templates(
        fable_rows,
        blind_rows,
        [row["profile_id"] for row in profiles],
        errors,
    )
    validate_country_modifier_pathways(country_rows, profile_by_id, errors)
    validate_blank_rows("country_stage_modifiers_template.csv", country_rows, errors)
    validate_blank_rows("governance_overlay_template.csv", governance_rows, errors)
    validate_blank_rows("owner_decisions_template.csv", owner_rows, errors)
    validate_no_invented_sources(
        [
            ("stage_profiles_template.csv", profiles),
            ("profile_coding_reviews_fable_template.csv", fable_rows),
            ("profile_coding_reviews_blind_template.csv", blind_rows),
            ("country_stage_modifiers_template.csv", country_rows),
            ("governance_overlay_template.csv", governance_rows),
            ("owner_decisions_template.csv", owner_rows),
        ],
        errors,
    )
    validate_no_derived_headers(
        [
            ("stage_profiles_template.csv", PROFILE_HEADERS),
            ("profile_coding_reviews_fable_template.csv", REVIEW_HEADERS),
            ("profile_coding_reviews_blind_template.csv", REVIEW_HEADERS),
            ("country_stage_modifiers_template.csv", COUNTRY_HEADERS),
            ("governance_overlay_template.csv", GOVERNANCE_HEADERS),
            ("owner_decisions_template.csv", OWNER_HEADERS),
        ],
        errors,
    )
    validate_exception_schema(package_dir / "exception_report.schema.json", errors)
    validate_workbooks(
        package_dir,
        stages,
        profiles,
        fable_rows,
        blind_rows,
        errors,
    )
    if not errors:
        validate_reproducible_workbooks(package_dir, errors)

    if errors:
        raise WorksheetValidationError(errors)
    return {
        "taxonomy_rows": len(stages),
        "leaf_stages": len(EXPECTED_LEAVES),
        "scoped_profiles": len(profiles),
        "fusion_profiles": len(EXPECTED_LEAVES[13:]),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--package-dir",
        type=Path,
        default=DEFAULT_PACKAGE_DIR,
        help="Directory containing the worksheet package.",
    )
    args = parser.parse_args()
    try:
        summary = validate(args.package_dir)
    except WorksheetValidationError as exc:
        print("Structural Profiles worksheet validation failed:")
        for error in exc.errors:
            print(f"- {error}")
        raise SystemExit(1) from exc
    print(
        "Structural Profiles worksheet validation passed: "
        f"{summary['leaf_stages']} leaf stages, "
        f"{summary['scoped_profiles']} scoped profiles, "
        f"{summary['fusion_profiles']} fusion profiles."
    )


if __name__ == "__main__":
    main()
