# M1.5 Method Gate Review

Date: 2026-08-27  
Reviewer: Codex (GPT-5.6), acting on the owner's request  
Source proposal: Fable, `claude-fable-5`  
Disposition: passed with amendments; Layer 2 may proceed to the WP2 pilot

This review records methodological decisions. It does not claim that Jinhua
personally supplied the probability judgments shown below, and it does not
approve any future stage-level coding before independent review.

## Checklist disposition

| Gate | Disposition | Review note |
| --- | --- | --- |
| S-dimension names and directions | Accepted | S1-S5 all run from structurally harder at 0 to easier at 4. Legacy `conversion drag` runs the other way and is explicitly excluded from the S schema. |
| S2/S3/S4 collinearity | Accepted | Harmless under non-aggregated bands; sums, averages, weights, and derived percentages remain prohibited. |
| Sixteen-sector band tree | Accepted with two row amendments | Cybersecurity moves 1→2 because low-consequence verification fails. Materials science moves 5→4 because decade-scale qualification is not universal to the sector. Basic science retains Band 3 with a heterogeneity flag. |
| Anchor stage granularity | Amended | Manufacturing gains physical production, commissioning, quality, and maintenance stages. Fusion gains subsystem, reliability, fuel-cycle, blanket, and grid stages. Names were normalized before coding. |
| Provenance | Accepted and tightened | Fable/model provenance is mandatory. Public review status is separated from coding status. Approval requires owner review and an identified independent review; disagreement is preserved. |
| Three signposts | Amended, inactive | Recommended conditional probabilities are 60%, 60%, and 75%. Definitions and clocks must be preregistered. They remain inactive until explicitly owned by the author. |
| Governance overlay | Accepted with schema addition | Anchor sectors only for v1. Added `assurance_functions` and provenance/evidence fields to match the prose and audit requirements. |
| Coupling graph | Accepted with two node refinements and a schema correction | Eight edges retained. Magnitude categories are separated from confidence in magnitude. Equal widths confirmed. |
| Scenario ledger | Accepted with provenance fields | Four scenarios confirmed. Premise audit, not scenario grading. Six-assumption cap retained. |
| Evidence and review fields | Accepted with harmonization | Eight evidence bases and five global review statuses match the design system. `coding_status` is separate. |
| Related-work list | Approved for verification | Verified primary/publisher rows are in `data/literature/related_work.csv`; unresolved or underspecified leads are staged. |
| Decision log | Accepted with amendments | The eleven proposed choices are recorded in `docs/DECISIONS.md`, with gate amendments made explicit. |

## Band changelog

| Sector | Proposed | Gate result | Reason |
| --- | ---: | ---: | --- |
| Cybersecurity | 1 | 2 | The decision tree requires verification to be both digital and low-consequence for Band 1. Cyber fails the second condition. |
| Materials science | 5 | 4 | Some deployment qualification is decade-scale, but synthesis and characterization frequently are not. Stage profiles must carry that difference. |
| Scientific research, basic | 3 | 3 | Accepted only as a flagged heterogeneous overview row; split if the pilot shows the label obscures critical paths. |

## Signpost review

The recommended probabilities are reviewer judgments conditional on the
amended resolution rules:

- Software before construction: 60%.
- Integration before harvest: 60%.
- Fusion analysis before qualification: 75%.

They are not active forecasts. Owner authorship, a frozen baseline, a clock
start, and invalidation conditions are still required.

## Revisit triggers

Reopen the gate only if the pilot exposes a direction error, a band-tree
contradiction, an aggregation leak, a fabricated-precision incident, or a need
to change the fixed stage crosswalk. Ordinary coder disagreement is handled in
the row-level changelog and does not reopen the method.

