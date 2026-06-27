# PM Status

Last updated: 2026-06-27.

## Current Launch Posture

**Private preview only.**

The repo has a strong V0 scaffold, staged research, and interactive product shell. It should not be described as an evidence product until canonical sources, indicators, claims, and visual guardrails are reviewed.

## Active Branches

| Branch | Objective | Status |
| --- | --- | --- |
| `agent/wave2-ui-guardrails-20260627` | Scenario assumption browser and staged visual guardrails | Merged |

## Issue Board

### Wave 0

| Issue | Objective | Status |
| --- | --- | --- |
| #1 | Agent path locks and PM status | Done |

### Wave 1: Evidence Infrastructure

| Issue | Objective | Status |
| --- | --- | --- |
| #2 | CI and launch-readiness checks | Done |
| #3 | Source schema upgrade | Done |
| #4 | Indicator schema and missingness taxonomy | Done |
| #5 | METR/Epoch capability-horizon module | Done |

### Wave 2: Public Product Conversion

| Issue | Objective | Status |
| --- | --- | --- |
| #6 | Promote first 30 canonical sources | Next |
| #7 | Populate V0 claim ledger | Blocked by #6 |
| #8 | Scenario assumption browser | Implemented in Wave 2 UI branch |
| #9 | Visual evidence guardrails | Implemented in Wave 2 UI branch |
| #10 | Launch essay rewrite | Blocked by #6 and #7 |

### Final Review

| Issue | Objective | Status |
| --- | --- | --- |
| #11 | Final adversarial launch review | Blocked by Wave 2 |

## Launch Blockers

| Blocker | Owner issue | Status |
| --- | --- | --- |
| Canonical source register lacks reviewed source rows | #6 | Open |
| Public claims lack a populated claim ledger | #7 | Open |
| Missingness too coarse | #4 | Fixed in schema; needs reviewed data adoption |
| Official claims need stronger schema/UI separation | #3, #9 | Schema fixed; UI guardrails in branch |
| Scenario UI may read as forecast | #8 | Fixed in branch |
| Staged visuals may look like evidence | #9 | Fixed in branch |
| Launch essay needs source-gated rewrite | #10 | Open |

## Canonical Data Status

- Reviewed sources: pending.
- Reviewed indicators: pending.
- Approved claims: pending.
- Public visuals using staged data: yes, now guarded with staged-evidence banners in branch.
- Public-pilot readiness: expected to fail until #6, #7, and #10 are complete.

## Recommended Merge Order

1. Run #6 source promotion.
2. Run #7 claim ledger.
3. Run #10 launch essay rewrite.
4. Run #11 final red-team.
5. Decide launch posture.

## Human Decisions Needed

1. Confirm launch posture target: private preview or public pilot.
2. Pick deployment domain.
3. Pick launch essay voice.
4. Decide how many canonical sources are enough before public pilot.
