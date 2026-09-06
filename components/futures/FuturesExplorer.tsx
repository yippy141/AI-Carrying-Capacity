'use client';
import {useState} from 'react';
import Link from 'next/link';
import type {StrategicData} from '@/lib/strategicFutures';
import {deriveFuture,DEFAULT_FUTURE,changedAssumptions,type FutureInput} from '@/lib/futureRules';
import {StrategicCanvas} from './StrategicCanvas';
export function FuturesExplorer({data,paper=false}:{data:StrategicData;paper?:boolean}){
 const [input,setInput]=useState<FutureInput>(DEFAULT_FUTURE);
 const [before,setBefore]=useState<FutureInput>(DEFAULT_FUTURE);
 const current=deriveFuture(input),baseline=deriveFuture(before),changed=changedAssumptions(before,input);
 const preset=data.presets.find(p=>Object.entries(p.input).every(([k,v])=>input[k as keyof FutureInput]===v));
 const [checkpoint,setCheckpoint]=useState(0);
 return <section id="explorer" className={`futures-explorer ${paper?'future-paper':''}`} data-strategic-id="strategic-prototype-1" data-strategic-status={data.status}>
  <div className="future-control-bar interactive-controls">
   {data.controls.map(control=><label key={control.key} htmlFor={`future-${control.key}`}><span>{control.label}</span><select id={`future-${control.key}`} value={input[control.key]} onChange={e=>setInput(prev=>({...prev,[control.key]:e.target.value}))}>{control.options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>)}
  </div>
  <div className="future-actions interactive-controls"><button onClick={()=>setBefore({...input})}>Pin current case as “before”</button><button onClick={()=>{setInput({...DEFAULT_FUTURE});setBefore({...DEFAULT_FUTURE});setCheckpoint(0);}}>Reset the comparison</button><a href="#strategic-canvas">View changed canvas</a><a href="#future-comparison">Read what changed</a></div>
  <div className="future-layout">
   <div className="future-trajectory">
    <div className="branch-heading"><h2>{preset?.title??'Your changed conditions'}</h2><p>{preset?.description??'A mixed construction from the same rules. It need not match one of the four proposed futures.'}</p><p className="figure-note">Draft scenario, not an approved forecast. Dates below are stipulated windows, not an estimated chronology.</p></div>
    <div className="future-presets interactive-controls" aria-label="Proposed future constructions">{data.presets.map(p=><button key={p.id} aria-pressed={preset?.id===p.id} onClick={()=>setInput({...p.input})}>{p.title}</button>)}</div><a className="preset-canvas-link interactive-controls" href="#strategic-canvas">View this case on the canvas</a>
    {current.phases.map((phase,i)=><article className="future-phase" key={i}><p className="future-window">{phase.window}</p><h3>{phase.title}</h3><p>{phase.text}</p>{i===1?<Link href="/assumptions#sf-alpha">The evidence beneath the research premise</Link>:i===2?<Link href="/work#fusion">A physical-control example, with its limits</Link>:null}</article>)}
    <section className="future-budget"><h3>What this bargain gives up</h3><p>Assume a finite discretionary investment and implementation agenda. Moving attention to one priority reduces what can be attempted elsewhere. Money, qualified equipment and people are not interchangeable.</p><ol>{current.priorities.map((p,i)=><li key={p}><strong>{i===0?'First call':i===1?'Next call':'Deferred at the margin'}:</strong> {p}</li>)}</ol><p>No additional national resource stock is created by a selector. A new deployment route requires dedicated capacity; the prototype does not calculate whether a real country can afford it.</p></section>
    <section id="future-comparison" className="future-comparison" aria-live="polite"><h3>Before / after</h3><p data-testid="changed-count">{changed.length?`${changed.length} assumptions changed`:'Starting case pinned; change a condition to compare.'}</p><table><caption>Conditional implications under the same rules</caption><thead><tr><th scope="col">Question</th><th scope="col">Before</th><th scope="col">Now</th></tr></thead><tbody>{([['Strategic control','power'],['Physical output','production'],['Household benefit','households']] as const).map(([label,k])=><tr key={k}><th scope="row">{label}</th><td>{baseline[k]}</td><td data-changed={baseline[k]!==current[k]}>{current[k]}</td></tr>)}</tbody></table><ul>{changed.map(k=><li key={k}>{data.controls.find(c=>c.key===k)?.label}: {data.controls.find(c=>c.key===k)?.options.find(o=>o.value===before[k])?.label} → {data.controls.find(c=>c.key===k)?.options.find(o=>o.value===input[k])?.label}</li>)}</ul></section>
    <section className="future-checkpoints"><h3>What would make you change your mind?</h3><p>These tests follow the selected assumptions. Evidence supporting a premise can weaken a rival branch. Under interruption, research and diffusion tests apply only if continuity returns.</p><div className="interactive-controls checkpoint-choices">{current.checkpoints.map((c,i)=><button key={c.name} aria-pressed={checkpoint===i} onClick={()=>setCheckpoint(i)}>{c.name}</button>)}</div><div className="interactive-controls checkpoint-answer" role="status"><h4>{current.checkpoints[checkpoint].name}</h4><p><strong>Support:</strong> {current.checkpoints[checkpoint].supports}</p><p><strong>Weaken or invalidate:</strong> {current.checkpoints[checkpoint].weakens}</p></div><div className="print-only">{current.checkpoints.map(c=><p key={c.name}><strong>{c.name}</strong> Support: {c.supports} Weaken: {c.weakens}</p>)}</div></section>
    <details open={paper}><summary>The four rules behind this construction</summary>{data.controls.map(c=><section key={c.key}><h4>{c.label}</h4><p>{c.rule}</p></section>)}<p><Link href="/assumptions">Full assumption and source trace</Link></p></details>
   </div>
   <div className="canvas-column"><div className="canvas-sticky"><StrategicCanvas current={current} before={baseline}/><p className="canvas-short-result" role="status" data-testid="strategic-result"><strong>Now:</strong> {current.power}. {current.households}.{changed.length>0?<><br/><strong>Pinned before:</strong> {baseline.power}.</>:null}</p><Link href="/assumptions">Inspect rules, evidence and rival accounts</Link></div></div>
  </div>
  <p className="figure-note static-future-note">The default construction is readable without JavaScript. Controls need JavaScript. This is an executable qualitative branch explorer, not a calibrated simulation.</p>
 </section>;
}
