import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeroDisplacedPhotoProps {
  torchPosRef: React.RefObject<THREE.Vector3>;
  torchTargetRef: React.RefObject<THREE.Vector3>;
  torchIntensityRef: React.RefObject<number>;
  isMobileOrReduced?: boolean;
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;

    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    vec4 mvPosition = viewMatrix * worldPosition;
    vViewPosition = -mvPosition.xyz;

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uColorMap;
  uniform vec3 uTorchPos;
  uniform vec3 uTorchTarget;
  uniform float uTorchIntensity;
  uniform vec3 uRimColor;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;

  void main() {
    // Sample texture at crisp, unwarped native UV coordinates
    vec4 color = texture2D(uColorMap, vUv);

    // Alpha test
    if (color.a < 0.01) discard;

    // 100% full, rich, natural studio illumination
    vec3 baseLight = vec3(1.0, 1.0, 1.0);

    // Torch Spotlight calculation: adds soft, warm highlight when torch sweeps over
    vec3 lightDir = normalize(vWorldPosition - uTorchPos);
    vec3 spotDir = normalize(uTorchTarget - uTorchPos);
    float spotAngle = dot(lightDir, spotDir);
    float spotFactor = smoothstep(0.80, 0.96, spotAngle);
    float dist = distance(vWorldPosition, uTorchPos);
    float attenuation = 1.0 / (1.0 + 0.04 * dist + 0.008 * dist * dist);
    float torchLight = spotFactor * attenuation * uTorchIntensity * 0.35;
    vec3 torchYellow = vec3(1.0, 0.92, 0.45) * torchLight;

    // Authentic silhouette rim light along outer edges
    float aL = texture2D(uColorMap, vUv + vec2(-0.0035, 0.0)).a;
    float aR = texture2D(uColorMap, vUv + vec2(0.0035, 0.0)).a;
    float aU = texture2D(uColorMap, vUv + vec2(0.0, 0.0035)).a;
    float aD = texture2D(uColorMap, vUv + vec2(0.0, -0.0035)).a;
    float edge = clamp(1.0 - (aL * aR * aU * aD), 0.0, 1.0);
    vec3 rimLight = uRimColor * edge * 0.45 * (0.6 + torchLight * 0.8);

    // Composite illumination: pristine natural image + warm highlight + elegant rim
    vec3 finalRgb = color.rgb * (baseLight + torchYellow) + rimLight;

    gl_FragColor = vec4(finalRgb, color.a);
  }
`;

export const HeroDisplacedPhoto: React.FC<HeroDisplacedPhotoProps> = ({
  torchPosRef,
  torchTargetRef,
  torchIntensityRef,
  isMobileOrReduced = false,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Damped pointer coordinates for parallax tilt
  const currentPointer = useRef(new THREE.Vector2(0, 0));

  // Load color texture with maximum anisotropic filtering for razor-sharp clarity
  const colorMap = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const color = loader.load('/me.png');
    color.colorSpace = THREE.SRGBColorSpace;
    color.generateMipmaps = true;
    color.minFilter = THREE.LinearMipmapLinearFilter;
    color.magFilter = THREE.LinearFilter;
    color.anisotropy = 16;
    return color;
  }, []);

  // Geometry: 3.33 width x 3.65 height (approx 60% of hero height)
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(3.33, 3.65);
  }, []);

  const uniforms = useMemo(
    () => ({
      uColorMap: { value: colorMap },
      uTorchPos: { value: new THREE.Vector3(0, 0, 5) },
      uTorchTarget: { value: new THREE.Vector3(0, 0, 0) },
      uTorchIntensity: { value: 1.0 },
      uRimColor: { value: new THREE.Color('#FFD60A') },
    }),
    [colorMap]
  );

  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    // Smoothly damp pointer parallax (max ~2.5 degrees tilt)
    const targetX = isMobileOrReduced ? 0 : state.pointer.x;
    const targetY = isMobileOrReduced ? 0 : state.pointer.y;
    const damp = 1 - Math.exp(-6.0 * delta);

    currentPointer.current.x += (targetX - currentPointer.current.x) * damp;
    currentPointer.current.y += (targetY - currentPointer.current.y) * damp;

    // Update shader uniforms
    if (torchPosRef.current) materialRef.current.uniforms.uTorchPos.value.copy(torchPosRef.current);
    if (torchTargetRef.current) materialRef.current.uniforms.uTorchTarget.value.copy(torchTargetRef.current);
    if (torchIntensityRef.current !== undefined) {
      materialRef.current.uniforms.uTorchIntensity.value = torchIntensityRef.current;
    }

    // Smooth 3D mesh tilt toward cursor
    if (!isMobileOrReduced) {
      meshRef.current.rotation.y = currentPointer.current.x * 0.045;
      meshRef.current.rotation.x = -currentPointer.current.y * 0.035;
      // Gentle floating levitation (+-3px)
      meshRef.current.position.y = -0.38 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });

  return (
    // Sized to ~60% height, positioned on the right side (X = 2.4, Y = -0.38, Z = 0.5)
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={[2.4, -0.38, 0.5]}
      castShadow
      receiveShadow
    >
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite
      />
    </mesh>
  );
};
