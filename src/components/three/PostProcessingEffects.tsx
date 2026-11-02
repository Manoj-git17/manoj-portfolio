import React, { useMemo } from 'react';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

interface PostProcessingEffectsProps {
  enabled: boolean;
}

export const PostProcessingEffects: React.FC<PostProcessingEffectsProps> = ({ enabled }) => {
  // Near-zero chromatic aberration: crystal crisp typography without color fringe
  const aberrationOffset = useMemo(() => new THREE.Vector2(0.0002, 0.0002), []);

  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0}>
      {/* Signature Yellow Bloom */}
      <Bloom
        luminanceThreshold={0.55}
        luminanceSmoothing={0.7}
        intensity={0.9}
        mipmapBlur
      />
      {/* Subtle edge chromatic shift */}
      <ChromaticAberration
        offset={aberrationOffset}
        radialModulation
        modulationOffset={0.25}
      />
      {/* Editorial Analog Noise Grain at 3.2% */}
      <Noise opacity={0.032} />
      {/* Cinematic Vignette */}
      <Vignette offset={0.18} darkness={1.05} eskil={false} />
    </EffectComposer>
  );
};
