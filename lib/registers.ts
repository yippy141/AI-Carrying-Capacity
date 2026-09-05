import { readFileSync } from "node:fs";

import { z } from "zod";

import type { AdoptionDepthObservation } from "./adoptionDepth.ts";

/**
 * Build-time readers for the canonical CSV registers.
 * Server components only. Parsing handles quoted fields with commas,
 * escaped quotes, and newlines inside quotes — enough for our own CSVs,
 * which are written by Python's csv module.
 */

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let quoteClosed = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
          quoteClosed = true;
        }
      } else {
        field += ch;
      }
    } else if (quoteClosed && ch !== ',' && ch !== '\n' && ch !== '\r') {
      throw new Error('Characters after closing CSV quote');
    } else if (ch === '"') {
      if (field !== '') throw new Error('Quote inside unquoted CSV field');
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
      quoteClosed = false;
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") {
        i += 1;
      }
      row.push(field);
      field = "";
      quoteClosed = false;
      if (row.length > 1 || row[0] !== "") {
        rows.push(row);
      }
      row = [];
    } else {
      field += ch;
    }
  }
  if (inQuotes) throw new Error("Unclosed CSV quote");
  if (field !== "" || row.length > 0) {
    row.push(field);
    if (row.length > 1 || row[0] !== "") {
      rows.push(row);
    }
  }
  return rows;
}

export function readRegister(relativePath: string): Record<string, string>[] {
  if (!/^(data|research)\/[a-zA-Z0-9_./-]+\.csv$/.test(relativePath) || relativePath.includes("..")) throw new Error("Invalid register path");
  const filePath = REGISTER_FILES[relativePath];
  if (!filePath) throw new Error("Register is outside the finite read allowlist");
  const rows = parseCsv(readFileSync(filePath, "utf8"));
  const [header, ...body] = rows;
  if (!header?.length || new Set(header).size !== header.length || header.some((h) => !h) || body.some((r) => r.length !== header.length)) throw new Error(`Malformed register: ${relativePath}`);
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
  publication_date: string;
  access_date: string;
  last_verified: string;
  translation_reviewer: string;
  translation_note: string;
  claim_owner: string;
  notes: string;
};

export function loadSourceRegister(): SourceRow[] {
  return z.array(sourceSchema).parse(readRegister("data/sources/source_register.csv"));
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
  return z.array(claimSchema).parse(readRegister("data/claims/claim_ledger.csv"));
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
  author_review_status: string;
  baseline_date: string;
  lower_bound_rationale: string;
  upper_bound_rationale: string;
  last_updated: string;
  update_history: string;
};

export function loadForecastRegister(): ForecastRow[] {
  return z.array(forecastSchema).parse(readRegister("data/forecasts/forecast_register.csv"));
}

export function loadAdoptionDepth(): AdoptionDepthObservation[] {
  return z.array(observationSchema).parse(readRegister("data/observations/adoption_depth.csv"));
}

export const safeUrl = z.string().refine((value) => {
  try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password; } catch { return false; }
}, "Expected an HTTPS source URL without credentials");

export const sourceSchema = z.object({
  source_id: z.string(),
  title_english: z.string(),
  authors_org: z.string(),
  year: z.string(),
  language: z.string(),
  source_type: z.string(),
  method_type: z.string(),
  official_claim_status: z.string(),
  independent_validation_status: z.string(),
  url_or_doi: safeUrl.or(z.literal("missing")),
  reliability_tier: z.string(),
  geo_scope: z.string(),
  sector_scope: z.string(),
  key_claims: z.string(),
  limitations: z.string(),
  review_status: z.string(),
  placeholder: z.string(),
  publication_date: z.string(),
  access_date: z.string(),
  last_verified: z.string(),
  translation_reviewer: z.string(),
  translation_note: z.string(),
  claim_owner: z.string(),
  notes: z.string()
}).passthrough();

export const claimSchema = z.object({
  claim_id: z.string(),
  claim: z.string(),
  claim_type: z.string(),
  evidence_type: z.string(),
  source_ids: z.string(),
  counterevidence_source_ids: z.string(),
  confidence: z.string(),
  geography: z.string(),
  sector: z.string(),
  product_use_status: z.string(),
  caveat: z.string(),
  owner: z.string(),
  last_reviewed: z.string(),
  notes: z.string()
}).passthrough();

export const forecastSchema = z.object({
  forecast_id: z.string(),
  question: z.string(),
  resolution_criteria: z.string(),
  resolution_source: z.string(),
  deadline: z.string(),
  initial_probability_range: z.string(),
  rationale: z.string(),
  framework_relevance: z.string(),
  update_triggers: z.string(),
  status: z.string(),
  author_review_status: z.string(),
  baseline_date: z.string(),
  lower_bound_rationale: z.string(),
  upper_bound_rationale: z.string(),
  last_updated: z.string(),
  update_history: z.string()
}).passthrough();

export const observationSchema = z.object({
  observation_id: z.string().min(1),
  geography: z.string().min(1),
  period: z.string().min(1),
  panel: z.string().min(1),
  measure: z.string().min(1),
  value: z.string().refine((s) => s.trim() !== "" && Number.isFinite(Number(s)) && Number(s) >= 0 && Number(s) <= 100, "Invalid percent"),
  unit: z.string().min(1),
  denominator: z.string().min(1),
  survey_universe: z.string().min(1),
  source_id: z.string().min(1),
  evidence_label: z.string().min(1),
  comparability_class: z.string().min(1),
  definition: z.string().min(1),
  caveat: z.string().min(1),
  last_verified: z.string().min(1)
});

const REGISTER_FILES: Record<string,string> = {
  "data/sources/source_register.csv": process.cwd() + "/data/sources/source_register.csv",
  "data/claims/claim_ledger.csv": process.cwd() + "/data/claims/claim_ledger.csv",
  "data/forecasts/forecast_register.csv": process.cwd() + "/data/forecasts/forecast_register.csv",
  "data/observations/adoption_depth.csv": process.cwd() + "/data/observations/adoption_depth.csv",
  "data/licenses/data_licenses.csv": process.cwd() + "/data/licenses/data_licenses.csv",
  "data/profiles/stage_profiles.csv": process.cwd() + "/data/profiles/stage_profiles.csv",
  "data/profiles/dimension_dispositions.csv": process.cwd() + "/data/profiles/dimension_dispositions.csv",
  "data/profiles/profile_coding_reviews.csv": process.cwd() + "/data/profiles/profile_coding_reviews.csv",
  "data/profiles/stages.csv": process.cwd() + "/data/profiles/stages.csv",
  "research/reader-edition/sources.csv": process.cwd() + "/research/reader-edition/sources.csv"
};
