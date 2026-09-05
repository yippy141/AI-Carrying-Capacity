import test from 'node:test';
import assert from 'node:assert/strict';
import {loadReaderEdition,loadStagedProfiles,projectUse,nullableOrdinal,dimensionSchema,figureReviewStatus} from './readerEdition.ts';
import {parseCsv,readRegister,safeUrl,observationSchema} from './registers.ts';
import {calculateMechanism,DEFAULT_INPUTS} from './mechanism.ts';

const edition=loadReaderEdition('review-preview');
test('finite candidate uses render as drafts, never upgrade source identity or human review',()=>{
 assert.equal(edition.uses.length,3);
 assert.ok(edition.uses.every(u=>u.status==='staged' && u.humanReview==='not_recorded' && u.displayReview.includes('Draft')));
 assert.throws(()=>loadReaderEdition('publication'),/Staged source|awaits release review/);
});
test('permitted exact reviewed factual use passes with required caveats and vintage',()=>{
 const u={...edition.uses[2],status:'approved',humanReview:'author_reviewed'};
 const {sources:_,license:__,displayReview:___,restrictions:____,...input}=u;void _;void __;void ___;void ____;
 const r=projectUse(input,edition.sources,edition.licenses,'publication');
 assert.equal(r.sources[0].source_id,'fusion-src-017');assert.ok(r.caveat && r.period && r.locator && r.restrictions.length);
});
function candidate(){const {sources:_,license:__,displayReview:___,restrictions:____,...u}=edition.uses[0];void _;void __;void ___;void ____;return u;}
test('negative use cases: reviewed source alone, missing caveat, target, company, translation, unsafe URL, reuse',()=>{
 const u=candidate();
 assert.throws(()=>projectUse({...u,caveat:''},edition.sources,edition.licenses,'review-preview'));
 assert.throws(()=>projectUse({...u,sourceIds:['missing']},edition.sources,edition.licenses,'review-preview'));
 for(const patch of [{companyOrTarget:'official_target'},{translation:'pending'},{status:'rejected'},{reuse:'dataset'},{reuse:'publisher_figure'},{licenseId:'missing'}]) assert.throws(()=>projectUse({...u,...patch},edition.sources,edition.licenses,'review-preview'));
 for(const patch of [{url_or_doi:'javascript:alert(1)'},{url_or_doi:'missing'},{reliability_tier:'C'},{source_type:'company_report'},{language:'zh',translation_reviewer:'missing'},{official_claim_status:'company_target'},{review_status:'rejected'}]) {
  const sources=edition.sources.map(s=>s.source_id===u.sourceIds[0]?{...s,...patch}:s);
  assert.throws(()=>projectUse(u,sources,edition.licenses,'review-preview'));
 }
 const sources=edition.sources.map(s=>s.source_id===u.sourceIds[0]?{...s,review_status:'reviewed'}:s);
 assert.throws(()=>projectUse(u,sources,edition.licenses,'publication'),/awaits release review/);
});
test('runtime boundary handles quoted CSV and rejects malformed data and unsafe paths',()=>{
 assert.deepEqual(parseCsv('a,b\r\n"line\n1","said ""yes"""\r\n'),[['a','b'],['line\n1','said "yes"']]);
 assert.throws(()=>parseCsv('a,b\n"unclosed,b'));
 assert.throws(()=>parseCsv('a,b\n"closed"junk,2'));
 assert.throws(()=>parseCsv('a,b\njun"k",2'));
 assert.throws(()=>readRegister('../package.json'));
 for(const value of ['javascript:alert(1)','http://example.com','https://name:pass@example.com'])assert.equal(safeUrl.safeParse(value).success,false);
 for(const value of ['', 'NaN','101','-1'])assert.equal(observationSchema.safeParse({...edition.observations[0],value}).success,false);
 for(const value of ['1-2','2.5','5','missing'])assert.equal(nullableOrdinal.safeParse(value).success,false);
 assert.equal(nullableOrdinal.parse(''),null);assert.equal(nullableOrdinal.parse('0'),0);
});
test('all 31 staged profiles preserve 62 original submissions and 155 dimensions without false selections',()=>{
 const {profiles,dimensions,submissions}=loadStagedProfiles();
 assert.equal(profiles.length,31);assert.equal(submissions.length,62);assert.equal(dimensions.length,155);
 assert.equal(dimensions.filter(d=>d.selected_value!==null).length,12);
 assert.ok(profiles.every(p=>p.review_status==='staged'&&p.approved_by===''));
 const licensing=dimensions.find(d=>d.profile_id==='sp-0030'&&d.dimension==='S5')!;
 assert.equal(licensing.selected_value,null);assert.equal(licensing.historical_disposition,'preserved_disagreement');
 assert.equal(licensing.recommendation_low,0);assert.equal(licensing.recommendation_high,2);
 const raw=readRegister('data/profiles/dimension_dispositions.csv')[0];
 assert.equal(dimensionSchema.safeParse({...raw,selected_value:'2'}).success,false);
});
test('one-project arithmetic and topology: serial 40→34, parallel 32→32; both stages improve',()=>{
 const r=calculateMechanism(DEFAULT_INPUTS);assert.equal(r.before,40);assert.equal(r.after,34);assert.equal(r.reductionPercent,15);
 const parallel=calculateMechanism({...DEFAULT_INPUTS,topology:'parallel'});assert.equal(parallel.before,32);assert.equal(parallel.after,32);
 assert.equal(calculateMechanism({...DEFAULT_INPUTS,testSpeed:4}).after,10);
 assert.equal(calculateMechanism({...DEFAULT_INPUTS,testSpeed:4,topology:'parallel'}).after,8);
});
test('repeated-output bottleneck moves; capacity inputs are independent of project time',()=>{
 assert.equal(calculateMechanism(DEFAULT_INPUTS).outputAfter,4);
 assert.equal(calculateMechanism({...DEFAULT_INPUTS,capacityMultipliers:[4,4,1]}).outputAfter,6);
 assert.equal(calculateMechanism({...DEFAULT_INPUTS,capacityMultipliers:[4,4,4]}).outputAfter,16);
 assert.equal(calculateMechanism({...DEFAULT_INPUTS,designDays:40,testDays:1}).outputAfter,4);
 for(const designSpeed of [0,-1,NaN,Infinity])assert.throws(()=>calculateMechanism({...DEFAULT_INPUTS,designSpeed}));
});

test('review status contradictions fail in preview and approved figures remain eligible',()=>{
 const u=candidate();
 assert.throws(()=>projectUse({...u,status:'approved',humanReview:'not_recorded'},edition.sources,edition.licenses,'review-preview'),/contradicts/);
 assert.equal(figureReviewStatus([{status:'approved',humanReview:'author_reviewed'}]),'reviewed');
 assert.equal(figureReviewStatus([{status:'approved',humanReview:'author_reviewed'},{status:'staged',humanReview:'not_recorded'}]),'staged');
 assert.throws(()=>figureReviewStatus([{status:'approved',humanReview:'not_recorded'}]),/Contradictory/);
 const sources=edition.sources.map(s=>s.source_id===u.sourceIds[0]?{...s,language:'zh',translation_reviewer:'missing'}:s);
 assert.throws(()=>projectUse({...u,translation:'reviewed'},sources,edition.licenses,'review-preview'),/translation blocked/);
});
