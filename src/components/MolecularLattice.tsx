"use client";

import React, { useEffect, useRef } from "react";

type AtomType = "A" | "B" | "O"; // La (gold), Co (silver), O (cyan)

interface Atom {
  bx: number;
  by: number;
  bz: number;
  type: AtomType;
  phase: number;
}

// Perovskite ABO₃ 2×2×2 supercell centered at origin
// Unit cell size a = 75 canvas units
function buildPerovskite(a: number): Atom[] {
  const atoms: Atom[] = [];
  const rnd = () => Math.random() * Math.PI * 2;

  // A-site (La): all corners of 2×2×2 supercell
  // i,j,k ∈ {-1, 0, 1} → positions at multiples of a
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++)
      for (let k = -1; k <= 1; k++)
        atoms.push({ bx: i * a, by: j * a, bz: k * a, type: "A", phase: rnd() });

  // B-site (Co): body centers of 8 unit cells
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
      for (let k = 0; k < 2; k++)
        atoms.push({
          bx: (i * 2 - 1) * a * 0.5,
          by: (j * 2 - 1) * a * 0.5,
          bz: (k * 2 - 1) * a * 0.5,
          type: "B",
          phase: rnd(),
        });

  // O-site: face centers — XY, XZ, YZ planes
  // XY faces: (i+½)*a, (j+½)*a, k*a  for i,j ∈ {-1,0}, k ∈ {-1,0,1}
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 2; j++)
      for (let k = -1; k <= 1; k++)
        atoms.push({
          bx: (i * 2 - 1) * a * 0.5,
          by: (j * 2 - 1) * a * 0.5,
          bz: k * a,
          type: "O",
          phase: rnd(),
        });

  // XZ faces: (i+½)*a, j*a, (k+½)*a  for i,k ∈ {-1,0}, j ∈ {-1,0,1}
  for (let i = 0; i < 2; i++)
    for (let k = 0; k < 2; k++)
      for (let j = -1; j <= 1; j++)
        atoms.push({
          bx: (i * 2 - 1) * a * 0.5,
          by: j * a,
          bz: (k * 2 - 1) * a * 0.5,
          type: "O",
          phase: rnd(),
        });

  // YZ faces: i*a, (j+½)*a, (k+½)*a  for j,k ∈ {-1,0}, i ∈ {-1,0,1}
  for (let j = 0; j < 2; j++)
    for (let k = 0; k < 2; k++)
      for (let i = -1; i <= 1; i++)
        atoms.push({
          bx: i * a,
          by: (j * 2 - 1) * a * 0.5,
          bz: (k * 2 - 1) * a * 0.5,
          type: "O",
          phase: rnd(),
        });

  return atoms;
}

export default function MolecularLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const a = 75;
    const atoms = buildPerovskite(a);

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - w / 2) * 0.12;
      mouseY = (e.clientY - h / 2) * 0.12;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let angleY = 0;

    const ATOM_STYLE: Record<AtomType, { color: string; rgb: string; r: number }> = {
      A: { color: "#e8962a", rgb: "232,150,42", r: 6.5 },    // La — gold, large
      B: { color: "#c8d4e8", rgb: "200,212,232", r: 4.5 },   // Co — silver
      O: { color: "#00c8f0", rgb: "0,200,240", r: 3 },       // O  — cyan, small
    };

    // B-O bond threshold: a/2 + 10% tolerance
    const BOND_THRESHOLD_SQ = (a * 0.55) ** 2;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      angleY += 0.0012;
      const angleX = Math.sin(angleY * 0.4) * 0.18;

      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

      // Breathing: phonon vibration
      const breathe = 1 + Math.sin(Date.now() * 0.0004) * 0.025;

      // Project atoms
      const projected = atoms.map((atom) => {
        const x3d = atom.bx * breathe;
        const y3d = atom.by * breathe;
        const z3d = atom.bz * breathe;

        // Y-axis rotation
        const x1 = x3d * cosY - z3d * sinY;
        const z1 = z3d * cosY + x3d * sinY;
        // X-axis rotation
        const y2 = y3d * cosX - z1 * sinX;
        const z2 = z1 * cosX + y3d * sinX;

        const finalX = x1 + mouseX;
        const finalY = y2 - mouseY;
        const finalZ = z2 - 350;

        const fov = 500;
        const scale = fov / (fov - finalZ);

        return {
          x: w / 2 + finalX * scale,
          y: h / 2 + finalY * scale,
          z: finalZ,
          scale,
          type: atom.type,
          // Store rotated position for bond distance calc
          rx: x1, ry: y2, rz: z2,
        };
      });

      // Painter's sort
      const indices = Array.from({ length: projected.length }, (_, i) => i);
      indices.sort((a, b) => projected[a].z - projected[b].z);

      // Draw B-O bonds only (cleaner, crystallographically accurate)
      ctx.lineWidth = 0.6;
      for (let ii = 0; ii < atoms.length; ii++) {
        if (atoms[ii].type !== "B") continue;
        const pb = projected[ii];
        for (let jj = 0; jj < atoms.length; jj++) {
          if (atoms[jj].type !== "O") continue;
          const pa = projected[jj];

          // Use breathing-scaled positions for bond culling
          const dx = atoms[ii].bx * breathe - atoms[jj].bx * breathe;
          const dy = atoms[ii].by * breathe - atoms[jj].by * breathe;
          const dz = atoms[ii].bz * breathe - atoms[jj].bz * breathe;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq > BOND_THRESHOLD_SQ * breathe * breathe) continue;
          if (pb.x < -10 || pb.x > w + 10 || pa.x < -10 || pa.x > w + 10) continue;

          const depthFade = Math.max(0, 0.35 + 0.15 * (pb.z + pa.z) / -350);
          ctx.strokeStyle = `rgba(0,200,240,${depthFade * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(pb.x, pb.y);
          ctx.lineTo(pa.x, pa.y);
          ctx.stroke();
        }
      }

      // Draw atoms back-to-front
      indices.forEach((idx) => {
        const p = projected[idx];
        if (p.x < -30 || p.x > w + 30 || p.y < -30 || p.y > h + 30) return;

        const style = ATOM_STYLE[atoms[idx].type];
        const size = Math.max(1, style.r * p.scale);
        const depthAlpha = Math.max(0.35, Math.min(1, 1 + p.z / 500));

        // Glow
        const glowR = size * 3.2;
        const grad = ctx.createRadialGradient(p.x, p.y, size * 0.15, p.x, p.y, glowR);
        grad.addColorStop(0, `rgba(${style.rgb},${0.55 * depthAlpha})`);
        grad.addColorStop(0.4, `rgba(${style.rgb},${0.15 * depthAlpha})`);
        grad.addColorStop(1, `rgba(${style.rgb},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = style.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-70" />;
}
