# AboutMe — 개인 포트폴리오

React 19 + TypeScript + Vite. GitHub Pages 배포 전제(HashRouter). 소유자: 고건우 (주니어 풀스택).

## 명령어

```bash
npm run dev      # Vite 개발 서버
npm run build    # tsc -b && vite build
npm run lint     # eslint
```

### v2 구조 요약

- `/` — 원페이지 스크롤: sticky nav → Hero(메시 그라디언트) → About → 기술 스트립(LogoLoop 3줄, Skills 섹션 대체) → Projects 그리드(최신순, featured 강조) → 다크 밴드(CardSwap — 프로젝트 상세 하이라이트 슬라이드) → 통합 타임라인 → Footer
- 다크 밴드 규칙: 수치 집계 지표 금지(과장), "문서화 방법론" 류 억지 서사 금지. 실제 상세 페이지에 있는 장면만 티저로. 프로젝트 그리드가 주 접근 경로이므로 슬라이드는 순수 보조.
- `/projects/:id` — 프로젝트 상세: 요약 메타 카드 → 역할/배운점 → Problem/Solution 병치 카드(세로 나열) → 스크린샷 3~4장 + 접기

## 디자인 규칙 (DESIGN.md 요약 — 위반 금지)

- **다크 기본 + 라이트 토글** (2026-07-03 사용자 결정 — DESIGN.md 라이트 우선 원칙의 polarity 반전 매핑): 토큰은 `src/index.css` `:root`(다크)/`[data-theme='light']` 이중 정의. 새 색상은 반드시 두 테마 모두 정의. 토글은 Nav, 상태는 localStorage(`theme`), FOUC 방지 스크립트는 index.html. 다크 밴드는 양 테마에서 어두움 유지.
- 장식은 **히어로 메시 그라디언트 하나** (develop/preview/ship 3쌍 스톱). 축소·단색화·아이콘화 금지.
- 헤드라인: 문장형+마침표, weight 600 상한(700 금지), 네거티브 트래킹, 대문자 금지.
- 모노스페이스는 eyebrow/코드/기술 라벨만. 본문 모노 금지.
- CTA: 마케팅 스케일 = 100px pill, nav 스케일 = 6px 사각. 같은 화면에서 두 스케일 혼용 금지.
- 그림자: 스택 섀도(작은 오프셋 여러 겹 + 인셋 헤어라인). 단일 무거운 drop-shadow 금지.
- 새 액센트 색 추가 금지. semantic(red/blue/amber)은 상태 표시에만.
기타 필수: 클릭 요소는 `button`/`a` (div 클릭 금지), 모달 ESC 닫기, `lang="ko"`, breakpoint 768px 1열 전환, 탭 타깃 44px.

## 데이터 모델

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

## 프로젝트 인터뷰 프로세스 — 콘텐츠는 이걸로만 채운다

골조 완성 후, **프로젝트 1개씩** 사용자와 상담해서 위 `Project` 필드를 채운다. 상담 없이 에이전트가 내용을 지어내는 것 금지 — 코드/README에서 **검증한 사실만** 가져오고, 서사·동기·수치·이유는 반드시 사용자 답변에서.

> **현황 (2026-07-05): 5개 프로젝트 인터뷰 전부 완료(④ done).** 원문·검증 기록은 `docs/interviews/*.md`. 새 프로젝트 추가 시 동일 프로세스(Step 0부터) 적용. 확보된 학습 사슬: chart.js(hhg→Resonos), NPE→isLoading(hhg→Resonos React), FSD(Resonos React→lexi-hub→AboutMe), TS(Resonos JS→lexi-hub TS→playsync Prisma), NestJS 모듈·JWT(lexi-hub→playsync).

### 프로젝트 소스 위치 — 인터뷰 전 반드시 코드부터 읽는다

