import Link from 'next/link';
import type {DisplayUse} from '@/lib/readerEdition';
import {StudyInterpretation} from '@/components/study/StudyInterpretation';
import {ActorEvidenceMap} from './ActorEvidenceMap';

export function OperationalOutcomes({uses,paper=false}:{uses:DisplayUse[];paper?:boolean}) {
  return <div>
    <p className="comparison-boundary"><strong>Access is the intervention here.</strong> These studies compare access to an AI assistant with no access in particular settings. They do not isolate an upgrade from a weaker model to a stronger one. Differences between the findings cannot be attributed to workflow design alone: tools, people, tasks, dates and estimators also differ.</p>
    <div className="outcome-panels">
      {uses.map(use=>{
        const support=use.id==='reader-clm-qje';
        const changed=100+(use.value??0);
        const interval=use.relativeInterval;
        return <section key={use.id} data-claim-id={use.id} data-use-status={use.status}>
          <h4>{use.panel}</h4>
          <p className="outcome-direction">{support?'More resolved issues per hour':'More time per completed task'}</p>
          <p className="figure-note"><strong>Population:</strong> {use.sample}<br/><strong>Tools / study vintage:</strong> {use.tools}; {use.period}.</p>
          <div className="relative-comparison" role="img" aria-label={`${use.panel}: within-study reference 100, AI access ${changed}. ${support?`${use.value} percent higher issues resolved per hour. No percentage interval plotted.`:`${use.value} percent longer task time; historical ${interval?.level} percent interval ${interval?.low} to ${interval?.high} percent longer.`} This transforms a reported relative estimate; it is not raw group means.`}>
            <p className="figure-note">{support?'Resolutions/hour index':'Task-completion-time index'} · reference = 100</p>
            {[['Reference',100],['AI access',changed]].map(([label,value])=><div className="relative-row" key={label}>
              <span>{label}</span><div className="relative-track"><div className={label==='Reference'?'relative-bar baseline':'relative-bar'} style={{width:`${Number(value)/1.6}%`}}/></div><strong>{value}</strong>
            </div>)}
            {interval?<div className="interval-line"><span>95% interval</span><div className="interval-track"><i style={{left:`${(100+interval.low)/1.6}%`,width:`${(interval.high-interval.low)/1.6}%`}}/></div><strong>{100+interval.low}–{100+interval.high}</strong></div>:null}
          </div>
          <p className="figure-note">Transformation: 100 × (1 + {use.value}/100) = {changed}. These are normalized reported relative estimates, not raw observed group means. Each panel has a different unit; the indices do not create a common productivity metric.</p>
          <p>{use.claim}</p>
          {interval?<p className="essential-caveat"><strong>Historical interval: +{interval.low}% to +{interval.high}% task time ({interval.level}%).</strong> The February 2026 update describes participation and task selection that prevent a reliable estimate for later tools.</p>:null}
          <p className="essential-caveat">{use.caveat}</p>
          <StudyInterpretation use={use} open={paper}/>
          <details open={paper}><summary>Design, uncertainty and quality</summary><dl className="evidence-details">
            {Object.entries({Comparison:use.comparison,Design:use.design,Uncertainty:use.uncertainty,Quality:use.quality}).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl></details>
          <p className="source-access"><Link href={`/evidence#${use.id}`}>{support?'QJE: Generative AI at Work — source and limits':'METR: original experiment and February 2026 update — sources and limits'}</Link></p>
        </section>;
      })}
    </div>
    <p>These are two results to explain, not a verdict that customer support benefits while software does not. The narrower answer this edition can defend is that access changed completed work in these settings—and that interpreting the change requires following what workers actually did.</p>
    <ActorEvidenceMap use={uses[0]}/>
  </div>;
}
