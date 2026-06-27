# Method Notes

Status: V0 diagnostic method. This is not yet a validated scoring methodology.

## Method Position

V0 should be a diagnostic framework and sectoral pilot, not a definitive global ranking.

The initial research question:

> Given access to a particular level of AI capability, how effectively and quickly can a country convert it into productivity, scientific output, state capacity, strategic power, and broadly distributed welfare without deployment outrunning institutional adaptation?

## Displayed Quantities

| Quantity | V0 Meaning |
| --- | --- |
| Frontier access | Ability to build, buy, import, deploy, or adapt advanced AI systems. |
| Conversion capacity | Infrastructure, institutions, skills, finance, domain assets, and coordination needed for repeated use. |
| Diffusion speed | Time from pilot to intensive adoption. |
| Adaptation stress | Gap between deployment speed and society's absorption capacity. |
| Distribution quality | Breadth and fairness of benefit diffusion. |
| Realized outcomes | Observed productivity, quality, availability, scientific, public-service, defense, welfare, and adjustment-cost outcomes. |

## Evidence Labels

Use these labels consistently:

| Label | Use |
| --- | --- |
| observed | Directly measured in a credible dataset or report. |
| official-claim | Claimed by a government or institution but not independently validated. |
| qualitative-coded | Coded from a transparent qualitative judgment. |
| estimated | Estimated using a documented method. |
| missing | Not available or not yet reviewed. |

Official claims can support policy-intent or program-activity claims. They must not be presented as independently observed outcomes unless independent validation exists.

## Source Reliability Tiers

| Tier | Description |
| --- | --- |
| A | Official statistics, laws, regulations, primary datasets, peer-reviewed papers, or methodology reports. |
| B | Reputable working papers, think tank reports, institutional white papers, and high-quality survey evidence. |
| C | Expert essays, secondary synthesis, or contextual material. |
| D | Media reporting, unverified claims, marketing material, or leads. |
| E | Placeholder, missing, or unreviewed material that must not be used as evidence. |

Source reliability is not the same as claim validation. An official document can be tier `A` while its policy target remains an `official-claim` rather than an observed result.

## Method Types

Every canonical source row should identify the kind of evidence it provides. Allowed method types include official statistics, law or regulation, government strategy, administrative data, survey, dataset, peer-reviewed paper, working paper, think tank report, corporate filing, corporate report, media report, expert commentary, model estimate, and placeholder.

Expert commentary can inform scenario framing and conceptual interpretation. It cannot support empirical indicator values.

## Missingness Reasons

Missing data should not be collapsed into one vague label. Use one of these reasons:

- `not_reviewed`
- `not_available`
- `not_comparable`
- `not_applicable`
- `confidential`
- `not_yet_measured`
- `source_unverified`
- `placeholder`

A missing value is not automatically a weak performance signal. It may reflect lack of review, confidentiality, or poor cross-country comparability.

## Attribution Strength

Outcome claims need an attribution label:

- `descriptive`
- `before_after`
- `comparison_group`
- `quasi_causal`
- `causal`
- `model_based`
- `speculative`
- `not_applicable`
- `placeholder`

The Atlas should avoid implying that AI caused an outcome unless the evidence design supports that inference.

## Input, Process, Output, Outcome

Every indicator should identify its role:

- `input`: resources or enabling conditions.
- `process`: adoption, implementation, or organizational activity.
- `output`: direct production or service outputs.
- `outcome`: downstream effects such as productivity, welfare, or quality.
- `stress`: adaptation burden or constraint.
- `distribution`: who receives gains or bears costs.
- `context`: background conditions.
- `placeholder`: non-evidentiary row.

This protects the project from treating robot density, policy targets, public platform users, or compute announcements as realized outcomes.

## Guardrails

- Do not average away bottlenecks with a single score in V0.
- Preserve absolute and per-capita interpretations where both matter.
- Separate enabling inputs from realized outcomes.
- Show missingness and data quality before ranking anything.
- Use sensitivity testing before publishing any weighted aggregate.
- Treat centralization as a tradeoff: it may increase deployment speed but can reduce error correction, transparency, and resilience.
- Treat public tolerance as a two-part construct: adoption legitimacy and feedback capacity.
- Reject Wikipedia as an evidence source.
- Block placeholder, tier `D`, tier `E`, and expert-commentary sources from supporting empirical values.
- Treat tier `C` sources as non-empirical unless promoted through a specific review decision.

## V0 Web Presentation

The initial web app can present methodology, source status, scenario placeholders, sector modules, and country-profile shells. It must not present a definitive country ranking, a composite national score, or unsourced indicator values.

For the web app, placeholder modules should visibly label records as `placeholder` or `missing`. If a page needs an example country or sector shell, it may show the shell only; every value remains missing until a reviewed source and documented method support it.

## Launch Readiness

Private-preview builds may show staged material if it is clearly labeled. A public pilot requires reviewed canonical sources, no public TODO markers, no unsupported indicator scores, visual source IDs that exist in the canonical register, and clear separation between official claims and observed evidence.

## Candidate Formula

This is a conceptual guide, not an implemented model:

```text
net_impact(country, sector, time)
  = f(frontier_access * conversion_capacity, implementation_lag)
  - adjustment_stress
```

Future empirical work may explore conversion efficiency, conversion elasticity, or adaptation gaps, but only after enough comparable data exist.
