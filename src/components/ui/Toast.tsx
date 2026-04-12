'use client'

import { useState, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ToastContent } from '@/data/toasts'

interface ToastInstance extends ToastContent {
  id: number
}

interface ToastContextValue {
  showToast: (toast: ToastContent) => void
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

let toastIdCounter = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastInstance[]>([])

  const showToast = useCallback((toast: ToastContent) => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev.slice(-2), { ...toast, id }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container */}
      <div
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9000,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          pointerEvents: 'none',
          maxWidth: '380px',
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const borderColor =
              toast.variant === 'gold'
                ? 'var(--gold)'
                : toast.variant === 'red'
                ? 'var(--red-accent)'
                : 'var(--cyan)'
            const bgTint =
              toast.variant === 'gold'
                ? 'rgba(212,175,55,0.08)'
                : toast.variant === 'red'
                ? 'rgba(255,23,68,0.08)'
                : 'rgba(0,229,255,0.08)'

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${borderColor}`,
                  borderLeft: `3px solid ${borderColor}`,
                  borderRadius: '2px',
                  padding: '12px 16px',
                  pointerEvents: 'auto',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Background tint */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: bgTint,
                    pointerEvents: 'none',
                  }}
                />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: borderColor,
                      marginBottom: '4px',
                    }}
                  >
                    {toast.headline}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {toast.body}
                  </div>
                </div>

                {/* Auto-dismiss progress bar */}
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '2px',
                    background: borderColor,
                    opacity: 0.5,
                  }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
