# Targeted S5 adjudication — issue #41

Date: 2026-09-03
Baseline: `main` at PR #40 merge `e6edd06ee0e9c78214989d31c5647525b7c91cdd`, containing correction head `ee609a8dc2c587304b237d9ede9f7514b18ad55d`
Reviewer: Codex Desktop, `gpt-5.6-sol`, `xhigh` (Extra High)
Status: reviewed qualitative adjudication; **not an observation, production profile, score implementation, owner canonical approval, or named-human sign-off**

## Result

All **19/19** rows in the existing targeted S5 backlog were adjudicated. The
population remains exactly five software rows, four discrete-manufacturing
rows, and ten fusion rows. No S1-S4 value or recommendation was reopened.

| Adjudication outcome | Rows |
| --- | ---: |
| `selected_provisional` | 1 |
| `selected_provisional_pending_named_expert` | 11 |
| `preserved_range` | 6 |
| `preserved_disagreement` | 1 |
| `needs_better_evidence` | 0 |
| **Total** | **19** |

| Confidence | Rows |
| --- | ---: |
| `high` | 0 |
| `medium` | 7 |
| `low` | 12 |
| **Total** | **19** |

| Sector | Rows | Point form | Range/disagreement form |
| --- | ---: | ---: | ---: |
| Software engineering | 5 | 5 | 0 |
| Discrete manufacturing | 4 | 1 | 3 |
| Fusion, magnetic confinement | 10 | 6 | 4 |
| **Total** | **19** | **12** | **7** |

The 12 point-form rows are provisional qualitative selections. Seven rows do
not receive a point: six preserve a range and one preserves an explicit owner
disagreement. A production schema's future need for an integer was not used as
a reason to force closure.

## Decision rule

The adjudication applies the frozen owner-approved rule: count errors contained
in the scoped stage and reasonably foreseeable direct consequences of an
erroneous output escaping that stage, but stop at the next genuinely
independent assurance or control boundary. Remote cascades, later independent
failures, and repeated allocation of the same consequence are excluded.

Every row records:

- the assumed next independent boundary;
- its detection mechanism, authority, timing, and material correlated-failure
  concern;
- the bounded direct consequence before that boundary; and
- later consequences excluded from the row.

A different organizational label is not treated as independence. All
boundaries remain `assumed_not_verified`. A point was selected only where the
frozen scope, both submitted rationales, an owner disposition where present,
and the merged fusion review supplied a coherent bounded consequence. No two
values were averaged and no midpoint was manufactured as consensus.

## Point selections

| Profile | Stage | Point | Outcome | Confidence | Expert package |
| --- | --- | ---: | --- | --- | --- |
| sp-0001 | Requirements and architecture | 3 | `selected_provisional_pending_named_expert` | medium | EXP-SW-01 |
| sp-0002 | Implementation | 3 | `selected_provisional_pending_named_expert` | medium | EXP-SW-01 |
| sp-0003 | Verification and validation | 2 | `selected_provisional_pending_named_expert` | medium | EXP-SW-01 |
| sp-0004 | Deployment | 1 | `selected_provisional_pending_named_expert` | medium | EXP-SW-01 |
| sp-0005 | Operations and maintenance | 1 | `selected_provisional_pending_named_expert` | medium | EXP-SW-01 |
| sp-0008 | Supply and tooling | 2 | `selected_provisional_pending_named_expert` | medium | EXP-MFG-01 |
| sp-0015 | Simulation | 3 | `selected_provisional` | medium | none |
| sp-0024 | Tritium and fuel cycle | 1 | `selected_provisional_pending_named_expert` | low | EXP-FUS-03 |
| sp-0025 | Blankets | 1 | `selected_provisional_pending_named_expert` | low | EXP-FUS-03 |
| sp-0028 | Commissioning | 1 | `selected_provisional_pending_named_expert` | low | EXP-FUS-04 |
| sp-0029 | Reliability demonstration | 1 | `selected_provisional_pending_named_expert` | low | EXP-FUS-04 |
| sp-0031 | Grid integration | 1 | `selected_provisional_pending_named_expert` | low | EXP-FUS-06 |

`sp-0003` preserves the owner's preference for 2. The five fusion points
pending expert review preserve the applicable owner preferences and the merged
domain-review recommendation. `sp-0015=3` is the only point without a named
expert dependency: a wrong simulation output can misdirect immediate work
before independent model/use validation, while machine damage after a separate
experiment-release or engineering-verification failure is excluded.

## Preserved ranges and disagreement

