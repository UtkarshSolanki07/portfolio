'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const IMAGE_PATHS = [
  '/images/avatar.png',
  '/images/belt.png',
  '/images/locker_room.png',
  '/images/ring.png',
  '/images/utkarsh-action.png',
]

// Inner component that uses useTexture (must be inside Suspense)
function TitantronScreen() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [blend, setBlend] = useState(0)
  const blendRef = useRef(0)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const textures = useTexture(IMAGE_PATHS)

  useEffect(() => {
    textures.forEach(t => {
      t.minFilter = THREE.LinearFilter
      t.magFilter = THREE.LinearFilter
    })
  }, [textures])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const interval = 5.0
    const transitionDuration = 1.0
    const cycleTime = time % interval

    if (cycleTime > interval - transitionDuration) {
      const progress = (cycleTime - (interval - transitionDuration)) / transitionDuration
      blendRef.current = progress
    } else {
      if (blendRef.current > 0.5) {
        // Just finished a transition — advance the slide
        const newActive = nextIndex
        const newNext = (nextIndex + 1) % textures.length
        setActiveIndex(newActive)
        setNextIndex(newNext)
      }
      blendRef.current = 0
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time
      materialRef.current.uniforms.uBlend.value = blendRef.current
      materialRef.current.uniforms.uTexCurrent.value = textures[activeIndex]
      materialRef.current.uniforms.uTexNext.value = textures[nextIndex]
    }
  })

  return (
    <mesh>
      <planeGeometry args={[14, 5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uBlend;
          uniform sampler2D uTexCurrent;
          uniform sampler2D uTexNext;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;

            vec4 col1 = texture2D(uTexCurrent, uv);
            vec4 col2 = texture2D(uTexNext, uv);
            vec4 color = mix(col1, col2, uBlend);

            // Stadium scanlines
            float scanline = sin(vUv.y * 500.0) * 0.08;
            color.rgb -= scanline;

            // LED dot grid
            float gridX = sin(vUv.x * 700.0) * 0.5 + 0.5;
            float gridY = sin(vUv.y * 350.0) * 0.5 + 0.5;
            color.rgb *= 0.85 + 0.15 * gridX * gridY;

            gl_FragColor = color;
          }
        `}
        uniforms={{
          uTime: { value: 0 },
          uBlend: { value: 0 },
          uTexCurrent: { value: textures[0] },
          uTexNext: { value: textures[1] },
        }}
      />
    </mesh>
  )
}

// Fallback while textures are loading — simple dark screen
function TitantronFallback() {
  return (
    <mesh>
      <planeGeometry args={[14, 5]} />
      <meshBasicMaterial color="#050508" />
    </mesh>
  )
}

export default function Titantron() {
  return (
    <group position={[0, 8, -18]}>
      {/* Screen Frame */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[14.4, 5.4, 0.3]} />
        <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
      </mesh>

      {/* Image Carousel Screen wrapped in Suspense */}
      <Suspense fallback={<TitantronFallback />}>
        <TitantronScreen />
      </Suspense>

      {/* Edge glow strips */}
      {[
        { pos: [0, 2.55, 0.01] as [number, number, number], scale: [14, 0.05, 1] as [number, number, number], color: '#d4af37' },
        { pos: [0, -2.55, 0.01] as [number, number, number], scale: [14, 0.05, 1] as [number, number, number], color: '#d4af37' },
        { pos: [-7.05, 0, 0.01] as [number, number, number], scale: [0.05, 5, 1] as [number, number, number], color: '#d4af37' },
        { pos: [7.05, 0, 0.01] as [number, number, number], scale: [0.05, 5, 1] as [number, number, number], color: '#d4af37' },
      ].map(({ pos, scale, color }, i) => (
        <mesh key={i} position={pos}>
          <planeGeometry args={[scale[0], scale[1]]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Side Branding Panels */}
      {[
        { x: -9.5, label: 'UTKARSH', rotY: 0.4 },
        { x: 9.5, label: 'SOLANKI', rotY: -0.4 },
      ].map(({ x, label, rotY }) => (
        <group key={label} position={[x, -1, 1.5]} rotation={[0, rotY, 0]}>
          {/* Black Panel */}
          <mesh>
            <boxGeometry args={[3.2, 8.5, 0.15]} />
            <meshStandardMaterial color="#000000" roughness={0.5} metalness={0.2} />
          </mesh>

          {/* Gold border strips */}
          <mesh position={[0, 4.2, 0.09]}>
            <planeGeometry args={[3, 0.08]} />
            <meshBasicMaterial color="#d4af37" />
          </mesh>
          <mesh position={[0, -4.2, 0.09]}>
            <planeGeometry args={[3, 0.08]} />
            <meshBasicMaterial color="#d4af37" />
          </mesh>
          <mesh position={[-1.5, 0, 0.09]}>
            <planeGeometry args={[0.08, 8.5]} />
            <meshBasicMaterial color="#d4af37" />
          </mesh>
          <mesh position={[1.5, 0, 0.09]}>
            <planeGeometry args={[0.08, 8.5]} />
            <meshBasicMaterial color="#d4af37" />
          </mesh>

          {/* Vertical Text — rotated 90 deg */}
          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
              <Text
                position={[0, 0, 0.1]}
                rotation={[0, 0, -Math.PI / 2]}
                fontSize={1.0}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.15}
              >
                {label}
                <meshStandardMaterial
                  color="#d4af37"
                  emissive="#d4af37"
                  emissiveIntensity={1.5}
                  toneMapped={false}
                />
              </Text>
            </Float>
          </Suspense>
        </group>
      ))}

      {/* Dynamic Gold Back-lighting */}
      <pointLight position={[0, 2, -1]} intensity={25} color="#d4af37" distance={30} decay={2} />
    </group>
  )
}
