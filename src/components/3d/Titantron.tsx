'use client'

import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const IMAGE_PATHS = [
  '/images/avatar.png',
  '/images/belt.png',
  '/images/locker_room.png',
  '/images/ring.png',
  '/images/utkarsh-action.png',
]

const TitantronMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uBlend: { value: 0 },
    uTexCurrent: { value: new THREE.Texture() },
    uTexNext: { value: new THREE.Texture() },
    uGlitch: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uBlend;
    uniform float uGlitch;
    uniform sampler2D uTexCurrent;
    uniform sampler2D uTexNext;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      if (uGlitch > 0.05) {
        float g = random(vec2(floor(uv.y * 10.0), uTime)) * uGlitch;
        uv.x += (random(vec2(uTime)) - 0.5) * g;
      }
      vec4 col1 = texture2D(uTexCurrent, uv);
      vec4 col2 = texture2D(uTexNext, uv);
      vec4 color = mix(col1, col2, uBlend);
      float scanline = sin(vUv.y * 600.0 + uTime * 2.0) * 0.04;
      color.rgb -= scanline;
      vec2 grid = fract(vUv * vec2(400.0, 150.0));
      float dot = smoothstep(0.4, 0.5, length(grid - 0.5));
      color.rgb *= 1.0 - dot * 0.2;
      float noise = (random(uv + uTime) - 0.5) * 0.05;
      color.rgb += noise;
      color.rgb *= 1.1;
      gl_FragColor = color;
    }
  `
}

function TitantronScreen() {
  const [loadedTextures, setLoadedTextures] = useState<THREE.Texture[]>([])
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const indices = useRef({ active: 0, next: 1 })
  const lastSwitchTime = useRef(0)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uBlend: { value: 0 },
    uTexCurrent: { value: new THREE.Texture() },
    uTexNext: { value: new THREE.Texture() },
    uGlitch: { value: 0 },
  }), [])

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const promises = IMAGE_PATHS.map(path => 
      new Promise<THREE.Texture>((resolve) => {
        loader.load(
          path,
          (tex) => {
            tex.minFilter = THREE.LinearFilter
            tex.magFilter = THREE.LinearFilter
            resolve(tex)
          },
          undefined,
          () => {
            console.warn(`Failed to load: ${path}`)
            resolve(new THREE.Texture()) // Empty texture fallback
          }
        )
      })
    )
    Promise.all(promises).then(setLoadedTextures)
  }, [])

  useFrame(({ clock }) => {
    if (!materialRef.current || loadedTextures.length < 2) return
    const time = clock.getElapsedTime()
    const interval = 8.0
    const fadeDuration = 1.5
    const cycleTime = time % interval
    
    let blend = 0
    let glitch = 0

    if (cycleTime > (interval - fadeDuration)) {
      blend = (cycleTime - (interval - fadeDuration)) / fadeDuration
      glitch = Math.pow(blend, 3) * 0.15
    } else {
      if (time - lastSwitchTime.current >= interval) {
        indices.current.active = indices.current.next
        indices.current.next = (indices.current.next + 1) % loadedTextures.length
        lastSwitchTime.current = Math.floor(time / interval) * interval
      }
      blend = 0
      glitch = 0
    }

    const { uniforms } = materialRef.current
    uniforms.uTime.value = time
    uniforms.uBlend.value = THREE.MathUtils.smoothstep(blend, 0, 1)
    const { active, next } = indices.current
    uniforms.uTexCurrent.value = loadedTextures[active]
    uniforms.uTexNext.value = loadedTextures[next]
    uniforms.uGlitch.value = glitch
  })

  if (loadedTextures.length === 0) return <TitantronFallback />

  return (
    <mesh>
      <planeGeometry args={[14, 5]} />
      <shaderMaterial
        ref={materialRef}
        {...TitantronMaterial}
        uniforms={uniforms}
      />
    </mesh>
  )
}

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
      <mesh position={[0, 0, -0.2]}>
        <boxGeometry args={[14.6, 5.6, 0.4]} />
        <meshStandardMaterial color="#0a0a0f" roughness={0.2} metalness={0.8} />
      </mesh>

      <TitantronScreen />

      {/* Edge glow strips - FIXED: Used meshStandardMaterial */}
      {[
        { pos: [0, 2.6, 0.05] as [number, number, number], scale: [14.2, 0.08, 1] as [number, number, number] },
        { pos: [0, -2.6, 0.05] as [number, number, number], scale: [14.2, 0.08, 1] as [number, number, number] },
      ].map(({ pos, scale }, i) => (
        <mesh key={i} position={pos}>
          <planeGeometry args={[scale[0], scale[1]]} />
          <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={2} />
        </mesh>
      ))}

      {/* Side Branding Panels */}
      {[
        { x: -9.8, label: 'UTKARSH', rotY: 0.45 },
        { x: 9.8, label: 'SOLANKI', rotY: -0.45 },
      ].map(({ x, label, rotY }) => (
        <group key={label} position={[x, -1, 1.8]} rotation={[0, rotY, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3.4, 8.8, 0.2]} />
            <meshStandardMaterial 
              color="#d4af37" 
              emissive="#d4af37" 
              emissiveIntensity={1.2} 
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>

          <mesh position={[0, 0, 0.11]}>
            <boxGeometry args={[3.2, 8.6, 0.02]} />
            <meshBasicMaterial color="#000000" />
          </mesh>

          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[3.1, 8.5]} />
            <meshBasicMaterial color="#d4af37" />
          </mesh>

          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
              <Text
                position={[0, 0, 0.15]}
                rotation={[0, 0, -Math.PI / 2]}
                fontSize={1.2}
                font="https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXoo9Wlhyw.ttf"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.05}
              >
                {label}
                <meshBasicMaterial color="#000000" />
              </Text>
            </Float>
          </Suspense>
        </group>
      ))}

      <pointLight position={[0, 4, -2]} intensity={50} color="#d4af37" distance={40} decay={2} />
    </group>
  )
}
