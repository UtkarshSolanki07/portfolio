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
        width: '320px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Header with photo + name */}
      <div style={{ display: 'flex', gap: '12px', padding: '16px 16px 12px' }}>
        {/* Photo slot — hex frame placeholder */}
        <div
          style={{
            width: '80px',
            height: '90px',
            background: 'linear-gradient(135deg, var(--bg-darker), var(--bg-card-hover))',
            border: '1px solid var(--border-gold)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Try to load character photo, fallback to hex placeholder */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/utkarsh-action.png"
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
              fontSize: '0.5rem',
              color: 'var(--text-dim)',
              textAlign: 'center',
              lineHeight: 1.2,
            }}
          >
            PHOTO
            <br />
            SLOT
          </span>
        </div>

        {/* Name + Overall */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
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
              fontSize: '0.75rem',
              fontWeight: 400,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--text-secondary)',
              marginTop: '2px',
            }}
          >
            SOLANKI
          </div>
          <div
            style={{
              marginTop: '8px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
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
                fontSize: '0.55rem',
                color: 'var(--text-dim)',
                textTransform: 'uppercase',
              }}
            >
              OVERALL
            </span>
          </div>
        </div>
      </div>

      {/* EQ Bars — visual flair */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          padding: '0 16px',
          height: '24px',
          alignItems: 'flex-end',
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: i < 7 ? 'var(--gold)' : i < 14 ? 'var(--cyan)' : 'var(--red-accent)',
              borderRadius: '1px 1px 0 0',
              opacity: 0.7,
              animation: `eq-bar ${0.8 + i * 0.05}s ease-in-out infinite`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '8px 16px' }} />

      {/* Stat Bars */}
      <div style={{ padding: '4px 16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {statEntries.map(({ key, label, color }) => {
          const value = superstarStats[key as keyof typeof superstarStats]
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--text-dim)',
                  width: '28px',
                  textAlign: 'right',
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: '6px',
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
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                      backgroundSize: '200% 100%',
                      animation: 'shimmer 2s infinite linear',
                    }}
                  />
                </motion.div>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color,
                  width: '20px',
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
          padding: '8px 16px 12px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
        }}
      >
        {skills.map((skill) => (
          <span
            key={skill.name}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              padding: '2px 8px',
              borderRadius: '1px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              border: `1px solid ${
                skill.category === 'gold'
                  ? 'var(--border-gold)'
                  : skill.category === 'cyan'
                  ? 'var(--border-cyan)'
                  : 'rgba(255,23,68,0.3)'
              }`,
              color:
                skill.category === 'gold'
                  ? 'var(--gold)'
                  : skill.category === 'cyan'
                  ? 'var(--cyan)'
                  : 'var(--red-accent)',
              background:
                skill.category === 'gold'
                  ? 'rgba(212,175,55,0.08)'
                  : skill.category === 'cyan'
                  ? 'rgba(0,229,255,0.08)'
                  : 'rgba(255,23,68,0.08)',
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>

      {/* Attitude Meter — bottom bar */}
      <div
        style={{
          height: '4px',
          background: 'rgba(255,255,255,0.04)',
          position: 'relative',
          overflow: 'hidden',
        }}
        title={`Attitude Meter: ${Math.floor(attitudePercent)}%`}
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
