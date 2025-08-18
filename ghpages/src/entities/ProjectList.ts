import hhgLogo from '../assets/hhg.png'
import resonosLogo from '../assets/resonos.png'

export type Reference = {
  id : number;
  projectLogo : string;
  title : string;
  serviceTarget : string;
  description: string;
}
export const references : Reference[] = [
  {
    id: 1,
    projectLogo : hhgLogo,
    title : "할건해야짐",
    serviceTarget : "헬스장 통합 관리 시스템",
    description : "JAVA JSP MVC MySQL"
  },
  {
    id: 2,
    projectLogo : resonosLogo,
    title : "RESONOS",
    serviceTarget : "사용자 투표 기반 음악 커뮤니티",
    description : "JAVA Spring React Mybatis"
  },
  {
    id: 3,
    projectLogo : resonosLogo,
    title : "퀴즈웍스",
    serviceTarget : "타이핑 단어사전 서비스",
    description : "TS NestJS React"
  },
]