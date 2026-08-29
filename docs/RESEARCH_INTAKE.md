# Research Intake

Use this workflow when commissioned Deep Research reports arrive.

## 0. Classify The Intake

Before extraction, classify the item under `docs/FRESHNESS_PROTOCOL.md` as a
scheduled empirical source, event-triggered technical source, event-triggered
policy or market source, structural literature, or speculative lead.

Record the source's publication date, access date, originating claim owner,
independent-validation status, affected project objects, and the smallest
justified action. A new release does not automatically require recoding or a
method change. Anonymous or unattributed social-media material remains a lead
and cannot enter the evidence chain.

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

For volatile claims, also define a concrete revisit trigger. Examples include
the publisher issuing a new vintage, a benchmark changing methodology, a law
taking effect, an independent replication appearing, or a forecast threshold
being crossed. “Check regularly” is not a sufficient trigger.

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

Before public use, confirm that load-bearing source rows have a current
`last_verified`, claim rows have a current `last_reviewed`, and no superseding
publisher release or correction is known. Preserve prior vintages rather than
silently rewriting history.
