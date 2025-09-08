import lexi1 from '../assets/lexiHub/mainSearch.gif'
import lexi2 from '../assets/lexiHub/addFlashcard.gif'
import lexi3 from '../assets/lexiHub/editFlashcard.png'
import lexi4 from '../assets/lexiHub/editedFlashcard.png'
import lexi5 from '../assets/lexiHub/typingFlashcard.gif'
import lexi6 from '../assets/lexiHub/addLongform.png'
import lexi7 from '../assets/lexiHub/editLongform.png'
import lexi8 from '../assets/lexiHub/typingLongform.gif'
import lexi9 from '../assets/lexiHub/doneLongform.png'
// import lexi8 from '../assets/lexiHub/.png'
import type { ProjectObj } from './ProjectObj'

export const PersonalProjectObjs: ProjectObj[] = [
  {
    id: 1,
    title: "할건해야짐",
    description: "첫 팀 프로젝트로 Java와 JSP를 활용하여 SSR MVC-2 구조 기반으로 개발했습니다.",
    reflections: "Java와 JSP 기반 서버 개발 경험을 쌓았습니다. 다만 시간상 구현하지 못한 부분들로 인해 프로젝트 중 자원 분배의 중요성을 느꼈고, 사용자는 개발자가 의도한 대로만 사용하지 않는다는 점도 깨달았습니다.",
    improvements: "특정 기간의 데이터만 가져온 후 차트를 그리는 기능을 추가하면 데이터의 양이 늘어나도 빠르게 동작할것같습니다. 추가적으로 예외 처리를 하지 못한 부분들도 개선이 필요합니다.",
    images: [lexi1, lexi2, lexi3, lexi4, lexi5, lexi6, lexi7, lexi8, lexi9],
    imgDesc: ["메인화면",
      "카테고리별 기구 추가 및 기구 클릭 시 수정 화면으로 이동이 가능합니다.",
      "기구의 수정과 삭제가 가능하고 상태란에 '점검'이라는 키워드가 존재할 시 메인 화면의 할 일 탭에 노출됩니다.",
      "트레이너별 매출을 chart.js 라이브러리로 표시하였고 최근 1주, 한 달, 전체 기간을 확인할 수 있습니다.",
      "왼쪽의 트레이너를 클릭하여 조회를 원하는 트레이너별 차트 표기가 가능합니다.",
      "매출 등록이 가능하고 클릭 시 아코디언 탭이 펼쳐집니다.",
      "매출 클릭 시 수정 화면으로 넘어가게 됩니다."],
    troubles: ["매출 등록 시 음수로 등록하면 매출 차트 표기 시 그래프가 제대로 그려지지 않는상황.",
      "chart.js 라이브러리 사용법이 미숙했던점."
    ],
    solution: ["뷰에서는 필수값으로 검증 후, 컨트롤러에서 0보다 작으면 예외 처리하여 뷰에서 에러 메시지를 띄우도록 하였습니다.",
      "chart.js 라이브러리의 문서를 좀 더 자세히 읽었다면 트레이너별 매출 차트를 라이브러리 기능을 사용하고, 시간이 절약되었을 것 같습니다."
    ]
  },
]