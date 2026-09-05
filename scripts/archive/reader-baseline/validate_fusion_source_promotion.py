#!/usr/bin/env python3
"""Validate the bounded issue #37 source-only promotion, never claim approval."""

from __future__ import annotations

import csv
import hashlib
import sys
from pathlib import Path
from urllib.parse import urlsplit

from validate_source_register import validate as validate_source_register


ROOT = Path(__file__).resolve().parents[1]
BANK = "research/fusion-evidence"
REGISTER = "data/sources/source_register.csv"
LEDGER = "source_promotion_decisions_v1.csv"
NOTE = "SOURCE_PROMOTION_NOTE.md"
PROMOTION_DATE = "2026-09-01"
BASE_REGISTER_HASH = "7898d97031f30ec04324650f860a5749122575981cf40b79dd2db1683c9dc443"
BASE_REGISTER_LINES = 56  # Header plus the 55 pre-promotion records; append only.
EXCLUDED_IDS = {"fusion-src-013", "fusion-src-015"}
PROMOTED_IDS = {f"fusion-src-{number:03d}" for number in range(1, 47)} - EXCLUDED_IDS
LEGAL_IDS = {"fusion-src-004", "fusion-src-039", "fusion-src-040"}
VERIFIED_STATUSES = {
    "verified_peer_reviewed", "verified_official_primary",
    "verified_official_secondary", "verified_company_primary",
}
LEDGER_COLUMNS = {
    "candidate_source_id", "promotion_disposition", "canonical_source_id",
    "review_status", "promotion_reason", "remaining_use_restriction",
    "translation_or_domain_review_needed", "last_verified", "notes",
    "promotion_date", "verification_status", "verified_locator",
}
TRANSLATION_RESTRICTION = (
    "Direct public quotation or load-bearing translated wording remains blocked "
    "until the stated native-language/specialist review is completed."
)
COMPANY_RESTRICTION = (
    "Reviewed source identity does not supply independent validation; "
    "company/operator reports and repeated company data must not be used as "
    "independently observed empirical outcomes."
)
STEP_REFRESH_RESTRICTION = (
    "refresh the original STEP page successfully before public use or "
    "load-bearing use of its current target wording."
)
# These gates intentionally freeze issue #37's other data/research objects.
# A later authorized package must explicitly retire/replace its scope gate,
# not silently refresh a digest to accommodate recoding or WP2 population.
FROZEN_TREES = {
    "data": "ce18ff9758d8adaed2f7faf22b84f48a1c44190628d3d843f4050d497adeef92",
    "research/structural-profiles-pilot": "7dd666356e4d17d958e14a85471120539fa8ee798d2e3a14d4caf71f83234b9c",
    BANK: "df8d3f4c9473eaecb8ff58a972abcc73b63724e3019f0ffb7cf17787aa97d172",
}
# Issue #39 explicitly authorizes these five NEW synthesis outputs only.
# Keep every pre-existing input and every expected digest unchanged. The
# domain-review validator checks these outputs and freezes the full promoted
# register, ledger and evidence bank in addition to the original input trees.
DOMAIN_REVIEW_OUTPUTS = {
    f"research/structural-profiles-pilot/domain-review/{name}" for name in (
        "fusion_domain_review_v1.csv", "fusion_dimension_review_v1.csv",
        "fusion_domain_review_v1.xlsx", "FUSION_DOMAIN_REVIEW_NOTE.md",
        "fusion_human_expert_queue_v1.csv",
    )
}
# Issue #41 explicitly authorizes these four NEW adjudication outputs. They are
# separately validated and the complete merged domain-review package is pinned
# by validate_targeted_s5_adjudication.py; no other pilot-tree path is exempt.
S5_ADJUDICATION_OUTPUTS = {
    f"research/structural-profiles-pilot/adjudication/{name}" for name in (
        "targeted_s5_adjudication_v1.csv", "targeted_s5_adjudication_v1.xlsx",
        "three_anchor_human_review_plan_v1.csv", "S5_ADJUDICATION_NOTE.md",
    )
}
TREE_EXCLUSIONS = ({REGISTER, f"{BANK}/{LEDGER}", f"{BANK}/{NOTE}"}
                   | DOMAIN_REVIEW_OUTPUTS | S5_ADJUDICATION_OUTPUTS)


class SourcePromotionValidationError(ValueError):
    """Promotion or protected-input invariants were violated."""


def read_rows(path: Path) -> list[dict[str, str]]:
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def tree_digest(root: Path, directory: str) -> str:
    """Hash ordered paths and bytes, including additions/deletions, without Git."""
    digest = hashlib.sha256()
    for path in sorted((root / directory).rglob("*")):
        if not path.is_file() or "__pycache__" in path.parts or path.name == ".DS_Store":
            continue
        relative = path.relative_to(root).as_posix()
        if relative in TREE_EXCLUSIONS:
            continue
        digest.update(relative.encode("utf-8") + b"\0")
        digest.update(hashlib.sha256(path.read_bytes()).digest())
    return digest.hexdigest()


