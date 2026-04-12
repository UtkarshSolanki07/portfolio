'use client'

import { motion } from 'framer-motion'
import type { Milestone } from '@/data/timeline'

interface TimelineLockerProps {
  milestone: Milestone
  index: number
}

export default function TimelineLocker({ milestone, index }: TimelineLockerProps) {
  const typeStyles = {
    education: { color: 'var(--cyan)', icon: '📚' },
    work: { color: 'var(--gold)', icon: '💼' },
    project: { color: 'var(--red-accent)', icon: '🚀' },
    achievement: { color: 'var(--gold-light)', icon: '⭐' },
  }

  const style = typeStyles[milestone.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 15px ${
          style.color === 'var(--cyan)'
            ? 'rgba(0,229,255,0.15)'
            : style.color === 'var(--gold)'
            ? 'rgba(212,175,55,0.15)'
            : style.color === 'var(--gold-light)'
            ? 'rgba(240,208,96,0.15)'
            : 'rgba(255,23,68,0.15)'
        }`,
      }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `3px solid ${style.color}`,
        borderRadius: '2px',
        padding: '16px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Year badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.1rem' }}>{style.icon}</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: style.color,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 600,
          }}
        >
          {milestone.year}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-primary)',
          marginBottom: '6px',
        }}
      >
        {milestone.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        {milestone.description}
      </div>
    </motion.div>
  )
}
