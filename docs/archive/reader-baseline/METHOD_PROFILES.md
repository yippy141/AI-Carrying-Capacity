# Structural Conversion Profiles

Status: owner-approved with executive amendments on 2026-08-28 and final
bounded synchronization on 2026-08-29, plus the bounded S5 clarification on
2026-08-31. This document is the canonical specification for the WP2 pilot
under `docs/AUTHORITATIVE_DOCS.md`. It supersedes the proposed
"Compressibility Spectrum" coordinate and any whole-sector numeric coding.

## Purpose and unit of analysis

Structural Conversion Profiles describe where accessible AI capability can
change a workflow and where a critical path remains constrained by physical,
biological, commercial, organizational, or assurance requirements.

The base record is a scoped stage profile, not a whole sector. Each record has
a stable `profile_id` and carries separate `sector`, `pathway_id`, `stage_id`,
`application_context`, and `lifecycle_phase` fields. Do not concatenate those
fields into a brittle identifier. The shorthand `sector.stage` is acceptable
only when the omitted scope is explicit and unambiguous. Materials, science,
and other heterogeneous fields may require different records by material,
experiment, application, qualification regime, or route to scale.

Sector views may show stage distributions or draft structural bands, but they
may not silently average stages. Intrinsic structure, country-specific
conversion conditions, adaptation and distribution, and scenario assumptions
remain separate data objects.

## Intrinsic stage dimensions

Each S-dimension is an ordinal integer from 0 to 4. Higher always means
structurally easier for AI-driven improvement.

| Code | Dimension | 4 means | 0 means |
| --- | --- | --- | --- |
| S1 | Information intensity of the scoped stage | Progress occurs primarily through information processing, analysis, design, inference, communication, or software | Progress occurs primarily through physical transformation, biological processes, construction, or accumulated operating time |
| S2 | Feedback speed | Learn-test-revise cycles occur in minutes to days | Cycles take years to decades |
| S3 | Experiment affordability and throughput | Attempts are near-free and parallel | Attempts are scarce and expensive |
| S4 | Physical flexibility | No construction, growth, curing, healing, or qualification floor dominates elapsed time | Clock time is dominated by physical floors |
| S5 | Intrinsic error tolerance | Errors are cheap, reversible, and low-externality | Errors are catastrophic or irreversible |

No inversion remains in S1-S5. The legacy `conversion drag` figure uses the
opposite direction, where high means harder. That field is not an S-dimension
and must never be mapped to one without an explicit transform and label.

S1 describes how progress occurs within the scoped stage. It does not estimate
the stage's share of a wider project schedule. `critical_path_role` separately
records whether the stage is serial, parallel, conditional, a time floor, or
not yet assessed in the stated pathway.

S2, S3, and S4 are expected to correlate. That reflects the world: slow
physical experiments are often expensive and time-locked. The correlation is
acceptable because the band method never sums or averages the dimensions. A
weighted average or composite of S-dimensions is prohibited because it would
both double count and impose unjustified cardinal distances.

S5 includes the direct, reasonably foreseeable consequences of an erroneous
stage output within the frozen pathway and application, up to the next
independent assurance or control boundary. It excludes remote harms that
require a separate downstream failure and excludes jurisdiction-specific
assurance strength or latency, which belong in C6 or the governance overlay.

This is a bounded clarification of the accepted S5 definition, not a reopening
of the M1.5 method gate. It preserves the frozen stage, pathway, application,
and lifecycle scope; it does not import remote downstream harms or silently
recode either submitted review.

Every S3 rationale must address both marginal cost per attempt and attainable
parallel or serial throughput. These can diverge: an expensive experiment may
be highly parallelizable, while a cheap test may queue behind one scarce
facility. When the two considerations imply different codings, preserve the
coder disagreement, lower confidence, and explain the divergence. Do not add a
sixth intrinsic dimension or force the two considerations into false
agreement.

## Evidence and review contracts

Evidence basis and review status are orthogonal.

Allowed `evidence_basis` values are:

- `observed`
- `model estimate`
- `scenario`
- `official target`
- `company target`
- `expert-coded`
- `historical analogy`
- `hypothesis`

Allowed global `review_status` values are:

- `canonical`
- `reviewed`
- `staged`
- `superseded`
- `rejected`

