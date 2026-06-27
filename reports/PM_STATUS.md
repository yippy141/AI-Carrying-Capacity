# PM Status

Last updated: 2026-06-27.

## Current Launch Posture

**Private preview only.**

The repo has a strong V0 scaffold, staged research, and interactive product shell. It should not be described as an evidence product until canonical sources, indicators, claims, and visual guardrails are reviewed.

## Active Control Branch

| Branch | Objective | Status |
| --- | --- | --- |
| `agent/control-plane-20260627` | Add agent locks, runbook, PM status, and issue board | In progress |

## Issue Board

### Wave 0

| Issue | Objective | Status |
| --- | --- | --- |
| #1 | Agent path locks and PM status | Active |

### Wave 1: Evidence Infrastructure

| Issue | Objective | Status |
| --- | --- | --- |
| #2 | CI and launch-readiness checks | Ready |
| #3 | Source schema upgrade | Ready |
| #4 | Indicator schema and missingness taxonomy | Ready |
| #5 | METR/Epoch capability-horizon module | Ready |

### Wave 2: Public Product Conversion

| Issue | Objective | Status |
| --- | --- | --- |
| #6 | Promote first 30 canonical sources | Blocked by #3 |
| #7 | Populate V0 claim ledger | Blocked by #3 and #6 |
| #8 | Scenario assumption browser | Ready |
| #9 | Visual evidence guardrails | Ready |
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
| Missingness is too coarse | #4 | Open |
| Official claims need stronger schema/UI separation | #3, #9 | Open |
| Scenario UI may read as forecast | #8 | Open |
| Staged visuals may look like evidence | #9 | Open |
| Launch essay needs source-gated rewrite | #10 | Open |

## Canonical Data Status

- Reviewed sources: pending.
- Reviewed indicators: pending.
- Approved claims: pending.
- Public visuals using staged data: yes, with additional guardrails needed.

## Recommended Merge Order

1. Merge this control-plane branch.
2. Run Wave 1 in separate branches.
3. Merge Wave 1 after PM review.
4. Run #6 and #7.
5. Run #8 and #9.
6. Run #10.
7. Run #11.
8. Decide launch posture.

## Human Decisions Needed

1. Confirm launch posture target: private preview or public pilot.
2. Pick deployment domain.
3. Pick launch essay voice.
4. Decide how many canonical sources are enough before public pilot.
