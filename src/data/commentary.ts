export interface CommentaryQuip {
  text: string
  commentator: 'JR' | 'Tony' | 'Cole' | 'Graves'
}

export const commentaryQuips: CommentaryQuip[] = [
  { text: 'BAH GAWD! THAT CODE HAS A FAMILY!', commentator: 'JR' },
  { text: "HE'S BROKEN THE BUILD IN HALF!", commentator: 'JR' },
  {
    text: "BUSINESS IS ABOUT TO PICK UP! He's navigating to projects!",
    commentator: 'JR',
  },
  {
    text: "AS GOD AS MY WITNESS, THAT DEPLOYMENT IS BROKEN IN HALF!",
    commentator: 'JR',
  },
  { text: "SOMEBODY STOP THE DAMN BUILD!", commentator: 'JR' },
  {
    text: "What a maneuver by the full-stack athlete!",
    commentator: 'Tony',
  },
  {
    text: "This young man has an incredibly bright future in this industry!",
    commentator: 'Tony',
  },
  {
    text: "He's pulling out the big moves now — MERN Stack Suplex!",
    commentator: 'Cole',
  },
  {
    text: "COULD IT BE?! IT IS!! A perfectly deployed application!",
    commentator: 'Cole',
  },
  {
    text: "The Big Dog of Full Stack Development is here!",
    commentator: 'Cole',
  },
  {
    text: "Ladies and gentlemen, this is what a 92 OVR frontend looks like.",
    commentator: 'Graves',
  },
  {
    text: "Vintage Utkarsh! He hit them with the React Native Driver!",
    commentator: 'Graves',
  },
]
