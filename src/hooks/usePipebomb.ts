'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const TARGET = 'pipebomb'

export function usePipebomb(onActivate: () => void): boolean {
  const [activated, setActivated] = useState(false)
  const bufferRef = useRef('')

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (activated) return
      if (e.key.length !== 1) return

      bufferRef.current += e.key.toLowerCase()

      // Keep only the last N characters (length of target)
      if (bufferRef.current.length > TARGET.length) {
        bufferRef.current = bufferRef.current.slice(-TARGET.length)
      }

      if (bufferRef.current === TARGET) {
        setActivated(true)
        onActivate()
        bufferRef.current = ''
      }
    },
    [activated, onActivate]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return activated
}
