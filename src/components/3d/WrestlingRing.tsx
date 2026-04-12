
'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RING_SIZE = 5
const ROPE_HEIGHT = [0.8, 1.4, 2.0]

export default function WrestlingRing() {
  const ropeRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ropeRefs.current.forEach((rope, i) => {
      if (rope) {
        // Subtle rope vibration
        rope.position.y = ROPE_HEIGHT[i] + Math.sin(t * 2 + i * 1.5) * 0.005
      }
    })
  })

  const postPositions: [number, number, number][] = useMemo(
    () => [
      [-RING_SIZE, 0, -RING_SIZE],
      [RING_SIZE, 0, -RING_SIZE],
      [RING_SIZE, 0, RING_SIZE],
      [-RING_SIZE, 0, RING_SIZE],
    ],
    []
  )

  return (
    <group position={[0, 0, 0]}>
      {/* Ring floor / canvas */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[RING_SIZE * 2 + 0.5, 0.1, RING_SIZE * 2 + 0.5]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Ring apron (slightly larger base) */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[RING_SIZE * 2 + 1.5, 0.6, RING_SIZE * 2 + 1.5]} />
        <meshStandardMaterial
          color="#0d0d14"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Ring skirt */}
      {[
        { pos: [0, -0.3, RING_SIZE + 0.75] as [number, number, number], rot: [0, 0, 0] as [number, number, number], scale: [RING_SIZE * 2 + 1.5, 0.6, 0.02] as [number, number, number] },
        { pos: [0, -0.3, -(RING_SIZE + 0.75)] as [number, number, number], rot: [0, 0, 0] as [number, number, number], scale: [RING_SIZE * 2 + 1.5, 0.6, 0.02] as [number, number, number] },
        { pos: [RING_SIZE + 0.75, -0.3, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], scale: [RING_SIZE * 2 + 1.5, 0.6, 0.02] as [number, number, number] },
        { pos: [-(RING_SIZE + 0.75), -0.3, 0] as [number, number, number], rot: [0, Math.PI / 2, 0] as [number, number, number], scale: [RING_SIZE * 2 + 1.5, 0.6, 0.02] as [number, number, number] },
      ].map(({ pos, rot, scale }, i) => (
        <mesh key={`skirt-${i}`} position={pos} rotation={rot}>
          <boxGeometry args={scale} />
          <meshStandardMaterial color="#0a0a12" roughness={0.95} />
        </mesh>
      ))}

      {/* Corner posts */}
      {postPositions.map((pos, i) => (
        <group key={i}>
          <mesh position={[pos[0], 1.15, pos[2]]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 2.3, 8]} />
            <meshStandardMaterial
              color="#888888"
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
          {/* Turnbuckle pad */}
          <mesh position={[pos[0], 1.4, pos[2]]}>
            <boxGeometry args={[0.2, 0.6, 0.2]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#cc0000' : '#222222'}
              roughness={0.6}
            />
          </mesh>
          {/* Post cap */}
          <mesh position={[pos[0], 2.35, pos[2]]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color="#aaaaaa"
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Ropes */}
      {ROPE_HEIGHT.map((height, ropeIndex) => {
        const color = ropeIndex === 1 ? '#cc0000' : '#e0e0e0'
        return (
          <group key={ropeIndex}>
            {/* Four sides of ropes */}
            {[
              // Front
              {
                pos: [0, height, RING_SIZE] as [number, number, number],
                scale: [RING_SIZE * 2, 0.03, 0.03] as [number, number, number],
              },
              // Back
              {
                pos: [0, height, -RING_SIZE] as [number, number, number],
                scale: [RING_SIZE * 2, 0.03, 0.03] as [number, number, number],
              },
              // Left
              {
                pos: [-RING_SIZE, height, 0] as [number, number, number],
                scale: [0.03, 0.03, RING_SIZE * 2] as [number, number, number],
              },
              // Right
              {
                pos: [RING_SIZE, height, 0] as [number, number, number],
                scale: [0.03, 0.03, RING_SIZE * 2] as [number, number, number],
              },
            ].map(({ pos, scale }, sideIndex) => (
              <mesh
                key={`rope-${ropeIndex}-${sideIndex}`}
                position={pos}
                ref={(el) => {
                  if (ropeIndex === 0 && sideIndex === 0) {
                    ropeRefs.current[ropeIndex] = el
                  }
                }}
              >
                <boxGeometry args={scale} />
                <meshStandardMaterial
                  color={color}
                  roughness={0.5}
                  metalness={0.3}
                />
              </mesh>
            ))}
          </group>
        )
      })}

      {/* Center logo on ring floor */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial
          color="#d4af37"
          transparent
          opacity={0.08}
          roughness={0.9}
        />
      </mesh>
    </group>
  )
}
