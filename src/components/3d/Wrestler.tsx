'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface WrestlerProps {
    /** Scale of the wrestler model */
    scale?: number
    /** Rotation offset (y-axis in radians) */
    rotation?: [number, number, number]
    /** Position offset */
    position?: [number, number, number]
}

export default function Wrestler({
    scale = 1,
    rotation = [0, 0, 0],
    position = [0, 0, 0],
}: WrestlerProps) {
    const meshRef = useRef<THREE.Group>(null)
    const chestRef = useRef<THREE.Object3D | null>(null)
    const leftArmRef = useRef<THREE.Object3D | null>(null)
    const rightArmRef = useRef<THREE.Object3D | null>(null)

    useFrame((state) => {
        const delta = state.clock.getDelta()
        const elapsed = state.clock.getElapsedTime()

        if (!meshRef.current) return

        // Initialize refs if needed
        if (!chestRef.current) chestRef.current = meshRef.current.getObjectByName('chest') || null
        if (!leftArmRef.current) leftArmRef.current = meshRef.current.getObjectByName('leftUpperArm') || null
        if (!rightArmRef.current) rightArmRef.current = meshRef.current.getObjectByName('rightUpperArm') || null

        // Calculate idle animations
        const breathing = Math.sin(elapsed * 0.8) * 0.02
        const sway = Math.sin(elapsed * 0.3) * 0.5 * (Math.PI / 180)
        const armRotation = Math.sin(elapsed * 0.6) * 0.3

        // Apply transformations
        if (chestRef.current) {
            chestRef.current.scale.set(1 + breathing, 1 + breathing * 0.5, 1 + breathing)
        }

        meshRef.current.rotation.y = rotation[1] + sway

        if (leftArmRef.current) {
            leftArmRef.current.rotation.z = armRotation
        }
        if (rightArmRef.current) {
            rightArmRef.current.rotation.z = -armRotation
        }
    })

    // Use useMemo to create the wrestler group once
    const wrestlerGroup = useMemo(() => {
        const createWrestler = () => {
            const group = new THREE.Group()
            group.name = 'wrestler'

            // Colors
            const skinColor = 0xffdbac
            const hairColor = 0x1a1a1a
            const attireColor = 0xcc0000 // Red
            const gloveColor = 0x000000 // Black

            // Body parts
            // Head
            const headGeometry = new THREE.SphereGeometry(0.4, 16, 16)
            const headMaterial = new THREE.MeshStandardMaterial({ color: skinColor })
            const head = new THREE.Mesh(headGeometry, headMaterial)
            head.position.y = 1.8
            head.name = 'head'
            group.add(head)

            // Hair (simple blob on top)
            const hairGeometry = new THREE.SphereGeometry(0.42, 16, 16)
            const hairMaterial = new THREE.MeshStandardMaterial({ color: hairColor })
            const hair = new THREE.Mesh(hairGeometry, hairMaterial)
            hair.position.y = 0.1
            head.add(hair)

            // Body
            const bodyGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.3)
            const bodyMaterial = new THREE.MeshStandardMaterial({ color: attireColor })
            const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
            body.position.y = 1.0
            body.name = 'chest'
            group.add(body)

            // Arms
            const armGeometry = new THREE.BoxGeometry(0.08, 0.6, 0.08)
            const gloveGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)

            // Left arm
            const leftUpperArm = new THREE.Mesh(
                armGeometry,
                new THREE.MeshStandardMaterial({ color: attireColor })
            )
            leftUpperArm.position.set(-0.35, 1.4, 0)
            leftUpperArm.name = 'leftUpperArm'
            group.add(leftUpperArm)

            const leftGlove = new THREE.Mesh(
                gloveGeometry,
                new THREE.MeshStandardMaterial({ color: gloveColor })
            )
            leftGlove.position.set(0, -0.35, 0)
            leftUpperArm.add(leftGlove)

            // Right arm
            const rightUpperArm = new THREE.Mesh(
                armGeometry,
                new THREE.MeshStandardMaterial({ color: attireColor })
            )
            rightUpperArm.position.set(0.35, 1.4, 0)
            rightUpperArm.name = 'rightUpperArm'
            group.add(rightUpperArm)

            const rightGlove = new THREE.Mesh(
                gloveGeometry,
                new THREE.MeshStandardMaterial({ color: gloveColor })
            )
            rightGlove.position.set(0, -0.35, 0)
            rightUpperArm.add(rightGlove)

            // Legs
            const legGeometry = new THREE.BoxGeometry(0.09, 0.7, 0.09)
            const bootGeometry = new THREE.BoxGeometry(0.11, 0.12, 0.11)

            // Left leg
            const leftLeg = new THREE.Mesh(
                legGeometry,
                new THREE.MeshStandardMaterial({ color: 0x0000ff }) // Blue pants
            )
            leftLeg.position.set(-0.15, 0.3, 0)
            leftLeg.name = 'leftLeg'
            group.add(leftLeg)

            const leftBoot = new THREE.Mesh(
                bootGeometry,
                new THREE.MeshStandardMaterial({ color: gloveColor })
            )
            leftBoot.position.set(0, -0.41, 0)
            leftLeg.add(leftBoot)

            // Right leg
            const rightLeg = new THREE.Mesh(
                legGeometry,
                new THREE.MeshStandardMaterial({ color: 0x0000ff })
            )
            rightLeg.position.set(0.15, 0.3, 0)
            rightLeg.name = 'rightLeg'
            group.add(rightLeg)

            const rightBoot = new THREE.Mesh(
                bootGeometry,
                new THREE.MeshStandardMaterial({ color: gloveColor })
            )
            rightBoot.position.set(0, -0.41, 0)
            rightLeg.add(rightBoot)

            // Feet
            const footGeometry = new THREE.BoxGeometry(0.12, 0.04, 0.18)
            const leftFoot = new THREE.Mesh(
                footGeometry,
                new THREE.MeshStandardMaterial({ color: gloveColor })
            )
            leftFoot.position.set(-0.15, -0.45, 0)
            leftLeg.add(leftFoot)

            const rightFoot = new THREE.Mesh(
                footGeometry,
                new THREE.MeshStandardMaterial({ color: gloveColor })
            )
            rightFoot.position.set(0.15, -0.45, 0)
            rightLeg.add(rightFoot)

            // Simple facial features (optional)
            // Eyes
            const eyeGeometry = new THREE.SphereGeometry(0.03, 8, 8)
            const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })

            const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
            leftEye.position.set(-0.12, 1.9, 0.35)
            head.add(leftEye)

            const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
            rightEye.position.set(0.12, 1.9, 0.35)
            head.add(rightEye)

            // Mouth (simple line)
            const mouthGeometry = new THREE.BoxGeometry(0.08, 0.01, 0.01)
            const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 })
            const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial)
            mouth.position.set(0, 1.75, 0.38)
            head.add(mouth)

            group.scale.set(scale, scale, scale)
            group.rotation.set(...rotation)
            group.position.set(...position)

            group.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true
                    child.receiveShadow = true
                }
            })

            return group
        }

        return createWrestler()
    }, [scale, rotation, position])

    return <primitive object={wrestlerGroup} ref={meshRef} />
}