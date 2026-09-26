import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { render } from '../content'
import Lightbox, { type LightboxItem } from './Lightbox'

type Props = {
  md: string
  head?: ReactNode
  after?: ReactNode
  extraToc?: { id: string; text: string }[]
  className?: string
}

/** md 본문 + 오른쪽 목차 + 이미지 확대. 목차는 ## 헤딩에서 자동 생성 */
export default function Article({ md, head, after, extraToc = [], className }: Props) {
  const { html, toc: mdToc } = useMemo(() => render(md), [md])
  const toc = [...mdToc, ...extraToc]
  const ids = toc.map(t => t.id).join('|')
  const [active, setActive] = useState('')
  const [zoom, setZoom] = useState<LightboxItem | null>(null)
  const [params] = useSearchParams()
  const target = params.get('h')

  // 다른 문서의 특정 판단으로 들어온 링크(?h=id)
  useEffect(() => {
    if (target) document.getElementById(target)?.scrollIntoView()
  }, [target, html])

  useEffect(() => {
    const onScroll = () => {
      let cur = ''
      for (const id of ids.split('|')) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 120) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  const onClick = (e: MouseEvent) => {
    const fig = (e.target as HTMLElement).closest<HTMLElement>('.fig')
    if (fig) setZoom({ src: fig.dataset.src!, title: fig.dataset.cap ?? '' })
  }

  return (
    <>
      <main className="main">
        <article className={`doc ${className ?? ''}`}>
          {head}
          <div className="md" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
          {after}
        </article>
      </main>
      {toc.length > 1 && (
        <aside className="toc" aria-label="목차">
          <div className="label">on this page</div>
          {toc.map(t => (
            <button key={t.id} type="button" className={t.id === active ? 'on' : ''}
              onClick={() => document.getElementById(t.id)?.scrollIntoView({ behavior: 'smooth' })}>
              {t.text}
            </button>
          ))}
        </aside>
      )}
      {zoom && <Lightbox item={zoom} onClose={() => setZoom(null)} />}
    </>
  )
}
