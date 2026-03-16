import lexi1 from '../assets/lexiHub/mainSearch.gif'
import lexi2 from '../assets/lexiHub/addFlashcard.gif'
import lexi3 from '../assets/lexiHub/editFlashcard.png'
import lexi4 from '../assets/lexiHub/editedFlashcard.png'
import lexi5 from '../assets/lexiHub/typingFlashcard.gif'
import lexi6 from '../assets/lexiHub/addLongform.png'
import lexi7 from '../assets/lexiHub/EditLongform.gif'
import lexi8 from '../assets/lexiHub/typingLongform.gif'
import lexi9 from '../assets/lexiHub/doneLongform.png'
import sync1 from '../assets/playsync/1playersReady.png'
import sync2 from '../assets/playsync/2dashboard.png'
import sync3 from '../assets/playsync/3raiseAndRaise.gif'
import sync4 from '../assets/playsync/4autoCheck.gif'
import sync5 from '../assets/playsync/5sidePotShowdown.gif'
import sync6 from '../assets/playsync/6sidePot.png'
import sync7 from '../assets/playsync/7goToShowDown.gif'
import sync8 from '../assets/playsync/8eliminated.gif'
// import type { ProjectObj } from './ProjectObj'

export type ProjectObj = {
  id: number;
  title: string;
  skillName: string[];
  skillReason: string[];
  images: string[];
  imgDesc: string[];
  troubles: string[];
  solution: string[];
}

