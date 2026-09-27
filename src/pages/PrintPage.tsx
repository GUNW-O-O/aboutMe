import { useMemo } from 'react'
import { mainDoc, mainRest, projects, render } from '../content'
import { Byline } from './Home'
import { DocHead } from './DocPage'

/** 전체 인쇄용 — 메인 + 전 문서를 이어 붙인다. 브라우저 인쇄(PDF 저장)로 쓴다 */
export default function PrintPage() {
  const parts = useMemo(() => projects.map(d => ({ d, html: render(d.body).html })), [])
  const main = useMemo(() => render(mainRest).html, [])

  return (
    <main className="main print-all">
      <p className="print-hint">
        <button type="button" onClick={() => window.print()}>인쇄 / PDF 저장</button>
      </p>
      <article className="doc home">
        <Byline />
        {mainDoc?.meta.title && <h1>{mainDoc.meta.title}</h1>}
        <div className="md" dangerouslySetInnerHTML={{ __html: main }} />
      </article>
      {parts.map(({ d, html }) => (
        <article key={d.slug} className="doc page">
          <DocHead doc={d} />
          <div className="md" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      ))}
    </main>
  )
}
