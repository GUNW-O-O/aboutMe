// V2 프로젝트 데이터 단일 소스 — agent-built 프로젝트 (설계: docs/superpowers/specs/2026-07-07-projects-v2-design.md)
// 진행 중 프로젝트는 싣지 않는다 — 해당 리포 README에 기록하며 개발, 완료 시에만 여기 반영.
// 새 프로젝트 추가 = assets/<id>/ 폴더 생성 + 이 배열에 항목 1개. 컴포넌트 수정 불필요.
// 내용은 사용자 회고에서만 — 지어내기 금지.
// 서사 비중: 기술선정·트러블은 간결, 회고(retrospective)가 주인공, evidence가 상세 최상단.

export type ProjectV2 = {
  id: string // slug — V1(projects.ts)과 네임스페이스 공유, 중복 금지
  title: string
  agentBuilt?: boolean
  isHighlight?: boolean // 대표작 1개만 — 그룹 최상단 고정 + 2칸 강조 (evidence의 featured와 무관)
  sortKey: string // 'YYYY-MM' — 내림차순 정렬 기준
  summary: string
  period: string
  links: { label: string; url: string }[]
  stacks: { name: string; insight?: string }[] // insight = 이 프로젝트로 알게 된 핵심 한 줄
  evidence: {
    // 주인공 ① — 상세페이지 최상단 갤러리. 캡션은 의사결정/검증 서술, 기능 나열 금지
    src: string
    caption: string
    featured?: boolean
  }[]
  decisions: {
    // 설계 판단 — 간결 (V1 troubles보다 가벼움)
    topic: string // 무엇을 정해야 했나
    choice: string
    reason: string // 비교한 대안 포함 가능
  }[]
  troubles?: { problem: string; solution: string }[]
  retrospective: string[] // 주인공 ② — 단락 배열. 기술 이해 깊이·개발 방식 회고
  noteIds?: string[] // 연결된 TechNote id (entities/notes.ts)
  thumbnail?: string // 없으면 카드 placeholder
}

export const projectsV2: ProjectV2[] = []

// V1과 동일 정렬 규칙 — isHighlight 최상단 고정, 나머지 sortKey 내림차순
export const sortedProjectsV2 = [...projectsV2].sort(
  (a, b) =>
    Number(b.isHighlight ?? false) - Number(a.isHighlight ?? false) ||
    b.sortKey.localeCompare(a.sortKey),
)
