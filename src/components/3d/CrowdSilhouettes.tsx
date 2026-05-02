'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Crowd configuration
const TIERS = [
  { radius: 14, count: 60, yBase: 0.5,  rowHeight: 0,   color: '#9a8899' },   // Floor level
  { radius: 18, count: 80, yBase: 2.5,  rowHeight: 1.5, color: '#7a6878' },   // Lower bowl
  { radius: 23, count: 100, yBase: 5.0, rowHeight: 3.0, color: '#5a4858' },   // Upper bowl
]

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

// Generate crowd positions in rings AROUND the wrestling ring
function generateTierPositions() {
  const allPositions: { x: number; y: number; z: number; scale: number; phase: number; color: string }[] = []

  TIERS.forEach((tier, tierIndex) => {
    for (let i = 0; i < tier.count; i++) {
      const seed = tierIndex * 1000 + i
      
      // Calculate normalized angle (0 to 1)
      const t = i / tier.count
      
      // We want to avoid the "North" area (Entrance/Titantron). 
      // In Three.js, with the entrance at z = -12 and titantron at z = -30:
      // - North is -Z (around angle -PI/2 or 3PI/2)
      // - South is +Z (around angle PI/2)
      // - West is -X (around angle PI)
      // - East is +X (around angle 0)
      
      // Arc strategy: 
      // Map 0-1 to a restricted arc that covers West, South, and East.
      // PI/2 is South. Let's cover from -0.1*PI (Eastish) through PI/2 (South) to 1.1*PI (Westish).
      // This leaves a gap from 1.1*PI to 1.9*PI (North/Entrance).
      
      const startAngle = -0.15 * Math.PI
      const endAngle = 1.15 * Math.PI
      const angle = startAngle + t * (endAngle - startAngle) + seededRandom(seed) * 0.05
      
      const radiusJitter = tier.radius + (seededRandom(seed + 1) - 0.5) * 3
      const x = Math.cos(angle) * radiusJitter
      const z = Math.sin(angle) * radiusJitter
      
      const y = tier.yBase + seededRandom(seed + 2) * tier.rowHeight
      const scale = 0.7 + seededRandom(seed + 3) * 0.4
      const phase = seededRandom(seed + 4) * Math.PI * 2

      allPositions.push({ x, y, z, scale, phase, color: tier.color })
    }
  })

  return allPositions
}

const POSITIONS = generateTierPositions()
const TOTAL_COUNT = POSITIONS.length

export default function CrowdSilhouettes() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useRef(new THREE.Object3D())

  useEffect(() => {
    if (!meshRef.current) return
    POSITIONS.forEach((p, i) => {
      dummy.current.position.set(p.x, p.y, p.z)
      dummy.current.scale.set(p.scale * 0.35, p.scale, p.scale * 0.2)
      dummy.current.rotation.set(0, -Math.atan2(p.x, p.z), 0) // Face the ring
      dummy.current.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.current.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [])

  // Animate crowd bobbing — simplified update
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    // We can optimize this by only updating every other frame or using a simpler wave
    POSITIONS.forEach((p, i) => {
      const wave = Math.sin(t * 1.5 + p.phase) * 0.1
      dummy.current.position.set(p.x, p.y + wave, p.z)
      dummy.current.scale.set(p.scale * 0.35, p.scale + wave * 0.1, p.scale * 0.2)
      dummy.current.rotation.set(0, -Math.atan2(p.x, p.z), 0)
      dummy.current.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.current.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      {/* Main instanced crowd silhouettes */}
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, TOTAL_COUNT]}
        frustumCulled={false}
        castShadow={false}
        receiveShadow={false}
      >
        {/* Slightly stylised box shape - more visible than capsule on dark bg */}
        <boxGeometry args={[1, 1, 0.5]} />
        <meshStandardMaterial
          color="#7a6878"
          roughness={0.9}
          metalness={0}
          emissive="#3a2a38"
          emissiveIntensity={0.4}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      {/* Crowd cheering flash lights — reduced count for performance */}
      {Array.from({ length: 12 }).map((_, i) => {
        const t = i / 11
        const startAngle = -0.15 * Math.PI
        const endAngle = 1.15 * Math.PI
        const angle = startAngle + t * (endAngle - startAngle)
        const r = 13 + Math.sin(i * 7.3) * 4
        return (
          <pointLight
            key={`crowd-light-${i}`}
            position={[Math.cos(angle) * r, 2.5, Math.sin(angle) * r]}
            intensity={2}
            distance={15}
            decay={2}
            color={i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#ff1744' : '#00e5ff'}
          />
        )
      })}
    </>
  )
}
