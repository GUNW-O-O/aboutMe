import lexiLogo from '../assets/lexiHub.png'
import syncLogo from '../assets/playsync.png'
import type { Reference } from './ProjectList' 

export const personalReferences : Reference[] = [
  {
    id: 1,
    projectLogo : lexiLogo,
    title : "LexiHub",
    serviceTarget : "Toy Project",
    description : "단어장 타이핑 웹서비스",
    repo: "https://github.com/GUNW-O-O/lexi-hub",
  },
  {
    id: 2,
    projectLogo : syncLogo,
    title : "Playsync",
    serviceTarget : "SaaS구조를 기반으로 둔 MVP구현",
    description : "홀덤 토너먼트의 온/오프라인 융합 관리 SaaS 시스템",
    repo: "https://github.com/GUNW-O-O/playsync",
  },
]