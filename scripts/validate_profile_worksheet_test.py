#!/usr/bin/env python3
"""Unit tests for the blank Structural Profiles worksheet validator."""

from __future__ import annotations

import csv
import shutil
import tempfile
import unittest
from pathlib import Path

try:
    from scripts.validate_profile_worksheet import (
        COUNTRY_HEADER,
        OWNER_DECISIONS,
        ROOT,
        find_disallowed_changed_paths,
        validate,
        validate_country_modifier_rows,
    )
except ModuleNotFoundError:  # Supports direct execution from scripts/.
    from validate_profile_worksheet import (  # type: ignore[no-redef]
        COUNTRY_HEADER,
        OWNER_DECISIONS,
        ROOT,
        find_disallowed_changed_paths,
        validate,
        validate_country_modifier_rows,
    )


PACKAGE = Path("research/profile-coding")


class ProfileWorksheetValidatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self._temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self._temporary_directory.name)
        shutil.copytree(ROOT / PACKAGE, self.root / PACKAGE)

    def tearDown(self) -> None:
        self._temporary_directory.cleanup()

    def path(self, name: str) -> Path:
        return self.root / PACKAGE / "templates" / name

    def read_rows(self, name: str) -> tuple[list[str], list[dict[str, str]]]:
        with self.path(name).open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            return list(reader.fieldnames or []), list(reader)

    def write_rows(self, name: str, header: list[str], rows: list[dict[str, str]]) -> None:
        with self.path(name).open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(handle, fieldnames=header)
            writer.writeheader()
            writer.writerows(rows)

    def assert_has_error(self, errors: list[str], fragment: str) -> None:
        self.assertTrue(
            any(fragment in error for error in errors),
            msg=f"Expected error containing {fragment!r}; got {errors}",
        )

    def test_repository_package_passes(self) -> None:
        self.assertEqual(validate(ROOT, check_change_scope=False), [])

    def test_rejects_missing_leaf_profile(self) -> None:
        header, rows = self.read_rows("stage_profiles.csv")
        self.write_rows("stage_profiles.csv", header, rows[:-1])
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "expected exactly 31 leaf rows")
        self.assert_has_error(errors, "missing leaf profiles")

    def test_rejects_duplicate_or_changed_profile_id(self) -> None:
        header, rows = self.read_rows("stage_profiles.csv")
        rows[1]["profile_id"] = rows[0]["profile_id"]
        self.write_rows("stage_profiles.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "duplicate profile_id")
        self.assert_has_error(errors, "stable profile_id")

    def test_rejects_unresolved_stage(self) -> None:
        header, rows = self.read_rows("stage_profiles.csv")
        rows[0]["stage_id"] = "invented_stage"
        self.write_rows("stage_profiles.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "unresolved stage_id invented_stage")

    def test_rejects_denormalized_parent_mismatch(self) -> None:
        header, rows = self.read_rows("stage_profiles.csv")
        fusion_row = next(row for row in rows if row["stage_id"] == "simulation")
        fusion_row["parent_stage_id"] = "plasma_operations"
        self.write_rows("stage_profiles.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "denormalized parent mismatch for simulation")

    def test_rejects_nonfrozen_pathway(self) -> None:
        header, rows = self.read_rows("stage_profiles.csv")
        rows[0]["pathway_id"] = "greenfield_prototyping"
        self.write_rows("stage_profiles.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "unsupported pathway")
        self.assert_has_error(errors, "only the three frozen pathway IDs")

    def test_rejects_populated_s_value(self) -> None:
        header, rows = self.read_rows("stage_profiles.csv")
        rows[0]["S1"] = "4"
        self.write_rows("stage_profiles.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "populated S1")

    def test_rejects_invented_source_date_approval_and_canonical_status(self) -> None:
        header, rows = self.read_rows("stage_profiles.csv")
        rows[0]["source_ids"] = "src-invented"
        rows[0]["coding_as_of"] = "2026-08-29"
        rows[0]["approved_by"] = "owner"
        rows[0]["review_status"] = "canonical"
        self.write_rows("stage_profiles.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "invented or populated source_ids")
        self.assert_has_error(errors, "invented or populated coding_as_of")
        self.assert_has_error(errors, "invented or populated approved_by")
        self.assert_has_error(errors, "must use review_status=staged")

    def test_rejects_fable_score_population(self) -> None:
        header, rows = self.read_rows("fable_submission.csv")
        rows[0]["S2"] = "2"
        self.write_rows("fable_submission.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "field S2 must be ''")

    def test_rejects_blind_fable_cross_contamination(self) -> None:
        header, rows = self.read_rows("blind_submission.csv")
        rows[0]["coder_name"] = "fable"
        rows[0]["coder_model"] = "claude-fable-5"
        self.write_rows("blind_submission.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "cross-contamination")
        self.assert_has_error(errors, "exposes Fable provenance")

    def test_country_pathway_invariant_rejects_mismatch(self) -> None:
        _, profile_rows = self.read_rows("stage_profiles.csv")
        profiles = {row["profile_id"]: row for row in profile_rows}
        country_row = {field: "" for field in COUNTRY_HEADER}
        country_row.update(
            {
                "country": "Example",
                "profile_id": "prf-000001",
                "pathway_id": "discrete_manufacturing_npi_and_operations",
            }
        )
        errors: list[str] = []
        validate_country_modifier_rows([country_row], profiles, errors)
        self.assert_has_error(errors, "must equal referenced profile pathway")

    def test_country_template_rejects_populated_c_value(self) -> None:
        country_row = {field: "" for field in COUNTRY_HEADER}
        country_row.update(
            {
                "country": "Example",
                "profile_id": "prf-000001",
                "pathway_id": "mature_software_delivery_and_maintenance",
                "C1_accessible_capability": "2",
            }
        )
        self.write_rows("country_stage_modifiers.csv", COUNTRY_HEADER, [country_row])
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "C coding populated")
        self.assert_has_error(errors, "template must contain headers only")

    def test_rejects_formula_percentage_and_superseded_content(self) -> None:
        header, rows = self.read_rows("stages.csv")
        rows[0]["description"] = "=SUM(80%, 15%) compressibility spectrum"
        self.write_rows("stages.csv", header, rows)
        errors = validate(self.root, check_change_scope=False)
        self.assert_has_error(errors, "formulas are prohibited")
        self.assert_has_error(errors, "percentages are prohibited")
        self.assert_has_error(errors, "superseded or aggregate content")

    def test_change_scope_rejects_app_and_canonical_data_paths(self) -> None:
        disallowed = find_disallowed_changed_paths(
            [
                "research/profile-coding/README.md",
                "scripts/validate_profile_worksheet.py",
                "app/page.tsx",
                "data/profiles/stage_profiles.csv",
                "data/scenarios/assumption_ledger.csv",
            ]
        )
        self.assertEqual(
            disallowed,
            [
                "app/page.tsx",
                "data/profiles/stage_profiles.csv",
                "data/scenarios/assumption_ledger.csv",
            ],
        )

    def test_owner_guide_lists_exactly_the_five_dispositions(self) -> None:
        guide = (self.root / PACKAGE / "OWNER_REVIEW_GUIDE.md").read_text(
            encoding="utf-8"
        )
        for disposition in OWNER_DECISIONS:
            self.assertIn(f"`{disposition}`", guide)
        self.assertEqual(guide.count("| `prefer_"), 2)
        self.assertEqual(guide.count("| `needs_"), 2)
        self.assertEqual(guide.count("| `preserve_disagreement`"), 1)


if __name__ == "__main__":
    unittest.main()
