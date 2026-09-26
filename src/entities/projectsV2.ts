// V2 프로젝트 데이터 단일 소스 — agent-built 프로젝트 (설계: docs/superpowers/specs/2026-07-07-projects-v2-design.md)
// 진행 중 프로젝트는 싣지 않는다 — 해당 리포 README에 기록하며 개발, 완료 시에만 여기 반영.
// 새 프로젝트 추가 = assets/<id>/ 폴더 생성 + 이 배열에 항목 1개. 컴포넌트 수정 불필요.
// 내용은 사용자 회고 + 리포에서 검증한 사실에서만 — 지어내기 금지.
// 서사 비중: 기술선정·트러블은 간결, 회고(retrospective)가 주인공, evidence가 상세 최상단.

import psJoin from '../assets/playsyncV2/s1-join.webp'
import psSidepot from '../assets/playsyncV2/s3-sidepot.webp'
import psHand from '../assets/playsyncV2/s2-hand.webp'
import psSeat from '../assets/playsyncV2/seat-game.png'
import psDealer from '../assets/playsyncV2/dealer-felt.png'
import psWinner from '../assets/playsyncV2/dealer-winner.png'
import psOtp from '../assets/playsyncV2/console-dealer-otp.png'
import psThumb from '../assets/playsync.png'

const REPO = 'https://github.com/GUNW-O-O/playsync-V2'

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
    proofUrl?: string // 이 장면을 지키는 테스트/문서 — 캡션이 검증 가능해야 한다
    proofLabel?: string
  }[]
  overrides?: {
    // AI 제안을 사람이 뒤집은 지점 — 무엇을 골랐나보다 무엇을 왜 버렸나
    proposal: string // AI가 하려던 것
    rejection: string // 기각 근거
    consequence: string // 안 막았으면 무엇이 깨졌나
    sourceUrl?: string
  }[]
  verification?: { label: string; value: string }[] // 검증 규모 — 측정된 수치만
  decisions?: {
    // 설계 판단 — 간결 (V1 troubles보다 가벼움)
    topic: string // 무엇을 정해야 했나
    choice: string
    reason: string // 비교한 대안 포함 가능
  }[]
  troubles?: { problem: string; solution: string }[]
  limits?: { topic: string; detail: string }[] // 이 프로젝트가 증명하지 못하는 것 — 감수한 근거까지
  retrospective?: string[] // 주인공 ② — 단락 배열. 기술 이해 깊이·개발 방식 회고
  noteIds?: string[] // 연결된 TechNote id (entities/notes.ts)
  thumbnail?: string // 없으면 카드 placeholder
}

