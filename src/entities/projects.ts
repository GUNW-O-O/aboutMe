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
  thumbnail: string
}

export const projects: Project[] = [
  {
    id: 'playsync',
    title: 'Playsync',
    type: 'personal',
    featured: true,
    sortKey: '2026-02',
    summary: '오프라인 홀덤 토너먼트의 디지털 전환 — 상태머신과 Redis 기반 stateless 서버로 실시간 진행을 동기화하는 SaaS MVP',
    period: '2026.02.24 – 03.15',
    roles: [
      // TODO(상담): 역할 bullet 구체화
      '기획·설계·개발 전담 (1인 프로젝트)',
    ],
    stacks: [
      { name: 'NestJS', reason: '모듈 단위 의존성 주입으로 로직을 구조화하고 유지보수성을 높였습니다.' },
      { name: 'WebSocket', reason: '실시간 상태 공유로 테이블/플레이어/토너먼트 진행을 동기화합니다.' },
      { name: 'Next.js', reason: 'Server Action으로 httpOnly 쿠키 기반 인증을 구현하고 빠른 개발 환경을 구축했습니다.' },
      { name: 'Redis', reason: '수시로 변하는 게임 상태를 빠르게 읽고 쓰며, RDB/AOF 설정으로 서버 장애 시 진행 중인 핸드 복구를 보장합니다.' },
      { name: 'PostgreSQL + Prisma', reason: 'Type-safe한 환경에서 초반의 잦은 스키마 변경에 대응했습니다.' },
      { name: 'Docker', reason: '배포 환경 일관성 유지와 빠른 개발 환경 구축.' },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/GUNW-O-O/playsync' }],
    troubles: [
      {
        problem: 'Prisma 7.4 도입 — 라이브러리 사용법이 대폭 바뀌어 AI가 제안하는 적용 코드가 동작하지 않음',
        solution: '공식 문서를 직접 찾아보며 변경된 API에 맞게 해결',
      },
      {
        problem: 'Docker 기반 Redis의 바인딩 설정 미비로 외부 접근이 열려 악성봇 접근을 경험',
        solution: '환경변수 기반 인증(requirepass) 설정으로 외부 접근 차단',
        result: '인프라 보안 설정의 중요성을 실제 침입 시도로 체감',
      },
      {
        problem: '실시간 게임 로직에서 테이블별 상태 정합성 보장 필요',
        solution: '블라인드 레벨을 서버 타이머 대신 Lazy Update로 핸드 시작 시점에만 계산 — 서버가 대회 상태를 메모리에 들고 있지 않는 stateless 구조 유지',
      },
      {
        problem: '초기 설계에서 딜러·물리 테이블이 로직에 강하게 결합되어 확장성 저해',
        solution: '추상화된 개념으로 분리해 물리 환경에 구애받지 않는 구조로 재설계',
      },
    ],
    learnings: '', // TODO(상담)
    highlight: {
      src: sync5,
      caption: '복수 올인 시 사이드팟 자동 계산·정산', // TODO(상담): 확정
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
    summary: '단어장 타이핑 학습 웹서비스 — JWT 인증 구조와 한글 IME 타이핑 검증을 직접 구현한 학습 프로젝트',
    period: '2025.09.01 – 09.15',
    roles: [
      '기획·설계·개발 전담 (1인 프로젝트)',
    ],
    stacks: [
      { name: 'React + TS (FSD)', reason: '제한된 시간이라 익숙한 React를 선택하고, TypeScript와 FSD 구조를 학습하며 관심사를 기능 단위로 분리했습니다.' },
      { name: 'NestJS', reason: 'Express와 비교 후 선택 — TS 기본 내장과 모듈 기반 구조로 기능을 역할별로 모듈화.' },
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
        solution: '입력 중인 글자는 검증에서 제외하고 다음 글자 입력 시점에 이전 글자를 최종 판단하도록 로직 수정',
        result: '도메인 이해도가 결과물 품질을 좌우한다는 것을 체감',
      },
      {
        problem: 'JSON/CSV 대량 추가 시 마지막 단어 하나만 목록에 추가되는 버그',
        solution: '인자 타입에 FlashCard[]를 추가하고 리스트 여부를 판단해 구조분해 추가/단일 추가를 분기',
      },
    ],
    learnings: '', // TODO(상담)
    highlight: {
      src: lexi5,
      caption: '한글 IME를 고려한 타이핑 오타 검증', // TODO(상담): 확정
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
      '담당 컨트롤러 파사드 패턴 리팩토링 — 서비스 단 책임 분리',
      '커뮤니티 게시글·대댓글·투표(chart.js) 프론트 구현',
      '비회원 작성 흐름(임시 비밀번호) 조건부 렌더링 설계',
      '프론트 작업 중 발견한 백엔드 개선점 전달',
    ],
    stacks: [
      { name: 'React' },
      { name: 'Spring Boot' },
      { name: 'MySQL' },
      { name: 'Swagger' },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/Lee-0210/Resonos_React' }],
    troubles: [
      {
        problem: '컨트롤러에 서비스 로직이 섞여 있어 책임 분리와 가독성이 떨어짐',
        solution: '파사드 패턴을 적용해 컨트롤러와 서비스 단 역할을 분리 — 가독성과 안정성 개선',
      },
      {
        problem: '분업 후 커뮤니티 기능이 정상 작동하지 않는데 원인 위치(백/프론트) 파악이 어려움',
        solution: 'Swagger 도입으로 API 명세를 정확히 파악하고 원인 계층을 구분하며 진행',
      },
      {
        problem: '댓글 작성 시 useState로 추가하면 페이지네이션이 무시되고 리스트에 계속 누적',
        solution: '등록 후 마지막 페이지로 이동 + 리스트 길이에 따라 전/후 페이지 자동 요청',
      },
      {
        problem: 'Bandsintown 스크립트 로드와 React DOM 준비 시점 불일치로 위젯 미표시',
        solution: 'DOM 렌더 후 스크립트를 동적 삽입하고 로드 완료 시 init() 호출',
      },
    ],
    learnings:
      'SSR에서 React 전환은 화면 방식만 바꾸는 게 아니라 컨트롤러 계층 재설계까지 포함해야 완성된다는 것. 유저 케이스별 분기 설계가 UI 코드의 절반 이상을 차지한다는 것.',
    highlight: {
      src: resr11,
      caption: '유저 정의 항목 투표 — chart.js 실시간 반영', // TODO(상담): 확정
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
      { src: resr7, caption: '비회원 게시글 수정 — 등록한 비밀번호 일치 시 가능.' },
      { src: resr10, caption: '대댓글 기능.' },
      { src: resr12, caption: '상호작용 버튼 표시 — 작성자는 수정/삭제 가능.' },
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
      '아티스트·트랙·앨범 상세 등 메인 사용 페이지 담당',
      '핵심 상호작용의 비동기 요청 전환 — 즉각적 피드백 구현',
      'YouTube API 활용 videoId 수집 기능 구현',
    ],
    stacks: [
      { name: 'Spring Boot' },
      { name: 'Thymeleaf' },
      { name: 'MySQL' },
      { name: 'YouTube / Spotify API' },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/ruff1376/Resonos' }],
    troubles: [
      {
        problem: '노래 재생 중 리뷰·좋아요 등 상호작용 시 동기 요청의 전체 새로고침으로 음악이 끊김 — 음악 커뮤니티에 치명적',
        solution: '유저 상호작용을 전면 비동기 요청으로 전환하고 응답을 자바스크립트로 처리',
        result: '재생 무중단 — 사용자 경험 핵심 개선',
      },
      {
        problem: '로컬 외부 환경에서 YouTube 임베드 불가 영상 존재',
        solution: 'Spotify 임베드 iframe을 추가해 임베드 불가 영상도 음원 재생 가능하도록 보완',
      },
      {
        problem: 'YouTube API 호출 시 해당 아티스트가 아닌 영상이나 리액션 영상의 videoId가 DB에 저장',
        solution: '가산점·감점·제외 키워드를 점수 기준으로 비교해 검색 연관성을 높이도록 수정',
      },
    ],
    learnings:
      '동기 요청의 전체 갱신 문제를 비동기 전환으로 해결하며 API와 스프링의 코드 흐름을 파악하는 능력을 키움.',
    highlight: {
      src: res3,
      caption: '앨범 6요소 투표 — 기록 여부에 따라 투표/수정 분기', // TODO(상담): 확정
    },
    screenshots: [
      { src: res3, caption: '앨범 6요소 평가 — 투표 기록이 있으면 수정하기로 분기.', featured: true },
      { src: res9, caption: '유저 상호작용 전면 비동기 처리 — 재생 중단 없음.', featured: true },
      { src: res1, caption: 'Spotify·YouTube API 임베드 + Bandsintown 공연 일정 + 분위기 투표.', featured: true },
      { src: res, caption: '웰컴 페이지.' },
      { src: res2, caption: '앨범 수록곡·리뷰 현황·6요소 점수·플레이리스트 표시.' },
      { src: res4, caption: '트랙을 플레이리스트에 추가하고 분위기 기반으로 다른 곡 탐색.' },
      { src: res5, caption: '분위기 투표와 트랙 포함 플레이리스트 (좋아요순).' },
      { src: res6, caption: '리뷰 더보기 페이지네이션.' },
      { src: res7, caption: '상호작용 내용 저장.' },
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
    team: '팀 프로젝트',
    roles: [
      '기구 관리 기능 담당 — 카테고리별 추가/수정/삭제, 점검 상태 노출',
      '매출 관리 담당 — chart.js 트레이너별 매출 시각화 (주/월/전체)',
    ],
    stacks: [
      { name: 'Java (JSP/Servlet)' },
      { name: 'MySQL' },
      { name: 'chart.js' },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/ruff1376/AI3_MINI1_TEAM3' }],
    troubles: [
      {
        problem: '매출을 음수로 등록하면 차트 그래프가 제대로 그려지지 않음',
        solution: '뷰에서 필수값 검증 + 컨트롤러에서 0 미만 예외 처리 후 에러 메시지 표시',
      },
      {
        problem: '데이터 없는 상태로 페이지 접근 시 NullPointerException 오류 페이지 발생',
        solution: '기간 내 수정하지 못함 — 원인은 null 체크 누락. 이후 조건문·예외 처리로 다양한 상황을 사전 대비하는 습관의 필요성을 확인',
      },
    ],
    learnings:
      '자원 분배의 중요성, 그리고 사용자는 개발자가 의도한 대로만 사용하지 않는다는 것.',
    highlight: {
      src: hhg3,
      caption: '트레이너별 매출 chart.js 시각화', // TODO(상담): 확정
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
