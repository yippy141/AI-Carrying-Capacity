'use client';
import { useState } from 'react';
import { calculateMechanism, DEFAULT_INPUTS, type MechanismInputs } from '@/lib/mechanism';

const f = (n: number) => Number(n.toFixed(2)).toString();
function Slider({label,value,min=1,max=8,onChange,unit='×'}:{label:string;value:number;min?:number;max?:number;onChange:(v:number)=>void;unit?:string}) {
  return <label className="mechanism-control"><span>{label} <strong className="font-mono">{f(value)}{unit}</strong></span><input type="range" min={min} max={max} step="1" value={value} onChange={e=>onChange(Number(e.target.value))}/></label>;
}
export function MechanismExperiment() {
  const [input,setInput]=useState<MechanismInputs>(DEFAULT_INPUTS);
  const result=calculateMechanism(input);
  const projectScale=input.designDays+input.testDays+40;
  const comparison=result.change==='unchanged' ? 'No change in elapsed time.' : `${f(Math.abs(result.saved))} days ${result.change==='shorter'?'saved':'added'} · ${f(Math.abs(result.reductionPercent))}% ${result.change==='shorter'?'less':'more'} elapsed time.`;
  function change(update:Partial<MechanismInputs>) {setInput(p=>({...p,...update}));}
  return <div className="mechanism" data-testid="mechanism">
    <p className="figure-note"><strong>Hypothetical inputs throughout.</strong> Days and accepted units/week are invented teaching units. No input comes from a benchmark, S mark or country estimate. The two examples below are independent models.</p>
    <div className="mechanism-grid">
      <div>
        <h4>One project: when is it finished?</h4>
        <p>Design takes {input.designDays} days; testing takes {input.testDays}. Change the speed of either stage, or change how they depend on each other.</p>
        <div className="interactive-controls">
          <Slider label="Design speed" value={input.designSpeed} onChange={designSpeed=>change({designSpeed})}/>
          <Slider label="Testing speed" value={input.testSpeed} onChange={testSpeed=>change({testSpeed})}/>
          <fieldset><legend>Workflow assumption</legend>
            <label><input type="radio" name="topology" checked={input.topology==='serial'} onChange={()=>change({topology:'serial'})}/> Serial: testing follows design</label>
            <label><input type="radio" name="topology" checked={input.topology==='parallel'} onChange={()=>change({topology:'parallel'})}/> Parallel: independent tasks, both required</label>
          </fieldset>
          <button className="text-action" onClick={()=>change({testSpeed:4})}>Also make testing 4× as fast</button>
          <Slider label="Additional integration / review work (optional)" value={input.addedTime} min={0} max={40} unit=" days" onChange={addedTime=>change({addedTime})}/>
        </div>
        <p className="figure-note">Added work is hypothetical and incremental to the baseline’s existing work. It happens after the required tasks finish. Quality is held constant by assumption; no slider verifies it. Nothing is calibrated from METR.</p>
        <div className="timeline" aria-label={`Changed durations: design ${f(result.design)} days; testing ${f(result.testing)} days; additional work ${input.addedTime} days after the tasks. ${input.topology} workflow.`} role="img">
          <div className="timeline-track" style={{display:input.topology==='serial'?'flex':'block'}}>
            <div className="timeline-design" style={{width:`${100*result.design/projectScale}%`}}/>
            <div className="timeline-test" style={{width:`${100*result.testing/projectScale}%`}}/>
            {input.topology==='serial'?<div className="timeline-added" style={{width:`${100*input.addedTime/projectScale}%`}}/>:null}
          </div>
          {input.topology==='parallel'?<div className="timeline-added" style={{marginLeft:`${100*Math.max(result.design,result.testing)/projectScale}%`,width:`${100*input.addedTime/projectScale}%`}}/>:null}
          <p>Design {f(result.design)} days · testing {f(result.testing)} days · added work {input.addedTime} days<br/>Scale: 0–{projectScale} days; fixed while speed, topology and added work change. Baseline edits change this scale.</p>
        </div>
        <div className="mechanism-result" role="status" aria-live="polite" data-testid="project-result">
          <p><strong>{f(result.before)} → {f(result.after)} days</strong> to complete one project.</p>
          <p>{comparison}</p>
          <p className="equation">{input.topology==='serial'?`${input.designDays}/${input.designSpeed} + ${input.testDays}/${input.testSpeed}`:`max(${input.designDays}/${input.designSpeed}, ${input.testDays}/${input.testSpeed})`} + {input.addedTime} = {f(result.after)} days</p>
        </div>
        <p className="figure-note">Parallel means testing can proceed independently; it is a different process, not permission to test a design that does not yet exist. The optional added work is one lump after those tasks; queues, variable rework and quality changes remain unmodeled.</p>
        <details className="assumptions"><summary>Change the baseline durations</summary>
          <Slider label="Baseline design" value={input.designDays} max={40} unit=" days" onChange={designDays=>change({designDays})}/>
          <Slider label="Baseline testing" value={input.testDays} max={60} unit=" days" onChange={testDays=>change({testDays})}/>
        </details>
      </div>
      <div>
        <h4>Repeated work: how much can keep coming out?</h4>
        <p>Three stations perform different steps on the same accepted unit. Dedicated stations can work on different units at once; the slowest capacity limits steady output.</p>
        <div className="interactive-controls">
          {['First station','Second station','Third station'].map((label,i)=><Slider key={label} label={`${label} capacity multiplier`} value={input.capacityMultipliers[i]} onChange={v=>{const next:[number,number,number]=[...input.capacityMultipliers];next[i]=v;change({capacityMultipliers:next});}}/>)}
        </div>
        <div className="capacity-chart" aria-label="Station capacities; fixed scale zero to 160 accepted units per week">
          {result.changedCapacities.map((v,i)=><div key={i} data-binding={result.bindingStations.includes(i)}><span>Station {i+1}</span><div className="capacity-track"><div style={{width:`${100*v/160}%`}}/></div><strong>{f(v)}/week</strong></div>)}
        </div>
        <div className="mechanism-result" role="status" aria-live="polite" data-testid="output-result">
          <p><strong>{f(result.outputBefore)} → {f(result.outputAfter)} accepted units/week</strong> sustainable output ceiling.</p>
          <p className="equation">min({result.changedCapacities.map(f).join(', ')}) = {f(result.outputAfter)} units/week</p>
          <p data-testid="binding-station">Binding {result.bindingStations.length===1?'station':'stations'}: {result.bindingStations.map(i=>i+1).join(', ')}.</p>
        </div>
        <p className="figure-note">Compatible units; adequate demand and buffers; no losses, rework, variability or start-up delay. Capacities are independently assumed, not inferred from the project durations. Project added work has no effect on these independently assumed capacities. All bars use a fixed 0–160 accepted-units/week scale.</p>
        <details className="assumptions"><summary>Change baseline station capacities</summary>
          {input.capacities.map((v,i)=><Slider key={i} label={`Baseline station ${i+1}`} value={v} max={20} unit="/week" onChange={n=>{const next:[number,number,number]=[...input.capacities];next[i]=n;change({capacities:next});}}/>)}
        </details>
      </div>
    </div>
    <p className="mechanism-conclusion">In the default serial example, a design speedup saves six days before added work. Six extra days erase that saving; eight make the project take two days longer. The bottleneck in the station example follows from its assumed capacities. Neither example identifies an empirical bottleneck.</p>
    <button className="reader-button interactive-controls" onClick={()=>setInput({...DEFAULT_INPUTS})}>Reset assumptions</button>
    <noscript><p>The default serial example takes 40 days, then 34 days after design becomes four times as fast. Repeated output stays at 4 units/week. JavaScript enables changing assumptions; all default arithmetic is printed above.</p></noscript>
  </div>;
}
