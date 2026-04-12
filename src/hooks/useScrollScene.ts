'use client'

import { useState, useCallback } from 'react'

export function useScrollScene(totalScenes: number) {
  const [activeScene, setActiveScene] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(
    (scrollProgress: number) => {
      const sceneIndex = Math.min(
        Math.floor(scrollProgress * totalScenes),
        totalScenes - 1
      )
      const sceneProgress =
        (scrollProgress * totalScenes - sceneIndex) % 1

      setActiveScene(sceneIndex)
      setProgress(sceneProgress)
    },
    [totalScenes]
  )

  return { activeScene, progress, handleScroll }
}
