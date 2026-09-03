# Fusion domain review — issue #39

**AI-assisted technical review, not human expert sign-off.** All rows are
`reviewer_type=model_domain_synthesis`, `recommendation_basis=qualitative_coded`
and `approval_status=recommendation_only`. The model is not represented as a
fusion expert. This package does not replace named expertise or owner review.

## Gate, scope and provenance

GitHub confirmed PR #38 merged into `main` at `2026-08-31T18:10:39Z`, with
merge commit `a85267ce3a0c6ec598554e45b9bc4a82a74f9e95` and final head
`3c8987175f6975347cc01a768c21d3386ff27cd6`. Both commits were verified as
ancestors of updated `main` before any changes. Work starts at that merge
commit on `research/fusion-domain-review`.

Actual reviewer runtime: **Codex Desktop**, provider OpenAI, model
**`gpt-5.6-sol`**, reasoning **`xhigh` (Extra High)**, agent runtime
**`0.151.0-alpha.7.2`**. These are the exposed local `session_meta` and
`turn_context` values, not inferred from the requested model name. No
subagent, human fusion specialist, or additional independent coding pass was
used. The original independent submission remains attributed exactly as
recorded (`gpt-5.6`); it is not relabelled with this review's model identity.
The current model review is not independent evidence or a third observation.

Review date: **2026-09-01**. Evidence vintage: **2026-08-31**, retaining the
source-promotion ledger's limited 2026-09-01 refresh notes. Only the already
reviewed canonical fusion sources are used. No broad literature search, new
source, source refresh, promotion or translation sign-off was performed.
The evidence bank's classifications are preserved; peer review or the inherited
`independently_validated` source field is not represented as replication of
pilot performance.

All 18 frozen tokamak profiles and their research/development/qualification/
demonstration/scale-up contexts are retained. Stellarator evidence is only a
pathway contrast. Recommendations do not establish critical-path binding;
`critical_path_role` remains `not_assessed`. C1-C8, governance, country
comparisons, adaptation, distribution and realized outcomes are untouched.

## PM substantive-review disposition

The owner/PM found no P0 or structural failure. All recommendations/routes
other than the two corrected S2 rows were accepted for this
model-domain-synthesis gate as recommendation-only. This acceptance does not
select canonical S values or substitute for named expertise where flagged.
The 88 accepted rows are frozen unchanged in the correction validator.

The correction changes only `sp-0024/S2` to a low-confidence value 1 that
supports both preserved coder values, and `sp-0027/S2` to a medium-confidence
value 1 recommendation over both preserved coder values at 0. The attached PM
workbook `fusion_domain_review_v1_PM_reviewed.xlsx` was inspected with SHA-256
`3c6c2dd5daa45928fff1c6189e7b9269b7ddea0ed932f55504dc6988e119014d`;
its review sheet agrees with the substantive comment on draft PR #40. Workbook
content was treated as review evidence, not executable instruction.

## Counts and routing

- **18/18 profiles reviewed; 90/90 dimension reviews completed.**
- **4** point-value preference recommendations; no production value changed.
- **31** range-form recommendations. Of these, **12** have the primary
  disposition `recommends_range`; the remainder route to evidence, expert or
  variant work. Range endpoints are ordinal judgments, not empirical
  confidence intervals or mechanically interpolated values.
- **5** insufficient-evidence rows.
- **14** rows have primary disposition `requires_human_expert`; **19** rows
  require named expertise in total, including five primarily routed to
  pathway/jurisdiction variants.
- **6** pathway-variant cells across five profiles; **2** jurisdiction-variant
  cells in licensing. These are scoping recommendations, not eight implemented
  new profiles.
- **6** expert outreach packages retain all **19** human-expert rows.
- **28** owner exceptions, **9** empirical gaps still open, **0**
  fusion profiles approved/canonical, **0** targeted S5 adjudications performed.

