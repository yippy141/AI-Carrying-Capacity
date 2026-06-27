# Agent Runbook

Status: beginner-friendly operating guide.

This project should be managed like a careful research lab, not like one giant coding prompt. The goal is to let agents help while preventing them from mixing staged research, public claims, and real evidence.

## Mental Model

A good agent workflow has five parts:

1. **Issue**: the job description.
2. **Branch**: the safe workspace.
3. **Path lock**: the files the agent may edit.
4. **Validation**: tests and checks before review.
5. **Pull request**: the reviewable package.

Think of each agent as a specialist contractor. One contractor handles source schema. Another handles visual guardrails. Another rewrites the essay. They should not all touch the same files at once.

## What To Do First

Start with Wave 0 and Wave 1.

Wave 0 creates the control plane:

- Issue #1: agent path locks and PM status.

Wave 1 creates the safety rails:

- Issue #2: CI and launch-readiness checks.
- Issue #3: source schema upgrade.
- Issue #4: indicator schema and missingness taxonomy.
- Issue #5: METR/Epoch capability-horizon module.

Wave 2 should wait until the relevant safety rails exist:

- Issue #6: first 30 canonical sources.
- Issue #7: V0 claim ledger.
- Issue #8: scenario assumption browser.
- Issue #9: visual evidence guardrails.
- Issue #10: launch essay rewrite.
- Issue #11: final adversarial launch review.

## How To Start One Agent

Use this pattern:

```sh
git checkout main
git pull
git checkout -b agent/source-schema
```

Then give the agent one issue body, not the entire roadmap.

Tell it:

```text
Work only on issue #3. Stay inside docs/AGENT_LOCKS.md path rules. Do not edit unrelated files. Run validation before finishing.
```

## How To Use Worktrees

Worktrees let you run several agents without file collisions.

From the parent folder of the repo:

```sh
cd ~/Developer/AI-Carrying-Capacity
git checkout main
git pull

git worktree add ../aicc-ci -b agent/ci-launch-readiness main
git worktree add ../aicc-source-schema -b agent/source-schema main
git worktree add ../aicc-indicator-schema -b agent/indicator-schema-missingness main
git worktree add ../aicc-metr-epoch -b agent/metr-epoch-capability main
```

Open each worktree as a separate coding-agent session.

## How To Review An Agent

Before merging an agent branch, check:

- Did it stay inside its path lock?
- Did it fabricate any data?
- Did it promote staged sources without verification?
- Did it add or remove public claims?
- Did it update `docs/TASKS.md`?
- Did it update `docs/DECISIONS.md` if it changed methodology, schema, scoring, architecture, or naming?
- Did validation pass, or did it document an expected failure?

## Validation Commands

Run what exists:

```sh
python3 scripts/validate_repo.py
python3 scripts/validate_source_register.py
python3 scripts/validate_indicator_catalog.py
npm run typecheck
npm run lint
npm run build
```

Later, after issue #2 is complete, also run:

```sh
python3 scripts/check_launch_readiness.py
```

That launch-readiness script should fail until the project has reviewed canonical sources, clean public copy, and visual evidence guardrails.

## Launch Postures

Use one of these labels in `reports/PM_STATUS.md`.

| Posture | Meaning |
| --- | --- |
| Private preview | Useful for review, not evidence-backed |
| Public pilot | Source-backed enough to share as V0 |
| Evidence product | Reviewed data, validated charts, stronger methods |

Recommended current posture: **private preview**.

## What Not To Ask Agents To Do Yet

Do not ask agents to:

- create a national AI carrying-capacity score;
- rank China and the U.S. as winners or losers;
- remove TODO source markers before canonical source promotion;
- make staged visuals look like findings;
- publish or deploy without a final red-team pass;
- rely on Substack, LessWrong, or expert commentary for empirical indicator values.

## Human Decisions Needed Later

You will eventually need to decide:

1. Launch posture: private preview or public pilot.
2. Deployment domain: `aiconversion.jhyip.com`, `aicapacity.jhyip.com`, or another domain.
3. Voice of launch essay: China tech policy, political economy, AI governance, or strategic forecasting.
4. Whether to prioritize polish, source depth, or both before public sharing.
