// 프로젝트 데이터 단일 소스.
// 새 프로젝트 추가 = assets/<id>/ 폴더 생성 + 이 배열에 항목 1개. 컴포넌트 수정 불필요.
// TODO(상담) 표기 필드는 CLAUDE.md의 인터뷰 프로세스로 채운다 — 지어내기 금지.

import hhgThumb from '../assets/hhg.png'
import resonosThumb from '../assets/resonos.png'
import lexiThumb from '../assets/lexiHub.png'
import syncThumb from '../assets/playsync.png'

import sync1 from '../assets/playsync/1playersReady.png'
import sync2 from '../assets/playsync/2dashboard.png'
import sync3 from '../assets/playsync/3raiseAndRaise.gif'
import sync4 from '../assets/playsync/4autoCheck.gif'
import sync5 from '../assets/playsync/5sidePotShowdown.gif'
import sync6 from '../assets/playsync/6sidePot.png'
import sync7 from '../assets/playsync/7goToShowDown.gif'
import sync8 from '../assets/playsync/8eliminated.gif'

import lexi1 from '../assets/lexiHub/mainSearch.gif'
import lexi2 from '../assets/lexiHub/addFlashcard.gif'
import lexi3 from '../assets/lexiHub/editFlashcard.png'
import lexi4 from '../assets/lexiHub/editedFlashcard.png'
import lexi5 from '../assets/lexiHub/typingFlashcard.gif'
import lexi6 from '../assets/lexiHub/addLongform.png'
import lexi7 from '../assets/lexiHub/EditLongform.gif'
import lexi8 from '../assets/lexiHub/typingLongform.gif'
import lexi9 from '../assets/lexiHub/doneLongform.png'

import resr from '../assets/resonosReact/welcomDark.avif'
import resr1 from '../assets/resonosReact/welcomeLight.png'
import resr2 from '../assets/resonosReact/artist.avif'
import resr3 from '../assets/resonosReact/album.avif'
import resr4 from '../assets/resonosReact/track.avif'
import resr5 from '../assets/resonosReact/comRefactoring.png'
import resr6 from '../assets/resonosReact/comMain.png'
import resr7 from '../assets/resonosReact/comPostEdit.avif'
import resr8 from '../assets/resonosReact/comNonMember.avif'
import resr9 from '../assets/resonosReact/pagination.avif'
import resr10 from '../assets/resonosReact/comPost.avif'
import resr11 from '../assets/resonosReact/comVote.avif'
import resr12 from '../assets/resonosReact/comComments.avif'

import res from '../assets/resonosSpring/main.png'
import res1 from '../assets/resonosSpring/artist.png'
import res2 from '../assets/resonosSpring/album.png'
import res3 from '../assets/resonosSpring/albumVote.avif'
import res4 from '../assets/resonosSpring/track.png'
import res5 from '../assets/resonosSpring/trackmood.png'
import res6 from '../assets/resonosSpring/albumReview.avif'
import res7 from '../assets/resonosSpring/resonosStatus.avif'
import res8 from '../assets/resonosSpring/resonosAdmin.avif'
import res9 from '../assets/resonosSpring/resonosTrack.avif'

import hhg from '../assets/hhg/main.png'
import hhg1 from '../assets/hhg/machines.png'
import hhg2 from '../assets/hhg/machineEdit.png'
import hhg3 from '../assets/hhg/salesChartMax.png'
import hhg4 from '../assets/hhg/salesChartMin.png'
import hhg5 from '../assets/hhg/salesList.png'
import hhg6 from '../assets/hhg/sales.png'

export type Project = {
  id: string
  title: string
  type: 'team' | 'personal'
  aiNative?: boolean // 에이전트 협업 프로세스(판단 기록 존재)로 만든 프로젝트만 true — 단순 AI 도구 사용은 해당 없음
  featured?: boolean
  sortKey: string // 'YYYY-MM' 시작월 — 내림차순 정렬 기준
  summary: string
  period: string
  team?: string
  roles: string[]
  stacks: { name: string; reason?: string }[]
  links: { label: string; url: string }[]
  troubles: {
    problem: string
    approach?: string
    solution: string
    result?: string
  }[]
  learnings: string
  highlight?: { src: string; caption: string }
  screenshots: { src: string; caption: string; featured?: boolean }[]
  thumbnail?: string // 없으면 카드에 placeholder 렌더
}

