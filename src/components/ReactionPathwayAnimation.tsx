"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const methaneSteps = [
  { state: "CH4*", note: "adsorbed methane" },
  { state: "CH3* + H*", note: "first C-H scission" },
  { state: "CH2* + 2H*", note: "second H removed" },
  { state: "CH* + 3H*", note: "deep dehydrogenation" },
  { state: "C* + 4H*", note: "surface carbon" },
];
const co2Steps = ["CO2*", "COOH*", "CO* + OH*"];

export default function ReactionPathwayAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;

    const sites = element.querySelectorAll("[data-site]");
    const stepCards = element.querySelectorAll("[data-step-card]");
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
          scale: [0.92, 1],
          delay: stagger(90, { start: 180 }),
          duration: 620,
          easing: "outCubic",
        });
        animate(stepCards, {
          opacity: [0, 1],
          translateY: [10, 0],
          delay: stagger(70, { start: 160 }),
          duration: 520,
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
            <span className="font-mono text-[10px] text-faint">CH4(g) + * -&gt; CH4* -&gt; C* + 4H*</span>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
            {methaneSteps.map((step, index) => (
              <div
                key={step.state}
                data-step-card
                className="rounded-lg border border-accent-primary/20 bg-accent-primary/5 p-3 text-center"
              >
                <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full border border-accent-primary/35 bg-background text-accent-primary shadow-[0_0_14px_rgba(0,212,255,0.22)]">
                  {index + 1}
                </div>
                <div className="font-mono text-sm font-semibold text-ink">{step.state}</div>
                <div className="mt-1 min-h-[28px] text-[10px] leading-snug text-faint">{step.note}</div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto no-scrollbar rounded-lg border border-edge bg-background/45 p-2">
          <svg viewBox="0 0 620 178" className="h-44 w-full min-w-[560px] sm:min-w-0" role="img" aria-label="Methane decomposition energy profile">
            <defs>
              <linearGradient id="methaneEnergy" x1="0" x2="1">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="55%" stopColor="#f5a623" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <line x1="42" y1="138" x2="586" y2="138" stroke="currentColor" className="text-edge" strokeWidth="1" />
            <path
              data-energy-curve
              d="M 48 122 L 94 122 C 116 66, 142 66, 164 118 L 202 118 C 224 54, 252 54, 276 112 L 314 112 C 338 62, 362 62, 386 116 L 424 116 C 448 72, 474 72, 500 104 L 584 104"
              fill="none"
              stroke="url(#methaneEnergy)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="520"
              strokeDashoffset="0"
            />
            {methaneSteps.map((step, index) => {
              const positions = [
                [48, 122],
                [202, 118],
                [314, 112],
                [424, 116],
                [584, 104],
              ];
              const [x, y] = positions[index];
              return (
                <g key={step.state} data-site>
                  <circle data-pulse cx={x} cy={y} r="18" fill={index === 4 ? "#f5a623" : "#00d4ff"} opacity="0.16" />
                  <circle cx={x} cy={y} r="8" fill={index === 4 ? "#f5a623" : "#00d4ff"} />
                  <text x={x} y="156" textAnchor="middle" className="fill-ink font-mono text-[12px]">{step.state}</text>
                </g>
              );
            })}
            <g data-h-pair transform="translate(456 28)">
              <circle cx="0" cy="0" r="7" fill="#dbeafe" />
              <circle cx="22" cy="0" r="7" fill="#dbeafe" />
              <line x1="7" y1="0" x2="15" y2="0" stroke="#dbeafe" strokeWidth="2.4" />
              <text x="-18" y="-13" className="fill-faint font-mono text-[11px]">H* + H* -&gt; H2(g)</text>
            </g>
            <text x="46" y="24" className="fill-faint font-mono text-[10px]">relative surface free energy</text>
            <text x="494" y="132" className="fill-accent-secondary font-mono text-[10px]">C* remains on catalyst</text>
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
