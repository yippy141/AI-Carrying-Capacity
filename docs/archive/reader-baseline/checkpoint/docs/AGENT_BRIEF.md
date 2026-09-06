# AI Conversion Atlas Agent Brief

Current execution context: read `docs/PROJECT_STATE.md` first; it does not supersede the method authority in `docs/AUTHORITATIVE_DOCS.md`.

## Project

AI Conversion Atlas studies how societies convert accessible AI capability into material outcomes: productivity, state capacity, scientific output, strategic power, and broadly distributed welfare.

The public hook can be "AI carrying capacity." The analytic construct should usually be "AI conversion capacity," "national AI absorptive capacity," or a more precise sector-specific term.

## Core Distinctions

Do not collapse these concepts:

| Concept | Meaning |
| --- | --- |
| Frontier access | What level of AI capability actors in a country can build, buy, import, deploy, or adapt. |
| Conversion capacity | Complementary assets that turn AI into operational use in firms, labs, public services, infrastructure, and defense. |
| Diffusion speed | Time from pilot to repeated, intensive, value-producing use. |
| Adaptation capacity | Ability of institutions, labor markets, infrastructure, law, and legitimacy systems to absorb disruption. |
| Distribution quality | Whether gains reach workers, SMEs, regions, patients, citizens, and public services, or remain concentrated. |
| Realized outcomes | Observed changes in productivity, quality, availability, scientific output, public service, strategic power, welfare, and adjustment costs. |

## Initial V0 Scope

- Pilot comparison: United States and China.
- Comparators where data allow: Japan, South Korea, Germany, Singapore, India, EU, Taiwan.
- First sector module: manufacturing, robotics, and embodied AI.
- First cross-cutting constraint module: compute, data centers, electricity, and grid absorption.
- Initial deliverables: methodology note, source register, indicator catalog, research synthesis, launch essay, and future visual product.

## Rules

- For Structural Conversion Profiles and the WP1.5-to-WP2 handoff, follow the
  authority order in `docs/AUTHORITATIVE_DOCS.md`. Earlier attached proposals
  are historical wherever they conflict with that manifest.
- Do not fabricate data.
- If a value is not sourced, mark it missing.
- If a value is estimated or qualitative-coded, mark it explicitly.
- Do not use Wikipedia as a source.
- Label official government claims separately from independently validated evidence.
- Treat China advantage, US advantage, centralization benefits, and fragmentation costs as hypotheses to test.
- Keep inputs and outcomes separate to avoid circular scoring.
- Avoid a single composite score in V0 unless a documented methodology and sensitivity analysis support it.
- Use transparent data quality labels and uncertainty notes.
- Follow `docs/FRESHNESS_PROTOCOL.md`: date material claims and codings, record
  revisit triggers, and triage new releases before changing canonical work.
- Treat anonymous or unattributed social-media claims as leads only. They may
  not support codings, probability updates, public claims, or method changes.
- Do not auto-publish anything.
- Do not add secrets, API keys, or private credentials.
- Update `docs/DECISIONS.md` after methodology, naming, scoring, or architecture decisions.
- Update `docs/TASKS.md` after finishing or discovering work.

## Review convergence

Each work package receives one primary substantive review and one correction
pass. A second check verifies only whether P0/P1 blockers were fixed. Merge
when no P0/P1 blocker remains; log P2/P3 limitations, polish, and speculative
enhancements for the next cycle rather than reopening the package.

- P0: fabricated evidence, false provenance/status, security or integrity
  failure, wrong denominator, or a broken build that invalidates the package.
- P1: material method, schema, public-claim, accessibility, or interpretation
  error that must be corrected before merge.
- P2: real but non-blocking limitation or secondary weakness for the next
  cycle.
- P3: polish, preference, speculative enhancement, or future robustness.

## Suggested Agent Roles

| Role | Writes to |
| --- | --- |
| PM / integrator | Final synthesis and cross-file coordination. |
| Literature agent | `research/deep-research/`, `content/methodology/`, `docs/METHOD.md`. |
| China policy agent | `research/deep-research/`, `content/country-briefs/china.md`. |
| Comparative policy agent | `research/deep-research/`, `content/country-briefs/`. |
| Data agent | `data/`, `scripts/`, `docs/DATA_DICTIONARY.md`. |
| Methodology agent | `docs/METHOD.md`, `content/methodology/`. |
| Frontend agent | `app/`, `components/`, `public/`. |
| Content agent | `content/essays/`, `content/narrative/`. |
| Red-team agent | `docs/RED_TEAM.md`. |

Avoid having multiple agents edit the same files at the same time.
