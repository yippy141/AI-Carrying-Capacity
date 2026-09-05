import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,cpSync,symlinkSync,readFileSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {parseCsv} from '../lib/registers.ts';
import {resolveBuildMode} from '../lib/buildPolicy.ts';

const root=process.cwd();
const cleanEnv={...process.env};
for(const key of ['VERCEL','VERCEL_ENV','VERCEL_TARGET_ENV','READER_EDITION_MODE','READER_BUILD_PIPELINE']) delete cleanEnv[key];
function invoke(cwd:string,args:string[],env:Record<string,string|undefined>={}) {
  return spawnSync('npm',['run','build','--',...args],{cwd,env:{...cleanEnv,...env},encoding:'utf8',timeout:180000,maxBuffer:5_000_000});
}
function output(result:ReturnType<typeof invoke>){return `${result.stdout}\n${result.stderr}`;}
test('ordinary build fails closed on real staged records in a production environment',()=>{
  const result=invoke(root,[],{VERCEL:'1',VERCEL_ENV:'production'});
  assert.notEqual(result.status,0);assert.match(output(result),/Staged source reader-src-qje/);
  assert.doesNotMatch(output(result),/Creating an optimized/);
  const conflict=invoke(root,[],{VERCEL_ENV:'production',READER_EDITION_MODE:'review-preview'});
  assert.notEqual(conflict.status,0);assert.match(output(conflict),/cannot override a production build/);
  const explicit=invoke(root,['--production']);
  assert.notEqual(explicit.status,0);assert.match(output(explicit),/Staged source/);
});
test('target resolution preserves local and Vercel preview; custom production targets win',()=>{
  assert.equal(resolveBuildMode({}),'review-preview');
  assert.equal(resolveBuildMode({NODE_ENV:'production',VERCEL:'1',VERCEL_ENV:'preview'}),'review-preview');
  assert.equal(resolveBuildMode({VERCEL_TARGET_ENV:'production'}),'publication');
  assert.equal(resolveBuildMode({},['--production']),'publication');
  assert.throws(()=>resolveBuildMode({VERCEL_ENV:'production'},['--preview']));
  assert.throws(()=>resolveBuildMode({VERCEL:'1'}),/ambiguous/);
});

test('temporary synthetic records exercise every refusal and full approved publication compilation',()=>{
  const fixture=mkdtempSync(path.join(tmpdir(),'reader-SYNTHETIC-publication-'));
  const realReview=readFileSync('research/reader-edition/release-review.json','utf8');
  const realUses=readFileSync('research/reader-edition/uses.json','utf8');
  try {
    for(const name of ['app','components','lib','scripts','data','public','content'])cpSync(path.join(root,name),path.join(fixture,name),{recursive:true});
    cpSync(path.join(root,'research/reader-edition'),path.join(fixture,'research/reader-edition'),{recursive:true});
    for(const name of ['package.json','package-lock.json','next.config.ts','next-env.d.ts','tsconfig.json','postcss.config.mjs'])if(existsSync(name))cpSync(name,path.join(fixture,name));
    symlinkSync(path.join(root,'node_modules'),path.join(fixture,'node_modules'),'dir');
    writeFileSync(path.join(fixture,'SYNTHETIC-NOT-FOR-PUBLICATION.txt'),'Synthetic automated fixture. No real author or source approval. Deleted after the test.\n');
    const sourceFile=path.join(fixture,'research/reader-edition/sources.csv');
    const sourceRows=parseCsv(readFileSync(sourceFile,'utf8'));const columns=sourceRows[0];
    for(const row of sourceRows.slice(1)) {
      row[columns.indexOf('review_status')]='reviewed';
      row[columns.indexOf('title_english')]='SYNTHETIC test source';
      row[columns.indexOf('url_or_doi')]='https://example.com/synthetic';
    }
    const encode=(rows:string[][])=>rows.map(row=>row.map(s=>`"${s.replaceAll('"','""')}"`).join(',')).join('\n')+'\n';
    writeFileSync(sourceFile,encode(sourceRows));
    const uses=JSON.parse(realUses).map((use:Record<string,unknown>)=>({...use,status:'approved',humanReview:'author_reviewed',claim:'SYNTHETIC fixture finding, not evidence.',reviewer:'SYNTHETIC TEST REVIEWER — not a person',value:use.value===null?null:10}));
    const useFile=path.join(fixture,'research/reader-edition/uses.json');
    const reviewFile=path.join(fixture,'research/reader-edition/release-review.json');
    const approved={edition:'SYNTHETIC',authorCopyStatus:'approved',authorReviewer:'SYNTHETIC TEST REVIEWER — not a person',bylineAssent:'approved',outsideReaders:[],exactUseReview:'approved',publicationAuthorized:true};
    const write=(file:string,value:unknown)=>writeFileSync(file,JSON.stringify(value,null,2));
    write(useFile,uses);write(reviewFile,approved);
    for(const [patch,expected] of [
      [{authorCopyStatus:'pending'},/Author copy reading\/edit pending/],
      [{publicationAuthorized:false},/Publication authorization missing/],
      [{publicationAuthorized:undefined},/publicationAuthorized/],
      [{bylineAssent:'pending'},/Byline assent pending/],
      [{exactUseReview:'pending'},/Exact-use release review pending/]
    ] as const) {
      write(reviewFile,{...approved,...patch});const result=invoke(fixture,['--production']);
      assert.notEqual(result.status,0);assert.match(output(result),expected);
    }
    write(reviewFile,approved);
    write(useFile,uses.map((use:Record<string,unknown>,i:number)=>i===0?{...use,status:'staged',humanReview:'not_recorded'}:use));
    const staged=invoke(fixture,[],{VERCEL_ENV:'production'});assert.notEqual(staged.status,0);assert.match(output(staged),/Exact use awaits release review/);
    write(useFile,uses);
    // Replace personal prose only inside the temporary copy, never real assent.
    const copyFile=path.join(fixture,'lib/readerCopy.ts');
    writeFileSync(copyFile,readFileSync(copyFile,'utf8').replace(/(opening|motivation|interpretation|assistance|state): '[^'\n]*'/g,"$1: 'SYNTHETIC author test text'"));
    const valid=invoke(fixture,[],{VERCEL:'1',VERCEL_ENV:'production'});
    assert.equal(valid.status,0,output(valid));
    assert.match(output(valid),/Reader publication gate passed/);
    const html=readFileSync(path.join(fixture,'.next/server/app/index.html'),'utf8');
    assert.match(html,/SYNTHETIC fixture finding/);
    assert.doesNotMatch(html,/data-author-status="pending"|data-use-status="staged"/);
    // A corrupt rendered artifact fails the actual postflight, too.
    writeFileSync(path.join(fixture,'.next/server/app/index.html'),html.replace('data-use-status="approved"','data-use-status="staged"'));
    const damaged=spawnSync(process.execPath,['--experimental-strip-types','scripts/check_reader_publication.ts','--publication','--rendered'],{cwd:fixture,env:cleanEnv,encoding:'utf8'});
    assert.notEqual(damaged.status,0);assert.match(damaged.stderr,/Staged public claim/);
  } finally {
    rmSync(fixture,{recursive:true,force:true});
    assert.equal(readFileSync('research/reader-edition/release-review.json','utf8'),realReview);
    assert.equal(readFileSync('research/reader-edition/uses.json','utf8'),realUses);
  }
});
