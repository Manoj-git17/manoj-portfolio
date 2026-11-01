import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

interface PostProcessingEffectsProps {
  enabled: boolean;
}

export const PostProcessingEffects: React.FC<PostProcessingEffectsProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0}>
      {/* Signature Yellow Bloom */}
      <Bloom
        luminanceThreshold={0.55}
        luminanceSmoothing={0.75}
        intensity={1.1}
        mipmapBlur
      />
      {/* Editorial Analog Noise Grain */}
      <Noise opacity={0.035} />
      {/* Cinematic Vignette */}
      <Vignette offset={0.22} darkness={0.7} eskil={false} />
    </EffectComposer>
  );
};
