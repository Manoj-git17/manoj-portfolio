import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const YellowParticleDust: React.FC<{ count?: number }> = ({ count = 90 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    let s = 101;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(s++) - 0.5) * 16;
      pos[i * 3 + 1] = (pseudoRandom(s++) - 0.5) * 14;
      pos[i * 3 + 2] = (pseudoRandom(s++) - 0.5) * 10;
      sc[i] = pseudoRandom(s++) * 0.04 + 0.015;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFD60A"
        size={0.06}
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
