'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Howl, Howler } from 'howler'
import { usePortfolioStore } from '@/lib/store'

interface AudioMap {
  [key: string]: Howl
}

export function useArenaAudio() {
  const { isMuted, isLoading } = usePortfolioStore()
  const sounds = useRef<AudioMap>({})
  const initRef = useRef(false)

  // Initialize sounds on mount
  useEffect(() => {
    if (initRef.current) return
    initRef.current = true

    console.log('[ArenaAudio] Initializing sounds...')
    
    sounds.current = {
      theme: new Howl({
        src: ['/audio/entrance-theme.mp3'],
        loop: true,
        volume: 0.5,
        onload: () => console.log('[ArenaAudio] Theme loaded'),
        onloaderror: (id, err) => console.error('[ArenaAudio] Theme load error:', err),
        onplayerror: (id, err) => {
          console.error('[ArenaAudio] Theme play error:', err)
          Howler.unload() // Try to recover
        }
      }),
      pyro: new Howl({
        src: ['/audio/pyro.mp3'], // We will add the actual file soon
        volume: 0.7,
      }),
      crowd: new Howl({
        src: ['/audio/crowd-ambience.mp3'],
        loop: true,
        volume: 0.2,
      }),
    }

    return () => {
      console.log('[ArenaAudio] Unloading sounds...')
      Object.values(sounds.current).forEach((s) => s.unload())
      initRef.current = false
    }
  }, [])

  // Sync mute state globally with Howler
  useEffect(() => {
    console.log(`[ArenaAudio] Mute state changed: ${isMuted}`)
    Howler.mute(isMuted)
  }, [isMuted])

  // Central theme management
  useEffect(() => {
    const theme = sounds.current['theme']
    if (!theme) return

    if (!isLoading && !isMuted) {
      if (!theme.playing()) {
        console.log('[ArenaAudio] Playing theme...')
        theme.play()
      }
    } else {
      if (theme.playing()) {
        console.log('[ArenaAudio] Stopping theme...')
        theme.stop()
      }
    }
  }, [isLoading, isMuted])

  const playSound = useCallback((key: string) => {
    const sound = sounds.current[key]
    if (sound && !sound.playing()) {
      sound.play()
    }
  }, [])

  const stopSound = useCallback((key: string) => {
    const sound = sounds.current[key]
    if (sound) {
      sound.stop()
    }
  }, [])

  return {
    playSound,
    stopSound,
  }
}
