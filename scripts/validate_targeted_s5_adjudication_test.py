#!/usr/bin/env python3
"""Adversarial regression tests for issue #41's targeted S5 package."""
from __future__ import annotations

import copy
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
import validate_targeted_s5_adjudication as s5  # noqa: E402


class TargetedS5AdjudicationTest(unittest.TestCase):
    def setUp(self) -> None:
        package = ROOT / s5.PACKAGE
        self.records = s5.read_rows(package / s5.ADJUDICATION_FILE)
        self.plan = s5.read_rows(package / s5.PLAN_FILE)
        self.note = (package / s5.NOTE_FILE).read_text(encoding="utf-8")

    def record_errors(self) -> str:
        return "\n".join(s5.validate_records(self.records))

    def plan_errors(self) -> str:
        return "\n".join(s5.validate_plan(self.plan))

    def test_complete_package_exact_counts_and_no_approval(self) -> None:
        result = s5.validate()
        self.assertEqual(result["rows"], 19)
        self.assertEqual(result["point_form"], 12)
        self.assertEqual(result["range_or_disagreement_form"], 7)
        self.assertEqual(result["expert_packages"], 8)
        self.assertEqual(result["open_fusion_gaps"], 9)
        self.assertEqual(result["canonical_approvals"], 0)
        self.assertEqual(result["confidence"], {"medium": 7, "low": 12})

    def test_exact_population_rejects_missing_duplicate_and_wrong_rows(self) -> None:
        original = copy.deepcopy(self.records)
        for operation in ("missing", "duplicate", "wrong"):
            with self.subTest(operation=operation):
                self.records = copy.deepcopy(original)
                if operation == "missing":
                    self.records.pop()
                elif operation == "duplicate":
                    self.records[-1] = copy.deepcopy(self.records[0])
                else:
                    self.records[-1]["profile_id"] = "sp-0099"
                self.assertRegex(self.record_errors(), r"Exactly 19|Duplicate|population")
        self.records = original

    def test_no_composite_score_approval_or_midpoint_columns(self) -> None:
        for field, value in (("S5_average", "2.5"), ("sector_score", "1"),
                             ("review_status", "canonical"), ("coding_status", "approved")):
            with self.subTest(field=field):
                self.records[0][field] = value
                self.assertIn("exact schema", self.record_errors())
                del self.records[0][field]
        licensing = next(row for row in self.records if row["profile_id"] == "sp-0030")
        licensing["selected_s5"] = "1"
        licensing["recommended_low"] = licensing["recommended_high"] = ""
        self.assertIn("bounded S5 result", self.record_errors())

    def test_original_values_rationales_sources_and_owner_decisions_are_immutable(self) -> None:
        mutations = (
            ("seed_s5", "0", "original seed"),
            ("seed_rationale", "rewritten", "original seed"),
            ("independent_rationale", "rewritten", "original independent"),
            ("comparison_status", "agreement", "frozen backlog"),
        )
        for field, value, message in mutations:
            with self.subTest(field=field):
                before = self.records[0][field]
                self.records[0][field] = value
                self.assertIn(message, self.record_errors())
                self.records[0][field] = before
        owner = next(row for row in self.records if row["owner_disposition"])
        before = owner["owner_rationale"]
        owner["owner_rationale"] = "model substituted a new owner rationale"
        self.assertIn("owner decision or rationale", self.record_errors())
        owner["owner_rationale"] = before

    def test_point_range_confidence_and_boundary_contracts(self) -> None:
        point = self.records[0]
        for field, value, message in (
            ("selected_s5", "2.5", "integer ordinal"),
            ("recommended_low", "1", "bounded S5 result"),
            ("boundary_independence_status", "verified", "qualitative/draft provenance"),
            ("draft_use_blocker", "canonical_approval", "qualitative/draft provenance"),
            ("adjudication_outcome", "approved", "bounded S5 result"),
        ):
            with self.subTest(field=field):
                before = point[field]
                point[field] = value
                self.assertIn(message, self.record_errors())
                point[field] = before
        ranged = next(row for row in self.records if row["profile_id"] == "sp-0011")
        before = ranged["recommended_high"]
        ranged["recommended_high"] = ranged["recommended_low"]
        self.assertRegex(self.record_errors(), r"bounded S5 result|ordered")
        ranged["recommended_high"] = before

    def test_nonfusion_sources_cannot_be_fabricated_and_fusion_sources_resolve(self) -> None:
        software = next(row for row in self.records if row["sector"] == "Software engineering")
        software["source_ids"] = "fusion-src-001"
        self.assertIn("unsupported domain or source", self.record_errors())
        software["source_ids"] = ""
        fusion = next(row for row in self.records if row["source_ids"])
        before = fusion["source_ids"]
        fusion["source_ids"] = "fusion-src-999"
        self.assertIn("merged fusion S5 record", self.record_errors())
        fusion["source_ids"] = before

    def test_six_fusion_packages_retain_19_questions_and_nine_open_gaps(self) -> None:
        fusion_cells = sum(len(row["dimension_cells"].split(";")) for row in self.plan[:6])
        self.assertEqual(fusion_cells, 19)
        self.assertEqual({gap for row in self.plan[:6] for gap in row["open_gap_ids"].split(";")},
                         {f"gap-{number:02d}" for number in range(1, 10)})
        before = self.plan[0]["review_questions"]
        self.plan[0]["review_questions"] = "questions collapsed at package level"
        self.assertIn("retained fusion questions", self.plan_errors())
        self.plan[0]["review_questions"] = before
        before = self.plan[1]["open_gap_status"]
        self.plan[1]["open_gap_status"] = "closed"
        self.assertIn("falsely closed", self.plan_errors())
        self.plan[1]["open_gap_status"] = before

    def test_two_nonfusion_packages_and_blocker_distinction_are_fixed(self) -> None:
        self.assertEqual([row["expert_package_id"] for row in self.plan[-2:]], ["EXP-SW-01", "EXP-MFG-01"])
        for field, value, message in (
            ("canonical_approval_blocker", "false", "canonical and draft-use blockers"),
            ("draft_use_blocker", "true", "canonical and draft-use blockers"),
            ("named_reviewer", "anonymous completed reviewer", "falsely records completed"),
        ):
            with self.subTest(field=field):
                before = self.plan[-1][field]
                self.plan[-1][field] = value
                self.assertIn(message, self.plan_errors())
                self.plan[-1][field] = before

    def test_note_reports_unresolved_rows_counts_and_nonapproval(self) -> None:
        for before, after, message in (
            ("19/19", "18/19", "19/19"),
            ("| `preserved_disagreement` | 1 |", "| `preserved_disagreement` | 0 |", "preserved_disagreement"),
            ("sp-0030", "sp-9999", "sp-0030"),
            ("WP2 has not begun", "WP2 is underway", "WP2 has not begun"),
        ):
            with self.subTest(message=message):
                errors = "\n".join(s5.validate_note(self.note.replace(before, after), self.records, self.plan))
                self.assertIn(message, errors)

    def test_workbook_rejects_hidden_sheet_formula_and_content_drift(self) -> None:
        original = ROOT / s5.PACKAGE / s5.WORKBOOK_FILE
        mutations = ("hidden", "formula", "content")
        for mutation in mutations:
            with self.subTest(mutation=mutation), tempfile.TemporaryDirectory() as directory:
                path = Path(directory) / "mutated.xlsx"
                shutil.copy2(original, path)
                workbook = load_workbook(path)
                if mutation == "hidden":
                    workbook["Software"].sheet_state = "hidden"
                elif mutation == "formula":
                    workbook["Start Here"]["B7"] = "=AVERAGE(B5:B6)"
                else:
                    workbook["Adjudication"]["V5"] = 4
                workbook.save(path)
                errors = "\n".join(s5.validate_workbook(path, self.records, self.plan))
                self.assertRegex(errors, r"hidden sheet|unapproved formula|content mismatch")

    def test_protected_domain_review_and_prior_guards_remain_active(self) -> None:
        self.assertEqual(s5.validate_protected_inputs(), [])
        self.assertEqual(s5.domain.tree_digest(ROOT, s5.DOMAIN_PACKAGE), s5.DOMAIN_REVIEW_DIGEST)
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            shutil.copytree(ROOT / s5.DOMAIN_PACKAGE, root / s5.DOMAIN_PACKAGE)
            added = root / s5.DOMAIN_PACKAGE / "unauthorized.csv"
            added.write_text("score\n2.5\n", encoding="utf-8")
            self.assertNotEqual(s5.domain.tree_digest(root, s5.DOMAIN_PACKAGE), s5.DOMAIN_REVIEW_DIGEST)

    def test_control_plane_requires_checkpoint_pointers_sequence_and_no_wp2(self) -> None:
        self.assertEqual(s5.validate_control_plane(), [])
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for relative in ("docs/PROJECT_STATE.md", "docs/ROADMAP.md", "docs/TASKS.md", "docs/DECISIONS.md", "docs/AGENT_BRIEF.md", "reports/PM_STATUS.md", "README.md"):
                target = root / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(ROOT / relative, target)
            status = root / "reports/PM_STATUS.md"
            status.write_text(status.read_text(encoding="utf-8").replace("WP2 has not begun", "WP2 started"), encoding="utf-8")
            self.assertIn("WP2 has not begun", "\n".join(s5.validate_control_plane(root)))


if __name__ == "__main__":
    unittest.main()
