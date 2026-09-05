import { readFileSync } from 'node:fs';
import { z } from 'zod';
import { loadAdoptionDepth, loadClaimLedger, loadSourceRegister, readRegister, sourceSchema, safeUrl, type SourceRow } from './registers.ts';

export const EDITION_DATE = '2026-09-06';
export const READER_ROUTES = ['/', '/paper', '/evidence', '/methods', '/about', '/findings'] as const;
export type EditionMode = 'review-preview' | 'publication';
export function editionMode(): EditionMode {
  const value = process.env.READER_EDITION_MODE;
  if (value && value !== 'review-preview' && value !== 'publication') throw new Error('Invalid edition mode');
  return value === 'review-preview' ? value : 'publication';
}
const text = z.string().min(1);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const useSchema = z.object({
  id: text, sourceIds: z.array(text).min(1), legacyClaimIds: z.array(text),
  kind: z.enum(['observation', 'interpretation', 'scenario']),
  status: z.enum(['staged', 'approved', 'rejected']),
  exactUse: z.enum(['operational_summary', 'fusion_control_summary']),
  title: text, claim: text, panel: text, value: z.number().finite().nullable(), unit: text,
  comparison: text, sample: text, period: text, tools: text, design: text,
  uncertainty: text, quality: text, caveat: text, locator: text, reviewer: text,
  humanReview: z.enum(['not_recorded', 'author_reviewed']),
  translation: z.enum(['not_applicable', 'pending', 'reviewed']),
  companyOrTarget: z.enum(['research_result', 'company_report', 'official_target', 'company_target']),
  reuse: z.enum(['reported_facts_only', 'dataset', 'publisher_figure']), licenseId: text,
  verificationDate: date, revisit: text
}).strict();
export type ReaderUse = z.infer<typeof useSchema>;
const licenseSchema = z.object({ license_id: text, verification_status: z.enum(['cleared','citation_only','needs_review','prohibited']), intended_use: text, license_name: text, license_url: text, redistribution_allowed: text }).passthrough();
export type UseLicense = z.infer<typeof licenseSchema>;
export type DisplayUse = ReaderUse & { sources: SourceRow[]; license: UseLicense; displayReview: string; restrictions: string[] };

export function projectUse(input: unknown, sources: SourceRow[], licenses: UseLicense[], mode: EditionMode): DisplayUse {
  const use = useSchema.parse(input);
  if (use.status === 'approved' && use.humanReview !== 'author_reviewed') throw new Error('Approved use contradicts recorded human review');
  const resolved = use.sourceIds.map((id) => {
    const source = sources.find((s) => s.source_id === id);
    if (!source) throw new Error(`Unknown source ${id}`);
    safeUrl.parse(source.url_or_doi);
    if (source.placeholder !== 'false' || ['superseded','rejected'].includes(source.review_status)) throw new Error(`Ineligible source ${id}`);
    if (!['reviewed','canonical','staged'].includes(source.review_status)) throw new Error(`Unknown source review ${id}`);
    if (mode === 'publication' && !['reviewed','canonical'].includes(source.review_status)) throw new Error(`Staged source ${id}`);
    if (source.reliability_tier === 'C' || source.reliability_tier === 'D' || source.reliability_tier === 'E' || /company|operator/.test(source.source_type)) throw new Error(`Company/commentary source cannot support this empirical use: ${id}`);
    if (/target|programme/.test(source.official_claim_status) || use.companyOrTarget !== 'research_result') throw new Error('Target cannot become an observed research result');
    const english = ['en','English'].includes(source.language);
    const actualTranslationReview = !/missing|not_applicable|agent|model|recommended|pending/i.test(source.translation_reviewer);
    if ((!english && (use.translation !== 'reviewed' || !actualTranslationReview)) || use.translation === 'pending') throw new Error(`Load-bearing translation blocked: ${id}`);
    if (/refresh the original STEP page/.test(source.notes)) throw new Error('Source freshness restriction blocks use');
    return source;
  });
  const license = licenses.find((l) => l.license_id === use.licenseId);
  if (!license || ['needs_review','prohibited'].includes(license.verification_status)) throw new Error('Missing or blocked use license');
  if (use.reuse !== 'reported_facts_only' && (license.verification_status !== 'cleared' || license.redistribution_allowed !== 'true')) throw new Error('Dataset/figure redistribution not cleared');
  if (use.status === 'rejected') throw new Error('Rejected claim use');
  if (mode === 'publication' && (use.status !== 'approved' || use.humanReview !== 'author_reviewed')) throw new Error(`Exact use awaits release review: ${use.id}`);
  return { ...use, sources: resolved, license, displayReview: use.status === 'staged' ? 'Draft for release review · author reading pending' : 'Exact use approved by author', restrictions: resolved.map((s) => s.limitations) };
}

