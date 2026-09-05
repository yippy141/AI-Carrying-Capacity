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
`npm start` serves the compiled candidate at `http://127.0.0.1:3000`. The ordinary build now resolves the deployment target. Local/preview builds
retain review-preview labels; Vercel production and explicit `--production`
require the entire publication pipeline. See the production section below. The branch push also triggered the
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
| `npm run test:evidence` | 19 tests pass, including malformed CSV, missing/null ordinals, unsafe URLs, absent caveats, targets, company sources, translation, reuse and contradictory human review |
| Python discovery `scripts/*test.py` | 76 tests pass |
| Profile projection and historical reader snapshot suites | Four additional tests pass; all 62 original submissions match field for field |
| `python3 scripts/validate_repo.py` | Pass with the pinned openpyxl dependency available |
| Original historical manifests | Pass against the actual PR #42 Git snapshot; archived validator bytes match that commit |
| Current immutable data and PR scope | Pass; source/claim/license historical prefixes preserved; no wholesale expected-app-hash replacement |
| `npm run build` | Pass with Next's supported webpack builder; optimized static reader routes and retained archive routes compiled |
| Reader prebuild and rendered-content gates | Pass on six finite reading routes, four figures, ten adoption marks and three explicitly staged uses |
| `npm run build:publication` | **Expected refusal:** `Staged source reader-src-qje`; exact-use and author approval also remain pending |
| `npm run test:browser` | 14/14 Chromium tests pass, desktop 1440×1000 and mobile 390×844 |
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
390px overview, full study, evidence, operational comparison, actors, default
mechanism, eight-day added-work state and TCV loop. The [downloadable ZIP](reader-edition/reader-screenshots.zip)
contains all sixteen PNGs and a capture README.
The integration owner inspected the revised desktop/mobile frames and all paper
pages. This revision used one bounded read-only AI source pass; it did not repeat
a generalized red team or substitute model reactions for human readers. The
[print sample](reader-edition/reader-print.pdf) is a 16-page A4 tagged PDF made
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
METR-update website reuse terms remain unverified. The Nature article is CC BY
4.0, subject to third-party credit lines; its article-level terms do not clear
linked datasets or software. This revision uses a newly drawn schematic and
paraphrases with attribution, license link and identification of changes. It
reproduces no publisher image.
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

Read the [1,796-word author brief](READER_EDITION_AUTHOR_BRIEF.md). Priority:
QJE Table II/design, METR original plus 24 February update, and the TCV
task-to-plant boundary. The brief includes identification limits, actual toy
arithmetic, five claim cards, eight skeptical questions and a contribution
record. No named human specialist review, completed owner reading, interviews,
group-chat quotations or byline assent is asserted.

The ordinary Markdown paragraphs in the brief are the author-editing surface.
Their implementation mapping is `lib/readerCopy.ts`: `opening` and `motivation`
render visibly below the main/paper hero; `interpretation` renders at the closing;
`assistance` renders on About. No TypeScript/JSON editing is required of Jinhua. Personal Shanghai/Washington copy comes from the supplied account and
remains explicitly pending Jinhua's final edit. AI assistance must be reviewed
as an attribution statement, not accepted automatically.

Five outside readers' three comprehension tasks remain proposed, with **zero
performed attempts** and no model substitutes. No messages were sent. The three understanding-focused tasks in REVIEW_SET may be attempted now on
the labelled draft. New recruitment or another generalized review is not a
precondition; actual hesitation and reasoning remain unobserved. Full expert outreach,
all country rows and the larger sector/forecast backlog do not gate this edition.

Publication blockers are the finite staged source/exact-use approval, author
reading/edit, byline assent and publication permission. A separate owner choice
is root code and original-content/data licensing; a lack of blanket repository
licensing does not itself prevent publication of original prose with properly
scoped third-party uses. The public-repository/open-source wording
mismatch is real: there is no root license. Suggested separation for decision
is a permissive code license, explicitly chosen terms for original prose and
data, and source-specific third-party restrictions. No root license or project license terms were added or changed; the TCV third-party record was corrected to the verified article terms. The repository being public does not grant a reuse license.

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

## Earlier hosted PR result (before this revision)

