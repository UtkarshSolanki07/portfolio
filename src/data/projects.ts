export interface Project {
  slug: string
  title: string
  tier: 'main-event' | 'featured' | 'undercard' | 'dark-match'
  matchLabel: string
  opponent: string
  description: string
  stack: string[]
  features: string[]
  stats: { platforms: number; features: number; linesOfCode?: number }
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    slug: 'smart-exhibition-app',
    tier: 'main-event',
    title: 'Smart Exhibition App',
    matchLabel: 'MAIN EVENT · TITLE MATCH',
    opponent: 'SMART EXHIBITION APP',
    description:
      'Full-stack React Native + Node.js platform replacing paper-based exhibition management. Real-time QR scanning, visitor analytics, exhibitor dashboards.',
    stack: ['React Native', 'Node.js', 'MongoDB', 'Express'],
    features: [
      'QR Check-in',
      'Live Analytics',
      'Exhibitor Dashboard',
      'Visitor App',
      'Admin Panel',
    ],
    stats: { platforms: 3, features: 12, linesOfCode: 8400 },
    github: '',
    live: '',
  },
  {
    slug: 'ai-tools-platform',
    tier: 'featured',
    title: 'AI Tools Platform',
    matchLabel: 'FEATURED · NO DQ',
    opponent: 'AI TOOLS PLATFORM',
    description:
      'AI-powered productivity toolkit. Prompt chaining, document analysis, code review automation.',
    stack: ['Next.js', 'OpenAI API', 'Python', 'FastAPI'],
    features: [
      'Prompt Chaining',
      'Document Analysis',
      'Code Review',
      'Multi-model Support',
    ],
    stats: { platforms: 1, features: 8, linesOfCode: 4200 },
    github: '',
    live: '',
  },
  {
    slug: 'ezybuilds-dashboard',
    tier: 'undercard',
    title: 'EzyBuilds Dashboard',
    matchLabel: 'UNDERCARD · LADDER MATCH',
    opponent: 'EZYBUILDS DASHBOARD',
    description:
      'Internal analytics and project management dashboard built during internship at EzyBuilds.',
    stack: ['React', 'TailwindCSS', 'REST API', 'Chart.js'],
    features: [
      'Analytics Dashboard',
      'Project Tracking',
      'Team Management',
      'Reports',
    ],
    stats: { platforms: 1, features: 6, linesOfCode: 2800 },
    github: '',
    live: '',
  },
  {
    slug: 'portfolio-v1',
    tier: 'dark-match',
    title: 'Portfolio v1',
    matchLabel: 'DARK MATCH · PRE-SHOW',
    opponent: 'PORTFOLIO V1',
    description:
      'The original portfolio. It served its purpose. Many regrets. Zero survivors.',
    stack: ['HTML', 'CSS', 'GSAP', 'Many Regrets'],
    features: ['It existed', 'It got the job done', 'It is now retired'],
    stats: { platforms: 1, features: 3 },
    github: '',
    live: '',
  },
]
