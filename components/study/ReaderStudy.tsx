import Link from 'next/link';
import { FigureShell } from '@/components/ui/FigureShell';
import { AdoptionDepthFigure } from '@/components/visuals/AdoptionDepthFigure';
import { OperationalOutcomes } from '@/components/visuals/OperationalOutcomes';
import { MechanismExperiment } from '@/components/visuals/MechanismExperiment';
import { FusionTrace } from '@/components/visuals/FusionTrace';
import { FrontierNotFateHero } from '@/components/visuals/FrontierNotFateHero';
import { buildAdoptionDepthFigureModel, buildAdoptionDepthExportSvg } from '@/lib/adoptionDepth';
import { loadReaderEdition, figureReviewStatus } from '@/lib/readerEdition';
import { authorCopy, studyCopy } from '@/lib/readerCopy';

/** Read mode; existing Newsreader/Inter/Plex, paper and ruled figures. Four
 * evidence scenes; optional depth, no forced motion or unsupported scoreboard.
 * Finish contract: desktop/mobile browser, evidence and publication-scope checks.
 */
export function ReaderStudy({paper=false}:{paper?:boolean}) {
  const edition=loadReaderEdition();
  const model=buildAdoptionDepthFigureModel(edition.observations);
  const [qje,metr,tcv]=edition.uses;
  return <main id="main-content" className={paper?'reader-study paper-view':'reader-study'}>
    <FrontierNotFateHero preview={edition.mode==='review-preview'} experimental={String(model.ecb.rows[1].value)} significant={String(model.ecb.rows[3].value)}/>
    {paper?<div className="reader-prose paper-instruction"><p>Paper view: the same claims, source records and arithmetic as the study. Browser Print / Save as PDF preserves the figures and expands their evidence notes.</p><p><a href="#author-draft">Read the draft author introduction</a></p></div>:null}
    <div className="reader-prose"><p>{studyCopy.argument}</p></div>
    <section id="adoption" className="study-scene">
      <div className="reader-prose"><h2>What has actually changed in work?</h2><p>Start by separating reported use from measured work. A firm can tick “yes” while still experimenting. Surveys can tell us about reach, intensity or breadth; none of those answers alone establishes a completed outcome.</p></div>
      <FigureShell basis="observed" number="1" reviewStatus="canonical" title="reported use has several meanings." subtitle="Percent of firms within each source’s own universe. ECB intensity, Census function breadth and Eurostat firm-size adoption stay separate." definitionsDiffer source="ECB SAFE Q4 2025; Census CES Working Paper 26-25; Eurostat 2025 enterprise AI use. NBS context retained, unplotted." exportBaseName="reported-ai-use" exportSvg={buildAdoptionDepthExportSvg(model)} evidenceNote={<div>{edition.adoptionClaims.map(c=><p key={c.claim_id}>{c.caveat}</p>)}<p>Observation verification: {model.verificationDate}. Edition date is not a new measurement date. <Link href="/evidence#adoption-ecb">Sources and observation periods</Link></p></div>}>
        <AdoptionDepthFigure observations={edition.observations}/>
      </FigureShell>
      <div className="reader-prose"><p>To learn what changed in the work, change the evidence. The next two studies measure tasks and outputs directly. Their contrasting results are useful precisely because each is about a particular workflow.</p></div>
      <FigureShell basis="observed" number="2" reviewStatus={figureReviewStatus([qje,metr])} draftPreview={edition.mode==='review-preview'} title="different work, different measured effects." subtitle="Separate outcomes and populations; no combined AI-productivity average. Study-specific sources and exact-use review status below." source="Brynjolfsson, Li & Raymond, QJE (2025); METR experiment (2025), with methodology update (24 February 2026)." evidenceNote={<p>{edition.mode==='review-preview' ? 'Both exact uses await the finite author/release review.' : 'Exact uses approved for this edition.'} Primary contents checked 6 September 2026 by Codex; no original replication or named specialist review. <Link href="/evidence#reader-clm-qje">Full evidence trace</Link></p>}>
        <OperationalOutcomes uses={[qje,metr]}/>
      </FigureShell>
    </section>
    <section id="mechanism" className="study-scene">
      <div className="reader-prose"><h2>Where does a faster task stop short of a finished outcome?</h2><p>A design might arrive sooner while its test still takes just as long. Or AI could improve the test as well. The interaction makes both possibilities available—and separates completing one project from sustaining repeated output.</p></div>
      <FigureShell basis="scenario" number="3" reviewStatus="reviewed" title="change the workflow assumptions." subtitle="Illustrative arithmetic, not an empirical model. Change a complement, expand where AI helps, or alter the dependencies." source="Hypothetical inputs adapted from the supplied author/editorial kit; equations and omissions shown at point of use.">
        <MechanismExperiment/>
      </FigureShell>
    </section>
    <section id="fusion" className="study-scene">
      <div className="reader-prose"><h2>Which additional change would matter?</h2><p>Fusion makes this question concrete. AI has already controlled plasma in physical hardware. The next question is what that result establishes, which conditions permit transfer, and how an improvement could reach an integrated plant outcome.</p></div>
      <FigureShell basis="observed" number="4" reviewStatus={figureReviewStatus([tcv])} draftPreview={edition.mode==='review-preview'} title="a real control result, with a longer evidence trail." subtitle="One research-tokamak demonstration and the additional evidence a plant-level conclusion would require. The arrows imply no measured timing or universal sequence." source="Degrave et al., Magnetic control of tokamak plasmas through deep reinforcement learning, Nature (2022).">
        <FusionTrace use={tcv}/>
      </FigureShell>
    </section>
    <section className="reader-prose study-ending"><h2>Follow the gain to its beneficiary.</h2><p>{studyCopy.geography}</p><p>A stronger model could relax a quality threshold, improve a limiting stage, or make a different process viable. Another complement could be decisive instead. The contribution here is a way to make that question specific enough to investigate.</p>
      <details id="author-draft" open={paper}><summary>Why I started this — draft author introduction</summary><p className="edition-note">{authorCopy.state}</p><p>{authorCopy.opening}</p><p>{authorCopy.motivation}</p><p>{authorCopy.interpretation}</p></details>
      <p className="reading-depths"><Link href="/evidence">Inspect the evidence</Link><Link href="/methods">Assumptions and method</Link><Link href="/about">About and contributions</Link></p>
    </section>
    <section className={paper ? 'reader-prose paper-bibliography' : 'reader-prose print-only'}><h2>Source references</h2><p>Observation periods remain source-specific. These original sources support the figures; exact caveats and review states accompany the figures and the evidence page.</p><ul>{edition.sources.filter(source=>['src-0038','src-0048','src-0042','reader-src-qje','reader-src-metr','reader-src-metr-update','fusion-src-017'].includes(source.source_id)).map(source=><li key={source.source_id}><a href={source.url_or_doi}>{source.title_english}</a> · {source.authors_org} · {source.publication_date}<span className="print-only figure-note">{source.url_or_doi}</span></li>)}</ul></section>
  </main>;
}
