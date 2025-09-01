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
  improvements: string;
  images: string[];
  imgDesc: string[];
  troubles: string[];
  solution: string[];
}
export const projectObjs: ProjectObj[] = [
  {
    id: 1,
    title: "할건해야짐",
    description: "첫 팀 프로젝트로 CRUD 기능을 직접 구현했습니다. Java와 JSP를 활용하여 SSR MVC-2 구조 기반으로 개발했습니다.",
    reflections: "Java와 JSP 기반 서버 개발 경험을 쌓았습니다. 다만 시간상 구현하지 못한 부분들로 인해 프로젝트 중 자원 분배의 중요성을 느꼈고, 사용자는 개발자가 의도한 대로만 사용하지 않는다는 점도 깨달았습니다.",
    improvements: "특정 기간의 데이터만 가져온 후 차트를 그리는 기능을 추가하면 데이터의 양이 늘어나도 빠르게 동작할것같습니다. 추가적으로 예외 처리를 하지 못한 부분들도 개선이 필요합니다.",
    images: [hhg, hhg1, hhg2, hhg3, hhg4, hhg5, hhg6],
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
  {
    id: 2,
    title: "Resonos Spring",
    description: "Spring + Thymeleaf로 SSR MVC-2 구조를 기반으로 진행하였습니다.",
    reflections: "페이지의 내용이 변할 때 새로고침을 하는 것과 하지 않는 것의 차이가 유저 경험에 큰 영향을 준다는 것을 깨달았으며, API와 스프링의 개념 및 코드 흐름을 파악하는 능력을 키웠습니다.",
    improvements: "YouTube API 한 번의 호출로 검색 결과를 필터링해 전부 사용하도록 변경하면 좋을 것 같습니다. 추가적으로 마이바티스의 DB 호출을 설계적으로 재구성하면 성능이 향상 될 것 같습니다.",
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
      "로컬호스트 환경이 아닐 때, YouTube 외부 임베드가 불가능한 영상 존재",
      "노래 재생 중 리뷰 작성·좋아요 등 상호작용 시 새로고침되어 음악이 끊기는 문제",
      "YouTube API 호출 시 전혀 관련 없는 동영상이 선택되어 DB에 videoId 저장되는 문제"
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
    reflections: "커뮤니티 기능을 개발하며 프론트엔드와 백엔드를 나누어 진행해 협업에 대한 이해도를 높일 수 있었습니다. 또한 비회원 기능 추가로 여러 상황의 수를 자바스크립트로 해결하며 리액트를 더 잘 다룰 수 있게 되었습니다.",
    improvements: "커뮤니티 게시글에 이미지 첨부 기능을 추가하면 더 유저 친화적인 기능이 될 것 같습니다.",
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
      "초반에는 담당 페이지를 풀스택으로 개발하였으나, 커뮤니티 기능을 구현 시 분업을 하면서 개발된 기능이 작동하지 않을 때 문제 파악이 힘든점",
      "커뮤니티 댓글 작성 시 useState로 추가시 페이지네이션이 무시되고 댓글이 현재 리스트에 계속 추가되는 문제",
      "Bandsintown 스크립트 로드 시점과 리액트 DOM 준비 시점이 맞지 않아 위젯이 정상적으로 표시되지 않음."],
    solution: [
      "Swagger를 도입해 API 명세를 정확히 파악하고, 정상 작동하지 않는 기능의 원인이 백엔드인지 프론트엔드인지 구분하며 프로젝트를 진행했습니다.",
      "페이지네이션 구현 후 댓글 등록 시 마지막 페이지로 이동하도록 로직을 변경했습니다. 추가로 현재 페이지의 댓글 리스트의 길이가 페이지의 크기로 나눈 나머지가 0이라면 다음 페이지를 가져오고, 삭제 후 리스트의 길이가 0이면 이전 페이지를 가져오도록 수정했습니다.",
      "리액트에서 DOM 렌더링 후 Bandsintown 스크립트를 동적으로 추가하고, 로드 완료 시 init()을 호출하도록 변경했으며, 스크립트 객체 존재 여부로 로딩 여부를 판단하는 로직은 제거했습니다."]
  }
];