import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS_LIST = [
  'Python',
  'FastAPI',
  'React 19',
  'PostgreSQL',
  'SQLAlchemy',
  'Pandas',
  'C++',
  'Pytest',
  'Tailwind CSS',
  'Vite',
  'Machine Learning',
  'Star Schema',
  'Scikit-Learn',
  'NumPy',
  'Docker',
  'Git & GitHub',
  'Linux CLI',
  'REST APIs',
  'EDA Profiler',
  'Valgrind Safe',
  'ETL Pipelines',
  'Data Profiling',
  'CI Automation',
  'AsyncIO Core',
  'Data Integrity',
  'TypeScript',
  'Algorithms',
  'Graph Traversal',
  'Three.js',
  'Postprocessing',
  'Z-Score Outliers',
  'Deterministic',
];

interface SkillsSphere3DProps {
  scrollProgress: number; // 0 to 1
}

export const SkillsSphere3D: React.FC<SkillsSphere3DProps> = ({ scrollProgress }) => {
  const sphereGroupRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Drag rotation state
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });

  // Compute Fibonacci sphere node positions
  const nodes = useMemo(() => {
    const radius = 4.2;
    const n = SKILLS_LIST.length;
    return SKILLS_LIST.map((name, i) => {
      const phi = Math.acos(-1 + (2 * i) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);
      return { name, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  useFrame((_state, delta) => {
    if (!sphereGroupRef.current) return;

    // Visibility curve for Skills section (scrollProgress 0.70 -> 0.88)
    let opacity = 0;
    if (scrollProgress >= 0.68 && scrollProgress <= 0.89) {
      if (scrollProgress < 0.74) {
        opacity = (scrollProgress - 0.68) / 0.06;
      } else if (scrollProgress > 0.84) {
        opacity = 1 - (scrollProgress - 0.84) / 0.05;
      } else {
        opacity = 1;
      }
    }

    sphereGroupRef.current.visible = opacity > 0.01;
    if (!sphereGroupRef.current.visible) return;

    // Apply inertia / drag damping
    if (!isDragging.current) {
      // Natural slow planetary rotation
      sphereGroupRef.current.rotation.y += delta * 0.15 + dragVelocity.current.x;
      sphereGroupRef.current.rotation.x += delta * 0.06 + dragVelocity.current.y;
      dragVelocity.current.x *= 0.94;
      dragVelocity.current.y *= 0.94;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging.current || !sphereGroupRef.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;

    dragVelocity.current = { x: dx * 0.005, y: dy * 0.005 };
    sphereGroupRef.current.rotation.y += dx * 0.006;
    sphereGroupRef.current.rotation.x += dy * 0.006;

    prevMouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <group
      ref={sphereGroupRef}
      position={[0, 0, -68]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {/* Central Glowing Core Sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#FFD60A"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbiting Equatorial Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[4.4, 0.02, 16, 64]} />
        <meshBasicMaterial color="#FFD60A" transparent opacity={0.3} />
      </mesh>

      {/* 3D Skill Cloud Nodes */}
      {nodes.map((node, i) => {
        const isHovered = hoveredIdx === i;

        return (
          <group
            key={node.name}
            position={node.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredIdx(i);
            }}
            onPointerOut={() => setHoveredIdx(null)}
          >
            {/* Small Glowing Marker Orb */}
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial
                color={isHovered ? '#FFFFFF' : '#FFD60A'}
              />
            </mesh>

            {/* Billboard Label Always Facing Camera */}
            <Billboard>
              <group position={[0, 0.22, 0]}>
                <mesh>
                  <planeGeometry args={[node.name.length * 0.12 + 0.35, 0.34]} />
                  <meshBasicMaterial
                    color={isHovered ? '#FFD60A' : '#0E0E0E'}
                    transparent
                    opacity={0.88}
                  />
                </mesh>
                <Text
                  position={[0, 0, 0.02]}
                  fontSize={0.13}
                  color={isHovered ? '#0E0E0E' : '#FFFFFF'}
                  anchorX="center"
                  anchorY="middle"
                >
                  {node.name}
                </Text>
              </group>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
};
