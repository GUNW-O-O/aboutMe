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
    serviceTarget : "홀덤 토너먼트의 온/오프라인 융합 SaaS 시스템",
    description : "상태머신과 Redis 기반 Stateless 서버 아키텍처 설계",
    repo: "https://github.com/GUNW-O-O/playsync",
  },
]