# Decision Log

## 2026-06-26: Use AI Conversion Atlas as repo identity

Decision: Use "AI Conversion Atlas" as the product/repo identity.

Reasoning: It is clearer and more defensible than treating "AI carrying capacity" as the formal construct. "Carrying capacity" remains useful public language, but "conversion capacity" better captures dynamic, sector-specific, institutionally shaped absorption of AI capability.

## 2026-06-26: Keep V0 scaffold-only

Decision: Do not initialize a Next.js app, install dependencies, or create scored data yet.

Reasoning: The user is commissioning Deep Research reports separately. Creating a framework-heavy app or dataset before those reports arrive would lock in assumptions too early.

## 2026-06-26: Avoid a single V0 score

Decision: Represent the V0 framework as separate dimensions rather than one composite national index.

Reasoning: A single score would create fake precision before source coverage, weighting, missingness, and sensitivity testing are mature.

## 2026-06-26: Keep China-US claims hypothesis-first

Decision: Do not encode China or US advantage as a conclusion in the scaffold.

Reasoning: The strongest version of the project tests sector-specific conversion advantages instead of assuming them.

## 2026-06-26: Use explicit V0 data-layer registries

Decision: Use `data/sources/source_register.csv` and `data/indicators/indicator_catalog.csv` as the canonical V0 registries, with generated metadata JSON in `data/processed/`.

Reasoning: Keeping source metadata, indicator metadata, and country profile outputs separate prevents placeholder or qualitative-coded material from being mistaken for observed country scores.

## 2026-06-26: Use A-E reliability tiers and explicit data quality

Decision: Use `A`, `B`, `C`, `D`, and `E` for source reliability tiers, and `high`, `medium`, `low`, and `missing` for indicator data quality.

Reasoning: Letter tiers leave room for `E` placeholder rows while avoiding confusion with numeric indicator scores. The explicit `missing` data-quality value keeps unknown quality visible.

## 2026-06-26: Require evidence guardrails for scores

Decision: Indicator rows may not carry a score unless they have valid `source_ids` or are explicitly marked and documented as qualitative-coded.

Reasoning: V0 should allow transparent qualitative coding later, but it must never silently accept unsourced scores or treat placeholders as evidence.
