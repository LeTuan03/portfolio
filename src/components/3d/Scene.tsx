'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import { inSphere } from 'maath/random'

function Particles(props: any) {
    const ref = useRef<any>()

    // Generate and validate particle positions
    const sphere = useMemo(() => {
        const positions = inSphere(new Float32Array(5000), { radius: 1.5 })

        // Validate and replace any NaN values with 0
        for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i]) || !isFinite(positions[i])) {
                positions[i] = 0
            }
        }

        return positions
    }, [])

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10
            ref.current.rotation.y -= delta / 15
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled={false}
                {...props}
            >
                <PointMaterial
                    transparent
                    color="#a855f7"
                    size={0.005}
                    sizeAttenuation
                    depthWrite={false}
                />
            </Points>
        </group>
    )
}

function FloatingShape() {
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[1, 0, 0]}>
                <torusKnotGeometry args={[0.4, 0.1, 128, 32]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </Float>
    )
}

export default function Scene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ambientLight intensity={0.5} />
                <Particles />
                <FloatingShape />
            </Canvas>
        </div>
    )
}
