# AboutMe — 개인 포트폴리오

React 19 + TypeScript + Vite. GitHub Pages 배포 전제(HashRouter). 소유자: 고건우 (주니어 풀스택).

## 명령어

```bash
npm run dev      # Vite 개발 서버
npm run build    # tsc -b && vite build
npm run lint     # eslint
```

## 페이지 구조

- `/` — 원페이지 스크롤: sticky nav → Hero(메시 그라디언트) → About → 기술 스트립(LogoLoop 3줄) → Projects(2그룹: agent-built + 부트캠프 접기, isHighlight 대표작 최상단 고정·2칸 강조) → 다크 밴드(CardSwap — 프로젝트 상세 하이라이트 슬라이드) → 통합 타임라인 → Footer
- 다크 밴드 규칙: 수치 집계 지표 금지(과장), 억지 서사 금지. 실제 상세 페이지에 있는 장면만 티저로. 프로젝트 그리드가 주 접근 경로, 슬라이드는 순수 보조.
- `/projects/:id` — 프로젝트 상세: 요약 메타 카드 → 역할/배운점 → Problem/Solution 병치 카드 → 스크린샷 3~4장 + 접기

## 콘텐츠 원칙

- **지어내기 금지.** 프로젝트·노트 내용은 코드/README에서 검증한 사실 + 사용자 답변에서만. 서사·동기·수치·이유를 에이전트가 창작하지 않는다.
- 수치는 개별 프로젝트 서술 안에서만 — 사이트 전체 집계 지표(프로젝트 N개 등)는 과장으로 보여 금지.
- 캡션은 의사결정/문제해결 서술 — 기능 나열("~을 구현했습니다"만), 이모지 남발 금지.

## 부트캠프 프로젝트 — 동결 (2026-07-07)

기존 6개 프로젝트(hhg, resonos-thymeleaf, resonos-react, lexi-hub, playsync, aboutme)는 인터뷰·정리 완료. **제거가 아닌 이상 내용 수정하지 않는다.** 인터뷰 원문·검증 기록은 `docs/interviews/*.md`(gitignore) 보존.

- 예외: `aboutme`는 진행형 — featured 승격(정렬 규칙이 featured를 최상단 고정, sortKey는 시작월 이력 그대로 보존), 구조는 V1 유지.

## V2 체제 — 앞으로의 프로젝트

설계 원문: `docs/superpowers/specs/2026-07-07-projects-v2-design.md`

- **진행 중 프로젝트는 여기 싣지 않는다.** 개발 중엔 해당 프로젝트 리포의 README에 기록. 완료 시에만 aboutMe 반영.
- 완료 시 반영 = `projectsV2.ts` 항목 1개 + (있으면) `notes.ts` 항목 추가. **컴포넌트 수정 없이 끝나야 정상.** 내용은 사용자 회고에서만.
- V2 서사 비중: 기술선정·트러블은 간결, **회고가 주인공**, 구현 증거(evidence)가 상세 최상단.
- 배치: 홈 Projects 섹션 2그룹 — 상단 "agent-built 프로젝트"(항상 펼침, 비면 미렌더) + 하단 "부트캠프 프로젝트"(아코디언, 기본 펼침). **전환 규칙: agent-built 3개 쌓이면 부트캠프 기본 접힘으로.**
- 나중 구현 트리거: ProjectDetailV2 = 첫 V2 프로젝트 완결 시, /notes 페이지 + 홈 진입점 = 첫 TechNote 작성 시.

## 디자인 규칙 (DESIGN.md 요약 — 위반 금지)

