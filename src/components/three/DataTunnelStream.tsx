import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataTunnelStreamProps {
  scrollProgress: number; // 0 to 1
}

const COUNT = 160;

function createTunnelParticles(count: number) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 * 3; // helical distribution
    const radius = 3.2 + (Math.sin(i * 1.5) + 1) * 0.8; // tunnel radius ~ 3.2 to 4.8
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = -2 - (i / count) * 22; // spanning z = -2 to -24
    const speed = 4 + (i % 5) * 1.5;
    const length = 1.2 + (i % 4) * 0.8;
    list.push({ x, y, z, baseZ: z, speed, length, angle });
  }
  return list;
}

const INITIAL_PARTICLES = createTunnelParticles(COUNT);

export const DataTunnelStream: React.FC<DataTunnelStreamProps> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particlesRef = useRef(INITIAL_PARTICLES);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;

    // Tunnel visibility bell curve peaking around scrollProgress 0.25 (range 0.12 - 0.45)
    let opacity = 0;
    if (scrollProgress >= 0.12 && scrollProgress <= 0.45) {
      if (scrollProgress < 0.25) {
        opacity = (scrollProgress - 0.12) / 0.13;
      } else {
        opacity = 1 - (scrollProgress - 0.25) / 0.2;
      }
    }

    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = opacity * 0.85;
    if (opacity <= 0.01) {
      meshRef.current.visible = false;
      return;
    }
    meshRef.current.visible = true;

    const list = particlesRef.current;
    // Advance streaming lines forward
    for (let i = 0; i < COUNT; i++) {
      const p = list[i];
      p.z += delta * (p.speed + (scrollProgress > 0.15 ? 12 : 2));
      if (p.z > 2) {
        p.z = -22;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(0.04, 0.04, p.length);
      dummy.rotation.set(0, 0, p.angle);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, COUNT]}
      position={[0, 0, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color="#FFD60A"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};
