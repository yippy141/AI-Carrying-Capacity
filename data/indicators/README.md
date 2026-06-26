# Indicators

`indicator_catalog.csv` is the canonical reviewed indicator catalog.

Stage indicator candidates in `research/source-register/` first. Merge them here only after review.

## Add A New Indicator

1. Add or confirm every supporting source in `data/sources/source_register.csv`. Do not use Wikipedia. Mark unknown fields as `missing`.
2. Add one row to `indicator_catalog.csv` with a unique `indicator_id`, a valid `pillar`, `data_quality` of `high`, `medium`, `low`, or `missing`, and semicolon-separated `source_ids` that exist in the source register.
3. Leave `score` as `missing` unless the value is source-backed or explicitly qualitative-coded. Qualitative scores must use `evidence_label=qualitative-coded` and describe the rubric in `qualitative_coding`.
4. Run:

```sh
python3 scripts/validate_source_register.py
python3 scripts/validate_indicator_catalog.py
python3 scripts/build_v0_dataset.py
```
