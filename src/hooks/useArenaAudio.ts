'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Howl, Howler } from 'howler'
import { usePortfolioStore } from '@/lib/store'

interface AudioConfig {
  src: string[]
  loop?: boolean
  volume?: number
}

// Audio configs — Howl instances are created lazily on first play
const AUDIO_CONFIGS: Record<string, AudioConfig> = {
  theme: {
    src: ['/audio/entrance-theme.mp3'],
    loop: true,
    volume: 0.5,
  },
  bgm1: {
    src: ['/audio/bgm1.mp3'],
    loop: false,
    volume: 0.5,
  },
  bgm2: {
    src: ['/audio/bgm2.mp3'],
    loop: false,
    volume: 0.5,
  },
  pyro: {
    src: ['/audio/alex_jauk-echoing-explosion-196259.mp3'],
    volume: 0.7,
  },
  crowd: {
    src: ['/audio/crowd-ambience.mp3'],
    loop: true,
    volume: 0.2,
  },
}

export function useArenaAudio() {
  const isMuted = usePortfolioStore(s => s.isMuted)
  const isLoading = usePortfolioStore(s => s.isLoading)
  const hasSeenPromo = usePortfolioStore(s => s.hasSeenPromo)
  const sounds = useRef<Record<string, Howl>>({})
  const activeTrackRef = useRef<'theme' | 'bgm1' | 'bgm2' | null>(null)

  // Lazily get or create a Howl instance
  const getSound = useCallback((key: string): Howl | null => {
    if (sounds.current[key]) return sounds.current[key]

    const config = AUDIO_CONFIGS[key]
    if (!config) return null

    const howl = new Howl({
      ...config,
      onloaderror: (_id: number, err: unknown) =>
        console.warn(`[ArenaAudio] ${key} load error:`, err),
      onplayerror: (_id: number, err: unknown) => {
        console.warn(`[ArenaAudio] ${key} play error:`, err)
        // Attempt to recover by unlocking audio context
        Howler.unload()
      },
    })

    sounds.current[key] = howl
    return howl
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(sounds.current).forEach((s) => s.unload())
      sounds.current = {}
    }
  }, [])

  // Sync mute state globally with Howler
  useEffect(() => {
    Howler.mute(isMuted)
  }, [isMuted])

  // Central theme/BGM management
  useEffect(() => {
    if (isLoading) return // Do nothing while loading screen is active

    if (!hasSeenPromo) {
      // Intro promo is active -> play entrance theme
      const theme = getSound('theme')
      if (theme && !theme.playing()) {
        theme.play()
        activeTrackRef.current = 'theme'
      }
    } else {
      // Promo finished -> stop entrance theme, start alternating BGMs
      const theme = sounds.current['theme']
      if (theme?.playing()) {
        theme.stop()
      }

      const bgm1 = getSound('bgm1')
      const bgm2 = getSound('bgm2')
      if (!bgm1 || !bgm2) return

      // Clear previous 'end' listeners to avoid duplicates
      bgm1.off('end')
      bgm2.off('end')

      bgm1.on('end', () => {
        activeTrackRef.current = 'bgm2'
        bgm2.play()
      })

      bgm2.on('end', () => {
        activeTrackRef.current = 'bgm1'
        bgm1.play()
      })

      // Start the loop with bgm1 if we just transitioned from theme
      if (activeTrackRef.current === 'theme' || !activeTrackRef.current) {
        activeTrackRef.current = 'bgm1'
      }

      const activeSound = activeTrackRef.current === 'bgm1' ? bgm1 : bgm2
      if (!activeSound.playing()) {
        activeSound.play()
      }
    }
  }, [isLoading, hasSeenPromo, getSound])

  // Pause / Resume tracks when muting / unmuting, just in case browser autoplay policies complain on background tabs
  useEffect(() => {
    if (!activeTrackRef.current) return

    const sound = sounds.current[activeTrackRef.current]
    if (!sound) return

    if (!isMuted && !isLoading && !sound.playing()) {
      sound.play()
    } else if (isMuted && sound.playing()) {
      sound.pause()
    }
  }, [isMuted, isLoading])


  const playSound = useCallback((key: string) => {
    const sound = getSound(key)
    if (sound && !sound.playing()) {
      sound.play()
    }
  }, [getSound])

  const stopSound = useCallback((key: string) => {
    const sound = sounds.current[key]
    if (sound) {
      sound.stop()
    }
  }, [])

  const nextTrack = useCallback(() => {
    if (!hasSeenPromo) return // Don't skip entrance theme

    const currentKey = activeTrackRef.current
    if (currentKey === 'bgm1' || currentKey === 'bgm2') {
      const sound = sounds.current[currentKey]
      if (sound) sound.stop()

      const nextKey = currentKey === 'bgm1' ? 'bgm2' : 'bgm1'
      activeTrackRef.current = nextKey
      
      const nextSound = getSound(nextKey)
      if (nextSound && !nextSound.playing()) {
        nextSound.play()
      }
    }
  }, [hasSeenPromo, getSound])

  return {
    playSound,
    stopSound,
    nextTrack,
  }
}