export const PersonalProjectObjs: ProjectObj[] = [
  {
    id: 1,
    title: "LexiHub",
    skillName: [
      "React FSD TS",
      "NestJS",
      "MongoDB",
      "JWT",
    ],
    skillReason:[
      "새로운 프레임워크를 배우기에는 제한된 시간(주말 진행) 때문에 익숙한 React를 선택했습니다. TypeScript 적용을 통해 정적 타입 검증, 유지보수성 강화 등을 학습하였으며, FSD 구조를 학습하며 기능 단위별로 관심사를 분리했습니다.",
      "백엔드 프레임워크를 선택할 때 Express.js와 NestJS를 비교하였습니다. NestJS는 TypeScript 지원이 기본적으로 내장되어 있어 학습 중인 TS를 자연스럽게 적용할 수 있었고, 모듈 기반 구조를 제공하여 기능을 역할별로 모듈화해 관리할 수 있어 선택했습니다.",
      "MongoDB는 이전에 학습한 적이 없었지만, NoSQL 구조가 커스텀 단어장 프로젝트의 데이터 모델과 잘 맞고, 비교적 학습 곡선이 높지 않아 빠른 프로토타이핑에 적합하다고 판단하여 선택했습니다.",
      "팀 프로젝트에서 경험하지 못한 인증/인가 영역을 학습하기 위해 구현했습니다. Access Token과 HttpOnly Refresh Token 구조를 직접 적용하면서, Context와 커스텀 훅을 활용한 인증 흐름을 이해하는 데 중점을 두었습니다.",
    ],
    images: [lexi1, lexi2, lexi3, lexi4, lexi5, lexi6, lexi7, lexi8, lexi9],
    imgDesc: ["메인화면 사이드바에서 단어장 목록의 검색이 가능합니다.",
      "단어장 추가방식은 단일추가와 대량추가(JSON, CSV 형식)를 지원합니다.",
      "단어 수정과 삭제는 하단의 버튼을 눌러야 최종적으로 수정되게 됩니다.",
      "단어장의 정보화면입니다.",
      "단어장 타이핑 화면입니다.",
      "장문 등록 화면입니다.",
      "장문 정보페이지에서 페이지이동없이 수정이 가능합니다.",
      "장문 타이핑 화면입니다.",
      "장문 타이핑이 완료되면 볼수있는 페이지 입니다."
    ],
    troubles: [
      "한 페이지에 오랫동안 머물러 있는 경우, JWT의 만료로 인해 인증 오류가 발생했습니다. 이로 인해 불필요한 로그인 재요청이 발생하여 사용자 경험을 저해했습니다.",
      "한글 입력 시 받침이 완성되기 전에 오타로 인식되는 문제가 있었습니다.",
      "JSON 또는 CSV 형식으로 여러 개의 단어를 한 번에 추가할 때, 마지막 단어 하나만 목록에 추가되는 버그가 발생했습니다."
    ],
    solution: [
      "만료된 액세스 토큰을 자동으로 갱신하는 httpOnly 리프레시 토큰 시스템을 추가했습니다. API 호출 시 토큰이 만료되어 401 에러가 발생하면 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받아 세션의 연속성과 보안성을 확보했습니다.",
      "입력 중인 글자는 오타 검증 대상에서 제외하고, 다음 글자가 입력될 때 이전 글자를 최종적으로 판단하도록 로직을 수정했습니다. 이를 통해 도메인에 이해도가 있어야 결과물의 퀄리티가 높아질수 있다는것을 깨달았습니다.",
      "인자타입에 FlashCard[] 를 추가하고 매개변수가 리스트 타입인지 확인후 리스트라면 구조분해후 추가, 아니라면 단일추가하는 로직으로 수정했습니다."
    ]
  },
  {
    id: 2,
    title: "Playsync",
    skillName: [
      "NestJS",
      "WebSocket",
      "Next.js",
      "Redis",
      "PostgreSQL",
      "JWT",
      "Prisma",
      "Docker",
    ],
    skillReason:[
      "모듈 단위의 의존성 주입을 통해 로직을 구조화하고 유지보수성을 높였습니다.",
      "실시간 상태 공유를 통해 테이블/플레이어/토너먼트 진행을 동기화합니다.",
      "Server Action을 활용하여 httpOnly쿠키로 안전한 인증 로직을 구현하고 빠른 개발환경 구축을 위해 사용했습니다.",
      "수시로 변하는 게임 상태를 빠르게 읽고 쓰며, 서버는 웹소켓과 게임로직 처리를 담당시키기 위해 활용했습니다.",
      "Redis Persistence(RDB/AOF)설정을 통해 토너먼트중 서버 장애시 플레이중인 핸드를 보장하고, 상태 복구를 보장합니다.",
      "인증정보를 안전하게 처리하고 확장에도 유연하게 대응하기 위해 도입하였습니다.",
      "Type-safe한 환경에서 개발 생산성과 안정성을 높이고, 초반 잦은 스키마 변경에 대응했습니다.",
      "Docker: 추후 배포시 환경의 일관성을 유지하고, 개발환경을 빠르게 구축하기위해 사용했습니다.",
    ],
    images: [sync1, sync2, sync3, sync4, sync5, sync6, sync7, sync8],
    imgDesc: [
      "모든 플레이어가 웹소켓으로 접속해있는 화면입니다.",
      "관리페이지에서 대회를 시작하면 해당 대회정보를 Redis에 올리게됩니다.",
      "첫 레이즈 이후 더 큰 벳이 나오면 새로운 액션기회를 가집니다.",
      "test2 플레이어가 30초 이내로 액션을 하지않았고, 콜 할 금액이 없어 자동으로 체크.",
      "사이드팟이 생기는 상황입니다. test2 플레이어가 콜할 금액이 높아져 액션을 더 진행했습니다.",
      "딜러콘솔에서 클릭한 순서대로 핸드가 강한순입니다.",
      "레이즈, 올인, 폴드 일때 액션 가능한 플레이어가 없으므로 쇼다운페이즈로 진입합니다.",
      "딜러가 승자결정시 상태수정, 0인 플레이어 탈락처리, 상태 기준으로 db업데이트, 0인플레이어를 상태에서 제거합니다.",
    ],
    troubles: [
      "Prisma 7.4 도입 및 트러블슈팅",
      "인프라 보안 설정의 중요성 체감, Redis외부접근에 의한 악성봇 경험",
      "실시간 게임 로직의 테이블별 상태 정합성 보장",
      "객체지향 원칙을 통한 물리 구조의 추상화",
    ],
    solution: [
      "라이브러리 사용법이 바뀌었고 AI가 제공해준 라이브러리 적용 코드들이 동작하지않아 공식문서를 찾아보며 해결했습니다.",
      "Docker 컨테이너 기반 Redis 사용 시, 바인딩 설정 미비로 인한 보안 취약점을 발견했습니다. 환경변수를 통한 인증(Requirepass) 설정으로 외부 접근을 차단하고 보안을 강화했습니다.",
      "블라인드 레벨 계산은 서버 타이머 대신 Lazy Update 방식을 적용하여 테이블 핸드 시작 시점에만 레벨을 계산하도록 했고, 이를 통해 서버가 대회 상태를 메모리에 보관하지 않는 stateless 구조를 유지했습니다.",
      "초기 설계 시 딜러와 물리 테이블이 로직들에 강하게 결합되어 확장성이 저해되는 문제를 겪었습니다. 이를 추상화된 개념으로 분리하여 물리적 환경에 구애받지 않는 유연한 구조를 구축했습니다.",
    ]
  },
]