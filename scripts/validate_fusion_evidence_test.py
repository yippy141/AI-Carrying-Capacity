#!/usr/bin/env python3
"""Focused tests for the issue #35 fusion evidence package."""

from __future__ import annotations

import csv
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "scripts"
if str(SCRIPTS) not in sys.path:
    sys.path.insert(0, str(SCRIPTS))

from validate_fusion_evidence import (  # noqa: E402
    COVERAGE_STATUSES,
    DIMENSIONS,
    EVIDENCE_BASES,
    PACKAGE,
    PROFILE_IDS,
    validate,
)


def rows(name: str) -> list[dict[str, str]]:
    with (PACKAGE / name).open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


class FusionEvidencePackageTest(unittest.TestCase):
    def test_package_contract(self) -> None:
        validate()

    def test_profile_coverage_is_complete_and_value_free(self) -> None:
        coverage = rows("profile_evidence_coverage_v1.csv")
        self.assertEqual([row["profile_id"] for row in coverage], PROFILE_IDS)
        for row in coverage:
            for dim in DIMENSIONS:
                self.assertIn(row[f"{dim}_status"], COVERAGE_STATUSES)
                self.assertNotIn(dim, row)

    def test_numerical_claims_have_source_and_locator(self) -> None:
        claims = rows("claim_source_map_v1.csv")
        numerical = [row for row in claims if row["quantitative_value"] != "missing"]
        self.assertGreater(len(numerical), 0)
        for row in numerical:
            self.assertNotEqual(row["candidate_source_ids"], "missing")
            self.assertNotEqual(row["source_locator"], "missing")
            self.assertNotEqual(row["denominator"], "missing")
            self.assertNotEqual(row["unit"], "missing")

    def test_evidence_distinctions_are_closed_and_explicit(self) -> None:
        inventory = rows("source_inventory_v1.csv")
        claims = rows("claim_source_map_v1.csv")
        self.assertTrue({row["evidence_basis"] for row in inventory} <= EVIDENCE_BASES)
        self.assertTrue({row["evidence_basis"] for row in claims} <= EVIDENCE_BASES)
        self.assertTrue(any(row["evidence_basis"] == "observed experimental result" for row in inventory))
        self.assertTrue(any(row["evidence_basis"] == "observed facility milestone" for row in inventory))
        self.assertTrue(any(row["evidence_basis"] == "company target" for row in inventory))
        self.assertTrue(any(row["evidence_basis"] == "programme announcement" for row in inventory))
        self.assertTrue(any(row["evidence_basis"] == "observed legal/regulatory status" for row in inventory))

    def test_bounded_p1_corrections_are_present(self) -> None:
        inventory = {row["candidate_source_id"]: row for row in rows("source_inventory_v1.csv")}
        claims = {row["claim_id"]: row for row in rows("claim_source_map_v1.csv")}
        rejected = rows("rejected_and_deferred_sources_v1.csv")

        self.assertIn("Article 39", inventory["fusion-src-004"]["numerical_claims_and_locators"])
        self.assertEqual(inventory["fusion-src-023"]["verification_status"], "verified_peer_reviewed")
        self.assertEqual(inventory["fusion-src-030"]["url_or_doi"], "https://www.pppl.gov/nstx-u")
        self.assertEqual(inventory["fusion-src-037"]["verification_status"], "verified_official_primary")
        self.assertIn("fusion-src-045", inventory)
        self.assertIn("fusion-src-046", inventory)
        self.assertEqual(claims["fusion-clm-082"]["directness"], "indirect")
        self.assertEqual(claims["fusion-clm-084"]["directness"], "indirect")
        self.assertFalse(
            {"fusion-src-023", "fusion-src-030", "fusion-src-037"}
            & {row["candidate_source_id"] for row in rejected}
        )


if __name__ == "__main__":
    unittest.main()
