# Structural Profiles worksheet build report

## Package state

- Taxonomy: 39 rows, comprising 31 frozen leaf stages and 8 fusion parent rows.
- Scoped profiles: 31 rows in stable `sp-0001` through `sp-0031` order.
- Lifecycle context: all 31 rows use the owner-approved primary V1 context.
- Critical-path role: all 31 rows remain `not_assessed`.
- Research values: every S1-S5 and C1-C8 field remains blank.
- Evidence: all source-ID fields and country/governance rows remain blank.
- Approval: no row is reviewed, approved, or canonicalized.

## Reproducible outputs

`scripts/build_structural_profiles_workbooks.py` reads the CSV templates and
regenerates these three committed workbooks:

- `structural_profiles_reference_and_owner_review.xlsx`
- `fable_submission_template.xlsx`
- `blind_submission_template.xlsx`

The validator compares each committed workbook with a temporary rebuild using
a canonical semantic-and-layout manifest. The manifest covers workbook
properties, ordered sheets, visibility and gridlines, used-cell content and
styles, comments, merges, dimensions, freeze panes, filters, data validation,
cell protection, and print/page settings while excluding timestamps. It also
builds each workbook twice in one temporary runtime and requires the two XLSX
byte streams to be identical.

## Validation commands

The correction pass runs:

```text
git diff --check
python3 scripts/validate_structural_profiles_worksheet.py
python3 -m unittest scripts/validate_structural_profiles_worksheet_test.py
python3 scripts/validate_repo.py
npm run typecheck
npm run lint
npm run build
```

Local correction-pass results:

- `git diff --check`: passed.
- focused worksheet validator: passed with 31 leaf stages, 31 scoped profiles,
  and 18 fusion profiles.
- focused unit tests: 11 passed.
- repository validator: passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; Next.js retained its existing non-fatal dynamic file
  tracing warning.

PR #28 was merged after its correction commit passed GitHub Actions. The
corresponding main-branch CI run also passed.
