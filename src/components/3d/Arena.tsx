'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import WrestlingRing from './WrestlingRing'
import SpotlightRig from './SpotlightRig'
import CrowdSilhouettes from './CrowdSilhouettes'
import Titantron from './Titantron'
import Pyro from './Pyro'
import Wrestler from './Wrestler'

interface ArenaProps {
  pyroActive?: boolean
  activeSection?: number
}

interface Waypoint {
  position: THREE.Vector3
  target: THREE.Vector3
}

export default function Arena({ pyroActive = false, activeSection = 0 }: ArenaProps) {
  // Waypoints for camera pathing
  const waypoints = useMemo<Waypoint[]>(() => [
    // 0: Entrance - Epic wide shot
    {
      position: new THREE.Vector3(0, 10, 25),
      target: new THREE.Vector3(0, 2, 0),
    },
    // 1: Match Card - Close on ring center
    {
      position: new THREE.Vector3(8, 4, 12),
      target: new THREE.Vector3(0, 1, 0),
    },
    // 2: Championships - Side angle of ring
    {
      position: new THREE.Vector3(-12, 3, 5),
      target: new THREE.Vector3(0, 1, 0),
    },
    // 3: Backstage - Moving into the ramp
    {
      position: new THREE.Vector3(0, 2, -10),
      target: new THREE.Vector3(0, 1.5, -20),
    },
    // 4: Contact - Low angle, looking up at Titantron
    {
      position: new THREE.Vector3(0, 1.5, -16),
      target: new THREE.Vector3(0, 8, -25),
    },
  ], [])

  const currentTarget = useRef(new THREE.Vector3())

  // Camera interpolation and auto-drift
  useFrame(({ camera, clock }, delta) => {
    const t = clock.getElapsedTime()
    const wp = waypoints[activeSection] || waypoints[0]

    // Smoothly lerp camera position
    camera.position.lerp(wp.position, delta * 2)

    // Smoothly lerp camera target
    currentTarget.current.lerp(wp.target, delta * 2)
    camera.lookAt(currentTarget.current)

    // Add subtle floating "float" drift
    camera.position.x += Math.sin(t * 0.5) * 0.002
    camera.position.y += Math.cos(t * 0.7) * 0.002
  })

  return (
    <>
      {/* Ambient light - very low */}
      <ambientLight intensity={0.15} color="#1a1a2e" />

      {/* Hemisphere light for subtle fill */}
      <hemisphereLight
        color="#1a1a3e"
        groundColor="#0a0a0f"
        intensity={0.3}
      />

      {/* Arena floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial
          color="#0d0d14"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Entrance ramp */}
      <mesh position={[0, -0.3, -12]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[4, 0.15, 12]} />
        <meshStandardMaterial
          color="#15151f"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Ramp edge strips */}
      {[-2.1, 2.1].map((x) => (
        <mesh key={x} position={[x, -0.22, -12]}>
          <boxGeometry args={[0.08, 0.08, 12]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.3}
            metalness={0.7}
            emissive="#d4af37"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* Arena walls (backdrop) */}
      <mesh position={[0, 10, -30]}>
        <planeGeometry args={[80, 25]} />
        <meshStandardMaterial
          color="#08080e"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Side walls */}
      {[-35, 35].map((x) => (
        <mesh key={x} position={[x, 10, 0]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
          <planeGeometry args={[60, 25]} />
          <meshStandardMaterial
            color="#08080e"
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}

       {/* Wrestling Ring */}
       <WrestlingRing />

       {/* Wrestler on the ramp */}
       <Wrestler 
         scale={0.8} 
         position={[0, 0, -6]} 
         rotation={[0, Math.PI, 0]} 
       />

       {/* Spotlight Rig */}
       <SpotlightRig />

      {/* Titantron */}
      <Titantron />

      {/* Crowd — tiered stadium silhouettes around the ring */}
      <CrowdSilhouettes />

      {/* Pyro — fires from ring posts */}
      <Pyro active={pyroActive} position={[-5, 2, -5]} color="#d4af37" />
      <Pyro active={pyroActive} position={[5, 2, -5]} color="#ff1744" />
      <Pyro active={pyroActive} position={[-5, 2, 5]} color="#00e5ff" />
      <Pyro active={pyroActive} position={[5, 2, 5]} color="#d4af37" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0f', 30, 70]} />
    </>
  )
}
