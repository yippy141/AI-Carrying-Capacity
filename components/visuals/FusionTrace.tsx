'use client';
import {useState} from 'react';
import Link from 'next/link';
import type {DisplayUse} from '@/lib/readerEdition';
import {FlowArrow} from './ActorEvidenceMap';
import {StudyInterpretation} from '@/components/study/StudyInterpretation';
const dependencies=[
  {name:'Transfer to another setting',answer:'Test the controller across the operating conditions, sensing and actuation of the proposed next use. Simulator fidelity and hardware differences could change performance.'},
  {name:'Materials and other plant systems',answer:'Seek material-specific exposure and post-irradiation evidence matched to an acceptance standard, alongside fuel-cycle and component tests. Planned irradiation is a requirement, not an accepted qualification dataset.'},
  {name:'A useful plant outcome',answer:'Observe integrated performance, maintainability and availability over an appropriate period, with a defensible counterfactual for any attributed schedule or output gain. Evidence outside this bank could change the conclusion.'}
];
export function FusionTrace({use,paper=false}:{use:DisplayUse;paper?:boolean}) {
  const [active,setActive]=useState(0);
  const detail=(id:string)=>use.details.find(d=>d.id===id)?.text;
  return <div data-claim-id={use.id} data-use-status={use.status}>
    <p><strong>A specialist reinforcement-learning controller.</strong> This is a different kind of AI intervention from a general-purpose chat assistant. Its success does not measure the effect of upgrading today’s chat models.</p>
    <div className="control-and-dependencies">
      <div className="control-diagram" aria-label="TCV training, physical control and evaluation diagram">
        <h4>Train in simulation</h4>
        <div className="training-flow"><div><strong>Engineers specify</strong><p>Objectives, targets and operating constraints</p></div><FlowArrow/><div><strong>Simulator ↔ learning</strong><p>Simulated experience updates the control policy</p></div></div>
        <div className="deployment-link"><FlowArrow/><span>Trained policy, compiled and timing-tested</span></div>
        <h4>Deploy the fixed policy on TCV</h4>
        <p className="figure-note">Existing control handles initial plasma formation before handover. The deployed policy’s weights are not updated in this live loop.</p>
        <div className="live-loop">
          {['Measurements + targets','Trained policy','Coil actuation','Physical plasma'].map((title,i)=><div className="loop-step" key={title}><strong>{title}</strong>{i<3?<FlowArrow/>:null}</div>)}
          <div className="feedback-return"><span>Magnetic / current sensors return measurements to the policy</span></div>
        </div>
        <div className="evaluation-path"><h4>Evaluate after the experiment</h4><p>Reconstruct plasma states from measurements; compare performance with targets. This evaluation is outside the policy’s live feedback loop.</p></div>
        <p className="figure-note">Original explanatory schematic based on Degrave et al., Figure 1 and Methods. Arrows show information/control relationships, not timing, safety certification or plant-level effect sizes.</p>
      </div>
      <aside className="plant-dependencies" aria-label="Other dependencies for a plant conclusion">
        <h4>Other plant dependencies</h4><p>Plasma control does not cause materials qualification or fuel-cycle readiness. These are other requirements whose relationships need their own evidence.</p>
        <div className="interactive-controls dependency-choices">{dependencies.map((d,i)=><button key={d.name} aria-pressed={active===i} className="text-action" onClick={()=>setActive(i)}>What would change this? <span>{d.name}</span></button>)}</div>
        <div className="trace-answer interactive-controls" role="status" aria-live="polite"><strong>{dependencies[active].name}:</strong> {dependencies[active].answer}</div>
        <div className="print-only">{dependencies.map(d=><p key={d.name}><strong>{d.name}:</strong> {d.answer}</p>)}</div>
      </aside>
    </div>
    <p>{use.claim}</p>
    <StudyInterpretation use={use} open={paper}/>
    <details open={paper}><summary>Who defines useful control?</summary><p>{detail('objective')}</p><p className="figure-note">Source observation: Extended Data Figure 4b. The governance inference is that objective specification and evaluation deserve scrutiny alongside the learned policy. This example is not evidence of a documented accident or existential risk.</p><dl className="evidence-details">{['training','deployment','evaluation'].map(id=><div key={id}><dt>{id[0].toUpperCase()+id.slice(1)}</dt><dd>{detail(id)}</dd></div>)}</dl></details>
    <p className="essential-caveat">A research-control demonstration supports that task in its tested environment. Facility milestones do not establish AI causation; an absent result in this bank does not establish universal absence. AI might also improve other physical stages, which requires its own test.</p>
    <p className="source-access"><Link href="/evidence#reader-clm-tcv">Degrave et al. — source, task and transfer limits</Link> · Article <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>, subject to asset credit lines; diagram newly drawn, simplified and annotated.</p>
  </div>;
}
