import { useEffect, useState, type MouseEvent } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { archived, mainDoc, mainRest, projects, render, shortTitle, type Doc } from '../content'
import Lightbox, { type LightboxItem } from '../shared/Lightbox'
import photo from '../assets/gunwoo-avatar.jpg'

function Byline() {
  return (
    <div className="byline">
      <div className="photo"><img src={photo} alt="고건우 프로필 사진" /></div>
      <div className="byline-text">
        <div className="name">고건우</div>
        <div className="role">풀스택 웹 개발자 · Spring Boot · NestJS · Next.js · React</div>
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
          <a key={label} className="ext" href={url} target="_blank" rel="noopener noreferrer">
            {label === 'repo' ? 'GitHub 리포지토리' : `GitHub 리포지토리 · ${label}`}
          </a>
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
    if (el) {
      // 접어 둔 절·보관 문서로 가는 링크면 감싼 블록을 모두 펼친다
      for (let d = el.closest('details'); d; d = d.parentElement?.closest('details') ?? null) d.open = true
      el.scrollIntoView()
    }
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
      </article>
      {projects.map(d => (
        <article key={d.slug} id={`doc-${d.slug}`} className="doc page">
          <DocHead doc={d} />
          <div className="md" dangerouslySetInnerHTML={{ __html: render(d.body, d.kind === '회사').html }} />
        </article>
      ))}
      {archived.length > 0 && (
        <article className="doc">
          {archived.map(d => (
            <details key={d.slug} id={`doc-${d.slug}`} className="more">
              <summary>{shortTitle(d)} · {d.meta.period}</summary>
              <DocHead doc={d} />
              <div className="md" dangerouslySetInnerHTML={{ __html: render(d.body, d.kind === '회사').html }} />
            </details>
          ))}
        </article>
      )}
      {zoom && <Lightbox item={zoom} onClose={() => setZoom(null)} />}
    </main>
  )
}
