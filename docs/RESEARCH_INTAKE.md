# Research Intake

Use this workflow when commissioned Deep Research reports arrive.

## 1. Save The Report

Use this filename pattern:

```text
research/deep-research/YYYY-MM-DD-topic.md
```

Examples:

```text
research/deep-research/2026-06-27-literature-review.md
research/deep-research/2026-06-27-china-ai-plus.md
research/deep-research/2026-06-27-manufacturing-robotics.md
```

## 2. Extract Sources Into Staging

Use `templates/source_register_additions.csv`.

Save staged files as:

```text
research/source-register/YYYY-MM-DD-topic-source-register-additions.csv
```

Do not merge into `data/sources/source_register.csv` until reviewed.

## 3. Extract Indicator Candidates Into Staging

Use `templates/indicator_candidates.csv`.

Save staged files as:

```text
research/source-register/YYYY-MM-DD-topic-indicator-candidates.csv
```

## 4. Review Claims

For every important claim, identify whether it is:

- Direct observed evidence.
- Official government or institutional claim.
- Expert interpretation.
- Media reporting.
- Unverified lead.

Claims that could appear in public writing, charts, captions, or UI should be added to:

```text
data/claims/claim_ledger.csv
```

## 5. Merge Reviewed Rows

Only after review:

- Add approved source rows to `data/sources/source_register.csv`.
- Add approved indicator rows to `data/indicators/indicator_catalog.csv`.
- Add public-facing synthesis claims to `data/claims/claim_ledger.csv`.
- Update `docs/DECISIONS.md` if the report changes scope, method, naming, or scoring.
- Update `docs/TASKS.md`.

## 6. Validate

Run:

```sh
python3 scripts/validate_repo.py
```
