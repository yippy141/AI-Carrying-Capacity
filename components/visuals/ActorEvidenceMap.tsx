import type {DisplayUse} from '@/lib/readerEdition';

export function FlowArrow({className=''}:{className?:string}) {
  return <svg className={`flow-arrow ${className}`} viewBox="0 0 32 20" aria-hidden="true"><path d="M1 10H29M22 3L29 10L22 17" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
export function ActorEvidenceMap({use}:{use:DisplayUse}) {
  const actors=[['model','Model developer'],['supplier','Assistant supplier'],['employer','Employer / service provider'],['workers','Workers'],['customers','Customers']];
  return <section className="actor-map" aria-labelledby="actor-map-title">
    <h4 id="actor-map-title">Where the work happens—and where the gain might go</h4>
    <p>The support case crosses organizational and national boundaries. The paper identifies these roles without naming the employer or assistant supplier.</p>
    <div className="actor-chain">
      {actors.map(([id,title],i)=><div className="actor-step" key={id}>
        <div className="actor-node"><h5>{title}</h5><p>{use.details.find(d=>d.id===id)?.text}</p></div>
        {i<actors.length-1?<FlowArrow/>:null}
      </div>)}
    </div>
    <p className="figure-note">An analytical attribution map. Equal-width arrows locate relationships in the service workflow; they encode neither effect sizes nor financial flows. Geography: final QJE paper §III.B and Table I.</p>
    <div className="actor-evidence">
      <p><strong>Measured at the work:</strong> issues resolved per hour in this deployment. The estimated increase does not allocate the value among these actors.</p>
      <p><strong>Not measured by this result:</strong> wages, profits, fiscal gains, strategic leverage or welfare. {use.details.find(d=>d.id==='institutions')?.text}</p>
    </div>
    <p>A future country comparison would need the location and scale of deployment, access terms, worker outcomes and value capture. The location of a model laboratory answers only one of those questions.</p>
  </section>;
}
