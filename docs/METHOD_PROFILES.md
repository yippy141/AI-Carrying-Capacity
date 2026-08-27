# Structural Conversion Profiles

Status: M1.5 method gate passed with amendments on 2026-08-27. This document
is the canonical specification for the WP2 pilot. It supersedes the proposed
"Compressibility Spectrum" coordinate and any whole-sector numeric coding.

## Purpose and unit of analysis

Structural Conversion Profiles describe where accessible AI capability can
change a workflow and where a critical path remains constrained by physical,
biological, organizational, or assurance requirements.

The base unit is `sector.stage`, not a whole sector. Sector views may show
stage profiles or draft structural bands, but they may not silently average
stages. Intrinsic structure and country-specific conversion conditions are
separate data objects.

## Intrinsic stage dimensions

Each S-dimension is an ordinal integer from 0 to 4. Higher always means
structurally easier for AI-driven improvement.

| Code | Dimension | 4 means | 0 means |
| --- | --- | --- | --- |
| S1 | Information share of critical path | The stage is information work | The stage runs through matter |
| S2 | Feedback speed | Learn-test-revise cycles occur in minutes to days | Cycles take years to decades |
| S3 | Experiment affordability and throughput | Attempts are near-free and parallel | Attempts are scarce and expensive |
| S4 | Physical flexibility | No construction, growth, curing, healing, or qualification floor dominates elapsed time | Clock time is dominated by physical floors |
| S5 | Intrinsic error tolerance | Errors are cheap, reversible, and low-externality | Errors are catastrophic or irreversible |

No inversion remains in S1-S5. The legacy `conversion drag` figure uses the
opposite direction, where high means harder. That field is not an S-dimension
and must never be mapped to one without an explicit transform and label.

S2, S3, and S4 are expected to correlate. That reflects the world: slow
physical experiments are often expensive and time-locked. The correlation is
acceptable because the band method never sums or averages the dimensions. A
weighted average or composite of S-dimensions is prohibited because it would
both double count and impose unjustified cardinal distances.

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

## Data objects

### Intrinsic stage profiles

`data/profiles/stage_profiles.csv`:

```text
stage_id,sector,workflow,S1,S2,S3,S4,S5,rationale,source_ids,coding_range,coding_confidence,evidence_basis,proposed_by,proposed_model,reviewed_by,independent_review_by,approved_by,coding_status,review_status,version,changelog_note
```

S-fields are integers. `coding_range` preserves genuine coder disagreement.
`coding_confidence` is `low`, `medium`, or `high`.

### Country-stage conversion modifiers

`data/profiles/country_stage_modifiers.csv`:

```text
country,stage_id,C1_accessible_capability,C2_data_access_interoperability,C3_organizational_integration,C4_capital_and_asset_turnover,C5_workforce_integration_skill,C6_governance_procurement_fit,C7_physical_build_test_capacity,source_ids,evidence_basis,confidence,period,proposed_by,proposed_model,reviewed_by,independent_review_by,approved_by,coding_status,review_status,version,changelog_note
```

The country toggle changes modifiers only. Intrinsic S-marks do not move.

### Provenance and approval

The seed proposals originated with Fable and must retain
`proposed_by=fable` and `proposed_model=claude-fable-5`. The 2026-08-27 gate
review does not turn those proposals into observations.

A pilot row cannot become `coding_status=approved` or
`review_status=canonical` unless:

1. its sources and rationale are present;
2. Jinhua has reviewed the coding;
3. `independent_review_by` identifies an independent coder or named expert;
4. any disagreement is preserved in `coding_range` and `changelog_note`.

Consensus is not required. Unresolved disagreement produces
`coding_status=disputed`, not a forced midpoint.

## Public structural bands

Bands are categorical and unordered internally:

1. Digitally dominated
2. Digitally mediated
3. Mixed digital-physical
4. Physical or high-assurance with sub-decade cycles
5. Long-cycle physical or biological with decade-scale learning

Published decision tree:

1. Is more than two-thirds of the critical path information work?
2. If yes, is verification both digital and low-consequence? If yes, Band 1;
   otherwise Band 2.
3. If no, is the learn cycle set by biology, construction, or qualification
   that ordinarily exceeds roughly a decade? If yes, Band 5.
4. If no, is the binding constraint assurance or physical operation under
   high consequence? If yes, Band 4; otherwise Band 3.

The sixteen sector assignments remain `DRAFT` until the stage pilot tests the
tree. Two assignments were amended at the gate.