Expert codings also carry a separate `coding_status`: `proposed`, `reviewed`,
`approved`, or `disputed`. This avoids overloading the public rendering gate
with coder-workflow semantics. A row can be `evidence_basis=expert-coded`,
`coding_status=proposed`, and `review_status=staged` without contradiction.

Display eligibility is explicit:

- `review_status=staged` is limited to local or private-lab routes;
- `review_status=reviewed` with `coding_status=proposed` or `disputed` may
  appear in a public pilot only with the visible label
  `EXPERT-CODED · DRAFT`; and
- `review_status=canonical` with `coding_status=approved` may render without
  the draft qualifier, while retaining its evidence vintage and rationale.

## Data objects

### Stage taxonomy

`data/profiles/stages.csv` defines hierarchy and labels without storing any
S/C judgment:

```text
stage_id,parent_stage_id,sector,label,description,display_order,leaf_status,version
```

`stage_id` is stable. `parent_stage_id` is `not_applicable` for a root stage
and otherwise must resolve to another row in this table. `leaf_status` is
`leaf` or `parent`. A profile references a stage from this taxonomy. Where
`parent_stage_id` is denormalized into a profile export, validators must require
an exact match with `stages.csv`.

### Intrinsic stage profiles

`data/profiles/stage_profiles.csv`:

```text
profile_id,stage_id,parent_stage_id,sector,workflow,pathway_id,application_context,lifecycle_phase,critical_path_role,S1,S2,S3,S4,S5,rationale,source_ids,coding_confidence,disagreement_summary,selected_review_ids,evidence_basis,coding_as_of,last_reviewed,revisit_triggers,proposed_by,proposed_model,reviewed_by,independent_review_by,approved_by,coding_status,review_status,version,changelog_note
```

S-fields are integers. `coding_confidence` is `low`, `medium`, or `high`.
`disagreement_summary` describes unresolved, dimension-specific differences;
it does not collapse them into one range. `selected_review_ids` identifies the
submission or submissions used in the current profile disposition.

`lifecycle_phase` is one of `research`, `development`, `demonstration`,
`qualification`, `scale_up`, `commercial_deployment`, `operations`, or
`diffusion`. `critical_path_role` is `serial`, `parallel`, `conditional`,
`time_floor`, or `not_assessed`. These fields prevent a laboratory result from
being treated as evidence of scalable production or commercial conversion.

### Coding submissions

`data/profiles/profile_coding_reviews.csv` preserves each coder's actual
submission separately from the selected profile row:

```text
review_id,profile_id,coder_type,coder_role,coder_name,coder_model,S1,S2,S3,S4,S5,rationale,source_ids,coding_as_of,submitted_at,submission_status,notes
```

`coder_type` is `human` or `model`. A human submission identifies the person
or documented reviewer role in `coder_name`; a model submission identifies the
provider/model in `coder_model`. The pilot seed submission retains
`coder_role=seed_proposer`, `coder_name=Claude Code`, and
`coder_model=claude-opus-5`. Fable is credited as framework architect, not as
the row-level coder.

`submission_status` is `submitted`, `withdrawn`, or `superseded`; it describes
the submission record and does not grant approval to the selected profile.

Per-dimension minima, maxima, exact agreement, and disagreement flags are
computed from this table. They are not stored as one `coding_range` field and
coders are never averaged into a midpoint. The selected S1-S5 values in
`stage_profiles.csv` remain proposed, reviewed, approved, or disputed according
to the documented disposition.

### Country-stage conversion modifiers

`data/profiles/country_stage_modifiers.csv`:

```text
country,subnational_scope,actor_scope,profile_id,pathway_id,stage_applicability,binding_status,C1_accessible_capability,C2_data_access_interoperability,C3_organizational_integration,C4_capital_and_asset_turnover,C5_workforce_integration_skill,C6_governance_procurement_fit,C7_physical_build_test_capacity,C8_ex_ante_commercialization_conditions,source_ids,evidence_basis,confidence,period,coding_as_of,last_reviewed,revisit_triggers,proposed_by,proposed_model,reviewed_by,independent_review_by,approved_by,coding_status,review_status,version,changelog_note
```

`country_stage_modifiers.pathway_id` must exactly equal the `pathway_id` of
the referenced `profile_id` in `stage_profiles.csv`. A mismatch must fail WP2
validation.

