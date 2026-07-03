# AboutMe — 개인 포트폴리오

React 19 + TypeScript + Vite. GitHub Pages 배포 전제(HashRouter). 소유자: 고건우 (주니어 풀스택, Java/Spring/React).

## 명령어

```bash
npm run dev      # Vite 개발 서버
npm run build    # tsc -b && vite build
npm run lint     # eslint
```

## 현재 상태와 목표 (2026-07 기준)

**v2 개편 진행 중.** 기준 문서 두 개가 이 저장소의 단일 진실:

- `DESIGN.md` — 디자인 시스템 (Vercel-design-analysis 토큰). 모든 색/타이포/간격/컴포넌트 스타일은 여기서 파생. 임의 색상·스타일 추가 금지.
- `wireframe.html` — v2 레이아웃 목업 (브라우저로 열면 렌더됨). 골조·섹션 구성·reactbits 매핑의 시각적 기준.

진행 상황은 `tasks.md`에서 관리 — **작업 완료/추가 시마다 갱신할 것** (완료 = 체크, 새 작업 = 해당 단계 섹션에 추가).

**작업 순서 (엄수):** ① 골조(레이아웃/라우팅/데이터 모델) → ② 프로젝트별 상담으로 콘텐츠 수집 → ③ 애니메이션/폴리시. 골조가 확정되기 전 애니메이션 작업 금지.

**진행 상황:** ① 골조 구현 완료 (2026-07-03) — 원페이지 + 상세 라우트, projects.ts/career.ts/techStrip.ts 마이그레이션, 레거시 페이지·컴포넌트·swiper/framer-motion/motion 제거, gsap 설치됨(③단계용, 아직 미사용). 다음 = ② 상담. `projects.ts`의 `TODO(상담)` 주석이 미수집 항목 표시.

### v2 구조 요약

멀티페이지+캐러셀 구조를 폐기하고:

- `/` — 원페이지 스크롤: sticky nav → Hero(메시 그라디언트) → About → 기술 스트립(LogoLoop 3줄, Skills 섹션 대체) → Projects 그리드(최신순, featured 강조) → 다크 밴드(CardSwap — 프로젝트 상세 하이라이트 슬라이드) → 통합 타임라인 → Footer
- 다크 밴드 규칙: 수치 집계 지표 금지(과장), "문서화 방법론" 류 억지 서사 금지. 실제 상세 페이지에 있는 장면만 티저로. 프로젝트 그리드가 주 접근 경로이므로 슬라이드는 순수 보조.
- `/projects/:id` — 프로젝트 상세: 요약 메타 카드 → 역할/배운점 → Problem/Solution 병치 카드(세로 나열) → 스크린샷 3~4장 + 접기

레거시에서 반드시 제거할 것: Welcome 게이트 페이지, Swiper 캐러셀, shields.io 뱃지 38개, `min-width: 900px` 고정폭, 스크롤바 숨김, DecryptedText 자기소개, 클릭 전 빈 화면("프로젝트를 클릭해주세요").

## 디자인 규칙 (DESIGN.md 요약 — 위반 금지)

- **다크 기본 + 라이트 토글** (2026-07-03 사용자 결정 — DESIGN.md 라이트 우선 원칙의 polarity 반전 매핑): 토큰은 `src/index.css` `:root`(다크)/`[data-theme='light']` 이중 정의. 새 색상은 반드시 두 테마 모두 정의. 토글은 Nav, 상태는 localStorage(`theme`), FOUC 방지 스크립트는 index.html. 다크 밴드는 양 테마에서 어두움 유지.
- 장식은 **히어로 메시 그라디언트 하나** (develop/preview/ship 3쌍 스톱). 축소·단색화·아이콘화 금지.
- 헤드라인: 문장형+마침표, weight 600 상한(700 금지), 네거티브 트래킹, 대문자 금지.
- 모노스페이스는 eyebrow/코드/기술 라벨만. 본문 모노 금지.
- CTA: 마케팅 스케일 = 100px pill, nav 스케일 = 6px 사각. 같은 화면에서 두 스케일 혼용 금지.
- 그림자: 스택 섀도(작은 오프셋 여러 겹 + 인셋 헤어라인). 단일 무거운 drop-shadow 금지.
- 새 액센트 색 추가 금지. semantic(red/blue/amber)은 상태 표시에만.

## reactbits 사용 규칙

reactbits.dev 컴포넌트는 아래 허용 목록만. 각각 사용 위치 고정:

