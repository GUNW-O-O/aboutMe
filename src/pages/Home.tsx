import { useState } from 'react'
import { mainDoc, mainIntro, mainRest } from '../content'
import Article from '../shared/Article'
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
const certToc = [{ id: '자격증', text: '자격증' }]

export function Byline() {
  return (
    <div className="byline">
      <img className="photo" src={photo} alt="고건우 프로필 사진" />
      <div>
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

export default function Home() {
  const [zoom, setZoom] = useState<LightboxItem | null>(null)
  if (!mainDoc) return <main className="main"><p>docs/main.md가 없습니다.</p></main>

  return (
    <>
      <Article
        className="home"
        md={mainRest}
        extraToc={certToc}
        head={<><Byline /><h1>{mainDoc.meta.title}</h1></>}
        after={
          <section>
            <hr />
            <h2 id="자격증">자격증</h2>
            <div className="certs">
              {certs.map(c => (
                <button key={c.title} type="button" className="cert" onClick={() => setZoom(c)}>
                  <img src={c.src} alt={`${c.title} 자격증`} loading="lazy" />
                  <span>{c.title}</span>
                </button>
              ))}
            </div>
          </section>
        }
      />
      {zoom && <Lightbox item={zoom} onClose={() => setZoom(null)} />}
    </>
  )
}
