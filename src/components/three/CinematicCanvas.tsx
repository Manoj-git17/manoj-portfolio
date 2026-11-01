import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { HeroLayeredPhoto } from './HeroLayeredPhoto';
import { LiquidMetalOrb } from './LiquidMetalOrb';
import { TechTagsOrbit } from './TechTagsOrbit';
import { YellowParticleDust } from './YellowParticleDust';
import { DataTunnelStream } from './DataTunnelStream';
import { ProjectsRing } from './ProjectsRing';
import { BarCity3D } from './BarCity3D';
import { SkillsSphere3D } from './SkillsSphere3D';
import { GiantHireMeButton3D } from './GiantHireMeButton3D';
import { CameraRig } from './CameraRig';
import { PostProcessingEffects } from './PostProcessingEffects';
import type { Project } from '../../data/portfolioData';

interface CinematicCanvasProps {
  onSelectProject: (project: Project) => void;
  onOpenHireMe?: () => void;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  onSelectProject,
  onOpenHireMe,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  const [reducedMotion] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [isTabVisible, setIsTabVisible] = useState<boolean>(
    () => typeof document !== 'undefined' && !document.hidden
  );

  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const total = document.documentElement.scrollHeight - window.innerHeight;
          if (total > 0) {
            setScrollProgress(Math.min(1, Math.max(0, window.scrollY / total)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enableEffects = !isMobile && !reducedMotion;

  return (
    <div
      className="fixed inset-0 w-full h-full z-0 overflow-hidden"
      style={{
        pointerEvents: 'auto',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      <Canvas
        frameloop={isTabVisible ? 'always' : 'never'}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={isMobile ? 55 : 45} />

        {/* Global Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 6]} intensity={1.6} color="#FFFFFF" castShadow />
        <directionalLight position={[-6, -2, -4]} intensity={1.2} color="#FFD60A" />
        <pointLight position={[0, 0, 2]} intensity={0.8} color="#FFD60A" />

        <Suspense fallback={null}>
          {/* CAMERA RIG FLYTHROUGH (Desktop / Full motion) */}
          {enableEffects ? (
            <CameraRig scrollProgress={scrollProgress} />
          ) : null}

          {/* ZONE 0: HERO (Huge Layered Photo, Liquid Metal Orb, Orbiting Tags, Yellow Dust) */}
          <HeroLayeredPhoto scrollProgress={scrollProgress} />
          <LiquidMetalOrb scrollProgress={scrollProgress} />
          <TechTagsOrbit scrollProgress={scrollProgress} />
          <YellowParticleDust count={enableEffects ? 110 : 40} />

          {/* ZONES 1 - 5: ONLY IN FULL 3D FLYTHROUGH MODE */}
          {enableEffects ? (
            <>
              {/* ZONE 1: Data Tunnel Stream (Hyperspace Dive) */}
              <DataTunnelStream scrollProgress={scrollProgress} />

              {/* ZONE 2: 3D Projects Ring Screens */}
              <ProjectsRing
                scrollProgress={scrollProgress}
                onSelectProject={onSelectProject}
              />

              {/* ZONE 3: 3D Bar City of Contributions */}
              <BarCity3D scrollProgress={scrollProgress} />

              {/* ZONE 4: Draggable 3D Skills Sphere */}
              <SkillsSphere3D scrollProgress={scrollProgress} />

              {/* ZONE 5: Giant 3D HIRE ME Button with Confetti */}
              <GiantHireMeButton3D
                scrollProgress={scrollProgress}
                onClick={onOpenHireMe}
              />

              {/* CINEMATIC POST-PROCESSING (Bloom, Grain Noise, Vignette) */}
              <PostProcessingEffects enabled={enableEffects} />
            </>
          ) : null}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CinematicCanvas;
