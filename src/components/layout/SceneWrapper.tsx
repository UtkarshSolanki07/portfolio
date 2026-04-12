'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

interface SceneWrapperProps {
  children: React.ReactNode
}

export default function SceneWrapper({ children }: SceneWrapperProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 8, 25],
        }}
        style={{ pointerEvents: 'auto', background: '#0a0a0f' }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
