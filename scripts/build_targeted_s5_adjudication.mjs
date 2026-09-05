#!/usr/bin/env node
/** Build issue #41's bounded S5 adjudication CSVs and review workbook. */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};
const defaultRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const root = path.resolve(argValue("--repo-root", defaultRoot));
const previewDir = path.resolve(argValue("--preview-dir", path.join(root, "outputs", "s5-adjudication")));
const reconciliationDir = path.join(root, "research", "structural-profiles-pilot", "reconciliation");
const domainDir = path.join(root, "research", "structural-profiles-pilot", "domain-review");
const outputDir = path.join(root, "research", "structural-profiles-pilot", "adjudication");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  if (quoted) throw new Error("Unterminated quoted CSV field");
  if (value.length || row.length) {
    row.push(value.replace(/\r$/, ""));
    rows.push(row);
  }
  const [headers, ...records] = rows;
  return records.filter((record) => record.some((cell) => cell !== "")).map((record) =>
    Object.fromEntries(headers.map((header, index) => [header, record[index] ?? ""])),
  );
}

const csvEscape = (value) => {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

function serializeCsv(headers, rows) {
  return `${[headers, ...rows.map((row) => headers.map((header) => row[header] ?? ""))]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n")}\n`;
}

async function readCsv(file) {
  return parseCsv(await fs.readFile(file, "utf8"));
}

const decisions = {
  "sp-0001": {
    selected: "3", outcome: "selected_provisional_pending_named_expert", confidence: "medium",
    boundary: "Independent architecture or design-authority review before implementation commitments are authorized.",
    boundaryNotes: "Detection must test requirements, interfaces, and trade-offs; the reviewer must be able to reject the design before implementation. A different team label is insufficient where reviewers share the same assumptions or evidence.",
    direct: "Misdirected design analysis, dependency planning, and reversible engineering rework undertaken before the architecture review acts.",
    excluded: "Implementation, deployment, or user harm that requires the independent architecture review and later verification or release controls to fail.",
    sourceGap: "No exact-stage canonical source on mature-software architecture review, boundary independence, or pre-review rework severity.",
    packageId: "EXP-SW-01",
    revisit: "Obtain a mature production-software architecture/change record identifying reviewer independence, rejection authority, review timing, and rework before approval.",
    notes: "Select the seed value 3: bounded consequences are meaningful but remain reversible engineering rework before an assumed design-authority boundary.",
  },
  "sp-0002": {
    selected: "3", outcome: "selected_provisional_pending_named_expert", confidence: "medium",
    boundary: "Independent verification, code review, and change-control gate before release or deployment.",
    boundaryNotes: "The boundary must exercise detection independent of the implementation path and have authority to block promotion. Tests generated from the same mistaken assumptions may be correlated and do not establish independence by themselves.",
    direct: "Failed builds, integration breakage, and reversible code or configuration rework before verification and change control block release.",
    excluded: "Production outage, data loss, or customer harm that requires independent verification and release controls to miss or authorize the defect.",
    sourceGap: "No exact-stage canonical source on mature-software implementation rework or the independence and effectiveness of verification/change-control gates.",
    packageId: "EXP-SW-01",
    revisit: "Obtain a mature codebase change history linking implementation errors to independently detected pre-release rework and escaped-defect paths.",
    notes: "Select the independent value 3: version control preserves reversibility, while escaped implementation errors can still impose meaningful integration rework before the next independent gate.",
  },
  "sp-0003": {
    selected: "2", outcome: "selected_provisional_pending_named_expert", confidence: "medium",
    boundary: "Independent release authorization and production canary-health or rollback control able to stop wider rollout.",
    boundaryNotes: "A checklist alone is not independent assurance. Detection must use evidence not produced solely by the same verification logic, authority must include stopping release, and timing must precede broad exposure; shared tests and monitors create correlated-failure risk.",
    direct: "A false negative or incorrect validation can release a defect, create material rework, and cause bounded canary or early-user service impact before independent release monitoring stops expansion.",
    excluded: "Broad or prolonged service harm that requires release authorization, canary detection, rollback, and later operations controls to fail separately.",
    sourceGap: "No exact-stage canonical source on mature-software false-negative consequences or the independence of release and canary controls.",
    packageId: "EXP-SW-01",
    revisit: "Review production change records that connect verification false negatives to release scope, detection timing, rollback authority, and consequence before containment.",
    notes: "Select S5=2 in line with the owner disposition; 4 excludes a reasonably foreseeable escaped defect, while the non-safety-critical scope and bounded release controls do not justify the bottom anchors.",
  },
  "sp-0004": {
    selected: "1", outcome: "selected_provisional_pending_named_expert", confidence: "medium",
    boundary: "Independent runtime health monitoring and rollback or incident-command authority able to halt the rollout.",
    boundaryNotes: "The monitor must detect failure modes beyond the deployment controller's own success signal and the operator must be able to stop or reverse rollout promptly. Shared telemetry or automation can create correlated blind spots.",
    direct: "A bounded production outage, failed migration, limited data corruption, or recovery work before independent monitoring and rollback halt the rollout.",
    excluded: "Extended outage, widespread data loss, or downstream business harm requiring monitoring, rollback, backup, or incident-command controls to fail independently.",
    sourceGap: "No exact-stage canonical source on rollback effectiveness, migration reversibility, or change-failure consequences in the frozen mature-software scope.",
    packageId: "EXP-SW-01",
    revisit: "Obtain staged-deployment incident evidence with blast radius, detection source, halt authority, rollback outcome, and any irreversible data effect.",
    notes: "Select the independent value 1: errors can reach live state and be partly irreversible before a real runtime control acts, despite progressive rollout and rollback.",
  },
  "sp-0005": {
    selected: "1", outcome: "selected_provisional_pending_named_expert", confidence: "medium",
    boundary: "Independent observability alarm plus incident-command, change-approval, or automated safety control able to stop and reverse the operational action.",
    boundaryNotes: "Monitoring must be independent of the operator's mistaken diagnosis and paired with authority to isolate or roll back. Common telemetry, runbooks, or automation can correlate detection failure with the original error.",
    direct: "Extended incident duration, bounded service outage, lost or corrupted data, and recovery burden before independent detection and command contain the action.",
    excluded: "Remote service cascades or prolonged losses requiring independent observability, incident command, backup, or dependent-service controls to fail separately.",
    sourceGap: "No exact-stage canonical source on mature-software operational error consequences, recovery success, or independence of incident controls.",
    packageId: "EXP-SW-01",
    revisit: "Obtain post-incident records separating the erroneous operational action, independent detection, containment authority, timing, and direct loss before containment.",
    notes: "Select the independent value 1: an error acts on live state and can impose irreversible data or user consequences before containment, even when rollback is often available.",
  },
  "sp-0008": {
    selected: "2", outcome: "selected_provisional_pending_named_expert", confidence: "medium",
    boundary: "Independent tool tryout, first-article inspection, and supplier or material acceptance before commissioning or production release.",
    boundaryNotes: "The acceptance function must measure the delivered tool or supply independently and have authority to reject it before line release. Supplier self-certification or the same engineering sign-off may be correlated rather than independent.",
    direct: "Scrapped or recut tooling, lost material, repeat procurement, and schedule delay incurred before first-article or supplier acceptance rejects the output.",
    excluded: "Production defects, customer harm, or line-wide losses that require independent tryout, acceptance, commissioning, and quality controls to fail later.",
    sourceGap: "No exact-stage canonical source on tooling rework cost, supplier qualification failure, or the independence of first-article acceptance in the frozen NPI pathway.",
    packageId: "EXP-MFG-01",
    revisit: "Obtain NPI records with tool or supplier error, first independent detection, rejection authority, elapsed rework, and loss before production release.",
    notes: "Select the independent value 2: tooling mistakes can be expensive and partly irreversible, but the next acceptance boundary ordinarily contains them before wider production consequences.",
  },
  "sp-0011": {
    range: ["1", "2"], outcome: "preserved_range", confidence: "low",
    boundary: "Independent in-process stop or inspection and downstream quality-release control before the affected lot leaves controlled production.",
    boundaryNotes: "Independence depends on separate sensors, sampling, personnel, and stop authority. Control and inspection that share measurements, models, or management pressure may fail together; timing determines the defect-lot size.",
    direct: "Scrap, rework, a bounded defective lot, localized equipment damage, or worker exposure before an independent stop or quality-release control acts.",
    excluded: "Customer or regulated-product harm requiring independent downstream quality release, traceability, or product-specific safety controls to fail.",
    sourceGap: "No exact-stage canonical source resolves the typical defect-lot, equipment, or safety consequence before independent process and quality controls in the frozen manufacturing scope.",
    packageId: "EXP-MFG-01",
    revisit: "Obtain representative process-control excursions with sensor independence, stop authority, detection timing, lot size, damage, and containment outcome.",
    notes: "Preserve 1-2: the frozen scope admits both material contained process loss and low-tolerance equipment or safety consequences, and the record does not establish a representative independent boundary.",
  },
  "sp-0012": {
    range: ["1", "2"], outcome: "preserved_range", confidence: "low",
    boundary: "Independent shipment-release review, downstream incoming inspection, or field traceability and containment control.",
    boundaryNotes: "Many plants have no uniform second assurance boundary after QA. Independence requires separate evidence and authority to quarantine output; shared sampling plans or gauges create correlated false-acceptance risk, and late detection expands the consequence.",
    direct: "False rejection and scrap, or release of a bounded defect population causing customer disruption and field containment before an independent downstream check acts.",
    excluded: "Safety-critical or regulated-product harm outside the frozen scope, and remote customer harm requiring later traceability, containment, or product-specific safety controls to fail.",
    sourceGap: "No exact-stage canonical source establishes a representative post-QA independent boundary, escape rate, defect-lot consequence, or containment performance.",
    packageId: "EXP-MFG-01",
    revisit: "Obtain production QA escape cases with product class, sampling method, independent release or incoming check, detection timing, affected population, and containment result.",
    notes: "Preserve 1-2: false acceptance has direct externality, but the non-regulated frozen scope and variable post-QA boundary do not justify a single point.",
  },
  "sp-0013": {
    range: ["1", "2"], outcome: "preserved_range", confidence: "low",
    boundary: "Independent post-maintenance functional or safety verification and restart authorization before sustained production resumes.",
    boundaryNotes: "The checker must use an independent test and possess stop authority. A self-check by the same maintainer or a restart signal using the same faulty instrumentation is not independent; incomplete verification can correlate with the repair error.",
    direct: "Extended downtime, repeat repair, localized equipment damage, lost output, or bounded safety exposure before independent post-maintenance verification stops restart.",
    excluded: "Sustained production defects, wider worker or customer harm, and remote line cascades requiring restart verification and later process or quality controls to fail.",
    sourceGap: "No exact-stage canonical source resolves typical post-maintenance verification independence or the consequence distribution in the frozen manufacturing pathway.",
    packageId: "EXP-MFG-01",
    revisit: "Obtain maintenance error and restart records with checker independence, test coverage, stop authority, detection timing, damage, downtime, and safety consequence.",
    notes: "Preserve 1-2: direct physical and safety consequences can be serious, but isolation and independent restart checks often contain them; current rationales do not justify a universal point.",
  },
  "sp-0014": {
    range: ["2", "3"], outcome: "preserved_range", confidence: "low",
    sourceGap: "No canonical source establishes the receiving design authority, independence of its review, or the loss incurred before that review.",
    notes: "Adopt the merged domain-review range. Reversible design rework may be cheap or material, and the assumed boundary is not verified.",
  },
  "sp-0015": {
    selected: "3", outcome: "selected_provisional", confidence: "medium",
    sourceGap: "Canonical sources support narrow simulation use but do not verify the independent model/use-validation boundary or quantify escaped-error loss.",
    notes: "Select the merged domain-review point 3: reruns are reversible, but a wrong output can directly misdirect immediate work before independent use validation.",
  },
  "sp-0020": {
    range: ["0", "1"], outcome: "preserved_range", confidence: "low",
    packageId: "EXP-FUS-02",
    sourceGap: "gap-02 remains open: planned irradiation and examination do not establish completed accepted qualification or a verified independent material-acceptance boundary.",
    notes: "Preserve the merged 0-1 range pending named qualification review; do not treat a correctly failed specimen as an erroneous stage output or import later plant accidents.",
  },
  "sp-0023": {
    range: ["1", "2"], outcome: "preserved_range", confidence: "low",
    packageId: "EXP-FUS-02",
    sourceGap: "gap-03 remains open: planned exposure capability does not establish combined-environment qualification or a verified PFC acceptance/protection boundary.",
    notes: "Preserve the merged 1-2 range pending named PFC assurance review; the record does not resolve test-article loss versus later operating harm.",
  },
  "sp-0024": {
    selected: "1", outcome: "selected_provisional_pending_named_expert", confidence: "low",
    packageId: "EXP-FUS-03",
    sourceGap: "gap-04 remains open: no integrated self-sufficient fuel-cycle result or verified development confinement/accountancy boundary exists.",
    notes: "Select the owner-preferred and domain-reviewed point 1 provisionally; serious local loss or contamination is bounded by assumed secondary controls, which still require named review.",
  },
  "sp-0025": {
    selected: "1", outcome: "selected_provisional_pending_named_expert", confidence: "low",
    packageId: "EXP-FUS-03",
    sourceGap: "gap-05 remains open: future TBM plans do not establish qualified integrated blanket performance or a concept-specific independent test boundary.",
    notes: "Select the owner-preferred and domain-reviewed point 1 provisionally; direct test harm is serious but later plant cascades require separate failures.",
  },
  "sp-0028": {
    selected: "1", outcome: "selected_provisional_pending_named_expert", confidence: "low",
    packageId: "EXP-FUS-04",
    sourceGap: "gap-06 remains open: research-device milestones do not establish nuclear/tritium commissioning performance or independently verified pilot interlocks.",
    notes: "Select the owner-preferred and domain-reviewed point 1 provisionally; correctly discovered faults are informative, while erroneous startup can damage installed hardware before assumed controls act.",
  },
  "sp-0029": {
    selected: "1", outcome: "selected_provisional_pending_named_expert", confidence: "low",
    packageId: "EXP-FUS-04",
    sourceGap: "gap-07 remains open: no commercial reliability or availability result, accepted protocol, or verified readiness/protection boundary exists.",
    notes: "Select the owner-preferred and domain-reviewed point 1 provisionally; informative component failure is excluded, while erroneous test conduct or inference can waste irrecoverable evidence.",
  },
  "sp-0030": {
    range: ["0", "2"], outcome: "preserved_disagreement", confidence: "low",
    packageId: "EXP-FUS-05",
    sourceGap: "gap-08 remains open: legal status is known, but no comparable completed licensing case or verified jurisdiction-specific post-licence independent boundary exists.",
    notes: "Preserve the owner's 0-2 disagreement and the domain-review recommendation. Do not manufacture 1 as midpoint consensus across materially different boundary interpretations.",
  },
  "sp-0031": {
    selected: "1", outcome: "selected_provisional_pending_named_expert", confidence: "low",
    packageId: "EXP-FUS-06",
    sourceGap: "gap-09 remains open: no observed magnetic-confinement grid-export case or independently validated utility/plant protection architecture exists.",
    notes: "Select the owner-preferred and domain-reviewed point 1 provisionally; direct local equipment/network consequences count, while remote cascades require additional protection failures.",
  },
};

const adjudicationHeaders = [
  "profile_id", "stage_id", "workflow", "sector", "pathway_id",
  "seed_review_id", "seed_s5", "seed_rationale", "seed_source_ids",
  "independent_review_id", "independent_s5", "independent_rationale", "independent_source_ids",
  "comparison_status", "owner_exception_id", "owner_disposition", "owner_rationale", "owner_decision_state",
  "domain_review_recommendation", "domain_review_confidence", "domain_review_disposition",
  "selected_s5", "recommended_low", "recommended_high", "adjudication_outcome", "adjudication_confidence",
  "next_independent_boundary", "boundary_independence_status", "boundary_independence_notes",
  "bounded_direct_consequence", "excluded_later_consequences", "source_ids", "source_gap", "unresolved_gap_ids",
  "human_expert_package_id", "canonical_approval_blocker", "draft_use_blocker", "draft_use_status",
  "coding_as_of", "last_reviewed", "revisit_triggers", "adjudicated_by", "adjudicator_model", "reasoning_effort", "notes",
];

const planHeaders = [
  "expert_package_id", "sector", "theme", "profile_ids", "dimension_cells", "review_questions", "why_load_bearing",
  "source_ids", "requested_expertise", "named_reviewer", "status", "open_gap_ids", "open_gap_status",
  "canonical_approval_blocker", "draft_use_blocker", "draft_use_status", "pursuit_timing", "notes",
];

const [backlog, seedRows, independentRows, ownerRows, domainRows, expertRows] = await Promise.all([
  readCsv(path.join(reconciliationDir, "targeted_s5_adjudication_backlog_v1.csv")),
  readCsv(path.join(reconciliationDir, "seed_submission_v1.csv")),
  readCsv(path.join(reconciliationDir, "independent_submission_v1.csv")),
  readCsv(path.join(reconciliationDir, "owner_decisions_v1.csv")),
  readCsv(path.join(domainDir, "fusion_dimension_review_v1.csv")),
  readCsv(path.join(domainDir, "fusion_human_expert_queue_v1.csv")),
]);

const byProfile = (rows) => new Map(rows.map((row) => [row.profile_id, row]));
const seedByProfile = byProfile(seedRows);
const independentByProfile = byProfile(independentRows);
const ownerByProfile = new Map(ownerRows.filter((row) => row.s_dimension === "S5").map((row) => [row.profile_id, row]));
const domainByProfile = new Map(domainRows.filter((row) => row.dimension === "S5").map((row) => [row.profile_id, row]));

if (backlog.length !== 19 || Object.keys(decisions).length !== 19) throw new Error("Exactly 19 S5 decisions are required");

const adjudications = backlog.map((backlogRow) => {
  const profileId = backlogRow.profile_id;
  const seed = seedByProfile.get(profileId);
  const independent = independentByProfile.get(profileId);
  const owner = ownerByProfile.get(profileId) ?? {};
  const domain = domainByProfile.get(profileId);
  const decision = decisions[profileId];
  if (!seed || !independent || !decision) throw new Error(`Missing protected input or decision for ${profileId}`);
  const range = decision.range ?? ["", ""];
  const sourceIds = domain?.source_ids === "missing" ? "" : (domain?.source_ids ?? "");
  const hasExpert = Boolean(decision.packageId);
  const canonicalBlocks = [];
  if (hasExpert) canonicalBlocks.push("pending_named_expert");
  if (!sourceIds || decision.sourceGap) canonicalBlocks.push("source_or_boundary_evidence_gap");
  canonicalBlocks.push("profile_population_and_owner_canonical_approval_not_performed");
  return {
    profile_id: profileId,
    stage_id: backlogRow.stage_id,
    workflow: backlogRow.workflow,
    sector: backlogRow.sector,
    pathway_id: backlogRow.pathway_id,
    seed_review_id: seed.review_id,
    seed_s5: seed.S5,
    seed_rationale: seed.rationale,
    seed_source_ids: seed.source_ids,
    independent_review_id: independent.review_id,
    independent_s5: independent.S5,
    independent_rationale: independent.rationale,
    independent_source_ids: independent.source_ids,
    comparison_status: backlogRow.comparison_status,
    owner_exception_id: owner.exception_id ?? "",
    owner_disposition: owner.owner_disposition ?? "",
    owner_rationale: owner.owner_rationale ?? "",
    owner_decision_state: owner.decision_state ?? "",
    domain_review_recommendation: domain ? (domain.recommended_low === domain.recommended_high ? domain.recommended_low : `${domain.recommended_low}-${domain.recommended_high}`) : "",
    domain_review_confidence: domain?.recommendation_confidence ?? "",
    domain_review_disposition: domain?.disposition ?? "",
    selected_s5: decision.selected ?? "",
    recommended_low: range[0],
    recommended_high: range[1],
    adjudication_outcome: decision.outcome,
    adjudication_confidence: decision.confidence,
    next_independent_boundary: decision.boundary ?? domain.s5_next_boundary,
    boundary_independence_status: domain?.s5_boundary_status ?? "assumed_not_verified",
    boundary_independence_notes: decision.boundaryNotes ?? `The merged domain review marks this boundary ${domain.s5_boundary_status}; named review is required where flagged to test detection, authority, timing, and correlated-failure concerns.`,
    bounded_direct_consequence: decision.direct ?? domain.s5_bounded_consequence,
    excluded_later_consequences: decision.excluded ?? domain.s5_excluded_consequences,
    source_ids: sourceIds,
    source_gap: decision.sourceGap,
    unresolved_gap_ids: domain?.unresolved_gap_ids === "none" ? "" : (domain?.unresolved_gap_ids ?? ""),
    human_expert_package_id: decision.packageId ?? "",
    canonical_approval_blocker: canonicalBlocks.join(";"),
    draft_use_blocker: "none",
    draft_use_status: "allowed_for_private_use_staged_wp2_and_public_pilot_only_as_EXPERT-CODED_DRAFT_with_range_confidence_gaps_visible",
    coding_as_of: "2026-09-03",
    last_reviewed: "2026-09-03",
    revisit_triggers: decision.revisit ?? domain.revisit_trigger,
    adjudicated_by: "Codex Desktop",
    adjudicator_model: "gpt-5.6-sol",
    reasoning_effort: "xhigh",
    notes: decision.notes,
  };
});

const packageDefinitions = {
  "EXP-FUS-01": ["Fusion, magnetic confinement", "Experiment campaigns, plasma control and machine protection", "gap-01"],
  "EXP-FUS-02": ["Fusion, magnetic confinement", "Materials qualification and plasma-facing components", "gap-02;gap-03"],
  "EXP-FUS-03": ["Fusion, magnetic confinement", "Tritium and blankets", "gap-04;gap-05"],
  "EXP-FUS-04": ["Fusion, magnetic confinement", "Commissioning and reliability", "gap-06;gap-07"],
  "EXP-FUS-05": ["Fusion, magnetic confinement", "Licensing and regulation", "gap-08"],
  "EXP-FUS-06": ["Fusion, magnetic confinement", "Grid integration and protection", "gap-09"],
};

const uniqueJoined = (values) => [...new Set(values.filter(Boolean))].join(";");
const plans = Object.entries(packageDefinitions).map(([packageId, [sector, theme, gapIds]]) => {
  const rows = expertRows.filter((row) => row.expert_package_id === packageId);
  return {
    expert_package_id: packageId,
    sector,
    theme,
    profile_ids: uniqueJoined(rows.map((row) => row.profile_id)),
    dimension_cells: rows.map((row) => `${row.profile_id}/${row.dimension}`).join(";"),
    review_questions: rows.map((row) => row.question_for_expert).join(" | "),
    why_load_bearing: rows.map((row) => row.why_load_bearing).join(" | "),
    source_ids: uniqueJoined(rows.flatMap((row) => row.source_ids === "missing" ? [] : row.source_ids.split(";"))) || "missing",
    requested_expertise: uniqueJoined(rows.map((row) => row.requested_expertise)),
    named_reviewer: "missing",
    status: "pending_named_specialist",
    open_gap_ids: gapIds,
    open_gap_status: "open",
    canonical_approval_blocker: "true",
    draft_use_blocker: "false",
    draft_use_status: "allowed for private use, staged WP2, and a public pilot only as EXPERT-CODED · DRAFT with range, confidence, gaps, and review status visible",
    pursuit_timing: "before canonical approval; not before staged WP2 or labelled draft display",
    notes: "Retained unchanged from the merged fusion domain review; package-level coordination does not merge away its exact cell questions.",
  };
});

plans.push(
  {
    expert_package_id: "EXP-SW-01",
    sector: "Software engineering",
    theme: "Mature production-software architecture, verification, deployment, and SRE/operations",
    profile_ids: "sp-0001;sp-0002;sp-0003;sp-0004;sp-0005",
    dimension_cells: "sp-0001/S5;sp-0002/S5;sp-0003/S5;sp-0004/S5;sp-0005/S5",
    review_questions: "For each frozen mature non-safety-critical software stage, where is the next genuinely independent design, verification, release, monitoring, rollback, or incident-control boundary; what can it detect, what authority can halt progression, when does it act, and what direct consequence occurs before it? Do the provisional S5 points 3, 3, 2, 1, and 1 remain justified without counting later control failures twice?",
    why_load_bearing: "All five rows lack exact-stage canonical support, and independence may be weakened when implementation, tests, telemetry, deployment automation, and incident response share assumptions or failure modes.",
    source_ids: "missing",
    requested_expertise: "Mature production-software architect; verification and release engineer; deployment/SRE and incident-operations practitioner",
    named_reviewer: "missing",
    status: "pending_named_specialist",
    open_gap_ids: "not_applicable",
    open_gap_status: "not_applicable",
    canonical_approval_blocker: "true",
    draft_use_blocker: "false",
    draft_use_status: "allowed for private use, staged WP2, and a public pilot only as EXPERT-CODED · DRAFT with range, confidence, gaps, and review status visible",
    pursuit_timing: "before canonical approval; not before staged WP2 or labelled draft display",
    notes: "New issue #41 package. It validates bounded S5 consequences and boundary independence; it does not expand the frozen software scope or search broadly for evidence.",
  },
  {
    expert_package_id: "EXP-MFG-01",
    sector: "Discrete manufacturing",
    theme: "Discrete-manufacturing NPI, tooling, process control, quality, and maintenance",
    profile_ids: "sp-0008;sp-0011;sp-0012;sp-0013",
    dimension_cells: "sp-0008/S5;sp-0011/S5;sp-0012/S5;sp-0013/S5",
    review_questions: "For tooling/supply, running-line control, production QA, and maintenance/restart in the frozen medium-to-high-volume NPI pathway, what is the next genuinely independent tryout, inspection, release, stop, or restart boundary; what detection and authority does it have; when does it act; and do the provisional 2 plus preserved 1-2 ranges correctly bound direct cost, equipment, worker, and defect-lot consequences?",
    why_load_bearing: "The four rows lack exact-stage canonical support, and shared sensors, self-certification, sampling plans, or same-team restart checks can make nominally separate controls correlated rather than independent.",
    source_ids: "missing",
    requested_expertise: "Discrete-manufacturing NPI/tooling and supplier-quality practitioner; process-control and production-quality engineer; industrial maintenance and restart-safety specialist",
    named_reviewer: "missing",
    status: "pending_named_specialist",
    open_gap_ids: "not_applicable",
    open_gap_status: "not_applicable",
    canonical_approval_blocker: "true",
    draft_use_blocker: "false",
    draft_use_status: "allowed for private use, staged WP2, and a public pilot only as EXPERT-CODED · DRAFT with range, confidence, gaps, and review status visible",
    pursuit_timing: "before canonical approval; not before staged WP2 or labelled draft display",
    notes: "New issue #41 package. It validates bounded S5 consequences and boundary independence; it does not expand the frozen manufacturing scope or treat regulated products as the generic pathway.",
  },
);

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(path.join(outputDir, "targeted_s5_adjudication_v1.csv"), serializeCsv(adjudicationHeaders, adjudications));
await fs.writeFile(path.join(outputDir, "three_anchor_human_review_plan_v1.csv"), serializeCsv(planHeaders, plans));

const workbook = Workbook.create();
const sheetNames = ["Start Here", "Adjudication", "Software", "Manufacturing", "Fusion", "Unresolved", "Expert Packages"];
const sheets = Object.fromEntries(sheetNames.map((name) => [name, workbook.worksheets.add(name)]));
const colors = {
  ink: "#17211F", paper: "#FAF8F2", teal: "#1E655C", lightTeal: "#DDEBE7",
  amber: "#9A5A12", lightAmber: "#F4E8D1", red: "#8B3A32", lightRed: "#F1DEDA", line: "#D5D1C8", white: "#FFFFFF",
};

function titleBlock(sheet, title, subtitle, endColumn) {
  sheet.showGridLines = false;
  sheet.getRange(`A1:${endColumn}1`).merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange(`A2:${endColumn}2`).merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A1:${endColumn}2`).format = { fill: colors.paper, font: { color: colors.ink }, wrapText: true };
  sheet.getRange("A1").format = { fill: colors.teal, font: { color: colors.white, bold: true, size: 18 }, rowHeight: 30 };
  sheet.getRange("A2").format = { fill: colors.lightTeal, font: { color: colors.ink, italic: true, size: 10 }, rowHeight: 38, wrapText: true };
}

function columnName(index) {
  let result = "";
  let value = index + 1;
  while (value) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

const numericFields = new Set(["seed_s5", "independent_s5", "selected_s5", "recommended_low", "recommended_high"]);
const dateFields = new Set(["coding_as_of", "last_reviewed"]);
function workbookValue(field, value) {
  if (value === "") return null;
  if (numericFields.has(field)) return Number(value);
  if (dateFields.has(field)) return new Date(`${value}T00:00:00Z`);
  return value;
}

function writeTableSheet(sheet, title, subtitle, headers, rows, tableName) {
  const lastColumn = columnName(headers.length - 1);
  titleBlock(sheet, title, subtitle, lastColumn);
  const matrix = [headers, ...rows.map((row) => headers.map((header) => workbookValue(header, row[header] ?? "")))];
  const range = sheet.getRange(`A4:${lastColumn}${rows.length + 4}`);
  range.values = matrix;
  sheet.getRange(`A4:${lastColumn}4`).format = {
    fill: colors.ink, font: { color: colors.white, bold: true, size: 9 },
    wrapText: true, rowHeight: 34, verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: colors.line },
  };
  if (rows.length) {
    const dataRowHeight = tableName === "S5AdjudicationTable" ? 320 : tableName === "ExpertPackagePlan" ? 220 : 120;
    sheet.getRange(`A5:${lastColumn}${rows.length + 4}`).format = {
      font: { color: colors.ink, size: 9 }, wrapText: true, verticalAlignment: "top",
      borders: { insideHorizontal: { style: "thin", color: colors.line } }, rowHeight: dataRowHeight,
    };
  }
  const table = sheet.tables.add(`A4:${lastColumn}${rows.length + 4}`, true, tableName);
  table.style = "TableStyleMedium2";
  table.showBandedRows = true;
  table.showFilterButton = true;
  sheet.freezePanes.freezeRows(4);
  sheet.freezePanes.freezeColumns(2);
  headers.forEach((header, index) => {
    const col = columnName(index);
    let width = 16;
    if (["seed_rationale", "independent_rationale", "owner_rationale", "boundary_independence_notes", "bounded_direct_consequence", "excluded_later_consequences", "source_gap", "revisit_triggers", "notes", "review_questions", "why_load_bearing", "requested_expertise"].includes(header)) width = 48;
    else if (["profile_id", "seed_s5", "independent_s5", "selected_s5", "recommended_low", "recommended_high"].includes(header)) width = 12;
    else if (["stage_id", "pathway_id", "adjudication_outcome", "canonical_approval_blocker", "draft_use_status", "dimension_cells"].includes(header)) width = 28;
    else if (["next_independent_boundary", "theme", "pursuit_timing"].includes(header)) width = 36;
    sheet.getRange(`${col}4:${col}${rows.length + 4}`).format.columnWidth = width;
    if (dateFields.has(header)) sheet.getRange(`${col}5:${col}${rows.length + 4}`).format.numberFormat = "yyyy-mm-dd";
    if (numericFields.has(header)) sheet.getRange(`${col}5:${col}${rows.length + 4}`).format.numberFormat = "0";
  });
}

const viewHeaders = [
  "profile_id", "workflow", "sector", "seed_s5", "independent_s5", "owner_disposition",
  "domain_review_recommendation", "selected_s5", "recommended_low", "recommended_high",
  "adjudication_outcome", "adjudication_confidence", "next_independent_boundary",
  "bounded_direct_consequence", "excluded_later_consequences", "source_ids", "source_gap",
  "unresolved_gap_ids", "human_expert_package_id", "canonical_approval_blocker", "draft_use_blocker", "draft_use_status", "notes",
];

writeTableSheet(
  sheets.Adjudication,
  "Targeted S5 adjudication — complete preserved record",
  "Exactly 19 frozen backlog rows. Original model values, full rationales, owner decisions, bounded consequences, and non-approval status are retained; no averages or sector scores.",
  adjudicationHeaders,
  adjudications,
  "S5AdjudicationTable",
);
writeTableSheet(sheets.Software, "Software S5 view", "Frozen mature production-software scope; five targeted rows only.", viewHeaders, adjudications.filter((row) => row.sector === "Software engineering"), "SoftwareS5View");
writeTableSheet(sheets.Manufacturing, "Manufacturing S5 view", "Frozen medium-to-high-volume discrete NPI and operations scope; four targeted rows only.", viewHeaders, adjudications.filter((row) => row.sector === "Discrete manufacturing"), "ManufacturingS5View");
writeTableSheet(sheets.Fusion, "Fusion S5 view", "Ten targeted tokamak rows using the merged model-domain review; all inherited evidence limits and nine gaps remain open.", viewHeaders, adjudications.filter((row) => row.sector === "Fusion, magnetic confinement"), "FusionS5View");
writeTableSheet(sheets.Unresolved, "Unresolved point selection", "Seven adjudicated rows retain a range or disagreement; pending named review of selected provisional points is tracked separately as a canonical-approval blocker.", viewHeaders, adjudications.filter((row) => !row.selected_s5), "UnresolvedS5View");
writeTableSheet(sheets["Expert Packages"], "Three-anchor human review plan", "Six retained fusion outreach packages plus one software and one manufacturing package. These block canonical approval, not staged WP2 or visibly labelled draft display.", planHeaders, plans, "ExpertPackagePlan");

const start = sheets["Start Here"];
titleBlock(start, "Issue #41 · Targeted S5 adjudication checkpoint", "Reviewed qualitative adjudication, not observation, not a production profile, and not canonical approval. Read this sheet first; use filters in the detail sheets.", "H");
start.getRange("A4:B4").values = [["Control", "Value"]];
start.getRange("A5:B13").values = [
  ["Backlog coverage", null],
  ["Point selections", null],
  ["Range/disagreement forms", null],
  ["Software rows", null],
  ["Manufacturing rows", null],
  ["Fusion rows", null],
  ["Expert packages", null],
  ["Fusion empirical gaps", 9],
  ["Canonical profile approvals", 0],
];
start.getRange("B5").formulas = [["=COUNTA('Adjudication'!$A$5:$A$23)"]];
start.getRange("B6").formulas = [["=COUNTIF('Adjudication'!$V$5:$V$23,\"<>\")"]];
start.getRange("B7").formulas = [["=B5-B6"]];
start.getRange("B8").formulas = [["=COUNTIF('Adjudication'!$D$5:$D$23,\"Software engineering\")"]];
start.getRange("B9").formulas = [["=COUNTIF('Adjudication'!$D$5:$D$23,\"Discrete manufacturing\")"]];
start.getRange("B10").formulas = [["=COUNTIF('Adjudication'!$D$5:$D$23,\"Fusion, magnetic confinement\")"]];
start.getRange("B11").formulas = [["=COUNTA('Expert Packages'!$A$5:$A$12)"]];
start.getRange("A4:B13").format = { wrapText: true, borders: { insideHorizontal: { style: "thin", color: colors.line }, outside: { style: "thin", color: colors.line } } };
start.getRange("A4:B4").format = { fill: colors.ink, font: { color: colors.white, bold: true } };
start.getRange("A5:A13").format = { fill: colors.lightTeal, font: { color: colors.ink, bold: true } };
start.getRange("B5:B13").format = { font: { color: colors.ink, bold: true, size: 12 }, numberFormat: "0" };
start.getRange("D4:H4").merge();
start.getRange("D4").values = [["Decision and use boundary"]];
start.getRange("D5:H12").values = [
  ["Rule", "Count direct, reasonably foreseeable consequences of an erroneous stage output only until the next genuinely independent assurance or control boundary.", null, null, null],
  ["Independence", "Check detection, authority, timing, and correlated failure. A different organizational label alone is not independence.", null, null, null],
  ["No midpoint", "No value is averaged or chosen as midpoint consensus. Preserve range or disagreement where the record does not justify a point.", null, null, null],
  ["Canonical blocker", "Named-expert questions, source/boundary gaps, owner canonical approval, and production-profile population remain unresolved as recorded.", null, null, null],
  ["Draft use", "Those blockers do not prevent private use, staged WP2 construction, or public-pilot display visibly labelled EXPERT-CODED · DRAFT with range, confidence, gaps, and status visible.", null, null, null],
  ["Fusion gaps", "gap-01 through gap-09 remain open. Adjudication does not convert programme targets, legal status, or proof of concept into missing empirical outcomes.", null, null, null],
  ["Protected scope", "No production data/profiles row, C1-C8, governance, UI, figure, forecast, scenario, coupling, or WP2 implementation is created or changed.", null, null, null],
  ["Next gate", "One substantive PM review, one bounded correction, P0/P1 recheck, merge; then begin WP2 proposed/staged profile construction in one batch.", null, null, null],
];
start.getRange("D4:H4").format = { fill: colors.ink, font: { color: colors.white, bold: true } };
start.getRange("D5:D12").format = { fill: colors.lightAmber, font: { color: colors.amber, bold: true }, wrapText: true };
start.getRange("E5:H12").merge(true);
start.getRange("E5:H12").format = { fill: colors.white, wrapText: true, verticalAlignment: "top", borders: { insideHorizontal: { style: "thin", color: colors.line } }, rowHeight: 44 };
start.getRange("A15:H15").merge();
start.getRange("A15").values = [["Navigation: Adjudication = complete preserved record · sector sheets = review views · Unresolved = rows without a point · Expert Packages = eight canonical-approval review packages."]];
start.getRange("A15:H15").format = { fill: colors.lightRed, font: { color: colors.red, bold: true }, wrapText: true, rowHeight: 34 };
start.getRange("A1:A15").format.columnWidth = 24;
start.getRange("B1:B15").format.columnWidth = 16;
start.getRange("C1:C15").format.columnWidth = 3;
start.getRange("D1:D15").format.columnWidth = 24;
start.getRange("E1:H15").format.columnWidth = 20;
start.freezePanes.freezeRows(3);

await fs.mkdir(previewDir, { recursive: true });
const previewRanges = {
  "Start Here": "A1:H15",
  Adjudication: "A1:AS23",
  Software: "A1:W9",
  Manufacturing: "A1:W8",
  Fusion: "A1:W14",
  Unresolved: "A1:W11",
  "Expert Packages": "A1:R12",
};
for (const [sheetName, range] of Object.entries(previewRanges)) {
  const inspect = await workbook.inspect({ kind: "table", range: `${sheetName}!${range}`, include: "values,formulas", tableMaxRows: 5, tableMaxCols: 12, maxChars: 2500 });
  console.log(`INSPECT ${sheetName}\n${inspect.ndjson}`);
  const preview = await workbook.render({ sheetName, range, scale: sheetName === "Adjudication" ? 0.3 : 0.6, format: "png" });
  await fs.writeFile(path.join(previewDir, `${sheetName.toLowerCase().replaceAll(" ", "-")}.png`), new Uint8Array(await preview.arrayBuffer()));
}
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 300 }, summary: "final formula error scan" });
console.log(`FORMULA_ERRORS\n${errors.ndjson}`);

const workbookFile = await SpreadsheetFile.exportXlsx(workbook);
await workbookFile.save(path.join(outputDir, "targeted_s5_adjudication_v1.xlsx"));
console.log(`Built 19 adjudication rows, 8 expert packages, and workbook at ${outputDir}`);
