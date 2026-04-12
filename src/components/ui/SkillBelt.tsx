'use client'

import { motion } from 'framer-motion'
import type { Skill } from '@/data/skills'

import { ChampionshipBeltSVG } from '@/components/ui/WrestlingIcons'

interface SkillBeltProps {
  skill: Skill
  index: number
}

export default function SkillBelt({ skill, index }: SkillBeltProps) {
  const tierLabels = {
    world: '🏆 WORLD CHAMPION',
    intercontinental: '🥈 INTERCONTINENTAL',
    contender: '🥊 #1 CONTENDER',
  }

  const categoryColors = {
    gold: { border: 'var(--gold)', bg: 'rgba(212,175,55,0.08)', text: 'var(--gold)' },
    cyan: { border: 'var(--cyan)', bg: 'rgba(0,229,255,0.08)', text: 'var(--cyan)' },
    red: { border: 'var(--red-accent)', bg: 'rgba(255,23,68,0.08)', text: 'var(--red-accent)' },
  }

  const colors = categoryColors[skill.category]

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: `0 0 20px ${colors.bg}`,
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '14px 18px',
        background: 'var(--bg-card)',
        border: `1px solid ${colors.border}`,
        borderRadius: '2px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Background shine sweep */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
          pointerEvents: 'none',
          width: '50%',
        }}
      />

      {/* Belt SVG Asset */}
      <div style={{ flexShrink: 0, zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ChampionshipBeltSVG style={{ width: '60px', height: '30px' }} glowColor={colors.border} />
      </div>

      {/* Stat value */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1,
          flexShrink: 0,
          width: '45px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {skill.stat}
      </div>

      {/* Info */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.95rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--text-primary)',
          }}
        >
          {skill.name}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginTop: '2px',
            opacity: 0.8,
          }}
        >
          {tierLabels[skill.tier]}
        </div>
      </div>

      {/* Stat bar background */}
      <div
        style={{
          width: '80px',
          height: '4px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '2px',
          overflow: 'hidden',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.stat}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
          style={{
            height: '100%',
            background: colors.text,
            borderRadius: '2px',
          }}
        />
      </div>
    </motion.div>
  )
}
