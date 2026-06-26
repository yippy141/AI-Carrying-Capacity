#!/usr/bin/env python3
"""Build V0 processed metadata files from reviewed CSV registers."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path

from validate_indicator_catalog import DEFAULT_INDICATOR_CATALOG
from validate_indicator_catalog import parse_source_ids
from validate_indicator_catalog import validate as validate_indicator_catalog
from validate_source_register import DEFAULT_SOURCE_REGISTER
from validate_source_register import validate as validate_source_register


ROOT = Path(__file__).resolve().parents[1]
PROCESSED_DIR = ROOT / "data" / "processed"
COUNTRY_PROFILES_PATH = PROCESSED_DIR / "v0_country_profiles.json"
INDICATOR_METADATA_PATH = PROCESSED_DIR / "v0_indicator_metadata.json"
SOURCE_METADATA_PATH = PROCESSED_DIR / "v0_source_metadata.json"


def is_true(value: str | None) -> bool:
    return (value or "").strip().lower() == "true"


def build_source_metadata(source_rows: list[dict[str, str]], updated: str) -> dict[str, object]:
    return {
        "metadata": {
            "project": "AI Conversion Atlas",
            "version": "v0",
            "status": "placeholder",
            "updated": updated,
            "source": "data/sources/source_register.csv",
            "note": "Rows marked placeholder are non-evidentiary and must be replaced before use.",
        },
        "sources": [
            {
                **row,
                "placeholder": is_true(row.get("placeholder")),
            }
            for row in source_rows
        ],
    }


def build_indicator_metadata(
    indicator_rows: list[dict[str, str]], updated: str
) -> dict[str, object]:
    return {
        "metadata": {
            "project": "AI Conversion Atlas",
            "version": "v0",
            "status": "placeholder",
            "updated": updated,
            "source": "data/indicators/indicator_catalog.csv",
            "note": "Indicator metadata are not country scores.",
        },
        "indicators": [
            {
                **row,
                "source_ids": parse_source_ids(row.get("source_ids")),
                "placeholder": is_true(row.get("placeholder")),
            }
            for row in indicator_rows
        ],
    }


def build_country_profiles(updated: str) -> dict[str, object]:
    return {
        "metadata": {
            "project": "AI Conversion Atlas",
            "version": "v0",
            "status": "placeholder",
            "updated": updated,
            "source": "scripts/build_v0_dataset.py",
            "note": (
                "No country profile values are generated until reviewed country-level "
                "indicator data exist."
            ),
        },
        "profiles": [],
    }


def write_json(path: Path, payload: dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2, sort_keys=True)
        handle.write("\n")


def main() -> None:
    source_rows = validate_source_register(DEFAULT_SOURCE_REGISTER)
    indicator_rows = validate_indicator_catalog(DEFAULT_INDICATOR_CATALOG, DEFAULT_SOURCE_REGISTER)
    updated = date.today().isoformat()

    write_json(SOURCE_METADATA_PATH, build_source_metadata(source_rows, updated))
    write_json(INDICATOR_METADATA_PATH, build_indicator_metadata(indicator_rows, updated))
    write_json(COUNTRY_PROFILES_PATH, build_country_profiles(updated))

    print(f"Wrote {COUNTRY_PROFILES_PATH.relative_to(ROOT)}")
    print(f"Wrote {INDICATOR_METADATA_PATH.relative_to(ROOT)}")
    print(f"Wrote {SOURCE_METADATA_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
