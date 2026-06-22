"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import * as THREE from "three";
import Atom from "./Atom";

interface BondProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  opacity?: number;
}

function Bond({ start, end, color, opacity = 0.3 }: BondProps) {
  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  const { quaternion, length } = useMemo(() => {
    const direction = new THREE.Vector3().subVectors(
      new THREE.Vector3(...end),
      new THREE.Vector3(...start)
    );
    const len = direction.length();
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return { quaternion: quat, length: len };
  }, [start, end]);

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.015, 0.015, length, 8]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

type AtomType = "A" | "B" | "O";

interface CrystalAtom {
  pos: [number, number, number];
  type: AtomType;
  phase: number;
}

function buildPerovskite(a: number): CrystalAtom[] {
  const atoms: CrystalAtom[] = [];
  const rnd = () => Math.random() * Math.PI * 2;

  // A-site (La): corners of 2×2×2 supercell
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++)
      for (let k = -1; k <= 1; k++)
        atoms.push({ pos: [i * a, j * a, k * a], type: "A", phase: rnd() });

  // B-site (Co): body centers
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
      for (let k = 0; k < 2; k++)
        atoms.push({
          pos: [(i * 2 - 1) * a * 0.5, (j * 2 - 1) * a * 0.5, (k * 2 - 1) * a * 0.5],
          type: "B",
          phase: rnd(),
        });

  // O-site: face centers — XY, XZ, YZ planes
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
      for (let k = -1; k <= 1; k++)
        atoms.push({
          pos: [(i * 2 - 1) * a * 0.5, (j * 2 - 1) * a * 0.5, k * a],
          type: "O",
          phase: rnd(),
        });

  for (let i = 0; i < 2; i++)
    for (let k = 0; k < 2; k++)
      for (let j = -1; j <= 1; j++)
        atoms.push({
          pos: [(i * 2 - 1) * a * 0.5, j * a, (k * 2 - 1) * a * 0.5],
          type: "O",
          phase: rnd(),
        });

  for (let j = 0; j < 2; j++)
    for (let k = 0; k < 2; k++)
      for (let i = -1; i <= 1; i++)
        atoms.push({
          pos: [i * a, (j * 2 - 1) * a * 0.5, (k * 2 - 1) * a * 0.5],
          type: "O",
          phase: rnd(),
        });

  return atoms;
}

interface PerovskiteCrystalProps {
  reducedMotion?: boolean;
}

export default function PerovskiteCrystal({ reducedMotion = false }: PerovskiteCrystalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const a = 2.5;
  const atoms = useMemo(() => buildPerovskite(a), []);
  const bondThreshold = a * 0.55;

  // Pre-calculate bonds (B-O only)
  const bonds = useMemo(() => {
    const result: { start: [number, number, number]; end: [number, number, number] }[] = [];
    const bAtoms = atoms.filter((at) => at.type === "B");
    const oAtoms = atoms.filter((at) => at.type === "O");

    bAtoms.forEach((b) => {
      oAtoms.forEach((o) => {
        const dx = b.pos[0] - o.pos[0];
        const dy = b.pos[1] - o.pos[1];
        const dz = b.pos[2] - o.pos[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < bondThreshold) {
          result.push({ start: b.pos, end: o.pos });
        }
      });
    });
    return result;
  }, [atoms, bondThreshold]);

  const colors = isDark
    ? { la: "#f5a623", co: "#c8d4e8", o: "#00d4ff", bond: "#00d4ff" }
    : { la: "#b45309", co: "#4a5568", o: "#0369a1", bond: "#0369a1" };

  useFrame((state) => {
    if (!groupRef.current) return;
    if (reducedMotion) return;

    const t = state.clock.elapsedTime;

    // Slow Y rotation
    groupRef.current.rotation.y += 0.003;

    // Subtle X oscillation
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;

    // Phonon breathing
    const breathe = 1 + Math.sin(t * 0.4) * 0.025;
    groupRef.current.scale.set(breathe, breathe, breathe);

    // Mouse parallax — shift the group slightly
    groupRef.current.position.x = state.pointer.x * 0.3;
    groupRef.current.position.y = state.pointer.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Atoms */}
      {atoms.map((atom, i) => {
        if (atom.type === "A") {
          return (
            <Atom
              key={`atom-${i}`}
              position={atom.pos}
              color={colors.la}
              radius={0.35}
              metalness={0.6}
              roughness={0.3}
              phase={atom.phase}
            />
          );
        }
        if (atom.type === "B") {
          return (
            <Atom
              key={`atom-${i}`}
              position={atom.pos}
              color={colors.co}
              radius={0.22}
              metalness={0.7}
              roughness={0.25}
              phase={atom.phase}
            />
          );
        }
        // O-site
        return (
          <Atom
            key={`atom-${i}`}
            position={atom.pos}
            color={colors.o}
            radius={0.15}
            metalness={0.3}
            roughness={0.4}
            emissive={colors.o}
            emissiveIntensity={0.4}
            phase={atom.phase}
          />
        );
      })}

      {/* B-O Bonds */}
      {bonds.map((bond, i) => (
        <Bond
          key={`bond-${i}`}
          start={bond.start}
          end={bond.end}
          color={colors.bond}
          opacity={isDark ? 0.3 : 0.2}
        />
      ))}
    </group>
  );
}
