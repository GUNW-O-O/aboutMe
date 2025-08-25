import hhgLogo from '../assets/hhg.png'
import hhg1 from '../assets/hhg/machines.png'
import hhg2 from '../assets/hhg/sales.png'
import hhg3 from '../assets/hhg/salesChartMax.png'
import resLogo from '../assets/resonos.png'
import res1 from '../assets/resonosSpring/artist.png'
import res2 from '../assets/resonosSpring/album.png'
import res3 from '../assets/resonosSpring/track.png'

export type ProjectObj = {
  id : number;
  projectLogo : string;
  title : string;
  description: string;
  reflections: string;
  improvements: string;
  images: string[];
  imgDesc: string[];
  repo: string;
  troubles? : string | string[];
  solution? : string | string[];
}
export const projectObjs: ProjectObj[] = [
  {
// mvc2 패턴의 컨트롤러의 기본 동작
// 매출 등록시 음수로 등록은 불가능하게 해놨지만
// 수정시에는 음수로 등록이되는등 여러 예외처리를 생각해야함.
// 금액이 큰경우 도 있으니 Long사용도 고려
// 라이브러리 사용시에 기능 알아보기? 차트js에서 원래 줄삭제 가능
    id: 1,
    projectLogo: hhgLogo ,
    title: "할건해야짐",
    description: "JAVA 와 JSP 를 사용해 SSR MVC-2 패턴을 기반으로 진행하였습니다.",
    reflections: "첫프로젝트를 통하여 기본적인 CRUD를 구현하며 데이터 송수신의 개념과 프로그래밍 언어에 익숙해지는 시간이었습니다. 다만 시간상 구현하지 못한부분들에 있어 프로젝트중 자원분배의 중요성도 느끼게 되었고, 사용자는 개발자가 의도한대로만 사용하지 않는다는 생각도 가지게되었습니다.",
    improvements: "특정기간의 데이터만 가져온후 차트를 그리는 기능을 추가해야 데이터의 양이 늘어나도 빠르게 동작할수있을것같습니다. 추가적으로 예외처리를 하지못한부분들도 개선이 필요해보입니다.",
    images: [hhg1, hhg2, hhg3],
    imgDesc: ["운동기구 관리 부분입니다. 상단버튼을 통해 기구들 등록할수있고, 해당 기구를 클릭하면 상세페이지로 넘어가며, 수정과 삭제가 가능합니다.",
       "트레이너별 매출을 관리하는 부분입니다. 클릭을 하게되면 아코디언탭으로 펼쳐지며, 해당 트레이너에 대해 매출을 등록,수정이 가능합니다",
       "왼쪽 하단의 트레이너 버튼을 클릭해 원하는 트레이너별 매출확인이 가능하고, 상단버튼으로 기간조회가 가능합니다."],
    repo: "https://github.com/ruff1376/AI3_MINI1_TEAM3",
    troubles: "매출 등록시 음수로 등록하면 매출 차트 표기가 이상하게 되는점",
    solution: "뷰에선 필수값으로 지정해두고, 컨트롤러에서는 0보다 작으면 오류를 반환하도록 하였습니다."
  },
  {
    id: 2,
    projectLogo: resLogo,
    title: "Resonos Spring",
    description: "Spring + Thymeleaf로 SSR MVC-2 패턴을 기반으로 진행하였습니다.",
    reflections: "페이지의 내용이 변할때 새로고침을 하는것과 하지 않는것의 유저경험에서 큰 차이를 깨달았으며, API의 개념과 스프링에 익숙해지는 시간이었습니다.",
    improvements: "YouTube API 한번의 호출로 검색결과를 필터링해서 전부 사용하도록 변경하면 좋을것 같습니다. 추가적으로 마이바티스의 DB 호출을 설계적으로 재구성하면 유지보수가 좋아질것같습니다.",
    images: [res1, res2, res3],
    imgDesc: ["유튜브 API와 Spotify API 를 활용하여 트랙 인기순 정렬과, 인기1위 곡의 뮤직비디오를 임베드 하였습니다.",
      "앨범페이지에서는 해당앨범이 포함된 플레이리스트들과, 리뷰관리기능들과 앨범의 6요소 투표 시각화를 하였습니다.",
      "트랙페이지에서는 투표된 분위기의 시각화, 해당트랙을 플레이리스트에 추가하고, 투표된 분위기로 다른노래를 찾을수 있도록 하였습니다."],
    repo: "https://github.com/ruff1376/Resonos",
    troubles:[ "로컬호스트 환경이 아닐때, 유튜브 에서 외부 임베드가 불가한 영상들이 존재",
        "노래 재생후 리뷰작성, 좋아요 등 상호작용시 새로고침되며 노래가 끊김",
        "유튜브 API 호출시 연관없는 동영상이 선택되는 현상" ],
    solution : [
      "스포티파이 임베드 아이프레임 추가로 유튜브 임베드가 안될시에도 노래를 들을수있도록 기능을 추가하였습니다.",
      "유저와 상호작용하는 기능들은 비동기요청으로 변경하고, 응답값을 자바스크립트로 변경하도록 수정하였습니다.",
      "가산점키워드, 감점키워드, 제외키워드 들을 추가하고 이를 점수기준으로 비교하여 검색결과가 최대한 연관이 있는 영상이 선택되도록 수정하였습니다."]
  },
  {
    id: 3,
    projectLogo: resLogo,
    title: "Resonos React",
    description: "Spring + React로 변경하고 커뮤니티 기능도 추가하였습니다.",
    reflections: "프로젝트가 커질수록 초반 설계의 중요성과 코드의 가독성과 재사용성의 중요성을 깨달았고, 커뮤니티 기능을 개발하며 프론트엔드와 백엔드를 나누어 진행을 해보며 협업에대한 이해도를 높일수있었습니다.",
    improvements: "",
    images: [res1, res2, res3],
    imgDesc: ["유튜브 API와 Spotify API 를 활용하여 트랙 인기순 정렬과, 인기1위 곡의 뮤직비디오를 임베드 하였습니다.",
      "앨범페이지에서는 해당앨범이 포함된 플레이리스트들과, 리뷰관리기능들과 앨범의 6요소 투표 시각화를 하였습니다.",
      "트랙페이지에서는 투표된 분위기의 시각화, 해당트랙을 플레이리스트에 추가하고, 투표된 분위기로 다른노래를 찾을수 있도록 하였습니다."],
    repo: "https://github.com/Lee-0210/Resonos_React",
    troubles: [
      "초반에는 맡았던페이지를 풀스택으로 개발하였으나, 커뮤니티 기능을 구현할때는 분업을해보며 개발된 기능이 정상작동 하는지 테스트하기가 힘든점",
      "커뮤니티 댓글 작성시 댓글작성시 useState로만 관리시에 페이지네이션을 무시하고 댓글이 마지막에 추가되는현상"],
    solution: [
      "스웨거나 Postman, ThunderClient 등을 사용하며 프로젝트 진행효율을 높였습니다.",
      "페이지네이션 구현후 댓글등록시 마지막페이지로 이동하도록 변경후 추가로 댓글리스트의 길이가 페이지네이션길이로 나눈 나머지가 0이라면 다음페이지를 가져오는 함수를 실행후 페이지네이션 객체 최신화"]
  }
];