| 컴포넌트 | 위치 | 제약 |
|---|---|---|
| `SoftAurora` | 히어로 배경만 (다크 테마 한정) | 라이트 테마·모바일·`prefers-reduced-motion`에서 정적 CSS 그라디언트 폴백 필수 |
| `SplitText` | 히어로 헤드라인 | 등장 1회, 반복 재생 금지 |
| `FadeContent` / `AnimatedContent` | 섹션 스크롤 리빌 | 1회만, stagger ≤ 0.15s, 지연 누적 금지 |
| `LogoLoop` ×3 | About 아래 기술 스트립 (Skills 섹션 없음) | 백/프론트/툴 3줄, 방향 엇갈림(→←→), 접해본 스택 전부, 모노크롬, 저속 + hover pause, 양끝 fade 마스크 |
| `SpotlightCard` | 프로젝트 카드 호버 | spotlight opacity ≤ 0.15, 과하면 elevation hover로 대체 |
| `CardSwap` | 다크 밴드 하이라이트 슬라이드 | 프로젝트당 카드 1장(핵심 GIF + 캡션 + 상세 링크), hover pause, `prefers-reduced-motion` 시 정적 1장 |
| `StaggeredMenu` (선택) | 모바일 햄버거 오버레이 | — |

레거시 컴포넌트 처분: DarkVeil·LightRays·TrueFocus·DecryptedText·CircularText → 제거. SlideIn/SlideInOnView(자작) → FadeContent로 대체. 이미지 로딩 인디케이터는 CSS 스켈레톤(canvas-soft-2 박스)으로, **이미지별 개별 상태** (기존 `isLoaded` 단일 state 공유 버그 재발 금지).

기타 필수: 클릭 요소는 `button`/`a` (div 클릭 금지), 모달 ESC 닫기, `lang="ko"`, breakpoint 768px 1열 전환, 탭 타깃 44px.

## 데이터 모델 — 이후 작업물 추가가 쉬워야 함

프로젝트 데이터는 `src/entities/projects.ts` 단일 파일 + 프로젝트당 assets 폴더. 팀/개인 구분은 페이지 분리가 아니라 `type` 필드. **새 프로젝트 추가 = ① assets 폴더 생성 ② projects.ts에 항목 1개 추가. 컴포넌트 수정 없이 끝나야 정상.** 정렬은 `sortKey`(YYYY-MM) 내림차순 자동.

```ts
export type Project = {
  id: string;                 // slug — 라우트 키 (예: 'resonos-react')
  title: string;
  type: 'team' | 'personal';
  featured?: boolean;         // 그리드 2칸 강조 (최신 대표작 1개만)
  sortKey: string;            // 'YYYY-MM' 시작월 — 정렬 기준
  summary: string;            // 카드/상세 공용 한 줄 (성과 포함)
  period: string;             // '2025.08.06 – 08.27 (3주)'
  team?: string;              // '4인 팀' — 개인이면 생략
  roles: string[];            // 담당 역할 bullet 2~4개
  stacks: { name: string; reason?: string }[];   // reason은 상담에서 수집
  links: { label: string; url: string }[];       // GitHub, 시연영상, 배포
  troubles: {                 // 상세 페이지의 주인공 — 2~4개
    problem: string;          // 상황 (무엇이, 언제, 왜 문제였나)
    approach?: string;        // 원인 파악·시도 과정
    solution: string;         // 최종 해결
    result?: string;          // 결과 — 가능하면 수치
  }[];
  learnings: string;          // 배운 점 2~3문장
  highlight?: {               // 다크 밴드 CardSwap용 — 프로젝트당 1장
    src: string;              // 상세 페이지에 실제로 있는 장면만 (GIF 권장)
    caption: string;          // 한 줄 (예: '복수 올인 사이드팟 자동 계산·정산')
  };
  screenshots: {              // 상단 3~4개만 노출, 나머지 details 접기
    src: string;
    caption: string;          // 의사결정/문제해결 서술 — 기능 나열 금지
    featured?: boolean;
  }[];
  thumbnail: string;          // 카드 썸네일 (16:9, featured는 21/9 크롭 고려)
};
```

기존 `ProjectObj.ts`/`PersonalProject.ts`의 병렬 배열(`images[]` + `imgDesc[]` + `troubles[]` + `solution[]`)은 인덱스 어긋나면 조용히 깨지는 구조 — 위 객체 배열로 마이그레이션.

## 프로젝트 상담(인터뷰) 프로세스 — 콘텐츠는 이걸로만 채운다