| Profile | Stage | Preserved form | Outcome | Why unresolved |
| --- | --- | ---: | --- | --- |
| sp-0011 | Production and process control | 1-2 | `preserved_range` | The frozen scope permits both bounded process loss and low-tolerance equipment or safety consequences; independent inspection may share sensors or assumptions. |
| sp-0012 | Quality assurance | 1-2 | `preserved_range` | The record does not establish a uniform independent boundary after production QA or the representative defect-lot consequence. |
| sp-0013 | Maintenance and continuous improvement | 1-2 | `preserved_range` | Isolation and restart checks can contain errors, but their independence and the direct physical/safety consequence vary materially. |
| sp-0014 | Theory and system design | 2-3 | `preserved_range` | The merged fusion review finds no canonical evidence for the receiving design authority, boundary independence, or loss before review. |
| sp-0020 | Materials qualification | 0-1 | `preserved_range` | Irrecoverable exposure evidence and wrong acceptance inputs are plausible, but the actual independent acceptance boundary and completed qualification evidence are missing. |
| sp-0023 | Plasma-facing components | 1-2 | `preserved_range` | The record does not resolve test-article/equipment loss before acceptance without importing later plant operation. |
| sp-0030 | Licensing | 0-2 | `preserved_disagreement` | The owner and merged review require jurisdiction-specific regulatory and technical boundaries; selecting 1 would be midpoint manufacture. |

These seven rows are the workbook's “Unresolved” view. The eleven selected
points awaiting named review are separately resolved for provisional draft use
but remain blocked from canonical approval.

## Source gaps and evidence limits

The nine software/manufacturing rows retain blank `source_ids` and explicit
exact-stage source gaps, as permitted by the issue. No broad evidence search
was started. Fusion rows use the merged S5 cell's canonical IDs exactly where
available; those IDs remain source records with their existing maturity and
use restrictions, not observations that measure an S5 value.

Eleven adjudication rows have blank `source_ids`: all nine non-fusion rows,
`sp-0014`, and `sp-0029`. Every row records a source or boundary-evidence gap.
Programme targets, legal status, facility milestones, and proofs of concept
were not upgraded into observed qualification, reliability, licensing, or grid
outcomes.

## Human review dependencies

`three_anchor_human_review_plan_v1.csv` retains all six fusion packages and
their 19 exact cell questions, then adds the two requested non-fusion packages.
Package coordination does not merge away the cell-level fusion questions.

| Package | Sector/theme | Targeted S5 rows in this adjudication |
| --- | --- | --- |
| EXP-FUS-01 | Experiment campaigns, plasma control, machine protection | none; retained for sp-0016/S2 and sp-0018/S5 |
| EXP-FUS-02 | Materials qualification and plasma-facing components | sp-0020; sp-0023 |
| EXP-FUS-03 | Tritium and blankets | sp-0024; sp-0025 |
| EXP-FUS-04 | Commissioning and reliability | sp-0028; sp-0029 |
| EXP-FUS-05 | Licensing and regulation | sp-0030 |
| EXP-FUS-06 | Grid integration and protection | sp-0031 |
| EXP-SW-01 | Mature production-software architecture, verification, deployment, and SRE/operations | sp-0001-sp-0005 |
| EXP-MFG-01 | Discrete-manufacturing NPI, tooling, process control, quality, and maintenance | sp-0008; sp-0011-sp-0013 |

All eight packages are pursued **before canonical approval**, not before
private use, staged WP2 construction, or a public pilot visibly labelled
`EXPERT-CODED · DRAFT` with the point/range, confidence, gaps, and review status
visible. Thus `canonical_approval_blocker` and `draft_use_blocker` are separate
fields. No package grants approval by existing.

## Nine fusion empirical gaps remain open

| Gap | Profile | Missing outcome | Status |
| --- | --- | --- | --- |
| gap-01 | sp-0016 | experiment-selection cycle reduction | open |
| gap-02 | sp-0020 | completed accepted materials qualification | open |
| gap-03 | sp-0023 | combined-environment plasma-facing-component qualification | open |
| gap-04 | sp-0024 | integrated self-sufficient tritium/fuel cycle | open |
| gap-05 | sp-0025 | qualified integrated blanket | open |
| gap-06 | sp-0028 | AI-shortened nuclear/tritium commissioning | open |
| gap-07 | sp-0029 | commercial reliability/availability | open |
| gap-08 | sp-0030 | comparable completed fusion licensing | open |
| gap-09 | sp-0031 | observed fusion grid export | open |

`gap-01` is retained in EXP-FUS-01 even though `sp-0016` is not one of the ten
fusion rows in this S5 backlog. The nine-gap population is not reduced by the
adjudication.

## Protected-state confirmation and next gate

The seed and independent submissions, full rationales, 155-row comparison
audit, 23 reconciliation owner decisions/exceptions, 28 fusion-domain-review
owner exceptions, fusion evidence and source-promotion records, canonical
source register, and merged domain-review inputs remain protected. No
production `data/profiles/*.csv` row, C1-C8 value, governance row, coupling,
scenario, forecast, figure, UI, or public content claim was created or changed.
No profile is approved or canonical, and WP2 has not begun.

The next action after this package is one substantive PM review and one bounded
correction pass, followed by a P0/P1-only recheck and merge. Then WP2
proposed/staged profile construction begins in one batch; no new general
pre-gate is inserted.
