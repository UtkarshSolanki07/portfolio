'use client'

import { useEffect, useRef } from 'react'

/**
 * IntroPromo — wraps the HyperFrames HTML composition in a zero-overhead iframe.
 * The composition is pure CSS + GSAP (no Three.js / Framer Motion).
 * It auto-plays on load and fires a postMessage("PROMO_COMPLETE") when done.
 * PortfolioRoot dismisses it via onComplete().
 */
export default function IntroPromo({ onComplete }: { onComplete: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'PROMO_COMPLETE') {
        onComplete()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onComplete])

  // Fallback: if 14s pass and promo hasn't fired (e.g. slow load), dismiss anyway
  useEffect(() => {
    const fallback = setTimeout(onComplete, 14_000)
    return () => clearTimeout(fallback)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Scale the 1920×1080 composition to fit any viewport */}
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <iframe
          ref={iframeRef}
          src="/intro-promo/index.html"
          title="Intro Promo"
          scrolling="no"
          style={{
            border: 'none',
            width: '1920px',
            height: '1080px',
            transformOrigin: 'center center',
            // Scale the fixed 1920×1080 frame to fill the viewport proportionally
            transform: 'scale(var(--promo-scale, 1))',
            pointerEvents: 'none', // promo is non-interactive
          }}
        />
      </div>

      {/* Skip button — sits above the iframe */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          background: 'transparent',
          border: 'none',
          color: 'rgba(240,237,224,0.35)',
          fontFamily: 'var(--font-mono, "Courier New", monospace)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          zIndex: 10001,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,237,224,0.35)')}
      >
        Skip Promo [✕]
      </button>

      {/* Inline style to compute the scale based on viewport */}
      <style>{`
        :root {
          --promo-scale: min(
            calc(100vw / 1920),
            calc(100vh / 1080)
          );
        }
      `}</style>
    </div>
  )
}
