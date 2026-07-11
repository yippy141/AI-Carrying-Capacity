#!/usr/bin/env python3
"""Unit tests for the canonical adoption-depth observation validator."""

from __future__ import annotations

import csv
import tempfile
import unittest
from pathlib import Path

try:
    from scripts.validate_adoption_depth import (
        AdoptionDepthValidationError,
        REQUIRED_COLUMNS,
        validate,
    )
except ModuleNotFoundError:  # Supports direct execution from the scripts directory.
    from validate_adoption_depth import (  # type: ignore[no-redef]
        AdoptionDepthValidationError,
        REQUIRED_COLUMNS,
        validate,
    )


SOURCE_COLUMNS = [
    "source_id",
    "title_original",
    "title_english",
    "authors_org",
    "url_or_doi",
    "review_status",
    "placeholder",
]


def _source(
    source_id: str,
    title: str,
    organisation: str,
    *,
    review_status: str = "reviewed",
    placeholder: str = "false",
) -> dict[str, str]:
    return {
        "source_id": source_id,
        "title_original": title,
        "title_english": title,
        "authors_org": organisation,
        "url_or_doi": f"https://example.test/{source_id}",
        "review_status": review_status,
        "placeholder": placeholder,
    }


DEFAULT_SOURCES = [
    _source(
        "src-ecb",
        "SAFE Q4 2025 survey results",
        "European Central Bank",
    ),
    _source(
        "src-eurostat",
        "Artificial intelligence use in enterprises in 2025",
        "Eurostat",
    ),
    _source(
        "src-btos-pre",
        "Business Trends and Outlook Survey AI use, 2023",
        "U.S. Census Bureau",
    ),
    _source(
        "src-btos-post",
        "The Microstructure of AI Diffusion",
        "U.S. Census Bureau",
    ),
    _source(
        "src-staged",
        "Staged adoption source",
        "Example Agency",
        review_status="staged",
    ),
    _source(
        "src-placeholder",
        "Placeholder adoption source",
        "Example Agency",
        review_status="placeholder",
        placeholder="true",
    ),
]


def _observation(**overrides: str) -> dict[str, str]:
    row = {
        "observation_id": "obs-ecb-1",
        "geography": "Euro area",
        "period": "2025 Q4",
        "panel": "ecb-intensity",
        "measure": "Firms not currently using AI",
        "value": "27",
        "unit": "percent of firms",
        "denominator": "All firms",
        "survey_universe": "SAFE euro-area firms",
        "source_id": "src-ecb",
        "evidence_label": "observed",
        "comparability_class": "directly-comparable",
        "definition": "Response category in the SAFE AI-use intensity question.",
        "caveat": "Published weighted share; categories are rounded.",
        "last_verified": "2026-07-11",
    }
    row.update(overrides)
    return row


class AdoptionDepthValidatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self._temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self._temporary_directory.name)
        self.observations = self.root / "adoption_depth.csv"
        self.sources = self.root / "source_register.csv"
        self._write_sources(DEFAULT_SOURCES)

    def tearDown(self) -> None:
        self._temporary_directory.cleanup()

    def _write_sources(self, rows: list[dict[str, str]]) -> None:
        self._write_csv(self.sources, SOURCE_COLUMNS, rows)

    def _write_observations(
        self,
        rows: list[dict[str, str]],
        fieldnames: list[str] | None = None,
    ) -> None:
        self._write_csv(self.observations, fieldnames or REQUIRED_COLUMNS, rows)

    @staticmethod
    def _write_csv(
        path: Path,
        fieldnames: list[str],
        rows: list[dict[str, str]],
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

    def _assert_invalid(self, expected_message: str) -> AdoptionDepthValidationError:
        with self.assertRaises(AdoptionDepthValidationError) as raised:
            validate(self.observations, self.sources)
        self.assertIn(expected_message, str(raised.exception))
        return raised.exception

    def test_accepts_valid_source_specific_panels(self) -> None:
        self._write_observations(
            [
                _observation(),
                _observation(
                    observation_id="obs-ecb-2",
                    measure="Firms using AI very infrequently or experimentally",
                    value="33",
                    definition="A different response category in the same SAFE question.",
                ),
                _observation(
                    observation_id="obs-eurostat-size",
                    geography="EU large firms",
                    period="2025",
                    panel="eurostat-size-gradient",
                    measure="Enterprises using at least one AI technology",
                    value="55.03",
                    denominator="Large enterprises with 250+ employees",
                    survey_universe="Eurostat ICT enterprise survey",
                    source_id="src-eurostat",
                    comparability_class="context-only",
                    definition="Enterprise use of at least one listed AI technology.",
                ),
                _observation(
                    observation_id="obs-btos-comprehensive",
                    geography="United States",
                    period="Nov 2025-Jan 2026",
                    panel="btos-adopter-breadth",
                    measure="Comprehensive adopters across business functions",
                    value="4",
                    denominator="AI-using firms",
                    survey_universe="BTOS AI supplement",
                    source_id="src-btos-post",
                    evidence_label="estimated",
                    comparability_class="not-directly-comparable",
                    definition="Latent-class estimate among functional AI adopters.",
                ),
            ]
        )

        rows = validate(self.observations, self.sources)

        self.assertEqual(len(rows), 4)

    def test_requires_exact_fifteen_column_header(self) -> None:
        reordered = REQUIRED_COLUMNS.copy()
        reordered[0], reordered[1] = reordered[1], reordered[0]
        self._write_observations([_observation()], fieldnames=reordered)

        self._assert_invalid("header must exactly match the 15-column")

    def test_rejects_duplicate_ids_and_non_numeric_values(self) -> None:
        self._write_observations(
            [
                _observation(value="not-a-number"),
                _observation(value="33"),
            ]
        )

        error = self._assert_invalid("value must be a finite number")
        self.assertIn("duplicate observation_id", str(error))

    def test_rejects_missing_denominator_universe_and_unknown_enums(self) -> None:
        self._write_observations(
            [
                _observation(
                    denominator="missing",
                    survey_universe="",
                    evidence_label="anecdotal",
                    comparability_class="globally-comparable",
                )
            ]
        )

        error = self._assert_invalid("denominator must not be missing")
        message = str(error)
        self.assertIn("survey_universe must not be missing", message)
        self.assertIn("evidence_label must be one of", message)
        self.assertIn("comparability_class must be one of", message)

    def test_requires_reviewed_non_placeholder_canonical_sources(self) -> None:
        self._write_observations(
            [
                _observation(
                    observation_id="obs-unknown",
                    source_id="src-does-not-exist",
                    comparability_class="context-only",
                ),
                _observation(
                    observation_id="obs-staged",
                    source_id="src-staged",
                    comparability_class="context-only",
                ),
                _observation(
                    observation_id="obs-placeholder",
                    source_id="src-placeholder",
                    comparability_class="context-only",
                ),
            ]
        )

        error = self._assert_invalid("does not exist in the canonical source register")
        message = str(error)
        self.assertIn("must have review_status 'reviewed'", message)
        self.assertIn("must be a non-placeholder canonical source", message)

    def test_rejects_direct_comparison_across_source_families(self) -> None:
        self._write_observations(
            [
                _observation(panel="pooled-adoption"),
                _observation(
                    observation_id="obs-eurostat",
                    panel="pooled-adoption",
                    source_id="src-eurostat",
                    survey_universe="SAFE euro-area firms",
                    denominator="All firms",
                    definition="Enterprise use of a listed AI technology.",
                ),
            ]
        )

        self._assert_invalid("directly comparable across source families ecb, eurostat")

    def test_rejects_incompatible_denominators_universes_and_question_frames(self) -> None:
        with self.subTest("denominator"):
            self._write_observations(
                [
                    _observation(),
                    _observation(
                        observation_id="obs-ecb-adopters",
                        denominator="AI-using firms",
                    ),
                ]
            )
            self._assert_invalid("incompatible denominators")

        with self.subTest("survey universe"):
            self._write_observations(
                [
                    _observation(),
                    _observation(
                        observation_id="obs-ecb-different-universe",
                        survey_universe="A different SAFE sampling universe",
                    ),
                ]
            )
            self._assert_invalid("incompatible survey universes")

        with self.subTest("question frame"):
            self._write_observations(
                [
                    _observation(),
                    _observation(
                        observation_id="obs-ecb-investment",
                        measure="Average expected AI investment share",
                        definition="Expected AI investment as a share of total investment.",
                    ),
                ]
            )
            self._assert_invalid("incompatible question frames")

    def test_rejects_btos_series_across_november_2025_wording_break(self) -> None:
        self._write_observations(
            [
                _observation(
                    observation_id="obs-btos-2023",
                    geography="United States",
                    period="2023-10-23 to 2023-11-05",
                    panel="btos-use-series",
                    measure="Businesses using AI to produce goods or services",
                    denominator="U.S. employer businesses",
                    survey_universe="BTOS core AI question",
                    source_id="src-btos-pre",
                    comparability_class="not-directly-comparable",
                    definition="Pre-revision production-use wording.",
                ),
                _observation(
                    observation_id="obs-btos-2026",
                    geography="United States",
                    period="2026-05-03 endpoint",
                    panel="btos-use-series",
                    measure="Businesses using AI in any business function",
                    value="19.8",
                    denominator="U.S. employer businesses",
                    survey_universe="BTOS core AI question",
                    source_id="src-btos-post",
                    comparability_class="not-directly-comparable",
                    definition="Post-revision any-business-function wording.",
                ),
            ]
        )

        self._assert_invalid("across the November 2025 wording break")


if __name__ == "__main__":
    unittest.main()
