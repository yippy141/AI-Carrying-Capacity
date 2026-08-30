# Fusion domain-review brief — v1

## Route and boundary

All 18 frozen magnetic-confinement fusion profiles remain queued for routine domain-informed review. This review is a post-reconciliation evidence and scope gate: it does not approve or canonicalize a profile, populate WP2, promote a source, or replace either model submission.

The review must preserve the original seed and independent S-values and rationales. Owner dispositions are review instructions, not canonical profile rows. S5-only work follows `clarify_S5_then_targeted_S5_adjudication`; S1-S4 are not reopened in that pass.

## Priority review profiles

These nine profiles receive the first domain-review slots because the owner review identifies load-bearing evidence, scope, assurance, or no-comparable-case questions.

| Profile | Stage | Lifecycle | Current route |
| --- | --- | --- | --- |
| `sp-0016` | Experiment selection | `research` | priority domain review |
| `sp-0018` | Plasma control | `development` | priority domain review |
| `sp-0020` | Materials qualification | `qualification` | priority domain review |
| `sp-0024` | Tritium and fuel cycle | `development` | priority domain review |
| `sp-0025` | Blankets | `development` | priority domain review |
| `sp-0028` | Commissioning | `demonstration` | priority domain review |
| `sp-0029` | Reliability demonstration | `demonstration` | priority domain review |
| `sp-0030` | Licensing | `qualification` | priority domain review |
| `sp-0031` | Grid integration | `demonstration` | priority domain review |

Priority topics are experiment selection, plasma control, materials qualification, tritium/fuel cycle, blankets, commissioning, reliability demonstration, licensing, and grid integration.

## Remaining routine review profiles

| Profile | Stage | Lifecycle | Current route |
| --- | --- | --- | --- |
| `sp-0014` | Theory and system design | `research` | routine domain review |
| `sp-0015` | Simulation | `research` | routine domain review |
| `sp-0017` | Diagnostics | `research` | routine domain review |
| `sp-0019` | Materials discovery and screening | `research` | routine domain review |
| `sp-0021` | Magnets | `development` | routine domain review |
| `sp-0022` | Heating and current drive | `development` | routine domain review |
| `sp-0023` | Plasma-facing components | `development` | routine domain review |
| `sp-0026` | Component fabrication | `scale_up` | routine domain review |
| `sp-0027` | Construction | `demonstration` | routine domain review |

## Evidence-gap routing

The companion `evidence_gap_backlog_v1.csv` keeps four states separate:

- evidence identified in the internal Fusion Test pack but not yet inventoried, verified, mapped, or banked;
- a canonical source ID is missing from the model submissions;
- a regulatory or fusion-domain expert is required; and
- no directly comparable observed case exists for the stated profile claim.

A single profile can carry more than one state. Blank source IDs remain missing. This PR does not convert PM evidence leads into source-register entries and does not infer a source ID from a URL or document title.

## Next gate

The next gate is source inventory and banking followed by named domain review. Targeted S5 adjudication can then use the clarified convention and the preserved 19-row audit trail. Until those steps are complete, no fusion profile is approved or canonical.