골조 완성 후, **프로젝트 1개씩** 사용자와 상담해서 위 `Project` 필드를 채운다. 상담 없이 에이전트가 내용을 지어내는 것 금지 — 기존 코드/README에서 사실만 가져오고, 서사·수치·이유는 반드시 사용자 답변에서.

### 상담 진행 방식

1. 한 세션에 프로젝트 1개. 아래 질문을 A→G 순서로, 한 번에 2~3개씩 (한꺼번에 전부 던지지 말 것).
2. 답변이 모호하면 후속 질문으로 구체화 ("어떻게 발견했나?", "다른 방법은 왜 안 썼나?", "수치로 말하면?").
3. 수집 완료 후 `Project` 객체 초안을 보여주고 사용자 승인 → `projects.ts` 반영.
4. 상담 원문은 `docs/interviews/<project-id>.md`에 Q&A 형태로 저장 (다음 에이전트가 맥락 재사용).

### 질문 목록

**A. 기본 정보** — summary, period, team, links
- 이 프로젝트를 채용담당자에게 한 문장으로 소개한다면?
- 기간, 인원, 본인 포지션은? 배포 링크나 시연 영상 있나?

**B. 동기** — summary 보강
- 왜 만들었나? 어떤 문제/필요에서 시작했나?

**C. 기술 선택** — stacks[].reason
- 스택별로: 왜 이걸 골랐나? 비교한 대안이 있었나?
- (학습 목적이었다면 그대로 적는다 — 주니어에게 "배우려고 선택"은 정당한 이유)

**D. 트러블슈팅 (핵심 — 시간 최다 배분)** — troubles[]
- 가장 어려웠던 문제 2~4개를 각각:
  - 어떤 상황이었고 무엇이 왜 문제였나? (problem)
  - 원인을 어떻게 찾았나? 어떤 시도를 했고 뭐가 실패했나? (approach)
  - 최종적으로 어떻게 해결했나? (solution)
  - 해결 후 뭐가 달라졌나? 수치 가능? (result)
- 후속: "그때로 돌아가면 더 빨리 푸는 방법은?"

**E. 성과** — summary, troubles[].result
- 정량 지표: 성능(ms/%), 사용자 수, 코드 감소량, 리뷰 반영 건수 등. 없으면 정성 성과라도.
- 수치는 개별 프로젝트 서술 안에서만 사용 — 사이트 전체 집계 지표(프로젝트 N개 등)는 과장으로 보여 금지.

**F. 회고** — learnings
- 이 프로젝트에서 배운 것 중 다음 프로젝트에 실제로 적용한 것은?
- 다시 한다면 바꿀 것 하나?

**G. 스크린샷 선별** — screenshots[], highlight
- 후보 전부 나열 후 우선순위: ① 트러블슈팅 증거 (전/후 비교, diff) ② 핵심 기능 동작 GIF ③ 일반 화면. 상위 3~4장만 featured.
- 그중 "이 프로젝트를 10초 안에 보여준다면?" 1장을 highlight로 — 다크 밴드 CardSwap에 실림. 상세 페이지에 없는 장면 금지.
- 캡션은 답변 기반으로 작성. 금지 문구: "~을 구현했습니다"만 있는 나열형, "기존과 동일하게 구현", 이모지 남발.

### 답변 → 필드 매핑 규칙

- 답변 원문을 그대로 싣지 말고 압축: problem/solution 각 1~2문장, 캡션 1문장.
- 수치가 나오면 반드시 살린다 (summary나 result에).
- 사용자가 못 답한 항목은 비워두고 `docs/interviews/<id>.md`에 TODO 표기 — 지어내지 않는다.

## 폴더 구조 (v2 목표)

```
src/
  pages/        # Home.tsx (원페이지), ProjectDetail.tsx
  widgets/      # Hero, About, TechStrip, ProjectsGrid, HighlightBand(CardSwap), Timeline, Footer
  features/     # Nav, ProjectCard, TroubleCard, CertModal
  shared/       # reactbits 래퍼 (Aurora, SplitText, FadeContent, LogoLoop, SpotlightCard), 스켈레톤
  entities/     # projects.ts, career.ts (타임라인 통합: 경력+교육+자격증), techStrip.ts (백/프론트/툴 3배열)
  assets/       # <project-id>/ 폴더 단위
docs/
  interviews/   # 프로젝트별 상담 원문 (<project-id>.md)
```

career.ts도 단일 배열(타입 필드로 education/certificate/project 구분) — 항목 추가만으로 타임라인 갱신.
