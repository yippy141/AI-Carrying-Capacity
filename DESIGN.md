# Design

## Direction

Frontier Is Not Fate uses an editorial, evidence-first visual system. The
figure is the primary publication unit. Restraint, visible provenance, and
unambiguous evidence encoding carry the brand.

The public surface is a reading experience, not a dashboard. It uses one thin
navigation bar, a warm paper field, ruled figure frames, and generous vertical
separation. It does not use gradients, shadows, decorative imagery, emoji,
entrance animation, KPI cards, or dashboard chrome.

## Tokens

- `--paper`: `#FBFAF7`
- `--ink`: `#1C1B1A`
- `--ink-soft`: `#57534B`
- `--hairline`: `#E7E2D9`
- `--surface`: `#F4F1EA`
- `--us`: `#3E63DD`
- `--cn`: `#C4442A`
- `--comparator`: `#9C958B`
- `--accent`: `#1F6F5C`

United States and China hues are reserved for country encoding. Comparator
gray carries other geographies. Interactive states and links use the green
accent; it never encodes data. Figures without a country dimension use ink and
gray only.

## Typography

- Display: Newsreader, weights 500 and 600.
- Body and UI: Inter, weights 400, 500, and 600.
- Data, axes, metadata, and labels: IBM Plex Mono, weights 400 and 500.
- Numeric text uses tabular figures.
- Body text is 17px with 1.55 line height and a maximum prose measure of 66ch.
- The scale is 13, 15, 17, 21, 26, 34, 46, and 60px.

## Evidence Basis

Evidence basis and review status are orthogonal. The eight public bases are:

1. Observed
2. Model estimate
3. Scenario
4. Official target
5. Company target
6. Expert-coded
7. Historical analogy
8. Hypothesis

Review status is canonical, reviewed, staged, superseded, or rejected.
Canonical and reviewed material may render publicly. Staged, superseded, and
rejected material does not render publicly.

Evidence chips use IBM Plex Mono at 11px with letterspaced uppercase text.
Observed is solid ink; model estimate is hairline gray; scenario is gray with a
dashed border; official and company targets are solid- and dashed-outline
respectively; expert-coded is dotted; historical analogy is double-rule; and
hypothesis is a hairline ghost.

## Figure Frame

Every public figure uses `FigureShell` in this order:

1. Claim-title with an epistemic prefix.
2. Subtitle naming unit, denominator, and universe.
3. Chart with a text alternative and direct annotations where useful.
4. Hairline footer with source line, evidence-basis chip, definition warning,
   permalink, and PNG/SVG export.

`AnnotationLayer` places one to three Inter 13px notes directly on a chart with
hairline leaders. Incompatible denominators receive separate panels and axes.
Bars start at zero. Charts use horizontal hairlines only, direct labels where
series count permits, and no rounded bar caps, dual axes, 3D, icons, pie/donut,
radar, or decorative effects.

## Motion and Accessibility

Only data-state changes may animate, at 160–240ms ease-out. There are no
entrance or ambient animations. `prefers-reduced-motion` reduces all motion.
Keyboard focus is visible, interactions are reachable, contrast targets WCAG
AA, and every figure has a text alternative that states its claim and values.

## First reader edition extension

The primary surface is Read mode: four continuous figure scenes with optional
source detail and a shared paper view. Preserve the established font families,
paper/ink rules and country-only US/China colors. New mechanism and outcome
figures use ink/gray, labeled units and meaningful state changes. No entrance
animation or forced reading time. Model-generated qualitative assessments use
“Analyst assessment · AI-assisted” with actual review state separately visible;
historical raw evidence labels remain intact.

At 390px, multi-panel figures stack; source tables alone scroll horizontally.
Native range inputs, radio choices, visible focus, live result text, reset,
reduced-motion rules and printable equations support the mechanism. Fonts are
bundled locally. Curated browser captures live under `reports/reader-edition/`.
