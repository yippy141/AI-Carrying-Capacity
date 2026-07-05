#!/usr/bin/env python3
"""Check whether the Atlas is ready for public launch.

The default mode is `private-preview`, which reports launch blockers but exits zero so
normal development can continue. Use `--mode public-pilot` before public sharing; that
mode exits non-zero when blockers are present.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from pathlib import Path
from typing import Any

from validate_indicator_catalog import DEFAULT_INDICATOR_CATALOG
from validate_indicator_catalog import parse_source_ids
from validate_source_register import DEFAULT_SOURCE_REGISTER
from validate_source_register import is_missing


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_TEXT_PATHS = [ROOT / "app", ROOT / "components", ROOT / "content"]
VISUAL_JSON = ROOT / "data" / "processed" / "v0_visual_system.json"
TODO_PATTERNS = ("TODO_SOURCE", "TODO_DATA", "TODO_VERIFY")
SOURCE_ID_PATTERN = re.compile(r"src-[A-Za-z0-9_.:-]+")
EMPIRICAL_LABELS = {"observed", "estimated"}
BLOCKED_EMPIRICAL_TIERS = {"C", "D", "E"}
BLOCKED_EMPIRICAL_METHOD_TYPES = {"expert_commentary", "placeholder"}


def read_csv(path: Path) -> list[dict[str, str]]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def has_score(value: str | None) -> bool:
    return not is_missing(value)


def has_explicit_qualitative_coding(row: dict[str, str]) -> bool:
    return (
        (row.get("evidence_label") or "").strip() == "qualitative-coded"
        and not is_missing(row.get("qualitative_coding"))
    )


def is_placeholder(row: dict[str, str]) -> bool:
    return (row.get("placeholder") or "").strip().lower() in {"true", "yes", "1"}


def iter_public_text_files() -> list[Path]:
    files: list[Path] = []
    for root in PUBLIC_TEXT_PATHS:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if path.is_file() and path.suffix.lower() in {".md", ".mdx", ".ts", ".tsx"}:
                files.append(path)
    return files


def find_todos() -> list[str]:
    findings: list[str] = []
    for path in iter_public_text_files():
        text = path.read_text(encoding="utf-8")
        for pattern in TODO_PATTERNS:
            if pattern in text:
                rel = path.relative_to(ROOT)
                findings.append(f"{rel}: contains {pattern}")
    return findings


def collect_source_ids_from_json(value: Any) -> set[str]:
    source_ids: set[str] = set()
    if isinstance(value, dict):
        for child in value.values():
            source_ids.update(collect_source_ids_from_json(child))
    elif isinstance(value, list):
        for child in value:
            source_ids.update(collect_source_ids_from_json(child))
    elif isinstance(value, str):
        source_ids.update(SOURCE_ID_PATTERN.findall(value))
    return source_ids


def find_visual_source_id_mismatches(valid_source_ids: set[str]) -> list[str]:
    if not VISUAL_JSON.exists():
        return []
    with VISUAL_JSON.open(encoding="utf-8") as handle:
        data = json.load(handle)
    visual_source_ids = collect_source_ids_from_json(data)
    return sorted(source_id for source_id in visual_source_ids if source_id not in valid_source_ids)


def check() -> list[str]:
    blockers: list[str] = []
    sources = read_csv(DEFAULT_SOURCE_REGISTER)
    indicators = read_csv(DEFAULT_INDICATOR_CATALOG)
    source_by_id = {row.get("source_id", "").strip(): row for row in sources}
    valid_source_ids = set(source_by_id)

    reviewed_sources = [
        row
        for row in sources
        if (row.get("review_status") or "").strip() == "reviewed" and not is_placeholder(row)
    ]
    if not reviewed_sources:
        blockers.append(
            "Canonical source register has no reviewed non-placeholder source rows."
        )

    for finding in find_todos():
        blockers.append(f"Public-facing TODO remains: {finding}")

    for row in sources:
        searchable = " ".join(
            row.get(column, "")
            for column in ("title_original", "title_english", "url_or_doi", "original_language_url")
        ).lower()
        if "wikipedia.org" in searchable:
            blockers.append(f"Source {row.get('source_id')} uses Wikipedia URL.")

    for line_number, row in enumerate(indicators, start=2):
        indicator_id = row.get("indicator_id", f"line-{line_number}")
        source_ids = parse_source_ids(row.get("source_ids"))
        if has_score(row.get("score")) and not source_ids and not has_explicit_qualitative_coding(row):
            blockers.append(
                f"Indicator {indicator_id} has a score without source_ids or qualitative coding."
            )

        evidence_label = (row.get("evidence_label") or "").strip()
        if evidence_label in EMPIRICAL_LABELS or has_score(row.get("score")):
            for source_id in source_ids:
                source = source_by_id.get(source_id)
                if source is None:
                    blockers.append(
                        f"Indicator {indicator_id} references missing source_id {source_id}."
                    )
                    continue
                reliability_tier = (source.get("reliability_tier") or "").strip()
                method_type = (source.get("method_type") or "").strip()
                if reliability_tier in BLOCKED_EMPIRICAL_TIERS:
                    blockers.append(
                        f"Empirical indicator {indicator_id} uses tier {reliability_tier} source {source_id}."
                    )
                if method_type in BLOCKED_EMPIRICAL_METHOD_TYPES:
                    blockers.append(
                        f"Empirical indicator {indicator_id} uses method_type {method_type} source {source_id}."
                    )

    for source_id in find_visual_source_id_mismatches(valid_source_ids):
        blockers.append(
            f"Visual system references {source_id}, which is not in canonical source_register.csv."
        )

    return blockers


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--mode",
        choices=("private-preview", "public-pilot"),
        default="private-preview",
        help="private-preview reports blockers but exits zero; public-pilot fails on blockers.",
    )
    args = parser.parse_args()

    blockers = check()
    if not blockers:
        print("Launch readiness passed: no blockers found.")
        return

    print(f"Launch readiness found {len(blockers)} blocker(s):")
    for blocker in blockers:
        print(f"- {blocker}")

    if args.mode == "public-pilot":
        raise SystemExit(1)

    print("Private-preview mode: blockers reported but not failing CI.")


if __name__ == "__main__":
    main()
