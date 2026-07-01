"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function DFTComputationAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    const contours = element.querySelectorAll("[data-density]");
    const bars = element.querySelectorAll("[data-scf-bar]");
    const slabAtoms = element.querySelectorAll("[data-slab-atom]");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(contours, {
          scale: [0.86, 1.08, 0.86],
          opacity: [0.18, 0.62, 0.18],
          delay: stagger(140),
          duration: 2200,
          easing: "inOutSine",
          loop: true,
        });
        animate(bars, {
          scaleX: [0.18, 1],
          delay: stagger(90, { start: 240 }),
          duration: 760,
          easing: "outCubic",
        });
        animate(slabAtoms, {
          translateY: [0, -3, 0],
          delay: stagger(55),
          duration: 1800,
          easing: "inOutSine",
          loop: true,
        });
        observer.disconnect();
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-edge bg-glass-bg p-5 backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(0,212,255,0.12),transparent_36%),radial-gradient(circle_at_70%_70%,rgba(167,139,250,0.1),transparent_34%)]" />
      <div className="relative grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="mb-3">
            <h3 className="text-card-title text-ink">DFT computation layer</h3>
            <p className="text-small text-faint">Surface slab, charge density, SCF convergence, adsorption and transition-state descriptors.</p>
          </div>
          <div className="overflow-x-auto no-scrollbar">
          <svg viewBox="0 0 420 230" className="h-56 w-full min-w-[390px] sm:min-w-0" role="img" aria-label="DFT slab and electron density animation">
            <defs>
              <linearGradient id="slabLine" x1="0" x2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#f5a623" />
              </linearGradient>
            </defs>
            {[0, 1, 2].map((ring) => (
              <ellipse
                key={ring}
                data-density
                cx="210"
                cy={82 + ring * 12}
                rx={112 + ring * 16}
                ry={28 + ring * 6}
                fill="none"
                stroke={ring === 1 ? "#a78bfa" : "#00d4ff"}
                strokeWidth="1.4"
                opacity="0.34"
              />
            ))}
            <g transform="translate(64 128)">
              {Array.from({ length: 24 }).map((_, index) => {
                const x = (index % 8) * 38;
                const y = Math.floor(index / 8) * 28;
                const color = index % 5 === 0 ? "#f5a623" : index % 3 === 0 ? "#c8d4e8" : "#00d4ff";
                return <circle key={index} data-slab-atom cx={x} cy={y} r={7} fill={color} opacity="0.92" />;
              })}
              <path d="M 0 12 H 266 M 18 40 H 284 M 0 68 H 266" stroke="url(#slabLine)" strokeWidth="1" opacity="0.38" />
            </g>
            <text x="42" y="34" className="fill-accent-primary font-mono text-[11px]">k-mesh 5x5x1</text>
            <text x="42" y="52" className="fill-faint font-mono text-[10px]">NEB / TS search</text>
            <text x="278" y="34" className="fill-accent-secondary font-mono text-[11px]">Delta G‡</text>
            <text x="278" y="52" className="fill-faint font-mono text-[10px]">E_ads(CHx*)</text>
          </svg>
          </div>
        </div>

        <div className="rounded-xl border border-edge bg-background/45 p-4">
          <div className="mb-3 font-mono text-label text-accent-primary">SCF convergence</div>
          <div className="space-y-3">
            {[92, 78, 54, 32, 18].map((width, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between font-mono text-[10px] text-faint">
                  <span>cycle {index + 1}</span>
                  <span>{width < 20 ? "1e-6 eV" : `${width} meV`}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-edge">
                  <div
                    data-scf-bar
                    className="h-full origin-left rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[10px]">
            <span className="rounded-lg border border-edge bg-glass-bg p-2 text-faint">Bader charge</span>
            <span className="rounded-lg border border-edge bg-glass-bg p-2 text-faint">DOS / PDOS</span>
            <span className="rounded-lg border border-edge bg-glass-bg p-2 text-faint">adsorption map</span>
            <span className="rounded-lg border border-edge bg-glass-bg p-2 text-faint">barrier ranking</span>
          </div>
        </div>
      </div>
    </div>
  );
}
