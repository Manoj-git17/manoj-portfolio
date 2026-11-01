import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const TECH_TAGS = [
  'React 19',
  'FastAPI',
  'PostgreSQL',
  'Python',
  'Machine Learning',
  'Pandas',
  'SQLAlchemy',
  'C++',
  'Data Systems',
  'Star Schema',
  'ETL Pipelines',
  'Vite',
  'TypeScript',
  'Docker',
  'Pytest',
  'Tailwind CSS',
  'NumPy',
  'Scikit-Learn',
  'Valgrind',
  'Git',
  'Linux',
  'REST APIs',
  'EDA Profiler',
  '3NF Warehouse',
  'Data Profiling',
  'Classification Lab',
  'Algorithms',
  'Graph Traversal',
  'Deterministic',
  'AsyncIO',
  'Data Integrity',
  'Three.js',
  'Postprocessing',
  'Lenis Scroll',
  'GSAP',
  'Analytical Queries',
  'Z-Score Outliers',
  'Cross-Validation',
  'Memory Benchmarks',
  'SQL Queries',
  'Vector Math',
  'JSON ETL',
  'System Architecture',
  'State Machine',
  'Subagent Orbs',
  'CI Automation',
  'Pydantic',
  'Database Indexing',
];

interface TechTagsOrbitProps {
  scrollProgress: number;
}

export const TechTagsOrbit: React.FC<TechTagsOrbitProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Compute spherical coordinates confined to safe zone behind photo & orbiting the orb
  const tagsData = useMemo(() => {
    return TECH_TAGS.map((tag, i) => {
      // Golden spiral distribution on sphere
      const phi = Math.acos(-1 + (2 * i) / TECH_TAGS.length);
      const theta = Math.sqrt(TECH_TAGS.length * Math.PI) * phi;
      // Keep radius between 2.0 and 3.2, confined behind photo plane
      const radius = 2.0 + (i % 3) * 0.5;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi) * 0.75;
      // Push z backwards so all tags orbit behind photo (z negative)
      const z = -0.5 - Math.abs(radius * Math.cos(phi));

      const color = i % 4 === 0 ? '#FFD60A' : i % 2 === 0 ? '#F2EFE6' : '#9E9A8F';
      // Depth blur effect: farther tags have smaller font and lower opacity
      const isFar = z < -1.8;
      const fontSize = isFar ? 0.095 : 0.12;
      const opacity = isFar ? 0.38 : 0.75;

      return { tag, position: [x, y, z] as [number, number, number], color, fontSize, opacity };
    });
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    // Gentle orbit rotation around the orb
    groupRef.current.rotation.y += delta * 0.10;
    groupRef.current.rotation.x += delta * 0.03;

    // Fade out as camera travels into data tunnel
    const heroFactor = Math.max(0, 1 - scrollProgress * 4.5);
    groupRef.current.scale.setScalar(Math.max(0.001, heroFactor));
  });

  return (
    <group ref={groupRef} position={[-2.4, 0.4, -1.2]}>
      {tagsData.map((item, idx) => (
        <Billboard key={idx} position={item.position}>
          <Text
            fontSize={item.fontSize}
            color={item.color}
            anchorX="center"
            anchorY="middle"
            fillOpacity={item.opacity}
          >
            {item.tag}
          </Text>
        </Billboard>
      ))}
    </group>
  );
};
