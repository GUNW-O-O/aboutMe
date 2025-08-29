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
import resr1 from '../assets/resonosSpring/artist.png'
import resr2 from '../assets/resonosSpring/album.png'
import resr3 from '../assets/resonosSpring/track.png'
import resr4 from '../assets/resonosReact/comRefactoring.png'
import resr5 from '../assets/resonosReact/comMain.png'
import resr6 from '../assets/resonosReact/comPostEdit.png'
import resr7 from '../assets/resonosReact/comNonMember.png'
import resr8 from '../assets/resonosReact/comPost.png'
import resr9 from '../assets/resonosReact/comVote.png'
import resr10 from '../assets/resonosReact/comComments.png'


export type ProjectObj = {
  id : number;
  title : string;
  description: string;
  reflections: string;
  improvements: string;
  images: string[];
  imgDesc: string[];
  troubles : string[];
  solution : string[];
}
export const projectObjs: ProjectObj[] = [
  {
    id: 1,
    title: "할건해야짐",
    description: "첫 팀 프로젝트로 CRUD 기능을 직접 구현했습니다. Java와 JSP를 활용하여 SSR MVC-2 구조 기반으로 개발했습니다.",
    reflections: "Java와 JSP 기반 서버 개발 경험을 쌓았습니다. 다만 시간상 구현하지 못한부분들에 있어 프로젝트중 자원분배의 중요성도 느끼게 되었고, 사용자는 개발자가 의도한대로만 사용하지 않는다는 생각도 가지게되었습니다.",
    improvements: "특정기간의 데이터만 가져온후 차트를 그리는 기능을 추가해야 데이터의 양이 늘어나도 빠르게 동작할것같습니다. 추가적으로 예외처리를 하지못한부분들도 개선이 필요해보입니다.",
    images: [hhg, hhg1, hhg2, hhg3, hhg4, hhg5, hhg6],
    imgDesc: ["메인화면",
       "카테고리별 기구 추가 및 기구 클릭시 수정화면으로 이동이 가능합니다.",
       "기구의 수정과 삭제가 가능하고 상태란에 '점검' 이라는 키워드가 존재할시 메인화면의 할일 탭에 노출됩니다.",
       "트레이너별 매출을 chart.js 라이브러리로 표시하였고 최근1주, 한달, 전체기간을 확인할수있습니다.",
       "왼쪽의 트레이너를 클릭하여 조회를 원하는 트레이너별로 차트 표기가 가능합니다.",
       "매출 등록이 가능하고 클릭시에 아코디언탭이 펼쳐집니다.",
       "매출 클릭시에 수정화면으로 넘어가게 됩니다."],
    troubles: ["매출 등록시 음수로 등록하면 매출 차트 표기시 그래프가 제대로 그려지지 않는상황.",
      "chart.js 라이브러리 사용법이 미숙했던점."
    ],
    solution: ["뷰에선 필수값으로 검증 후, 컨트롤러에서 0보다 작으면 예외 처리로 뷰에서 에러메시지를 띄우도록 하였습니다.",
      "chart.js 라이브러리의 문서를 조금더 자세히 읽었다면 트레이너별 매출차트는 라이브러리 기능을 사용했으면 시간이 절약되었을것 같습니다."
    ]
  },
  {
    id: 2,
    title: "Resonos Spring",
    description: "Spring + Thymeleaf로 SSR MVC-2 구조를 기반으로 진행하였습니다.",
    reflections: "페이지의 내용이 변할때 새로고침을 하는것과 하지 않는것의 유저경험에서 큰 차이를 깨달았으며, API와 스프링의 개념과 코드의 흐름을 파악하는 능력을 키웠습니다.",
    improvements: "YouTube API 한번의 호출로 검색결과를 필터링해서 전부 사용하도록 변경하면 좋을것 같습니다. 추가적으로 마이바티스의 DB 호출을 설계적으로 재구성하면 유지보수가 좋아질것같습니다.",
    images: [res, res1, res2, res3, res4, res5, res6, res7, res8, res9, res10],
    imgDesc: ["웰컴 페이지 입니다.",
      "해당 아티스트의 정보와 앨범들, 인기 상위7곡과 인기도1위인 뮤직비디오를 스포티파이와 유튜브 API를 활용하여 임베드 하였고, 아티스트의 최근리뷰와 밴즈인타운 기반 공연일정이 표시되고 분위기 투표가 가능합니다.",
      "앨범 페이지에서는 앨범의 수록곡, 리뷰 현황과 앨범의 6요소 평가점수, 앨범의 트랙들이 포함된 플레이리스트들과 해당 유저의 앨범,리뷰의 좋아요 여부를 표시합니다.",
      "앨범의 6요소는 투표를 하지않았을시에는 투표하기, 투표기록이 있을때는 수정하기가 가능합니다",
      "트랙페이지에서는 해당트랙을 플레이리스트에 추가하고, 투표된 분위기로 다른노래를 찾을수 있도록 하였습니다.",
      "분위기 투표와 해당 트랙이 포함되어있는 플레이리스트들이 좋아요순으로 표시됩니다.",
      "리뷰는 더보기 형식의 페이지네이션을 적용하였습니다.",
      "신고가 누적된 리뷰는 블라인드 처리가 되며 블라인드 내용을 사용자가 볼수있게끔 구현하였습니다.",
      "블라인드 리뷰는 어드민 계정으로 접속시엔 내용보기 버튼을 클릭하지 않아도 볼수있으며 수정과 삭제가 가능합니다.",
      "유저가 상호작용하는 기능들은 비동기요청으로 구현하였습니다.",
      "음악을 재생하면서 트랙을 플레이리스트에 추가한 장면입니다."
    ],
    troubles:[ "로컬호스트 환경이 아닐때, 유튜브 에서 외부 임베드가 불가한 영상들이 존재",
        "노래 재생시 리뷰작성, 좋아요 등 상호작용시 새로고침되며 노래가 끊김",
        "유튜브 API 호출시 전혀 관련이 없는 동영상이 선택되어 DB에 videoId가 저장되는 현상" ],
    solution : [
      "스포티파이 임베드 아이프레임을 추가하여 유튜브 외부임베드 불가영상에도 음원을 재생할수있도록 기능을 추가하였습니다.",
      "유저와 상호작용하는 기능들은 비동기요청으로 변경하고, 응답값을 자바스크립트로 변경하도록 수정하였습니다.",
      "가산점키워드, 감점키워드, 제외키워드 들을 추가하고 이를 점수기준으로 비교하여 검색결과가 최대한 연관이 있는 영상이 선택되도록 수정하였습니다."]
  },
  {
    id: 3,
    title: "Resonos React",
    description: "Spring + React로 변경, 커뮤니티와 게시글에서 투표기능을 추가하였습니다.",
    reflections: "커뮤니티 기능을 개발하며 프론트엔드와 백엔드를 나누어 진행을 해보며 협업에대한 이해도를 높일수있었습니다. 또한, 비회원기능의 추가로 여러가지 상황의 수를 자바스크립트로 해결하며 리액트를 좀더 잘 다룰수있게 되었습니다.",
    improvements: "커뮤니티 게시글에 이미지 첨부기능을 추가하면 더 유저친화적인 기능이 될것같습니다.",
    images: [resr, resr1, resr2, resr3, resr4, resr5, resr6, resr7, resr8, resr9, resr10],
    imgDesc: ["다크/라이트모드 기능 추가시에 기존 배경이 유저경험을 저해할 것이라고 판단, 현재 모드를 감지후 각각 다른 배경을 보여줄수있도록 하였습니다.",
      "월요일 이미지 수정1.",
      "월요일 이미지 수정2.",
      "월요일 이미지 수정3.",
      "기존 컨트롤러의 코드 리팩토링 전/후 입니다. 파사드 패턴을 적용하여 컨트롤러와 서비스단의 역할을 분리하였고, 코드의 가독성을 높이고 안정성을 높일 수 있는 구조로 리팩토링 하였습니다.",
      "리액트로 변경하며 추가한 커뮤니티 기능의 메인페이지 입니다.",
      "비회원 기능도 추가하여 임시비밀번호를 등록한 후, 게시글과 댓글작성이 가능합니다.",
      "비회원의 게시글, 댓글은 작성시 등록한 비밀번호가 일치하면 삭제나 수정이 가능합니다.",
      "유저들이 원하는 항목들로 등록, 수정, 삭제가 가능하며 로그인시 투표가 가능합니다.",
      "투표를 하게되면 chart.js그래프로 표기가 되며, 투표시 하단의 버튼이 재투표하기 버튼으로 변경됩니다.",
      "유저가 상호작용한 버튼은 표기가 되며, 게시글이나 댓글의 작성자라면 수정, 삭제가 가능합니다."
    ],
    troubles: [
      "초반에는 맡았던페이지를 풀스택으로 개발하였으나, 커뮤니티 기능을 구현할때는 분업을해보며 개발된 기능이 작동이 안될시 문제 파악이 힘든점",
      "커뮤니티 댓글 작성시 댓글작성시 useState로만 관리시에 페이지네이션을 무시하고 댓글이 계속 현재 댓글 리스트에 추가되는현상",
      "밴즈인타운스크립트의 로드시점과 리액트의 DOM준비 시점이 맞지않고, 위젯이 정상적으로 표시되지 않음."],
    solution: [
      "스웨거를 도입후 API 명세를 정확하게 파악후, 정상작동을 하지않는 기능중 백엔드나 프론트엔드중 어느쪽 코드에 문제가있는지 파악하며 프로젝트를 진행하였습니다.",
      "페이지네이션 구현후 댓글등록시 마지막페이지로 이동하도록 로직변경후 추가적으로 현재 페이지의 댓글리스트의 길이가 페이지의크기로 나눈 나머지가 0이라면 다음페이지를 가져오는 함수를 실행하고, 삭제후 댓글리스트의 길이가 0이라면 이전페이지를 가져오는 함수를 실행합니다.",
      "리액트에서 DOM 을 렌더링 후 밴즈인타운 스크립트를 동적으로 추가하고 로드가 완료되면 init() 을 호출하도록 변경하고, 스크립트의 객체 존재여부로 로딩여부를 판단하는 로직을 제거했습니다."]
  }
];