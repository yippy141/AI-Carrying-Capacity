#!/usr/bin/env python3
"""Issue #37 positive and adversarial source/provenance regression tests."""

from __future__ import annotations

import copy
import csv
import io
import shutil
import sys
import tempfile
import unittest
from contextlib import redirect_stderr
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import validate_adoption_depth as adoption  # noqa: E402
import validate_fusion_source_promotion as promotion  # noqa: E402
import validate_indicator_catalog as indicators  # noqa: E402
import validate_source_register as sources  # noqa: E402


def write_rows(path: Path, rows: list[dict[str, str]]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


class SourcePromotionTest(unittest.TestCase):
    def setUp(self) -> None:
        bank = ROOT / promotion.BANK
        self.inputs = [promotion.read_rows(ROOT / promotion.REGISTER)] + [
            promotion.read_rows(bank / name) for name in (
                "staged_source_register_additions_v1.csv", "source_inventory_v1.csv",
                "rejected_and_deferred_sources_v1.csv", "claim_source_map_v1.csv",
                promotion.LEDGER,
            )
        ]

    def source(self, sid: str, input_index: int = 0) -> dict[str, str]:
        return next(row for row in self.inputs[input_index]
                    if row.get("source_id", row.get("candidate_source_id")) == sid)

    def assert_rejected(self, text: str) -> None:
        self.assertIn(text, "\n".join(promotion.validate_records(*self.inputs)))

    def test_complete_package(self) -> None:
        promotion.validate()
        self.assertEqual(promotion.validate_records(*self.inputs), [])
        self.assertEqual(len(self.inputs[0]), 99)
        self.assertEqual(len(self.inputs[5]), 44)

    def test_duplicate_or_missing_promoted_id(self) -> None:
        self.inputs[0].append(copy.deepcopy(self.source("fusion-src-012")))
        self.assert_rejected("duplicate source_id")
        self.inputs[0] = [row for row in self.inputs[0] if row["source_id"] != "fusion-src-007"]
        self.assert_rejected("does not resolve directly to reviewed source")

    def test_no_crosswalk_or_silent_extra_source(self) -> None:
        self.source("fusion-src-007", 5)["canonical_source_id"] = "src-0050"
        self.assert_rejected("ledger canonical_source_id mismatch")
        self.inputs[0].append({**self.source("fusion-src-007"), "source_id": "src-0050"})
        self.assert_rejected("permits only 44 additions")

    def test_both_excluded_candidates_remain_out(self) -> None:
        for sid in promotion.EXCLUDED_IDS:
            with self.subTest(source=sid):
                self.inputs[0].append({**self.source("fusion-src-012"), "source_id": sid})
                self.assert_rejected("Excluded/deferred source silently promoted")
                self.inputs[0].pop()

    def test_unverified_locator_or_placeholder_cannot_promote(self) -> None:
        self.source("fusion-src-007", 2)["verification_status"] = "unverified_locator"
        self.source("fusion-src-007", 2)["url_or_doi"] = "missing"
        self.source("fusion-src-007")["placeholder"] = "true"
        for expected in ("has not been verified", "missing verified primary/publisher/DOI locator", "reviewed and non-placeholder"):
            self.assert_rejected(expected)

    def test_every_inherited_field_is_preserved(self) -> None:
        source = self.source("fusion-src-004")
        for field in source.keys() - {"review_status", "date_added", "notes", "official_claim_status", "source_id"}:
            with self.subTest(field=field):
                old = source[field]
                source[field] = "corrupted"
                self.assert_rejected(f"promoted {field} changed from staging")
                source[field] = old

    def test_company_tier_and_validation_cannot_upgrade(self) -> None:
        self.source("fusion-src-012")["reliability_tier"] = "A"
        self.source("fusion-src-012")["independent_validation_status"] = "independently_validated"
        self.assert_rejected("promoted reliability_tier changed")
        self.assert_rejected("promoted independent_validation_status changed")

    def test_legal_rows_cannot_be_programme_claims(self) -> None:
        for sid in promotion.LEGAL_IDS:
            self.source(sid)["official_claim_status"] = "official_program_claim"
            self.assert_rejected(f"{sid}: legal/programme/target status changed incorrectly")

    def test_translation_and_rejected_use_restrictions_survive(self) -> None:
        self.source("fusion-src-004")["notes"] = self.source("fusion-src-004")["notes"].replace(promotion.TRANSLATION_RESTRICTION, "")
        self.assert_rejected("translation quotation/use block missing")
        self.source("fusion-src-012", 5)["remaining_use_restriction"] = "unrestricted"
        self.assert_rejected("company/operator independent-validation restriction missing")
        self.assert_rejected("rejected claim/use restriction lost")

    def test_inventory_freshness_notes_and_history_survive(self) -> None:
        row = self.source("fusion-src-030")
        row["notes"] = row["notes"].replace(self.source("fusion-src-030", 2)["notes"], "")
        self.assert_rejected("inventory limitation/freshness note lost")
        row["notes"] = "Promoted without provenance"
        self.assert_rejected("issue #35 provenance erased")

    def test_claim_map_unknown_source_rejected(self) -> None:
        self.inputs[4][0]["candidate_source_ids"] = "fusion-src-999"
        self.assert_rejected("unknown source ID")

    def test_step_failed_refresh_remains_explicit(self) -> None:
        self.source("fusion-src-035")["notes"] = self.source("fusion-src-035")["notes"].replace(promotion.STEP_REFRESH_RESTRICTION, "")
        self.assert_rejected("failed-refresh public-use restriction lost")

    def test_protected_input_changes_and_new_canonical_objects_fail(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for tree in promotion.FROZEN_TREES:
                shutil.copytree(ROOT / tree, root / tree)
            self.assertEqual(promotion.validate_protected_inputs(root), [])
            targets = [
                promotion.REGISTER,
                "data/claims/claim_ledger.csv",
                *[f"research/structural-profiles-pilot/reconciliation/{name}" for name in (
                    "seed_submission_v1.csv", "independent_submission_v1.csv",
                    "comparison_audit_v1.csv", "owner_decisions_v1.csv",
                    "targeted_s5_adjudication_backlog_v1.csv",
                )],
                "research/structural-profiles-pilot/worksheet/stage_profiles_template.csv",
                "research/structural-profiles-pilot/worksheet/country_stage_modifiers_template.csv",
                "research/structural-profiles-pilot/worksheet/governance_overlay_template.csv",
                f"{promotion.BANK}/claim_source_map_v1.csv",
                f"{promotion.BANK}/profile_evidence_coverage_v1.csv",
            ]
            for target in targets:
                with self.subTest(path=target):
                    path = root / target
                    before = path.read_bytes()
                    path.write_bytes(b"changed" + before)
                    self.assertTrue(promotion.validate_protected_inputs(root))
                    path.write_bytes(before)
            # New staged schema objects are validated by the current reader
            # boundary; historical source promotion does not prohibit them.
            new_object = root / "data/profiles/new_staged_object.csv"
            new_object.parent.mkdir(exist_ok=True)
            new_object.write_text("profile_id,S1\n", encoding="utf-8")
            self.assertEqual(promotion.validate_protected_inputs(root), [])

    def test_reviewed_source_locator_and_date_validation(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "sources.csv"
            row = copy.deepcopy(self.source("fusion-src-012"))
            write_rows(path, [row])
            self.assertEqual(len(sources.validate(path)), 1)  # Reviewed tier C is valid identity.
            for field, value, message in (
                ("url_or_doi", "missing", "valid non-placeholder URL/DOI"),
                ("url_or_doi", "https://example.com/placeholder", "valid non-placeholder URL/DOI"),
                ("url_or_doi", "not-a-locator", "valid non-placeholder URL/DOI"),
                ("last_verified", "2026-02-30", "ISO date"),
                ("placeholder", "true", "placeholder rows"),
            ):
                with self.subTest(field=field, value=value):
                    changed = {**row, field: value}
                    write_rows(path, [changed])
                    output = io.StringIO()
                    with redirect_stderr(output), self.assertRaises(SystemExit):
                        sources.validate(path)
                    self.assertIn(message, output.getvalue())
            for sid in promotion.LEGAL_IDS:
                write_rows(path, [{**self.source(sid), "official_claim_status": "official_program_claim"}])
                with redirect_stderr(io.StringIO()), self.assertRaises(SystemExit):
                    sources.validate(path)

    def test_existing_empirical_validators_block_promoted_company_and_target_sources(self) -> None:
        indicator = {key: "missing" for key in indicators.REQUIRED_COLUMNS}
        indicator.update(indicator_id="test-only", concept="synthetic validator fixture",
                         pillar="realized_outcomes", evidence_label="observed", data_quality="high",
                         input_output_role="outcome", attribution_strength="descriptive",
                         missing_reason="not_applicable", placeholder="false")
        observation = promotion.read_rows(adoption.DEFAULT_OBSERVATIONS)[0]
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "fixture.csv"
            for sid in ("fusion-src-012", "fusion-src-029", "fusion-src-031", "fusion-src-042",
                        "fusion-src-043", "fusion-src-044", "fusion-src-005", "fusion-src-011",
                        "fusion-src-004", "fusion-src-039", "fusion-src-040", "fusion-src-035"):
                with self.subTest(source=sid):
                    write_rows(path, [{**indicator, "source_ids": sid}])
                    output = io.StringIO()
                    with redirect_stderr(output), self.assertRaises(SystemExit):
                        indicators.validate(path)
                    self.assertIn("empirical", output.getvalue())
                    write_rows(path, [{**observation, "source_id": sid, "evidence_label": "observed"}])
                    with self.assertRaisesRegex(adoption.AdoptionDepthValidationError, "empirical"):
                        adoption.validate(path)
            write_rows(path, [{**indicator, "source_ids": "fusion-src-007"}])
            self.assertEqual(len(indicators.validate(path)), 1)
            self.assertEqual(len(adoption.validate()), 13)


if __name__ == "__main__":
    unittest.main()