export const projects: Project[] = [
  {
    id: 'aboutme',
    title: 'AboutMe',
    type: 'personal',
    aiNative: true,
    sortKey: '2025-04', // git 초기 세팅 시점 기준 (v2 리뉴얼은 2026-07이지만 시작일로 정렬)
    summary:
      "이 포트폴리오 자체 — Claude Code와 협업해 리뉴얼한 AI-native 프로젝트",
    period: '2025.04 – 진행 중 (v2 리뉴얼 2026.07)',
    roles: [
      'v1(2025.04) 직접 구현, v2(2026.07~) Claude Code 협업 리뉴얼',
      'CLAUDE.md 협업 규칙 설계 — 지어내기 금지·코드 검증 우선·프로젝트 인터뷰 프로세스',
      'DESIGN.md 토큰 시스템 적용 — 다크 기본 + 라이트 토글 이중 토큰',
    ],
    stacks: [
      { name: 'React 19 + TS + Vite' },
      {
        name: 'Claude Code',
        reason:
          '웹 챗봇이 가정으로 응답하는 것이 불만이었고, 내 코드를 근거로 응답하는 협업을 원해 도입했습니다. 동작할 규칙을 CLAUDE.md로 명문화했습니다.',
      },
      {
        name: 'CSS 토큰 시스템',
        reason: '디자인은 감각의 영역 — 부족한 감각을 검증된 디자인 분석 기반 토큰(DESIGN.md)으로 보완했습니다.',
      },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/GUNW-O-O/aboutMe' }],
    troubles: [
      {
        problem: 'v1 데이터가 병렬 배열 3파일 — 인덱스가 어긋나면 조용히 깨지는 구조적 취약 (실제 사고는 없었음)',
        solution: '단일 객체 배열로 마이그레이션 — 프로젝트 추가가 컴포넌트 수정 없이 항목 1개로 끝나는 구조',
        result: '데이터 파일 3개 → 1개',
      },
      {
        problem: '기억에 의존해 작성했던 v1 트러블슈팅 — 대체로 사실과 일치했지만 코드 근거가 붙어 있지 않아 구체성과 면접 방어력이 옅었음',
        solution: '전 프로젝트를 인터뷰 프로세스(코드 검증 → 답변 수집 → 승인)로 재작성하고, 측정 없는 수치는 사실 서술로 전환',
        result: '인터뷰 문서 5건 — 모든 서술이 코드·답변 근거 보유',
      },
      {
        problem:
          'v1을 직접 구현하며 과한 애니메이션, 아무 정보 없는 랜딩 페이지 등 디자인과 가독성이 흔들림 — 감각에 의존한 결과물에 확신이 없었음',
        solution:
          '검증된 디자인 분석 기반 DESIGN.md 규칙(토큰, 타이포 스케일, 장식 상한)을 도입해 모든 시각 결정을 규제 아래에서 내리도록 전환',
      },
    ],
    learnings:
      '이제 막 AI 협업을 시작하는 단계지만, 필요한 스킬과 플러그인을 적재적소에 쓰고 어떤 기술로 접근해야 더 좋은 결과를 받을지 먼저 생각해야 한다는 것을 배우고 있습니다.',
    screenshots: [],
  },
  {
    id: 'playsync',
    title: 'Playsync',
    type: 'personal',
    featured: true,
    sortKey: '2026-02',
    summary: '오프라인 홀덤 토너먼트의 디지털 전환 — 상태머신과 Redis 기반 stateless 서버로 실시간 진행을 동기화하는 SaaS MVP',
    period: '2026.02.24 – 03.15',
    roles: [
      '설계부터 구현까지 전 과정 1인 수행',
      '상태머신 기반 홀덤 게임 엔진 구현 — 베팅 라운드·사이드팟·쇼다운·탈락 처리',
      'Redis write-back 저장 구조 설계 — 핸드 중 DB 쓰기 없는 stateless 서버',
      'WebSocket 실시간 동기화 및 Next.js 프론트 구현',
    ],
    stacks: [
      { name: 'NestJS', reason: '모듈 단위 의존성 주입으로 로직을 구조화하고 유지보수성을 높였습니다.' },
      { name: 'WebSocket', reason: '실시간 상태 공유로 테이블/플레이어/토너먼트 진행을 동기화합니다.' },
      { name: 'Next.js', reason: 'Server Action에서 httpOnly 쿠키 접근이 가능해 인증 처리 목적으로 선택했습니다.' },
      { name: 'Redis', reason: '수시로 변하는 게임 상태를 빠르게 읽고 쓰며, RDB/AOF 설정으로 서버 장애 시 진행 중인 핸드 복구를 보장합니다.' },
      { name: 'PostgreSQL + Prisma', reason: 'Type-safe한 환경에서 초반의 잦은 스키마 변경에 대응했습니다.' },
      { name: 'Docker', reason: '배포 환경 일관성 유지와 빠른 개발 환경 구축.' },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/GUNW-O-O/playsync' }],
    troubles: [
      {
        problem: '실시간 게임 특성상 매 액션마다 상태가 바뀌는데, 이를 전부 DB에 쓰면 부하와 비용이 커지는 구조적 문제',
        solution:
          '핸드 중 상태 변경은 전부 Redis 스냅샷에서 처리하고 DB 트랜잭션은 정산·탈락 등 경계 이벤트에만 실행하는 write-back 구조 설계. 블라인드 레벨도 서버 타이머 대신 핸드 시작 시점에 계산(Lazy Update)해 서버가 대회 상태를 메모리에 들지 않는 stateless 구조 유지',
        result: '핸드 진행 중 DB 쓰기 0회 — 상태 변경은 Redis에서 처리되고 DB에는 정산 시점 1회만 기록',
      },
      {
        problem:
          '핸드 종료 후 스택이 0이 된 플레이어들의 리바이 의사를 수집(각 최대 15초)할 때, 먼저 응답한 유저도 전체 응답이 끝날 때까지 자신의 스택 갱신을 볼 수 없는 피드백 지연',
        approach:
          '유저별 응답 이벤트를 EventEmitter once로 대기시키고 15초 타이머와 경쟁시켜 어느 쪽이 먼저든 한 번만 resolve되는 구조 설계',
        solution:
          '동일 메모리를 가리키는 테이블 객체를 콜백 인자로 공유 — 개별 응답 트랜잭션 성공 시 즉시 상태머신을 수정하고 웹소켓으로 전파',
        result: '전체 응답 완료 전에도 즉각 피드백 — 실시간 반응성과 최종 데이터 정합성 양립',
      },
      {
        problem:
          '같은 리바이·탈락 흐름에서 반복문이 플레이어를 한 건씩 조회·UPDATE — 비효율을 발견하고 조사하며 N+1 패턴임을 파악',
        solution:
          '공통 정보는 상위에서 한 번 조회해 컨텍스트로 주입해 반복 읽기를 제거하고, 탈락 확정자는 IN절 updateMany/deleteMany 단일 트랜잭션으로 배치해 동시 탈락 시 등수 정합성까지 확보',
      },
      {
        problem: 'Docker 기반 Redis의 바인딩 설정 미비로 외부 접근이 열려 악성봇 접근을 경험',
        approach: 'Redis 데이터가 계속 삭제되고 무관한 값으로 바뀌는 이상 동작으로 침입을 인지',
        solution: '환경변수 기반 인증(requirepass) 설정으로 외부 접근 차단',
        result: '인프라 보안 설정의 중요성을 실제 침입 시도로 체감',
      },
    ],
    learnings:
      'lexi-hub에서 익힌 NestJS 모듈 구조와 JWT 인증을 실전 규모 프로젝트에 무리 없이 재사용하며 학습이 프로젝트 간에 이어지는 경험을 했습니다. Next.js는 httpOnly 쿠키 인증 때문에 선택했지만 SEO가 불필요한 서비스라 React SPA가 더 적합했다는 회고, "Redis는 어느 시점부터 필요한가" 같은 도입 트레이드오프를 먼저 따져야 한다는 배움도 남았습니다. 다음 프로젝트에는 수동 테스트의 한계를 넘기 위해 TDD와 아키텍처 학습을 적용할 계획입니다.',
    highlight: {
      src: sync5,
      caption: '복수 올인 시 사이드팟 자동 계산·정산',
    },
    screenshots: [
      { src: sync5, caption: '복수 올인으로 사이드팟이 생성되는 상황 — 콜 금액 변화에 따라 액션이 이어집니다.', featured: true },
      { src: sync3, caption: '첫 레이즈 이후 더 큰 벳이 나오면 새로운 액션 기회가 부여됩니다.', featured: true },
      { src: sync4, caption: '30초 내 액션이 없고 콜 금액이 없으면 자동 체크 처리됩니다.', featured: true },
      { src: sync8, caption: '승자 결정 시 상태 수정 → 잔액 0 플레이어 탈락 처리 → 상태 기준 DB 업데이트.', featured: true },
      { src: sync1, caption: '모든 플레이어가 웹소켓으로 접속한 대기 화면.' },
      { src: sync2, caption: '관리 페이지에서 대회 시작 시 대회 정보를 Redis에 적재.' },
      { src: sync6, caption: '딜러 콘솔에서 클릭한 순서가 핸드 강한 순.' },
      { src: sync7, caption: '액션 가능 플레이어가 없으면 쇼다운 페이즈로 진입.' },
    ],
    thumbnail: syncThumb,
  },
  {
    id: 'lexi-hub',
    title: 'Lexi-hub',
    type: 'personal',
    sortKey: '2025-09',
    summary:
      '단어장 타이핑 학습 웹서비스 — TypeScript·MongoDB·JWT 인증을 학습 목적으로 직접 구현하고, 한글 IME 오타 판정 로직까지 설계한 개인 프로젝트',
    period: '2025.09.01 – 09.15',
    roles: [
      '설계부터 프론트·백엔드 구현까지 전 과정 1인 수행',
      'React + TS FSD 프론트 — 타이핑 검증 로직, JWT 자동 갱신 인터셉터 구현',
      'NestJS + MongoDB 백엔드 — auth/note 모듈, Access + HttpOnly Refresh 토큰 인증',
    ],
    stacks: [
      {
        name: 'React + TS (FSD)',
        reason:
          'Resonos 팀 프로젝트에서 폴더 구조 탐색의 어려움을 겪고 해결책을 찾다 FSD를 접해 적용했습니다. TypeScript는 JS 팀플에서 느낀 오류 추적 불안을 계기로 학습 목적 도입.',
      },
      { name: 'NestJS', reason: 'Express와 문서 수준에서 비교 후 선택 — TS 기본 내장과 모듈 기반 구조로 기능을 역할별로 모듈화.' },
      { name: 'MongoDB', reason: 'NoSQL 구조가 커스텀 단어장 데이터 모델과 잘 맞고 학습 곡선이 낮아 빠른 프로토타이핑에 적합하다고 판단.' },
      { name: 'JWT', reason: '팀 프로젝트에서 경험하지 못한 인증/인가 학습 목적 — Access Token + HttpOnly Refresh Token 구조를 직접 적용.' },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/GUNW-O-O/lexi-hub' }],
    troubles: [
      {
        problem: '한 페이지에 오래 머물면 JWT 만료로 인증 오류 → 불필요한 재로그인 요구',
        solution: 'httpOnly 리프레시 토큰 시스템 추가 — 401 발생 시 리프레시 토큰으로 액세스 토큰 자동 재발급, 세션 연속성과 보안성 확보',
      },
      {
        problem: '한글 입력 시 받침이 완성되기 전에 오타로 인식',
        approach:
          "직접 타이핑하며 문제를 발견하고 typing.works를 레퍼런스로 참고 — composition API 대신 '입력됨/대기/오타' 렌더링 기준을 직접 정의하다 입력 중 글자 판정 유예 규칙에 도달",
        solution: '입력 중인 글자는 검증에서 제외하고 다음 글자 입력 시점에 이전 글자를 최종 판단하도록 로직 수정',
        result: '도메인 이해도가 결과물 품질을 좌우한다는 것을 체감',
      },
      {
        problem: 'JSON/CSV 대량 추가 시 마지막 단어 하나만 목록에 추가되는 버그',
        solution: '인자 타입에 FlashCard[]를 추가하고 리스트 여부를 판단해 구조분해 추가/단일 추가를 분기',
      },
    ],
    learnings:
      'JS 팀 프로젝트와 TS 개인 프로젝트를 연달아 경험하며 타입 안정성의 가치를 체감했고, 이는 playsync의 Prisma type-safe 환경 선택으로 이어졌습니다. 여기서 익힌 NestJS 모듈 구조와 JWT 인증도 playsync에서 그대로 재사용했습니다. 반면 FSD는 이 규모에선 오버엔지니어링이었다는 것, 기간 안에 가능한 범위를 구분해 개발 범위를 잡는 것의 중요성도 배웠습니다.',
    highlight: {
      src: lexi5,
      caption: '한글 IME를 고려한 타이핑 오타 검증',
    },
    screenshots: [
      { src: lexi5, caption: '단어장 타이핑 화면 — 받침 입력 중에는 오타 판정을 유예합니다.', featured: true },
      { src: lexi2, caption: '단일 추가와 JSON/CSV 대량 추가를 지원합니다.', featured: true },
      { src: lexi1, caption: '메인 사이드바에서 단어장 목록 검색.', featured: true },
      { src: lexi3, caption: '단어 수정/삭제는 하단 버튼으로 최종 확정되는 구조.' },
      { src: lexi4, caption: '단어장 정보 화면.' },
      { src: lexi6, caption: '장문 등록 화면.' },
      { src: lexi7, caption: '장문 정보 페이지에서 페이지 이동 없이 수정.' },
      { src: lexi8, caption: '장문 타이핑 화면.' },
      { src: lexi9, caption: '장문 타이핑 완료 화면.' },
    ],
    thumbnail: lexiThumb,
  },
  {
    id: 'resonos-react',
    title: 'Resonos React',
    type: 'team',
    sortKey: '2025-08',
    summary: '타임리프 SSR 음악 커뮤니티를 React로 전환하고 커뮤니티·투표 기능을 추가 — 담당 컨트롤러를 파사드 패턴으로 리팩토링',
    period: '2025.08.06 – 08.27',
    team: '4인 팀',
    roles: [
      '아티스트·트랙·앨범 페이지 백/프론트 담당 — 초기 로딩 데이터를 Combined 서비스(파사드)와 명시적 DTO로 재설계',
      '커뮤니티 게시글·대댓글·투표(chart.js) 프론트 구현',
      '비회원 작성 흐름(임시 비밀번호) 조건부 렌더링 설계',
      '백/프론트 분업에서 응답 누락 재수정을 겪고 사전 API 협의 프로세스 제안',
    ],
    stacks: [
      { name: 'React' },
      { name: 'Spring Boot' },
      { name: 'MySQL' },
      { name: 'Swagger' },
      {
        name: 'CKEditor 5',
        reason: '에디터 직접 구현으로는 UI/UX 품질 확보가 어렵다고 판단, 동영상 임베딩까지 지원해 선택했습니다.',
      },
      {
        name: 'chart.js',
        reason: '할건해야짐·Resonos에서 이어 사용 — 커뮤니티 투표 결과 시각화에 재사용했습니다.',
      },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/Lee-0210/Resonos_React' }],
    troubles: [
      {
        problem:
          '컨트롤러에 간단한 로직이 조금씩 쌓여 서비스 계층과 분간이 안 되는 상태 — REST API 전환을 맞아 "좋은 구조"를 고민',
        solution:
          '초기 페이지 조회를 Combined 서비스(파사드)로 분리하고, 응답도 Map 대신 명시적 PageDTO로 계약화 — 컨트롤러에는 파라미터 주입과 위임 한 줄만 남김',
        result: '엔드포인트당 수십 줄 로직이 위임 한 줄로 슬림해짐',
      },
      {
        problem: 'SSR 일체형에서 백/프론트 분업으로 바뀌자 응답에 프론트 렌더 필요값이 누락돼 백엔드 재수정이 반복',
        approach: '팀이 도입한 Swagger 명세로 API를 확인하며 원인 계층(백/프론트)을 구분',
        solution: '필요값을 사전에 논의하는 방향으로 팀 프로세스를 개선하고, 본인 담당 응답은 명시적 DTO로 계약화',
      },
      {
        problem: '댓글 작성 시 useState로 추가하면 페이지네이션이 무시되고 리스트에 계속 누적',
        solution: '등록 성공 시 현재 페이지가 가득 찼으면(10개) 다음 페이지를 요청해 이동, 아니면 로컬 상태에 추가',
      },
      {
        problem:
          'SSR에서 동작하던 Bandsintown 위젯이 React SPA에서 미표시 — 위젯 스크립트는 로드 시 1회만 DOM을 스캔하는데, SPA는 그 시점에 대상 div가 마운트 전',
        solution:
          'useEffect에서 스크립트를 동적 삽입하고 로드 완료 시 init()으로 재스캔 — 이미 로드된 경우 init()만 재호출',
      },
    ],
    learnings:
      'SSR에서 React 전환은 화면만 바꾸는 게 아니라 REST API에 맞는 컨트롤러 계층 재설계까지 포함해야 완성된다는 것을 배웠습니다. 백/프론트가 분리되면 응답에 무엇이 담기는지가 곧 계약이라는 것도 — 필요값 누락으로 재수정을 반복하며 사전 협의와 명시적 DTO의 가치를 체감했고, 이때의 구조 고민이 lexi-hub의 FSD 도입으로 이어졌습니다.',
    highlight: {
      src: resr8,
      caption: '비회원도 임시 비밀번호로 게시글·댓글 작성 — 케이스별 조건부 렌더링',
    },
    screenshots: [
      { src: resr11, caption: '유저가 원하는 항목으로 투표 등록/수정/삭제 — 로그인 시 투표 가능.', featured: true },
      { src: resr5, caption: '컨트롤러 리팩토링 전/후 — 파사드 패턴으로 컨트롤러·서비스 역할 분리.', featured: true },
      { src: resr8, caption: '비회원은 임시 비밀번호 등록 후 게시글·댓글 작성/삭제 가능.', featured: true },
      { src: resr9, caption: '댓글 리스트 길이에 따라 전/후 페이지를 자동 요청.', featured: true },
      { src: resr, caption: '기본 다크모드 웰컴 페이지.' },
      { src: resr1, caption: '현재 모드를 감지해 맞춤 배경을 적용 — 다크/라이트 조화 개선.' },
      { src: resr2, caption: '아티스트 페이지.' },
      { src: resr3, caption: '앨범 페이지.' },
      { src: resr4, caption: '트랙 페이지.' },
      { src: resr6, caption: '커뮤니티 메인 페이지.' },
      { src: resr7, caption: '비회원 게시글 — 등록한 비밀번호 일치 시 가능.' },
      { src: resr10, caption: '투표 기능.' },
      { src: resr12, caption: '상호작용 버튼 저장 및 표시 — 작성자는 수정/삭제 가능.' },
    ],
    thumbnail: resonosThumb,
  },
  {
    id: 'resonos-thymeleaf',
    title: 'Resonos Thymeleaf',
    type: 'team',
    sortKey: '2025-06',
    summary: 'Spring + Thymeleaf SSR 기반 투표형 음악 커뮤니티 — 핵심 상호작용을 비동기 전환해 음악 재생 무중단 달성',
    period: '2025.06.26 – 07.22',
    team: '4인 팀',
    roles: [
      '아티스트·트랙·앨범 상세 페이지 풀스택 담당 (DB 설계는 팀 공동)',
      '새로고침을 유발하는 유저 상호작용 전면 비동기 전환',
      'YouTube API videoId 자동 수집 + 점수 기반 매칭 필터링 구현',
    ],
    stacks: [
      { name: 'Spring Boot' },
      { name: 'Thymeleaf' },
      { name: 'MySQL' },
      { name: 'YouTube / Spotify API' },
      {
        name: 'chart.js',
        reason: '할건해야짐(첫 팀플)에서 매출 시각화로 사용해본 경험이 있어, 투표 시각화 등 다른 형식의 그래프에 재사용했습니다.',
      },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/ruff1376/Resonos' }],
    troubles: [
      {
        problem: '노래 재생 중 리뷰·좋아요 등 상호작용 시 동기 요청의 전체 새로고침으로 음악이 끊김 — 음악 커뮤니티에 치명적',
        approach: '본인이 노래 재생 중 리뷰를 작성하다 새로고침으로 끊기는 것을 직접 발견',
        solution: '유저 상호작용을 전면 비동기 요청으로 전환하고 응답을 자바스크립트로 처리',
        result: '재생 무중단 — 사용자 경험 핵심 개선',
      },
      {
        problem: 'YouTube API 호출 시 해당 아티스트가 아닌 영상이나 리액션 영상의 videoId가 DB에 저장',
        approach: '잘 동작하는 줄 알았다가 음악과 무관한 영상이 DB에 저장되는 것을 발견',
        solution:
          '공식 채널 가산·리액션 등 제외 키워드 감점·아티스트명 검증을 점수로 합산하는 필터링을 추가 — 제외/공식 채널 키워드 목록은 AI를 활용해 생성·보강하고, 영/한/일 추출 fallback 쿼리 체인으로 재검색',
        result: '완벽하지는 않지만 최소 동일 음원 또는 타국어 번역 영상 수준의 매칭 보장',
      },
      {
        problem: '로컬 외부 환경에서 YouTube 임베드 불가 영상 존재',
        solution: 'Spotify 임베드 iframe을 병행 배치 — 로그인 상태면 풀버전까지 재생되는 것을 확인하고 폴백으로 추가',
      },
    ],
    learnings:
      '동기 요청의 전체 갱신 문제를 비동기 전환으로 해결하며 API와 스프링의 코드 흐름을 파악하는 능력을 키웠습니다.',
    highlight: {
      src: res9,
      caption: '노래 재생 중 상호작용해도 끊기지 않는 전면 비동기 처리',
    },
    screenshots: [
      { src: res9, caption: '유저 상호작용 전면 비동기 처리 — 재생 중단 없음.', featured: true },
      { src: res3, caption: '앨범 6요소 평가 — 투표 기록이 있으면 수정하기로 분기.', featured: true },
      { src: res1, caption: 'Spotify·YouTube API 임베드 + Bandsintown 공연 일정 + 분위기 투표.', featured: true },
      { src: res, caption: '웰컴 페이지.' },
      { src: res2, caption: '앨범 수록곡·리뷰 현황·6요소 점수·플레이리스트 표시.' },
      { src: res4, caption: '트랙을 플레이리스트에 추가하고 분위기 기반으로 다른 곡 탐색.' },
      { src: res5, caption: '분위기 투표와 트랙 포함 플레이리스트 (좋아요순).' },
      { src: res6, caption: '리뷰 더보기 페이지네이션 및 블라인드 리뷰 보기.' },
      { src: res7, caption: '상호작용 내용 저장 및 좋아요 수 기준 정렬.' },
      { src: res8, caption: '관리자 — 블라인드 리뷰 즉시 열람, 전체 리뷰 수정/삭제.' },
    ],
    thumbnail: resonosThumb,
  },
  {
    id: 'hhg',
    title: '할건해야짐',
    type: 'team',
    sortKey: '2025-05',
    summary: '첫 팀 프로젝트 — Java JSP/Servlet SSR MVC-2 기반 헬스장 통합 관리 웹서비스, 기구·매출 관리와 chart.js 시각화 담당',
    period: '2025.05.16 – 05.28',
    team: '4인 팀',
    roles: [
      '기구 관리 기능 담당 — 카테고리별 추가/수정/삭제, 점검 상태 노출',
      '매출 관리 담당 — chart.js 트레이너별 매출 시각화 (주/월/전체)',
    ],
    stacks: [
      { name: 'Java (JSP/Servlet)' },
      { name: 'MySQL' },
      {
        name: 'chart.js',
        reason: '처음 다뤄본 시각화 라이브러리 — 이후 Resonos 투표 시각화까지 이어 사용했습니다.',
      },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/ruff1376/AI3_MINI1_TEAM3' }],
    troubles: [
      {
        problem: '매출을 음수로 등록하면 차트 그래프가 제대로 그려지지 않음',
        approach: '직접 테스트하다 발견',
        solution: '뷰에서 필수값 검증 + 컨트롤러에서 0 미만 예외 처리 후 에러 메시지 표시',
      },
      {
        problem: '데이터 없는 상태로 페이지 접근 시 NullPointerException 오류 페이지 발생',
        solution: '기간 내 수정하지 못함 — 원인은 null 체크 누락. 이후 조건문·예외 처리로 다양한 상황을 사전 대비하는 습관의 필요성을 확인',
        result: '이 교훈은 React 전환 프로젝트부터 데이터 로딩 전 렌더를 isLoading state로 방어하는 습관으로 이어짐',
      },
    ],
    learnings:
      '무리하게 잡은 범위(태블릿 반응형 별도 구현)가 전부 백지화되며 자원 분배의 중요성을, 음수 입력 같은 예상 밖 사용에서 사용자는 개발자 의도대로만 쓰지 않는다는 것을 배웠습니다. 첫 협업에서 git 충돌과 .gitignore 미설정으로 환경이 꼬이는 경험도 이후 프로젝트 협업 습관의 기준점이 됐습니다.',
    highlight: {
      src: hhg3,
      caption: '트레이너별 매출 chart.js 시각화',
    },
    screenshots: [
      { src: hhg3, caption: '트레이너별 매출 chart.js 시각화 — 최근 1주/한 달/전체 조회.', featured: true },
      { src: hhg4, caption: '좌측 트레이너 클릭으로 개별 차트 조회.', featured: true },
      { src: hhg2, caption: "상태에 '점검' 키워드가 있으면 메인 할 일 탭에 노출.", featured: true },
      { src: hhg, caption: '메인 화면.' },
      { src: hhg1, caption: '카테고리별 기구 추가, 클릭 시 수정 화면 이동.' },
      { src: hhg5, caption: '매출 등록 — 클릭 시 아코디언 탭.' },
      { src: hhg6, caption: '매출 클릭 시 수정 화면 이동.' },
    ],
    thumbnail: hhgThumb,
  },
]

/** 최신순 정렬된 목록 — UI는 항상 이걸 사용 */
export const sortedProjects = [...projects].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
)

export const getProject = (id: string) => projects.find(p => p.id === id)

/** 상세 페이지 prev/next 내비게이션용 */
export const getAdjacent = (id: string) => {
  const idx = sortedProjects.findIndex(p => p.id === id)
  return {
    prev: idx > 0 ? sortedProjects[idx - 1] : undefined,
    next: idx >= 0 && idx < sortedProjects.length - 1 ? sortedProjects[idx + 1] : undefined,
  }
}
