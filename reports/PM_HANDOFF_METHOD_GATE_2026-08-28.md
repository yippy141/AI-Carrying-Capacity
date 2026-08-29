# PM Handoff — Method Gate Approval and Executive Alterations

Date: 2026-08-28; final bounded synchronization 2026-08-29
Owner: Jinhua Yip
Proposal architect: Fable
Method review and integration: Codex (GPT-5.6)

## Executive disposition

Jinhua approved the sector-stage method, S1-S5, non-aggregation rule,
governance overlay, typed coupling graph, premise-audit scenario ledger, and
conservative contribution statement.

Owner-approved overview decisions:

- Cybersecurity: Band 2.
- `Materials science` becomes `Materials development and qualification`, Band
  4, with material/application/lifecycle variation explicit.
- `Media and entertainment` becomes `Digital media and entertainment`, Band 1.
- Basic Science remains Band 3 with a mandatory heterogeneity warning.
- Fusion retains leaf-stage detail under parent-stage groups.
- Provisional author signpost ranges are 55–65%, 55–70%, and 70–85%.

The signposts are owned but not active. Their measurement contracts remain
unfinished.

## What the project managers should do with this handoff

This is the frozen WP1.5 handoff, not a request for another full prompt-pack
review and not authorization to run WP2–WP6. Fable and the ChatGPT project
manager should:

1. follow the conflict rule in `docs/AUTHORITATIVE_DOCS.md`;
2. treat the method, gate, freshness protocol, and decisions as frozen for V1;
3. use the paste-ready blank worksheet task below as the next package;
4. log non-blocking prompt or product improvements in the backlog; and
5. reopen the method only for a trigger named in `docs/METHOD_GATE_REVIEW.md`.

They should resist two opposite errors: collapsing the added nuance back into
whole-sector labels, and responding to it by adding one giant score or an
unbounded taxonomy. The approved response is explicit scope, hierarchy,
pathway variants, and conditional assumptions.

## Executive alterations to Fable's package

| Alteration | Reason |
| --- | --- |
| Make the operational unit a scoped stage profile with a stable `profile_id` and separate scope fields | Materials and science vary by material, experimental method, application, qualification route, production scale, and commercialization phase. Concatenating those fields into identity would be brittle and invite duplicate records. |
| Add `parent_stage_id` | Fusion requires leaf detail but should not gain visual or analytic weight merely because it has more rows. |
| Add lifecycle and critical-path fields | A laboratory result cannot be treated as production scale, qualification, commercial deployment, or diffusion. |
| Add country `stage_applicability` and `binding_status` | Institutions can add jurisdictional stages, select among pathway variants, or change the binding stage. They may not silently erase technically required stages. |
| Add C8 ex ante commercialization conditions | Demand visibility, financing, and business models can accelerate or block conversion beyond R&D. Realized sales, adoption, and productivity stay outside C8 to avoid circular scoring. |
| Keep adaptation and distribution outside S/C aggregation | Public legitimacy, labor bargaining, social protection, ownership, culture, religion, and political structure matter, but they are sector-specific and time-varying and should not become essentialized country traits. |
| Add optional coupling `feedback_loop_id` | Positive and negative feedback loops matter outside R&D, but every component edge must remain separately typed, sourced, and reviewable. No loop score. |
| Allow scenario topology and economic-regime changes | AI/robot production may change the relationships among labor income, consumption, ownership, output, welfare, and political bargaining rather than only changing parameters inside today's economy. |
| Stage Citrini's 2028 crisis as a stress test | The scenario usefully specifies a displacement-demand-finance loop, but it is a speculative thought exercise whose substitution speed and policy assumptions need counterevidence. |
| Add living-evidence metadata and event-triggered review now; defer monitoring automation | Fast-moving evidence needs visible vintages and controlled update triggers, but continuous feeds would add noise before the pilot identifies which sources are load-bearing. Official releases enter evidence triage; anonymous “insider” claims remain leads only. |
| Separate stage taxonomy from coding judgments | Stable hierarchy and labels belong in `stages.csv`; S1-S5 judgments belong in scoped profile and review records. This prevents parent-stage drift. |
| Separate coder submissions from the selected profile | `profile_coding_reviews.csv` preserves each Fable, blind-model, owner, or domain submission and permits dimension-specific disagreement without averaging. |
| Add actor/subnational scope and key governance to `profile_id` | National labels conceal firm, institution, and jurisdiction variation; governance demands change by application, pathway, lifecycle, and jurisdiction. |
| Freeze anchor scopes and display boundaries | Coding needs a common pathway definition. Staged rows remain private; reviewed draft rows require `EXPERT-CODED · DRAFT`; canonical approved rows may render normally. |
| Converge after one review and one correction pass | A P0/P1-only recheck preserves rigor while preventing P2/P3 improvements from indefinitely blocking progress. |

### Cross-package freshness correction

Use `docs/FRESHNESS_PROTOCOL.md` in every revised package prompt.

