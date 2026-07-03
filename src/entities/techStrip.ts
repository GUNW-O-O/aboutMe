// 기술 스트립 3줄 — 접해본 스택 전부. 개발과 무관한 도구(메신저 등)는 넣지 않는다.

export type StripRow = {
  label: string
  direction: 'left' | 'right' // 흐름 방향 — 줄마다 엇갈림
  items: string[]
}

export const techStrip: StripRow[] = [
  {
    label: 'backend',
    direction: 'right',
    items: [
      'Java', 'Spring Boot', 'JSP / Servlet', 'MyBatis', 'MySQL',
      'MongoDB', 'NestJS', 'PostgreSQL', 'Redis', 'Prisma', 'Django', 'Python',
    ],
  },
  {
    label: 'frontend',
    direction: 'left',
    items: [
      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Thymeleaf',
      'HTML / CSS', 'Bootstrap', 'jQuery', 'chart.js', 'Flutter / Dart',
    ],
  },
  {
    label: 'tools',
    direction: 'right',
    items: [
      'Git / GitHub', 'Docker', 'Vite', 'npm', 'Swagger',
      'Tomcat', 'Figma', 'Notion', 'VS Code', 'Eclipse',
    ],
  },
]
