import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number; // 0 to 1
}

// Keyframe waypoints for camera flythrough
const WAYPOINTS = [
  { p: 0.0, pos: [0, 0, 7], look: [0, 0, 0] },
  { p: 0.18, pos: [-0.6, 0.1, -1], look: [0, 0, -10] },
  { p: 0.38, pos: [0, 0, -20], look: [0, -1.2, -28] },
  { p: 0.62, pos: [0, 2.8, -41], look: [0, -1.8, -48] },
  { p: 0.78, pos: [0, 0.5, -59], look: [0, 0, -68] },
  { p: 1.0, pos: [0, 0.2, -79], look: [0, -0.6, -88] },
];

export const CameraRig: React.FC<CameraRigProps> = ({ scrollProgress }) => {
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const cam = state.camera;
    // Find interpolation interval between waypoints
    const p = Math.min(1, Math.max(0, scrollProgress));
    let start = WAYPOINTS[0];
    let end = WAYPOINTS[WAYPOINTS.length - 1];

    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      if (p >= WAYPOINTS[i].p && p <= WAYPOINTS[i + 1].p) {
        start = WAYPOINTS[i];
        end = WAYPOINTS[i + 1];
        break;
      }
    }

    const range = end.p - start.p || 1;
    const factor = (p - start.p) / range;
    // Smooth cosine ease between waypoints
    const easedFactor = (1 - Math.cos(factor * Math.PI)) / 2;

    // Only apply subtle camera sway during the deep flythrough (p > 0.15), not in the hero where the photo handles localized parallax
    const cameraPointerInfluence = p > 0.15 ? Math.min(1, (p - 0.15) * 4) : 0;
    const targetPosX =
      start.pos[0] + (end.pos[0] - start.pos[0]) * easedFactor + (state.pointer.x * 0.25 * cameraPointerInfluence);
    const targetPosY =
      start.pos[1] + (end.pos[1] - start.pos[1]) * easedFactor + (state.pointer.y * 0.2 * cameraPointerInfluence);
    const targetPosZ = start.pos[2] + (end.pos[2] - start.pos[2]) * easedFactor;

    const targetLookX = start.look[0] + (end.look[0] - start.look[0]) * easedFactor;
    const targetLookY = start.look[1] + (end.look[1] - start.look[1]) * easedFactor;
    const targetLookZ = start.look[2] + (end.look[2] - start.look[2]) * easedFactor;

    // Smoothly damp camera position
    cam.position.x += (targetPosX - cam.position.x) * (delta * 4.5);
    cam.position.y += (targetPosY - cam.position.y) * (delta * 4.5);
    cam.position.z += (targetPosZ - cam.position.z) * (delta * 4.5);

    // Smoothly damp lookAt target
    currentLookAt.current.x += (targetLookX - currentLookAt.current.x) * (delta * 4.5);
    currentLookAt.current.y += (targetLookY - currentLookAt.current.y) * (delta * 4.5);
    currentLookAt.current.z += (targetLookZ - currentLookAt.current.z) * (delta * 4.5);

    cam.lookAt(currentLookAt.current);
  });

  return null;
};
