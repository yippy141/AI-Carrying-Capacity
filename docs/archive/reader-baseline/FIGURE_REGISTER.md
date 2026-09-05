# Figure Register

Date: 2026-08-27

Every public figure retains an analytic type in this register and separately
renders one of the eight design-system evidence bases. Review status is an
orthogonal public gate. Analytic type no longer doubles as a chip label.

## Live figures

| # | Figure | Component | Type | Sources | Status | Caveats that must ship with it | Export needs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F0 | Capability narrows through conversion bottlenecks (hero ribbon) | `FrontierNotFateHero` | Conceptual | none (schematic) | Live | "Illustrative schematic, not scored data" | SVG/PNG for essay hero |
| F1 | Adoption is not integration | `AdoptionDepthFigure` | Empirical; overall OBSERVED with one MODEL ESTIMATE mark | Observations: `data/observations/adoption_depth.csv`. Canonical sources: src-0038/0039/0040 (ECB), src-0042/0043/0044 (Eurostat), src-0046/0047/0048 (BTOS), and src-0049 (NBS context panel). Claims: clm-0018, clm-0032–0037. | Live | Within-source comparisons only; no harmonized deep-use metric. ECB retains its unreported residual. BTOS Q23 and Q24 use different windows and denominators; the comprehensive-adopter latent-class estimate is hatched. Eurostat size gradient is adoption, not depth. China NBS is a separate `CONTEXT ONLY` panel and is non-comparable. | Frame-level SVG and PNG exports; desktop and 390px screenshots required with each material revision |
| F2 | Where frontier capability converts, and where it stalls | `FrontierSensitivityScatter` | Conceptual | clm-0029 (approved_with_caveat); anchored by staged clm-0024 (METR domains) | Live | "Positions are illustrative, not scored. Read the pattern, not the coordinates." Uncertainty halos on contested placements | SVG/PNG for essay §4 (exists) |
| F3 | Two systems, two conversion chains (US–China) | `ConversionChainCompare` | Conceptual with empirical anchors | Canonical: src-0016 (IFR), src-0018 (AI Action Plan), src-0023 (AI+ opinion), src-0012/0013 (grid), src-0046/0047/0048 (BTOS), src-0049 and clm-0037 (NBS context). Staged leads are excluded from observed cells. | Live | Every cell separates direct record, interpretation, and missing evidence; BTOS and NBS use are not directly compared; no median-firm inference and no winner | PNG for essay §5–6 |
| F4 | Forecast signposts table | `/forecasts` page | Forecast | `data/forecasts/forecast_register.csv` | Gated; no reviewed public rows | Draft questions and ranges remain hidden until `author_review_status=reviewed` | none yet |

## Planned figures (not built; do not build without canonical data)

| Figure | Type | Blocking requirement |
| --- | --- | --- |
| Buildout is visible before broad payoff (`BuildoutVsPayoffFigure`, unnumbered lab prototype) | Planned empirical | Promote and extract canonical build and harvest series. It is not a live empirical figure and may not enter the numbered public narrative while empty. |
| Conversion beats exposure (adoption vs conversion-capacity scatter) | Empirical | Promote adoption sources (src-v1-dr-005..010) and define conversion-capacity index inputs |
| Accessibility-adjusted frontier index over time | Modeled | Requires cost-adjusted capability method (src-v2-dr-013) reviewed in METHOD.md |
| Energy as conversion bottleneck (regional stacked bars) | Empirical + modeled | IEA/LBNL regional extraction; reconcile src-v2-dr-005 with canonical src-0009 |
| China conversion ladder (intent → registration → capacity → use → outcomes, with evidence density) | Conceptual with empirical anchors | Verify CAC registry URL (src-v2-dr-023) and data-center utilization reporting (src-v2-dr-020) |

## Register rules

- A figure may not move from empty state to rendered data unless every plotted series has a canonical source ID.
- Conceptual figures must say so in the caption; their coordinates may never gain axes with units.
- Modeled figures name the model owner and the estimate vintage in the caption.
- Forecast figures show status and update history; resolved questions stay visible.