export const projectsV2: ProjectV2[] = [
  {
    id: 'playsync-v2',
    title: 'Playsync V2',
    agentBuilt: true,
    isHighlight: true, // 대표작 — 2026-08-09 aboutme에서 넘겨받음
    sortKey: '2026-07',
    period: '2026.07.18 – 08.08',
    summary:
      '오프라인 홀덤 토너먼트 운영 시스템. 카드는 사람 딜러가 실물로 딜링하고 시스템은 칩·팟·베팅 순서·좌석·상금을 맡습니다. V1 MVP의 “돌아가긴 한다”를 “정확하게 돌아간다”로 옮기는 작업을 전부 에이전트 코딩으로 진행하고 판단 근거를 문서에 남겼습니다.',
    links: [
      { label: 'GitHub', url: REPO },
      { label: '결정 로그 (chat-log)', url: `${REPO}/blob/main/docs/chat-log.md` },
    ],
    stacks: [
      {
        name: 'TypeScript',
        insight:
          'contract 패키지를 워크스페이스로 분리해 프론트·백엔드가 같은 zod 스키마를 공유하게 했습니다.',
      },
      {
        name: 'NestJS 11',
        insight:
          '딜러 경로와 플레이어 경로가 동시에 같은 상태를 건드려, 동시성이 예외가 아니라 기본 시나리오였습니다.',
      },
      { name: 'Next.js' },
      {
        name: 'PostgreSQL',
        insight:
          '진실의 원천. 핸드 종료 시점의 커밋 한 번이 “그 일이 일어난 단일 순간”이 되게 했습니다.',
      },
      {
        name: 'Redis',
        insight:
          '핸드 진행 중의 상태. 원천이 DB와 Redis 사이를 핸드 경계에서 교대합니다.',
      },
      {
        name: 'zod contract',
        insight:
          '비밀 값은 공개형을 contract에 두고 백엔드가 .extend()로 내부형을 만듭니다. 전체 스키마를 놓고 .omit()으로 빼면 프론트가 import할 수 있게 되는 순간 규칙이 문서로만 남습니다.',
      },
    ],
    evidence: [
      {
        src: psJoin,
        caption:
          '폰에서 참가비를 내고 참가 OTP를 받습니다. 자리로 걸어가 태블릿에 그 번호를 넣으면 좌석이 확정됩니다 — 결제가 아니라 입장에서 확정됩니다. 사람이 실제로 걸어가는 동선이 상태 전이의 기준입니다.',
        featured: true,
        proofUrl: `${REPO}/blob/main/frontend/e2e/terminal.spec.ts`,
        proofLabel: 'terminal.spec.ts',
      },
      {
        src: psSidepot,
        caption:
          '올인 셋이 팟을 둘로 가릅니다. 딜러가 1등만 찍자 지급이 거부됩니다 — 지명되지 않은 팟이 남았기 때문입니다. 서버가 승부를 추측하는 것보다 되묻는 것이 옳다고 봤습니다.',
        featured: true,
        proofUrl: `${REPO}/blob/main/backend/src/scenario/allin-sidepot.int-spec.ts`,
        proofLabel: 'allin-sidepot.int-spec.ts',
      },
      {
        src: psHand,
        caption:
          '좌석 둘 · 딜러 · 전광판이 한 판을 동시에 그립니다. 차례는 언제나 하나뿐이라 한쪽 태블릿에 액션 버튼이 살아 있으면 다른 쪽은 죽어 있습니다. 여러 판을 거쳐도 칩 총량은 그대로입니다.',
        featured: true,
        proofUrl: `${REPO}/blob/main/backend/src/scenario/full-flow.int-spec.ts`,
        proofLabel: 'full-flow.int-spec.ts',
      },
      {
        src: psSeat,
        caption:
          '좌석 태블릿. 보드에 무늬가 없습니다 — 몇 장이 깔렸는지만 그리고, 무엇이 깔렸는지는 테이블 위에 있습니다.',
      },
      {
        src: psDealer,
        caption:
          '바로 위 좌석 화면과 같은 테이블을 딜러 쪽에서 본 것입니다. 좌석 화면은 딜러가 위에, 딜러 화면은 자기 자리가 아래에 옵니다. 화면 배치가 눈앞의 배치와 겹쳐야 하기 때문입니다.',
      },
      {
        src: psWinner,
        caption:
          '승자 결정 화면. 팟이 몇 층이고 누가 어느 층의 자격자인지는 시스템이 책임지고, 딜러는 그것을 보고 순서를 찍습니다. 승자는 계산되지 않고 입력됩니다.',
      },
      {
        src: psOtp,
        caption:
          '번호가 둘이고 취급이 다릅니다. 참가 OTP는 잃어버려도 다시 봐야 하니 평문으로, 딜러 OTP는 해시로만 남겨 상점 콘솔의 그 탭이 유일한 열람 경로입니다. 값이 아니라 권한이 걸린 쪽을 되돌릴 수 없게 만들었습니다.',
      },
    ],
    overrides: [
      {
        proposal:
          'DB 체크포인트가 실패하면 재시도 큐에 넣고 핸드는 계속 진행한다.',
        rejection:
          '핸드 경계에서 진실의 원천이 DB와 Redis 사이를 교대하는 것이 원래 설계입니다. 카드가 실물이라 잘못 나간 지급을 되돌릴 근거가 테이블 위에 남지 않습니다.',
        consequence:
          '체크포인트 없이 원천이 Redis로 넘어가 복구 지점이 한 핸드 전에 머뭅니다. 실제로 고칠 것은 항상 true를 돌려주던 boolean 하나였습니다.',
        sourceUrl: `${REPO}/blob/main/docs/chat-log.md`,
      },
      {
        proposal: '자격자가 없는 사이드팟의 반환 경로를 만든다.',
        rejection:
          '폴드는 참여 자격 상실이라 자격자 0인 층은 홀덤 규칙상 도달할 수 없습니다.',
        consequence:
          '일어날 수 없는 일에 코드가 붙어 검증도 못 하고, 나중에 규칙으로 오해받습니다.',
        sourceUrl: `${REPO}/blob/main/docs/chat-log.md`,
      },
      {
        proposal:
          '딜러가 수동으로 페이즈를 넘기는 버튼(forceNextPhase)을 새로 만든다.',
        rejection:
          '자리를 비운 사람을 처리하는 수단은 DEALER_FOLD(턴 스킵)와 DEALER_KICK(영구 이탈)으로 이미 있었습니다. AI가 그 두 액션이 무엇을 하는지 몰랐던 것입니다.',
        consequence:
          '있는 기능이 하나 더 생기고, 정작 실제 버그는 남습니다 — 딜러 폴드가 “턴이 아닌 사람” 분기에만 있어, 프리플랍 첫 액션자처럼 가장 급한 경우만 골라서 깨져 있었습니다.',
        sourceUrl: `${REPO}/blob/main/docs/chat-log.md`,
      },
      {
        proposal: 'createSession이 딜러 OTP를 반환하지 않는 것은 버그다.',
        rejection: 'OTP는 상점 관리 페이지에서 조회하는 것이 정본 경로입니다.',
        consequence:
          '멀쩡한 설계에 반환값이 붙어 OTP 노출 경로가 둘로 갈라집니다. 권한이 걸린 값이 두 곳으로 새는 것입니다.',
        sourceUrl: `${REPO}/blob/main/docs/chat-log.md`,
      },
    ],
    verification: [
      { label: 'contract', value: '62 (4 suites)' },
      { label: '백엔드 단위', value: '178 (16 suites)' },
      { label: '프론트 단위', value: '100 (24 files)' },
      { label: '통합', value: '336 (27 suites · 시나리오 11 포함)' },
      { label: 'e2e', value: '13 (4 files)' },
      { label: '타입 에러', value: '0' },
    ],
    decisions: [
      {
        topic: '통합 테스트의 인프라를 목으로 대체할 것인가',
        choice: '개발용과 분리된 진짜 Redis·PostgreSQL 컨테이너를 띄웠습니다.',
        reason:
          '락을 목으로 테스트하면 검증 대상인 원자성 자체가 사라집니다. CI에서도 같은 컨테이너를 띄웁니다.',
      },
      {
        topic: '부품이 각각 옳은데 조립이 틀린 경우를 무엇이 잡는가',
        choice: '단위·통합 위에 시나리오 계층을 따로 두었습니다.',
        reason:
          '이음매에서 나는 버그는 부품 단위 테스트가 구조적으로 못 잡습니다. 시나리오는 사람이 읽을 수 있는 이야기라 테스트가 맞는지를 사람이 판단할 수 있습니다.',
      },
      {
        topic: '되돌릴 수 없는 일의 순서',
        choice:
          '되돌릴 수 있는 일을 먼저 하고, 커밋 한 번이 그 일이 일어난 단일 순간이 되게 했습니다.',
        reason:
          '실패하면 이전 상태로 남아 다시 누르는 것이 곧 재시도가 됩니다. 핸드 종료·대회 시작·대회 종료·팟 분배에 같은 형태를 반복 적용했습니다.',
      },
      {
        topic: 'AI가 만든 리뷰 대장을 그대로 적용할 것인가',
        choice: '적용 전 전 항목을 코드와 다시 대조하는 2차 검증을 단계로 강제했습니다.',
        reason:
          '18건 중 15건은 정확했고 오진 3건이 걸러졌으며, 대조 과정에서 신규 9건이 더 나왔습니다. 한 건은 제안한 수정 자체에 역효과 버그가 있어 그대로 적용하면 데드락이 다른 경로로 재발했습니다.',
      },
    ],
    troubles: [
      {
        problem:
          '위임한 특성화 테스트가 기대값을 코드에서 역산하면 버그까지 정답으로 굳습니다. 나중에 고치는 사람이 빨간불을 보고 자기가 틀렸다고 생각하게 됩니다.',
        solution:
          '“기대값을 코드에서 역산하지 말고 홀덤 규칙으로 먼저 계산하라”를 위임 제약으로 걸었습니다. 18건 중 1건이 어긋났고 그것이 사이드팟 칩 증발 버그였습니다.',
      },
      {
        problem:
          '새로 쓴 테스트가 처음부터 통과하는 경우가 반복됐습니다. 통과했으니 됐다고 넘겼으면 그대로 남았을 버그였습니다.',
        solution:
          '사후에 추가한 검사는 제품 코드를 일부러 되돌려 빨간불을 확인했습니다. 검사가 둘이면 서로를 가릴 수 있어, 둘이 어긋나는 입력을 넣어야 각각이 증명됩니다.',
      },
      {
        problem:
          '화면을 다시 만들면서 전광판 폴링이 1초에서 3초로 조용히 바뀌어 있었습니다. 리뷰도 테스트도 이건 못 잡습니다 — 3초 역시 올바른 코드입니다.',
        solution:
          '재작성이 값을 떨어뜨렸을 가능성을 먼저 의심하고 이전 값을 짚어 확인했습니다. 자동 검증의 사각지대가 어디인지를 이 건에서 확인했습니다.',
      },
    ],
    limits: [
      {
        topic: 'WS 세션만 인메모리 Map',
        detail:
          '게임 상태는 Redis, 진실은 DB라 서버가 상태를 들지는 않지만 연결만은 프로세스에 묶입니다. 단일 프로세스 전제입니다.',
      },
      {
        topic: '복구의 천장은 핸드 경계',
        detail:
          '핸드 중간은 일부러 되살리지 않습니다. 카드가 실물이라 그 핸드는 사람이 다시 딜하고, 지키는 선은 “다음 핸드가 옳은 사람에게서 시작된다”까지입니다.',
      },
      {
        topic: '실사용 검증 없음',
        detail:
          '학습 목적으로 만든 프로젝트라 실제 운영에 올린 적이 없습니다. 시나리오 기반 검증은 그리지 못한 시나리오에 무방비입니다.',
      },
    ],
    thumbnail: psThumb,
  },
]

// V1과 동일 정렬 규칙 — isHighlight 최상단 고정, 나머지 sortKey 내림차순
export const sortedProjectsV2 = [...projectsV2].sort(
  (a, b) =>
    Number(b.isHighlight ?? false) - Number(a.isHighlight ?? false) ||
    b.sortKey.localeCompare(a.sortKey),
)

export const getProjectV2 = (id: string) => projectsV2.find(p => p.id === id)

/** 상세 페이지 prev/next — V2 그룹 안에서만 이동 */
export const getAdjacentV2 = (id: string) => {
  const idx = sortedProjectsV2.findIndex(p => p.id === id)
  return {
    prev: idx > 0 ? sortedProjectsV2[idx - 1] : undefined,
    next: idx >= 0 && idx < sortedProjectsV2.length - 1 ? sortedProjectsV2[idx + 1] : undefined,
  }
}
