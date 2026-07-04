// 타임라인 단일 소스 — 경력/교육/자격증/프로젝트 통합.
// 항목 추가만으로 타임라인 갱신. kind별 렌더링은 Timeline 위젯이 처리.

import sqldImg from '../assets/certificate/SQLD.png'
import adspImg from '../assets/certificate/ADsP.png'
import webdImg from '../assets/certificate/webd.png'

export type TimelineItem = {
  kind: 'project' | 'education' | 'certificate'
  sortKey: string // 'YYYY-MM' — 내림차순 정렬 기준
  date: string // 표시용
  title: string
  sub?: string
  projectId?: string // kind=project 일 때 상세 링크
  img?: string // kind=certificate 일 때 모달 이미지
  issuer?: string
}

export const timeline: TimelineItem[] = [
  {
    kind: 'project',
    sortKey: '2026-02',
    date: '2026.02 – 03',
    title: 'Playsync',
    sub: '홀덤 토너먼트 관리 SaaS MVP (개인)',
    projectId: 'playsync',
  },
  {
    kind: 'project',
    sortKey: '2025-09',
    date: '2025.09',
    title: 'Lexi-hub',
    sub: 'JWT·MongoDB·NestJS 학습 프로젝트 (개인)',
    projectId: 'lexi-hub',
  },
  {
    kind: 'certificate',
    sortKey: '2025-09',
    date: '2025.09',
    title: 'ADsP',
    issuer: 'K-DATA',
    img: adspImg,
  },
  {
    kind: 'education',
    sortKey: '2025-03',
    date: '2025.03',
    title: '부트캠프 등록',
    sub: '더조은컴퓨터아카데미 — 풀스택',
  },
  {
    kind: 'education',
    sortKey: '2025-09-15',
    date: '2025.09',
    title: '부트캠프 수료',
    sub: '더조은컴퓨터아카데미 — 팀 프로젝트 3회',
  },
  {
    kind: 'project',
    sortKey: '2025-08',
    date: '2025.08',
    title: 'Resonos React',
    sub: 'SSR → React 전환 + 커뮤니티 (팀 4인)',
    projectId: 'resonos-react',
  },
  {
    kind: 'project',
    sortKey: '2025-06',
    date: '2025.06 – 07',
    title: 'Resonos Thymeleaf',
    sub: '투표 기반 음악 커뮤니티 (팀 4인)',
    projectId: 'resonos-thymeleaf',
  },
  {
    kind: 'certificate',
    sortKey: '2025-06',
    date: '2025.06',
    title: 'SQLD',
    issuer: 'K-DATA',
    img: sqldImg,
  },
  {
    kind: 'certificate',
    sortKey: '2025-06',
    date: '2025.06',
    title: '웹디자인개발기능사',
    issuer: '한국산업인력공단',
    img: webdImg,
  },
  {
    kind: 'project',
    sortKey: '2025-05',
    date: '2025.05',
    title: '할건해야짐',
    sub: '헬스장 통합 관리 — 첫 팀 프로젝트',
    projectId: 'hhg',
  },
]

export const sortedTimeline = [...timeline].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
)

// 같은 달 항목은 하나의 타임라인 노드로 묶는다 — 월당 점·날짜 하나.
export type TimelineGroup = {
  key: string // 'YYYY-MM'
  date: string // 표시용 — 단일 항목이면 원 날짜(범위 보존), 복수면 'YYYY.MM'
  items: TimelineItem[]
}

export const groupedTimeline: TimelineGroup[] = (() => {
  const map = new Map<string, TimelineItem[]>()
  for (const item of sortedTimeline) {
    const key = item.sortKey.slice(0, 7)
    const arr = map.get(key)
    if (arr) arr.push(item)
    else map.set(key, [item])
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, items]) => ({
      key,
      date: items.length === 1 ? items[0].date : `${key.slice(0, 4)}.${key.slice(5, 7)}`,
      items,
    }))
})()
