import { marked, type Token, type Tokens } from 'marked'

// 원고는 docs/(gitignore, 로컬 전용)
const raws = import.meta.glob<string>('../docs/*.md', {
  eager: true, query: '?raw', import: 'default',
})
const assets = import.meta.glob<string>('./assets/**/*.{png,jpg,jpeg,avif,webp,gif}', {
  eager: true, import: 'default',
})

export type Meta = {
  title: string
  period?: string
  role?: string
  visibility?: string
  summary?: string
  core?: string
  links?: Record<string, string>
}

export type Doc = {
  slug: string
  meta: Meta
  body: string
  kind: '개인' | '팀' | '회사'
}

// 들여쓴 한 단계 객체(links:)까지만 읽는다 — 원고 frontmatter가 그 이상을 쓰지 않는다
function parseFrontmatter(src: string): { meta: Meta; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { meta: { title: '' }, body: src }
  const meta: Record<string, unknown> = {}
  let parent: Record<string, string> | null = null
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\s*)([\w-]+):\s*(.*)$/)
    if (!kv) continue
    const [, indent, key, value] = kv
    if (indent && parent) parent[key] = value
    else if (!value || value === '{}') meta[key] = parent = {}  // `{}` 문자열이면 링크가 글자(0,1)로 풀린다
    else { meta[key] = value; parent = null }
  }
  return { meta: meta as Meta, body: src.slice(m[0].length) }
}

// ponytail: role 문구로 분류 — 원고 role이 형식을 벗어나면 frontmatter에 kind를 추가
const kindOf = (role = ''): Doc['kind'] =>
  role.startsWith('개인') ? '개인' : /팀/.test(role) ? '팀' : '회사'

const startOf = (period = '') => period.match(/\d{4}\.\d{2}/)?.[0] ?? ''

export const docs: Doc[] = Object.entries(raws).map(([path, src]) => {
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const { meta, body } = parseFrontmatter(src)
  return { slug, meta, body, kind: kindOf(meta.role) }
})

export const mainDoc = docs.find(d => d.slug === 'home')

// 메인 첫 문단은 머리말(이름 아래)로, 나머지가 본문
const [introMd = '', ...restMd] = (mainDoc?.body.trim() ?? '').split(/\r?\n\r?\n/)
export const mainIntro = marked.parseInline(introMd.replace(/\r?\n/g, ' ')) as string
export const mainRest = restMd.join('\n\n')

// 사이드바 순서 = 핵심(core: true) 먼저, 그다음 시작월 내림차순
const isCore = (d: Doc) => d.meta.core === 'true'
export const projects = docs
  .filter(d => d.slug !== 'home')
  .sort((a, b) => Number(isCore(b)) - Number(isCore(a))
    || startOf(b.meta.period).localeCompare(startOf(a.meta.period)))

export const getDoc = (slug: string) => docs.find(d => d.slug === slug)

export const shortTitle = (d: Doc) => d.meta.title.split(' — ')[0]

