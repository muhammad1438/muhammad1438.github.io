"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AtomProps {
  position: [number, number, number];
  color: string;
  radius: number;
  metalness?: number;
  roughness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  phase?: number;
}

export default function Atom({
  position,
  color,
  radius,
  metalness = 0.6,
  roughness = 0.3,
  emissive,
  emissiveIntensity = 0,
  phase = 0,
}: AtomProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.x = position[0] + Math.sin(t * 0.5 + phase) * 0.02;
    meshRef.current.position.y = position[1] + Math.cos(t * 0.4 + phase) * 0.02;
    meshRef.current.position.z = position[2] + Math.sin(t * 0.3 + phase) * 0.02;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        emissive={emissive || color}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}
