import { useEffect, useState, type MouseEvent } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { CERT_ID, mainDoc, mainIntro, mainRest, projects, render, type Doc } from '../content'
import Lightbox, { type LightboxItem } from '../shared/Lightbox'
import photo from '../assets/gunwoo.jpg'
import sqld from '../assets/certificate/SQLD.png'
import adsp from '../assets/certificate/ADsP.png'
import webd from '../assets/certificate/webd.png'

const certs: LightboxItem[] = [
  { src: adsp, title: 'ADsP', sub: '2025.09 · K-DATA' },
  { src: sqld, title: 'SQLD', sub: '2025.06 · K-DATA' },
  { src: webd, title: '웹디자인개발기능사', sub: '2025.06 · 한국산업인력공단' },
]

function Byline() {
  return (
    <div className="byline">
      <div className="photo"><img src={photo} alt="고건우 프로필 사진" /></div>
      <div className="byline-text">
        <div className="name">고건우</div>
        <p className="intro" dangerouslySetInnerHTML={{ __html: mainIntro }} />
        <div className="links">
          <a className="ext" href="https://github.com/GUNW-O-O" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:go971230@gmail.com">Email</a>
        </div>
      </div>
    </div>
  )
}

function DocHead({ doc }: { doc: Doc }) {
  const { title, summary, period, role, visibility, links = {} } = doc.meta
  return (
    <>
      <h1>{title}</h1>
      {summary && <p className="lede">{summary}</p>}
      <div className="meta">
        {period && <span className="mono">{period}</span>}
        {role && <span>{role}</span>}
        {visibility && <span>{visibility}</span>}
        {Object.entries(links).map(([label, url]) => (
          <a key={label} className="ext" href={url} target="_blank" rel="noopener noreferrer">{label}</a>
        ))}
      </div>
    </>
  )
}

/** 메인 + 전 문서를 한 페이지로. /docs/:slug?h=id 는 그 위치로 스크롤한다 */
export default function Home() {
  const [zoom, setZoom] = useState<LightboxItem | null>(null)
  const { slug } = useParams()
  const [params] = useSearchParams()
  const { key } = useLocation()   // 같은 주소를 다시 눌러도 스크롤하도록
  const h = params.get('h')

  useEffect(() => {
    const el = (h && document.getElementById(h)) || (slug && document.getElementById(`doc-${slug}`))
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [slug, h, key])

  const onClick = (e: MouseEvent) => {
    const fig = (e.target as HTMLElement).closest<HTMLElement>('.fig')
    if (fig) setZoom({ src: fig.dataset.src!, title: fig.dataset.cap ?? '' })
  }

  return (
    <main className="main" onClick={onClick}>
      <article className="doc home" id="doc-home">
        <Byline />
        {mainDoc?.meta.title && <h1>{mainDoc.meta.title}</h1>}
        <div className="md" dangerouslySetInnerHTML={{ __html: render(mainRest).html }} />
        <hr />
        <h2 id={CERT_ID}>자격증</h2>
        <div className="certs">
          {certs.map(c => (
            <button key={c.title} type="button" className="cert" onClick={() => setZoom(c)}>
              <img src={c.src} alt={`${c.title} 자격증`} loading="lazy" />
              <span>{c.title}</span>
            </button>
          ))}
        </div>
      </article>
      {projects.map(d => (
        <article key={d.slug} id={`doc-${d.slug}`} className="doc page">
          <DocHead doc={d} />
          <div className="md" dangerouslySetInnerHTML={{ __html: render(d.body, d.kind === '회사').html }} />
        </article>
      ))}
      {zoom && <Lightbox item={zoom} onClose={() => setZoom(null)} />}
    </main>
  )
}