- Every proposed coding must include `coding_as_of`; approved rows also require
  `last_reviewed` and concrete `revisit_triggers`.
- Governance, coupling, and scenario objects need their relevant period or
  update date plus revisit triggers.
- WP3 should expose an `as of` date and a visible stale/review-needed state for
  volatile analysis rather than imply live data.
- WP4 source inventory must record publication, access, and verification dates
  before synthesis.
- WP5 updates preserve previous scenario and coupling versions rather than
  silently rewriting them around new events.
- WP6 must recheck load-bearing sources for superseding releases or corrections.
- Do not build continuous monitoring, scheduled feeds, or a public freshness
  dashboard in WP2–WP6 unless the owner authorizes a later dedicated phase.

Anthropic's Model Hardware Standard preview is an event-triggered technical
lead. Initially route it to C2/C3, pathway integration, experimental
orchestration, throughput, governance/assurance, error recovery, and
tacit-knowledge hypotheses. It does not automatically change S1-S5 and is not
evidence of general autonomous science, manufacturing conversion, or
commercial scale. Social-media claims about unreleased models do not update
codings or probabilities.

## Corrections required before using the next prompts

### WP2 — data pilot

Do not paste the current WP2 prompt verbatim.

The prompt says to populate S-codings from “the author-reviewed pilot sheet I
attach.” No such sheet currently exists. Running it now would encourage Codex
to invent or infer author-approved values.

Recommended sequence:

1. Merge or otherwise bank the approved method gate.
2. Ask for a **blank worksheet package only**: stage taxonomy, scoped profile
   rows, coder-submission table, blank country-modifier schema, blank governance
   schema, and exception-report specification.
3. In a separate task, have Fable provide its seed coding with
   `proposed_by=fable, proposed_model=claude-fable-5`.
4. In another task that cannot see Fable's values, obtain a blind model coding.
   A second model is a rubric-reliability check; fusion still requires
   domain-informed human review before canonical approval.
5. Generate a dimension-specific exception report. Let Jinhua review only the
   flagged disagreements, extreme values, scope ambiguities, and missing
   evidence. Do not force a midpoint.
6. Only then run the WP2 schema/population prompt.

Prompt amendments for WP2:

- Use the amended schemas in `docs/METHOD_PROFILES.md`.
- Build and test empty schemas and validators before inserting proposed rows.
- Never invent `source_ids`; missing support remains missing.
- Do not mark any row canonical/approved during initial population.
- Include `parent_stage_id`, pathway, application, lifecycle, critical-path
  role, applicability, binding status, and ex ante C8.
- Include the stage taxonomy, separate coder-submission table, actor and
  subnational scope, and governance keyed to `profile_id`.
- Include `coding_as_of`, `last_reviewed`, and concrete `revisit_triggers`;
  preserve prior versions and changelog notes.
- Create full blank country and governance schemas in the worksheet; defer C1-C8
  population to a limited, evidence-backed WP2 mini-pilot.
- Keep adaptation and distribution out of S/C fields.

### WP3 — profiles page

Claude's current prompt asks a whole-sector diamond to reveal “the S-dimension
mini-profile.” That contradicts the approved method: S-codings exist at stage
level and may not be averaged into a sector profile.

Replace that interaction with:

- sector mark → stage distribution, range, or small-multiple list;
- anchor-sector drill-down → leaf stages grouped by parent stage;
- no mean S score, centroid, or synthetic sector radar/dot profile;
- country control → modifiers, stage applicability, and binding-path emphasis;
  intrinsic coding of shared stages remains fixed;
- signposts remain `designing` until measurement contracts are frozen, despite
  owner-supplied ranges.
- show the analysis vintage and a review-needed state; do not describe the page
  as live or continuously updated.
- limit staged rows to a local/private lab. A public pilot may show reviewed
  proposed/disputed rows only with `EXPERT-CODED · DRAFT`.

### WP4 — fusion research and module

The single Deep Research prompt is unusually broad. Keep one commission if
desired, but make its internal workflow sequential:

1. source inventory and rejected-source log;
2. structured extraction with exact quotations limited to what is necessary;
3. source and translation verification;
4. only then pathway comparison and synthesis;
5. only then scenario parameters.

Additional guardrails:

- Preserve magnetic-confinement pathway differences; do not make one universal
  DAG.
- Separate discovery, qualification, scale-up, commercial deployment, and fleet
  diffusion.
- Permit country-specific stage topology.
- Separate technical feasibility from cost, finance, market demand, licensing,
  reliability, supply chain, and grid integration.
- Treat positive feedback loops as hypotheses composed of individually
  supported edges.
- Record publication, access, and last-verification dates before any source can
  support synthesis; log superseded vintages rather than overwriting them.

### WP5 — couplings and scenarios

Retain the four anchor scenarios. Use no more than six shared premise
dimensions across the comparison. Add Citrini's 2028 crisis only as a staged
stress test mapped to those dimensions until its premises and counter-scenarios
are encoded.

