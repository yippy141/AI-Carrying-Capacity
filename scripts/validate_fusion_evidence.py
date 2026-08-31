#!/usr/bin/env python3
"""Validate the issue #35 fusion evidence inventory and protected inputs."""

from __future__ import annotations

import csv
import hashlib
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

from validate_fusion_source_promotion import (
    SourcePromotionValidationError,
    validate as validate_source_promotion,
)

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "research" / "fusion-evidence"

PACK_HASH = "ab6e2cec6ac9f58fcc03e65a5c73bd1fb0d508f0041c887048e24da0a5611347"
PACK_MARKER = b"<!-- BEGIN LOSSLESS BANKED ATTACHMENT -->\n"

PROTECTED_HASHES = {
    "research/structural-profiles-pilot/reconciliation/seed_submission_v1.csv": "9723a3c3a006b701fed3d000f77d89379610bc51f85eff3555b696078708e675",
    "research/structural-profiles-pilot/reconciliation/independent_submission_v1.csv": "4176afa878a850d7155a95772884bec72756353440b588f30e5414a37acdb973",
    "research/structural-profiles-pilot/reconciliation/comparison_audit_v1.csv": "85ed3710a1b25cdaf71228a02ed38fe115febe7cf12613fd40c7b65382ef93f2",
    "research/structural-profiles-pilot/reconciliation/owner_decisions_v1.csv": "c31ebb8a7de988617a9848232af7185afb46089bfd553d3293a189db3b8df168",
    "research/structural-profiles-pilot/reconciliation/owner_exceptions_v1.csv": "a6db404e5ee59f06d66348124126c3c4ae4165536ff117a7102bdde22e835c81",
    "research/structural-profiles-pilot/reconciliation/reconciliation_report_v1.json": "e81de7da0d62f6bd3d18c27c2a274b044b04392b2987532a9820f6cde1a1f85e",
}

REQUIRED_FILES = {
    "README.md",
    "VERIFICATION_REPORT.md",
    "fusion_test_evidence_pack_2026-08-12.md",
    "source_inventory_v1.csv",
    "claim_source_map_v1.csv",
    "profile_evidence_coverage_v1.csv",
    "staged_source_register_additions_v1.csv",
    "rejected_and_deferred_sources_v1.csv",
    "refresh_and_change_log_v1.csv",
    "fusion_source_review_v1.xlsx",
}

INVENTORY_HEADER = [
    "pack_source_id", "candidate_source_id", "title_original", "title_english",
    "authors_org", "publication_date", "access_date", "last_verified",
    "archive_url", "language", "source_type", "method_type", "claim_owner",
    "official_claim_status", "independent_validation_status", "url_or_doi",
    "original_language_url", "translation_reviewer", "translation_note",
    "reliability_tier", "evidence_basis", "geo_scope", "pathway_scope",
    "stage_ids", "profile_ids", "s_dimensions", "key_claims",
    "numerical_claims_and_locators", "limitations", "verification_status",
    "promotion_recommendation", "notes",
]

CLAIM_HEADER = [
    "claim_id", "profile_id", "stage_id", "s_dimension", "claim_text",
    "claim_type", "evidence_basis", "pack_source_ids", "candidate_source_ids",
    "support_direction", "directness", "scope_match", "pathway_match",
    "lifecycle_match", "quantitative_value", "unit", "denominator",
    "time_period", "source_locator", "counterevidence_or_confounder",
    "verification_status", "review_route", "notes",
]

STAGED_HEADER = [
    "source_id", "title_original", "title_english", "authors_org", "year",
    "publication_date", "access_date", "last_verified", "archive_url",
    "language", "source_type", "method_type", "claim_owner",
    "official_claim_status", "independent_validation_status", "url_or_doi",
    "original_language_url", "translation_reviewer", "translation_note",
    "reliability_tier", "geo_scope", "sector_scope", "key_claims",
    "useful_indicators", "limitations", "date_added", "added_by",
    "review_status", "placeholder", "notes",
]