Higher C-codings mean a more enabling country-stage condition. C-fields remain
ordinal and may not be summed or averaged. C8 captures ex ante demand
visibility, business-model incentives, financing availability, and routes to
commercialization not already represented by C4 or C6. It may not use realized
sales, adoption, revenue, productivity, or other downstream outcomes; those
would make the profile circular. Endogenous demand feedback belongs in the
coupling or scenario layer.

`actor_scope` is one of `national_aggregate`, `large_firms`, `smes`,
`public_sector`, `research_institutions`, `households`,
`defense_establishment`, or `not_assessable`. `subnational_scope` names the
covered jurisdiction or uses `national`, `not_applicable`, or
`not_assessable`. Do not force a national average when the evidence describes
only one actor class, locality, province, state, or region.

Intrinsic S-marks do not move across countries. Country institutions may add
jurisdiction-specific regulatory or procurement stages, select among pathway
variants, make a stage conditional, or change which stage is binding. They may
not silently erase a technically required stage: a materially different
topology receives a distinct `pathway_id`. `stage_applicability` is `present`,
`absent`, `conditional`, or `not_assessable`; `binding_status` is `binding`,
`non_binding`, `contested`, or `not_assessable`. A country view may therefore
change the selected pathway or emphasis while preserving the intrinsic coding
of any shared profile.

### Provenance and approval

The row-level seed submission originated with Claude Code using Claude Opus 5
and retains that provenance in its coding review. The independent submission
originated with Codex using GPT-5.6 at extra-high reasoning effort. Fable
remains credited as framework architect; that credit is not row-level coding
provenance. The 2026-08-27 gate review and the owner reconciliation review do
not turn either submission into observations or canonical profile rows.

A pilot row cannot become `coding_status=approved` or
`review_status=canonical` unless:

1. its sources and rationale are present;
2. Jinhua has reviewed the coding;
3. `independent_review_by` identifies an independent coder or named expert;
4. underlying submissions exist in `profile_coding_reviews.csv`; and
5. any disagreement is preserved by dimension in the review rows,
   `disagreement_summary`, and `changelog_note`.

Consensus is not required. Unresolved disagreement produces
`coding_status=disputed`, not a forced midpoint.

Every proposed or reviewed row has an evidence vintage in `coding_as_of`.
Approved rows also require `last_reviewed` and specific `revisit_triggers`, such
as a new source vintage, independently verified deployment result, pathway
change, benchmark-method change, or material policy revision. See
`docs/FRESHNESS_PROTOCOL.md`. A new release triggers row-level review before it
can change an ordinal coding; it does not silently rewrite the row.

## Public structural bands

The five bands form an ordered structural sequence from predominantly digital
and rapidly testable work toward long-cycle physical or biological work. The
sequence is qualitative rather than a cardinal distance scale. Sectors or
stages within a band are not ranked:

1. Digitally dominated
2. Digitally mediated
3. Mixed digital-physical
4. Physical or high-assurance with sub-decade cycles
5. Long-cycle physical or biological with decade-scale learning

Published decision tree:

1. Is the binding critical path predominantly information work under the
   stated application and lifecycle scope?
2. If yes, is verification predominantly digital and low-consequence? If yes,
   Band 1; otherwise Band 2.
3. If no, is the learning cycle ordinarily long because of biology,
   construction, qualification, or required operating time? If yes, Band 5.
4. If no, is the binding constraint assurance or physical operation under
   high consequence? If yes, Band 4; otherwise Band 3.

`Predominantly` is an expert-coded V1 structural judgment, not a measured share
of activities or duration. A future pathway-specific critical-path model may
introduce measured duration weights, but no such weights are implied here.

The sixteen sector assignments remain `DRAFT` until the stage pilot tests the
tree. Two assignments were amended at the gate.