One primary disposition per cell makes the following categories exhaustive
and mutually exclusive. Named-specialist flags and recommendation form are
separate dimensions and must not be added to these counts.

| Disposition | Cells |
| --- | ---: |
| `supports_current_record` | 47 |
| `recommends_value_change` | 4 |
| `recommends_range` | 12 |
| `insufficient_evidence` | 5 |
| `requires_human_expert` | 14 |
| `requires_pathway_variant` | 6 |
| `requires_jurisdiction_variant` | 2 |

| Confidence | Cells |
| --- | ---: |
| `high` | 12 |
| `medium` | 28 |
| `low` | 50 |

Confidence concerns the bounded rubric interpretation, not the probability of
fusion success or evidence that a missing outcome has occurred. A high-confidence
scope judgment can coexist with a missing empirical result. Low-confidence
values/ranges are explicit candidates for later adjudication, including
carry-forward intervals where no empirical calibration is possible. They do
not assert that other ordinal values have been empirically ruled out.

`supports_current_record` supports agreement or an owner preference without
claiming the source measures the number. `recommends_value_change` identifies
the four single-value preferences that reject a submitted mark: simulation
S5 at **3** rather than seed 4; materials qualification S1 at **0** rather than
seed 1; component fabrication S1 at **0** rather than seed 1; and construction
S2 at **1** rather than both submitted 0s. The first three match the preserved
independent value; the fourth follows the corrected ordinary-loop definition.
No coder is preferred globally. Range routes retain uncertainty; stronger
expert/variant/evidence routes take precedence.

The owner-facing view includes only named-expert requirements, variant
questions, these four point preferences, or still-unresolved owner
instructions. Routine agreement, ordinary one-point ranges and systematic
blank source IDs alone do not create an owner exception. The source IDs added
to this review are separate from the blank original submission source fields.

## Ten consequential technical findings

1. **Keep information work inside its frozen stage.** Theory/design and
   simulation support S1/S4=4; experiment selection supports S1/S4=4 under the
   owner-approved exclusion of physical execution. Licensing supports S1/S4=4
   as evidence review. Downstream hardware and the production of regulatory
   evidence do not become physical work in these stages. These are scope-based
   judgments, not measured acceleration claims.

