# Design QA

Date: 2026-08-27

Branch: `design/system-v2`

Reference: Design system v2 and `design-reference.html` supplied for WP1.

## Match-exact grammar

| Rule | Implementation | Status |
| --- | --- | --- |
| Paper, ink, surface, hairline, country, comparator, and accent tokens | `app/globals.css` | Pass |
| Newsreader / Inter / IBM Plex Mono stacks | `app/layout.tsx`, `app/globals.css` | Pass |
| Eight evidence-basis chips | `components/ui/EvidenceChip.tsx` | Pass |
| Evidence basis separate from review status | `lib/evidenceStatus.ts` | Pass |
| Staged, superseded, and rejected rendering gate | `EvidenceChip`, `FigureShell`, public claim/forecast lists | Pass |
| Claim-title prefix, subtitle, source footer, permalink, PNG/SVG | `components/ui/FigureShell.tsx` | Pass |
| Direct annotations with hairline leaders | `components/ui/AnnotationLayer.tsx` | Pass |
| Figure spacing and 960px publication width | Figure wrappers on the study page | Pass |

## Chart grammar

- No gradients, shadows, 3D, icon decoration, emoji, rounded bar caps, pie,
  donut, radar, or dual-axis charts appear in app code.
- Bars start at zero. Figure 1 gives ECB, Census, Eurostat, and NBS separate
  source-specific axes. Census Q23 and Q24 also retain distinct denominators.
- Country hues encode only the U.S. and China panels. Euro-area and EU marks
  use ink and comparator gray.
- The Census comprehensive-adopter value retains its model-estimate basis and
  uses a hatch; it is not restyled as observed.
- The NBS panel is labeled `CONTEXT ONLY`, retains its above-scale-enterprise
  denominator, and is not pooled or ranked.
- Figure 1 carries two direct annotations and an accessible text alternative
  containing the plotted values.
- Ambient hero animation was removed. Reduced-motion rules remain global.

## Integrity gates

- `scripts/validate_design_placeholders.py` rejects reference-only claim text,
  the complete placeholder band/stage assignment sequences, and any numeric
  percentage near a compressibility or frontier-gap claim.
- The guard runs through `npm run lint`, `scripts/validate_repo.py`, and CI.
- Application data, claim semantics, and the forecast register were not edited.

## Verification

| Check | Result |
| --- | --- |
| Placeholder validator tests | Pass |
| Evidence and Figure 1 tests | Pass |
| Adoption-depth validator | Pass |
| Repository validator | Pass |
| ESLint | Pass |
| TypeScript | Pass after removing a stale generated `.next/dev` validator |
| Next production build | Pass; existing broad NFT trace warning remains |
| Generic FigureShell PNG/SVG export | Pass: exercised Figure 2 in-browser with no action or console error |
| 1440px screenshot | Pass: inspected top and bottom Figure 1 slices in `reports/screenshots/figure-1-design-v2-desktop-1440-{top,bottom}.png` |
| 390px screenshot | Pass: inspected top, middle, and bottom Figure 1 slices in `reports/screenshots/figure-1-design-v2-mobile-390-{top,mid,bottom}.png` |

The responsive pass produced no browser console warnings or errors. At 390px,
panels stack in source order, annotations remain attached to their marks, and
the provenance footer and export actions remain readable without horizontal
overflow.

The finish pass also narrowed all numbered study figures to the 960px
publication measure, enlarged footer action hit targets, and replaced remaining
public rounded-card surfaces with ruled editorial rows or chart cells.
