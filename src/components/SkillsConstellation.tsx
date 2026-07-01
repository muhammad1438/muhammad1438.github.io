"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface SkillGroup {
  id: string;
  label: string;
  color: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "comp",
    label: "Computational",
    color: "#00d4ff",
    skills: [
      "DFT (Quantum ESPRESSO)",
      "DFT (VASP)",
      "DFT (Gaussian)",
      "MD (LAMMPS)",
      "Cantera",
      "Chemkin",
      "Python",
      "NumPy",
      "scikit-learn",
      "ASE",
      "pymatgen",
      "Rust",
      "HPC",
      "Git",
      "Bash",
      "LaTeX",
    ],
  },
  {
    id: "exp",
    label: "Experimental",
    color: "#f5a623",
    skills: [
      "XRD",
      "XPS",
      "Raman",
      "BET",
      "SEM/EDS",
      "Sol-gel",
      "CVD",
      "Zeolite synthesis",
      "Autoclave",
      "Biomass conv.",
      "Photocatalysis",
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "#a78bfa",
    skills: ["ML for catalysis", "LLM tooling", "Data crawlers", "OpenContextFramework"],
  },
  {
    id: "web",
    label: "Web / Frontend",
    color: "#38bdf8",
    skills: ["Website building", "Frontend development", "React", "Next.js", "Tailwind CSS", "Three.js", "Anime.js"],
  },
  {
    id: "focus",
    label: "Research focus",
    color: "#22d3ee",
    skills: [
      "H₂ production",
      "CO₂ valorization",
      "Heterogeneous catalysis",
      "Photocatalysis",
      "Zeolite catalysts",
      "Biomass",
      "ML-accel. discovery",
    ],
  },
  {
    id: "lang",
    label: "Languages",
    color: "#f472b6",
    skills: ["English (fluent)", "Urdu (native)", "Mandarin (conv.)"],
  },
];

interface Node {
  group: string;
  color: string;
  label: string;
  x: number;
  y: number;
  bx: number;
  by: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
}

