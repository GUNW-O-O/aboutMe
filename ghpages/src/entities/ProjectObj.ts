import hhg from '../assets/hhg/main.png'
import hhg1 from '../assets/hhg/machines.png'
import hhg2 from '../assets/hhg/machineEdit.png'
import hhg3 from '../assets/hhg/salesChartMax.png'
import hhg4 from '../assets/hhg/salesChartMin.png'
import hhg5 from '../assets/hhg/salesList.png'
import hhg6 from '../assets/hhg/sales.png'
import res from '../assets/resonosSpring/main.png'
import res1 from '../assets/resonosSpring/artist.png'
import res2 from '../assets/resonosSpring/album.png'
import res3 from '../assets/resonosSpring/album6vote.png'
import res4 from '../assets/resonosSpring/track.png'
import res5 from '../assets/resonosSpring/trackmood.png'
import res6 from '../assets/resonosSpring/review.png'
import res7 from '../assets/resonosSpring/reviewmore.png'
import res8 from '../assets/resonosSpring/blind.png'
import res9 from '../assets/resonosSpring/plAdd.png'
import res10 from '../assets/resonosSpring/plAddOk.png'
import resr from '../assets/resonosReact/welcome.png'
import resr1 from '../assets/resonosReact/artist.png'
import resr2 from '../assets/resonosReact/album.png'
import resr3 from '../assets/resonosReact/track.png'
import resr4 from '../assets/resonosReact/comRefactoring.png'
import resr5 from '../assets/resonosReact/comMain.png'
import resr6 from '../assets/resonosReact/comPostEdit.png'
import resr7 from '../assets/resonosReact/comNonMember.png'
import resr8 from '../assets/resonosReact/comPost.png'
import resr9 from '../assets/resonosReact/comVote.png'
import resr10 from '../assets/resonosReact/comComments.png'