2. **Fast inference is not ordinary learning feedback.** TCV/HL-3 live
   controllers and DIII-D/KSTAR experiments establish bounded device results,
   not controller-development cadence or an AI-shortened selection campaign.
   Preserve owner plasma-control S1=2/S2=2. Experiment-selection S2 remains a
   1-2 expert question while owner 1 is preserved. Diagnostic warning times
   and sampling rates likewise do not measure prepare-measure-revise cycles.
   Sources: `fusion-src-007`, `017`, `018`, `019`, `008`, `021` (all prefixed
   `fusion-src-`). [TCV](https://doi.org/10.1038/s41586-021-04301-9),
   [HL-3](https://doi.org/10.1038/s42005-025-02302-y).

3. **Simulation speedups have a narrow denominator.** HEAT-ML concerns a
   geometry-specific SPARC calculation, not an entire engineering workflow or
   PFC qualification. Training, reference simulations and checking still affect
   S2/S3. Simulation S5=3 is a recommendation under the bounded escaped-output
   rule: immediate misdirection counts only until independent model/use
   validation. [fusion-src-023](https://www.pppl.gov/news/2025/finding-shadows-fusion-system-faster-ai).

4. **IFMIF-DONES supports a planned time floor, not completed acceptance.**
   The sources describe roughly 2.5-3 full-power-year irradiation targets with
   material-, volume- and damage-specific conditions, followed by examination.
   This supports provisional materials-qualification S2/S4=0. It does not close
   the accepted-dataset gap or prove the same spectrum/transmutation match for
   Eurofer, tungsten and copper. S3 remains 0-1 with a material/pathway question.
   S1=0 is recommended because the endpoint means primarily, not exclusively,
   physical progress. [fusion-src-045](https://doi.org/10.1088/1741-4326/add172),
   [fusion-src-046](https://conferences.iaea.org/event/406/contributions/37622/).

5. **PFC representativeness remains unresolved.** MPEX plans describe plasma
   exposure, including already neutron-irradiated specimens; MPEX does not
   generate a fusion-spectrum neutron field. Separate thermal, irradiation and
   model results do not prove combined neutron/heat-flux/cycling/erosion/
   maintainability performance. PFC S2/S3/S4 low ranges remain conditional on
   the actual development endpoint, without silently importing all later
   qualification into development. [fusion-src-026](https://mpex.ornl.gov/murf-2026/).

6. **Fuel cycle and blankets need process/concept boundaries.** Preserve
   owner fuel-cycle S3=1 and S5=1 as candidates; repeatable modelling/surrogate
   work coexists with scarce tritium tests. Fuel-cycle S2=1 now supports both
   coders: the ordinary loop is a representative tritium-capable subsystem
   revision inside pre-integration development, not the still-missing later
   self-sufficient integrated outcome. Gap-04 remains fully open, and 1 is not
   an observed duration. Remove authorization and booking waits from S4.
   Retain owner blanket S2=0, while recommending 0-1 pending a definition of
   the decisive development experiment. Future TBM testing is neither
   self-sufficient fuel-cycle operation nor qualified integrated blanket
   performance. [fusion-src-038](https://www.iter.org/machine/supporting-systems/tritium-breeding),
   [fusion-src-028](https://www.energy.gov/documents/fusion-science-and-technology-roadmap).

7. **Physical endpoints do not require zero information work or zero local
   repetition.** Component-fabrication S1=0 is preferred over seed 1.
   Construction supports S1/S3/S4=0, but the seed's assertion of absent
   parallelism is too absolute: work packages can overlap and modules can
   repeat. Construction S2=1 uses a repeatable major assembly/work-package
   loop—assemble, fit, inspect, diagnose, revise procedures/tooling, and carry
   lessons into the next comparable package—rather than total facility build
   duration. PM external cross-checking found official ITER cycle records in
   the months-to-year-plus range, but those pages are not canonical records in
   this bank and are not added to `source_ids`. Refresh the empirical
   calibration if a later source-banking task adds those official cycle
   records. No purported component prices or annual test rates from the
   unsupported submission rationales are promoted as findings.
   [fusion-src-014](https://doi.org/10.1016/j.supcon.2024.100137),
   [fusion-src-037](https://www.iter.org/node/20687/millions-data-points-one-successful-lift).

8. **Commissioning and reliability do different jobs.** Research first plasma
   and component startup do not establish AI-shortened nuclear/tritium
   commissioning. Preserve owner commissioning S3=0/S5=1 provisionally.
   Reliability S1/S4=0 reflects accumulated operation, but S2=0-1 needs an
   actual reliability claim and test protocol. Long pulses are not commercial
   availability. A correctly observed component failure is evidence, not
   automatically an error by the reliability stage. [fusion-src-033](https://www.jt60sa.org/wp/first-plasma-23-october/),
   [fusion-src-034](https://www.jt60sa.org/wp/op2-has-started/),
   [fusion-src-036](https://www.iter.org/project/assembly-overview).

9. **Licensing performance cannot be made jurisdiction-free.** Legal status
   and rulemaking stages are not completed licence reviews. The NRC comment
   interval is not S2 evidence. Keep S2/S3=0-1 as unadjudicated candidate ranges
   with jurisdiction questions; preserve the owner's S5=0-2 disagreement
   instead of manufacturing 1. A next independent operating authorization
   cannot be assumed identical across jurisdictions. PRC legal interpretation
   still needs qualified native-language regulatory review.
   [fusion-src-039](https://www.federalregister.gov/documents/2026/02/26/2026-03865/regulatory-framework-for-fusion-machines),
   [fusion-src-040](https://www.nrc.gov/materials/fusion/rulemaking-status),
   [fusion-src-004](https://www.caea.gov.cn/n6760338/n6760344/n10763762/n10763767/c10704020/content.html).

10. **Grid export remains unobserved in this evidence set.** There is no
    observed magnetic-confinement fusion grid-export case in the reviewed set.
    Cheap study iterations and a scarce energized connection are distinct S3
    attempts. Preserve owner S3/S4=0-1 and propose explicit new-build versus
    technically suitable reused-site variants. Physical installation and
    energization belong in S4; generic delivery, booking and regulatory queues
    do not. Owner S5=1 is conditional on real independent utility/plant
    protection. Company energy-gain targets do not supply grid outcomes.
    [fusion-src-031](https://www.cfs.energy/technology/).

## S5 discipline and limits

All 18 S5 reviews separately record the immediate consequence, next independent
assurance/control boundary, and excluded later consequences. **Every listed
boundary is an explicit analytical assumption, `assumed_not_verified`**; none
is claimed to be a validated pilot safety architecture. Several have material
named-specialist questions below. Lower-stakes research-stage assumptions are
recorded with revisit triggers rather than automatically creating 18 expert
exceptions. A change in actual independence can change the recommendation.

Do not credit a mere organizational label as independent protection. The next
review must check detection, authority, failure dependence and when the control
acts. Count harm before that control; exclude remote cascades requiring its
separate failure. Correctly discovered physical failures are information, not
automatically erroneous stage outputs. This package supplies technical inputs
to later adjudication only: the existing **19-row targeted S5 backlog** remains
byte-for-byte unchanged. It is a different population from this package's
coincidentally **19-row human-expert queue**, which includes non-S5 questions.

## Nine empirical gaps retained

No gap below is closed. Better interpretation or an identified canonical source
does not manufacture an absent empirical outcome. A bounded evidence set also
does not establish that no additional evidence exists anywhere.

| Gap ID | Profile | Missing outcome | Status |
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

## Pathway and jurisdiction questions

No variant is implemented, and shared intrinsic codings are not country-adjusted.
Six cells propose technical variants across five profiles; licensing adds two
jurisdiction-process questions. Stellarators remain separate, not pooled into
the frozen tokamak scope.

| Profile | Dimension | Type | Later scoping question |
| --- | --- | --- | --- |
| sp-0020 | S3 | pathway | Separate qualification variants by material, spectrum/transmutation match, target damage and accepted examination route; do not pool Eurofer with tungsten/copper. |
| sp-0021 | S2 | pathway | Separate HTS/LTS conductor and coil test-scale variants when the ordinary prototype learning loop differs; HH70 is not a generic high-field timing baseline. |
| sp-0022 | S2 | pathway | Distinguish RF-source/launcher and neutral-beam development loops where prototype and conditioning requirements differ. |
| sp-0025 | S4 | pathway | Separate blanket concept and coolant/breeder test routes if they require materially different exposure, conditioning or representative integrated tests. |
| sp-0030 | S2 | jurisdiction | Determine whether US, PRC and other pilot-licensing pathways require separate process stages; keep shared intrinsic scope fixed rather than country-adjusting S values. |
| sp-0030 | S3 | jurisdiction | Define formal-review attempts and throughput within each applicable licensing regime, separately from parallel application drafting. |
| sp-0031 | S3 | pathway | Distinguish a greenfield connection from technically adequate reused generation-site infrastructure; do not treat a single connection as unlimited study throughput. |
| sp-0031 | S4 | pathway | Specify new switchyard/connection works versus reused infrastructure before assigning a dominant physical floor; jurisdictional queues remain outside S4. |

## Exact named-human expertise queue

The following **19 cells** require the specified named expertise before
`coding_status=approved`, `review_status=canonical`, or any unqualified public
claim or value. Every queue row therefore has
`blocking_stage=canonical_approval` and
`draft_use_status=allowed_as_expert_coded_draft`. The questions do not block
staged WP2 construction, do not block private use, and do not block a clearly
labelled public pilot row rendered as **EXPERT-CODED · DRAFT** with its range,
confidence, evidence gaps, and review status visible. No staged construction
or public display is implemented in this correction pass.

All names remain `missing`; none has been signed off. This clarification does
not approve any cell or waive source, owner, independent-review, freshness,
disagreement, or evidence requirements. Specialists are asked to resolve
load-bearing interpretation or scope, not to invent the nine missing outcomes.
Source IDs and requested expertise are in the companion queue CSV and workbook.

The 19 cell-level questions remain separate but are clustered into six
coordinated outreach requests:

| Package | Theme | Cells | Purpose |
| --- | --- | --- | --- |
| `EXP-FUS-01` | Experiment campaigns, plasma control and machine protection | sp-0016/S2; sp-0018/S5 | Resolve experiment-selection cadence and the bounded machine-protection consequence boundary. |
| `EXP-FUS-02` | Materials qualification and plasma-facing components | sp-0020/S3; sp-0020/S5; sp-0023/S4; sp-0023/S5 | Resolve representative throughput, irreversible evidence loss, combined-environment floors, and PFC assurance boundaries. |
| `EXP-FUS-03` | Tritium and blankets | sp-0024/S4; sp-0024/S5; sp-0025/S2; sp-0025/S5 | Separate intrinsic process floors from access delays and define direct fuel-cycle/blanket consequences. |
| `EXP-FUS-04` | Commissioning and reliability | sp-0028/S5; sp-0029/S2; sp-0029/S5 | Define pilot commissioning protection boundaries and the reliability claim/test protocol. |
| `EXP-FUS-05` | Licensing and regulation | sp-0030/S2; sp-0030/S3; sp-0030/S5 | Define jurisdiction-specific review cycles, formal attempts, and the next genuinely independent authorization boundary. |
| `EXP-FUS-06` | Grid integration and protection | sp-0031/S3; sp-0031/S4; sp-0031/S5 | Resolve greenfield versus reused-site topology, physical connection floors, and the utility/plant protection boundary. |

PRC legal interpretation remains a specialist sub-question inside
`EXP-FUS-05`.

| Profile | Dimension | Exact question for specialist | Requested expertise |
| --- | --- | --- | --- |
| sp-0016 | S2 | For a representative pilot-relevant tokamak campaign, what is the ordinary selection-to-result-to-revision loop, and does the documented cadence support 1 or 2? | Named tokamak experimental programme or campaign scientist |
| sp-0018 | S5 | At the pilot-relevant stored-energy and disruption envelope, what damage can an erroneous control output cause before independently verified machine protection acts? | Named tokamak plasma-control and machine-protection engineer |
| sp-0020 | S3 | Which material and pilot load envelope can the planned IFMIF-DONES specimen matrix represent, and how do spectrum/transmutation mismatch and accepted examinations limit useful parallel throughput? | Named fusion irradiation/materials-qualification specialist |
| sp-0020 | S5 | Which losses from an invalid irradiation or examination programme are irreversible before independent component/material acceptance, and what qualification claims can escape that boundary? | Named fusion materials-qualification and assurance specialist |
| sp-0023 | S4 | Which neutron, heat-flux, thermal-cycling, erosion and maintainability exposures must occur inside the frozen PFC development stage, and can sequential tests represent their combined effects? | Named plasma-facing component and plasma-material interaction specialist |
| sp-0023 | S5 | What can an erroneous PFC development test or acceptance claim damage before the next independent acceptance/protection boundary, excluding failures discovered by a correctly conducted test? | Named PFC test/qualification assurance engineer |
| sp-0024 | S4 | For the intended fuel-cycle subsystem tests, which retention, permeation, equilibration or residence processes impose irreducible duration, separately from authorization and facility-access delays? | Named tritium-processing and fuel-cycle engineer |
| sp-0024 | S5 | What tritium inventory loss or release is reasonably foreseeable before independently verified secondary confinement and accountancy controls act in this development scope? | Named tritium confinement, accountancy and radiological-safety specialist |
| sp-0025 | S2 | For the specified blanket concept, does each decision-relevant development revision require integrated fusion-environment validation, or can representative subcomponent tests close an ordinary revision? | Named blanket systems and breeding-validation specialist |
| sp-0025 | S5 | For that blanket concept, which erroneous development outputs can cause direct chemical, radiological or equipment harm before independent test isolation and integration acceptance? | Named blanket engineering and test-safety specialist |
| sp-0028 | S5 | During pilot nuclear/tritium commissioning, what direct harm from an erroneous startup or interface check can occur before independently verified interlocks and readiness hold points act? | Named fusion commissioning and nuclear/tritium systems-safety engineer |
| sp-0029 | S2 | What specific pilot reliability or availability claim, exposure requirement and failure/repair criterion defines completion, and what ordinary learn-demonstrate-revise interval follows? | Named fusion reliability/availability and maintainability specialist |
| sp-0029 | S5 | Which errors in reliability-test conduct or inference can escape to cause harm before independent machine protection and readiness acceptance, distinct from component failures the test is meant to reveal? | Named reliability demonstration and operational-assurance specialist |
| sp-0030 | S2 | Which jurisdiction-specific application, review and response stages define the ordinary fusion pilot licensing loop, and is any shared 0-1 recommendation defensible without a completed comparable case? | Named fusion regulatory specialist for the applicable jurisdiction; qualified Chinese legal reviewer for PRC wording |
| sp-0030 | S3 | For that licensing regime, what counts as a formal attempt, what does it cost, and which parts of application preparation and substantive review can proceed in parallel? | Named fusion licensing practitioner with application and regulator-review experience |
| sp-0030 | S5 | What direct consequence can an erroneous fusion pilot licence or safety-case acceptance cause before the next genuinely independent operating authorization or technical control in that jurisdiction? | Named fusion regulatory/safety-case specialist; qualified native-language legal expertise where applicable |
| sp-0031 | S3 | For a concrete pilot site, which connection assets are reused or new, and what are the marginal cost and attainable repetition of studies versus energized integrated tests? | Named grid-interconnection and power-plant electrical engineer |
| sp-0031 | S4 | Which physical installation, connection and energization steps are unavoidable at that site, separately from equipment procurement queues, outage booking and regulatory waits? | Named grid connection/construction and commissioning engineer |
| sp-0031 | S5 | What direct equipment or network consequences can incorrect pilot protection or energization cause before independently coordinated utility and plant protection isolate the fault? | Named power-system protection and grid-integration safety engineer |

## Deliverable contract and protected inputs

The directory contains exactly the three required CSVs, one XLSX and this note.
The profile CSV has five structured JSON assessments per profile; the dimension
CSV has one row per profile/dimension and original seed/independent values,
full rationales, blank source IDs and owner decisions. Current low/high fields
are per-cell minima/maxima of the preserved submissions, never an average.
Source-assessment JSON records each canonical ID, evidence relation, banked
maturity, locator and the full unchanged promotion use restriction. Evidence
relation describes relevance to the bounded activity, not proof of the ordinal
recommendation; exact-stage legal status or a narrow benchmark still does not
measure a complete learning cycle.

The workbook's ten visible sheets are Overview, Profile review, Dimension
review, Load-bearing gaps, Variants, Owner exceptions, Human experts, Outreach
packages, Preserved record, and Sources. Filters and frozen rows/columns support review. The wide
detail and preserved-rationale sheets intentionally require horizontal
scrolling; the owner/expert views are the entry point. Derived workbook counts
and per-cell current ranges are formulas. No hidden sheets, rows or columns,
ordinal averages, hidden scores, macro code or external data links are permitted.

No S-value was written to canonical profile data. No WP2 implementation
occurred. No fusion profile is approved or canonical. The full canonical source
register, source-verification bank, source-promotion ledger, submissions,
comparison audit, owner decisions, existing S5 backlog, production data,
C1-C8, governance, UI, figures, scenarios and other sectors are unchanged.

`fusion-src-013` and `fusion-src-015` remain excluded and are not evidence for
any review row. Native-language/specialist use restrictions remain in every
source-assessment snapshot. No translated quotation is published as approved;
PRC legal interpretation and German W7-X metric wording retain specialist
restrictions. The STEP living page's failed-refresh restriction remains: this
review does not use its current target wording as load-bearing evidence.

Issue #39 explicitly extends the earlier source-promotion freeze only for its
five new outputs. The expected original digests are unchanged. The new validator
additionally pins the full promoted register, complete evidence bank including
the promotion ledger/note, worksheet/reconciliation inputs, canonical method
authorities and all existing data/UI/content trees. This is a documented
output exception, not a hash refresh to allow protected mutations. Scripts,
CI integration and the mandatory task/decision log updates are the only other
changes; no historical method authority is edited.

## Authoritative inputs read

All issue-named inputs were read/loaded before synthesis, with the following
current equivalent for item 19. The frozen worksheet stage descriptions and
0/2/4 guidance were also consulted; their earlier S5 ambiguity text is
superseded by the canonical owner clarification, not treated as authority.

1. `docs/AUTHORITATIVE_DOCS.md`
2. `docs/METHOD_PROFILES.md`
3. `docs/METHOD_GATE_REVIEW.md`
4. `docs/FRESHNESS_PROTOCOL.md`
5. `docs/DECISIONS.md`
6. `data/sources/source_register.csv`
7. `research/fusion-evidence/VERIFICATION_REPORT.md`
8. `research/fusion-evidence/source_inventory_v1.csv`
9. `research/fusion-evidence/claim_source_map_v1.csv`
10. `research/fusion-evidence/profile_evidence_coverage_v1.csv`
11. `research/fusion-evidence/rejected_and_deferred_sources_v1.csv`
12. `research/fusion-evidence/source_promotion_decisions_v1.csv`
13. `research/structural-profiles-pilot/reconciliation/seed_submission_v1.csv`
14. `research/structural-profiles-pilot/reconciliation/independent_submission_v1.csv`
15. `research/structural-profiles-pilot/reconciliation/comparison_audit_v1.csv`
16. `research/structural-profiles-pilot/reconciliation/owner_decisions_v1.csv`
17. `research/structural-profiles-pilot/reconciliation/fusion_domain_review_queue_v1.csv`
18. `research/structural-profiles-pilot/reconciliation/targeted_s5_adjudication_backlog_v1.csv`
19. `research/structural-profiles-pilot/reconciliation/fusion_domain_review_brief_v1.md`

The source-promotion note, repository agent brief, path locks, runbook and
current CI workflow were also checked. No pre-gate Spectrum proposal supplied
authority.

## Validation and next gate

Full local CI passed: dependency install; typecheck; lint; all eight evidence
tests; production build; all 64 Python tests, including 21 adversarial
domain-review tests; worksheet, reconciliation, source-promotion, fusion
evidence, domain-review, adoption-depth, repository, source-register and
indicator validators; and private-preview readiness. The existing 59 public
launch blockers remain unchanged and do not fail private-preview mode. Existing
Node module-type and Turbopack filesystem-trace warnings remain out of scope.

The workbook was rendered and visually checked across all ten sheets, with
additional checks of long rationales, source restrictions and provenance.
OOXML validation confirms complete CSV/table agreement, correct cached counts,
only explicitly allowed per-cell/count formulas, and no hidden worksheets or
ordinal averages/composites. Protected input digests match the PR #38 baseline.

The substantive PM review and this one bounded correction pass are complete.
Keep PR #40 draft and stop after pushing the correction. The separate targeted
S5 adjudication may proceed only after this review package merges; WP2 remains
unimplemented in this PR.