PROFILE_IDS = [f"sp-{number:04d}" for number in range(14, 32)]
DIMENSIONS = ["S1", "S2", "S3", "S4", "S5"]
EVIDENCE_BASES = {
    "observed experimental result", "observed facility milestone", "official target",
    "company target", "programme announcement", "proof of concept",
    "model or scenario estimate", "observed legal/regulatory status", "inference",
    "commentary",
}
COVERAGE_STATUSES = {
    "directly supported", "indirectly supported/analogy",
    "contradicted or complicated", "no suitable source located",
    "not assessable under current scope",
}
WORKBOOK_SHEETS = [
    "START_HERE", "SOURCE_CANDIDATES", "CLAIM_SOURCE_MAP", "PROFILE_COVERAGE",
    "PROMOTION_EXCEPTIONS", "REJECTED_DEFERRED", "CHANGE_LOG", "DATA_DICTIONARY",
]
SHEET_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PKG_REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"


class FusionEvidenceValidationError(ValueError):
    """Raised when the fusion evidence bank violates the issue #35 contract."""


def read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        return list(reader.fieldnames or []), list(reader)


def require(condition: bool, message: str, errors: list[str]) -> None:
    if not condition:
        errors.append(message)


def _unique(rows: list[dict[str, str]], column: str) -> bool:
    values = [row[column] for row in rows]
    return len(values) == len(set(values)) and all(values)


def _xlsx_text(cell: ET.Element, shared_strings: list[str]) -> str:
    cell_type = cell.attrib.get("t")
    value = cell.find(f"{{{SHEET_NS}}}v")
    if value is not None and value.text is not None:
        if cell_type == "s":
            return shared_strings[int(value.text)]
        return value.text
    inline = cell.find(f"{{{SHEET_NS}}}is")
    if inline is not None:
        return "".join(node.text or "" for node in inline.iter(f"{{{SHEET_NS}}}t"))
    return ""


def validate_workbook(path: Path, errors: list[str]) -> None:
    with zipfile.ZipFile(path) as archive:
        workbook_root = ET.fromstring(archive.read("xl/workbook.xml"))
        sheets = workbook_root.find(f"{{{SHEET_NS}}}sheets")
        sheet_nodes = list(sheets) if sheets is not None else []
        names = [node.attrib["name"] for node in sheet_nodes]
        require(names == WORKBOOK_SHEETS, f"Workbook tabs drifted: {names}", errors)

        relations_root = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        targets = {
            node.attrib["Id"]: node.attrib["Target"]
            for node in relations_root.findall(f"{{{PKG_REL_NS}}}Relationship")
        }
        exception_node = next((node for node in sheet_nodes if node.attrib.get("name") == "PROMOTION_EXCEPTIONS"), None)
        require(exception_node is not None, "Workbook exception tab is missing.", errors)
        if exception_node is None:
            return
        relation_id = exception_node.attrib[f"{{{REL_NS}}}id"]
        target = targets[relation_id].lstrip("/")
        if not target.startswith("xl/"):
            target = f"xl/{target}"

        shared_strings: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            shared_root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
            for item in shared_root.findall(f"{{{SHEET_NS}}}si"):
                shared_strings.append("".join(node.text or "" for node in item.iter(f"{{{SHEET_NS}}}t")))

        sheet_root = ET.fromstring(archive.read(target))
        cells = {
            cell.attrib["r"]: _xlsx_text(cell, shared_strings)
            for cell in sheet_root.iter(f"{{{SHEET_NS}}}c")
        }
        headers = [cells.get(f"{column}1", "") for column in "ABCDEFGHIJ"]
        require("owner_decision" in headers, "Workbook exception tab lacks owner_decision field.", errors)
        for row_number in range(2, 10):
            require(cells.get(f"I{row_number}", "") == "", f"Workbook prefilled owner decision at I{row_number}.", errors)


