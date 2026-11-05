import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text3D, Text, MeshReflectorMaterial, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import { HeroDisplacedPhoto } from './HeroDisplacedPhoto';

interface DarkRoomHeroProps {
  scrollProgress: number;
}

// Letter definitions with exact metrics
const LETTERS_DATA = [
  { char: 'M', homeX: -3.95, width: 0.88 },
  { char: 'A', homeX: -3.07, width: 0.83 },
  { char: 'N', homeX: -2.24, width: 0.74 },
  { char: 'O', homeX: -1.51, width: 0.85 },
  { char: 'J', homeX: -0.66, width: 0.59 },
  { char: '.', homeX: -0.07, width: 0.24 },
];

const HOME_Y = 0.40;
const HOME_Z = 0.10;

// Deep background tech tags floating far back in safe zones
const BACKGROUND_TAGS = [
  { text: 'PYTHON', pos: [-6.8, 4.0, -8.0] as [number, number, number] },
  { text: 'FASTAPI', pos: [-3.8, 4.5, -8.5] as [number, number, number] },
  { text: 'MACHINE LEARNING', pos: [0.0, 4.7, -8.5] as [number, number, number] },
  { text: 'POSTGRESQL', pos: [3.8, 4.5, -8.5] as [number, number, number] },
  { text: 'ETL PIPELINES', pos: [6.8, 4.0, -8.0] as [number, number, number] },
  { text: 'DATA MODELING', pos: [-6.4, -0.8, -7.5] as [number, number, number] },
  { text: 'C++ SYSTEMS', pos: [6.2, -0.8, -7.5] as [number, number, number] },
];

/* -------------------------------------------------------------------------- */
/* 300 SOFT ROUND YELLOW DUST PARTICLES (Canvas radial blur texture)          */
/* -------------------------------------------------------------------------- */
const DUST_COUNT = 300;

function seededRandom(s: number) {
  const x = Math.sin(s) * 10000;
  return x - Math.floor(x);
}

