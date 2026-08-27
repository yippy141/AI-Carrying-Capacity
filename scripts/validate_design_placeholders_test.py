import sys
import tempfile
import unittest
from pathlib import Path


SCRIPTS_DIR = Path(__file__).resolve().parent
if str(SCRIPTS_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPTS_DIR))

from validate_design_placeholders import (  # noqa: E402
    find_placeholder_violations,
    validate,
)


class DesignPlaceholderValidatorTest(unittest.TestCase):
    def test_rejects_reference_claim(self) -> None:
        violations = find_placeholder_violations(
            "const title = 'Most of the economy is not made of tokens';"
        )
        self.assertTrue(violations)

    def test_rejects_percentage_near_compressibility_claim(self) -> None:
        violations = find_placeholder_violations(
            "const copy = 'Frontier-gap compression reached 42% in this sample';"
        )
        self.assertTrue(violations)

    def test_allows_sourced_percentage_without_compressibility_claim(self) -> None:
        self.assertEqual(
            find_placeholder_violations(
                "const copy = 'A reviewed survey reports adoption of 16.4%';"
            ),
            [],
        )

    def test_scans_only_application_code_roots(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "app").mkdir()
            (root / "docs").mkdir()
            (root / "app" / "page.tsx").write_text(
                "export const value = 'gap compressibility is under review';",
                encoding="utf-8",
            )
            (root / "docs" / "reference.md").write_text(
                "Frontier-gap compression reached 42% in this sample",
                encoding="utf-8",
            )
            self.assertEqual(validate(root), [])


if __name__ == "__main__":
    unittest.main()