export default function SkillsConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [activeGroups, setActiveGroups] = useState<Set<string>>(
    new Set(SKILL_GROUPS.map((g) => g.id))
  );
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const toggleGroup = (id: string) => {
    setActiveGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) {
          next.delete(id);
        }
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let W = canvas.clientWidth;
    const H = 500;

    const nodes: Node[] = [];
    const edges: [Node, Node][] = [];

    // Pre-calculate positions
    const placeNodes = (width: number, height: number) => {
      nodes.length = 0;
      edges.length = 0;

      const cx = width / 2;
      const cy = height / 2;
      const groupCount = SKILL_GROUPS.length;

      SKILL_GROUPS.forEach((g, gi) => {
        const ang = (gi / groupCount) * Math.PI * 2 - Math.PI / 2;
        const gx = cx + Math.cos(ang) * Math.min(width, height) * 0.32;
        const gy = cy + Math.sin(ang) * height * 0.28;

        const groupNodes: Node[] = [];
        g.skills.forEach((s, si) => {
          const a = (si / g.skills.length) * Math.PI * 2;
          const rad = 25 + (si % 3) * 20 + Math.random() * 8;
          const nx = gx + Math.cos(a) * rad;
          const ny = gy + Math.sin(a) * rad;

          const node: Node = {
            group: g.id,
            color: g.color,
            label: s,
            x: nx,
            y: ny,
            bx: nx,
            by: ny,
            r: 4.5 + Math.random() * 2.5,
            vx: 0,
            vy: 0,
            phase: Math.random() * Math.PI * 2,
          };
          nodes.push(node);
          groupNodes.push(node);
        });

        // Add intra-group links
        for (let i = 0; i < groupNodes.length; i++) {
          for (let j = i + 1; j < groupNodes.length; j++) {
            if (Math.random() < 0.28) {
              edges.push([groupNodes[i], groupNodes[j]]);
            }
          }
        }
      });

      // Hub links between first nodes of each group to tie graph together
      for (let i = 0; i < SKILL_GROUPS.length; i++) {
        const a = nodes.find((n) => n.group === SKILL_GROUPS[i].id);
        const b = nodes.find(
          (n) => n.group === SKILL_GROUPS[(i + 1) % SKILL_GROUPS.length].id
        );
        if (a && b) edges.push([a, b]);
      }
    };

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      W = rect.width;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      placeNodes(W, H);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      const time = Date.now();
      const tooltip = tooltipRef.current;
      let hoveredNode: Node | null = null;
      let bestD = Infinity;

      // Filter nodes that are active
      const activeNodes = nodes.filter((n) => activeGroups.has(n.group));
      const activeEdges = edges.filter(
        ([a, b]) => activeGroups.has(a.group) && activeGroups.has(b.group)
      );

      // Float nodes & find hovered
      activeNodes.forEach((n) => {
        const fx = Math.cos(time / 2000 + n.phase) * 3;
        const fy = Math.sin(time / 2200 + n.phase * 0.8) * 3;
        n.x = n.bx + fx;
        n.y = n.by + fy;

        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < n.r + 14 && d < bestD) {
          hoveredNode = n;
          bestD = d;
        }
      });

      // Draw connections after hover detection so related skill groups can light up.
      activeEdges.forEach(([a, b]) => {
        const isWebEdge = a.group === "web" || b.group === "web";
        const isScientificEdge =
          ["comp", "exp", "focus"].includes(a.group) && ["comp", "exp", "focus"].includes(b.group);
        const isRelated = hoveredNode && (a.group === hoveredNode.group || b.group === hoveredNode.group);
        const hoverColor = hoveredNode?.color ?? "#00d4ff";
        ctx.strokeStyle = isRelated
          ? `${hoverColor}90`
          : isWebEdge || isScientificEdge
            ? isDark ? "rgba(0, 212, 255, 0.14)" : "rgba(3, 105, 161, 0.16)"
            : isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(26, 28, 34, 0.06)";
        ctx.lineWidth = isRelated ? 1.8 : isWebEdge || isScientificEdge ? 1.2 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Draw nodes
      activeNodes.forEach((n) => {
        const isHover = n === hoveredNode;
        const isRelated = hoveredNode && n.group === hoveredNode.group;
        const radius = isHover ? n.r * 1.9 : isRelated ? n.r * 1.35 : n.r;

        // Draw soft glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 3.5);
        grad.addColorStop(0, `${n.color}${isRelated ? "ee" : "c0"}`);
        grad.addColorStop(1, `${n.color}00`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Hover outer ring
        if (isHover) {
          ctx.strokeStyle = isDark ? "#ffffff" : "#1a1c22";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // Handle tooltip display
      if (hoveredNode && tooltip) {
        const node = hoveredNode as Node;
        tooltip.textContent = node.label;
        tooltip.style.left = `${node.x}px`;
        tooltip.style.top = `${node.y}px`;
        tooltip.classList.add("show");
        canvas.style.cursor = "pointer";
      } else if (tooltip) {
        tooltip.classList.remove("show");
        canvas.style.cursor = "default";
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeGroups, isDark]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div
        ref={containerRef}
        className="w-full relative border border-edge bg-glass-bg rounded-2xl overflow-hidden shadow-2xl h-[500px] select-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(0, 212, 255, 0.03), transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(245, 166, 35, 0.03), transparent 50%)
          `,
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none px-3 py-1.5 rounded-lg bg-background/95 border border-accent-primary/40 text-xs text-ink font-mono shadow-xl transition-opacity duration-150 -translate-x-1/2 -translate-y-[calc(100%+14px)] opacity-0 z-10 [&.show]:opacity-100 whitespace-nowrap"
        />
      </div>

      {/* Legend controllers */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        {SKILL_GROUPS.map((g) => {
          const isActive = activeGroups.has(g.id);
          return (
            <button
              key={g.id}
              onClick={() => toggleGroup(g.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono transition-all duration-250 cursor-pointer ${
                isActive
                  ? "bg-glass-bg border-accent-primary/40 text-ink"
                  : "bg-transparent border-edge text-ink/40 hover:text-ink/70"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: g.color,
                  boxShadow: isActive ? `0 0 10px ${g.color}` : "none",
                }}
              />
              {g.label}
              <span className="opacity-50 text-[10px] ml-1">{g.skills.length}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
