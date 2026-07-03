# 작업 진행 상황 — v2 개편

작업 순서 원칙: **① 골조 → ② 상담(콘텐츠) → ③ 애니메이션/폴리시** (CLAUDE.md 참조)

## ① 골조 (완료)

### 설계·기준 문서
- [x] 기존 포트폴리오 문제점 분석 (UI/UX + 채용자 관점)
- [x] `DESIGN.md` 확보 — Vercel-design-analysis 디자인 시스템
- [x] `wireframe.html` v1 — 로파이 와이어프레임 (구조 확정용)
- [x] `wireframe.html` v2 — DESIGN.md 토큰 적용 hi-fi 목업 + reactbits 매핑
- [x] reactbits.dev 전체 카탈로그 조사 → 허용 목록 확정 (Aurora/Grainient, SplitText, FadeContent, LogoLoop ×3, SpotlightCard, CardSwap, StaggeredMenu)
- [x] 다크 밴드 방향 확정 — 수치 지표·억지 서사 폐기, 프로젝트 상세 하이라이트 슬라이드(CardSwap)로
- [x] Skills 섹션 폐기 → About 아래 기술 스트립 3줄(백/프론트/툴, 방향 엇갈림)
- [x] `CLAUDE.md` 작성 — 디자인 규칙, reactbits 제약, 데이터 모델, 상담 프로세스

### 라이브러리
- [x] 제거: swiper, framer-motion, motion, @types/react-router-dom
- [x] 추가: gsap, @gsap/react (③단계용 — 아직 미사용)

### 코드 골조
- [x] 데이터 마이그레이션 — `projects.ts`(병렬 배열 → 객체 배열, 5개 프로젝트), `career.ts`(경력+교육+자격증 통합), `techStrip.ts`
- [x] `/` 원페이지 — Nav(sticky) → Hero(정적 메시 그라디언트) → About → TechStrip → ProjectsGrid(최신순, Playsync featured) → HighlightBand(다크 밴드) → Timeline → Footer
- [x] `/projects/:id` 상세 — 요약 메타 카드 → 역할/배운점 → 기술 선택 이유 → Problem/Solution 세로 나열 → 스크린샷 featured+접기 → 이전/다음
- [x] 레거시 삭제 — 페이지 4, 위젯 3, reactbits 구컴포넌트 5종, 구 entities 7, App.css (31파일)
- [x] 접근성 기본 — 클릭 요소 button/a, 자격증 모달 ESC 닫기, 이미지별 개별 스켈레톤, `lang="ko"`, 탭 타깃 44px
- [x] 반응형 768px 1열 전환, 고정폭 제거
- [x] dev 환경 수정 — base 경로 분리 (dev `/`, build `/aboutMe/`)
- [x] HighlightBand 인터랙션 — 밴드 좌우 ‹ › 화살표(경계선 없음), 드래그 스와이프, 도트 인덱스 표시 전용, 스크린샷 contain(크롭 제거)

## ② 상담 — 콘텐츠 수집 (진행 중)

- [x] 5개 저장소 조사 → 프로젝트별 맞춤 질문지 생성 (`docs/interviews/*.md`)
- [x] Playsync "DB I/O 90% 절감" 코드 검증 — 구조 사실, 측정치 아님 → 표기 방식 상담에서 결정
- [ ] **Playsync 상담** ← 다음 작업 (featured라 우선)
- [ ] Lexi-hub 상담
- [ ] Resonos React 상담
- [ ] Resonos Thymeleaf 상담
- [ ] 할건해야짐 상담
- [ ] 상담 결과 `projects.ts` 반영 — `TODO(상담)` 주석 전부 해소 (learnings, roles, highlight 캡션, stacks reason)
- [ ] About 소개 문단 확정
- [ ] Hero 가치제안 한 줄 확정
- [ ] 이력서 PDF 준비 → Nav 버튼 연결 (`Nav.tsx` TODO)

## ③ 애니메이션/폴리시 (골조·콘텐츠 확정 후)

- [x] ~~Aurora~~ → SoftAurora — 히어로 배경 (다크 테마+데스크톱+모션 허용 시에만 — 그 외 정적 CSS 메시 폴백) *(2026-07-03)*
- [x] 다크 모드 기본 + 라이트 토글 (Nav ☀/☾, localStorage 유지, FOUC 방지) *(2026-07-03)*
- [ ] SplitText — 히어로 헤드라인 1회
- [ ] FadeContent/AnimatedContent — 섹션 스크롤 리빌 (stagger ≤ 0.15s)
- [ ] LogoLoop ×3 — 기술 스트립 흐름 애니메이션 (→←→, 저속, hover pause)
- [ ] SpotlightCard — 프로젝트 카드 호버 (opacity ≤ 0.15)
- [ ] CardSwap — 하이라이트 밴드 자동 교체 (hover pause, reduced-motion 시 자동재생 없음)
- [ ] StaggeredMenu (선택) — 모바일 햄버거 오버레이

## 배포·마무리

- [ ] 파비콘 교체 (현재 vite 기본)
- [ ] OG 메타 태그 (og:title, og:image — 공유 미리보기)
- [ ] 실기기 모바일 확인 (iOS Safari 포함)
- [ ] Lighthouse 점검 (성능/접근성)
- [ ] `npm run deploy` — GitHub Pages 배포
- [ ] README.md 갱신 (현재 6줄)

## 보류/결정 필요

- [ ] AboutMe(이 저장소) 프로젝트 카드 추가 여부 — 상세 콘텐츠 부족, 상담에서 결정
- [ ] Playsync 성과 수치 표기 방식 — ① 쿼리 카운트 실측 ② 사실 서술 전환 (docs/interviews/playsync.md 참조)
