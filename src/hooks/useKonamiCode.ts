'use client'

import { useState, useEffect, useCallback } from 'react'

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
]

export function useKonamiCode(onActivate: () => void): boolean {
  const [activated, setActivated] = useState(false)
  const [position, setPosition] = useState(0)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activated) return

      const key = e.code
      if (key === KONAMI_SEQUENCE[position]) {
        const next = position + 1
        if (next === KONAMI_SEQUENCE.length) {
          setActivated(true)
          onActivate()
        } else {
          setPosition(next)
        }
      } else {
        setPosition(key === KONAMI_SEQUENCE[0] ? 1 : 0)
      }
    },
    [position, activated, onActivate]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return activated
}
