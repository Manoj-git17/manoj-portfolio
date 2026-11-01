import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import type { Project } from '../../data/portfolioData';

interface ProjectsRingProps {
  scrollProgress: number; // 0 to 1
  onSelectProject: (project: Project) => void;
}

const RING_PROJECTS = [
  {
    id: 'datapulse',
    title: 'DATAPULSE',
    category: 'DATA WAREHOUSE & ANALYTICS',
    stack: 'React 19 · FastAPI · PostgreSQL · Pandas',
    metric: '38/38 Tests Passed (100%)',
    number: '01',
  },
  {
    id: 'taskflow',
    title: 'TASKFLOW AI',
    category: 'APPLIED AI & FULL-STACK SAAS',
    stack: 'React.js · Express · SQLite · Gemini API',
    metric: '100% Deployed & Live on Render',
    number: '02',
  },
  {
    id: 'data-analytics-engine',
    title: 'DATA INTELLIGENCE PIPELINE',
    category: 'AUTOMATED INGESTION & PROFILING',
    stack: 'Python · SQL · Pandas · Z-Score Profiler',
    metric: '0% Data Leakage Isolated',
    number: '03',
  },
  {
    id: 'ml-classification-benchmarks',
    title: 'PREDICTIVE CLASSIFIER LAB',
    category: 'COMPARATIVE ML WORKBENCH',
    stack: 'Python · Scikit-Learn · Cross-Validation',
    metric: '10-Fold Stratified CV',
    number: '04',
  },
];

export const ProjectsRing: React.FC<ProjectsRingProps> = ({ scrollProgress, onSelectProject }) => {
  const ringRef = useRef<THREE.Group>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Radius of the 3D screens circle
  const radius = 6.2;

  useFrame((state, delta) => {
    if (!ringRef.current) return;

    // Visibility curve for Projects chapter (approx scrollProgress 0.22 -> 0.58)
    let opacity = 0;
    if (scrollProgress >= 0.20 && scrollProgress <= 0.60) {
      if (scrollProgress < 0.30) {
        opacity = (scrollProgress - 0.20) / 0.10;
      } else if (scrollProgress > 0.50) {
        opacity = 1 - (scrollProgress - 0.50) / 0.10;
      } else {
        opacity = 1;
      }
    }

    ringRef.current.visible = opacity > 0.01;
    if (!ringRef.current.visible) return;

    // Ring rotation linked to scroll progress: rotates 240 degrees across section
    const targetRotationY = (scrollProgress - 0.28) * (Math.PI * 2.2);
    ringRef.current.rotation.y += (targetRotationY - ringRef.current.rotation.y) * (delta * 4.0);

    // Slight floating wobble
    ringRef.current.position.y = -1.2 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <group ref={ringRef} position={[0, -1.2, -28]}>
      {RING_PROJECTS.map((proj, i) => {
        const baseAngle = (i / RING_PROJECTS.length) * Math.PI * 2;
        const x = Math.sin(baseAngle) * radius;
        const z = Math.cos(baseAngle) * radius;
        const rotationY = baseAngle + Math.PI; // Face outward from center
        const isHovered = hoveredIdx === i;

        return (
          <group
            key={proj.id}
            position={[x, 0, z]}
            rotation={[0, rotationY, 0]}
            scale={isHovered ? 1.08 : 1.0}
            onPointerOver={() => setHoveredIdx(i)}
            onPointerOut={() => setHoveredIdx(null)}
            onClick={(e) => {
              e.stopPropagation();
              const full = PORTFOLIO_DATA.projects.find((p) => p.id === proj.id) || PORTFOLIO_DATA.projects[0];
              onSelectProject(full);
            }}
          >
            {/* Monitor Outer Chassis */}
            <RoundedBox args={[4.4, 2.9, 0.22]} radius={0.12} smoothness={4}>
              <meshStandardMaterial
                color={isHovered ? '#1A1A1A' : '#0E0E0E'}
                metalness={0.8}
                roughness={0.25}
              />
            </RoundedBox>

            {/* Glowing Golden Accent Bezel */}
            <lineSegments position={[0, 0, 0.12]}>
              <edgesGeometry args={[new THREE.PlaneGeometry(4.4, 2.9)]} />
              <lineBasicMaterial
                color={isHovered ? '#FFD60A' : '#555555'}
                transparent
                opacity={isHovered ? 1 : 0.4}
              />
            </lineSegments>

            {/* Screen Glass Face */}
            <mesh position={[0, 0, 0.12]}>
              <planeGeometry args={[4.1, 2.6]} />
              <meshBasicMaterial
                color={isHovered ? '#1F1E19' : '#141416'}
                transparent
                opacity={0.95}
              />
            </mesh>

            {/* Screen Content: Typography in 3D */}
            <group position={[0, 0, 0.16]}>
              {/* Top Bar */}
              <Text
                position={[-1.75, 1.0, 0]}
                fontSize={0.11}
                color="#FFD60A"
                anchorX="left"
                anchorY="middle"
              >
                {`/${proj.number} // ${proj.category}`}
              </Text>

              <Text
                position={[1.75, 1.0, 0]}
                fontSize={0.09}
                color={isHovered ? '#FFD60A' : '#888888'}
                anchorX="right"
                anchorY="middle"
              >
                {isHovered ? '● CLICK TO INSPECT SPEC' : 'HOVER TO EXPAND'}
              </Text>

              {/* Project Title */}
              <Text
                position={[-1.75, 0.5, 0]}
                fontSize={0.28}
                letterSpacing={-0.02}
                color="#FFFFFF"
                anchorX="left"
                anchorY="middle"
              >
                {proj.title}
              </Text>

              {/* Stack Chips Summary */}
              <Text
                position={[-1.75, 0.1, 0]}
                fontSize={0.13}
                color="#F2EFE6"
                anchorX="left"
                anchorY="middle"
              >
                {proj.stack}
              </Text>

              {/* Honest Metric Badge */}
              <group position={[0, -0.65, 0]}>
                <mesh>
                  <planeGeometry args={[3.8, 0.48]} />
                  <meshBasicMaterial color="#FFD60A" transparent opacity={isHovered ? 0.95 : 0.8} />
                </mesh>
                <Text
                  position={[0, 0, 0.02]}
                  fontSize={0.13}
                  color="#0E0E0E"
                  anchorX="center"
                  anchorY="middle"
                >
                  {`VERIFIED METRIC: ${proj.metric}`}
                </Text>
              </group>
            </group>
          </group>
        );
      })}
    </group>
  );
};