const ordinal = z.string().regex(/^[0-4]$/).transform(Number);
export const nullableOrdinal = z.union([z.literal('').transform(() => null), ordinal]);
export const dimensionSchema = z.object({
  disposition_id: text, profile_id: text, dimension: z.enum(['S1','S2','S3','S4','S5']),
  selected_value: nullableOrdinal, selection_basis: z.enum(['historical_provisional_selection','no_selected_value']),
  seed_review_id: text, independent_review_id: text,
  submitted_low: ordinal, submitted_high: ordinal,
  recommendation_low: nullableOrdinal, recommendation_high: nullableOrdinal,
  comparison_status: text, historical_disposition: text, domain_review_id: z.string(), owner_exception_id: z.string(),
  source_ids: z.string(), confidence: z.enum(['low','medium','high']), human_review_state: z.literal('named_specialist_review_not_recorded'), history_path: text, gap: text, revisit_trigger: text
}).strict().superRefine((d, ctx) => {
  if (d.submitted_low > d.submitted_high || (d.recommendation_low !== null && d.recommendation_high !== null && d.recommendation_low > d.recommendation_high)) ctx.addIssue({code:'custom',message:'Inverted qualitative range'});
  if ((d.selected_value === null) !== (d.selection_basis === 'no_selected_value')) ctx.addIssue({code:'custom',message:'Selection basis contradicts missingness'});
  if (d.selected_value !== null && d.dimension !== 'S5') ctx.addIssue({code:'custom',message:'No new dimension selection authorized'});
});
export const profileSchema = z.object({
  profile_id: text, stage_id: text, parent_stage_id: text, pathway_id: text, sector: text, workflow: text,
  application_context: text, lifecycle_phase: text, critical_path_role: z.literal('not_assessed'),
  S1: nullableOrdinal, S2: nullableOrdinal, S3: nullableOrdinal, S4: nullableOrdinal, S5: nullableOrdinal,
  evidence_basis: z.literal('expert-coded'), coding_status: z.enum(['proposed','disputed']), review_status: z.literal('staged'),
  approved_by: z.literal(''), selected_review_ids: z.string(), coding_as_of: date, last_reviewed: date, version: z.literal('1.1')
}).passthrough();
const submissionSchema = z.object({review_id:text,profile_id:text,coder_type:z.literal('model'),coder_role:text,coder_name:text,coder_model:text,S1:ordinal,S2:ordinal,S3:ordinal,S4:ordinal,S5:ordinal,rationale:text,source_ids:z.string(),coding_as_of:date,submitted_at:text,submission_status:z.literal('submitted'),notes:text}).strict();
function unique(values: string[], name: string) { if (values.length !== new Set(values).size) throw new Error(`Duplicate ${name}`); }
export function loadStagedProfiles() {
  const profiles = z.array(profileSchema).length(31).parse(readRegister('data/profiles/stage_profiles.csv'));
  const dimensions = z.array(dimensionSchema).length(155).parse(readRegister('data/profiles/dimension_dispositions.csv'));
  const submissions = z.array(submissionSchema).length(62).parse(readRegister('data/profiles/profile_coding_reviews.csv'));
  unique(profiles.map(p=>p.profile_id),'profile'); unique(dimensions.map(d=>d.disposition_id),'dimension'); unique(submissions.map(r=>r.review_id),'review');
  const stages = readRegister('data/profiles/stages.csv');
  for (const p of profiles) {
    const stage = stages.find(s=>s.stage_id===p.stage_id);
    if (!stage || stage.parent_stage_id!==p.parent_stage_id) throw new Error('Invalid profile hierarchy');
    const ds = dimensions.filter(d=>d.profile_id===p.profile_id);
    if (ds.length!==5 || new Set(ds.map(d=>d.dimension)).size!==5) throw new Error('Missing dimension disposition');
    for (const d of ds) {
      if (p[d.dimension] !== d.selected_value) throw new Error('Selected value detached from disposition');
      for (const id of [d.seed_review_id,d.independent_review_id]) {
        const review=submissions.find(r=>r.review_id===id);
        if (!review || review.profile_id!==p.profile_id) throw new Error('Detached submission');
      }
    }
  }
  return { profiles, dimensions, submissions, displayLabel: 'Analyst assessment · AI-assisted', humanReview: 'Named specialist review not recorded' };
}

export function loadReaderEdition(mode: EditionMode = editionMode()) {
  const sources = [...loadSourceRegister(), ...z.array(sourceSchema).parse(readRegister('research/reader-edition/sources.csv'))];
  unique(sources.map(s=>s.source_id),'source');
  const claims = loadClaimLedger();
  const licenses = z.array(licenseSchema).parse(readRegister('data/licenses/data_licenses.csv'));
  const uses = z.array(useSchema).length(3).parse(JSON.parse(readFileSync('research/reader-edition/uses.json','utf8')));
  unique(uses.map(u=>u.id),'use');
  for (const use of uses) for (const id of use.legacyClaimIds) if (!claims.some(c=>c.claim_id===id)) throw new Error('Missing legacy claim link');
  const displayUses = uses.map(u=>projectUse(u,sources,licenses,mode));
  const observations = loadAdoptionDepth();
  unique(observations.map(o=>o.observation_id),'observation');
  const adoptionClaims = ['clm-0018','clm-0032','clm-0033','clm-0034','clm-0035','clm-0036'].map(id=> {
    const claim=claims.find(c=>c.claim_id===id);
    if (!claim || !['approved','approved_with_caveat'].includes(claim.product_use_status) || !claim.caveat) throw new Error('Adoption claim ineligible');
    for (const sid of claim.source_ids.split(';').map(s=>s.trim())) if (!sources.some(s=>s.source_id===sid && s.review_status==='reviewed')) throw new Error('Adoption claim source missing/unreviewed');
    return claim;
  });
  for (const o of observations.filter(o=>o.comparability_class!=='not-comparable')) {
    if (!sources.some(s=>s.source_id===o.source_id && s.review_status==='reviewed')) throw new Error('Observation source missing/unreviewed');
  }
  return { editionDate: EDITION_DATE, mode, observations, adoptionClaims, uses: displayUses, sources, licenses };
}

/** Figure eligibility follows exact uses, never a source-only review. */
export function figureReviewStatus(uses: Pick<ReaderUse,'status'|'humanReview'>[]): 'reviewed' | 'staged' {
  if (!uses.length || uses.some(u=>u.status==='rejected')) throw new Error('Missing/rejected figure use');
  if (uses.some(u=>u.status==='approved'&&u.humanReview!=='author_reviewed')) throw new Error('Contradictory figure approval');
  return uses.every(u=>u.status==='approved') ? 'reviewed' : 'staged';
}
