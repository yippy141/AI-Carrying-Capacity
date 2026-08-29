# Structural Profiles coding worksheet

This package is the blank, owner-reviewable instrument between the frozen WP1.5 method gate and WP2. Here, **coding means research classification, not software programming**. The package prepares records and review lanes; it does not make any S1–S5 or C1–C8 judgments.

## What is already filled

- `templates/stages.csv` contains the frozen taxonomy: 31 anchor leaf stages plus the eight fusion parent stages, for 39 rows total.
- `templates/stage_profiles.csv` contains one row for each leaf stage: five software, eight manufacturing, and 18 fusion profiles. It fills only opaque profile identity, the taxonomy relationship, sector, frozen pathway, the exact frozen application scope, `critical_path_role=not_assessed`, and the required staging defaults `evidence_basis=expert-coded`, `coding_status=proposed`, and `review_status=staged`.
- `templates/fable_submission.csv` and `templates/blind_submission.csv` contain separate blank submission rows for the same 31 profile IDs. The Fable file identifies the required seed provenance. The blind file identifies only the independent-coder role.
- The review, country-modifier, governance, and exception-report files contain schemas only.

## What is intentionally blank

All S1–S5 and C1–C8 values are blank. So are rationales, sources, confidence, coder-generated dates, review dates, revisit triggers, reviewer and approver identities, submission IDs and statuses, selected reviews, disagreements, owner decisions, and substantive dispositions. No country or governance rows exist.

The canonical method does not assign a leaf-specific `workflow` or `lifecycle_phase`, so those profile fields remain blank rather than being inferred. It also provides no stage descriptions or template-row version convention, so those fields remain blank. The exact frozen pathway scope is preserved in `application_context`.

## What happens later

1. Fable completes only `fable_submission.csv`, adding its proposed S1–S5 values, rationale, sources, evidence vintage, and submission metadata.
2. A blind reviewer completes only `blind_submission.csv` without seeing Fable's values or rationale.
3. A reconciliation step preserves both submissions and produces dimension-specific comparison rows using `exception_report.csv`.
4. The owner reviews the flagged exceptions, not all 155 score cells. Every fusion row still requires domain-informed review before any canonical approval.
5. Only after that separate review gate may a later task begin WP2 population.

`RUBRIC.md` controls the classification language. `OWNER_REVIEW_GUIDE.md` explains exception review. The focused validator is run with `npm run test:profiles`.

This package contains no canonical profile data, public UI changes, country coding, governance coding, coupling work, scenarios, or WP2 implementation.
