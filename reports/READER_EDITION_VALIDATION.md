# Reader edition validation and handoff

6 September 2026. Release candidate on `release/first-reader-edition`, based on
merged PR [#42](https://github.com/yippy141/AI-Carrying-Capacity/pull/42), commit
`5dcf523e250b1989a92c034d8f4e40706df94051`. This report records model-assisted
engineering and evidence checks, not author assent, outside-reader feedback,
specialist validation or authorization to publish.

## What the reader can do

1. **Overview → adoption → original source.** Learn the question and the ECB's
   supported starting result (33% very infrequent/experimental, 7% significant
   use), then find the survey population, 98% category sum and source. Census
   breadth and Eurostat size remain separate; NBS stays unplotted.
2. **Operational outcomes → workflow experiment.** Compare the QJE customer
   support result with METR's historical developer experiment, retain distinct
   outcomes and designs, then change a hypothetical stage or dependency. The
   default project moves from 40 to 34 days while repeated output stays at four
   accepted units/week. Improving other stages can change both conclusions.
3. **Fusion → evidence → paper.** Trace physical TCV control to its demonstrated
   task, choose what additional evidence could change the conclusion, and use
   the paper/print view with direct source references and caveats.

Reader routes are `/`, `/paper`, `/evidence`, `/methods`, `/about`, `/findings`.
`npm start` serves the compiled candidate at `http://127.0.0.1:3000`. The default
build explicitly sets review-preview mode. The branch push also triggered the
repository’s **existing Vercel integration**, which created a
[hosted preview](https://ai-carrying-capacity-git-release-firs-c3cec8-yippy141s-projects.vercel.app).
A fresh request without credentials/cookies returned HTTP 302 to
`https://vercel.com/sso-api` on 6 September 2026, without serving the study.
`/paper` and `/evidence` also returned HTTP 302 without credentials. See
[exposure check](reader-edition/hosted-preview-check.json).
This verifies a sign-in boundary at that URL; it does not establish who has
access or test an authenticated hosted session. No new hosting/authentication
service was configured. Noindex does not protect access. GitHub, this
report, staged research, screenshots and the author brief are public. The
profile layer has no downloadable app route but is publicly readable in Git.

## Actual local results

| Check | Result |
| --- | --- |
| `npm run typecheck` | Pass |
| `npm run lint` | Pass, zero ESLint warnings |
| `npm run test:evidence` | 17 tests pass, including malformed CSV, missing/null ordinals, unsafe URLs, absent caveats, targets, company sources, translation, reuse and contradictory human review |
| Python discovery `scripts/*test.py` | 76 tests pass |
| Profile projection and historical reader snapshot suites | Four additional tests pass; all 62 original submissions match field for field |
| `python3 scripts/validate_repo.py` | Pass with the pinned openpyxl dependency available |
| Original historical manifests | Pass against the actual PR #42 Git snapshot; archived validator bytes match that commit |
| Current immutable data and PR scope | Pass; source/claim/license historical prefixes preserved; no wholesale expected-app-hash replacement |
| `npm run build` | Pass with Next's supported webpack builder; optimized static reader routes and retained archive routes compiled |
| Reader prebuild and rendered-content gates | Pass on six finite reading routes, four figures, ten adoption marks and three explicitly staged uses |
| `npm run build:publication` | **Expected refusal:** `Staged source reader-src-qje`; exact-use and author approval also remain pending |
| `npm run test:browser` | 12/12 Chromium tests pass, desktop 1440×1000 and mobile 390×844 |
| Dependency audit | Zero known vulnerabilities against the actual lockfile; 443 dependency records in npm's audit response |
| `git diff --check` | Pass |

Browser checks cover the three journeys, correct arithmetic, keyboard sliders
and radio buttons, reset, changing the affected stage, skip link, reduced-motion
preference, no-JavaScript default explanation, six-route accessibility scans,
horizontal overflow, internal/source destinations, archive routes, SVG/PNG
adoption export and PNG exports for the other three figures. All six reader
routes had zero axe WCAG A/AA findings at both viewport sizes. This does not
establish universal accessibility or screen-reader usability. Browser coverage
is Chromium only; no Safari, Firefox or real-device claim is made.

Actual captures are in [screenshots](reader-edition/screenshots/): desktop and
390px overview, full study, evidence, operational comparison and mechanism.
The integration owner inspected rendered desktop/mobile frames and paper pages;
the bounded read-only reviewer inspected the requested screenshot set. The
[print sample](reader-edition/reader-print.pdf) is a 13-page A4 tagged PDF made
by Chromium from `/paper`, with direct original-source links. It is a readable
browser print rendition, not a typeset journal article or PDF/UA certification.

Audit evidence: [npm JSON](reader-edition/dependency-audit.json).
Lockfile SHA-256:
`668231d7831c19daf3a61d2f379632d91655c542f28ee2082c74d4768aadb717`.
The audit is a point-in-time advisory database check, not proof that the software
has no exploitable defect. Hosted PR CI status is recorded below after dispatch.

## Failures found and corrected

The initial dependency audit reported eight vulnerabilities (seven high, one
moderate). Next and affected build dependencies were updated within the
existing framework, and the final locked audit reports zero. Font downloads
failed during the initial build; the same font families now come from pinned
local Fontsource packages with OFL notices. Turbopack encountered a restricted
worker-port failure in this environment. The supported webpack build passed;
local development uses webpack as well. None of these failures is described as
a successful Turbopack run.

The bounded engineering review found two P1 issues: hardcoded staged figure
status could suppress approved figures during publication, and an inconsistent
approved-use record could imply author review in preview. Figure status now
comes from exact-use status, publication runs a post-build rendered gate, and
contradictory human-review state fails in every mode. Targeted regressions pass;
the same read-only reviewer confirmed both corrections. No other P0/P1 was
reported in that bounded review. It is not a substitute for human comprehension
testing. A print-panel orphan was corrected after inspecting the rendered PDF.

## Claim classes and remaining restrictions

**Observations:** the canonical source-specific adoption responses; the QJE
deployment's reported throughput estimate; METR's randomized historical task
time estimate; and TCV's demonstrated control result. The last three exact
authored uses remain drafts. QJE uses staggered-rollout difference-in-differences,
not a main-sample randomized trial. METR's 2026 update limits transfer to current
tools and participation/task selection. Neither study estimates a national effect.

**Interpretations:** capability and complements may affect different stages;
task effects require a workflow and beneficiary account before a national
capacity inference; a control result is insufficient to establish a plant-level
effect. These are scoped readings and questions, not measured causal coefficients.

**Scenarios:** all Figure 3 inputs, speed/capacity multipliers, days, units/week,
dependencies and calculated changes are hypothetical. No benchmark or S mark
calibrates them. The plant-evidence interaction describes evidence requirements,
not probabilities, an energy date or a forecast.

See [finite exact-use review set](../research/reader-edition/REVIEW_SET.md) and
`uses.json` for version, locator, outcome, sample, uncertainty, quality and
transfer limits. QJE commercial reuse remains outside the CC BY-NC scope.
METR-update reuse terms and Nature publisher-figure/data reuse are not cleared;
this edition uses original paraphrases, citations and limited reported facts.
It redistributes no papers, publisher graphics or source datasets. The exact
NBS translated number remains blocked pending native-language human review.
Other multilingual fusion, company/target, STEP freshness, DIII-D generalization
and planned IFMIF-DONES qualification uses retain their original restrictions.
No absent bank result is treated as universal absence or planned exposure as an
accepted qualification dataset.

## Security and release boundary

No analytics, account system, chatbot, database, externally hosted font, tracking
service or authentication system was added. Browser checks observed no external
requests during figure export; font assets are local. Headers include noindex,
nosniff, a restrictive permissions policy, frame denial, and a same-origin CSP.
The CSP still allows inline scripts/styles for Next hydration and styling;
nonces/hashes are not claimed. Rendered strings use React escaping. Source URL
validation permits HTTPS without embedded credentials and rejects executable
or insecure schemes; CSV paths use a fixed allowlist. No fetch-on-user-URL or
new server API was introduced. No confidential client/employer material was
added. This is a static reader surface with preserved existing archive routes.

Workflow permission is `contents: read`; checkout does not retain credentials.
Proposed required main-branch check: **Validate app and evidence guardrails**.
Repository administration has not been changed. The package-specific scope
check is not a permanent ban on future approved application work. Original
raw submissions, accepted research records and historical manifests remain
immutable; current runtime and publication invariants are separate.

## Author handoff and limited owner decisions

Read the [1,648-word author brief](READER_EDITION_AUTHOR_BRIEF.md). Priority:
QJE Table II/design, METR original plus 24 February update, and the TCV
task-to-plant boundary. The brief includes identification limits, actual toy
arithmetic, four claim cards, eight skeptical questions and a contribution
record. No named human specialist review, completed owner reading, interviews,
group-chat quotations or byline assent is asserted.

Exact first-person edit locations are `lib/readerCopy.ts`: `opening`,
`motivation`, `interpretation`, `assistance` (and the `state` label). The first
three render in the main/paper author introduction; assistance renders on
About. Personal Shanghai/Washington copy comes from the supplied account and
remains explicitly pending Jinhua's final edit. AI assistance must be reviewed
as an attribution statement, not accepted automatically.

Five outside readers' three comprehension tasks remain proposed, with **zero
performed attempts** and no model substitutes. No messages were sent. Reader
recipients/channels have been requested so invitations can go to actual people
and the record can capture their hesitation. Full expert outreach,
all country rows and the larger sector/forecast backlog do not gate this edition.

Only two substantive owner choices remain: adopt/edit the finite claims and
author statement before deciding merge/publication; choose root code and
original-content/data license terms. The public-repository/open-source wording
mismatch is real: there is no root license. Suggested separation for decision
is a permissive code license, explicitly chosen terms for original prose and
data, and source-specific third-party restrictions. No license was added or
changed. The repository being public does not grant a reuse license.

## Proposed portfolio entry — not published

**Frontier Is Not Fate — tracing AI capability through actual work.** An
interactive research study connecting source-specific adoption evidence, two
operational studies, a transparent workflow experiment and a fusion control
case. It distinguishes measured results from conditional mechanisms and shows
where claims stop. Authorship and release claims are pending Jinhua's final edit.

Verified project link: [AI-Carrying-Capacity](https://github.com/yippy141/AI-Carrying-Capacity).
Use [draft PR #43](https://github.com/yippy141/AI-Carrying-Capacity/pull/43) and
its screenshots as the public review link until a publication is authorized. A localhost URL is not a public portfolio demo. No portfolio
repository was opened for modification or changed.

## Hosted PR result

Draft [PR #43](https://github.com/yippy141/AI-Carrying-Capacity/pull/43) is open
against main. The first hosted run on `6b0afce` passed every step, including the
browser suite: [CI run 33982796753](https://github.com/yippy141/AI-Carrying-Capacity/actions/runs/33982796753).
The final source-URL guard and verified exposure documentation are included
in the follow-up commit; the PR check displays the result for its latest head.
No merge, production release or repository-admin change has been made.
