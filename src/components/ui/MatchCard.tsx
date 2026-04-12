'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface MatchCardProps {
  project: Project
  index: number
  onClick?: () => void
}

export default function MatchCard({ project, index, onClick }: MatchCardProps) {
  const tierColors = {
    'main-event': { border: 'var(--gold)', bg: 'rgba(212,175,55,0.06)', glow: 'rgba(212,175,55,0.2)' },
    featured: { border: 'var(--cyan)', bg: 'rgba(0,229,255,0.06)', glow: 'rgba(0,229,255,0.2)' },
    undercard: { border: 'var(--red-accent)', bg: 'rgba(255,23,68,0.06)', glow: 'rgba(255,23,68,0.2)' },
    'dark-match': { border: 'var(--text-dim)', bg: 'rgba(80,80,96,0.06)', glow: 'rgba(80,80,96,0.2)' },
  }

  const colors = tierColors[project.tier]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 30px ${colors.glow}, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${colors.border}`,
        borderRadius: '2px',
        padding: '0',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
      }}
    >
      {/* Background tint */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: colors.bg,
          pointerEvents: 'none',
        }}
      />

      {/* Top bar - match label */}
      <div
        style={{
          padding: '8px 16px',
          borderBottom: `1px solid ${colors.border}`,
          background: `linear-gradient(90deg, ${colors.bg}, transparent)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: colors.border,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          {project.matchLabel}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
          }}
        >
          {project.stack.length} TECH
        </span>
      </div>

      {/* VS Card Body */}
      <div
        style={{
          padding: '20px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left side - "UTKARSH" */}
        <div style={{ flex: 1, textAlign: 'right' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-primary)',
            }}
          >
            UTKARSH
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--text-dim)',
              marginTop: '2px',
            }}
          >
            FULL STACK DEV
          </div>
        </div>

        {/* VS divider */}
        <div
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: colors.border,
              transform: 'rotate(45deg)',
              position: 'absolute',
              opacity: 0.15,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 700,
              color: colors.border,
              position: 'relative',
              zIndex: 1,
            }}
          >
            VS
          </span>
        </div>

        {/* Right side - Project name */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: colors.border,
            }}
          >
            {project.opponent}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--text-dim)',
              marginTop: '2px',
            }}
          >
            {project.stats.features} FEATURES
          </div>
        </div>
      </div>

      {/* Stack badges */}
      <div
        style={{
          padding: '0 16px 12px',
          display: 'flex',
          gap: '4px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.stack.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              padding: '2px 6px',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1px',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Description - subtle */}
      <div
        style={{
          padding: '0 16px 16px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          lineHeight: 1.5,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.description}
      </div>

      {/* Bottom accent line with shimmer */}
      <div
        style={{
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite linear',
          }}
        />
      </div>
    </motion.div>
  )
}
