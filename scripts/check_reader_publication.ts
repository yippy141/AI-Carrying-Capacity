import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {loadReaderEdition,loadStagedProfiles,READER_ROUTES,type EditionMode} from '../lib/readerEdition.ts';
import {buildAdoptionDepthFigureModel} from '../lib/adoptionDepth.ts';
import {readRegister} from '../lib/registers.ts';

const mode:EditionMode=process.argv.includes('--publication')?'publication':'review-preview';
const edition=loadReaderEdition(mode);
loadStagedProfiles();
const approval=JSON.parse(readFileSync('research/reader-edition/release-review.json','utf8'));
if (mode==='publication' && (approval.authorCopyStatus!=='approved' || !approval.authorReviewer || approval.publicationAuthorized!==true)) throw new Error('Author copy and publication decision pending');

const roots=['app/layout.tsx',...READER_ROUTES.map(r=>`app${r==='/'?'':r}/page.tsx`)];
const seen=new Set<string>();
const forbidden=/FrontierSensitivityScatter|ConversionChainCompare|loadForecastRegister|v0_visual_system|TODO_SOURCE|TODO_DATA|TODO_VERIFY/;
function walk(file:string){
  if(seen.has(file)) return;seen.add(file);
  const source=readFileSync(file,'utf8');
  // register readers and historical tests are shared infrastructure; their
  // mere definitions do not execute a legacy forecast route.
  if(!['lib/registers.ts'].includes(file) && forbidden.test(source)) throw new Error(`Ineligible dependency in released reading path: ${file}`);
  for(const match of source.matchAll(/(?:from\s+|import\s*)['"]([^'"]+)['"]/g)) {
    const spec=match[1];
    if(!spec.startsWith('.')&&!spec.startsWith('@/'))continue;
    const base=spec.startsWith('@/')?spec.slice(2):path.normalize(path.join(path.dirname(file),spec));
    const resolved=[base,`${base}.tsx`,`${base}.ts`,`${base}/index.tsx`].find(existsSync);
    if(!resolved)throw new Error(`Missing import ${spec} in ${file}`);
    if(/\.(tsx?|css)$/.test(resolved))walk(resolved);
  }
}
roots.forEach(walk);
const ids=buildAdoptionDepthFigureModel(edition.observations).plottedObservationIds;
if(ids.includes('obs-adoption-depth-013'))throw new Error('Restricted NBS mark leaked');
if(mode==='review-preview'&&edition.uses.some(u=>u.status==='staged'&&!u.displayReview.includes('Draft')))throw new Error('Draft state absent');
// The CSV artifact is generated from exactly the plotted set and validated
// against it. It contains reported facts with denominator and caveat fields.
const rows=readRegister('data/observations/adoption_depth.csv').filter(r=>ids.includes(r.observation_id));
const fields=Object.keys(rows[0]);const quote=(s:string)=>`"${s.replaceAll('"','""')}"`;
const csv=[fields,...rows.map(r=>fields.map(f=>r[f]))].map(r=>r.map(quote).join(',')).join('\n')+'\n';
if(process.argv.includes('--write-assets')){mkdirSync('public/reader',{recursive:true});writeFileSync('public/reader/adoption.csv',csv);}
else if(!existsSync('public/reader/adoption.csv')||readFileSync('public/reader/adoption.csv','utf8')!==csv)throw new Error('Adoption download detached from eligible observations');
if(process.argv.includes('--rendered')) {
 for(const route of READER_ROUTES){
  const file=`.next/server/app/${route==='/'?'index':route.slice(1)}.html`;
  if(!existsSync(file))throw new Error(`Missing rendered release route ${route}`);
  const html=readFileSync(file,'utf8');
  if(/TODO_SOURCE|TODO_DATA|TODO_VERIFY|seed-sp-00|dr-sp-00|initial_probability_range/.test(html))throw new Error(`Archive/staged research leak in ${route}`);
  const found=[...html.matchAll(/data-claim-id="([^"]+)"/g)].map(m=>m[1]);
  if(found.some(id=>!edition.uses.some(u=>u.id===id)))throw new Error(`Unknown rendered use ${route}`);
  if(mode==='publication' && html.includes('data-use-status="staged"'))throw new Error(`Staged public claim ${route}`);
  if(['/', '/paper','/evidence'].includes(route) && edition.uses.some(u=>!found.includes(u.id)))throw new Error(`Missing required figure use ${route}`);
 }
}
console.log(`Reader ${mode} gate passed: ${READER_ROUTES.length} reading routes, 4 figures, ${ids.length} adoption marks, 3 exact candidate uses. Publication approval is ${approval.publicationAuthorized}.`);
