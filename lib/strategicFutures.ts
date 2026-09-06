import {readFileSync} from 'node:fs';
import {z} from 'zod';
import {futureInputSchema} from './futureRules.ts';
import {safeUrl} from './registers.ts';
import type {EditionMode} from './readerEdition.ts';
const text=z.string().min(1),date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const review=z.enum(['staged','approved']);
const human=z.enum(['not_recorded','author_reviewed']);
const sourceSchema=z.object({id:text,title:text,organization:text,publicationDate:date.nullable(),url:safeUrl.refine(u=>u!=='missing'),version:text,kind:z.enum(['report','official_intent','analysis','external_forecast','normative_proposal','interpretive_account']),locator:text,claim:text,limit:text,language:z.enum(['en','zh']),reuse:text,verifiedDate:date,reviewStatus:review,humanReview:human,translationReview:z.enum(['pending','human_reviewed','not_applicable'])}).strict();
export const strategicSchema=z.object({schemaVersion:z.literal('strategic-prototype-1'),editionDate:date,baseHead:text,status:review,humanReview:human,probability:z.null(),horizon:text,kind:z.literal('scenario_construction'),sources:z.array(sourceSchema).min(1),controls:z.array(z.object({key:z.enum(['research','diffusion','deployment','settlement']),label:text,options:z.array(z.object({value:text,label:text}).strict()).min(2),rule:text,sourceIds:z.array(text).min(1)}).strict()).length(4),presets:z.array(z.object({id:text,title:text,input:futureInputSchema,description:text}).strict()).length(4),author:z.object({opening:text,judgment:text,closing:text}).strict()}).strict();
export type StrategicData=z.infer<typeof strategicSchema>;
export function parseStrategic(input:unknown,mode:EditionMode){
 const data=strategicSchema.parse(input);
 const unique=(a:string[])=>new Set(a).size===a.length;
 if(!unique(data.sources.map(s=>s.id))||!unique(data.controls.map(c=>c.key))||!unique(data.presets.map(p=>p.id)))throw new Error('Duplicate strategic record');
 for(const control of data.controls){
  if(control.sourceIds.some(id=>!data.sources.some(s=>s.id===id)))throw new Error('Unknown strategic source');
  if(!unique(control.options.map(o=>o.value)))throw new Error('Duplicate strategic option');
  for(const value of control.options.map(o=>o.value))if(!futureInputSchema.shape[control.key].safeParse(value).success)throw new Error('Unsupported strategic option');
 }
 if(data.status==='approved'&&data.humanReview!=='author_reviewed')throw new Error('Strategic approval contradicts human review');
 for(const s of data.sources){
  if(s.reviewStatus==='approved'&&s.humanReview!=='author_reviewed')throw new Error('Strategic source/use approval contradicts human review');
  if(mode==='publication'&&(s.reviewStatus!=='approved'||s.humanReview!=='author_reviewed'||(s.language==='zh'&&s.translationReview!=='human_reviewed')))throw new Error(`Strategic source/use or translation pending: ${s.id}`);
 }
 if(mode==='publication'&&(data.status!=='approved'||data.humanReview!=='author_reviewed'))throw new Error('Strategic scenario and author text pending');
 return data;
}
export function loadStrategic(mode:EditionMode){return parseStrategic(JSON.parse(readFileSync('research/strategic-futures/prototype.json','utf8')),mode);}
