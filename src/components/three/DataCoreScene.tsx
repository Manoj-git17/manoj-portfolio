import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const ORBIT_NODES = [
  { label: 'React', radius: 1.55, speed: 0.9, yOffset: 0.25, phase: 0 },
  { label: 'FastAPI', radius: 1.8, speed: 0.7, yOffset: -0.35, phase: 1.3 },
  { label: 'Postgres', radius: 1.45, speed: 1.1, yOffset: 0.45, phase: 2.5 },
  { label: 'Python', radius: 1.7, speed: 0.8, yOffset: -0.15, phase: 3.8 },
  { label: 'ML', radius: 1.5, speed: 1.0, yOffset: 0.35, phase: 5.0 },
];

export const DataCoreScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const shard1Ref = useRef<THREE.Mesh>(null);
  const shard2Ref = useRef<THREE.Mesh>(null);
  const shard3Ref = useRef<THREE.Mesh>(null);
  const chartGroupRef = useRef<THREE.Group>(null);
  const glassCardRef = useRef<THREE.Group>(null);

  const [photoTexture, setPhotoTexture] = useState<THREE.Texture | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Load photo texture without blocking Suspense
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/me.png',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setPhotoTexture(tex);
      },
      undefined,
      () => {
        loader.load('/me.jpg', (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          setPhotoTexture(tex);
        });
      }
    );
  }, []);

  // Track global scroll progress for scroll-driven morphing story
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, scrollY / maxScroll)));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bar chart geometry data for Section 3 (Live Proof)
  const barChartData = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      x: (i - 3.5) * 0.35,
      baseHeight: 0.4 + ((i * 37) % 7) * 0.18,
    }));
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    // 1. Mouse Parallax Tilt (Lerped)
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.32,
        0.06
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.22,
        0.06
      );
    }

    // 2. Core continuous rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.55;
      coreRef.current.rotation.x += delta * 0.35;
    }

    // 3. Scroll Story Morphing
    // Phase 0: Hero (scroll < 0.2)
    // Phase 1: 3 Systems Split (scroll 0.2 -> 0.5)
    // Phase 2: Live Activity Bar Chart (scroll 0.5 -> 0.75)
    // Phase 3: Reassemble at Hire Me (scroll > 0.75)
    const isHero = scrollProgress < 0.2;
    const isProjects = scrollProgress >= 0.2 && scrollProgress < 0.5;
    const isLiveActivity = scrollProgress >= 0.5 && scrollProgress < 0.75;
    const isHireMe = scrollProgress >= 0.75;

    // Morph core & shards based on phase
    if (shard1Ref.current && shard2Ref.current && shard3Ref.current) {
      if (isProjects) {
        // Split apart into 3 pieces for 3 Systems
        const splitAmount = 1.1;
        shard1Ref.current.position.x = THREE.MathUtils.lerp(shard1Ref.current.position.x, -splitAmount, 0.08);
        shard1Ref.current.position.y = THREE.MathUtils.lerp(shard1Ref.current.position.y, 0.5, 0.08);

        shard2Ref.current.position.x = THREE.MathUtils.lerp(shard2Ref.current.position.x, 0, 0.08);
        shard2Ref.current.position.y = THREE.MathUtils.lerp(shard2Ref.current.position.y, -0.5, 0.08);

        shard3Ref.current.position.x = THREE.MathUtils.lerp(shard3Ref.current.position.x, splitAmount, 0.08);
        shard3Ref.current.position.y = THREE.MathUtils.lerp(shard3Ref.current.position.y, 0.5, 0.08);
      } else if (isHireMe) {
        // Reassemble into tight golden core
        shard1Ref.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        shard2Ref.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        shard3Ref.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
      } else {
        // United Hero Core
        shard1Ref.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        shard2Ref.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
        shard3Ref.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.08);
      }
    }

    // 4. Live Activity 3D Bar Chart visibility & oscillation
    if (chartGroupRef.current) {
      const targetScale = isLiveActivity ? 1 : 0.001;
      chartGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      chartGroupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    }

    // 5. 3D Glass Card mouse tilt
    if (glassCardRef.current) {
      glassCardRef.current.rotation.y = THREE.MathUtils.lerp(
        glassCardRef.current.rotation.y,
        pointer.x * 0.22 - 0.08,
        0.05
      );
      glassCardRef.current.rotation.x = THREE.MathUtils.lerp(
        glassCardRef.current.rotation.x,
        -pointer.y * 0.22,
        0.05
      );
      // Move glass card back during later scroll sections so content shines
      const glassCardZ = isHero ? 0.2 : -2.5;
      glassCardRef.current.position.z = THREE.MathUtils.lerp(glassCardRef.current.position.z, glassCardZ, 0.08);
      glassCardRef.current.scale.lerp(
        isHero ? new THREE.Vector3(1, 1, 1) : new THREE.Vector3(0.5, 0.5, 0.5),
        0.08
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ============================================================== */}
      {/* 1. CENTRAL GLOSSY YELLOW DATA CORE + WIREFRAME SHELL            */}
      {/* ============================================================== */}
      <group position={[-0.8, 0, 0]}>
        <group ref={coreRef}>
          {/* Main Shard 1 (United in Hero / splits in projects) */}
          <mesh ref={shard1Ref}>
            <icosahedronGeometry args={[0.95, 0]} />
            <meshPhysicalMaterial
              color="#FFD60A"
              emissive="#FFD60A"
              emissiveIntensity={0.2}
              metalness={0.8}
              roughness={0.15}
              clearcoat={1.0}
              clearcoatRoughness={0.1}
              reflectivity={1.0}
            />
          </mesh>

          {/* Shard 2 */}
          <mesh ref={shard2Ref}>
            <octahedronGeometry args={[0.75, 0]} />
            <meshStandardMaterial
              color="#0E0E0E"
              roughness={0.25}
              metalness={0.85}
            />
          </mesh>

          {/* Shard 3 */}
          <mesh ref={shard3Ref}>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshPhysicalMaterial
              color="#FFD60A"
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Outer Wireframe Shell */}
          <mesh scale={[1.2, 1.2, 1.2]}>
            <icosahedronGeometry args={[0.95, 1]} />
            <meshBasicMaterial
              color="#F2EFE6"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </group>

        {/* Orbiting Nodes: React, FastAPI, Postgres, Python, ML */}
        {ORBIT_NODES.map((node, idx) => (
          <OrbitingNode
            key={idx}
            label={node.label}
            radius={node.radius}
            speed={node.speed}
            yOffset={node.yOffset}
            phase={node.phase}
            visible={scrollProgress < 0.5}
          />
        ))}
      </group>

      {/* ============================================================== */}
      {/* 2. 3D TILTING GLASS PHOTO CARD BESIDE CORE                     */}
      {/* ============================================================== */}
      <group ref={glassCardRef} position={[1.15, 0, 0.2]}>
        {/* Glass Frame Backing */}
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[1.45, 1.85, 0.05]} />
          <meshPhysicalMaterial
            color="#141414"
            metalness={0.4}
            roughness={0.1}
            transmission={0.4}
            transparent
            opacity={0.9}
            clearcoat={1.0}
          />
        </mesh>

        {/* Photo Image Face */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.38, 1.78]} />
          {photoTexture ? (
            <meshBasicMaterial
              map={photoTexture}
              transparent
              opacity={0.98}
            />
          ) : (
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.5}
              roughness={0.5}
            />
          )}
        </mesh>

        {/* Editorial Yellow Accent Corner Tab */}
        <mesh position={[0.6, 0.85, 0.035]}>
          <boxGeometry args={[0.25, 0.08, 0.02]} />
          <meshBasicMaterial color="#FFD60A" />
        </mesh>

        {/* Glass Border Outline */}
        <lineSegments position={[0, 0, 0.03]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.44, 1.84, 0.05)]} />
          <lineBasicMaterial color="#FFD60A" transparent opacity={0.45} />
        </lineSegments>
      </group>

      {/* ============================================================== */}
      {/* 3. 3D LIVE ACTIVITY COMPUTATIONAL BAR CHART                     */}
      {/* ============================================================== */}
      <group ref={chartGroupRef} position={[0, -0.3, 0]} scale={[0.001, 0.001, 0.001]}>
        {barChartData.map((bar, i) => (
          <mesh key={i} position={[bar.x, bar.baseHeight / 2, 0]}>
            <boxGeometry args={[0.25, bar.baseHeight, 0.25]} />
            <meshStandardMaterial
              color="#FFD60A"
              metalness={0.7}
              roughness={0.2}
              emissive="#FFD60A"
              emissiveIntensity={0.25}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Subcomponent for each orbiting node around data core
interface OrbitingNodeProps {
  label: string;
  radius: number;
  speed: number;
  yOffset: number;
  phase: number;
  visible?: boolean;
}

const OrbitingNode: React.FC<OrbitingNodeProps> = ({
  label,
  radius,
  speed,
  yOffset,
  phase,
  visible = true,
}) => {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.getElapsedTime() * speed + phase;
    nodeRef.current.position.x = Math.cos(t) * radius;
    nodeRef.current.position.z = Math.sin(t) * radius;
    nodeRef.current.position.y = Math.sin(t * 1.5) * 0.25 + yOffset;
  });

  if (!visible) return null;

  return (
    <group ref={nodeRef}>
      {/* Small Glowing Sphere Node */}
      <mesh>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshStandardMaterial
          color="#FFD60A"
          emissive="#FFD60A"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Orbit Ring Trail Marker */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.11, 0.14, 16]} />
        <meshBasicMaterial color="#FFD60A" transparent opacity={0.4} />
      </mesh>

      {/* Monospace Editorial HTML Label */}
      <Html distanceFactor={7} center pointerEvents="none">
        <div className="px-2 py-0.5 rounded-full bg-[#0E0E0E]/90 text-[#FFD60A] border border-[#FFD60A]/50 font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md select-none whitespace-nowrap">
          {label}
        </div>
      </Html>
    </group>
  );
};