- **다크 기본 + 라이트 토글** (2026-07-03 사용자 결정 — DESIGN.md 라이트 우선 원칙의 polarity 반전 매핑): 토큰은 `src/index.css` `:root`(다크)/`[data-theme='light']` 이중 정의. 새 색상은 반드시 두 테마 모두 정의. 토글은 Nav, 상태는 localStorage(`theme`), FOUC 방지 스크립트는 index.html. 다크 밴드는 양 테마에서 어두움 유지.
- 장식은 **히어로 메시 그라디언트 하나** (develop/preview/ship 3쌍 스톱). 축소·단색화·아이콘화 금지.
- 헤드라인: 문장형+마침표, weight 600 상한(700 금지), 네거티브 트래킹, 대문자 금지.
- 모노스페이스는 eyebrow/코드/기술 라벨만. 본문 모노 금지.
- CTA: 마케팅 스케일 = 100px pill, nav 스케일 = 6px 사각. 같은 화면에서 두 스케일 혼용 금지.
- 그림자: 스택 섀도(작은 오프셋 여러 겹 + 인셋 헤어라인). 단일 무거운 drop-shadow 금지.
- 새 액센트 색 추가 금지. semantic(red/blue/amber)은 상태 표시에만.
- 기타 필수: 클릭 요소는 `button`/`a` (div 클릭 금지), 모달 ESC 닫기, `lang="ko"`, breakpoint 768px 1열 전환, 탭 타깃 44px.

## 데이터 모델

프로젝트 추가 = ① assets 폴더 생성 ② entities 항목 1개 추가. 정렬은 `sortKey`(YYYY-MM) 내림차순 자동.

### Project (V1 — 동결, `src/entities/projects.ts`)

```ts
export type Project = {
  id: string                  // slug — 라우트 키
  title: string
  type: 'team' | 'personal'
  agentBuilt?: boolean          // 에이전트 협업 프로세스로 만든 프로젝트만 true (agent-built — 제품이 아닌 제작 방식)
  isHighlight?: boolean          // 대표작 1개만 — 최상단 고정 + 그리드 2칸 강조 (screenshots의 featured와 무관)
  sortKey: string             // 'YYYY-MM' 시작월 — 정렬은 isHighlight 우선 후 sortKey 내림차순
  summary: string
  period: string
  team?: string
  roles: string[]
  stacks: { name: string; reason?: string }[]
  links: { label: string; url: string }[]
  troubles: { problem: string; approach?: string; solution: string; result?: string }[]
  learnings: string
  highlight?: { src: string; caption: string }   // 다크 밴드 CardSwap용, 프로젝트당 1장
  screenshots: { src: string; caption: string; featured?: boolean }[]
  thumbnail?: string          // 없으면 카드 placeholder
}
```

### ProjectV2 (`src/entities/projectsV2.ts`)

```ts
export type ProjectV2 = {
  id: string                  // V1과 네임스페이스 공유, 중복 금지
  title: string
  agentBuilt?: boolean
  isHighlight?: boolean          // V1과 동일 — 그룹 최상단 고정 + 2칸 강조
  sortKey: string
  summary: string
  period: string
  links: { label: string; url: string }[]
  stacks: { name: string; insight?: string }[]   // insight = 이 프로젝트로 알게 된 핵심 한 줄
  evidence: { src: string; caption: string; featured?: boolean }[]  // 상세 최상단 갤러리
  decisions: { topic: string; choice: string; reason: string }[]    // 설계 판단 — 간결
  troubles?: { problem: string; solution: string }[]
  retrospective: string[]     // 주인공 — 단락 배열
  noteIds?: string[]          // TechNote 연결
  thumbnail?: string
}
```

### TechNote (`src/entities/notes.ts`)

```ts
export type TechNote = {
  id: string
  tech: string                // 'Redis' | 'PostgreSQL' ... 그룹핑 키
  projectId?: string          // 어느 프로젝트에서 얻었나
  title: string
  body: string[]              // 단락 배열 — 회고 성격, 블로그 아님
  date: string                // 'YYYY-MM'
}
```

## 폴더 구조

```
src/
  pages/        # Home.tsx, ProjectDetail.tsx
  widgets/      # Hero, About, TechStrip, ProjectsGrid, HighlightBand, Timeline, Footer
  features/     # Nav, ProjectCard, CertModal
  shared/       # reactbits 래퍼, Img, theme, BackToTop 등
  entities/     # projects.ts(V1), projectsV2.ts, notes.ts, timeline.ts, techStrip.ts
  assets/       # <project-id>/ 폴더 단위
docs/           # gitignore — interviews/(인터뷰 원문), superpowers/specs/(설계 문서)
```

`timeline.ts`도 단일 배열(타입 필드로 education/certificate/project 구분) — 항목 추가만으로 타임라인 갱신.
