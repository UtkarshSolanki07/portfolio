'use client'

import { useEffect } from 'react'

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false

  const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  return query?.matches ?? false
}

export function useReducedMotionEffect(callback: (reduced: boolean) => void) {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    callback(query.matches)

    const handler = (e: MediaQueryListEvent) => callback(e.matches)
    query.addEventListener('change', handler)
    return () => query.removeEventListener('change', handler)
  }, [callback])
}
