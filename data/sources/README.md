# Sources

`source_register.csv` is the canonical reviewed source register.

Stage extracted source rows in `research/source-register/` first. Merge them here only after review.

Reliability tiers are `A`, `B`, `C`, `D`, and `E`. `E` is reserved for placeholders, unreviewed leads, or material that must not be used as evidence.

Validate after edits:

```sh
python3 scripts/validate_source_register.py
```
