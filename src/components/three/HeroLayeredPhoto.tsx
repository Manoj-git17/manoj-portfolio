import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroLayeredPhotoProps {
  scrollProgress: number; // 0 to 1
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D uTexture;
  uniform float uGlitch;
  uniform float uOpacity;
  uniform vec3 uRimColor;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  void main() {
    vec2 uv = vUv;
    
    // Subtle chromatic aberration: ONLY when uGlitch > 0.00001
    vec4 texColor;
    if (uGlitch > 0.00001) {
      vec4 colR = texture2D(uTexture, uv + vec2(uGlitch, 0.0));
      vec4 colG = texture2D(uTexture, uv);
      vec4 colB = texture2D(uTexture, uv - vec2(uGlitch, 0.0));
      texColor = vec4(colR.r, colG.g, colB.b, colG.a);
    } else {
      texColor = texture2D(uTexture, uv);
    }

    // Discard fully transparent pixels
    if (texColor.a < 0.05) discard;

    // Steady, stable yellow rim light around silhouettes
    vec3 viewDir = normalize(vViewPosition);
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    rim = smoothstep(0.55, 0.95, rim) * 0.42;

    vec3 finalColor = texColor.rgb + uRimColor * rim;

    // Gradient mask to fade bottom edge smoothly into marquee
    float bottomFade = smoothstep(0.0, 0.16, uv.y);
    float finalAlpha = texColor.a * bottomFade * uOpacity;
    if (finalAlpha < 0.02) discard;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

export const HeroLayeredPhoto: React.FC<HeroLayeredPhotoProps> = ({ scrollProgress }) => {
  // Parent group for scroll transformations (entrance/exit)
  const scrollGroupRef = useRef<THREE.Group>(null);
  // Child group for damped, bounded mouse parallax ONLY
  const parallaxGroupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // References for zero-allocation state tracking
  const textureRef = useRef<THREE.Texture | null>(null);
  const glitchTriggerTime = useRef<number>(-9999);
  const opacityRef = useRef<number>(0);
  const isTouchOrReduced = useRef<boolean>(false);

  // Damped interpolation state (stores current position/rotation)
  const currentParallax = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  // Memoize all geometries to avoid recreating on renders
  const photoGeo = useMemo(() => new THREE.PlaneGeometry(5.6, 6.2), []);
  const backplateGeo = useMemo(() => new THREE.PlaneGeometry(4.2, 5.8), []);
  const backplateEdges = useMemo(() => new THREE.EdgesGeometry(backplateGeo), [backplateGeo]);
  const glowDiscGeo = useMemo(() => new THREE.CircleGeometry(2.8, 32), []);

  const badge1Geo = useMemo(() => new THREE.PlaneGeometry(2.7, 0.52), []);
  const badge1Edges = useMemo(() => new THREE.EdgesGeometry(badge1Geo), [badge1Geo]);

  const codeCardGeo = useMemo(() => new THREE.PlaneGeometry(3.2, 1.3), []);
  const codeCardEdges = useMemo(() => new THREE.EdgesGeometry(codeCardGeo), [codeCardGeo]);

  const badge2Geo = useMemo(() => new THREE.PlaneGeometry(2.5, 0.52), []);
  const badge2Edges = useMemo(() => new THREE.EdgesGeometry(badge2Geo), [badge2Geo]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: null as THREE.Texture | null },
      uGlitch: { value: 0 },
      uOpacity: { value: 0 },
      uRimColor: { value: new THREE.Color('#FFD60A') },
    }),
    []
  );

  // Check reduced motion & mobile/touch capabilities
  useEffect(() => {
    const checkMotion = () => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 1024;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      isTouchOrReduced.current = isTouch || isReduced;
    };

    checkMotion();
    window.addEventListener('resize', checkMotion, { passive: true });
    return () => window.removeEventListener('resize', checkMotion);
  }, []);

  // Preload and cache texture cleanly
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      '/me.png',
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        textureRef.current = tex;
        if (materialRef.current) {
          materialRef.current.uniforms.uTexture.value = tex;
        }
      },
      undefined,
      (err) => console.error('Error loading /me.png texture:', err)
    );
  }, []);

  // Trigger glitch only on hover/click, max 300ms duration
  const triggerGlitch = () => {
    if (isTouchOrReduced.current) return;
    const now = performance.now();
    // Allow trigger if previous glitch has completed
    if (now - glitchTriggerTime.current > 350) {
      glitchTriggerTime.current = now;
    }
  };

  useFrame((state, delta) => {
    if (!scrollGroupRef.current || !parallaxGroupRef.current) return;

    // 1. SCROLL VISIBILITY & POSITIONING (Parent Group ONLY)
    const heroFade = Math.max(0, 1 - scrollProgress * 4.5);
    scrollGroupRef.current.visible = heroFade > 0.001;
    if (!scrollGroupRef.current.visible) return;

    // Vertical fly-out as user scrolls past hero
    scrollGroupRef.current.position.y = -0.3 + (1 - heroFade) * 3.5;
    scrollGroupRef.current.scale.setScalar(Math.max(0.001, heroFade));

    // 2. SMOOTH FADE-IN
    if (textureRef.current && opacityRef.current < 1) {
      opacityRef.current = Math.min(1, opacityRef.current + delta * 3.0);
      if (materialRef.current) {
        materialRef.current.uniforms.uOpacity.value = opacityRef.current;
      }
    }

    // 3. GLITCH PULSE (Max 300ms, then settles back to exact 0)
    let glitchValue = 0;
    const elapsedGlitch = performance.now() - glitchTriggerTime.current;
    if (elapsedGlitch >= 0 && elapsedGlitch < 300) {
      const progress = elapsedGlitch / 300; // 0 to 1
      // Smooth bell curve, zero at start, peaks at ~120ms, settles cleanly to 0
      glitchValue = Math.sin(progress * Math.PI) * Math.pow(1 - progress, 1.2) * 0.0035;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uGlitch.value = glitchValue;
    }

    // 4. BOUNDED, DAMPED MOUSE PARALLAX (Child Group ONLY)
    if (isTouchOrReduced.current) {
      // Keep completely still on touch/reduced motion
      parallaxGroupRef.current.position.set(0, 0, 0);
      parallaxGroupRef.current.rotation.set(0, 0, 0);
      return;
    }

    // Dead zone: ignore mouse movements within center deadband (0.05)
    const pointerDist = Math.hypot(state.pointer.x, state.pointer.y);
    const deadZone = 0.05;
    let normX = 0;
    let normY = 0;

    if (pointerDist > deadZone) {
      const scale = (pointerDist - deadZone) / (1 - deadZone);
      normX = (state.pointer.x / pointerDist) * scale;
      normY = (state.pointer.y / pointerDist) * scale;
    }

    // Cap movement to small range: max ~12px (~0.075 units) and ~4deg (~0.065 rad)
    const targetX = Math.max(-0.075, Math.min(0.075, normX * 0.075));
    const targetY = Math.max(-0.055, Math.min(0.055, normY * 0.055));
    const targetRotY = Math.max(-0.065, Math.min(0.065, normX * 0.065));
    const targetRotX = Math.max(-0.045, Math.min(0.045, -normY * 0.045));

    // Frame-rate independent damped interpolation (~0.10 damp factor)
    const dampFactor = 1 - Math.exp(-6.5 * delta);
    currentParallax.current.x += (targetX - currentParallax.current.x) * dampFactor;
    currentParallax.current.y += (targetY - currentParallax.current.y) * dampFactor;
    currentParallax.current.rotX += (targetRotX - currentParallax.current.rotX) * dampFactor;
    currentParallax.current.rotY += (targetRotY - currentParallax.current.rotY) * dampFactor;

    parallaxGroupRef.current.position.x = currentParallax.current.x;
    parallaxGroupRef.current.position.y = currentParallax.current.y;
    parallaxGroupRef.current.rotation.x = currentParallax.current.rotX;
    parallaxGroupRef.current.rotation.y = currentParallax.current.rotY;
  });

  return (
    // Outer group: Handles scroll entrance / exit translation and scale
    <group ref={scrollGroupRef} position={[2.4, -0.3, 0]}>
      {/* Inner group: Handles subtle, bounded mouse parallax with zero coordinate conflicts */}
      <group ref={parallaxGroupRef}>
        {/* LAYER 1: FURTHEST BACK (Z = -2.2) - Giant Outlined "MANOJ." Depth Typography */}
        <group position={[-1.2, 1.2, -2.2]}>
          <Text
            fontSize={2.6}
            letterSpacing={-0.04}
            color="#1A1A1A"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#FFD60A"
            outlineOpacity={0.8}
          >
            MANOJ.
          </Text>
          <Text
            position={[0.08, -0.08, -0.1]}
            fontSize={2.6}
            letterSpacing={-0.04}
            color="#0E0E0E"
            anchorX="center"
            anchorY="middle"
          >
            MANOJ.
          </Text>
        </group>

        {/* LAYER 2: BEHIND PHOTO (Z = -0.8) - Glowing Yellow Editorial Backplate & Halos */}
        <group position={[0.2, 0.1, -0.8]}>
          {/* Angled Yellow Neon Backplate */}
          <mesh geometry={backplateGeo} rotation={[0, 0, -0.06]}>
            <meshBasicMaterial
              color="#FFD60A"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Golden Outline Frame */}
          <lineSegments geometry={backplateEdges} rotation={[0, 0, -0.06]}>
            <lineBasicMaterial color="#FFD60A" transparent opacity={0.6} />
          </lineSegments>

          {/* Subtle Golden Glow Disc */}
          <mesh geometry={glowDiscGeo} position={[0.2, 0.4, -0.1]}>
            <meshBasicMaterial
              color="#FFD60A"
              transparent
              opacity={0.08}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* LAYER 3: MIDDLE LAYER (Z = 0.2) - Huge Cutout Photo with Parallax & Glitch */}
        <mesh
          geometry={photoGeo}
          position={[0, 0, 0.2]}
          onPointerEnter={triggerGlitch}
          onClick={triggerGlitch}
        >
          <shaderMaterial
            ref={materialRef}
            uniforms={uniforms}
            vertexShader={VERTEX_SHADER}
            fragmentShader={FRAGMENT_SHADER}
            transparent
            side={THREE.DoubleSide}
            depthWrite
          />
        </mesh>

        {/* LAYER 4: IN FRONT OF PHOTO - Floating 3D Code & UI Chips */}
        {/* Top-Left Status Pill in front of shoulder */}
        <Float speed={2.5} rotationIntensity={0.15} floatIntensity={0.35}>
          <group position={[-2.4, 2.1, 1.2]}>
            <mesh geometry={badge1Geo}>
              <meshBasicMaterial color="#0E0E0E" />
            </mesh>
            <lineSegments geometry={badge1Edges}>
              <lineBasicMaterial color="#FFD60A" transparent opacity={0.85} />
            </lineSegments>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.125}
              color="#FFD60A"
              anchorX="center"
              anchorY="middle"
            >
              ● CORE // 100% DETERMINISTIC
            </Text>
          </group>
        </Float>

        {/* Mid-Left Code Snippet Card: Solid Dark Background & Completely Unclipped Lines */}
        <Float speed={2.8} rotationIntensity={0.18} floatIntensity={0.4}>
          <group position={[-3.1, 0.35, 1.1]}>
            <mesh geometry={codeCardGeo}>
              <meshBasicMaterial color="#0A0A0D" />
            </mesh>
            <lineSegments geometry={codeCardEdges}>
              <lineBasicMaterial color="#FFD60A" transparent opacity={0.4} />
            </lineSegments>
            <Text
              position={[-1.4, 0.42, 0.05]}
              fontSize={0.12}
              color="#FFD60A"
              anchorX="left"
              anchorY="middle"
            >
              const engineer = "MANOJ";
            </Text>
            <Text
              position={[-1.4, 0.20, 0.05]}
              fontSize={0.105}
              color="#FFFFFF"
              anchorX="left"
              anchorY="middle"
            >
              role: "AI & Data Systems";
            </Text>
            <Text
              position={[-1.4, -0.02, 0.05]}
              fontSize={0.10}
              color="#E0DDD5"
              anchorX="left"
              anchorY="middle"
            >
              stack: [FastAPI, React19, Postgres];
            </Text>
            <Text
              position={[-1.4, -0.24, 0.05]}
              fontSize={0.095}
              color="#9E9A8F"
              anchorX="left"
              anchorY="middle"
            >
              loc: "Bengaluru, Karnataka, India";
            </Text>
            <Text
              position={[-1.4, -0.45, 0.05]}
              fontSize={0.095}
              color="#FFD60A"
              anchorX="left"
              anchorY="middle"
            >
              status: "Available Summer 2027";
            </Text>
          </group>
        </Float>

        {/* Bottom Floating Benchmark Badge: Anchored at photo's lower-left corner */}
        <Float speed={2.0} rotationIntensity={0.12} floatIntensity={0.3}>
          <group position={[-2.3, -2.4, 0.9]}>
            <mesh geometry={badge2Geo}>
              <meshBasicMaterial color="#FFD60A" />
            </mesh>
            <lineSegments geometry={badge2Edges}>
              <lineBasicMaterial color="#0E0E0E" transparent opacity={0.8} />
            </lineSegments>
            <Text
              position={[0, 0, 0.05]}
              fontSize={0.12}
              color="#0E0E0E"
              anchorX="center"
              anchorY="middle"
            >
              38/38 PYTESTS PASS // CI 100%
            </Text>
          </group>
        </Float>
      </group>
    </group>
  );
};
