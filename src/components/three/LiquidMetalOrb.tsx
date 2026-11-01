import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface LiquidMetalOrbProps {
  scrollProgress: number; // 0 to 1
}

export const LiquidMetalOrb: React.FC<LiquidMetalOrbProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const distortMaterialRef = useRef<any>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  // Velocity tracking for dynamic cursor distortion
  const prevPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef(0);

  // Loading intro explosion state
  const [exploded, setExploded] = useState<boolean>(
    () => typeof window !== 'undefined' && !!sessionStorage.getItem('manoj_dossier_preloaded')
  );
  const currentScale = useRef(
    typeof window !== 'undefined' && sessionStorage.getItem('manoj_dossier_preloaded') ? 1.0 : 0.01
  );

  useEffect(() => {
    if (exploded) return;
    const timer = setTimeout(() => {
      setExploded(true);
    }, 1050); // Matches loading screen completion
    return () => clearTimeout(timer);
  }, [exploded]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Loading explosion burst interpolation
    if (exploded && currentScale.current < 1.0) {
      currentScale.current += (1.0 - currentScale.current) * (delta * 6.5);
    }

    // Scroll fade & plunge
    const heroFactor = Math.max(0, 1 - scrollProgress * 4.0);
    const targetScale = currentScale.current * heroFactor;
    groupRef.current.scale.setScalar(Math.max(0.001, targetScale));

    // Calculate cursor velocity
    const dx = state.pointer.x - prevPointer.current.x;
    const dy = state.pointer.y - prevPointer.current.y;
    const currentSpeed = Math.sqrt(dx * dx + dy * dy) / Math.max(0.001, delta);
    velocity.current += (currentSpeed - velocity.current) * (delta * 5.0);
    prevPointer.current = { x: state.pointer.x, y: state.pointer.y };

    // Move orb following cursor smoothly with spring offset
    const targetX = -2.2 + state.pointer.x * 0.9;
    const targetY = 0.2 + state.pointer.y * 0.7;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * (delta * 3.5);
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * (delta * 3.5);

    // Dynamic distortion factor: baseline 0.38 + up to 0.75 based on cursor velocity
    if (distortMaterialRef.current) {
      const extraDistort = Math.min(0.45, velocity.current * 0.08);
      distortMaterialRef.current.distort = 0.38 + extraDistort;
      distortMaterialRef.current.speed = 2.2 + velocity.current * 0.5;
    }

    // Wireframe cage rotation
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x += delta * 0.3;
      wireframeRef.current.rotation.y += delta * 0.45;
    }

    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-2.2, 0.2, 0]}>
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Core Liquid Metal Yellow Orb */}
        <mesh ref={orbRef} castShadow receiveShadow>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial
            ref={distortMaterialRef}
            color="#FFD60A"
            roughness={0.12}
            metalness={0.88}
            distort={0.4}
            speed={2.5}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Outer Rotating Wireframe Geometric Shell */}
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[1.9, 1]} />
          <meshBasicMaterial
            color="#FFD60A"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Orbiting Equatorial Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[2.2, 2.24, 64]} />
          <meshBasicMaterial
            color="#FFD60A"
            side={THREE.DoubleSide}
            transparent
            opacity={0.45}
          />
        </mesh>
      </Float>
    </group>
  );
};