모든 프로젝트 소스는 이 저장소의 **상위 폴더 `../` (= `C:\KGW\GITHUB\`)** 에 클론되어 있다. 폴더명이 project id와 다르니 매핑 사용:

| project id | 소스 폴더 | 비고 |
|---|---|---|
| `playsync` | `../playsync` | |
| `lexi-hub` | `../lexi-hub` · `../lexi-hub-backend` · `../lexi-hub-flutter` | 프론트/백/모바일 3저장소 |
| `resonos-react` | `../Resonos_React` | |
| `resonos-thymeleaf` | `../Resonos` | Spring/Thymeleaf 원본 |
| `hhg` | `../AI3_MINI1_TEAM3` | JSP/Servlet 팀플 |

폴더가 없으면 지어내지 말고 사용자에게 위치 확인.

### 상태 lifecycle — 파일 상단에 현재 단계 표기

```
① 질문지 준비   — Step 0(코드 검증 + 갭분석) 완료, 질문 확정
② 답변 수집     — 사용자 Q&A 진행, 원문 기록
③ 초안 제시     — Project 객체 초안 작성해 사용자 확인
④ 승인·반영     — projects.ts 반영, 상태 done
⑤ README 보완   — 인터뷰 확정 내용을 해당 프로젝트 소스 저장소의 README.md에도 반영
```
각 단계 완료조건(DoD)을 만족해야 다음으로 넘어간다. 상태는 `docs/interviews/<id>.md` 최상단에 `상태: ② 답변 수집` 형태로 기록.

⑤ README 보완 (개인 리포만 — `Resonos`/`Resonos_React` 등 팀 리포는 수정하지 않는다): 인터뷰에서 확정된 표기를 포트폴리오와 README가 어긋나지 않게 맞춘다 — 특히 Step 0에서 "추정"으로 판정돼 사실 서술로 전환한 수치는 README 쪽도 같은 표기로 수정(면접관이 README를 볼 수 있으므로 불일치는 신뢰 손상). 트러블 서사 교정·제외 결정도 반영. 소스 저장소 커밋/푸시는 사용자 확인 후.

### Step 0 — 인터뷰 전 코드 검증 (질문 던지기 전 필수)

질문은 검증된 사실 위에서만 나온다. 각 프로젝트 상담 시작 전:

1. 위 매핑으로 소스 폴더를 열고 **README + 실제 코드**를 읽는다.
2. `docs/interviews/<id>.md`에 3개 블록으로 기록:
   - **repo에서 확인된 사실(검증 소스)** — 스택/기능/커밋수/README 트러블 등, 질문의 근거.
   - **주장 검증** — README·기존 서술의 **정량 주장을 코드로 재확인**. 측정 코드/로그가 없으면 "측정치 아님 = 구조적 추정"으로 명시. 판정 기준 = 면접에서 "어떻게 측정?" 받아도 방어되는가. 방어가 약하면 **사실 서술로 전환**할 표기안을 미리 준비.
   - **projects.ts 현재 상태** — 채워진 필드 / 비어있는(TODO) 필드 갭분석.
3. 이 3블록이 곧 질문의 근거. 검증 없이 질문 던지기 금지.

### 답변 수집 방식

1. 한 세션에 프로젝트 1개. 질문은 A→G 순서.
   - **동기(대화) 세션**: 한 번에 2~3개씩. 한꺼번에 전부 던지지 말 것.
   - **비동기(체크리스트) 세션**: 섹션별 `[ ]` 체크박스로 전체 제공 후 사용자 페이스대로.
2. 답변이 모호하면 후속 질문으로 구체화 ("어떻게 발견했나?", "다른 방법은 왜 안 썼나?", "수치로 말하면?").
3. 원문은 `docs/interviews/<id>.md`의 "답변 기록"에 Q&A 형태로 저장 (다음 에이전트가 맥락 재사용).
4. 수집 완료 → Project 객체 초안(③) → 사용자 승인(④) → projects.ts 반영.

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
- **Step 0 주장 검증에서 방어가 약했던 수치는 여기서 표기 방식(실측 vs 사실 서술)을 사용자와 확정.**
- 수치는 개별 프로젝트 서술 안에서만 사용 — 사이트 전체 집계 지표(프로젝트 N개 등)는 과장으로 보여 금지.

**F. 회고 + 프로젝트 간 연결** — learnings
- 이 프로젝트에서 배운 것 중 다음 프로젝트에 실제로 적용한 것은?
- **cross-project 연결**: 앞 프로젝트의 학습이 뒤 프로젝트로 이어졌나? (예: lexi-hub JWT → playsync 인증, lexi-hub FSD → AboutMe 구조) — 학습→적용 사슬은 주니어에게 최강 어필. 수집하면 양쪽 learnings에 상호 참조로 기록.
- 다시 한다면 바꿀 것 하나?

**G. 스크린샷 선별** — screenshots[], highlight
- 후보 전부 나열 후 우선순위: ① 트러블슈팅 증거 (전/후 비교, diff) ② 핵심 기능 동작 GIF ③ 일반 화면. 상위 3~4장만 featured.
- 그중 "이 프로젝트를 10초 안에 보여준다면?" 1장을 highlight로 — 다크 밴드 CardSwap에 실림. 상세 페이지에 없는 장면 금지.
- 캡션은 답변 기반으로 작성. 금지 문구: "~을 구현했습니다"만 있는 나열형, "기존과 동일하게 구현", 이모지 남발.
- **asset 갭은 인터뷰가 아니다**: "전/후 비교 GIF를 새로 만들 수 있나?" 류는 질문이 아니라 신규 제작 요청 → 질문에 섞지 말고 별도 asset TODO로 트래킹.

### 답변 → 필드 매핑 규칙

- 답변 원문을 그대로 싣지 말고 압축: problem/solution 각 1~2문장, approach/result도 있으면 각 1문장, 캡션 1문장.
- 수치가 나오면 반드시 살린다 (summary나 result에). 단 Step 0에서 "추정"으로 판정된 수치는 사실 서술 표기로 전환.
- 답변 못 받은 항목 처리 — 필드 이원화 (지어내기는 여전히 금지):
  - **repo 검증만으로 선반영 허용** (검증 표시 첨부): period, stacks 골격, troubles의 problem/solution 골격.
  - **답변 필수 → 채우지 말고 TODO 홀드**: 동기(B), result 수치, learnings(F), 기술선택 reason.
  - 홀드 항목은 `docs/interviews/<id>.md`에 TODO로 남긴다.

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
