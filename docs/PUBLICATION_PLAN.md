# Publication Plan

Date: 2026-07-11

## Publication artifacts

1. **The study** (`/` — Frontier Is Not Fate): the public interactive narrative. Ships at private-preview quality now; public pilot after the gate below.
2. **The working paper** (`content/essays/launch-essay-v1.md`, v1.1): publishes on Substack simultaneously with the public pilot. VERIFY markers must be cleared first.
3. **The evidence system** (AI Conversion Atlas: `/evidence`, `/methods`, claim ledger, source register): always public alongside the study — it is the credibility substrate.
4. **The forecast register** (`/forecasts`): publishes with rows marked draft until each question's range is reviewed once against its resolution source.

## Public-pilot gate (all must pass)

- [ ] Staged sources supporting essay claims promoted to canonical (priority: src-v1-dr-001..012; then src-v2-dr-* leads with located URLs).
- [ ] All VERIFY markers cleared from `launch-essay-v1.md`; TODO markers cleared from legacy content or those files marked internal.
- [ ] `python3 scripts/check_launch_readiness.py --mode public-pilot` passes (requires resolving staged `src-v0-dr-*` IDs in `v0_visual_system.json` — remap to canonical or move that JSON out of public paths).
- [ ] Final adversarial review (issue #11) run against the reset product, including: no ranking implied, no forecast presented as prediction, official claims visually separated, China hypothesis framing intact.
- [ ] One external read from a China-tech-policy person and one from an economics/AI-governance person.

## Sequencing

1. **Now (private preview):** product reset merges; share the preview URL selectively for critique.
2. **Week 1:** staged-source promotion PR (verification-heavy; human-reviewed row by row). Clear essay VERIFY markers in the same PR. Reconcile duplicate source families (IEA src-v2-dr-005 vs canonical src-0009; ECB media relay vs primary blog).
3. **Week 2:** first empirical figure lands (recommended: extensive-vs-intensive dumbbell — smallest canonical-data requirement, strongest single fact in the evidence base). Run #11. Decide public pilot.
4. **Launch:** deploy (suggested aiconversion.jhyip.com), publish essay on Substack with exported F0/F2/F3 images, flip portfolio links from placeholders, invite critique.
5. **Post-launch:** forecast-register review cadence (quarterly range reviews, append-only history); China evidence-map follow-ups (CAC registry URL, utilization reporting, Zeng-Wang-Sun DOI).

## Authorship and voice

Author: Jinhua Yip. Drafting and engineering assistance by Claude (Anthropic) and OpenAI tools, disclosed on `/about`. Voice: China tech policy + political economy + AI governance; hypothesis-first; no boosterism, no doom framing.

## Distribution

- Substack essay (primary), cross-linked to the study.
- Portfolio card on jhyip.com (exists; links flip at launch).
- Targeted critique requests: China tech policy, AI governance, economics-of-diffusion researchers; the staged China evidence map's institution/person leads are the interview pipeline, pending verification.
