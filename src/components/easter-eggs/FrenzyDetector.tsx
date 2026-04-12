'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FRENZY_TEXTS = [
  'CONTROLLED FRENZY!!',
  'SAMI ZAYN IS LOSING IT!!',
  'SHADES OF CRAZY!!',
  'SOMEBODY STOP THE DAMN MOUSE!!',
  "BAH GAWD HE HAS A FAMILY!!",
]

const SPEED_THRESHOLD = 65

export default function FrenzyDetector() {
  const [frenzyText, setFrenzyText] = useState<string | null>(null)
  const lastPos = useRef({ x: 0, y: 0 })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    const speed = Math.sqrt(dx * dx + dy * dy)

    lastPos.current = { x: e.clientX, y: e.clientY }

    if (speed > SPEED_THRESHOLD) {
      const text = FRENZY_TEXTS[Math.floor(Math.random() * FRENZY_TEXTS.length)]
      setFrenzyText(text)

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        setFrenzyText(null)
      }, 800)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [handleMouseMove])

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 8500,
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {frenzyText && (
          <motion.div
            key={frenzyText}
            initial={{ opacity: 0, scale: 2, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--red-accent)',
              textShadow:
                '0 0 20px rgba(255,23,68,0.6), 0 0 60px rgba(255,23,68,0.3)',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            {frenzyText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
