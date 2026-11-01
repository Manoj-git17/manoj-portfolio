import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

interface GiantHireMeButton3DProps {
  scrollProgress: number; // 0 to 1
  onClick?: () => void;
}

export const GiantHireMeButton3D: React.FC<GiantHireMeButton3DProps> = ({ scrollProgress, onClick }) => {
  const groupRef = useRef<THREE.Group>(null);
  const buttonRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current || !buttonRef.current) return;

    // Visibility curve for Contact/Hire Me chapter (scrollProgress 0.85 -> 1.0)
    let opacity = 0;
    if (scrollProgress >= 0.82) {
      opacity = Math.min(1, (scrollProgress - 0.82) / 0.08);
    }

    groupRef.current.visible = opacity > 0.01;
    if (!groupRef.current.visible) return;

    // React to cursor with 3D tilt
    const targetRotX = -state.pointer.y * 0.18;
    const targetRotY = state.pointer.x * 0.22;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * (delta * 4);
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * (delta * 4);

    // Press down displacement on click/hover
    const targetPressZ = clicked ? -0.35 : hovered ? 0.2 : 0;
    buttonRef.current.position.z += (targetPressZ - buttonRef.current.position.z) * (delta * 10);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(true);
    setTimeout(() => setClicked(false), 200);

    // Fire celebratory confetti explosion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD60A', '#FFFFFF', '#0E0E0E', '#E5321B'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD60A', '#FFFFFF'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD60A', '#FFFFFF'],
        });
      }, 150);
    } catch (err) {
      console.warn('Confetti trigger:', err);
    }

    onClick?.();
  };

  return (
    <group ref={groupRef} position={[0, -0.6, -88]}>
      <Float speed={2.0} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Floating Halo Rings around Giant Button */}
        <mesh position={[0, 0, -0.5]}>
          <ringGeometry args={[4.2, 4.3, 64]} />
          <meshBasicMaterial color="#FFD60A" side={THREE.DoubleSide} transparent opacity={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.7]}>
          <ringGeometry args={[4.8, 4.88, 64]} />
          <meshBasicMaterial color="#FFD60A" side={THREE.DoubleSide} transparent opacity={0.2} />
        </mesh>

        <group
          ref={buttonRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
        >
          {/* Main 3D Golden Button Block */}
          <RoundedBox args={[6.8, 2.2, 0.6]} radius={0.3} smoothness={4} castShadow>
            <meshStandardMaterial
              color="#FFD60A"
              roughness={0.14}
              metalness={0.88}
              emissive={hovered ? '#A68B00' : '#473C00'}
              emissiveIntensity={hovered ? 0.6 : 0.25}
            />
          </RoundedBox>

          {/* Golden Neon Border Glow */}
          <lineSegments position={[0, 0, 0.31]}>
            <edgesGeometry args={[new THREE.PlaneGeometry(6.8, 2.2)]} />
            <lineBasicMaterial color="#FFFFFF" transparent opacity={hovered ? 0.9 : 0.4} />
          </lineSegments>

          {/* Giant Embossed Typography */}
          <Text
            position={[0, 0.08, 0.35]}
            fontSize={0.9}
            letterSpacing={0.06}
            color="#0E0E0E"
            anchorX="center"
            anchorY="middle"
          >
            HIRE ME
          </Text>

          {/* Subtitle Label on Button Face */}
          <Text
            position={[0, -0.58, 0.35]}
            fontSize={0.15}
            letterSpacing={0.18}
            color="#0E0E0E"
            anchorX="center"
            anchorY="middle"
          >
            ● CLICK TO INITIATE CONTRACT / INTERNSHIP
          </Text>
        </group>
      </Float>
    </group>
  );
};
