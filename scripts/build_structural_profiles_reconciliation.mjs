#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(import.meta.dirname, "..");
const auditRoot = "/tmp/ai-capacity-recon-31-20260830";

const inputs = {
  reference: path.join(
    root,
    "research/structural-profiles-pilot/worksheet/structural_profiles_reference_and_owner_review.xlsx",
  ),
  seed: path.join(
    auditRoot,
    "pr33/research/structural-profiles-pilot/submissions/seed/seed_submission_v1.xlsx",
  ),
  independent: path.join(
    auditRoot,
    "pr32/research/structural-profiles-pilot/submissions/independent/independent_submission_v1.xlsx",
  ),
};

async function loadWorkbook(filePath) {
  return SpreadsheetFile.importXlsx(await FileBlob.load(filePath));
}

async function inspectReference() {
  const previewDir = path.join(auditRoot, "reference-previews");
  await fs.mkdir(previewDir, { recursive: true });
  const workbook = await loadWorkbook(inputs.reference);

  const summary = await workbook.inspect({
    kind: "workbook,sheet,table",
    maxChars: 8000,
    tableMaxRows: 6,
    tableMaxCols: 10,
    tableMaxCellChars: 100,
  });
  console.log(summary.ndjson);

  for (const [sheetName, range] of [
    ["START_HERE", "A1:F22"],
    ["EXCEPTION_RULES", "A1:E12"],
    ["OWNER_DECISIONS", "A1:R8"],
  ]) {
    const preview = await workbook.render({
      sheetName,
      range,
      scale: 1.5,
      format: "png",
    });
    await fs.writeFile(
      path.join(previewDir, `${sheetName.toLowerCase()}.png`),
      new Uint8Array(await preview.arrayBuffer()),
    );
    const style = await workbook.inspect({
      kind: "computedStyle",
      sheetId: sheetName,
      range,
      maxChars: 6000,
    });
    console.log(style.ndjson);
  }
}

