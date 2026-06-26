# Design

## Style

AI Conversion Atlas uses a clean editorial system with restrained navigation, large serif headings, readable sans-serif body copy, and ruled research notes. The palette is pure white and dark ink, anchored by burnt orange with a teal evidence accent.

## Color Tokens

- `--background`: `oklch(1 0 0)`
- `--foreground`: `oklch(0.17 0.018 42)`
- `--surface`: `oklch(0.965 0 0)`
- `--surface-strong`: `oklch(0.925 0 0)`
- `--rule`: `oklch(0.82 0.004 42)`
- `--muted`: `oklch(0.39 0.018 42)`
- `--primary`: `oklch(0.6 0.19 38.6)`
- `--primary-strong`: `oklch(0.46 0.16 38.6)`
- `--accent`: `oklch(0.34 0.12 190)`
- `--accent-soft`: `oklch(0.91 0.045 190)`
- `--missing`: `oklch(0.48 0.015 42)`
- `--warning`: `oklch(0.58 0.17 72)`

## Typography

- Display: system serif stack, led by `Iowan Old Style`.
- Body: system sans stack, led by `Aptos` and `Segoe UI`.
- Letter spacing stays at `0`.
- Large page headings use responsive breakpoints rather than viewport-scaled font sizes.

## Components

- `SiteHeader`: product identity and primary navigation.
- `SiteFooter`: scaffold status and key links.
- `SectionEyebrow`: a sparingly used section cue, not repeated as page scaffolding.
- `NarrativeBlock`: editorial two-column explanation block.
- `SourceNote`: ruled provenance and source-status note.
- `ConfidenceBadge`: evidence-state label.
- `MethodologyCallout`: high-emphasis method note.

## Interaction

The first version is static and does not require external API keys. Links and controls use visible focus states. Motion is intentionally minimal and respects reduced-motion settings.
