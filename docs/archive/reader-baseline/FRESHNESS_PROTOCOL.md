# Living Evidence and Freshness Protocol

Status: owner-directed operating rule, adopted 2026-08-28 and clarified
2026-08-29. This protocol governs research intake and future work-package
prompts. It does not authorize continuous monitoring, source promotion,
recoding, or publication by itself.

## Purpose

The Atlas cannot promise that every statement is current at every moment.
It can promise that every material claim or coding has a visible evidence
vintage, a review date, a reason to revisit it, and a controlled update path.

New releases should not silently rewrite the method. They first enter an
evidence-impact triage that asks whether they change a source record, an
empirical claim, a scoped stage coding, a coupling edge, a scenario premise,
or the method itself.

## Intake classes

| Class | Examples | Required treatment |
| --- | --- | --- |
| Scheduled empirical source | Official statistics, recurring surveys, benchmark releases | Recheck on the source's own release cycle and before public use. Preserve denominators and prior vintages. |
| Event-triggered technical source | Model card, standard, research preview, benchmark-method change, verified deployment result | Triage promptly while an affected package is active. Do not infer broad conversion from a bounded demonstration. |
| Event-triggered policy or market source | Law, regulation, export control, public program, financing or procurement change | Verify the operative text or primary record and identify effective date, jurisdiction, and affected stage. |
| Structural literature | Peer-reviewed theory, historical analogy, mature sector research | Revisit before a major method version or when credible contrary evidence appears; do not churn it for every news cycle. |
| Speculative lead | Anonymous social-media claim, unattributed insider statement, prediction-market discussion | Record only as `lead_only` if useful. It cannot support a coding, probability update, public claim, or method change until attributable evidence is available. |

## Required impact triage

For every potentially material new source, record:

1. what exactly is new, with publication date, access date, source owner, and
   whether the result is independently validated;
2. the affected sector, pathway, application, lifecycle phase, country, and
   time period;
3. which object may change: source metadata, claim, profile row, country
   modifier, governance row, coupling edge, scenario premise, signpost, or
   method;
4. whether the evidence changes the existence of a stage, the identity of a
   binding bottleneck, an ordinal coding, only its confidence, or nothing
   material; and
5. the smallest justified action: log only, metadata refresh, row-level
   review, scenario/signpost review, or method-gate reopening.

The method gate reopens only when evidence exposes a direction error, invalid
band rule, aggregation leak, missing stage class, or other structural failure.
Most releases should result in a dated source or row update, not a new method.

## Version and review requirements

- Public claims retain `last_reviewed`; sources retain `last_verified`.
- Structural-profile objects add `coding_as_of`, `last_reviewed`, and
  `revisit_triggers`. Country modifiers also retain their measurement `period`.
- Coupling and governance objects carry their relevant period plus review date
  and revisit triggers. Scenario premises retain `last_updated` and explicit
  revisit triggers.
- Updates never overwrite prior reasoning silently. Increment `version` and
  explain the change in `changelog_note` or the relevant register history.
- Public outputs display an `as of` date for volatile analysis. A release gate
  must recheck load-bearing sources whose underlying publisher has issued a
  new vintage or correction.
- “Current” means checked against the relevant source's update cycle and again
  before publication. It does not mean reacting to every rumor in real time.

## Triage example: Anthropic Model Hardware Standard

Anthropic announced the Model Hardware Standard research preview on
2026-08-27. The primary release describes a model-agnostic interface for
programmable laboratory and manufacturing devices, with partner
proofs-of-concept in laboratory automation and explicit limits in physical,
chemical, and biological reasoning:

https://www.anthropic.com/news/model-hardware-standard-research-preview

Atlas disposition as of 2026-08-28:

- stage as an event-triggered technical source lead;
- treat integration-time and performance statements as originating-party or
  partner claims until independently validated;
- initially route possible effects to C2 data access/interoperability, C3
  organizational integration, pathway topology for instrument integration,
  governance/assurance, experimental throughput, error recovery, and
  tacit-knowledge codification at scoped stages;
- do not infer autonomous science, general manufacturing conversion, reliable
  commercial scale, or a changed sector band from the preview; and
- do not automatically change S1-S5. Revisit an intrinsic profile only if
  evidence later shows that the standard has become sufficiently general to
  alter the structure of a scoped stage rather than merely its organizational
  conversion conditions. That result may require a versioned S-row review or
  a distinct `pathway_id`.

## Implementation timing

Adopt the metadata, triage rules, prompt language, and release checks now,
before WP2 creates new schemas. Defer automated feeds, scheduled scans, and a
public freshness dashboard until after the three-anchor pilot demonstrates
which sources and fields are actually load-bearing.