Draft [PR #43](https://github.com/yippy141/AI-Carrying-Capacity/pull/43) is open
against main. The first hosted run on `6b0afce` passed every step, including the
browser suite: [CI run 33982796753](https://github.com/yippy141/AI-Carrying-Capacity/actions/runs/33982796753).
The final source-URL guard and verified exposure documentation are included
in the follow-up commit; the PR check displays the result for its latest head.
No merge, production release or repository-admin change has been made.

## Integrated revision: production boundary and actual tests

Revision base: the PR head was still `1dee9c186972d06b1e75ff92bb8ee192a9650d68`
at the start and before integration. No intervening work was overwritten.
The same branch/PR remains draft. This section supersedes the prior opt-in
production description; historical results above are preserved where identified.

`npm run build` enters `scripts/build_reader.ts`, which resolves the target and
runs preflight → Next compilation → rendered-output checks. VERCEL_ENV or
VERCEL_TARGET_ENV = production forces publication; conflicting review-preview
requests refuse. Explicit `npm run build -- --production` and its publication
alias enforce the same sequence outside Vercel. Missing Vercel target metadata
refuses an ambiguous build. NODE_ENV alone denotes optimization, including
optimized previews. Direct production Next compilation without pipeline context
refuses. Normal loopback local development remains available.

| Additional production test | Actual result |
| --- | --- |
| Ordinary `npm run build`, VERCEL_ENV=production, real records | Expected refusal on staged QJE source before compilation |
| Ordinary production build with review-preview override | Expected refusal; target cannot be bypassed by a preview request |
| Explicit production outside Vercel, real records | Expected refusal |
| Temporary synthetic approved sources but staged exact use | Expected refusal |
| Temporary synthetic pending author copy | Expected refusal |
| Missing/false publication permission, pending byline, pending exact-use review | Each refused separately |
| Fully approved **synthetic temporary** ordinary Vercel production build | Full preflight, real optimized compilation and rendered checks passed |
| Corrupted synthetic rendered claim after successful build | Postflight refused staged rendered output |
| Real records after fixture cleanup | Byte equality checked for uses and release review; no real approval created |

All three publication test cases pass (the fixture case exercises the individual
refusals and full compile). Final local typecheck, lint, 19 evidence tests,
76 Python tests, four profile/historical tests, repository validation, immutable
PR scope, review build, rendered checks, 14 browser tests and lockfile audit pass.
The pre-existing CI job now runs the same synthetic production suite before its
review build. The expected production refusal is a working safeguard, not a
claim that this pending release can be deployed.

If the existing Vercel production environment runs the supported repository
command with production metadata on merge, the build will refuse until real
requirements are met. **Actual hosted build-command/root-directory overrides
and system-environment settings were not available to inspect.** No production
deploy, host protection change or repository-admin change was attempted. The
observed preview sign-in boundary does not establish production configuration,
who can access the preview, or whether an authenticated hosted session works.
The guard is not designed to resist an administrator rewriting code/env/commands.

## What changed for understanding

Previously the study juxtaposed results and a toy constraint. It now explicitly
answers the narrower access-intervention question, shows the transformation of
reported relative estimates, and separates source-supported mechanisms from
analyst alternatives and frontier hypotheses. The support map locates verified
actors while leaving benefit capture unmeasured. The TCV diagram makes training,
physical deployment, objective choice and evaluation inspectable. The added-work
input permits 40→34, 40→40 and 40→42 days, with correct benefit/loss wording and
no effect on the independent station example.

The single focused source/freshness pass found no relevant correction or reliable
replacement affecting the selected historical uses. This is a bounded search
result, not proof of absence. It corrected QJE section locators, METR's forecast
wording/update title and the prior unresolved TCV rights record. Current source
verification is separate from the unchanged observation vintage and actual human
review. The exact revised language remains in the same staged release objects.

Observed/estimated empirical claims are the separate adoption findings, QJE
throughput, METR historical task time and TCV physical control. Actor geography
is source-supported description; the attribution map itself is interpretation.
Mechanisms are tagged source-supported or analyst hypothesis in uses.json.
Workflow percentages, added days and station output are hypothetical arithmetic.
No claim identifies a country effect or the marginal return to a model upgrade.

The same three comprehension tasks now require explanation: (1) state the question,
narrower answer and a measured result's upgrade limit; (2) explain the overhead
change and independent capacity assumption; (3) find a source limitation and
separate a measured operational effect from unmeasured benefit capture. TCV also
permits distinguishing live control from training/evaluation/plant requirements.
There are zero outside-human attempts; no model reviewer is called a test reader.

Remaining non-blocking limits: Chromium-only browser coverage; no real-device,
screen-reader or authenticated hosted-session testing; a browser-print paper
rather than journal typesetting; scoped source search, not systematic review;
unmeasured attribution and model-upgrade effects. These are honest boundaries,
not reasons to expand this revision. The existing archive and unselected profiles
remain intact. Proposed main check remains “Validate app and evidence guardrails”;
settings have not been changed. The PM backlog suggestion is a future matched
within-workflow model-version comparison, because that would address the
motivating upgrade question more directly. No such workstream was started.

Minor failures during this revision were corrected: a Node test environment
type mismatch, a changed CSV line's CRLF whitespace flag, mobile slider-value
wrapping and print baseline-control/diagram pagination. Final checks pass.
Node's module-type reparsing warning remains non-blocking; no runtime or build
failure is concealed by it.
