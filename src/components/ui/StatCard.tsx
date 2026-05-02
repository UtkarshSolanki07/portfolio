'use client'

import { motion } from 'framer-motion'
import { superstarStats } from '@/data/skills'
import { skills } from '@/data/skills'
import { usePortfolioStore } from '@/lib/store'

const statEntries = [
  { key: 'overall', label: 'OVR', color: 'var(--gold)' },
  { key: 'frontend', label: 'FE', color: 'var(--cyan)' },
  { key: 'backend', label: 'BE', color: 'var(--cyan)' },
  { key: 'mobile', label: 'MOB', color: 'var(--gold)' },
  { key: 'ai', label: 'AI', color: 'var(--red-accent)' },
  { key: 'design', label: 'DSN', color: 'var(--text-secondary)' },
  { key: 'webgl', label: 'GL', color: 'var(--red-accent)' },
] as const

export default function StatCard() {
  const { attitudeCount } = usePortfolioStore()
  const attitudePercent = Math.min((attitudeCount / 100) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '240px',
        background: 'rgba(10, 10, 15, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'var(--font-body)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Header with photo + name */}
      <div style={{ display: 'flex', gap: '10px', padding: '10px 10px 8px' }}>
        {/* Photo slot — hex frame placeholder */}
        <div
          style={{
            width: '50px',
            height: '60px',
            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8), rgba(20, 20, 25, 0.8))',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/utkarsh-action.png"
            alt="Utkarsh Solanki"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
            }}
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.45rem',
              color: 'var(--text-dim)',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            SLOT
          </span>
        </div>

        {/* Name + Overall */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              lineHeight: 1,
              color: 'var(--text-primary)',
            }}
          >
            UTKARSH
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
              marginTop: '1px',
            }}
          >
            SOLANKI
          </div>
          <div
            style={{
              marginTop: '4px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--gold)',
                lineHeight: 1,
              }}
            >
              {superstarStats.overall}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
              }}
            >
              OVR
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '0 10px' }} />

      {/* Stat Bars */}
      <div style={{ padding: '6px 10px 8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        {statEntries.map(({ key, label, color }) => {
          const value = superstarStats[key as keyof typeof superstarStats]
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'var(--text-dim)',
                  width: '24px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '4px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '1px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: '100%',
                    background: color,
                    borderRadius: '1px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite linear',
                    }}
                  />
                </motion.div>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color,
                  width: '18px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {value}
              </span>
            </div>
          )
        })}
      </div>

      {/* Skill Badges */}
      <div
        style={{
          padding: '4px 10px 8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3px',
        }}
      >
        {skills.map((skill) => (
          <span
            key={skill.name}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              padding: '1px 6px',
              borderRadius: '1px',
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              border: `1px solid ${
                skill.category === 'gold'
                  ? 'rgba(212,175,55,0.3)'
                  : skill.category === 'cyan'
                  ? 'rgba(0,229,255,0.3)'
                  : 'rgba(255,23,68,0.2)'
              }`,
              color:
                skill.category === 'gold'
                  ? 'var(--gold)'
                  : skill.category === 'cyan'
                  ? 'var(--cyan)'
                  : 'var(--red-accent)',
              background: 'rgba(255, 255, 255, 0.03)',
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* Attitude Meter — bottom bar */}
      <div
        style={{
          height: '3px',
          background: 'rgba(255,255,255,0.04)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: attitudePercent >= 100
              ? 'linear-gradient(90deg, var(--red-accent), var(--gold), var(--red-accent))'
              : 'linear-gradient(90deg, var(--red-dim), var(--red-accent))',
            backgroundSize: attitudePercent >= 100 ? '200% 100%' : '100% 100%',
            animation: attitudePercent >= 100 ? 'shimmer 1s infinite linear' : 'none',
          }}
          animate={{ width: `${attitudePercent}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </motion.div>
  )
}