def validate(package: Path = PACKAGE, *, require_workbook: bool = True) -> None:
    errors: list[str] = []
    missing = sorted(name for name in REQUIRED_FILES if not (package / name).exists())
    if not require_workbook:
        missing = [name for name in missing if name != "fusion_source_review_v1.xlsx"]
    require(not missing, f"Missing package files: {missing}", errors)

    if missing:
        raise FusionEvidenceValidationError("\n".join(errors))

    inventory_header, inventory = read_csv(package / "source_inventory_v1.csv")
    claim_header, claims = read_csv(package / "claim_source_map_v1.csv")
    coverage_header, coverage = read_csv(package / "profile_evidence_coverage_v1.csv")
    staged_header, staged = read_csv(package / "staged_source_register_additions_v1.csv")
    _, rejected = read_csv(package / "rejected_and_deferred_sources_v1.csv")
    _, changes = read_csv(package / "refresh_and_change_log_v1.csv")

    require(inventory_header == INVENTORY_HEADER, "Source inventory header drifted.", errors)
    require(claim_header == CLAIM_HEADER, "Claim-source header drifted.", errors)
    require(staged_header == STAGED_HEADER, "Staged source-register header drifted.", errors)
    require(len(inventory) == 46, f"Expected 46 corrected source candidates, found {len(inventory)}.", errors)
    require(len(staged) == 44, f"Expected 44 corrected staged rows, found {len(staged)}.", errors)
    require(len(claims) == 109, f"Expected 109 corrected atomic claim rows, found {len(claims)}.", errors)
    require(len(coverage) == 18, f"Expected exactly 18 profile rows, found {len(coverage)}.", errors)
    require(len(rejected) == 11, f"Expected 11 corrected rejected/deferred records, found {len(rejected)}.", errors)
    require(len(changes) == 10, f"Expected 10 corrected refresh/change rows, found {len(changes)}.", errors)
    require(_unique(inventory, "candidate_source_id"), "Candidate source IDs are missing or duplicated.", errors)
    require(_unique(claims, "claim_id"), "Claim IDs are missing or duplicated.", errors)

    inventory_by_id = {row["candidate_source_id"]: row for row in inventory}
    for line, row in enumerate(inventory, start=2):
        require(row["evidence_basis"] in EVIDENCE_BASES, f"source_inventory:{line}: invalid evidence basis", errors)
        require("wikipedia" not in " ".join(row.values()).lower(), f"source_inventory:{line}: Wikipedia is forbidden", errors)
        if row["promotion_recommendation"].startswith("stage"):
            require(row["verification_status"] not in {"unverified_locator", "partially_verified_scope_only"}, f"source_inventory:{line}: unverified source recommended for staging", errors)
            require(row["url_or_doi"].startswith("https://"), f"source_inventory:{line}: staged source lacks stable HTTPS URL/DOI", errors)
        if row["evidence_basis"] == "company target":
            require(row["claim_owner"] == "company", f"source_inventory:{line}: company target has wrong claim owner", errors)
            require(row["official_claim_status"] == "not_official_claim", f"source_inventory:{line}: company target typed as official", errors)
        if row["evidence_basis"] == "official target":
            require(row["official_claim_status"] == "official_target", f"source_inventory:{line}: official target status mismatch", errors)
        if row["evidence_basis"] == "observed facility milestone":
            text = " ".join([row["key_claims"], row["notes"]]).lower()
            require("ai result" not in text and "ai-driven" not in text, f"source_inventory:{line}: facility milestone presented as AI result", errors)

    law = inventory_by_id.get("fusion-src-004", {})
    require(law.get("url_or_doi") == "https://www.caea.gov.cn/n6760338/n6760344/n10763762/n10763767/c10704020/content.html", "PRC law must use the CAEA final-text locator.", errors)
    require(law.get("evidence_basis") == "observed legal/regulatory status", "PRC final law has the wrong research-bank evidence category.", errors)
    require("Article 39" in law.get("numerical_claims_and_locators", ""), "PRC final law must cite Article 39 for fusion regulation.", errors)
    require("Article 37" in law.get("limitations", "") and "disused radioactive" in law.get("limitations", ""), "PRC law must record that final Article 37 concerns disused radioactive sources.", errors)

    heat = inventory_by_id.get("fusion-src-023", {})
    require(heat.get("url_or_doi") == "https://www.pppl.gov/news/2025/finding-shadows-fusion-system-faster-ai", "HEAT-ML exact PPPL locator is missing.", errors)
    require("10.1016/j.fusengdes.2025.115010" in " ".join(heat.values()), "HEAT-ML linked DOI is missing.", errors)
    require(heat.get("verification_status") == "verified_peer_reviewed", "HEAT-ML must no longer be unverified.", errors)

    iter_source = inventory_by_id.get("fusion-src-037", {})
    require(iter_source.get("verification_status") == "verified_official_primary", "ITER sixth-module source must be verified official primary.", errors)
    require("sixth of nine" in iter_source.get("key_claims", "").lower(), "ITER sixth-of-nine milestone is missing.", errors)

    nstx = inventory_by_id.get("fusion-src-030", {})
    require(nstx.get("url_or_doi") == "https://www.pppl.gov/nstx-u", "NSTX-U must use the living project page.", errors)
    require("93%" in nstx.get("numerical_claims_and_locators", ""), "NSTX-U 93% status is missing.", errors)
    require("Freshness trigger" in nstx.get("notes", ""), "NSTX-U living-page status lacks a freshness trigger.", errors)

    for source_id in ("fusion-src-045", "fusion-src-046"):
        require(source_id in inventory_by_id, f"Targeted IFMIF-DONES source is missing: {source_id}", errors)
    ifmif_text = " ".join(
        " ".join(inventory_by_id[source_id].values())
        for source_id in ("fusion-src-045", "fusion-src-046")
        if source_id in inventory_by_id
    )
    for required_text in ("20-30 dpa", "2.5 full-power years", "300 cm3", "50 dpa", "3 full-power years", "100 cm3", "post-irradiation", "not perfectly matched"):
        require(required_text.lower() in ifmif_text.lower(), f"IFMIF-DONES scope is missing: {required_text}", errors)

    for source_id in ("fusion-src-004", "fusion-src-039", "fusion-src-040"):
        require(inventory_by_id.get(source_id, {}).get("evidence_basis") == "observed legal/regulatory status", f"{source_id} has the wrong legal/regulatory evidence category.", errors)
    require(inventory_by_id.get("fusion-src-039", {}).get("source_type") == "official_proposed_rule", "NRC proposed rule must remain distinct from final law/rule.", errors)

    staged_ids = {row["source_id"] for row in staged}
    expected_staged_ids = {
        row["candidate_source_id"]
        for row in inventory
        if row["promotion_recommendation"].startswith("stage")
    }
    require(staged_ids == expected_staged_ids, "Staged rows do not exactly match promotion recommendations.", errors)
    for line, row in enumerate(staged, start=2):
        require(row["review_status"] == "staged", f"staged_register:{line}: review_status must be staged", errors)
        require(row["placeholder"] == "false", f"staged_register:{line}: placeholder must be false", errors)
        require(row["source_id"] in inventory_by_id, f"staged_register:{line}: source_id does not resolve", errors)
        require(row["url_or_doi"].startswith("https://"), f"staged_register:{line}: URL/DOI is missing", errors)
        require("Provisional candidate ID; not canonical" in row["notes"], f"staged_register:{line}: candidate status not explicit", errors)

    owner_exceptions: set[tuple[str, str]] = set()
    claims_by_id = {row["claim_id"]: row for row in claims}
    for line, row in enumerate(claims, start=2):
        require(row["profile_id"] in PROFILE_IDS, f"claim_map:{line}: profile_id does not resolve", errors)
        require(row["s_dimension"] in DIMENSIONS, f"claim_map:{line}: invalid S dimension", errors)
        require(row["evidence_basis"] in EVIDENCE_BASES, f"claim_map:{line}: invalid evidence basis", errors)
        for source_id in row["candidate_source_ids"].split(";"):
            if source_id == "missing":
                continue
            require(source_id in inventory_by_id, f"claim_map:{line}: source {source_id} does not resolve", errors)
        if row["quantitative_value"] != "missing":
            require(row["source_locator"] != "missing", f"claim_map:{line}: numerical claim lacks locator", errors)
            require(row["unit"] != "missing", f"claim_map:{line}: numerical claim lacks unit", errors)
            require(row["denominator"] != "missing", f"claim_map:{line}: numerical claim lacks denominator", errors)
            require(row["candidate_source_ids"] != "missing", f"claim_map:{line}: numerical claim lacks source", errors)
        if row["review_route"] != "routine_domain_review_no_owner_action":
            owner_exceptions.add((row["profile_id"], row["s_dimension"]))
    expected_exceptions = {
        ("sp-0020", "S2"), ("sp-0020", "S4"),
        ("sp-0030", "S2"), ("sp-0030", "S3"), ("sp-0030", "S5"),
        ("sp-0031", "S3"), ("sp-0031", "S4"),
    }
    require(owner_exceptions == expected_exceptions, f"Owner exception set drifted: {sorted(owner_exceptions)}", errors)
    licensing_s2 = claims_by_id.get("fusion-clm-082", {})
    licensing_s4 = claims_by_id.get("fusion-clm-084", {})
    require(licensing_s2.get("support_direction") == "complicates" and licensing_s2.get("directness") == "indirect", "fusion-clm-082 must not claim direct empirical licensing feedback-speed support.", errors)
    require(licensing_s4.get("support_direction") == "supports_with_limits" and licensing_s4.get("directness") == "indirect", "fusion-clm-084 must be indirect/partial at most.", errors)
    nrc_comment = claims_by_id.get("fusion-clm-099", {})
    require(nrc_comment.get("support_direction") == "complicates", "NRC comment period must complicate, not support, licence-duration inference.", errors)
    require("not a plant-licence review duration" in nrc_comment.get("counterevidence_or_confounder", ""), "NRC comment-period non-comparability is missing.", errors)

    rejected_candidates = {row["candidate_source_id"] for row in rejected}
    for resolved_source_id in ("fusion-src-023", "fusion-src-030", "fusion-src-037"):
        require(resolved_source_id not in rejected_candidates, f"Resolved source remains incorrectly deferred: {resolved_source_id}", errors)

    require([row["profile_id"] for row in coverage] == PROFILE_IDS, "Coverage rows must be the ordered frozen profile set sp-0014..sp-0031.", errors)
    require(not any(column in coverage_header for column in DIMENSIONS), "Coverage file may not contain S1-S5 coding value columns.", errors)
    for line, row in enumerate(coverage, start=2):
        for dim in DIMENSIONS:
            require(row[f"{dim}_status"] in COVERAGE_STATUSES, f"profile_coverage:{line}: invalid {dim} coverage status", errors)
            require(bool(row[f"{dim}_load_bearing_claim"]), f"profile_coverage:{line}: missing {dim} claim", errors)
            require(bool(row[f"{dim}_missingness_reason"]), f"profile_coverage:{line}: missing {dim} missingness reason", errors)
            require(bool(row[f"{dim}_next_action"]), f"profile_coverage:{line}: missing {dim} next action", errors)

    pack = (package / "fusion_test_evidence_pack_2026-08-12.md").read_bytes()
    require(PACK_MARKER in pack, "Banked pack marker missing.", errors)
    if PACK_MARKER in pack:
        banked_raw = pack.split(PACK_MARKER, 1)[1]
        require(hashlib.sha256(banked_raw).hexdigest() == PACK_HASH, "Banked attachment is not byte-for-byte lossless.", errors)

    for relative_path, expected_hash in PROTECTED_HASHES.items():
        actual_hash = hashlib.sha256((ROOT / relative_path).read_bytes()).hexdigest()
        require(actual_hash == expected_hash, f"Protected input changed: {relative_path}", errors)

    if require_workbook and (package / "fusion_source_review_v1.xlsx").exists():
        validate_workbook(package / "fusion_source_review_v1.xlsx", errors)

    # Issue #37 replaces the old whole-register freeze with append-only source
    # promotion checks; all pre-promotion rows and other data stay protected.
    try:
        validate_source_promotion()
    except SourcePromotionValidationError as exc:
        errors.append(str(exc))

    if errors:
        raise FusionEvidenceValidationError("\n".join(f"- {error}" for error in errors))


def main() -> None:
    try:
        validate()
    except FusionEvidenceValidationError as exc:
        print("Fusion evidence validation failed:", file=sys.stderr)
        print(exc, file=sys.stderr)
        raise SystemExit(1)
    print("Fusion evidence package validation passed.")


if __name__ == "__main__":
    main()