function createCircleTexture() {
  if (typeof document === 'undefined') return new THREE.Texture();
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.35, 'rgba(255, 214, 10, 0.85)');
  gradient.addColorStop(0.7, 'rgba(255, 214, 10, 0.25)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function FloatingDust300() {
  const pointsRef = useRef<THREE.Points>(null);
  const circleTexture = useMemo(() => createCircleTexture(), []);

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const init = new Float32Array(DUST_COUNT * 3);
    let seed = 42;
    for (let i = 0; i < DUST_COUNT; i++) {
      const x = (seededRandom(seed++) - 0.5) * 22;
      const y = seededRandom(seed++) * 8 - 1.5;
      const z = (seededRandom(seed++) - 0.5) * 14 - 1;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;
    }
    return [pos, init];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.25;
    const array = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;

    for (let i = 0; i < DUST_COUNT; i++) {
      const i3 = i * 3;
      array[i3] = initialPositions[i3] + Math.sin(t + i * 0.1) * 0.35;
      array[i3 + 1] = initialPositions[i3 + 1] + Math.cos(t * 0.8 + i * 0.05) * 0.25;
      array[i3 + 2] = initialPositions[i3 + 2] + Math.sin(t * 0.5 + i * 0.08) * 0.2;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        color="#FFD60A"
        size={0.075}
        transparent
        opacity={0.65}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/* VOLUMETRIC LIGHT CONE GEOMETRY                                             */
/* -------------------------------------------------------------------------- */
const VOLUMETRIC_VERTEX = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const VOLUMETRIC_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    float edge = 1.0 - abs(vNormal.z);
    float glow = pow(edge, 2.5) * 0.18 * uIntensity;
    gl_FragColor = vec4(uColor, glow);
  }
`;

/* -------------------------------------------------------------------------- */
/* STEP 4: INTERACTIVE 3D LETTERS WITH SPRING PHYSICS & CLICK EXPLOSION       */
/* -------------------------------------------------------------------------- */
interface PhysicsState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rx: number;
  ry: number;
  rz: number;
  avx: number;
  avy: number;
  avz: number;
}

function InteractiveLetters({ isMobileOrReduced }: { isMobileOrReduced: boolean }) {
  const letterRefs = useRef<(THREE.Group | null)[]>([]);
  const { viewport } = useThree();

  // Individual physics state for each letter
  const physicsStates = useRef<PhysicsState[]>(
    LETTERS_DATA.map((item) => ({
      x: item.homeX,
      y: HOME_Y,
      z: HOME_Z,
      vx: 0,
      vy: 0,
      vz: 0,
      rx: 0,
      ry: 0,
      rz: 0,
      avx: 0,
      avy: 0,
      avz: 0,
    }))
  );

  // Explode letters on click anywhere
  const explode = useCallback(() => {
    if (isMobileOrReduced) return;
    physicsStates.current.forEach((st) => {
      st.vx += (Math.random() - 0.5) * 10.0;
      st.vy += Math.random() * 7.0 + 3.0;
      st.vz += (Math.random() - 0.5) * 6.0;
      st.avx += (Math.random() - 0.5) * 8.0;
      st.avy += (Math.random() - 0.5) * 10.0;
      st.avz += (Math.random() - 0.5) * 8.0;
    });
  }, [isMobileOrReduced]);

  // Global click listener for explosion
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('input')) {
        return;
      }
      explode();
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [explode]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * 1.5) * 0.026;

    // Pointer coordinates in world space
    const pointerWorldX = state.pointer.x * (viewport.width * 0.42);
    const pointerWorldY = state.pointer.y * (viewport.height * 0.35) + 0.4;

    // Subtle baseline tilt
    const targetTiltX = -state.pointer.y * 0.035;
    const targetTiltY = state.pointer.x * 0.045;

    LETTERS_DATA.forEach((item, idx) => {
      const grp = letterRefs.current[idx];
      const st = physicsStates.current[idx];
      if (!grp || !st) return;

      if (!isMobileOrReduced) {
        // 1. Cursor interaction: soft push when cursor nears the letter
        const dxP = st.x - pointerWorldX;
        const dyP = st.y - pointerWorldY;
        const distP = Math.sqrt(dxP * dxP + dyP * dyP);
        if (distP < 1.1) {
          const push = (1.1 - distP) * 3.5;
          st.vx += (dxP / (distP + 0.01)) * push * dt;
          st.vy += (dyP / (distP + 0.01)) * push * dt;
          st.vz += -push * 0.6 * dt;
          st.avy += dxP * push * 2.0 * dt;
          st.avx += -dyP * push * 2.0 * dt;
        }

        // 2. Restorative Hooke spring to home position
        const targetX = item.homeX;
        const targetY = HOME_Y + floatY;
        const targetZ = HOME_Z;

        const spring = 32.0;
        const damp = 6.8;

        st.vx += ((targetX - st.x) * spring - st.vx * damp) * dt;
        st.vy += ((targetY - st.y) * spring - st.vy * damp) * dt;
        st.vz += ((targetZ - st.z) * spring - st.vz * damp) * dt;

        st.x += st.vx * dt;
        st.y += st.vy * dt;
        st.z += st.vz * dt;

        // 3. Restorative rotational spring
        const rotSpring = 26.0;
        const rotDamp = 6.0;

        st.avx += ((targetTiltX - st.rx) * rotSpring - st.avx * rotDamp) * dt;
        st.avy += ((targetTiltY - st.ry) * rotSpring - st.avy * rotDamp) * dt;
        st.avz += (-st.rz * rotSpring - st.avz * rotDamp) * dt;

        st.rx += st.avx * dt;
        st.ry += st.avy * dt;
        st.rz += st.avz * dt;

        grp.position.set(st.x, st.y, st.z);
        grp.rotation.set(st.rx, st.ry, st.rz);
      } else {
        // Mobile / reduced motion fallback: serene slow float
        grp.position.set(item.homeX, HOME_Y + floatY, HOME_Z);
        grp.rotation.set(targetTiltX, targetTiltY, 0);
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {LETTERS_DATA.map((item, index) => (
        <group
          key={item.char}
          ref={(r) => {
            letterRefs.current[index] = r;
          }}
          position={[item.homeX, HOME_Y, HOME_Z]}
          scale={[0.76, 0.96, 1.0]}
          onClick={explode}
        >
          {/* Main 3D Extruded Letter */}
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={1.02}
            height={0.26}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.035}
            bevelSize={0.022}
            bevelSegments={4}
          >
            {item.char}
            <meshPhysicalMaterial
              color="#FFD60A"
              emissive="#FFD60A"
              emissiveIntensity={0.12}
              metalness={0.42}
              roughness={0.18}
              clearcoat={0.9}
              clearcoatRoughness={0.1}
              reflectivity={1.0}
            />
          </Text3D>

          {/* Soft downward reflection of the individual letter */}
          <group position={[0, -0.04, 0]} scale={[1, -0.32, 1]}>
            <Text3D
              font="/fonts/helvetiker_bold.typeface.json"
              size={1.02}
              height={0.1}
              curveSegments={8}
            >
              {item.char}
              <meshBasicMaterial color="#FFD60A" transparent opacity={0.12} />
            </Text3D>
          </group>
        </group>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN DARK ROOM HERO COMPONENT                                              */
/* -------------------------------------------------------------------------- */
export const DarkRoomHero: React.FC<DarkRoomHeroProps> = ({ scrollProgress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Device & reduced motion detection
  const [isMobileOrReduced, setIsMobileOrReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isMobile || isReduced;
  });

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsMobileOrReduced(isMobile || isReduced);
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Entrance choreography state
  const entranceProgress = useRef(0);
  const torchIntensity = useRef(0);
  const [hasEntered, setHasEntered] = useState(false);

  // Spotlight position & target refs
  const torchPosRef = useRef(new THREE.Vector3(0, 3.2, 5.2));
  const torchTargetRef = useRef(new THREE.Vector3(0, 0, -1.0));
  const spotLightRef = useRef<any>(null);
  const lightConeRef = useRef<THREE.Mesh>(null);
  const coneMaterialRef = useRef<THREE.ShaderMaterial>(null);

  // Volumetric beam shader uniforms
  const beamUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#FFD60A') },
      uIntensity: { value: 0 },
    }),
    []
  );

  // Entrance trigger after loading counter
  useEffect(() => {
    if (hasEntered) return;
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 1050);
    return () => clearTimeout(timer);
  }, [hasEntered]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Visibility curve: only render while in or transitioning from hero (p < 0.22)
    const heroFactor = Math.max(0, 1 - scrollProgress * 5.0);
    groupRef.current.visible = heroFactor > 0.001;
    if (!groupRef.current.visible) return;

    // Vertical exit translation as user scrolls into case studies
    groupRef.current.position.y = (1 - heroFactor) * 4.0;
    groupRef.current.scale.setScalar(Math.max(0.001, heroFactor));

    // Entrance interpolation: torch turns on smoothly
    if (hasEntered && entranceProgress.current < 1.0) {
      entranceProgress.current = Math.min(1.0, entranceProgress.current + delta * 1.8);
      torchIntensity.current = entranceProgress.current * 3.5;
    }

    // Spotlight cursor follow with smooth damped lerp
    const damp = 1 - Math.exp(-6.5 * delta);
    const targetTorchX = state.pointer.x * (viewport.width * 0.42);
    const targetTorchY = state.pointer.y * (viewport.height * 0.35) + 1.2;

    torchPosRef.current.x += (targetTorchX - torchPosRef.current.x) * damp;
    torchPosRef.current.y += (targetTorchY - torchPosRef.current.y) * damp;

    // Spotlight target aims directly at the letter plane / cursor projection
    const targetLookX = state.pointer.x * (viewport.width * 0.38);
    const targetLookY = state.pointer.y * (viewport.height * 0.30) - 0.2;
    torchTargetRef.current.x += (targetLookX - torchTargetRef.current.x) * damp;
    torchTargetRef.current.y += (targetLookY - torchTargetRef.current.y) * damp;

    if (spotLightRef.current) {
      spotLightRef.current.position.copy(torchPosRef.current);
      spotLightRef.current.target.position.copy(torchTargetRef.current);
      spotLightRef.current.intensity = torchIntensity.current;
    }

    // Update volumetric light cone orientation and scale
    if (lightConeRef.current) {
      lightConeRef.current.position.copy(torchPosRef.current);
      lightConeRef.current.lookAt(torchTargetRef.current);
      if (coneMaterialRef.current) {
        coneMaterialRef.current.uniforms.uIntensity.value = entranceProgress.current;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. ROOM REFLECTIVE FLOOR */}
      <mesh position={[0, -1.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mirror={0.65}
          mixBlur={0.8}
          mixStrength={2.4}
          roughness={0.22}
          metalness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#08080a"
        />
      </mesh>

      {/* 2. DUST PARTICLES (300 soft round floating particles) */}
      <FloatingDust300 />

      {/* 3. VOLUMETRIC TORCH SPOTLIGHT (adds highlight without hiding content) */}
      <SpotLight
        ref={spotLightRef}
        color="#FFD60A"
        intensity={0}
        angle={0.48}
        penumbra={0.65}
        attenuation={5.0}
        distance={22}
        castShadow
      />

      {/* Volumetric cone light beam visualization */}
      <mesh ref={lightConeRef} position={[0, 3.2, 5.2]}>
        <coneGeometry args={[1.6, 7.5, 32, 1, true]} />
        <shaderMaterial
          ref={coneMaterialRef}
          vertexShader={VOLUMETRIC_VERTEX}
          fragmentShader={VOLUMETRIC_FRAGMENT}
          uniforms={beamUniforms}
          transparent
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 4. 3D DISPLACED PHOTO MESH (Standing in front of letters at Z = 0.5) */}
      <HeroDisplacedPhoto
        torchPosRef={torchPosRef}
        torchTargetRef={torchTargetRef}
        torchIntensityRef={torchIntensity}
        isMobileOrReduced={isMobileOrReduced}
      />

      {/* 5. DEEP BACKGROUND FLOATING TECH TAGS (Safe positions, never intersecting text) */}
      <group position={[0, 0, 0]}>
        {BACKGROUND_TAGS.map((tag, i) => (
          <Text
            key={i}
            position={tag.pos}
            fontSize={0.22}
            color="#FFD60A"
            fillOpacity={0.26}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            {tag.text}
          </Text>
        ))}
      </group>

      {/* Dedicated warm lighting for letters */}
      <directionalLight position={[-1.5, 3.0, 4.0]} intensity={2.6} color="#FFF8E7" />
      <pointLight position={[2.0, 1.5, 3.0]} intensity={1.5} color="#FFD60A" distance={8} />

      {/* 6. STEP 4: INTERACTIVE 3D LETTERS "MANOJ." WITH SPRING PHYSICS & CLICK EXPLOSION */}
      <InteractiveLetters isMobileOrReduced={isMobileOrReduced} />
    </group>
  );
};
