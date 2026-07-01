"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function ExperimentalLabAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    const flows = element.querySelectorAll("[data-flow]");
    const heat = element.querySelector("[data-heat]");
    const signals = element.querySelectorAll("[data-signal]");
    if (!heat) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(flows, {
          strokeDashoffset: [80, 0],
          delay: stagger(120),
          duration: 1100,
          easing: "linear",
          loop: true,
        });
        animate(heat, {
          opacity: [0.28, 0.82, 0.28],
          scaleY: [0.92, 1.06, 0.92],
          duration: 1800,
          easing: "inOutSine",
          loop: true,
        });
        animate(signals, {
          opacity: [0.32, 1, 0.32],
          translateY: [0, -5, 0],
          delay: stagger(160),
          duration: 1900,
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
      <div className="absolute inset-0 tech-grid opacity-25 mask-radial" />
      <div className="relative">
        <div className="mb-3">
          <h3 className="text-card-title text-ink">Experimental validation loop</h3>
          <p className="text-small text-faint">Gas feeds, heated catalyst bed, pressure reactor logic, and analytical characterization.</p>
        </div>
        <div className="overflow-x-auto no-scrollbar">
        <svg viewBox="0 0 620 260" className="h-64 w-full min-w-[560px] sm:min-w-0" role="img" aria-label="Catalysis laboratory equipment animation">
          <defs>
            <linearGradient id="tubeGradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="50%" stopColor="#f5a623" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          {[
            ["CH4", 38, 42, "#dbeafe"],
            ["CO2", 38, 106, "#00d4ff"],
            ["H2", 38, 170, "#f5a623"],
          ].map(([label, x, y, color]) => (
            <g key={label}>
              <rect x={Number(x)} y={Number(y)} width="52" height="34" rx="10" fill="rgba(255,255,255,0.03)" stroke={String(color)} opacity="0.9" />
              <text x={Number(x) + 26} y={Number(y) + 22} textAnchor="middle" className="fill-ink font-mono text-[11px]">{label}</text>
              <path
                data-flow
                d={`M ${Number(x) + 52} ${Number(y) + 17} H 190`}
                stroke={String(color)}
                strokeWidth="2"
                strokeDasharray="8 10"
                fill="none"
              />
            </g>
          ))}
          <rect x="190" y="72" width="250" height="98" rx="24" fill="rgba(255,255,255,0.035)" stroke="url(#tubeGradient)" strokeWidth="2" />
          <rect data-heat x="244" y="88" width="142" height="66" rx="16" fill="rgba(245,166,35,0.16)" stroke="#f5a623" />
          <g transform="translate(262 110)">
            {Array.from({ length: 12 }).map((_, index) => (
              <circle
                key={index}
                cx={(index % 6) * 20}
                cy={Math.floor(index / 6) * 22}
                r="5"
                fill={index % 3 === 0 ? "#f5a623" : "#00d4ff"}
                opacity="0.88"
              />
            ))}
          </g>
          <text x="315" y="188" textAnchor="middle" className="fill-accent-secondary font-mono text-[11px]">heated catalyst bed</text>
          <path data-flow d="M 440 121 H 522" stroke="#a78bfa" strokeWidth="2" strokeDasharray="8 10" fill="none" />
          <rect x="522" y="84" width="66" height="74" rx="12" fill="rgba(255,255,255,0.035)" stroke="#a78bfa" />
          <text x="555" y="113" textAnchor="middle" className="fill-ink font-mono text-[11px]">GC/MS</text>
          <text x="555" y="132" textAnchor="middle" className="fill-faint font-mono text-[10px]">outlet</text>
          {["XRD", "XPS", "Raman"].map((label, index) => (
            <g key={label} data-signal transform={`translate(${214 + index * 84} 218)`}>
              <circle cx="0" cy="0" r="15" fill="rgba(0,212,255,0.08)" stroke="#00d4ff" />
              <text x="0" y="4" textAnchor="middle" className="fill-faint font-mono text-[10px]">{label}</text>
            </g>
          ))}
        </svg>
        </div>
      </div>
    </div>
  );
}
