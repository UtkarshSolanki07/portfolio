'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SpotlightRig() {
  const roamingLight = useRef<THREE.SpotLight>(null)
  const spotFrontLeft = useRef<THREE.SpotLight>(null)
  const spotFrontRight = useRef<THREE.SpotLight>(null)
  const spotBackLeft = useRef<THREE.SpotLight>(null)
  const spotBackRight = useRef<THREE.SpotLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Individual refs — no array iteration or instanceof checks per frame
    const spots = [spotFrontLeft, spotFrontRight, spotBackLeft, spotBackRight]
    for (let i = 0; i < spots.length; i++) {
      const light = spots[i].current
      if (light) {
        const offset = i * Math.PI * 0.5
        light.target.position.x = Math.sin(t * 0.3 + offset) * 4
        light.target.position.z = Math.cos(t * 0.2 + offset) * 4
        light.target.updateMatrixWorld()
      }
    }

    // Dynamic roaming center spotlight
    if (roamingLight.current) {
      roamingLight.current.target.position.x = Math.sin(t * 0.5) * 3
      roamingLight.current.target.position.z = Math.cos(t * 0.7) * 3
      roamingLight.current.target.updateMatrixWorld()
    }
  })

  const spotlightConfig = {
    intensity: 40,
    distance: 60,
    angle: Math.PI / 6,
    penumbra: 0.8,
    decay: 2,
    castShadow: false, // Turned off for performance (except central light)
  }

  return (
    <group>
      {/* Central Roaming Spotlight */}
      <spotLight
        ref={roamingLight}
        position={[0, 25, 0]}
        color="#ffffff"
        intensity={60}
        distance={80}
        angle={Math.PI / 10}
        penumbra={0.5}
        decay={1.5}
        castShadow
      />

      {/* Front-left spot - Gold */}
      <spotLight
        ref={spotFrontLeft}
        position={[-10, 18, 10]}
        color="#d4af37"
        {...spotlightConfig}
      >
        <mesh position={[0, -18, 0]} visible={false}>
          <sphereGeometry args={[0.1]} />
        </mesh>
      </spotLight>

      {/* Front-right spot - Cyan */}
      <spotLight
        ref={spotFrontRight}
        position={[10, 18, 10]}
        color="#00e5ff"
        {...spotlightConfig}
        intensity={30}
      >
        <mesh position={[0, -18, 0]} visible={false}>
          <sphereGeometry args={[0.1]} />
        </mesh>
      </spotLight>

      {/* Back-left spot - Red */}
      <spotLight
        ref={spotBackLeft}
        position={[-8, 20, -8]}
        color="#ff1744"
        {...spotlightConfig}
        intensity={20}
      >
        <mesh position={[0, -20, 0]} visible={false}>
          <sphereGeometry args={[0.1]} />
        </mesh>
      </spotLight>

      {/* Back-right spot - White */}
      <spotLight
        ref={spotBackRight}
        position={[8, 20, -8]}
        color="#ffffff"
        {...spotlightConfig}
        intensity={15}
      >
        <mesh position={[0, -20, 0]} visible={false}>
          <sphereGeometry args={[0.1]} />
        </mesh>
      </spotLight>

      {/* Volumetric cone visual hints */}
      {[
        { pos: [-10, 18, 10] as [number, number, number], color: '#d4af37' },
        { pos: [10, 18, 10] as [number, number, number], color: '#00e5ff' },
        { pos: [-8, 20, -8] as [number, number, number], color: '#ff1744' },
        { pos: [8, 20, -8] as [number, number, number], color: '#ffffff' },
      ].map(({ pos, color }, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[3, 18, 16, 1, true]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.015}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
