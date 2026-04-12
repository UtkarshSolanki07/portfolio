'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 150

// Seeded pseudo-random
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

interface PyroProps {
  active?: boolean
  position?: [number, number, number]
  color?: string
}

export default function Pyro({
  active = false,
  position = [0, 0, 0],
  color = '#d4af37',
}: PyroProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)

  // Store particle state in refs to avoid React render purity issues
  const velocities = useRef<Float32Array | null>(null)
  const lifetimes = useRef<Float32Array | null>(null)
  const initialized = useRef(false)

  // Create positions array once - this is the initial stable data for the attribute
  const initialPositions = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), [])

  useFrame((_, delta) => {
    if (!active || !geoRef.current) return

    // Lazy-init velocity + lifetime data on first frame
    if (!initialized.current) {
      const vels = new Float32Array(PARTICLE_COUNT * 3)
      const lifes = new Float32Array(PARTICLE_COUNT)
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = seededRandom(i * 5) * Math.PI * 2
        const speed = 2 + seededRandom(i * 5 + 1) * 6
        vels[i * 3] = Math.cos(angle) * speed * 0.4
        vels[i * 3 + 1] = speed + seededRandom(i * 5 + 2) * 3
        vels[i * 3 + 2] = Math.sin(angle) * speed * 0.4
        lifes[i] = seededRandom(i * 5 + 3)
      }
      velocities.current = vels
      lifetimes.current = lifes
      initialized.current = true
    }

    const positions = geoRef.current.attributes.position.array as Float32Array
    const vels = velocities.current!
    const lifes = lifetimes.current!

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifes[i] -= delta * 1.5

      if (lifes[i] <= 0) {
        positions[i * 3] = 0
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = 0
        lifes[i] = 0.5 + seededRandom(i + performance.now() * 0.001) * 0.5

        const angle = seededRandom(i * 7 + performance.now() * 0.0001) * Math.PI * 2
        const speed = 2 + seededRandom(i * 7 + 1 + performance.now() * 0.0001) * 6
        vels[i * 3] = Math.cos(angle) * speed * 0.4
        vels[i * 3 + 1] = speed + seededRandom(i * 7 + 2 + performance.now() * 0.0001) * 3
        vels[i * 3 + 2] = Math.sin(angle) * speed * 0.4
      }

      positions[i * 3] += vels[i * 3] * delta
      positions[i * 3 + 1] += vels[i * 3 + 1] * delta
      positions[i * 3 + 2] += vels[i * 3 + 2] * delta

      vels[i * 3 + 1] -= 9.8 * delta
      vels[i * 3] *= 0.99
      vels[i * 3 + 2] *= 0.99
    }

    geoRef.current.attributes.position.needsUpdate = true
  })

  if (!active) return null

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.15}
        transparent
        opacity={0.8}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
