import Link from 'next/link';
import type { DisplayUse } from '@/lib/readerEdition';
export function OperationalOutcomes({uses}:{uses:DisplayUse[]}) {
  return <div>
    <p className="figure-note">Two settings, two outcomes. These percentages have different denominators and are never pooled. Source-content checks are AI-assisted. {uses.some(u=>u.status==='staged') ? 'Exact uses await author review.' : 'Exact uses approved by the author for this edition.'}</p>
    <div className="outcome-panels">
      {uses.map(use=><section key={use.id} data-claim-id={use.id} data-use-status={use.status}>
        <h4>{use.panel}</h4>
        <p className="outcome-value">+{use.value}% <span>{use.unit.replace('% ','')}</span></p>
        <p className="outcome-direction">{use.id==='reader-clm-qje'?'Higher throughput in this deployment':'Slower task completion in this experiment'}</p>
        <p>{use.claim}</p>
        <p className="figure-note"><strong>Tools:</strong> {use.tools}.<br/><strong>Period:</strong> {use.period}.</p>
        <p className="essential-caveat">{use.caveat}</p>
        <details><summary>Who, comparison, uncertainty and quality</summary><dl className="evidence-details">
          {Object.entries({Population:use.sample,Comparison:use.comparison,Design:use.design,Uncertainty:use.uncertainty,Quality:use.quality}).map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl></details>
        <p className="source-access"><Link href={`/evidence#${use.id}`}>{use.id==='reader-clm-qje'?'QJE: Generative AI at Work — source and limits':'METR: original experiment and 2026 update — sources and limits'}</Link></p>
      </section>)}
    </div>
  </div>;
}
