# Figure Register

Date: 2026-07-11

Every public figure is classified as **empirical** (canonical observed data), **modeled** (model estimates from empirical inputs), **conceptual** (framework/hypothesis figures with no measured coordinates), or **forecast** (signpost questions with resolution procedures). Classification appears in the figure caption in the product.

## Live figures

| # | Figure | Component | Type | Sources | Status | Caveats that must ship with it | Export needs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| F0 | Capability narrows through conversion bottlenecks (hero ribbon) | `FrontierNotFateHero` | Conceptual | none (schematic) | Live | "Illustrative schematic, not scored data" | SVG/PNG for essay hero |
| F2 | Where frontier capability converts, and where it stalls | `FrontierSensitivityScatter` | Conceptual | clm-0029 (approved_with_caveat); anchored by staged clm-0024 (METR domains) | Live | "Positions are illustrative, not scored. Read the pattern, not the coordinates." Uncertainty halos on contested placements | SVG/PNG for essay §4 (exists) |
| F3 | Two systems, two conversion chains (US–China) | `ConversionChainCompare` | Conceptual with empirical anchors | Canonical: src-0016 (IFR incl. density revision, clm-0003), src-0018 (AI Action Plan, clm-0013), src-0023 (AI+ opinion, clm-0006), src-0012/0013 (grid). Staged leads are excluded from observed cells. | Live | Every cell separates direct record, interpretation, and missing evidence; no median-firm inference and no winner | PNG for essay §5–6 |
| F4 | Forecast signposts table | `/forecasts` page | Forecast | `data/forecasts/forecast_register.csv` | Live questions; all ranges gated | Draft ranges remain hidden until `author_review_status=reviewed` | none yet |

## Planned figures (not built; do not build without canonical data)

| Figure | Type | Blocking requirement |
| --- | --- | --- |
| Buildout is visible before broad payoff (`BuildoutVsPayoffFigure`, unnumbered lab prototype) | Planned empirical | Promote and extract canonical build and harvest series. It is not a live empirical figure and may not enter the numbered public narrative while empty. |
| Conversion beats exposure (adoption vs conversion-capacity scatter) | Empirical | Promote adoption sources (src-v1-dr-005..010) and define conversion-capacity index inputs |
| Extensive vs intensive use dumbbell | Empirical | Promote ECB (src-v1-dr-005) + comparator national statistics |
| Accessibility-adjusted frontier index over time | Modeled | Requires cost-adjusted capability method (src-v2-dr-013) reviewed in METHOD.md |
| Energy as conversion bottleneck (regional stacked bars) | Empirical + modeled | IEA/LBNL regional extraction; reconcile src-v2-dr-005 with canonical src-0009 |
| China conversion ladder (intent → registration → capacity → use → outcomes, with evidence density) | Conceptual with empirical anchors | Verify CAC registry URL (src-v2-dr-023) and data-center utilization reporting (src-v2-dr-020) |

## Register rules

- A figure may not move from empty state to rendered data unless every plotted series has a canonical source ID.
- Conceptual figures must say so in the caption; their coordinates may never gain axes with units.
- Modeled figures name the model owner and the estimate vintage in the caption.
- Forecast figures show status and update history; resolved questions stay visible.
