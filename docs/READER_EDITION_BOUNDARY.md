# Representation and release-boundary amendment

Authorized by the first-reader-edition user brief, 2026-09-06. This is a narrow
display/schema/engineering amendment, not a change to S1–S5 or coding history.

## Nullable selections, version 1.1

`data/profiles/stage_profiles.csv` retains the METHOD_PROFILES column order.
For non-approved rows, empty S cells mean **no selected value**, parsed as null.
Approved rows still require integer 0–4 selections and every prior approval
condition. Version 1.0 consumers must reject/skip non-approved rows rather than
coerce blanks to zero. `dimension_dispositions.csv` supplies exactly five linked
records per profile: original review IDs, submitted endpoints, any later
recommendation endpoints, selection basis and the historical-record locator.
Endpoints describe qualitative assessments, never empirical confidence intervals.
The raw submissions remain byte-for-byte intact in research; the derived review
CSV combines them without changing fields. No C or governance rows are created.

Only PR #42's twelve explicit S5 selections populate scalar fields. Even exact
coder agreement is not a documented selection. Domain recommendations and owner
preferences remain linked recommendations/preferences. Thus this conservative
projection cannot quietly settle a disagreement in order to fit the schema.

## Honest display label

For this edition, the historical `expert-coded` evidence basis maps to
**Analyst assessment · AI-assisted** when the underlying coder/reviewer is a
model. Show “Draft; named specialist review pending” separately where applicable.
No model is described as a human expert. Original labels, role strings, model
identifiers and historical notes are untouched. A future human assessment must
name its actual reviewer and scope; this mapping grants no approval.

## Three distinct checks

1. Historical snapshots: original validators/manifests and governing documents
   are archived under `scripts/archive/reader-baseline` and
   `docs/archive/reader-baseline`. Their expected hashes are unchanged. A Git
   snapshot test reconstructs the predecessor commit and runs the original
   nested protected-input checks. Accepted raw research files are also pinned
   individually in the current tree; additions elsewhere cannot invalidate them.
2. Current invariants: strict CSV parsing, types, foreign keys, dimension
   missingness/provenance, source/use restrictions, publication eligibility and
   source/claim/license append-only prefixes. Historical record/workbook tests
   still run. Current app code is not an immutable research input.
3. Package scope: changed paths are compared with the PR base and release
   allowlist. New unrelated modules, country data, credentials and alterations
   of frozen records fail. A later authorized package defines its own scope.

The source-promotion and fusion-domain `validate_protected_inputs` functions now
call the current immutable-record check. S5 retains its additional domain-review
digest. Constants remain in place as historical manifests; they are exercised
against the historical commit, never refreshed to conceal application edits.

The old launch TODO scan remains an archive/backlog diagnostic. The actual
release gate follows the finite routes and their transitive imports, checks
the rendered claim manifest, and rejects draft objects in publication mode.
Review-preview and publication are explicit modes; preview permission does not
approve production uses. Hosting access is separate: the existing automatic
Vercel branch preview redirects unauthenticated requests to Vercel SSO; this
application adds no authentication system. See the validation report.
