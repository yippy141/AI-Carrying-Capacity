import Link from 'next/link';
import { studyCopy } from '@/lib/readerCopy';
export function FrontierNotFateHero({experimental,significant,preview}:{experimental:string;significant:string;preview:boolean}) {
  return <section className="reader-hero">
    <p className="edition-note">First reader edition · {preview ? "review preview" : "author-reviewed edition"} · edition updated 6 September 2026</p>
    <h1>Frontier Is Not Fate</h1>
    <p className="hero-question">{studyCopy.question}</p>
    <p className="hero-description">{studyCopy.subquestion}</p>
    <div className="overview-result"><p>One supported starting point: in the ECB’s Q4 2025 survey, <strong>{experimental}%</strong> of responding firms reported very infrequent or experimental AI use; <strong>{significant}%</strong> reported significant use.</p><p className="figure-note">Self-reported intensity among weighted SAFE respondents. This tells us how firms report using AI; it does not measure a productivity gain. <Link href="/evidence#adoption-ecb">Source and limits</Link></p></div>
    <nav className="reading-depths" aria-label="Choose your reading depth"><a href="#adoption">Follow the visual study</a><a href="#mechanism">Try the workflow experiment</a><Link href="/paper">Read the paper</Link></nav>
  </section>;
}
