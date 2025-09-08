import lexi1 from '../assets/lexiHub/mainSearch.gif'
import lexi2 from '../assets/lexiHub/addFlashcard.gif'
import lexi3 from '../assets/lexiHub/editFlashcard.png'
import lexi4 from '../assets/lexiHub/editedFlashcard.png'
import lexi5 from '../assets/lexiHub/typingFlashcard.gif'
import lexi6 from '../assets/lexiHub/addLongform.png'
import lexi7 from '../assets/lexiHub/EditLongform.gif'
import lexi8 from '../assets/lexiHub/typingLongform.gif'
import lexi9 from '../assets/lexiHub/doneLongform.png'
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
]