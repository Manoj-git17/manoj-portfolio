import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface BarCity3DProps {
  scrollProgress: number; // 0 to 1
}

export const BarCity3D: React.FC<BarCity3DProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);

  // 7 days x 16 weeks = 112 bars
  const rows = 7;
  const cols = 16;
  const count = rows * cols;

  // Generate deterministic heights mimicking GitHub commit bursts
  const barData = useMemo(() => {
    const list = [];
    let seed = 77;
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // High density toward recent weeks (larger c)
        const density = (c / cols) * 0.7 + 0.3;
        const rand = (Math.sin(seed++) * 10000) % 1;
        const normalizedRand = Math.abs(rand);
        const hasCommits = normalizedRand < density;
        const height = hasCommits ? 0.4 + normalizedRand * 2.8 : 0.08;
        list.push({
          x: (c - cols / 2) * 0.45,
          z: (r - rows / 2) * 0.45,
          targetHeight: height,
        });
      }
    }
    return list;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_state, delta) => {
    if (!groupRef.current || !instancedRef.current) return;

    // Visibility curve for Activity chapter (scrollProgress 0.50 -> 0.75)
    let progressFactor = 0;
    if (scrollProgress >= 0.50 && scrollProgress <= 0.78) {
      if (scrollProgress < 0.60) {
        progressFactor = (scrollProgress - 0.50) / 0.10;
      } else if (scrollProgress > 0.70) {
        progressFactor = 1 - (scrollProgress - 0.70) / 0.08;
      } else {
        progressFactor = 1;
      }
    }

    groupRef.current.visible = progressFactor > 0.01;
    if (!groupRef.current.visible) return;

    // Rising animation: bars emerge from floor as progress reaches 0.55+
    const riseFactor = Math.min(1, Math.max(0, (scrollProgress - 0.52) / 0.12));

    for (let i = 0; i < count; i++) {
      const b = barData[i];
      const h = Math.max(0.04, b.targetHeight * riseFactor);
      dummy.position.set(b.x, h / 2, b.z);
      dummy.scale.set(0.36, h, 0.36);
      dummy.updateMatrix();
      instancedRef.current.setMatrixAt(i, dummy.matrix);
    }
    instancedRef.current.instanceMatrix.needsUpdate = true;

    // Subtle isometric rotation drift
    groupRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={groupRef} position={[0, -1.8, -48]} rotation={[0.45, -0.35, 0]}>
      {/* Title Header floating over the 3D City */}
      <group position={[0, 3.2, 0]}>
        <Text
          fontSize={0.24}
          color="#FFD60A"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          ● 3D ACTIVITY CITY // REAL-TIME GITHUB ENGINE
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.13}
          color="#A1A1A6"
          anchorX="center"
          anchorY="middle"
        >
          112 TEMPORAL DATA BLOCKS · BENGALURU, IN
        </Text>
      </group>

      {/* Instanced Contribution Bars */}
      <instancedMesh
        ref={instancedRef}
        args={[undefined, undefined, count]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#FFD60A"
          roughness={0.2}
          metalness={0.8}
          emissive="#7A6000"
          emissiveIntensity={0.3}
        />
      </instancedMesh>

      {/* Ground Grid Floor */}
      <gridHelper
        args={[10, 20, '#FFD60A', '#333333']}
        position={[0, 0, 0]}
      />
    </group>
  );
};
