import type {DisplayUse} from '@/lib/readerEdition';

export function StudyInterpretation({use,open=false}:{use:DisplayUse;open?:boolean}) {
  return <div className="study-interpretation">
    <p>{use.analysis.significance.text}</p>
    <details open={open}><summary>How to read this result</summary>
      <dl className="evidence-details">
        {([['mechanism','A plausible mechanism'],['alternative','The strongest alternative'],['frontier','When a stronger model could matter']] as const).map(([key,title])=>{
          const item=use.analysis[key];
          return <div key={key}><dt>{title} <span className="figure-note">· {item.kind==='source_supported'?'source-supported account':'analyst hypothesis'}</span></dt><dd>{item.text}</dd></div>;
        })}
      </dl>
    </details>
  </div>;
}
