import type {FutureResult} from '@/lib/futureRules';

type Props={current:FutureResult;before:FutureResult};
function Node({title,now,old,tone='',className=''}:{title:string;now:string;old:string;tone?:string;className?:string}){
 return <div className={`future-node ${className}`} data-changed={now!==old} data-tone={tone}><h3>{title}</h3><p>{now}</p>{now!==old?<p className="future-was">Before: {old}</p>:null}</div>;
}
/** Original qualitative network; fixed positions and equal-width relationships.
 * Dashed lines are proposed scenario links, never measured flow/strength. */
export function StrategicCanvas({current:c,before:b}:Props){
 return <figure className="strategic-canvas" id="strategic-canvas" aria-labelledby="canvas-title" data-scenario-status="conditional">
  <figcaption><h2 id="canvas-title">Who can turn a lead into power?</h2><p>Conditional network · compare the outlined changes with the pinned starting case.</p></figcaption>
  <div className="future-map" data-interrupted={c.interrupted}>
   <svg className="network-wires" viewBox="0 0 700 570" preserveAspectRatio="none" aria-hidden="true">
    <defs><marker id="future-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="currentColor"/></marker></defs>
    <path d="M350 75 V105 H170 V125"/>
    <path d="M350 105 H530 V125"/>
    <path d="M170 235 V280 H530 V235" className="network-connector"/>
    <path d="M170 280 V295"/><path d="M530 280 V295"/>
    <path d="M315 170 H385" data-active={c.shared&&!c.interrupted}/>
    <path d="M170 385 V410 H315 V445" className="desktop-global-wire"/>
    <path d="M530 385 V410 H385 V445" className="desktop-global-wire"/>
    <path d="M170 421 V455 H315 V465" className="mobile-global-wire"/>
    <path d="M530 421 V455 H385 V465" className="mobile-global-wire"/>
    <path d="M21 325 H12 V175 H21" className="scenario-wire" data-active={c.loop}/>
    <path d="M315 320 H385" className="scenario-wire" data-active={c.redesign}/>
    <path d="M385 375 H315" className="scenario-wire" data-active={c.redesign}/>
    <path d="M315 310 H350 V288 H688 V175 H679" className="scenario-wire" data-active={c.shared&&c.loop}/>
   </svg>
   <div className="world-inputs"><strong>Cross-border foundations</strong><p>ASML equipment network · qualified hardware · power</p><a href="/assumptions#sf-asml">ASML manufacturing: Netherlands, Germany, US, South Korea, Taiwan</a></div>
   <Node title="US labs and coalition" now={c.us} old={b.us} tone="us" className="map-us"/>
   <div className="diffusion-link" data-active={c.shared&&!c.interrupted}>{c.interrupted?'Access continuity unassessable':c.shared?'Usable capability spreads':'Restricted useful access'}</div>
   <Node title="Chinese developers" now={c.china} old={b.china} tone="cn" className="map-china"/>
   <Node title="Research → next systems" now={c.research} old={b.research} className="map-research"/>
   <div className="redesign-link">{c.interrupted?'Deployment route interrupted':c.redesign?'Design ↔ operations feedback':'No new design ↔ operations loop'}</div>
   <Node title="Deployment" now={c.production} old={b.production} className="map-deployment"/>
   <Node title="Third-country firms and institutions" now={c.global} old={b.global} className="map-global"/>
  </div>
  <div className="political-channel"><strong>{c.political}</strong><p>{c.households}</p></div>
  <p className="canvas-key">Scenario connections, not measured effects. Both actor groups research and deploy. Dashed lines: changeable feedback; faded: inactive or unassessed. Outlines mark changes. Position, color and line width are not power scores.</p>
 </figure>;
}
