# Method Notes

Status: scaffold. This is not a validated methodology.

## Method Position

V0 should be a diagnostic framework and sectoral pilot, not a definitive global ranking.

The initial research question:

> Given access to a particular level of AI capability, how effectively and quickly can a country convert it into productivity, scientific output, state capacity, strategic power, and broadly distributed welfare without deployment outrunning institutional adaptation?

## Displayed Quantities

| Quantity | V0 Meaning |
| --- | --- |
| Frontier access | Ability to build, buy, import, deploy, or adapt advanced AI systems. |
| Conversion capacity | Complementary infrastructure, institutions, skills, finance, domain assets, and coordination needed for repeated use. |
| Diffusion speed | Time from pilot to intensive adoption. |
| Adaptation stress | Gap between deployment velocity and society's capacity to absorb labor, energy, safety, legal, and legitimacy shocks. |
| Distribution quality | Breadth and fairness of benefit diffusion across firms, workers, regions, public services, and citizens. |
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

## Source Reliability Tiers

| Tier | Description |
| --- | --- |
| A | Official statistics, laws, regulations, primary datasets, peer-reviewed papers, or methodology reports. |
| B | Reputable working papers, think tank reports, institutional white papers, and high-quality survey evidence. |
| C | Expert essays, media reporting, and secondary synthesis. |
| D | Unverified claims, marketing materials, and material useful only as a lead. |
| E | Placeholder, missing, or unreviewed material that must not be used as evidence. |

## Guardrails

- Do not average away bottlenecks with a single score in V0.
- Preserve absolute and per-capita interpretations where both matter.
- Separate enabling inputs from realized outcomes.
- Show missingness and data quality before ranking anything.
- Use sensitivity testing before publishing any weighted aggregate.
- Treat centralization as a tradeoff: it may increase deployment speed but can reduce error correction, transparency, and resilience.
- Treat public tolerance as a two-part construct: adoption legitimacy and feedback capacity.

## Candidate Formula

This is a conceptual guide, not an implemented model:

```text
net_impact(country, sector, time)
  = f(frontier_access * conversion_capacity, implementation_lag)
  - adjustment_stress
```

Future empirical work may explore conversion efficiency, conversion elasticity, or adaptation gaps, but only after enough comparable data exist.
