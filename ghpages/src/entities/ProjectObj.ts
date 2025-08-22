import hhgLogo from '../assets/hhg.png'
import hhg1 from '../assets/hhg/machine.png'
import hhg2 from '../assets/hhg/sales.png'
import hhg3 from '../assets/hhg/chart.png'
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
    description: "JAVA 와 JSP 를 사용해 MVC 패턴을 기반으로 진행하였습니다.",
    reflections: "첫프로젝트를 통하여 기본적인 CRUD를 구현하며 데이터 송수신의 개념과 프로그래밍 언어에 익숙해지는 시간이었습니다. 다만 시간상 구현하지 못한부분들에 있어 프로젝트중 자원분배의 중요성도 느끼게 되었습니다",
    improvements: "기구관리와 매출관리 페이지에 페이징처리를 구현하지 못했고, 특정기간의 데이터만 가져온후 차트를 그리는 기능을 추가하면 좋을것 같습니다.",
    images: [hhg1, hhg2, hhg3],
    imgDesc: ["운동기구 관리 부분입니다. 상단버튼을 통해 기구들 등록할수있고, 해당 기구를 클릭하면 상세페이지로 넘어가며, 수정과 삭제가 가능합니다.",
       "트레이너별 매출을 관리하는 부분입니다. 클릭을 하게되면 아코디언탭으로 펼쳐지며, 해당 트레이너에 대해 매출을 등록,수정이 가능합니다",
       "왼쪽 하단의 트레이너 버튼을 클릭해 원하는 트레이너별 매출확인이 가능하고, 상단버튼으로 기간조회가 가능합니다."],
    repo: "https://github.com/ruff1376/AI3_MINI1_TEAM3"
  },
  {
    id: 2,
    projectLogo: resLogo,
    title: "Resonos Spring",
    description: "Spring + Thymeleaf로 구현후 -> Spring + React로 변경하였습니다.",
    reflections: "풀스택 개발을하며 프로젝트가 커질수록 초반 설계의 중요성과 코드의 가독성, 재사용성의 중요성을 깨달았고 API의 개념과 스프링,리액트에 익숙해지는 시간이었습니다.",
    improvements: "YouTube API 한번의 호출로 검색결과를 필터링해서 전부 사용하도록 변경하면 좋을것 같습니다. 추가적으로 마이바티스의 DB 호출을 설계적으로 재구성하면 유지보수가 좋아질것같습니다.",
    images: [res1, res2, res3],
    imgDesc: ["유튜브 API와 Spotify API 를 활용하여 트랙 인기순 정렬과, 인기1위 곡의 뮤직비디오를 임베드 하였습니다.",
      "앨범페이지에서는 해당앨범이 포함된 플레이리스트들과, 리뷰관리기능들과 앨범의 6요소 투표 시각화를 하였습니다.",
      "트랙페이지에서는 투표된 분위기의 시각화, 해당트랙을 플레이리스트에 추가하고, 투표된 분위기로 다른노래를 찾을수 있도록 하였습니다."],
    repo: "https://github.com/Lee-0210/Resonos_React"
  },
  {
    id: 3,
    projectLogo: resLogo,
    title: "Resonos React",
    description: "Spring + Thymeleaf로 구현후 -> Spring + React로 변경하였습니다.",
    reflections: "풀스택 개발을하며 프로젝트가 커질수록 초반 설계의 중요성과 코드의 가독성, 재사용성의 중요성을 깨달았고 API의 개념과 스프링,리액트에 익숙해지는 시간이었습니다.",
    improvements: "YouTube API 한번의 호출로 검색결과를 필터링해서 전부 사용하도록 변경하면 좋을것 같습니다. 추가적으로 마이바티스의 DB 호출을 설계적으로 재구성하면 유지보수가 좋아질것같습니다.",
    images: [res1, res2, res3],
    imgDesc: ["유튜브 API와 Spotify API 를 활용하여 트랙 인기순 정렬과, 인기1위 곡의 뮤직비디오를 임베드 하였습니다.",
      "앨범페이지에서는 해당앨범이 포함된 플레이리스트들과, 리뷰관리기능들과 앨범의 6요소 투표 시각화를 하였습니다.",
      "트랙페이지에서는 투표된 분위기의 시각화, 해당트랙을 플레이리스트에 추가하고, 투표된 분위기로 다른노래를 찾을수 있도록 하였습니다."],
    repo: "https://github.com/Lee-0210/Resonos_React"
  }
];