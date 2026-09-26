import { Navigate, useParams } from 'react-router-dom'
import { getDoc, type Doc } from '../content'
import Article from '../shared/Article'

export function DocHead({ doc }: { doc: Doc }) {
  const { title, period, role, visibility, links = {} } = doc.meta
  return (
    <>
      <h1>{title}</h1>
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

export default function DocPage() {
  const { slug = '' } = useParams()
  const doc = getDoc(slug)
  if (!doc || slug === 'main') return <Navigate to="/" replace />
  return <Article key={slug} md={doc.body} head={<DocHead doc={doc} />} />
}