export type ProjectObj = {
  id: number;
  title: string;
  description: string;
  reflections: string;
  responsibilities: string;
  images: string[];
  imgDesc: string[];
  troubles: string[];
  solution: string[];
}
export const projectObjs: ProjectObj[] = [
  {
    id: 1,
    title: "할건해야짐",
    description: "첫 팀 프로젝트로 Java JSP Servlet과 SSR MVC-2 구조를 기반으로한 헬스장 관리 웹서비스를 개발했습니다.",
    reflections: "Java와 JSP 기반 서버 개발 경험을 쌓았습니다. 다만 시간상 구현하지 못한 부분들로 인해 프로젝트 중 자원 분배의 중요성을 느꼈고, 사용자는 개발자가 의도한 대로만 사용하지 않는다는 점도 깨달았습니다.",
    responsibilities: "기구 관리 및 매출 관리 기능을 담당하였으며, 매출관련으로는 chart.js를 활용하여 시각화 기능을 구현했습니다.",
    images: [hhg, hhg1, hhg2, hhg3, hhg4, hhg5, hhg6],
    imgDesc: ["메인화면",
      "카테고리별 기구 추가 및 기구 클릭 시 수정 화면으로 이동이 가능합니다.",
      "기구의 수정과 삭제가 가능하고 상태란에 '점검'이라는 키워드가 존재할 시 메인 화면의 할 일 탭에 노출됩니다.",
      "트레이너별 매출을 chart.js 라이브러리로 표시하였고 최근 1주, 한 달, 전체 기간을 확인할 수 있습니다.",
      "왼쪽의 트레이너를 클릭하여 조회를 원하는 트레이너별 차트 표기가 가능합니다.",
      "매출 등록이 가능하고 클릭 시 아코디언 탭이 펼쳐집니다.",
      "매출 클릭 시 수정 화면으로 넘어가게 됩니다."],
    troubles: ["매출 등록 시 음수로 등록하면 매출 차트 표기 시 그래프가 제대로 그려지지 않는상황.",
      "테스트 중 정보가 없는 상태에서 페이지 접근 시 NullPointerException으로 오류 페이지가 발생했습니다."
    ],
    solution: ["뷰에서는 필수값으로 검증 후, 컨트롤러에서 0보다 작으면 예외 처리하여 뷰에서 에러 메시지를 띄우도록 하였습니다.",
      "프로젝트 기간 내에는 수정하지 못했지만, 원인은 null 값 체크 누락이었습니다. 이후에는 여러 경우를 사전에 고려하여 조건문 처리나 예외 처리를 추가하는 등 다양한 상황을 대비하는 개발 습관이 필요함을 깨달았습니다."
    ]
  },
  {
    id: 2,
    title: "Resonos Spring",
    description: "Spring + Thymeleaf과 SSR MVC-2 구조를 기반으로한 사용자 투표 기반 음악 커뮤니티 입니다.",
    reflections: "동기 요청 처리로 인해 페이지 전체가 갱신되는 현상이 있었습니다. 이를 비동기 요청으로 전환하고 응답을 자바스크립트로 처리하면서 사용자 경험을 개선할 수 있었고, API와 스프링의 개념 및 코드 흐름을 파악하는 능력을 키웠습니다.",
    responsibilities: "아티스트, 트랙, 앨범 상세 페이지 등 메인 사용 페이지를 담당하였으며, 핵심 상호작용 기능을 비동기 요청으로 보내며 즉각적인 피드백을 구현했습니다. 추가적으로 YouTube API를 활용하여 videoId를 가져오는 기능을 구현했습니다.",
    images: [res, res1, res2, res3, res4, res5, res6, res7, res8, res9, res10],
    imgDesc: ["웰컴 페이지 입니다.",
      "해당 아티스트의 정보와 앨범들, 인기 상위7곡과 인기도 1위인 뮤직비디오를 Spotify와 YouTube API를 활용하여 임베드하였고, 아티스트의 최근 리뷰와 Bandsintown 기반 공연 일정이 표시되며 분위기 투표가 가능합니다.",
      "앨범 페이지에서는 앨범 수록곡, 리뷰 현황과 앨범의 6요소 평가 점수, 앨범의 트랙이 포함된 플레이리스트, 해당 유저의 앨범·리뷰 좋아요 여부가 표시됩니다.",
      "앨범의 6요소는 투표하지 않았을 경우 '투표하기', 투표 기록이 있을 경우 '수정하기'가 가능합니다.",
      "트랙 페이지에서는 해당 트랙을 플레이리스트에 추가하고, 투표된 분위기를 기반으로 다른 노래를 찾을 수 있습니다.",
      "분위기 투표와 해당 트랙이 포함된 플레이리스트가 좋아요 순으로 표시됩니다.",
      "리뷰는 '더보기' 형식의 페이지네이션을 적용했습니다.",
      "신고가 누적된 리뷰는 블라인드 처리되며, 사용자가 내용을 확인할 수 있도록 구현하였습니다.",
      "블라인드 리뷰는 관리자 계정 접속 시 버튼 클릭 없이 바로 볼 수 있으며, 수정과 삭제가 가능합니다.",
      "유저 상호작용 기능은 비동기 요청으로 구현하였습니다.",
      "음악을 재생하면서 트랙을 플레이리스트에 추가한 장면입니다."
    ],
    troubles: [
      "로컬 환경 외부에서는 YouTube 임베드가 불가능한 영상 존재",
      "노래 재생 중 리뷰 작성·좋아요 등 상호작용 시 새로고침으로 인해 음악이 끊기는 문제. 이문제는 음악 커뮤니티의 치명적인 감점요소라고 판단했습니다.",
      "상세페이지에서 YouTube API 호출 시 해당 아티스트의 영상이 아니거나 리액션 영상이 선택되어 DB에 videoId 저장되는 문제"
    ],
    solution: [
      "Spotify 임베드 아이프레임을 추가하여 YouTube 외부 임베드 불가 영상에도 음원을 재생할 수 있도록 기능을 추가했습니다.",
      "유저 상호작용 기능을 비동기 요청으로 변경하고, 응답값을 자바스크립트로 처리하도록 수정했습니다.",
      "가산점 키워드, 감점 키워드, 제외 키워드를 추가하고 이를 점수 기준으로 비교해 검색 결과가 더 연관성 있게 나오도록 수정했습니다."
    ]
  },
  {
    id: 3,
    title: "Resonos React",
    description: "Spring + React로 변경하며 커뮤니티와 게시글에 투표기능을 추가하였습니다.",
    reflections: "타임리프 기반 SSR 구조에서 React로 전환하며, 단순히 화면을 그리는 방식만 바꾼것이 아니라 컨트롤러 리팩토링을 수행하며 코드의 가독성과 안정성 증가를 경험했습니다. 다양한 유저 케이스를 고려한 UI·UX 설계의 복잡함을 체감했고, 이를 통해 React 상태 관리와 분기 처리에 대한 이해도를 크게 높일 수 있었습니다.",
    responsibilities: "기존 타임리프 기반 프로젝트를 React로 전환하며 담당했던 컨트롤러를 리팩토링하고, 프론트엔드로는 추가된 자유 커뮤니티 게시글 작성 및 상세 페이지 및 투표 기능을 구현했습니다. 또한 프론트엔드 작업시 백엔드 개선점도 전달했습니다. 비회원 게시글/댓글 기능도 구현하며 조건부 렌더링 처리에 집중했습니다.",
    images: [resr, resr1, resr2, resr3, resr4, resr5, resr6, resr7, resr8, resr9, resr10],
    imgDesc: [
      "배경은 라이브러리를 적용하였고, 다크/라이트모드 기능 도입 시 왼쪽 배경의 조화가 떨어져, 현재 모드를 감지 후 맞춤 배경을 적용하여 사용자 경험을 개선했습니다.",
      "아티스트 페이지 입니다. 기존과 동일하게 구현하였습니다.",
      "앨범 페이지 입니다. 기존과 동일하게 구현하였습니다.",
      "트랙 페이지 입니다. 기존과 동일하게 구현하였습니다.",
      "기존 컨트롤러 코드 리팩토링 전/후 입니다. 파사드 패턴을 적용하여 컨트롤러와 서비스 단의 역할을 분리했고, 코드 가독성과 안정성을 높일 수 있는 구조로 리팩토링했습니다.",
      "리액트로 변경하며 추가한 커뮤니티 기능 메인페이지 입니다.",
      "비회원 기능을 추가하여 임시 비밀번호를 등록한 후 게시글과 댓글 작성이 가능합니다.",
      "비회원의 게시글, 댓글은 작성 시 등록한 비밀번호가 일치하면 삭제나 수정이 가능합니다.",
      "유저들이 원하는 항목들로 등록, 수정, 삭제가 가능하며 로그인 시 투표가 가능합니다.",
      "투표 시 chart.js 그래프로 표기되며, 투표 버튼은 '재투표하기' 버튼으로 변경됩니다.",
      "유저가 상호작용한 버튼은 표시되며, 게시글이나 댓글 작성자는 수정, 삭제가 가능합니다."
    ],
    troubles: [
      "컨트롤러 코드가 읽기 어렵고, 일부 서비스 단 로직이 섞여 있어 책임 분리와 코드 가독성이 떨어졌습니다.",
      "초반에는 담당 페이지를 풀스택으로 개발했으나, 분업 후 커뮤니티 기능이 정상 작동하지 않아 문제 원인을 파악하는 데 어려움이 있었습니다.",
      "커뮤니티 댓글 작성 시 useState로 추가시 페이지네이션이 무시되고 댓글이 현재 리스트에 계속 추가되는 문제.",
      "Bandsintown 스크립트 로드 시점과 React DOM 준비 시점이 맞지 않아 위젯이 정상적으로 표시되지 않았습니다."
    ],
    solution: [
      "파사드 패턴을 적용하여 컨트롤러와 서비스 단 역할을 명확히 분리하고, 코드 가독성과 안정성을 높였습니다.",
      "Swagger를 도입해 API 명세를 정확히 파악하고, 정상 작동하지 않는 기능의 원인이 백엔드인지 프론트엔드인지 구분하며 프로젝트를 진행했습니다.",
      "페이지네이션 구현 후 댓글 등록 시 마지막 페이지로 이동하도록 로직을 변경했습니다. 추가로 댓글 리스트의 길이에 따라 이전/다음 페이지를 자동으로 요청하도록 변경했습니다.",
      "리액트에서 DOM 렌더링 후 Bandsintown 스크립트를 동적으로 추가하고, 로드 완료 시 init()을 호출하도록 변경했으며, 스크립트 객체 존재 여부로 로딩 여부를 판단하는 로직은 제거했습니다."
    ]
  }
];