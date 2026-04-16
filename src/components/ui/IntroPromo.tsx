'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioStore } from '@/lib/store'
import { AvatarSlamSVG } from '@/components/ui/WrestlingIcons'
import { useArenaAudio } from '@/hooks/useArenaAudio'

type Shot = {
  id: number
  duration: number
  type: 'text' | 'image' | 'flash' | 'branding'
  content?: string
  subContent?: string
  color?: string
}

const SHOTS: Shot[] = [
  { id: 0, duration: 800, type: 'flash' },
  { id: 1, duration: 1200, type: 'branding', content: 'UTKARSH SOLANKI', subContent: 'THE MAIN EVENT' },
  { id: 2, duration: 1500, type: 'text', content: 'FULL STACK ENGINEER', subContent: '>> SYSTEM INITIALIZED', color: 'var(--gold)' },
  { id: 3, duration: 1000, type: 'text', content: '99 OVR ATTITUDE', subContent: 'UNBEATABLE. UNSTOPPABLE.', color: 'var(--red-accent)' },
  { id: 4, duration: 1200, type: 'image', content: 'BUILT TO LAST', subContent: 'NEXT.JS | THREE.JS | REACT NATIVE' },
  { id: 5, duration: 1000, type: 'text', content: 'ENTER THE ARENA', color: 'var(--cyan)' },
  { id: 6, duration: 500, type: 'flash' },
]

export default function IntroPromo({ onComplete }: { onComplete: () => void }) {
  const [currentShot, setCurrentShot] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const { isMuted } = usePortfolioStore()
  const { playSound } = useArenaAudio()

  useEffect(() => {
    // Play sound on specific shots for impact
    if (currentShot === 0 || currentShot === 1) {
      playSound('pyro')
    }
  }, [currentShot, playSound])
  const nextShot = useCallback(() => {
    if (currentShot < SHOTS.length - 1) {
      setCurrentShot(prev => prev + 1)
    } else {
      setIsFinished(true)
      setTimeout(onComplete, 800)
    }
  }, [currentShot, onComplete])

  useEffect(() => {
    const timer = setTimeout(nextShot, SHOTS[currentShot].duration)
    return () => clearTimeout(timer)
  }, [currentShot, nextShot])

  const shot = SHOTS[currentShot]

  return (
    <AnimatePresence mode="wait">
      {!isFinished && (
        <motion.div
          className="promo-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'var(--bg-darker)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Global Scanlines */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.2) 1px, rgba(0,0,0,0.2) 2px)',
            pointerEvents: 'none',
            zIndex: 10,
          }} />

          {/* Shot Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentShot}
              initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                padding: '2rem',
              }}
            >
              {shot.type === 'flash' && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: 'absolute', inset: 0, background: 'white', zIndex: 100 }}
                />
              )}

              {shot.type === 'branding' && (
                <div style={{ position: 'relative' }}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ marginBottom: '24px' }}
                  >
                    <AvatarSlamSVG style={{ 
                      width: '80px', 
                      height: '80px',
                      filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.6))',
                      animation: 'pulse-glow 1s infinite alternate'
                    }} glowColor="var(--gold)" />
                  </motion.div>
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 10vw, 8rem)',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    lineHeight: 1,
                    animation: 'glitch 0.5s infinite linear',
                    textShadow: '2px 0 var(--red-accent), -2px 0 var(--cyan)'
                  }}>
                    {shot.content}
                  </h1>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.4em',
                    marginTop: '12px'
                  }}>
                    {shot.subContent}
                  </p>
                </div>
              )}

              {shot.type === 'text' && (
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                    color: shot.color || 'var(--text-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 800,
                  }}>
                    {shot.content}
                  </h2>
                  {shot.subContent && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        color: 'var(--text-dim)',
                        letterSpacing: '0.3em',
                        marginTop: '16px'
                      }}
                    >
                      {shot.subContent}
                    </motion.p>
                  )}
                </div>
              )}

              {shot.type === 'image' && (
                <div style={{ position: 'relative' }}>
                   {/* Background Glitch Text */}
                   <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '15rem',
                    fontFamily: 'var(--font-display)',
                    opacity: 0.05,
                    color: 'var(--gold)',
                    whiteSpace: 'nowrap',
                    zIndex: -1,
                  }}>
                    CODE CORE CODE CORE
                  </div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 10vw, 7rem)',
                    color: 'var(--text-primary)',
                    textTransform: 'uppercase',
                  }}>
                    {shot.content}
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--gold)',
                    letterSpacing: '0.2em',
                    marginTop: '20px'
                  }}>
                    {shot.subContent}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            whileHover={{ opacity: 1, color: 'var(--gold)' }}
            onClick={() => {
              setIsFinished(true)
              onComplete()
            }}
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              cursor: 'pointer',
              zIndex: 100,
            }}
          >
            SKIP PROMO [✕]
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