| Sector | Band | Gate disposition | Rationale |
| --- | ---: | --- | --- |
| Software and AI R&D | 1 | Accepted | Digital product and digital verification |
| Cybersecurity | 2 | Amended from 1 | Work and verification are digital, but verification is not low-consequence |
| Digital media and entertainment | 1 | Owner-approved rename | Dominant product and verification path are digital; physical production stages must be profiled separately |
| Finance and professional services | 2 | Accepted | Information work lands in regulated institutions and consequential decisions |
| Enterprise administration | 2 | Accepted | Information work is embedded in organizational process and control |
| Government bureaucracy | 2 | Accepted | Information work is constrained by procurement, statute, and due process |
| Education | 2 | Accepted | Cognitive work lands in credentialed institutions and human development |
| Scientific research, basic | 3 | Accepted with heterogeneity flag | Simulation-rich stages lean 2 and experimental stages lean 4; the sector band is only an overview |
| Logistics | 3 | Accepted | Digital optimization governs physical flows |
| Manufacturing, discrete | 3 | Accepted | Design and planning are digital while tooling and production are capital-bound |
| Healthcare delivery | 4 | Accepted | Physical care and consequential decisions impose assurance constraints |
| Construction | 4 | Accepted | Physical operation and site work set the clock |
| Energy, grid and generation | 4 | Accepted | Physical buildout, interconnection, reliability, and licensing bind |
| Pharma and biotech R&D | 5 | Accepted | Biological trials and qualification set long learning cycles |
| Materials development and qualification | 4 | Owner-approved rename and amendment from 5 | Synthesis, scale-up, application testing, and qualification are physical and often high-assurance; material and application pathways must remain explicit |
| Fusion, magnetic confinement | 5 | Accepted | Construction, materials qualification, reliability, and licensing create decade-scale loops |

`scientific research, basic` is the one deliberate sector-level heterogeneity
exception. If the pilot shows that the label hides rather than reveals the
critical path, it must split into simulation-led and experiment-led rows.

## Three-anchor pilot stages

The following lists are fixed for the first coding pass. A later merge or split
requires a decision-log entry and a versioned crosswalk.

The initial scopes are also frozen:

| Anchor | Frozen V1 scope | Pathway warning |
| --- | --- | --- |
| Software engineering | Mature production-software feature development, debugging, testing, integration, deployment, operations, and maintenance in an established codebase | Excludes greenfield prototyping, frontier algorithm research, and safety-critical software unless added as explicit pathway variants |
| Discrete manufacturing | New-product introduction and operations in medium-to-high-volume discrete manufacturing, from product and process engineering through tooling, commissioning, quality, production, maintenance, and iterative improvement | Does not stand for process industries, every factory scale, or every firm type; materially different routes receive distinct pathway IDs |
| Magnetic-confinement fusion | Tokamak research through component and subsystem development, materials qualification, facility build, commissioning, integrated demonstration, and pilot-plant readiness | Conventional large, compact high-field, and spherical tokamaks may require explicit variants; stellarators are a separate pathway and are not silently combined |

Use `mature_software_delivery_and_maintenance`,
`discrete_manufacturing_npi_and_operations`, and
`tokamak_research_to_pilot_plant_demonstration` as the initial `pathway_id`
values. Shared stages retain fixed intrinsic coding; a materially different
technical route receives a distinct pathway and profile.

### Software

- `requirements_and_architecture`
- `implementation`
- `verification_and_validation`
- `deployment`
- `operations_and_maintenance`

### Discrete manufacturing

- `product_design`
- `process_engineering`
- `supply_and_tooling`
- `retooling_and_commissioning`
- `production_planning_and_scheduling`
- `production_and_process_control`
- `quality_assurance`
- `maintenance_and_continuous_improvement`

### Fusion, magnetic confinement

| Parent stage | Leaf stage |
| --- | --- |
| `concept_and_design` | `theory_and_system_design` |
| `digital_experiment_loop` | `simulation` |
| `digital_experiment_loop` | `experiment_selection` |
| `plasma_operations` | `diagnostics` |
| `plasma_operations` | `plasma_control` |
| `materials` | `materials_discovery_and_screening` |
| `materials` | `materials_qualification` |
| `plant_subsystems` | `magnets` |
| `plant_subsystems` | `heating_and_current_drive` |
| `plant_subsystems` | `plasma_facing_components` |
| `plant_subsystems` | `tritium_and_fuel_cycle` |
| `plant_subsystems` | `blankets` |
| `build` | `component_fabrication` |
| `build` | `construction` |
| `demonstration_and_assurance` | `commissioning` |
| `demonstration_and_assurance` | `reliability_demonstration` |
| `approval_and_connection` | `licensing` |
| `approval_and_connection` | `grid_integration` |

The fusion list distinguishes information-rich research stages from plant
subsystems and time floors. `fleet_scale_up` is an outcome/deployment phase,
not part of the first-plant critical-path profile.