const plain = (md: string) => md.replace(/\*\*|`|\[|\]\([^)]*\)/g, '')

// 미리보기 카드 요약 — frontmatter summary, 없으면 본문 첫 문단
export const summaryOf = (d: Doc) =>
  d.meta.summary ?? plain(d.body.trim().split(/\r?\n\r?\n/)[0].replace(/\r?\n/g, ' '))

export const slugify = (text: string) =>
  text.trim().toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-')

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

marked.use({
  renderer: {
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens)
      const internal = href.match(/^\.\/([\w-]+)\.md(#.*)?$/)
      if (internal) {
        const target = getDoc(internal[1])
        const hash = internal[2] ? `?h=${internal[2].slice(1)}` : ''
        const pv = target
          ? `<span class="pv" role="tooltip"><b>${esc(target.meta.title)}</b>` +
            `<i>${esc([target.meta.period, target.meta.role].filter(Boolean).join(' · '))}</i>` +
            `${esc(summaryOf(target))}</span>`
          : ''
        return `<a class="int" href="#/docs/${internal[1]}${hash}">${text}${pv}</a>`
      }
      return `<a class="ext" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`
    },
    // ![캡션](경로 "대표") — 대표 화면만 인쇄/PDF에 나간다
    image({ href, text, title }) {
      const src = assets[`./assets/${href}`] ?? href
      const cls = title === '대표' ? 'fig featured' : 'fig'
      return `<button type="button" class="${cls}" data-src="${esc(src)}" data-cap="${esc(text)}">` +
        `<img src="${esc(src)}" alt="${esc(text)}" loading="lazy"><span>${esc(text)}</span></button>`
    },
  },
})

const LABELS = ['문제', '원인', '대안', '선택', '결과', '한계']
const LABEL_RE = new RegExp(`^\\*\\*(${LABELS.join('|')})\\*\\* — `)

export type TocItem = { id: string; text: string; no?: string }

/**
 * md → html. 판단(`**문제** — …` 문단들)은 dl 판단 블록으로, 그 앞 ##에는 번호를 붙인다.
 * 라벨 문단 뒤에 이어지는 목록·문단은 다음 ##나 --- 전까지 직전 라벨 칸에 넣는다.
 */
const cache = new Map<string, { html: string; toc: TocItem[] }>()

export function render(md: string): { html: string; toc: TocItem[] } {
  const hit = cache.get(md)
  if (hit) return hit
  const tokens = marked.lexer(md)
  const block = (ts: Token[]) => marked.parser(Object.assign(ts, { links: tokens.links }))
  const out: string[] = []
  const toc: TocItem[] = []
  let no = 0
  let dl: { label: string; html: string }[] | null = null

  const flush = () => {
    if (!dl) return
    out.push('<dl class="judge">' + dl.map(({ label, html }) => {
      const body = label === '결과'
        ? html.replace(/^<p><code>([^<]*→[^<]*)<\/code>\s*/, '<p><span class="delta">$1</span>')
        : html
      return `<dt${label === '한계' ? ' class="limit"' : ''}>${label}</dt><dd>${body}</dd>`
    }).join('') + '</dl>')
    dl = null
  }

  tokens.forEach((t, i) => {
    if (t.type === 'heading' || t.type === 'hr') flush()
    if (t.type === 'heading' && (t as Tokens.Heading).depth === 2) {
      const text = (t as Tokens.Heading).text
      const id = slugify(plain(text))
      let judged = false
      for (let j = i + 1; j < tokens.length; j++) {
        const n = tokens[j]
        if (n.type === 'hr' || (n.type === 'heading' && (n as Tokens.Heading).depth <= 2)) break
        if (n.type === 'paragraph' && LABEL_RE.test(n.raw)) { judged = true; break }
      }
      const num = judged ? String(++no).padStart(2, '0') : undefined
      toc.push({ id, text: plain(text), no: num })
      const inner = marked.parseInline(text) as string
      out.push(num
        ? `<h2 id="${id}" class="jh"><span class="no">${num}</span><span>${inner}</span></h2>`
        : `<h2 id="${id}">${inner}</h2>`)
      return
    }
    const label = t.type === 'paragraph' ? t.raw.match(LABEL_RE)?.[1] : undefined
    if (label) {
      dl ??= []
      dl.push({ label, html: marked.parse(t.raw.replace(LABEL_RE, '')) as string })
    } else if (dl && t.type !== 'space') {
      dl[dl.length - 1].html += block([t])
    } else if (!dl) {
      out.push(block([t]))
    }
  })
  flush()
  const result = { html: out.join(''), toc }
  cache.set(md, result)
  return result
}

export const CERT_ID = '자격증'

/** 사이드바에 펼칠 목차 — slug 없으면 메인 */
export const tocFor = (slug?: string): TocItem[] => {
  if (!slug) return [...render(mainRest).toc, { id: CERT_ID, text: '자격증' }]
  const d = getDoc(slug)
  return d ? render(d.body).toc : []
}
