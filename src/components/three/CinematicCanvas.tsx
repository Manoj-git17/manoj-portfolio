import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { DarkRoomHero } from './DarkRoomHero';
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
    () => typeof window !== 'undefined' && window.innerWidth <= 768
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

  // On mobile: render nothing — hero uses CSS photo fallback, no heavy WebGL
  if (isMobile) return null;

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
        <PerspectiveCamera makeDefault position={[0, 0, 7.2]} fov={isMobile ? 55 : 44} />

        {/* Global Lights: clear, readable illumination even without cursor movement */}
        <ambientLight intensity={scrollProgress < 0.2 ? 0.75 : 0.7} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={scrollProgress < 0.2 ? 1.4 : 1.6}
          color="#FFF8E7"
          castShadow
        />
        <directionalLight
          position={[-5, 2, 3]}
          intensity={scrollProgress < 0.2 ? 0.9 : 1.2}
          color="#FFD60A"
        />
        {scrollProgress >= 0.2 && (
          <pointLight position={[0, 0, 2]} intensity={0.8} color="#FFD60A" />
        )}

        <Suspense fallback={null}>
          {/* CAMERA RIG FLYTHROUGH (Desktop / Full motion) */}
          {enableEffects ? (
            <CameraRig scrollProgress={scrollProgress} />
          ) : null}

          {/* ZONE 0: HERO (Dark 3D Room, Volumetric Torch, Rapier Physics 3D Text, Displaced Photo) */}
          <DarkRoomHero scrollProgress={scrollProgress} />

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
