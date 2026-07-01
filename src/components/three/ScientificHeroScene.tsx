"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Vec3 = [number, number, number];

interface BondProps {
  start: Vec3;
  end: Vec3;
  color: string;
  opacity?: number;
}

function Bond({ start, end, color, opacity = 0.24 }: BondProps) {
  const { midpoint, quaternion, length } = useMemo(() => {
    const startVector = new THREE.Vector3(...start);
    const endVector = new THREE.Vector3(...end);
    const direction = new THREE.Vector3().subVectors(endVector, startVector);
    return {
      midpoint: startVector.clone().add(endVector).multiplyScalar(0.5),
      quaternion: new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.clone().normalize()
      ),
      length: direction.length(),
    };
  }, [end, start]);

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.012, 0.012, length, 8]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} emissive={color} emissiveIntensity={0.18} />
    </mesh>
  );
}

function Atom({ position, color, radius }: { position: Vec3; color: string; radius: number }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.28}
        metalness={0.38}
        roughness={0.32}
      />
    </mesh>
  );
}

function Molecule({ position, type }: { position: Vec3; type: "h2" | "co2" | "ch4" }) {
  const atoms: { pos: Vec3; color: string; radius: number }[] =
    type === "h2"
      ? [
          { pos: [-0.22, 0, 0], color: "#dbeafe", radius: 0.08 },
          { pos: [0.22, 0, 0], color: "#dbeafe", radius: 0.08 },
        ]
      : type === "co2"
        ? [
            { pos: [-0.38, 0, 0], color: "#00d4ff", radius: 0.08 },
            { pos: [0, 0, 0], color: "#c8d4e8", radius: 0.12 },
            { pos: [0.38, 0, 0], color: "#00d4ff", radius: 0.08 },
          ]
        : [
            { pos: [0, 0, 0], color: "#c8d4e8", radius: 0.13 },
            { pos: [0.34, 0.22, 0], color: "#dbeafe", radius: 0.07 },
            { pos: [-0.34, 0.22, 0], color: "#dbeafe", radius: 0.07 },
            { pos: [0, -0.34, 0.28], color: "#dbeafe", radius: 0.07 },
            { pos: [0, -0.34, -0.28], color: "#dbeafe", radius: 0.07 },
          ];

  return (
    <group position={position}>
      {atoms.map((atom, index) => (
        <Atom key={`${type}-${index}`} position={atom.pos} color={atom.color} radius={atom.radius} />
      ))}
      {atoms.slice(1).map((atom, index) => (
        <Bond key={`${type}-bond-${index}`} start={atoms[0].pos} end={atom.pos} color="#7dd3fc" opacity={0.36} />
      ))}
    </group>
  );
}

function CatalystNetwork({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const atoms = useMemo(() => {
    const positions: Vec3[] = [];
    for (let x = -2; x <= 2; x++) {
      for (let y = -2; y <= 2; y++) {
        for (let z = -1; z <= 1; z++) {
          if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 5) continue;
          positions.push([x * 0.7, y * 0.52, z * 0.62]);
        }
      }
    }
    return positions;
  }, []);

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(260 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      const seed = i / 3 + 1;
      positions[i] = (fract(Math.sin(seed * 12.9898) * 43758.5453) - 0.5) * 12;
      positions[i + 1] = (fract(Math.sin(seed * 78.233) * 24634.6345) - 0.5) * 7;
      positions[i + 2] = (fract(Math.sin(seed * 37.719) * 13514.1357) - 0.5) * 7;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const bonds = useMemo(() => {
    const result: [Vec3, Vec3][] = [];
    for (let i = 0; i < atoms.length; i++) {
      for (let j = i + 1; j < atoms.length; j++) {
        const a = new THREE.Vector3(...atoms[i]);
        const b = new THREE.Vector3(...atoms[j]);
        if (a.distanceTo(b) < 0.9) result.push([atoms[i], atoms[j]]);
      }
    }
    return result;
  }, [atoms]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = time * 0.12 + state.pointer.x * 0.18;
    groupRef.current.rotation.x = Math.sin(time * 0.24) * 0.12 - state.pointer.y * 0.08;
    groupRef.current.position.x = state.pointer.x * 0.18;
    groupRef.current.position.y = state.pointer.y * 0.12;
    if (pointsRef.current) pointsRef.current.rotation.y = time * 0.025;
  });

  return (
    <>
      <points ref={pointsRef} geometry={particleGeometry}>
        <pointsMaterial color="#7dd3fc" size={0.018} transparent opacity={0.48} depthWrite={false} />
      </points>
      <group ref={groupRef} position={[1.4, -0.1, 0]} rotation={[0.1, -0.3, 0]}>
        <gridHelper args={[7, 24, "#00d4ff", "#244154"]} position={[0, -1.75, 0]} />
        <mesh position={[0, -1.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[6.2, 4.2, 1, 1]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.045} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.2, 0]}>
          <torusGeometry args={[2.7, 0.006, 8, 128]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.28} />
        </mesh>
        <mesh rotation={[Math.PI / 2.25, -0.45, 0.6]}>
          <torusGeometry args={[3.25, 0.006, 8, 128]} />
          <meshBasicMaterial color="#f5a623" transparent opacity={0.18} />
        </mesh>
        {atoms.map((position, index) => (
          <Atom
            key={index}
            position={position}
            color={index % 5 === 0 ? "#f5a623" : index % 3 === 0 ? "#a78bfa" : "#00d4ff"}
            radius={index % 5 === 0 ? 0.12 : 0.075}
          />
        ))}
        {bonds.map(([start, end], index) => (
          <Bond key={index} start={start} end={end} color="#00d4ff" opacity={0.18} />
        ))}
        <Molecule position={[-2.8, 1.25, 0.4]} type="co2" />
        <Molecule position={[2.65, 1, -0.7]} type="ch4" />
        <Molecule position={[0.4, -1.05, 1.7]} type="h2" />
      </group>
    </>
  );
}

function fract(value: number) {
  return value - Math.floor(value);
}

export default function ScientificHeroScene() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(0,212,255,0.16),transparent_38%),radial-gradient(circle_at_85%_70%,rgba(245,166,35,0.08),transparent_34%)]" />
      {visible && !reducedMotion && (
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          fallback={<div className="h-full w-full bg-[radial-gradient(circle_at_70%_35%,rgba(0,212,255,0.18),transparent_34%),radial-gradient(circle_at_55%_65%,rgba(245,166,35,0.08),transparent_30%)]" />}
        >
          <fog attach="fog" args={["#080c18", 7, 15]} />
          <ambientLight intensity={0.46} />
          <directionalLight position={[4, 5, 5]} intensity={1.2} />
          <pointLight position={[-4, 2, 3]} intensity={0.9} color="#00d4ff" />
          <pointLight position={[3, -2, 2]} intensity={0.55} color="#f5a623" />
          <Suspense fallback={null}>
            <CatalystNetwork reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
