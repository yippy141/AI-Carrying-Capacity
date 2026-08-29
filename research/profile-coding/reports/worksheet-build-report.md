# Structural Profiles worksheet build report

Issue: #26

Package status: blank methodology instrument; no WP2 population

## File inventory and row counts

Counts exclude CSV header rows.

| File | Purpose | Data rows |
| --- | --- | ---: |
| `README.md` | One-page owner orientation | n/a |
| `RUBRIC.md` | Frozen S1–S5 rubric, allowed values, and non-aggregation rule | n/a |
| `OWNER_REVIEW_GUIDE.md` | Exception-only owner workflow and fictional example | n/a |
| `templates/stages.csv` | Judgment-free frozen taxonomy | 39 |
| `templates/stage_profiles.csv` | One scoped shell per anchor leaf stage | 31 |
| `templates/profile_coding_reviews.csv` | Canonical submission schema | 0 |
| `templates/fable_submission.csv` | Separate Fable seed-submission shells | 31 |
| `templates/blind_submission.csv` | Separate independent-submission shells | 31 |
| `templates/country_stage_modifiers.csv` | Country-stage schema | 0 |
| `templates/governance_overlay.csv` | Governance schema keyed to profile | 0 |
| `templates/exception_report.csv` | Dimension-specific reconciliation schema | 0 |

Taxonomy breakdown:

| Anchor | Leaf rows | Parent rows | Taxonomy rows | Profile rows |
| --- | ---: | ---: | ---: | ---: |
| Software | 5 | 0 | 5 | 5 |
| Discrete manufacturing | 8 | 0 | 8 | 8 |
| Magnetic-confinement fusion | 18 | 8 | 26 | 18 |
| **Total** | **31** | **8** | **39** | **31** |

Support files outside the package are `scripts/validate_profile_worksheet.py`, `scripts/validate_profile_worksheet_test.py`, the narrow `test:profiles` package command, and required entries in `docs/DECISIONS.md` and `docs/TASKS.md`.

## Filled versus intentionally blank

Filled profile fields are limited to opaque `profile_id`; frozen stage, parent, sector, pathway, and application scope; `critical_path_role=not_assessed`; and the staging defaults `evidence_basis=expert-coded`, `coding_status=proposed`, and `review_status=staged`.

All S1–S5 and C1–C8 values are blank. Rationales, `source_ids`, confidence, review IDs, disagreement, dates, revisit triggers, proposer/reviewer/approver identities, submission status, owner decisions, and substantive dispositions are blank. `workflow`, `lifecycle_phase`, taxonomy descriptions, and row versions are also blank because the canonical method does not assign them at this worksheet stage. Country, governance, review-register, and exception-report files contain headers only.

## Validation results

| Command | Result |
| --- | --- |
| `npm run test:profiles` | Passed: focused validator confirmed 39 taxonomy rows, 31 leaf profiles, 31 Fable shells, and 31 blind shells; 15 unit tests passed. |
| `python3 scripts/validate_repo.py` | Passed. |
| `npm run lint` | Passed, including the design-reference placeholder guard and ESLint with zero warnings. |
| `npm run typecheck` | Passed. |
| `npm run test:evidence` | Passed: eight tests. Node emitted its existing module-type performance warning. |
| `python3 -m unittest scripts/validate_adoption_depth_test.py` | Passed: eight tests. |
| `npm run test:design` | Passed: four tests. |
| `python3 scripts/validate_adoption_depth.py` | Passed: 13 observations. |
| `python3 scripts/validate_source_register.py` | Passed: 55 rows. |
| `python3 scripts/validate_indicator_catalog.py` | Passed: six rows. |
| `python3 scripts/check_launch_readiness.py --mode private-preview` | Exited successfully in private-preview mode and reported the 59 existing TODO/source blockers. This package does not change or clear them. |
| `npm run build` | Passed. Next.js emitted the existing broad project-trace warning from `next.config.ts` / `lib/registers.ts`; all 13 static pages generated. |

The focused change-scope check permits only this package, its two validator files, the narrow package command, and required decision/task-log updates. It rejects application, UI, figure, scenario, coupling, and canonical-data paths.

## Scope ambiguities

### Blockers

None. The authority files agree on the three pathways, all 31 leaf stages, and the eight fusion parent groups.

### Nonblocking questions retained for later review

1. The frozen method provides pathway-level application scope but does not assign a separate leaf-level `workflow` or `lifecycle_phase`. The worksheet preserves the exact scope in `application_context` and leaves those two fields blank.
2. The method freezes stage IDs and fusion hierarchy but does not provide stage-description prose. `description` remains blank rather than adding interpretation.
3. The method requires version history but does not specify a version-string convention for blank template rows. `version` remains blank until a real row is submitted or selected under a documented convention.
4. Contradictory-rationale, scope-ambiguity, and load-bearing flags require reconciliation judgment. The schema exposes them, but this builder does not classify any row.

## Boundary confirmation

WP2, Fable coding, blind coding, reconciliation, owner review, fusion domain review, country coding, governance coding, and canonical approval were not executed. No application, public UI, figure, scenario, coupling, or canonical data file was changed.
