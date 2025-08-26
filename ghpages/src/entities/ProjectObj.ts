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
    description: "첫 팀프로젝트를 통하여 기본적인 CRUD를 직접 구현해보고 JAVA 와 JSP 를 사용해 SSR MVC-2 구조를 기반으로 진행하였습니다.",
    reflections: "데이터 송수신의 개념과 프로그래밍 언어에 익숙해지는 시간이었습니다. 다만 시간상 구현하지 못한부분들에 있어 프로젝트중 자원분배의 중요성도 느끼게 되었고, 사용자는 개발자가 의도한대로만 사용하지 않는다는 생각도 가지게되었습니다.",
    improvements: "특정기간의 데이터만 가져온후 차트를 그리는 기능을 추가해야 데이터의 양이 늘어나도 빠르게 동작할것같습니다. 추가적으로 예외처리를 하지못한부분들도 개선이 필요해보입니다.",
    images: [hhg, hhg1, hhg2, hhg3, hhg4, hhg5, hhg6],
    imgDesc: ["메인화면입니다",
       "중간의 버튼으로 카테고리별 기구를 관리할수 있도록 하였고, 기구 클릭시 수정화면으로 이동합니다.",
       "기구의 수정과 삭제가 가능하고 상태란에 '점검' 이라는 키워드가 존재할시 메인화면에 표시되도록 하였습니다.",
       "트레이너별 매출을 chart.js 라이브러리를 사용하여 표시하였고 최근1주, 한달, 전체기간을 확인할수있습니다.",
       "왼쪽의 트레이너를 클릭하여 조회를 원하는 트레이너별로 차트 표기가 가능합니다.",
       "매출 리스트뷰에서는 매출 등록이 가능하고 클릭시에 아코디언탭이 펼쳐집니다.",
       "매출 클릭시에 수정화면으로 넘어가게 됩니다."],
    troubles: ["매출 등록시 음수로 등록하면 매출 차트 표기가 이상하게 되는점",
      "chart.js 라이브러리 사용법이 미숙했던점."
    ],
    solution: ["뷰에선 필수값으로 지정해두고, 컨트롤러에서는 0보다 작으면 오류를 반환하도록 하였습니다.",
      "chart.js 라이브러리의 문서를 조금더 자세히 읽었다면 트레이너별 매출차트는 라이브러리 기능을 사용했으면 시간이 절약되었을것 같습니다."
    ]
  },
  {
    id: 2,
    title: "Resonos Spring",
    description: "Spring + Thymeleaf로 SSR MVC-2 패턴을 기반으로 진행하였습니다.",
    reflections: "페이지의 내용이 변할때 새로고침을 하는것과 하지 않는것의 유저경험에서 큰 차이를 깨달았으며, API의 개념과 스프링에 익숙해지는 시간이었습니다.",
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
    description: "Spring + React로 변경하고 커뮤니티 기능도 추가하였습니다.",
    reflections: "프로젝트가 커질수록 초반 설계의 중요성과 코드의 가독성과 재사용성의 중요성을 깨달았고, 커뮤니티 기능을 개발하며 프론트엔드와 백엔드를 나누어 진행을 해보며 협업에대한 이해도를 높일수있었습니다.",
    improvements: "아직",
    images: [res1, res2, res3],
    imgDesc: ["유튜브 API와 Spotify API 를 활용하여 트랙 인기순 정렬과, 인기1위 곡의 뮤직비디오를 임베드 하였습니다.",
      "앨범페이지에서는 해당앨범이 포함된 플레이리스트들과, 리뷰관리기능들과 앨범의 6요소 투표 시각화를 하였습니다.",
      "트랙페이지에서는 투표된 분위기의 시각화, 해당트랙을 플레이리스트에 추가하고, 투표된 분위기로 다른노래를 찾을수 있도록 하였습니다."],
    troubles: [
      "초반에는 맡았던페이지를 풀스택으로 개발하였으나, 커뮤니티 기능을 구현할때는 분업을해보며 개발된 기능이 정상작동 하는지 테스트하기가 힘든점",
      "커뮤니티 댓글 작성시 댓글작성시 useState로만 관리시에 페이지네이션을 무시하고 댓글이 계속 현재 댓글 리스트에 추가되는현상",
      "밴즈인타운 위젯 임베드가 리액트환경에서 제대로 작동하지 않는 현상"],
    solution: [
      "스웨거나 Postman, ThunderClient 등을 사용하여 백엔드나 프론트엔드중 어디에 문제가있는지 확인하며 프로젝트를 진행하였습니다.",
      "페이지네이션 구현후 댓글등록시 마지막페이지로 이동하도록 변경후 추가로 댓글리스트의 길이가 페이지네이션길이로 나눈 나머지가 0이라면 다음페이지를 가져오는 함수를 실행후 페이지네이션 객체 최신화",
      "밴즈인타운스크립트의 로드시점과 DOM준비 시점이 맞지않아 스크립트가 제대로 작동하지않는 현상이었습니다. useEffect훅과 useState의 상태를 이용하여 스크립트 로드여부를 감지한후에 스크립트를 재실행하도록 수정하였습니다."]
  }
];