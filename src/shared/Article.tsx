import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { render } from '../content'
import Lightbox, { type LightboxItem } from './Lightbox'

type Props = {
  md: string
  head?: ReactNode
  after?: ReactNode
  className?: string
}

/** md 본문 + 이미지 확대. 목차는 사이드바가 그린다 */
export default function Article({ md, head, after, className }: Props) {
  const { html } = render(md)
  const [zoom, setZoom] = useState<LightboxItem | null>(null)
  const [params] = useSearchParams()
  const target = params.get('h')

  // 다른 문서의 특정 판단으로 들어온 링크(?h=id)
  useEffect(() => {
    if (target) document.getElementById(target)?.scrollIntoView()
  }, [target, html])

  const onClick = (e: MouseEvent) => {
    const fig = (e.target as HTMLElement).closest<HTMLElement>('.fig')
    if (fig) setZoom({ src: fig.dataset.src!, title: fig.dataset.cap ?? '' })
  }

  return (
    <main className="main">
      <article className={`doc ${className ?? ''}`}>
        {head}
        <div className="md" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
        {after}
      </article>
      {zoom && <Lightbox item={zoom} onClose={() => setZoom(null)} />}
    </main>
  )
}
