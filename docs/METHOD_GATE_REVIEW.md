# M1.5 Method Gate Review

Date: 2026-08-27; owner approval recorded 2026-08-28; final bounded
synchronization recorded 2026-08-29
Reviewer: Codex (GPT-5.6), acting on the owner's request  
Source proposal: Fable, `claude-fable-5`  
Disposition: owner-approved with amendments; Layer 2 may proceed only after the
WP2 coding worksheet and independent-review plan exist

This review records methodological decisions. Jinhua approved the method and
owned the provisional probability ranges on 2026-08-28. It does not approve
any future stage-level coding as canonical before independent review.

## Checklist disposition

| Gate | Disposition | Review note |
| --- | --- | --- |
| S-dimension names and directions | Accepted and clarified | S1-S5 all run from structurally harder at 0 to easier at 4. S1 is stage information intensity, not the stage's share of a project schedule. Legacy `conversion drag` runs the other way and is explicitly excluded from the S schema. |
| S2/S3/S4 collinearity | Accepted and clarified | Harmless under non-aggregated bands; sums, averages, weights, and derived percentages remain prohibited. S3 rationales separately address marginal attempt cost and attainable throughput. |
| Sixteen-sector band tree | Accepted with two row amendments | Cybersecurity moves 1→2 because low-consequence verification fails. Materials science moves 5→4 because decade-scale qualification is not universal to the sector. Basic science retains Band 3 with a heterogeneity flag. The bands are ordered, but entries within them are not ranked; the tree uses qualitative `predominantly`, not an invented task share. |
| Anchor stage granularity | Amended and frozen | Manufacturing gains physical production, commissioning, quality, and maintenance stages. Fusion gains subsystem, reliability, fuel-cycle, blanket, and grid stages. A separate stage taxonomy supplies referential integrity, and the three pathway scopes are frozen before coding. |
| Provenance | Accepted and tightened | Fable/model provenance is mandatory. Coder submissions live separately from the selected profile row. Public review status is separated from coding status. Approval requires owner review and an identified independent review; disagreement is preserved by dimension. |
| Three signposts | Owner-approved, pre-activation | Author ranges are 55–65%, 55–70%, and 70–85%. Definitions and clocks must still be preregistered. |
| Governance overlay | Accepted with schema addition | Anchor sectors only for v1. Governance is keyed to scoped `profile_id`, with optional jurisdiction and actor scope. Added `assurance_functions` and provenance/evidence fields to match the prose and audit requirements. |
| Coupling graph | Accepted with two node refinements and a schema correction | Eight edges retained. Magnitude categories are separated from confidence in magnitude. Equal widths confirmed. |
| Scenario ledger | Accepted with provenance fields | Four scenarios confirmed. Premise audit, not scenario grading. Six-assumption cap retained. |
| Evidence and review fields | Accepted with harmonization | Eight evidence bases and five global review statuses match the design system. `coding_status` is separate. Staged rows remain private; reviewed draft codings require an explicit public-pilot label. |
| Related-work list | Approved for verification | Verified primary/publisher rows are in `data/literature/related_work.csv`; unresolved or underspecified leads are staged. |
| Decision log | Accepted with amendments | The eleven proposed choices are recorded in `docs/DECISIONS.md`, with gate amendments made explicit. |

## Band changelog

| Sector | Proposed | Gate result | Reason |
| --- | ---: | ---: | --- |
| Cybersecurity | 1 | 2 | The decision tree requires verification to be both digital and low-consequence for Band 1. Cyber fails the second condition. |
| Materials science | 5 | 4 | Some deployment qualification is decade-scale, but synthesis and characterization frequently are not. Stage profiles must carry that difference. |
| Scientific research, basic | 3 | 3 | Accepted only as a flagged heterogeneous overview row; split if the pilot shows the label obscures critical paths. |

## Signpost review

The owner-approved provisional ranges are conditional on the amended
resolution rules:

- Software before construction: 55–65%.
- Integration before harvest: 55–70%.
- Fusion analysis before qualification: 70–85%.

They are not active forecasts. A frozen baseline, clock start, resolution
source, and invalidation conditions are still required.

## Owner-directed executive clarifications

- Rename the Band 1 row to `Digital media and entertainment`.
- Rename the Band 4 row to `Materials development and qualification` and keep
  material, application, lifecycle, and scale-up pathways explicit.
- Add parent-stage grouping to the fusion leaves.
- Permit explicit pathway variants and jurisdiction-specific stages while
  keeping intrinsic codings of shared profiles fixed; never silently remove a
  technically required stage.
- Treat ex ante commercialization conditions as a separate C8 modifier; keep
  realized demand feedback, adaptation, and distribution outside the C fields.
- Let scenario premises change economic topology, including the coupling
  between AI/robot production, human labor income, demand, ownership, and
  political response.
- Stage Citrini Research's 2028 crisis as a premise-audit candidate rather than
  treating it as an anchor scenario or forecast.
- Keep the scenario comparison to six shared premise dimensions in v1, not six
  different assumptions for every scenario.
- Adopt dated codings and explicit revisit triggers now; defer automated
  monitoring until the three-anchor pilot identifies the load-bearing sources.
- Treat official model and standards releases as event-triggered evidence
  leads. Treat anonymous social-media “insider” claims as leads only, never as
  support for codings, signpost updates, or public claims.

## Final bounded synchronization

The 2026-08-29 synchronization closes WP1.5 method editing before the coding
worksheet:

- `docs/AUTHORITATIVE_DOCS.md` controls conflicts with earlier proposals.
- S1 is stage information intensity; `critical_path_role` remains separate.
- S3 rationales cover both marginal cost and attainable throughput.
- The band tree uses qualitative structural judgments, not unmeasured shares.
- `stages.csv` separates taxonomy from coding judgments.
- `profile_coding_reviews.csv` preserves each coder submission and generates
  dimension-specific disagreement; no midpoint or single range is forced.
- Country modifiers carry actor and subnational scope.
- Governance is keyed to `profile_id` rather than an ambiguous stage label.
- The initial software, manufacturing, and tokamak pathway scopes are frozen.
- Anthropic MHS is initially C2/C3, pathway, integration, and assurance
  evidence; it does not automatically recode S1-S5.
- One primary review and one correction pass are sufficient when no P0/P1
  blocker remains.

## Revisit triggers

Reopen the gate only if the pilot exposes a direction error, a band-tree
contradiction, an aggregation leak, a fabricated-precision incident, or a need
to change the stage hierarchy. A scenario that changes pathway or economic
topology is represented explicitly and does not silently invalidate the base
rubric. Ordinary coder disagreement is handled in the row-level changelog and
does not reopen the method. New evidence normally triggers a source, claim, or
row-level review. It reopens the method gate only if it exposes a direction
error, invalid band rule, aggregation leak, missing stage class, or comparable
structural failure. `docs/FRESHNESS_PROTOCOL.md` governs this triage.

After one primary review of a work package, make one correction pass. A second
check addresses only unresolved P0/P1 blockers. New P2/P3 preferences enter the
backlog and do not reopen the package or this gate.
