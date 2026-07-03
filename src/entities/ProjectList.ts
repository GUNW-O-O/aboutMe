import hhgLogo from '../assets/hhg.png'
import resonosLogo from '../assets/resonos.png'

export type Reference = {
  id : number;
  projectLogo : string;
  title : string;
  serviceTarget : string;
  description: string;
  repo : string;
}
export const references : Reference[] = [
  {
    id: 1,
    projectLogo : resonosLogo,
    title : "RESONOS React",
    serviceTarget : "사용자 투표 기반 음악 커뮤니티",
    description : "팀 프로젝트",
    repo: "https://github.com/Lee-0210/Resonos_React",
  },
  {
    id: 2,
    projectLogo : resonosLogo,
    title : "RESONOS Thymeleaf",
    serviceTarget : "사용자 투표 기반 음악 커뮤니티",
    description : "팀 프로젝트",
    repo: "https://github.com/ruff1376/Resonos",
  },
  {
    id: 3,
    projectLogo : hhgLogo,
    title : "할건해야짐",
    serviceTarget : "헬스장 통합 관리 시스템",
    description : "팀 프로젝트",
    repo: "https://github.com/ruff1376/AI3_MINI1_TEAM3",
  },
]