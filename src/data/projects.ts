export interface Project {
  slug: string
  title: string
  tier: 'main-event' | 'featured' | 'undercard' | 'dark-match'
  matchLabel: string
  opponent: string
  description: string
  longDescription: string
  screenshots: string[]
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
    longDescription:
      'A complete digital transformation of the exhibition management workflow. This full-stack platform replaces paper-based badge systems, manual visitor tracking, and scattered exhibitor communications with a unified real-time solution.\n\nThe system spans three platforms — a Visitor mobile app with QR-based check-in and interactive floor maps, an Exhibitor dashboard with real-time foot traffic analytics and lead capture, and an Admin panel for event orchestration. Built with React Native for cross-platform mobile delivery, backed by a Node.js/Express API layer and MongoDB for flexible document storage.\n\nKey engineering challenges included real-time WebSocket sync across 500+ concurrent visitors, offline-first QR scanning with background sync, and a role-based permission system spanning three distinct user types.',
    screenshots: [
      '/images/projects/smart-exhibition/1.png',
      '/images/projects/smart-exhibition/2.png',
      '/images/projects/smart-exhibition/3.png',
    ],
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
    longDescription:
      'An AI-powered productivity toolkit designed to chain multiple LLM operations into repeatable workflows. The platform supports prompt chaining, document analysis with extraction pipelines, and automated code review with configurable rulesets.\n\nBuilt on Next.js with a Python/FastAPI backend for heavy AI processing. The architecture separates the orchestration layer (prompt chains, scheduling) from the execution layer (model calls, embeddings, vector search), allowing hot-swapping between OpenAI, Anthropic, and local models without workflow changes.\n\nThe code review module parses diffs, applies semantic analysis, and produces structured feedback with severity ratings — reducing review turnaround by roughly 60% in internal testing.',
    screenshots: [
      '/images/projects/ai-tools-platform/1.png',
      '/images/projects/ai-tools-platform/2.png',
    ],
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
    longDescription:
      'An internal analytics and project management dashboard built during my internship at EzyBuilds. The platform consolidates scattered project data into a single command center with real-time KPI tracking, team workload visualization, and automated report generation.\n\nThe dashboard features interactive Chart.js visualizations for sprint velocity, resource allocation, and project health metrics. A custom drag-and-drop Kanban board handles task lifecycle management with status-based filtering and deadline alerts.\n\nBuilt with React and TailwindCSS for rapid iteration, connected to internal REST APIs. The reporting module generates PDF exports with configurable date ranges and metric selections, used weekly by the management team for stakeholder updates.',
    screenshots: [
      '/images/projects/ezybuilds-dashboard/1.png',
      '/images/projects/ezybuilds-dashboard/2.png',
    ],
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
    longDescription:
      'The original portfolio website — a humble beginning built with raw HTML, CSS, and GSAP animations. It was simple. It was honest. It got the job done.\n\nLooking back, it represented the early days of learning web development — hand-writing every animation, fighting CSS specificity wars, and discovering that "it works on my machine" is not a deployment strategy.\n\nIt has since been retired with full honors, replaced by the wrestling-themed arena experience you\'re currently standing in. Rest in peace, Portfolio v1. You will be remembered. Mostly with cringe.',
    screenshots: [
      '/images/projects/portfolio-v1/1.png',
    ],
    stack: ['HTML', 'CSS', 'GSAP', 'Many Regrets'],
    features: ['It existed', 'It got the job done', 'It is now retired'],
    stats: { platforms: 1, features: 3 },
    github: '',
    live: '',
  },
]