## Signpost drafts

These signposts are owner-approved provisionally on 2026-08-28. Their
probability ranges are author judgments. They remain pre-activation until the
measurement specifications in the final column are frozen.

| Signpost | Gate action | Owner probability range | Required amendment before activation |
| --- | --- | ---: | --- |
| Software before construction | Owner-approved with amendment | 55–65% | Freeze the METR vintage and inference-cost basket; start the eight-quarter clock only when both conditions resolve; define the BLS trend-break model and recession invalidation rule |
| Integration before harvest | Owner-approved with amendment | 55–70% | Choose one repeatable intensive-use instrument; preserve ECB and Eurostat definitions separately; pre-register the EU KLEMS sector mapping and trend-break test |
| Fusion: analysis before qualification | Owner-approved with amendment | 70–85% | Define accumulation as at least three attributable facility-linked demonstrations across at least two named facilities and two listed functions; define what counts as attributable schedule shortening |

No row becomes `watching` or `active` until its baseline, clock start, deadline,
resolution source, and invalidation conditions are frozen.

## Commercialization, feedback, adaptation, and distribution

R&D progress is not equivalent to production scale, commercial viability,
social adoption, or broadly distributed welfare. The profile method handles
these without expanding S1-S5:

- `application_context`, `lifecycle_phase`, and `critical_path_role` preserve
  differences among research, qualification, scaling, commercialization, and
  operation.
- C8 records ex ante commercialization conditions as a country-stage modifier;
  realized market outcomes and endogenous demand feedback remain outside it.
- Coupling edges may represent reinforcing or balancing feedback, but every
  edge retains its own evidence and no loop receives a synthetic score.
- Adaptation capacity and distribution quality remain separate outcome-facing
  layers. Public perception, labor bargaining, ownership, social protection,
  political institutions, and cultural or religious acceptance may be
  evidence-backed, sector-specific context; they are never essentialized into
  a timeless national trait or folded into an S/C average.

## Governance overlay

V1 is limited to the three anchor sectors. The overlay is separate from S and C
fields and is never treated as generic friction.

`data/profiles/governance_overlay.csv`:

```text
governance_id,profile_id,country_or_jurisdiction,subnational_scope,actor_scope,benefit_conversion_path,hazard_conversion_path,assurance_burden,assurance_functions,auditability,reversibility,externality_scale,security_sensitivity,concentration_of_control,governance_latency,rationale,source_ids,evidence_basis,confidence,period,last_reviewed,revisit_triggers,proposed_by,proposed_model,reviewed_by,independent_review_by,approved_by,coding_status,review_status,version,changelog_note
```

`profile_id` is the required analytic key because governance and assurance may
change with pathway, application, and lifecycle scope even when a leaf-stage
label is shared. Optional geographic and actor fields use `not_applicable` or
`not_assessable` rather than implying a national average.

`assurance_functions` explicitly records one or more of `error_detection`,
`trust_production`, `delay`, and `experimentation_barrier`. This field was added
because the draft prose required functional coding but the draft schema did not.

## Typed coupling graph

Allowed node types are `resource`, `infrastructure`, `capability`,
`technology`, `sector_process`, `institution`, `intermediate_output`, and
`final_outcome`.

Edge schema:

```text
edge_id,source_node,target_node,mechanism_type,sign,effect_magnitude,magnitude_confidence,evidence_strength,latency_class,geographic_scope,boundary_conditions,feedback_loop_id,source_ids,period,last_reviewed,revisit_triggers,review_status,version,changelog_note
```

`effect_magnitude` is categorical: `small`, `medium`, `large`, or `unknown`.
`magnitude_confidence` is `established`, `contested`, or `unknown`.
`evidence_strength` is `observed`, `historical_analogy`, or `hypothesis`.
These fields may not be collapsed. All v1 edge widths are equal.

The eight seed edges are accepted with two naming/evidence amendments:

