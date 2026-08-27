#!/usr/bin/env python3
"""Reject placeholder data copied from the design-system grammar reference."""

from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
APP_CODE_ROOTS = ("app", "components", "lib")
APP_CODE_SUFFIXES = {".css", ".js", ".jsx", ".ts", ".tsx"}

# These claims exist only to demonstrate the reference frame. They are not
# approved product claims and must never be copied into the application.
FORBIDDEN_REFERENCE_CLAIMS = (
    "most of the economy is not made of tokens",
    "where ai leverage sits on the fusion critical path",
)

# The reference assigns these labels to bands/stages as a visual demonstration.
# Requiring every token catches an implementation of the complete placeholder
# assignment while allowing the real product to discuss any one sector or stage.
FORBIDDEN_REFERENCE_SEQUENCES = (
    (
        "software",
        "cybersecurity",
        "media",
        "finance",
        "ent. admin",
        "gov. bureaucracy",
        "education",
        "science",
        "logistics",
        "manufacturing",
        "healthcare",
        "construction",
        "energy & grid",
        "pharma r&d",
        "materials",
        "fusion",
        "space: roadmap",
    ),
    (
        "simulation",
        "plasma control",
        "materials scr.",
        "magnet fab.",
        "construction",
        "qualification",
        "licensing",
    ),
)

COMPRESSIBILITY_TERM = (
    r"compress(?:ibility|ible|ion|ing|ed)?|frontier[-\s]gap|gap[-\s]compression"
)
PERCENTAGE = r"\b\d+(?:\.\d+)?\s*%"
COMPRESSIBILITY_PERCENTAGE = re.compile(
    rf"(?:{PERCENTAGE}.{{0,180}}\b(?:{COMPRESSIBILITY_TERM})\b|"
    rf"\b(?:{COMPRESSIBILITY_TERM})\b.{{0,180}}{PERCENTAGE})",
    flags=re.IGNORECASE | re.DOTALL,
)


def _normalise(value: str) -> str:
    return " ".join(value.lower().split())


def find_placeholder_violations(text: str) -> list[str]:
    """Return design-reference placeholder fingerprints found in source text."""

    normalised = _normalise(text)
    violations = [
        f"reference-only claim: {claim!r}"
        for claim in FORBIDDEN_REFERENCE_CLAIMS
        if claim in normalised
    ]

    for index, sequence in enumerate(FORBIDDEN_REFERENCE_SEQUENCES, start=1):
        if all(token in normalised for token in sequence):
            violations.append(f"reference placeholder assignment sequence {index}")

    match = COMPRESSIBILITY_PERCENTAGE.search(text)
    if match:
        snippet = _normalise(match.group(0))
        violations.append(
            "numeric percentage in a compressibility/frontier-gap context: "
            + repr(snippet[:220])
        )

    return violations


def validate(root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    for root_name in APP_CODE_ROOTS:
        code_root = root / root_name
        if not code_root.exists():
            continue
        for path in sorted(code_root.rglob("*")):
            if path.suffix not in APP_CODE_SUFFIXES or not path.is_file():
                continue
            for violation in find_placeholder_violations(
                path.read_text(encoding="utf-8")
            ):
                errors.append(f"{path.relative_to(root)}: {violation}")
    return errors


def main() -> None:
    errors = validate()
    if errors:
        print(
            "ERROR: design-reference placeholder values found in app code:\n"
            + "\n".join(f"- {error}" for error in errors),
            file=sys.stderr,
        )
        raise SystemExit(1)
    print("Design-reference placeholder validation passed.")


if __name__ == "__main__":
    main()