def validate_protected_inputs(root: Path) -> list[str]:
    errors = []
    prefix = b"".join((root / REGISTER).read_bytes().splitlines(keepends=True)[:BASE_REGISTER_LINES])
    if hashlib.sha256(prefix).hexdigest() != BASE_REGISTER_HASH:
        errors.append("Pre-promotion source-register rows changed; additions must be append-only.")
    for directory, expected in FROZEN_TREES.items():
        if tree_digest(root, directory) != expected:
            errors.append(f"Protected source-promotion input tree changed: {directory}")
    return errors


def validate_records(
    canonical: list[dict[str, str]], staged: list[dict[str, str]],
    inventory: list[dict[str, str]], rejected: list[dict[str, str]],
    claims: list[dict[str, str]], decisions: list[dict[str, str]],
) -> list[str]:
    errors: list[str] = []

    def check(condition: bool, message: str) -> None:
        if not condition:
            errors.append(message)

    def index(rows: list[dict[str, str]], key: str, label: str) -> dict[str, dict[str, str]]:
        ids = [row.get(key, "") for row in rows]
        check(all(ids) and len(ids) == len(set(ids)), f"{label}: missing or duplicate {key}")
        return {row.get(key, ""): row for row in rows}

    source_by_id = index(canonical, "source_id", "canonical")
    staged_by_id = index(staged, "source_id", "staged")
    inventory_by_id = index(inventory, "candidate_source_id", "inventory")
    decisions_by_id = index(decisions, "candidate_source_id", "ledger")
    check(len(canonical) == 99, "Issue #37 permits only 44 additions to the 55-row canonical register.")
    check(set(staged_by_id) == PROMOTED_IDS, "Staged set must remain the 44 owner-approved candidates.")
    check(set(decisions_by_id) == PROMOTED_IDS, "Ledger must contain exactly one decision for each of the 44 staged candidates.")
    check({sid for sid in source_by_id if sid.startswith("fusion-src-")} == PROMOTED_IDS,
          "Canonical fusion IDs must exactly match the promoted set; excluded/deferred IDs may not enter.")
    excluded = {row["candidate_source_id"] for row in inventory if row.get("promotion_recommendation") == "defer"}
    check(excluded == EXCLUDED_IDS, "Source-level exclusions changed.")
    deferred = {sid for row in rejected if row.get("disposition") == "deferred"
                for sid in row.get("candidate_source_id", "").split(";")}
    check(deferred == EXCLUDED_IDS, "Rejected/deferred source-level dispositions changed.")
    check(not (EXCLUDED_IDS & set(source_by_id)), "Excluded/deferred source silently promoted.")

    allowed_changes = {"review_status", "date_added", "notes", "official_claim_status"}
    for sid in sorted(PROMOTED_IDS):
        source, stage = source_by_id.get(sid), staged_by_id.get(sid)
        inv, decision = inventory_by_id.get(sid), decisions_by_id.get(sid)
        check(all(row is not None for row in (source, stage, inv, decision)), f"{sid}: missing promotion record or inventory identity")
        if any(row is None for row in (source, stage, inv, decision)):
            continue
        check(LEDGER_COLUMNS <= decision.keys(), f"{sid}: ledger required columns missing")
        check(stage.get("review_status") == "staged" and stage.get("placeholder") == "false", f"{sid}: staged input is not a non-placeholder staged record")
        check(inv.get("verification_status") in VERIFIED_STATUSES, f"{sid}: inventory locator has not been verified")
        locator = urlsplit(inv.get("url_or_doi", ""))
        check(locator.scheme == "https" and bool(locator.netloc) and bool(locator.path.strip("/")), f"{sid}: missing verified primary/publisher/DOI locator")
        check(inv.get("promotion_recommendation", "").startswith("stage"), f"{sid}: source-level promotion excluded")
        for key in stage.keys() & inv.keys() - {"notes"}:
            check(stage[key] == inv[key], f"{sid}: staged/inventory {key} drifted")
        check(stage.get("useful_indicators") == inv.get("numerical_claims_and_locators"), f"{sid}: numerical locators changed")
        for key in stage.keys() - allowed_changes:
            check(source.get(key) == stage[key], f"{sid}: promoted {key} changed from staging")
        check(source.get("review_status") == "reviewed" and source.get("placeholder") == "false", f"{sid}: promotion must be reviewed and non-placeholder")
        check(source.get("date_added") == PROMOTION_DATE, f"{sid}: inconsistent canonical promotion date")
        official = "not_official_claim" if sid in LEGAL_IDS else stage.get("official_claim_status")
        check(source.get("official_claim_status") == official, f"{sid}: legal/programme/target status changed incorrectly")
        notes = source.get("notes", "")
        check(stage.get("notes", "") in notes and "Historical issue #35 staging note:" in notes, f"{sid}: issue #35 provenance erased or presented as current staging")
        check("issue #37" in notes and PROMOTION_DATE in notes, f"{sid}: promotion gate missing")
        check(inv.get("notes", "") in notes, f"{sid}: inventory limitation/freshness note lost")
        check(inv.get("pathway_scope", "") in notes, f"{sid}: inventory pathway scope lost")
        restriction = decision.get("remaining_use_restriction", "")
        review = decision.get("translation_or_domain_review_needed", "")
        check(bool(source.get("limitations")) and source.get("limitations") in restriction, f"{sid}: source limitations missing from ledger")
        check("no claim approval" in notes and "no claim approval" in restriction, f"{sid}: source review must not approve claims")
        check("Fusion-domain review" in review, f"{sid}: pending domain review lost")
        for key, expected in {
            "promotion_disposition": "promoted", "canonical_source_id": sid,
            "review_status": "reviewed", "promotion_date": PROMOTION_DATE,
            "last_verified": stage.get("last_verified"),
            "verification_status": inv.get("verification_status"),
            "verified_locator": inv.get("url_or_doi"),
        }.items():
            check(decision.get(key) == expected, f"{sid}: ledger {key} mismatch")
        check(bool(decision.get("promotion_reason")), f"{sid}: missing promotion reason")
        if stage.get("language") != "en":
            check(stage.get("original_language_url", "").startswith("https://"), f"{sid}: original-language locator missing")
            check(stage.get("translation_note") not in {"", "missing", "not_applicable"}, f"{sid}: translation caveat missing")
            check(TRANSLATION_RESTRICTION in notes and TRANSLATION_RESTRICTION in restriction, f"{sid}: translation quotation/use block missing")
            check(stage.get("translation_note", "") in review, f"{sid}: stated translation/specialist review lost")
        if stage.get("independent_validation_status") == "not_independently_validated":
            check(COMPANY_RESTRICTION in notes and COMPANY_RESTRICTION in restriction, f"{sid}: company/operator independent-validation restriction missing")
        if sid == "fusion-src-035":
            check(STEP_REFRESH_RESTRICTION in notes and STEP_REFRESH_RESTRICTION in restriction,
                  f"{sid}: failed-refresh public-use restriction lost")
        for rejection in rejected:
            if sid in rejection.get("candidate_source_id", "").split(";"):
                for key in ("reason", "permitted_limited_use", "notes"):
                    check(rejection.get(key, "") in restriction and rejection.get(key, "") in notes, f"{sid}: rejected claim/use restriction lost ({rejection['record_id']}.{key})")

    for claim in claims:
        for sid in claim.get("candidate_source_ids", "").split(";"):
            if sid == "missing":
                continue
            check(sid in inventory_by_id, f"{claim.get('claim_id')}: unknown source ID {sid}")
            if sid in PROMOTED_IDS:
                check(source_by_id.get(sid, {}).get("review_status") == "reviewed", f"{claim.get('claim_id')}: promoted ID {sid} does not resolve directly to reviewed source")
                check(claim.get("pathway_match", "") in source_by_id.get(sid, {}).get("notes", ""), f"{sid}: mapped pathway restriction lost")
    return errors


def validate(root: Path = ROOT) -> None:
    errors = validate_protected_inputs(root)
    package = root / BANK
    for name in (LEDGER, NOTE):
        if not (package / name).is_file():
            errors.append(f"Missing source-promotion deliverable: {name}")
    if errors:
        raise SourcePromotionValidationError("\n".join(errors))
    canonical = validate_source_register(root / REGISTER)
    errors = validate_records(
        canonical, read_rows(package / "staged_source_register_additions_v1.csv"),
        read_rows(package / "source_inventory_v1.csv"),
        read_rows(package / "rejected_and_deferred_sources_v1.csv"),
        read_rows(package / "claim_source_map_v1.csv"), read_rows(package / LEDGER),
    )
    if errors:
        raise SourcePromotionValidationError("\n".join(errors))


if __name__ == "__main__":
    try:
        validate()
    except SourcePromotionValidationError as exc:
        print(f"Fusion source promotion validation failed:\n{exc}", file=sys.stderr)
        raise SystemExit(1)
    print("Fusion source promotion validation passed: 44 reviewed, 44 promoted, 0 staged deferrals; 2 excluded candidates remain out.")
