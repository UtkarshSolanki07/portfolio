'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import type { Milestone } from '@/data/timeline'

interface TimelineLockerProps {
  milestone: Milestone
  index: number
}

const TimelineLocker = ({ milestone, index }: TimelineLockerProps) => {
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
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -2,
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 10px ${
          style.color === 'var(--cyan)'
            ? 'rgba(0,229,255,0.1)'
            : style.color === 'var(--gold)'
            ? 'rgba(212,175,55,0.1)'
            : style.color === 'var(--gold-light)'
            ? 'rgba(240,208,96,0.1)'
            : 'rgba(255,23,68,0.1)'
        }`,
      }}
      style={{
        background: 'rgba(18, 18, 26, 0.93)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderLeft: `3px solid ${style.color}`,
        borderRadius: '4px',
        padding: '10px 14px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Year badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '0.9rem' }}>{style.icon}</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: style.color,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
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
          fontSize: '0.85rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: 'var(--text-primary)',
          marginBottom: '4px',
        }}
      >
        {milestone.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.68rem',
          color: 'var(--text-dim)',
          lineHeight: 1.5,
        }}
      >
        {milestone.description}
      </div>
    </motion.div>
  )
}

export default memo(TimelineLocker)
