# Structural Profiles coding rubric

This is a worksheet copy of the frozen rules in `docs/METHOD_PROFILES.md`. It does not amend the canonical method.

## Direction and authoritative definitions

Each S-dimension is an ordinal integer from 0 to 4. **Higher always means structurally easier for AI-driven improvement.**

| Code | Dimension | 4 means | 0 means |
| --- | --- | --- | --- |
| S1 | Information intensity of the scoped stage | Progress occurs primarily through information processing, analysis, design, inference, communication, or software | Progress occurs primarily through physical transformation, biological processes, construction, or accumulated operating time |
| S2 | Feedback speed | Learn-test-revise cycles occur in minutes to days | Cycles take years to decades |
| S3 | Experiment affordability and throughput | Attempts are near-free and parallel | Attempts are scarce and expensive |
| S4 | Physical flexibility | No construction, growth, curing, healing, or qualification floor dominates elapsed time | Clock time is dominated by physical floors |
| S5 | Intrinsic error tolerance | Errors are cheap, reversible, and low-externality | Errors are catastrophic or irreversible |

S1 describes how progress occurs within the scoped stage, not the stage's share of a wider schedule. `critical_path_role` records schedule role separately. Every S3 rationale must address both marginal cost per attempt and attainable parallel or serial throughput.

## Plain-language 0, 2, and 4 anchors

The endpoint language below restates the canonical definitions. The middle anchor is practical coding guidance for a mixed case; it is not a new canonical boundary or measured threshold.

| Dimension | 0 anchor | 2 guidance | 4 anchor |
| --- | --- | --- | --- |
| S1 | The scoped stage advances mainly through physical, biological, construction, or operating-time processes. | Information work and physical or time-bound work both materially shape progress; neither endpoint is a good description. | The scoped stage advances mainly through information processing, design, inference, communication, or software. |
| S2 | Ordinary learn-test-revise cycles take years to decades. | Cycles are meaningfully slower than minutes-to-days but do not ordinarily sit at the years-to-decades endpoint. | Ordinary learn-test-revise cycles take minutes to days. |
| S3 | Attempts are scarce and expensive, with constrained attainable throughput. | Attempts have material cost or throughput constraints but remain repeatable; explain cost and throughput separately. | Attempts are near-free and can run in parallel. |
| S4 | Physical floors dominate elapsed time. | A physical floor matters but does not fully describe elapsed time; explain what remains flexible. | No construction, growth, curing, healing, or qualification floor dominates elapsed time. |
| S5 | Errors are catastrophic or irreversible. | Errors have material consequences but are bounded or recoverable under the stated scope. | Errors are cheap, reversible, and low-externality. |

Scores 1 and 3 are allowed integers. Use them only as directional guidance between the stated anchors, document the rationale, and do not treat the distance between adjacent integers as measured or equal.

## Allowed values

- `coding_confidence`: `low`, `medium`, `high`.
- `evidence_basis`: `observed`, `model estimate`, `scenario`, `official target`, `company target`, `expert-coded`, `historical analogy`, `hypothesis`.
- `review_status`: `canonical`, `reviewed`, `staged`, `superseded`, `rejected`.
- `coding_status`: `proposed`, `reviewed`, `approved`, `disputed`.
- `submission_status`: `submitted`, `withdrawn`, `superseded`.
- `coder_type`: `human`, `model`.
- `lifecycle_phase`: `research`, `development`, `demonstration`, `qualification`, `scale_up`, `commercial_deployment`, `operations`, `diffusion`.
- `critical_path_role`: `serial`, `parallel`, `conditional`, `time_floor`, `not_assessed`.

The blank selected-profile rows use `expert-coded`, `proposed`, and `staged` only as workflow defaults. They do not show that coding, review, or approval occurred.

## Evidence and review rules

Evidence basis and review status are separate. Submission status does not approve a selected profile. A row cannot become `coding_status=approved` or `review_status=canonical` without sources and rationale, owner review, an identified independent review, underlying submitted review rows, and dimension-specific preservation of disagreement. Approved rows also require `coding_as_of`, `last_reviewed`, and specific `revisit_triggers`.

Consensus is not required. Do not force a midpoint. Unresolved disagreement produces `coding_status=disputed` and remains visible by dimension.

## Non-aggregation rule

S1–S5 are ordinal and may not be summed, averaged, weighted, or converted to percentages. S2, S3, and S4 may correlate; aggregation would double count and impose unjustified cardinal distance. Do not create a whole-sector S profile from stage rows. Sector views may later show stage distributions or draft qualitative bands without silently averaging stages.
