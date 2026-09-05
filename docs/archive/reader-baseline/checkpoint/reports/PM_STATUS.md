# PM Status

Last updated: 2026-09-03.
Read first: `docs/PROJECT_STATE.md`.

## Current posture

**Private preview; final bounded pre-WP2 gate.** Current `main` is PR #40 merge
`e6edd06ee0e9c78214989d31c5647525b7c91cdd`, containing correction head
`ee609a8dc2c587304b237d9ede9f7514b18ad55d`. The active issue #41 branch is
`research/targeted-s5-adjudication`.

Issue #41 adjudicates the existing 19-row S5 backlog and repairs the project
control plane. It does not create a production profile, populate C1-C8 or
governance, build UI, change figures/forecasts/scenarios, approve a profile, or
start WP2.

## Current program state

| Object | State |
| --- | --- |
| Frozen pilot profiles | 31 |
| Coding comparisons | 155 |
| Reconciliation owner exceptions/decisions | 23 |
| Fusion-domain-review owner exceptions | 28; a distinct 90-cell gate |
| Promoted fusion source identities | 44 reviewed |
| Fusion model-domain review | 90/90 cells; recommendation-only |
| Fusion named-specialist queue | 19 exact questions in 6 packages |
| Fusion empirical gaps | 9 open |
| Targeted S5 adjudication | 19/19 rows completed in this draft package |

## Issue #41 adjudication result

| Dimension | Count |
| --- | ---: |
| Software rows | 5 |
| Manufacturing rows | 4 |
| Fusion rows | 10 |
| Point selections | 12 |
| Range/disagreement forms | 7 |
| `selected_provisional` | 1 |
| `selected_provisional_pending_named_expert` | 11 |
| `preserved_range` | 6 |
| `preserved_disagreement` | 1 |
| `needs_better_evidence` | 0 |
| Medium confidence | 7 |
| Low confidence | 12 |

Seven rows remain without a point: sp-0011, sp-0012, sp-0013, sp-0014,
sp-0020, sp-0023, and sp-0030. The reasons are variable or unverified
independent boundaries, direct-consequence uncertainty, open fusion evidence
gaps, and—in licensing—the owner's explicit 0-2 disagreement. No midpoint was
manufactured.

## Expert and evidence gate

- Retain EXP-FUS-01 through EXP-FUS-06 and all 19 exact fusion questions.
- Add EXP-SW-01 for the five mature production-software S5 boundaries.
- Add EXP-MFG-01 for the four discrete-manufacturing S5 boundaries.
- All eight packages block canonical approval, not private use, staged WP2, or
  public-pilot display visibly labelled `EXPERT-CODED · DRAFT` with
  point/range, confidence, gaps, and review state visible.
- gap-01 through gap-09 remain open. Eleven S5 rows retain blank source IDs and
  explicit source gaps; reviewed fusion source identities keep their original
  maturity and use restrictions.

## Deliverables and validation

The package contains the 19-row adjudication CSV and workbook, the eight-row
human review plan, `S5_ADJUDICATION_NOTE.md`, focused validator and adversarial
tests, CI integration, and synchronized project-state, roadmap, status, task,
decision, brief, and README pointers.

The full local CI sequence passed on 2026-09-03: typecheck, lint, evidence and
design tests, production build, 72 Python validator tests, all package and
repository validators, and private-preview readiness. Readiness continues to
report 59 non-failing public-launch blockers in private-preview mode; this
package does not change or waive them. Draft-PR checks remain required.

## Protected state

The package must leave S1-S4 records, raw submissions, the 155-row audit, owner
decisions, fusion evidence and source-promotion records, the canonical source
register, merged domain review, production `data/profiles`, C/governance,
couplings, scenarios, forecasts, figures, public content, and UI unchanged.
Focused validation pins those protected objects. Zero profile rows are approved
or canonical. WP2 has not begun.

## Next order

1. Open the issue #41 draft PR against `main` and stop implementation.
2. Conduct one substantive PM review.
3. Make one bounded correction pass; recheck only P0/P1 blockers.
4. Merge when no P0/P1 blocker remains.
5. Begin WP2 proposed/staged profile construction in one batch. Do not insert
   another general pre-gate.
