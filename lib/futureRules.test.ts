import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {deriveFuture,DEFAULT_FUTURE,changedAssumptions,futureInputSchema} from './futureRules.ts';
import {parseStrategic} from './strategicFutures.ts';
const original=()=>JSON.parse(readFileSync('research/strategic-futures/prototype.json','utf8'));
test('the strongest frontier case can reinforce research and change the physical path',()=>{
 const r=deriveFuture(DEFAULT_FUTURE);
 assert.equal(r.loop,true);assert.equal(r.redesign,true);
 assert.match(r.power,/lead can compound/);assert.match(r.households,/concentrated/);
 const bounded=deriveFuture({...DEFAULT_FUTURE,research:'bounded'});
 assert.equal(bounded.loop,false);assert.equal(bounded.redesign,true);
 assert.match(bounded.production,/different physical pathway/);
});
test('diffusion changes exclusive leverage without automatically transferring ownership or welfare',()=>{
 const r=deriveFuture({...DEFAULT_FUTURE,diffusion:'broad'});
 assert.match(r.power,/Exclusive leverage weakens/);assert.match(r.china,/accessible/);
 assert.match(r.households,/concentrated/);assert.match(r.global,/serving costs remain/);
 assert.deepEqual(changedAssumptions(DEFAULT_FUTURE,r.input),['diffusion']);
 assert.deepEqual(changedAssumptions(r.input,r.input),[]);
});
test('deployment, a political bargain and interruption have distinct consequential effects',()=>{
 const existing=deriveFuture({...DEFAULT_FUTURE,deployment:'existing'});
 assert.equal(existing.redesign,false);assert.equal(existing.loop,true);
 const compact=deriveFuture({...DEFAULT_FUTURE,settlement:'compact'});
 assert.equal(compact.effectiveLoop,'mission-limited');assert.match(compact.priorities[2],/frontier experiments/);
 assert.match(compact.households,/stipulated, not guaranteed/);
 const rupture=deriveFuture({...DEFAULT_FUTURE,settlement:'rupture'});
 assert.equal(rupture.loop,false);assert.equal(rupture.redesign,false);
 assert.match(rupture.power,/unassessable/);assert.match(rupture.production,/interrupted/);
});
test('every selectable combination is a complete qualitative construction; malformed inputs fail',()=>{
 for(const research of futureInputSchema.shape.research.options)
 for(const diffusion of futureInputSchema.shape.diffusion.options)
 for(const deployment of futureInputSchema.shape.deployment.options)
 for(const settlement of futureInputSchema.shape.settlement.options){
  const r=deriveFuture({research,diffusion,deployment,settlement});
  assert.equal(r.phases.length,4);assert.equal(r.priorities.length,3);
  assert.ok(r.phases.every(p=>p.text.length>100));
  assert.ok(r.checkpoints.every(c=>c.supports&&c.weakens));
  assert.doesNotMatch(JSON.stringify(r),/NaN|undefined|GDP|[0-9]+%/);
 }
 assert.throws(()=>deriveFuture({...DEFAULT_FUTURE,research:'10x'} as never));
 assert.throws(()=>deriveFuture({...DEFAULT_FUTURE,probability:0.5} as never));
});
test('strategic runtime boundary rejects manufactured probabilities, unsupported options and broken lineage',()=>{
 const data=original();assert.equal(parseStrategic(data,'review-preview').sources.length,9);
 assert.throws(()=>parseStrategic({...data,probability:0.5},'review-preview'));
 const bad=original();bad.controls[0].sourceIds=['invented'];assert.throws(()=>parseStrategic(bad,'review-preview'),/Unknown strategic source/);
 bad.controls[0].sourceIds=['sf-alpha'];bad.controls[0].options[0].value='10x';assert.throws(()=>parseStrategic(bad,'review-preview'),/Unsupported strategic option/);
 const approval=original();approval.sources[0].reviewStatus='approved';assert.throws(()=>parseStrategic(approval,'review-preview'),/contradicts human review/);
 assert.throws(()=>parseStrategic(data,'publication'),/pending/);
});

test('checkpoint support follows the selected premise rather than always favoring compounding and diffusion',()=>{
 const lead=deriveFuture(DEFAULT_FUTURE);
 const other=deriveFuture({...DEFAULT_FUTURE,research:'bounded',diffusion:'broad',settlement:'broad'});
 assert.equal(lead.checkpoints[0].supports,other.checkpoints[0].weakens);
 assert.equal(lead.checkpoints[1].supports,other.checkpoints[1].weakens);
 assert.match(lead.checkpoints[2].supports,/limited group/);
 assert.match(other.checkpoints[2].supports,/household outcomes/);
});