| Sector | Band | Gate disposition | Rationale |
| --- | ---: | --- | --- |
| Software and AI R&D | 1 | Accepted | Digital product and digital verification |
| Cybersecurity | 2 | Amended from 1 | Work and verification are digital, but verification is not low-consequence |
| Media and entertainment | 1 | Accepted | Dominant product and verification path are digital; physical production stages may be profiled separately |
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
| Materials science | 4 | Amended from 5 | Synthesis and characterization are physical and often high-assurance; decade-scale qualification is stage-specific, not universal |
| Fusion, magnetic confinement | 5 | Accepted | Construction, materials qualification, reliability, and licensing create decade-scale loops |

`scientific research, basic` is the one deliberate sector-level heterogeneity
exception. If the pilot shows that the label hides rather than reveals the
critical path, it must split into simulation-led and experiment-led rows.

## Three-anchor pilot stages

The following lists are fixed for the first coding pass. A later merge or split
requires a decision-log entry and a versioned crosswalk.

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

- `theory_and_system_design`
- `simulation`
- `experiment_selection`
- `diagnostics`
- `plasma_control`
- `materials_discovery_and_screening`
- `materials_qualification`
- `magnets`
- `heating_and_current_drive`
- `plasma_facing_components`
- `tritium_and_fuel_cycle`
- `blankets`
- `component_fabrication`
- `construction`
- `commissioning`
- `reliability_demonstration`
- `licensing`
- `grid_integration`

The fusion list distinguishes information-rich research stages from plant
subsystems and time floors. `fleet_scale_up` is an outcome/deployment phase,
not part of the first-plant critical-path profile.

## Signpost drafts

These signposts remain inactive pending explicit author ownership. Probabilities
below are Codex reviewer judgments, not Jinhua's personal forecasts.

| Signpost | Gate action | Recommended conditional probability | Required amendment before activation |
| --- | --- | ---: | --- |
| Software before construction | Amend | 60% | Freeze the METR vintage and inference-cost basket; start the eight-quarter clock only when both conditions resolve; define the BLS trend-break model and recession invalidation rule |
| Integration before harvest | Amend | 60% | Choose one repeatable intensive-use instrument; preserve ECB and Eurostat definitions separately; pre-register the EU KLEMS sector mapping and trend-break test |
| Fusion: analysis before qualification | Amend | 75% | Define accumulation as at least three attributable facility-linked demonstrations across at least two named facilities and two listed functions; define what counts as attributable schedule shortening |

No row becomes `watching` or `active` until the owner records a probability,
baseline, clock start, deadline, resolution source, and invalidation conditions.

## Governance overlay

V1 is limited to the three anchor sectors. The overlay is separate from S and C
fields and is never treated as generic friction.

`data/profiles/governance_overlay.csv`:

```text
stage_id,geographic_scope,benefit_conversion_path,hazard_conversion_path,assurance_burden,assurance_functions,auditability,reversibility,externality_scale,security_sensitivity,concentration_of_control,governance_latency,rationale,source_ids,evidence_basis,confidence,period,proposed_by,proposed_model,reviewed_by,independent_review_by,approved_by,coding_status,review_status,version,changelog_note
```

`assurance_functions` explicitly records one or more of `error_detection`,
`trust_production`, `delay`, and `experimentation_barrier`. This field was added
because the draft prose required functional coding but the draft schema did not.

## Typed coupling graph

Allowed node types are `resource`, `infrastructure`, `capability`,
`technology`, `sector_process`, `institution`, `intermediate_output`, and
`final_outcome`.

Edge schema:

```text
edge_id,source_node,target_node,mechanism_type,sign,effect_magnitude,magnitude_confidence,evidence_strength,latency_class,geographic_scope,boundary_conditions,source_ids,review_status,version,changelog_note
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

## Scenario assumption ledger

The four v1 scenarios are confirmed:

- `ai2027`
- `ai2040_plan_a`
- `ai_normal_technology`
- `finf_baseline`

The ledger audits premises; it does not grade a scenario within its own
ontology. V1 is capped at six assumptions.

`data/scenarios/assumption_ledger.csv`:

```text
scenario_id,assumption_id,assumption,affected_stage,affected_sector,physical_dependency,institutional_dependency,evidence_status,sensitivity,signpost_id,resolution_source,source_ids,proposed_by,proposed_model,review_status,version,last_updated,changelog_note
```

`sensitivity` is categorical: `low`, `medium`, `high`, or `unknown`.

## Validation requirements for WP2

Validators must reject:

- decimals in S or C fields;
- summed, averaged, or percentage-transformed S-dimensions;
- approved codings without sources, model provenance, owner review, and an
  identified independent review;
- band rows without rationales;
- numeric coupling magnitudes or unequal edge widths;
- hypothesis-grade public content without its evidence chip;
- composed paths beyond second order;
- the placeholder compressibility percentages `80%`, `40%`, or `15%`.