| Source | Target | Evidence disposition |
| --- | --- | --- |
| `electricity_supply` | `compute_stock` | Observed, with interconnection and commissioning boundary conditions |
| `compute_stock` | `frontier_capability` | Observed association; algorithms, data, talent, and utilization remain boundary conditions |
| `frontier_capability` | `software_process` | Observed in bounded tasks; magnitude contested |
| `frontier_capability` | `research_process` | Observed in cases; magnitude unknown |
| `software_process` | `robotics_technology` | Partly observed; pace remains a hypothesis |
| `robotics_technology` | `manufacturing_process` | Early observed deployment; magnitude unknown |
| `manufacturing_scale_and_learning` | `energy_equipment_cost` | Historical analogy; renamed from the overbroad `manufacturing_process` source node |
| `advanced_manufacturing_capability` | `domestic_compute_hardware` | Hypothesis with observed export-control constraints; renamed and stripped of the draft's mixed evidence label |

Displayed paths stop at second order and show their assumption stack. There is
no flywheel score, snowball score, or third-order composed claim.

`feedback_loop_id` may group separately supported edges into a reinforcing or
balancing loop. A named loop does not establish that it is closed,
self-sustaining, or dominant; those remain hypotheses tested edge by edge.

## Scenario assumption ledger

The four v1 anchor scenarios are confirmed:

- `ai2027`
- `ai2040_plan_a`
- `ai_normal_technology`
- `finf_baseline`

The ledger audits premises; it does not grade a scenario within its own
ontology. V1 is capped at six shared premise dimensions across the comparison,
with one scenario-specific value or statement per dimension. This keeps the
four anchors comparable and avoids a 24-assumption matrix before beta.
Additional candidate stress tests may be staged and mapped to the same premise
dimensions without silently becoming anchors.

`data/scenarios/assumption_ledger.csv`:

```text
scenario_id,assumption_id,assumption_type,assumption,affected_stage,affected_sector,physical_dependency,institutional_dependency,economic_regime,topology_change,distribution_channel,adaptation_channel,evidence_status,sensitivity,signpost_id,resolution_source,source_ids,revisit_triggers,proposed_by,proposed_model,review_status,version,last_updated,changelog_note
```

`sensitivity` is categorical: `low`, `medium`, `high`, or `unknown`.

`assumption_type` may be `capability`, `infrastructure`, `institutional`,
`political_economy`, `distribution`, `legitimacy`, `cultural_acceptance`, or
`economic_regime`. `topology_change` records whether the assumption changes
the structure of the modeled economy or conversion pathway rather than only a
parameter within today's structure. This permits scenarios in which a partly
autonomous AI/robot production system decouples from human labor income,
consumption, ownership, or political bargaining.

`citrini_2028_gic` is a staged stress-test candidate, not a fifth anchor. Its
useful premises include rapid white-collar substitution, wage and demand
compression, reinvestment into AI, asset-price and credit transmission, and a
possible divergence between measured output and household welfare. These
premises must be audited independently; the scenario is not treated as a
forecast or empirical finding.

## Validation requirements for WP2

Validators must reject:

- profile rows whose `stage_id` is absent from `stages.csv`, or whose
  denormalized `parent_stage_id` conflicts with the taxonomy;
- decimals in S or C fields;
- summed, averaged, or percentage-transformed S-dimensions;
- C8 codings derived from realized adoption, sales, revenue, productivity, or
  other downstream outcomes;
- sector-level S profiles synthesized from stage codings;
- lifecycle or application claims missing their pathway scope;
- approved codings without sources, model provenance, owner review, and an
  identified independent review;
- approved codings without underlying submissions in
  `profile_coding_reviews.csv`;
- approved codings whose `selected_review_ids` do not resolve to submitted
  review rows for the same `profile_id`;
- approved codings without `coding_as_of`, `last_reviewed`, and concrete
  `revisit_triggers`;
- country modifiers without explicit `actor_scope` and `subnational_scope`, or
  rows that force `national_aggregate` from narrower evidence;
- country modifiers whose `pathway_id` does not exactly match the `pathway_id`
  of the referenced `profile_id` in `stage_profiles.csv`;
- governance rows without `governance_id` and `profile_id`;
- canonical governance, coupling, or scenario rows without their required
  period/update date and revisit triggers;
- staged rows rendered on public routes, or reviewed proposed/disputed rows
  rendered without `EXPERT-CODED · DRAFT`;
- band rows without rationales;
- numeric coupling magnitudes or unequal edge widths;
- a feedback-loop claim whose component edges are not individually represented;
- hypothesis-grade public content without its evidence chip;
- composed paths beyond second order;
- the placeholder compressibility percentages `80%`, `40%`, or `15%`.
