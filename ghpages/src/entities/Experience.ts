export type Experience = {
  id : number;
  title : string;
  date : string;
  purpose : string;
}

export const experiences : Experience[] = [
  {
    id : 1,
    title : '할건해야짐',
    date : '2025.05.16 ~ 2025.05.28',
    purpose : '헬스장 통합 관리 웹페이지',
  },
  {
    id : 2,
    title : 'Resonos Thymeleaf',
    date : '2025.06.26 ~ 2025.07.22',
    purpose : '음악리뷰 플랫폼',
  },
  {
    id : 3,
    title : 'Resonos React',
    date : '2025.08.06 ~ 2025.08.27',
    purpose : '음악리뷰 및 커뮤니티 플랫폼',
  },
  {
    id : 4,
    title : 'AboutMe',
    date : '2025.08 ~',
    purpose : 'TS 학습, 포트폴리오 제작',
  },
  {
    id : 5,
    title : 'Lexi-hub',
    date : '2025.09.01 ~ 2025.09.15',
    purpose : 'JWT, MongoDB, NestJS 학습',
  },
]