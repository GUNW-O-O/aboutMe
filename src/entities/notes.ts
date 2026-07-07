// TechNote — 프로젝트를 진행하며 해당 스택에 대해 더 깊게 알게 된 점의 요약. 회고 성격, 블로그 아님.
// tech 필드로 그룹핑해 "이 스택을 프로젝트 거치며 어디까지 이해했나" 축적을 보여준다.
// /notes 페이지 + 홈 진입점은 첫 노트 작성 시 구현 (빈 페이지 배포 방지).
// 내용은 사용자 회고에서만 — 지어내기 금지.

export type TechNote = {
  id: string
  tech: string // 'Redis' | 'PostgreSQL' | 'TypeScript' ... 그룹핑 키
  projectId?: string // 어느 프로젝트에서 얻었나 (projectsV2 id)
  title: string // 요지 한 줄
  body: string[] // 단락 배열
  date: string // 'YYYY-MM'
}

export const notes: TechNote[] = []
