#!/usr/bin/env python3
"""Focused unit tests for the Structural Profiles worksheet validator."""

from __future__ import annotations

import csv
import json
import shutil
import tempfile
import unittest
from pathlib import Path
from zipfile import ZipFile

from openpyxl import load_workbook

try:
    from scripts.build_structural_profiles_workbooks import (
        COUNTRY_HEADERS,
        DEFAULT_PACKAGE_DIR,
        FABLE_WORKBOOK,
        PROFILE_HEADERS,
        REVIEW_HEADERS,
        STAGE_HEADERS,
    )
    from scripts.validate_structural_profiles_worksheet import (
        WorksheetValidationError,
        validate,
    )
except ModuleNotFoundError:  # Supports direct execution from scripts/.
    from build_structural_profiles_workbooks import (  # type: ignore[no-redef]
        COUNTRY_HEADERS,
        DEFAULT_PACKAGE_DIR,
        FABLE_WORKBOOK,
        PROFILE_HEADERS,
        REVIEW_HEADERS,
        STAGE_HEADERS,
    )
    from validate_structural_profiles_worksheet import (  # type: ignore[no-redef]
        WorksheetValidationError,
        validate,
    )


class StructuralProfilesWorksheetValidatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self._temporary_directory = tempfile.TemporaryDirectory()
        self.package_dir = Path(self._temporary_directory.name) / "worksheet"
        shutil.copytree(DEFAULT_PACKAGE_DIR, self.package_dir)

    def tearDown(self) -> None:
        self._temporary_directory.cleanup()

    @staticmethod
    def _read_csv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
        with path.open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            return list(reader.fieldnames or []), list(reader)

    @staticmethod
    def _write_csv(
        path: Path, fieldnames: list[str], rows: list[dict[str, str]]
    ) -> None:
        with path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.DictWriter(
                handle,
                fieldnames=fieldnames,
                extrasaction="ignore",
                lineterminator="\n",
            )
            writer.writeheader()
            writer.writerows(rows)

    def _assert_invalid(self, expected: str) -> WorksheetValidationError:
        with self.assertRaises(WorksheetValidationError) as raised:
            validate(self.package_dir)
        self.assertIn(expected, str(raised.exception))
        return raised.exception

    def test_accepts_committed_blank_package(self) -> None:
        summary = validate(self.package_dir)

        self.assertEqual(summary["taxonomy_rows"], 39)
        self.assertEqual(summary["leaf_stages"], 31)
        self.assertEqual(summary["scoped_profiles"], 31)
        self.assertEqual(summary["fusion_profiles"], 18)

    def test_rejects_missing_frozen_leaf_and_duplicate_profile_id(self) -> None:
        stages_path = self.package_dir / "stages.csv"
        _, stages = self._read_csv(stages_path)
        self._write_csv(
            stages_path,
            STAGE_HEADERS,
            [row for row in stages if row["stage_id"] != "grid_integration"],
        )

        profiles_path = self.package_dir / "stage_profiles_template.csv"
        _, profiles = self._read_csv(profiles_path)
        profiles[1]["profile_id"] = profiles[0]["profile_id"]
        self._write_csv(profiles_path, PROFILE_HEADERS, profiles)

        error = self._assert_invalid("every frozen leaf exactly once")
        self.assertIn("profile_ids must be the stable opaque sequence", str(error))
        self.assertIn("profile_ids must be unique", str(error))

    def test_rejects_blind_order_drift_and_seed_identity_leak(self) -> None:
        path = self.package_dir / "profile_coding_reviews_blind_template.csv"
        _, rows = self._read_csv(path)
        rows.reverse()
        rows[0]["coder_name"] = "fable"
        self._write_csv(path, REVIEW_HEADERS, rows)

        error = self._assert_invalid("identical profile set and ordering")
        self.assertIn("must remain blank for the independent task", str(error))
        self.assertIn("seed-coder identity or hints", str(error))

    def test_rejects_blind_provenance_role_drift(self) -> None:
        path = self.package_dir / "profile_coding_reviews_blind_template.csv"
        _, rows = self._read_csv(path)
        rows[0]["coder_role"] = ""
        self._write_csv(path, REVIEW_HEADERS, rows)

        self._assert_invalid("must be the protected provenance value")

    def test_rejects_lifecycle_or_stage_description_drift(self) -> None:
        profiles_path = self.package_dir / "stage_profiles_template.csv"
        _, profiles = self._read_csv(profiles_path)
        profiles[3]["lifecycle_phase"] = "development"
        self._write_csv(profiles_path, PROFILE_HEADERS, profiles)

        stages_path = self.package_dir / "stages.csv"
        _, stages = self._read_csv(stages_path)
        next(row for row in stages if row["stage_id"] == "quality_assurance")[
            "description"
        ] = ""
        self._write_csv(stages_path, STAGE_HEADERS, stages)

        error = self._assert_invalid("owner-approved primary V1 context")
        self.assertIn("description must freeze the V1 activity scope", str(error))
        self.assertIn("quality_assurance must retain", str(error))

    def test_rejects_populated_s_values_and_invented_source_ids(self) -> None:
        path = self.package_dir / "stage_profiles_template.csv"
        _, rows = self._read_csv(path)
        rows[0]["S1"] = "2"
        rows[0]["source_ids"] = "src-invented"
        self._write_csv(path, PROFILE_HEADERS, rows)

        error = self._assert_invalid("S1 must remain blank")
        self.assertIn("source_ids must remain blank", str(error))
        self.assertIn("source IDs may not be invented", str(error))

    def test_rejects_country_modifier_pathway_mismatch(self) -> None:
        path = self.package_dir / "country_stage_modifiers_template.csv"
        row = {field: "" for field in COUNTRY_HEADERS}
        row.update(
            {
                "country": "Example",
                "subnational_scope": "national",
                "actor_scope": "national_aggregate",
                "profile_id": "sp-0001",
                "pathway_id": "wrong_pathway",
                "stage_applicability": "present",
                "binding_status": "not_assessable",
            }
        )
        self._write_csv(path, COUNTRY_HEADERS, [row])

        error = self._assert_invalid("does not match referenced profile_id")
        self.assertIn("must be header-only", str(error))

    def test_rejects_workbook_csv_drift(self) -> None:
        path = self.package_dir / "stage_profiles_template.csv"
        _, rows = self._read_csv(path)
        rows[0]["workflow"] = "Changed outside the workbook builder"
        self._write_csv(path, PROFILE_HEADERS, rows)

        self._assert_invalid("Reference workbook scoped profiles does not match")

    def test_accepts_platform_container_byte_differences(self) -> None:
        workbook_path = self.package_dir / FABLE_WORKBOOK
        original_bytes = workbook_path.read_bytes()
        with ZipFile(workbook_path, "a") as archive:
            archive.comment = b"different ZIP container metadata"
        self.assertNotEqual(original_bytes, workbook_path.read_bytes())

        summary = validate(self.package_dir)
        self.assertEqual(summary["scoped_profiles"], 31)

    def test_rejects_workbook_layout_manifest_drift(self) -> None:
        workbook_path = self.package_dir / FABLE_WORKBOOK
        workbook = load_workbook(workbook_path)
        workbook["SCOPE_REFERENCE"].column_dimensions["D"].width = 17
        workbook.save(workbook_path)

        self._assert_invalid("semantic-and-layout manifest does not match")

    def test_rejects_exception_schema_contract_drift(self) -> None:
        path = self.package_dir / "exception_report.schema.json"
        schema = json.loads(path.read_text(encoding="utf-8"))
        dispositions = schema["$defs"]["exception"]["properties"][
            "owner_disposition"
        ]["enum"]
        dispositions.remove("preserve_disagreement")
        schema["properties"]["comparison_audit"]["maxItems"] = 154
        path.write_text(json.dumps(schema, indent=2) + "\n", encoding="utf-8")

        error = self._assert_invalid("owner dispositions do not match")
        self.assertIn("comparison_audit must require exactly 155", str(error))


if __name__ == "__main__":
    unittest.main()
