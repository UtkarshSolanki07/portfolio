import type { Metadata } from "next";
import { Barlow_Condensed, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAIN EVENT | Utkarsh Solanki — Full Stack Engineer",
  description:
    "The wrestling-game-themed interactive portfolio of Utkarsh Solanki. A cinematic, game-UI-driven experience showcasing full stack engineering projects.",
  keywords: [
    "Utkarsh Solanki",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "React Native",
    "MERN Stack",
    "Wrestling Portfolio",
  ],
  authors: [{ name: "Utkarsh Solanki" }],
  openGraph: {
    title: "MAIN EVENT | Utkarsh Solanki",
    description: "Welcome to the Main Event. A wrestling-themed developer portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.variable} ${rajdhani.variable} ${shareTechMono.variable}`}
        style={{
          fontFamily: "var(--font-rajdhani, 'Rajdhani', sans-serif)",
        }}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
