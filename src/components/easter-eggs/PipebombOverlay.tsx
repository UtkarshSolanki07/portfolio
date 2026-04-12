'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pipebombQuotes } from '@/data/pipebombQuotes'

export default function PipebombOverlay({
  isVisible,
  onClose,
}: {
  isVisible: boolean
  onClose: () => void
}) {
  const [quote] = useState(
    () => pipebombQuotes[Math.floor(Math.random() * pipebombQuotes.length)]
  )

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {/* Dark overlay with red tint */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10,0,0,0.95)',
            }}
          />

          {/* Scanline overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,0,0,0.03) 3px, rgba(255,0,0,0.03) 6px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Static noise overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.05,
              background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '600px',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            {/* Microphone icon */}
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              style={{ fontSize: '3rem', marginBottom: '20px' }}
            >
              🎤
            </motion.div>

            {/* PIPEBOMB header */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: 'var(--red-accent)',
                textShadow: '0 0 30px rgba(255,23,68,0.5)',
                marginBottom: '24px',
              }}
            >
              💣 PIPEBOMB
            </motion.div>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                fontStyle: 'italic',
              }}
            >
              &ldquo;{quote}&rdquo;
            </motion.p>

            {/* Dismiss hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: '32px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}
            >
              CLICK ANYWHERE TO DISMISS
            </motion.div>
          </motion.div>

          {/* Red border flash */}
          <motion.div
            animate={{
              boxShadow: [
                'inset 0 0 100px rgba(255,23,68,0.3)',
                'inset 0 0 50px rgba(255,23,68,0.1)',
                'inset 0 0 100px rgba(255,23,68,0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