async function inspectSubmissions() {
  for (const label of ["seed", "independent"]) {
    const workbook = await loadWorkbook(inputs[label]);
    const sheets = await workbook.inspect({
      kind: "sheet",
      include: "id,name",
      maxChars: 3000,
    });
    console.log(`${label}: ${sheets.ndjson}`);
    const submission = workbook.worksheets.getItem("SUBMISSION");
    console.log(
      JSON.stringify({
        label,
        header: submission.getRange("A1:Z1").values,
        firstRows: submission.getRange("A2:Z4").values,
      }),
    );
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const headers = rows.shift();
  return rows
    .filter((values) => values.some((value) => value !== ""))
    .map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function columnName(index) {
  let value = index + 1;
  let result = "";
  while (value > 0) {
    const remainder = (value - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    value = Math.floor((value - 1) / 26);
  }
  return result;
}

function applyTitle(sheet, range, textValue) {
  const title = sheet.getRange(range);
  title.merge();
  title.values = [[textValue]];
  title.format = {
    fill: "#35495E",
    font: { bold: true, color: "#FFFFFF", size: 16, name: "Aptos Display" },
    verticalAlignment: "center",
  };
  title.format.rowHeight = 34;
}

function styleHeader(range) {
  range.format = {
    fill: "#35495E",
    font: { bold: true, color: "#FFFFFF", size: 10, name: "Aptos" },
    wrapText: true,
    verticalAlignment: "center",
    borders: { preset: "outside", style: "thin", color: "#CFD6DC" },
  };
  range.format.rowHeight = 34;
}

function styleBody(range, fill = "#E8ECEF") {
  range.format = {
    fill,
    font: { color: "#24313D", size: 10, name: "Aptos" },
    wrapText: true,
    verticalAlignment: "top",
    borders: {
      insideHorizontal: { style: "thin", color: "#CFD6DC" },
      bottom: { style: "thin", color: "#CFD6DC" },
    },
  };
}

function extractS5Clause(rationale) {
  const start = rationale.indexOf("S5:");
  if (start < 0) return rationale;
  const scopeStart = rationale.toLowerCase().indexOf("scope caveat:", start);
  return rationale.slice(start, scopeStart > start ? scopeStart : undefined).trim();
}

async function buildOwnerWorkbook() {
  const reconciliationDir = path.join(
    root,
    "research/structural-profiles-pilot/reconciliation",
  );
  const outputPath = path.join(reconciliationDir, "owner_exception_review_v1.xlsx");
  const mirrorDir = path.join(root, "outputs/issue-31");
  const previewDir = path.join(auditRoot, "owner-workbook-previews");
  await fs.mkdir(mirrorDir, { recursive: true });
  await fs.mkdir(previewDir, { recursive: true });

  const report = JSON.parse(
    await fs.readFile(path.join(reconciliationDir, "reconciliation_report_v1.json"), "utf8"),
  );
  const ownerRows = parseCsv(
    await fs.readFile(path.join(reconciliationDir, "owner_exceptions_v1.csv"), "utf8"),
  );
  const auditRows = parseCsv(
    await fs.readFile(path.join(reconciliationDir, "comparison_audit_v1.csv"), "utf8"),
  );

  const workbook = Workbook.create();
  const summary = workbook.worksheets.add("OWNER_SUMMARY");
  const exceptions = workbook.worksheets.add("OWNER_EXCEPTIONS");
  const crossCutting = workbook.worksheets.add("CROSS_CUTTING_S5");
  for (const sheet of [summary, exceptions, crossCutting]) {
    sheet.showGridLines = false;
  }

  applyTitle(summary, "A1:H1", "Structural Profiles reconciliation — owner review");
  summary.getRange("A3:B3").values = [["Comparison status", "Count"]];
  styleHeader(summary.getRange("A3:B3"));
  const statusRows = [
    ["exact_agreement", report.summary_counts.exact_agreement],
    ["one_point_difference", report.summary_counts.one_point_difference],
    ["difference_ge_2", report.summary_counts.difference_ge_2],
    ["missing_seed", report.summary_counts.missing_seed],
    ["missing_independent", report.summary_counts.missing_independent],
    ["missing_both", report.summary_counts.missing_both],
  ];
  summary.getRange("A4:B9").values = statusRows;
  styleBody(summary.getRange("A4:B9"), "#FFFFFF");
  summary.getRange("A10").values = [["Total comparisons"]];
  summary.getRange("B10").formulas = [["=SUM(B4:B9)"]];
  summary.getRange("A10:B10").format = {
    fill: "#DCEAF4",
    font: { bold: true, color: "#24313D", size: 10, name: "Aptos" },
    borders: { preset: "outside", style: "thin", color: "#CFD6DC" },
  };

  summary.getRange("D3:E3").values = [["Pinned provenance", "Recorded value"]];
  styleHeader(summary.getRange("D3:E3"));
  summary.getRange("D4:E10").values = [
    ["Branch base", "c2a5c53d586cecad4d137d459b78d432b9104870"],
    ["Seed PR #33 head", "3bc7e1d3e16d507fe7374ae66a3af6eace519ca4"],
    ["Seed coder", "Claude Code / Claude Opus 5"],
    ["Independent PR #32 head", "86dbff4aab694d413a33d3c4a8b0d28047d73c2f"],
    ["Independent coder", "Codex / GPT-5.6; reasoning_effort=extra_high"],
    ["Owner exceptions", ownerRows.length],
    ["Routine fusion reviews", report.routine_domain_reviews.length],
  ];
  styleBody(summary.getRange("D4:E10"), "#FFFFFF");

  summary.getRange("A12:H13").merge();
  summary.getRange("A12:H13").values = [[
    "Systematic source gap: both submissions have blank canonical source_ids on 31 of 31 profiles. This is counted, not expanded into 155 owner exceptions. It routes only where the exception table records a material load-bearing, low-confidence, scope-sensitive, or disputed judgment.",
  ]];
  summary.getRange("A12:H13").format = {
    fill: "#DCEAF4",
    font: { color: "#24313D", size: 10, name: "Aptos" },
    wrapText: true,
    verticalAlignment: "center",
  };
  summary.getRange("A15:H17").merge();
  summary.getRange("A15:H17").values = [[
    "Owner action: review only the OWNER_EXCEPTIONS rows and the single cross-cutting S5 convention question. Allowed row dispositions are prefer_seed, prefer_independent, preserve_disagreement, needs_domain_review, and needs_better_evidence. No decision is prefilled, and no row is approved or canonicalized by this workbook.",
  ]];
  summary.getRange("A15:H17").format = {
    fill: "#FFF2CC",
    font: { bold: true, color: "#24313D", size: 10, name: "Aptos" },
    wrapText: true,
    verticalAlignment: "center",
  };
  summary.getRange("A19:H20").merge();
  summary.getRange("A19:H20").values = [[
    "Fable is credited as framework architect, not as the row-level coder. Both provenance correction commits were verified metadata-only: no original S-value or rationale changed.",
  ]];
  summary.getRange("A19:H20").format = {
    fill: "#FFFFFF",
    font: { italic: true, color: "#24313D", size: 10, name: "Aptos" },
    wrapText: true,
    verticalAlignment: "center",
  };
  summary.getRange("A:A").format.columnWidth = 27;
  summary.getRange("B:B").format.columnWidth = 13;
  summary.getRange("C:C").format.columnWidth = 3;
  summary.getRange("D:D").format.columnWidth = 25;
  summary.getRange("E:E").format.columnWidth = 52;
  summary.getRange("F:H").format.columnWidth = 14;
  summary.freezePanes.freezeRows(3);

  const exceptionHeaders = [
    "exception_id",
    "profile_id",
    "stage / workflow",
    "sector",
    "pathway / lifecycle",
    "application context",
    "dimension / rubric",
    "comparison status",
    "difference",
    "flags / routing reason",
    "seed identity",
    "seed value",
    "seed confidence",
    "seed sources",
    "seed rationale",
    "independent identity",
    "independent value",
    "independent confidence",
    "independent sources",
    "independent rationale",
    "review route",
    "owner disposition",
    "owner rationale",
  ];
  applyTitle(
    exceptions,
    "A1:W1",
    `Owner-routed exceptions only — ${ownerRows.length} dimension comparisons`,
  );
  exceptions.getRange("A2:W2").merge();
  exceptions.getRange("A2:W2").values = [[
    "Gray cells preserve generated context and both original submissions. Yellow cells are the only owner-editable fields. Blank source cells are missing, not zero or agreement.",
  ]];
  exceptions.getRange("A2:W2").format = {
    fill: "#DCEAF4",
    font: { color: "#24313D", size: 10, name: "Aptos" },
    wrapText: true,
  };
  exceptions.getRange("A3:W3").values = [exceptionHeaders];
  styleHeader(exceptions.getRange("A3:W3"));
  const exceptionValues = ownerRows.map((row) => [
    row.exception_id,
    row.profile_id,
    `${row.stage_id} — ${row.workflow}`,
    row.sector,
    `${row.pathway_id} / ${row.lifecycle_phase}`,
    row.application_context,
    `${row.s_dimension}: ${row.dimension_name}\n0: ${row.zero_endpoint}\n2: ${row.two_guidance}\n4: ${row.four_endpoint}`,
    row.comparison_status,
    row.numeric_difference === "" ? null : Number(row.numeric_difference),
    `${row.semantic_flags}\n${row.routing_reason}`,
    `${row.seed_coder_name} / ${row.seed_coder_model}\n${row.seed_review_id}`,
    row.seed_value === "" ? null : Number(row.seed_value),
    row.seed_confidence,
    row.seed_source_ids,
    row.seed_rationale,
    `${row.independent_coder_name} / ${row.independent_coder_model}\nreasoning_effort=${row.independent_reasoning_effort}\n${row.independent_review_id}`,
    row.independent_value === "" ? null : Number(row.independent_value),
    row.independent_confidence,
    row.independent_source_ids,
    row.independent_rationale,
    row.review_route,
    null,
    null,
  ]);
  const exceptionLastRow = 3 + exceptionValues.length;
  exceptions.getRange(`A4:W${exceptionLastRow}`).values = exceptionValues;
  styleBody(exceptions.getRange(`A4:U${exceptionLastRow}`));
  styleBody(exceptions.getRange(`V4:W${exceptionLastRow}`), "#FFF2CC");
  exceptions.getRange(`V4:V${exceptionLastRow}`).dataValidation = {
    rule: {
      type: "list",
      values: [
        "prefer_seed",
        "prefer_independent",
        "preserve_disagreement",
        "needs_domain_review",
        "needs_better_evidence",
      ],
    },
  };
  exceptions.getRange(`I4:I${exceptionLastRow}`).format.numberFormat = "0";
  exceptions.getRange(`L4:L${exceptionLastRow}`).format.numberFormat = "0";
  exceptions.getRange(`Q4:Q${exceptionLastRow}`).format.numberFormat = "0";
  exceptions.getRange(`A4:W${exceptionLastRow}`).format.rowHeight = 330;
  const exceptionWidths = [
    18, 12, 30, 25, 38, 52, 68, 23, 11, 54, 34, 11, 15, 18, 82, 38, 14, 18, 18,
    82, 26, 24, 42,
  ];
  exceptionWidths.forEach((width, index) => {
    exceptions.getRange(`${columnName(index)}:${columnName(index)}`).format.columnWidth = width;
  });
  exceptions.freezePanes.freezeRows(3);
  exceptions.freezePanes.freezeColumns(2);
  const exceptionTable = exceptions.tables.add(
    `A3:W${exceptionLastRow}`,
    true,
    "OwnerExceptionsTable",
  );
  exceptionTable.showFilterButton = true;

  const s5Rows = auditRows.filter(
    (row) => row.s_dimension === "S5" && Number(row.numeric_difference) > 0,
  );
  applyTitle(crossCutting, "A1:J1", "Cross-cutting S5 boundary-allocation question");
  crossCutting.getRange("A3:J4").merge();
  crossCutting.getRange("A3:J4").values = [[
    "Should S5 assess (a) locally contained errors only, or (b) the reasonably foreseeable consequences of an erroneous stage output escaping that stage into deployment, operations, qualification, or licensed operation? Reconciliation preserves every original value and applies neither rule silently.",
  ]];
  crossCutting.getRange("A3:J4").format = {
    fill: "#DCEAF4",
    font: { bold: true, color: "#24313D", size: 11, name: "Aptos" },
    wrapText: true,
    verticalAlignment: "center",
  };
  crossCutting.getRange("A6:B7").values = [
    ["Option A", "locally_contained_errors_only"],
    ["Option B", "include_reasonably_foreseeable_escaped_consequences"],
  ];
  styleBody(crossCutting.getRange("A6:B7"), "#FFFFFF");
  crossCutting.getRange("A6:B7").format.rowHeight = 30;
  crossCutting.getRange("D6:E7").values = [
    ["Seed S5 higher", 18],
    ["Seed S5 lower", 1],
  ];
  styleBody(crossCutting.getRange("D6:E7"), "#FFFFFF");
  crossCutting.getRange("G6:H7").values = [
    ["S5 equal", 12],
    ["Two-point gaps", 2],
  ];
  styleBody(crossCutting.getRange("G6:H7"), "#FFFFFF");
  crossCutting.getRange("A9").values = [["Owner convention choice"]];
  crossCutting.getRange("B9:E9").merge();
  crossCutting.getRange("F9").values = [["Post-reconciliation route"]];
  crossCutting.getRange("G9:J9").merge();
  crossCutting.getRange("A9:A9").format = { fill: "#DCEAF4", font: { bold: true, color: "#24313D" } };
  crossCutting.getRange("F9:F9").format = { fill: "#DCEAF4", font: { bold: true, color: "#24313D" } };
  styleBody(crossCutting.getRange("B9:E9"), "#FFF2CC");
  styleBody(crossCutting.getRange("G9:J9"), "#FFF2CC");
  crossCutting.getRange("B9:E9").dataValidation = {
    rule: {
      type: "list",
      values: [
        "locally_contained_errors_only",
        "include_reasonably_foreseeable_escaped_consequences",
      ],
    },
  };
  crossCutting.getRange("A11:J11").merge();
  crossCutting.getRange("A11:J11").values = [[
    "These 19 affected rows remain original audit records. Only rows independently meeting an owner-routing trigger appear in OWNER_EXCEPTIONS.",
  ]];
  crossCutting.getRange("A11:J11").format = {
    fill: "#FFFFFF",
    font: { italic: true, color: "#24313D", size: 10, name: "Aptos" },
    wrapText: true,
  };
  const s5Headers = [
    "profile_id",
    "stage / workflow",
    "sector",
    "seed S5",
    "independent S5",
    "difference",
    "seed rationale",
    "independent rationale",
    "owner exception?",
    "exception id",
  ];
  crossCutting.getRange("A13:J13").values = [s5Headers];
  styleHeader(crossCutting.getRange("A13:J13"));
  const ownerByKey = new Map(
    ownerRows.map((row) => [`${row.profile_id}:${row.s_dimension}`, row.exception_id]),
  );
  const s5Values = s5Rows.map((row) => {
    const exceptionId = ownerByKey.get(`${row.profile_id}:S5`) ?? "";
    return [
      row.profile_id,
      `${row.stage_id} — ${row.workflow}`,
      row.sector,
      Number(row.seed_value),
      Number(row.independent_value),
      Number(row.numeric_difference),
      extractS5Clause(row.seed_rationale),
      extractS5Clause(row.independent_rationale),
      exceptionId ? "yes" : "no — cross-cutting only",
      exceptionId,
    ];
  });
  const s5LastRow = 13 + s5Values.length;
  crossCutting.getRange(`A14:J${s5LastRow}`).values = s5Values;
  styleBody(crossCutting.getRange(`A14:J${s5LastRow}`));
  crossCutting.getRange(`D14:F${s5LastRow}`).format.numberFormat = "0";
  crossCutting.getRange(`A14:J${s5LastRow}`).format.rowHeight = 72;
  [14, 32, 25, 12, 18, 12, 86, 86, 25, 20].forEach((width, index) => {
    crossCutting.getRange(`${columnName(index)}:${columnName(index)}`).format.columnWidth = width;
  });
  crossCutting.freezePanes.freezeRows(13);
  const s5Table = crossCutting.tables.add(`A13:J${s5LastRow}`, true, "S5AffectedRowsTable");
  s5Table.showFilterButton = true;

  const summaryInspect = await workbook.inspect({
    kind: "table",
    range: "OWNER_SUMMARY!A1:H20",
    include: "values,formulas",
    tableMaxRows: 24,
    tableMaxCols: 10,
    maxChars: 9000,
  });
  console.log(summaryInspect.ndjson);
  const exceptionInspect = await workbook.inspect({
    kind: "table",
    range: `OWNER_EXCEPTIONS!A1:W${Math.min(exceptionLastRow, 8)}`,
    include: "values,formulas",
    tableMaxRows: 8,
    tableMaxCols: 23,
    maxChars: 10000,
  });
  console.log(exceptionInspect.ndjson);
  const formulaErrors = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 300 },
    summary: "final formula error scan",
  });
  console.log(formulaErrors.ndjson);

  for (const [sheetName, range, fileName] of [
    ["OWNER_SUMMARY", "A1:H20", "owner_summary.png"],
    ["OWNER_EXCEPTIONS", `A1:W${exceptionLastRow}`, "owner_exceptions.png"],
    ["CROSS_CUTTING_S5", `A1:J${s5LastRow}`, "cross_cutting_s5.png"],
  ]) {
    const preview = await workbook.render({
      sheetName,
      range,
      scale: sheetName === "OWNER_SUMMARY" ? 1.5 : 1,
      format: "png",
    });
    await fs.writeFile(
      path.join(previewDir, fileName),
      new Uint8Array(await preview.arrayBuffer()),
    );
  }

  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(outputPath);
  await output.save(path.join(mirrorDir, "owner_exception_review_v1.xlsx"));
  console.log(`Saved ${outputPath}`);
}

if (process.argv.includes("--inspect-reference")) {
  await inspectReference();
} else if (process.argv.includes("--inspect-submissions")) {
  await inspectSubmissions();
} else if (process.argv.includes("--build-owner-workbook")) {
  await buildOwnerWorkbook();
} else {
  throw new Error(
    "Pass --inspect-reference, --inspect-submissions, or --build-owner-workbook.",
  );
}