Candidate regime-sensitive premises include the following. Select at most six
shared dimensions for v1 and keep the rest in the backlog:

- how quickly capability substitutes for versus complements human labor;
- whether robotics and physical deployment keep pace with cognitive automation;
- whether AI-sector output remains coupled to household income and demand;
- ownership of compute, models, robots, and resulting income;
- fiscal, monetary, welfare, labor, and industrial-policy response speed;
- credit, housing, asset-price, trade, and capital-flow transmission;
- public legitimacy, political structure, social protection, and sector-specific
  cultural or religious acceptance;
- whether the sector taxonomy or production DAG itself changes.

Do not attempt to encode all of these as national ordinal scores. They belong
as explicit, sourced assumptions and conditional pathways.

Every coupling edge and scenario premise must carry a period or update date,
specific revisit triggers, and version history. A new event may change a
premise or confidence without changing the scenario set or the method.

### WP6 — release

The phrase “activate only the three author-owned forecasts” needs correction.
The owner has supplied ranges, but the signposts are not yet testable. WP6 may
activate only those whose baseline, clock, deadline, resolution source,
confounders, and invalidation rules have been frozen and reviewed.

WP6 also requires a pre-release freshness audit: recheck load-bearing sources
against their publisher's latest vintage or correction, date the public
analysis, and fail the release if a material superseding source is unresolved.

## Recommended package order

1. Close and merge WP1.5 documentation.
2. Create the blank coding worksheet package; this is a missing mini-gate, not
   WP2 implementation.
3. Obtain separate Fable and blind-model submissions and generate the exception
   report.
4. Review exceptions, then run WP2 schemas, validators, proposed pilot
   population, and a limited country-modifier mini-pilot.
5. Build WP3 within the display-status rules; conduct domain review before
   canonical or strong public use.
6. Commission and gate the fusion evidence pack.
7. Run WP4.
8. Run WP5 with regime-changing premise support and the staged Citrini stress
   test.
9. Run WP6 only after deciding which modules and signposts are genuinely ready.

## Paste-ready next action — coding worksheet only

Use a new task for this step. Attach `docs/METHOD_PROFILES.md`,
`docs/METHOD_GATE_REVIEW.md`, `docs/FRESHNESS_PROTOCOL.md`, and
`docs/AUTHORITATIVE_DOCS.md`. Do not attach the design reference because this
is not UI work.

```text
Prepare the blank Structural Profiles pilot coding worksheet package.
Do not implement WP2, create application code, populate canonical CSVs, or
assign S/C values or approved/canonical status.

Use docs/METHOD_PROFILES.md as authoritative and follow
docs/FRESHNESS_PROTOCOL.md. Use the frozen mature-software,
discrete-manufacturing NPI/operations, and tokamak-to-pilot scopes.

Return blank, reviewable structures for:
1. stages.csv with the frozen parent/leaf taxonomy;
2. stage_profiles.csv with one scoped row for every anchor leaf stage;
3. profile_coding_reviews.csv for separate coder submissions;
4. country_stage_modifiers.csv with actor_scope and subnational_scope;
5. governance_overlay.csv keyed to profile_id; and
6. a machine-readable exception-report specification.

Include rubric text and allowed values, but leave S1-S5 and C1-C8 missing. Do
not place Fable and blind-model values in the same worksheet-builder task. Do
not invent source IDs or evidence, average stages, create sector scores, or
force coder consensus.

Return:
1. the blank worksheet package;
2. referential-integrity and allowed-value checks;
3. a short list of unresolved scope ambiguities; and
4. separate task instructions for Fable and blind-model submission, without
   executing either coding.

Stop after producing the worksheet package. Do not run WP2.
```

After the worksheet has been reviewed, update the WP2 prompt using the
corrections above and launch it as a separate task. WP3, WP4, and WP5 should
also remain separate sequential tasks, each receiving only the files relevant
to its gate.

## Paste-ready status notice to Fable and the ChatGPT project manager

```text
The WP1.5 method gate is frozen for V1. Follow docs/AUTHORITATIVE_DOCS.md;
docs/METHOD_PROFILES.md, docs/METHOD_GATE_REVIEW.md, and
docs/FRESHNESS_PROTOCOL.md control where earlier Fable or prompt-pack documents
conflict.

Do not run another full prompt-pack or architecture review. The next package is
the blank coding worksheet in this handoff. Record non-blocking concerns in the
backlog. Reopen the method only for a direction error, prohibited aggregation,
fabricated precision, invalid band rule, missing structural class, broken
hierarchy, or comparable P0/P1 failure.
```

## PM interpretation

The new nuances do not invalidate the framework. They clarify its boundary:
S1-S5 describe intrinsic stage structure; C-fields describe country-stage
conversion conditions; lifecycle and pathway fields preserve heterogeneity;
adaptation and distribution describe who can absorb change and who benefits;
scenario assumptions allow the economy and workflow topology themselves to
change.

The discipline is to add scope and topology, not more dimensions or one larger
score.
