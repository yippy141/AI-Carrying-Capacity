import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Build-time readers for the canonical CSV registers.
 * Server components only. Parsing handles quoted fields with commas,
 * escaped quotes, and newlines inside quotes — enough for our own CSVs,
 * which are written by Python's csv module.
 */

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") {
        i += 1;
      }
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") {
        rows.push(row);
      }
      row = [];
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.length > 1 || row[0] !== "") {
      rows.push(row);
    }
  }
  return rows;
}

function readRegister(relativePath: string): Record<string, string>[] {
  const filePath = path.join(process.cwd(), relativePath);
  const rows = parseCsv(readFileSync(filePath, "utf8"));
  const [header, ...body] = rows;
  return body.map((cells) =>
    Object.fromEntries(header.map((column, index) => [column, cells[index] ?? ""]))
  );
}

export type SourceRow = {
  source_id: string;
  title_english: string;
  authors_org: string;
  year: string;
  language: string;
  source_type: string;
  method_type: string;
  official_claim_status: string;
  independent_validation_status: string;
  url_or_doi: string;
  reliability_tier: string;
  geo_scope: string;
  sector_scope: string;
  key_claims: string;
  limitations: string;
  review_status: string;
  placeholder: string;
};

export function loadSourceRegister(): SourceRow[] {
  return readRegister("data/sources/source_register.csv") as SourceRow[];
}

export type ClaimRow = {
  claim_id: string;
  claim: string;
  claim_type: string;
  evidence_type: string;
  source_ids: string;
  counterevidence_source_ids: string;
  confidence: string;
  geography: string;
  sector: string;
  product_use_status: string;
  caveat: string;
  owner: string;
  last_reviewed: string;
  notes: string;
};

export function loadClaimLedger(): ClaimRow[] {
  return readRegister("data/claims/claim_ledger.csv") as ClaimRow[];
}

export type ForecastRow = {
  forecast_id: string;
  question: string;
  resolution_criteria: string;
  resolution_source: string;
  deadline: string;
  initial_probability_range: string;
  rationale: string;
  framework_relevance: string;
  update_triggers: string;
  status: string;
  last_updated: string;
  update_history: string;
};

export function loadForecastRegister(): ForecastRow[] {
  return readRegister("data/forecasts/forecast_register.csv") as ForecastRow[];
}
