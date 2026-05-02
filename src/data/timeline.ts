export interface Milestone {
  year: string
  title: string
  description: string
  type: 'education' | 'work' | 'project' | 'achievement'
}

export const timeline: Milestone[] = [
  {
    year: '2021',
    title: 'Started BCA in Computer Science',
    description:
      'Entered the arena. Began training in data structures, algorithms, and web fundamentals.',
    type: 'education',
  },
  {
    year: '2022',
    title: 'First Full-Stack Project',
    description:
      'Built Portfolio v1 — the dark match that started it all. HTML, CSS, and GSAP.',
    type: 'project',
  },
  {
    year: '2023',
    title: 'Internship at EzyBuilds',
    description:
      'Joined EzyBuilds as a frontend intern. Built analytics dashboards, learned React at scale.',
    type: 'work',
  },
  {
    year: '2026',
    title: 'Smart Exhibition App',
    description:
      'Main event push. Built a full-stack React Native + Node.js platform for exhibition management.',
    type: 'project',
  },
  
  {
    year: '2026',
    title: 'MAIN EVENT Portfolio',
    description:
      'The magnum opus. A wrestling-themed 3D portfolio that breaks the fourth wall.',
    type: 'achievement',
  },
]
