import hhgLogo from '../assets/hhg.png'
import hhg1 from '../assets/hhg/machine.png'
import hhg2 from '../assets/hhg/sales.png'
import hhg3 from '../assets/hhg/chart.png'
import resLogo from '../assets/resonos.png'
import res1 from '../assets/resonos/artist.png'
import res2 from '../assets/resonos/album.png'
import res3 from '../assets/resonos/track.png'

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
    id: 1,
    projectLogo: hhgLogo ,
    title: "할건해야짐",
    description: "JAVA 와 JSP 를 사용해 MVC 패턴을 기반으로 진행하였습니다.",
    reflections: "첫프로젝트로 기본적인 CRUD를 구현하며 데이터 송수신의 개념과 프로그래밍 언어에 익숙해지는 시간이었습니다. 다만 시간상 구현하지 못한부분들에 있어 프로젝트중 자원분배의 중요성도 느끼게 되었습니다",
    improvements: "CRUD 기능은 구현하였지만 기구관리와 매출관리 페이지에 페이징처리를 구현하지 못했고, 특정기간의 데이터만 가져온후 차트를 그리는 기능을 추가하면 좋을것 같습니다.",
    images: [hhg1, hhg2, hhg3],
    imgDesc: ["machine", "sales", "chart"],
    repo: "https://github.com/ruff1376/AI3_MINI1_TEAM3"
  },
  {
    id: 2,
    projectLogo: resLogo,
    title: "Resonos",
    description: "Spring + Thymeleaf로 구현후 -> Spring + React로 변경하였습니다.",
    reflections: "풀스택 개발을 해보며 초반 설계의 중요성과 코드의 가독성, 재사용성의 중요성을 깨달았고 API의 개념과 스프링,리액트에 익숙해지는 시간이었습니다.",
    improvements: "YouTube API 한번의 호출로 검색결과를 필터링해서 전부 사용하도록 변경하면 좋을것 같습니다.",
    images: [res1, res2, res3],
    imgDesc: ["artist", "album", "track"],
    repo: "https://github.com/Lee-0210/Resonos_React"
  }
];