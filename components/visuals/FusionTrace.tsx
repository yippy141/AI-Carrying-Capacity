'use client';
import {useState} from 'react';
import Link from 'next/link';
import type {DisplayUse} from '@/lib/readerEdition';
const steps=[
  {name:'A demonstrated task',type:'Observation',text:'A controller trained in simulation operated TCV’s physical plasma-control hardware. This is a result inside a real research tokamak.',change:'Show robust performance across the operating conditions and machines relevant to the proposed next use.'},
  {name:'A usable plant component',type:'Interpretation: transfer requirement',text:'A successful control demonstration does not itself qualify materials, plasma-facing components, blankets or fuel-cycle systems. Each has its own test and acceptance requirements.',change:'Provide material-specific exposure and post-irradiation evidence matched to an acceptance standard. Planned irradiation is not a completed accepted dataset.'},
  {name:'A useful plant outcome',type:'Interpretation: wider evidence requirement',text:'A plant-level conclusion would need integrated performance, maintainability, availability and an attributable effect on schedule or output. No date for fusion follows from this trace.',change:'Observe integrated performance over an appropriate period and compare the outcome with a defensible counterfactual. Evidence outside this bank could change the conclusion.'}
];
export function FusionTrace({use}:{use:DisplayUse}) {
  const [active,setActive]=useState(0);
  return <div data-claim-id={use.id} data-use-status={use.status}>
    <p className="figure-note">{use.displayReview}. Degrave et al., Nature (2022): a physical research/control demonstration. No plant effect size is estimated.</p>
    <div className="fusion-trace">
      {steps.map((step,i)=><section key={step.name} className={i===active?'trace-selected':''}>
        <h4>{step.name}</h4><p className="figure-note">{step.type}</p><p>{step.text}</p>
        <button aria-pressed={i===active} className="text-action interactive-controls" onClick={()=>setActive(i)}>What would change this? <span className="sr-only">{step.name}</span></button>
        <p className="print-only">Evidence to seek: {step.change}</p>
      </section>)}
    </div>
    <div className="trace-answer interactive-controls" role="status" aria-live="polite"><strong>{steps[active].name} — evidence to seek:</strong> {steps[active].change}</div>
    <p className="essential-caveat">{use.caveat} AI may change additional physical stages or the route between them; that possibility must be tested, not ruled out by the diagram.</p>
    <p className="source-access"><Link href="/evidence#reader-clm-tcv">Degrave et al. — source, task and transfer limits</Link></p>
  </div>;
}
