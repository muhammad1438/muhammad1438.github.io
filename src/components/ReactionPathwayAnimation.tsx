"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const methaneSteps = ["CH4*", "CH3* + H*", "CH2* + 2H*", "CH* + 3H*", "C* + 4H*"];
const co2Steps = ["CO2*", "COOH*", "CO* + OH*"];

export default function ReactionPathwayAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const sites = element.querySelectorAll("[data-site]");
    const pulses = element.querySelectorAll("[data-pulse]");
    const hPair = element.querySelector("[data-h-pair]");
    const curves = element.querySelectorAll("[data-energy-curve]");
    if (!hPair) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(curves, {
          strokeDashoffset: [520, 0],
          duration: 1200,
          delay: stagger(140),
          easing: "outCubic",
        });
        animate(sites, {
          opacity: [0, 1],
          translateY: [12, 0],
          scale: [0.92, 1],
          delay: stagger(90, { start: 180 }),
          duration: 620,
          easing: "outCubic",
        });
        animate(pulses, {
          scale: [0.9, 1.22, 0.9],
          opacity: [0.25, 0.72, 0.25],
          delay: stagger(110),
          duration: 1800,
          easing: "inOutSine",
          loop: true,
        });
        animate(hPair, {
          translateX: [0, 24, 0],
          translateY: [0, -8, 0],
          opacity: [0.35, 1, 0.35],
          duration: 1900,
          easing: "inOutSine",
          loop: true,
        });
        observer.disconnect();
      },
      { threshold: 0.28 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={ref} className="relative h-full overflow-hidden rounded-2xl border border-edge bg-glass-bg p-5 backdrop-blur-md">
      <div className="absolute inset-0 tech-grid opacity-25 mask-radial" />
      <div className="relative space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-card-title text-ink">Surface mechanism</h3>
            <p className="text-small text-faint">Sequential C-H scission, H recombination, and CO2-assisted carbon management.</p>
          </div>
          <span className="w-fit rounded-full border border-accent-secondary/25 bg-accent-secondary/5 px-3 py-1 font-mono text-label text-accent-secondary">
            net: CH4 -&gt; C(s) + 2H2
          </span>
        </div>

        <div className="relative rounded-xl border border-edge bg-background/45 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-mono text-label text-accent-primary">methane decomposition lane</span>
            <span className="font-mono text-[10px] text-faint">CH4(g) + * -&gt; CHx* + H*</span>
          </div>
          <div className="overflow-x-auto no-scrollbar">
          <svg viewBox="0 0 620 188" className="h-48 w-full min-w-[560px] overflow-visible sm:min-w-0" role="img" aria-label="Methane decomposition surface pathway">
            <defs>
              <linearGradient id="methaneEnergy" x1="0" x2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="55%" stopColor="#f5a623" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <path
              data-energy-curve
              d="M 32 128 C 72 112, 78 70, 118 78 S 170 138, 214 114 S 266 54, 308 72 S 358 140, 404 116 S 452 62, 500 78 S 552 122, 590 100"
              fill="none"
              stroke="url(#methaneEnergy)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="520"
              strokeDashoffset="0"
            />
            <line x1="34" y1="150" x2="590" y2="150" stroke="currentColor" className="text-edge" strokeWidth="1" />
            {methaneSteps.map((label, index) => {
              const x = 48 + index * 132;
              const y = [128, 112, 114, 116, 100][index];
              return (
                <g key={label} data-site transform={`translate(${x} ${y})`}>
                  <circle data-pulse cx="0" cy="0" r="18" fill="#00d4ff" opacity="0.16" />
                  <circle cx="0" cy="0" r="7" fill={index === methaneSteps.length - 1 ? "#f5a623" : "#00d4ff"} />
                  <text x="-30" y="38" className="fill-ink font-mono text-[11px]">{label}</text>
                </g>
              );
            })}
            <g data-h-pair transform="translate(486 34)">
              <circle cx="0" cy="0" r="6" fill="#dbeafe" />
              <circle cx="18" cy="0" r="6" fill="#dbeafe" />
              <line x1="6" y1="0" x2="12" y2="0" stroke="#dbeafe" strokeWidth="2" />
              <text x="-20" y="-14" className="fill-faint font-mono text-[10px]">2H* -&gt; H2(g)</text>
            </g>
          </svg>
          </div>
        </div>

        <div className="relative rounded-xl border border-edge bg-background/35 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-mono text-label text-accent-secondary">CO2 / DRM branch</span>
            <span className="font-mono text-[10px] text-faint">CO2* + H* -&gt; COOH* -&gt; CO* + OH*</span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {co2Steps.map((step, index) => (
              <div key={step} data-site className="relative rounded-lg border border-edge bg-glass-bg p-3 text-center">
                <span data-pulse className="mx-auto mb-2 block h-5 w-5 rounded-full bg-accent-secondary/60 shadow-[0_0_18px_var(--accent-secondary)]" />
                <div className="font-mono text-xs text-ink">{step}</div>
                <div className="mt-1 text-[10px] text-faint">{index === 0 ? "adsorb" : index === 1 ? "carboxyl" : "CO route"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
