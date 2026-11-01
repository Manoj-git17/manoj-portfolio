import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { DataCoreScene } from './DataCoreScene';
import { YellowParticleDust } from './YellowParticleDust';

export const ThreeHeroCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [reducedMotion] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // For users with reduced motion, render a subtle static fallback
  if (reducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="w-full h-full pointer-events-auto"
      >
        <PerspectiveCamera
          makeDefault
          position={[0, 0, isMobile ? 8.2 : 6.8]}
          fov={isMobile ? 50 : 45}
        />

        {/* Ambient & Directional Lighting calibrated to #0E0E0E / #FFD60A */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#FFFFFF"
        />
        <directionalLight
          position={[-6, -4, -3]}
          intensity={0.9}
          color="#FFD60A"
        />
        <pointLight
          position={[0, 0, 3]}
          intensity={1.2}
          color="#FFD60A"
          distance={10}
        />

        <Suspense fallback={null}>
          <DataCoreScene />
          <YellowParticleDust count={isMobile ? 40 : 90} />
          {/* Subtle reflection environment */}
          <Environment preset="city" environmentIntensity={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeHeroCanvas;
