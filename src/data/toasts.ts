export interface ToastContent {
  headline: string
  body: string
  variant: 'gold' | 'red' | 'cyan'
}

export const toasts: ToastContent[] = [
  {
    headline: '🔥 BREAKING',
    body: 'Local developer deploys to production on a Friday. Bold strategy.',
    variant: 'red',
  },
  {
    headline: '🏆 CHAMPIONSHIP UPDATE',
    body: 'MERN Stack retains the World Heavyweight Championship of web frameworks.',
    variant: 'gold',
  },
  {
    headline: '⚡ TRADE ALERT',
    body: 'Utkarsh Solanki has been traded from Backend to Full-Stack division. What a blockbuster!',
    variant: 'cyan',
  },
  {
    headline: '🎤 PROMO OF THE YEAR',
    body: "\"I didn't come here to make friends. I came here to push clean code.\"",
    variant: 'gold',
  },
  {
    headline: '🔥 INJURY REPORT',
    body: 'node_modules folder has sustained a catastrophic 2GB expansion. Out indefinitely.',
    variant: 'red',
  },
  {
    headline: '⚡ DRAFT PICK',
    body: 'TypeScript selected #1 overall in the 2024 Language Draft. JavaScript in shambles.',
    variant: 'cyan',
  },
  {
    headline: '🏆 HALL OF FAME',
    body: 'console.log() inducted into the Debug Hall of Fame. Class of 2024.',
    variant: 'gold',
  },
  {
    headline: '🔥 CONTROVERSY',
    body: 'Developer caught using !important in production CSS. Suspension pending.',
    variant: 'red',
  },
]
