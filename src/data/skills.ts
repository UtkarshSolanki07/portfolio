export interface Skill {
  name: string
  stat: number
  tier: 'world' | 'intercontinental' | 'contender'
  category: 'gold' | 'cyan' | 'red'
}

export const skills: Skill[] = [
  { name: 'MERN Stack', stat: 92, tier: 'world', category: 'gold' },
  { name: 'React Native', stat: 88, tier: 'world', category: 'gold' },
  { name: 'AI Tooling', stat: 75, tier: 'intercontinental', category: 'cyan' },
  {
    name: 'Three.js / WebGL',
    stat: 68,
    tier: 'intercontinental',
    category: 'cyan',
  },
  { name: 'TypeScript', stat: 82, tier: 'contender', category: 'red' },
  { name: 'System Design', stat: 78, tier: 'contender', category: 'red' },
]

export const superstarStats = {
  overall: 85,
  frontend: 92,
  backend: 85,
  mobile: 88,
  ai: 75,
  design: 80,
  webgl: 68,
}
