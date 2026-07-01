"use client";

import { animate, stagger } from "animejs";
import { Atom, BrainCircuit, FlaskConical, Gauge, Orbit, Route, Sparkles, Waves } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const steps = [
  { icon: Atom, title: "DFT Calculations", text: "Electronic structure and surface energetics." },
  { icon: Orbit, title: "Adsorption Energies", text: "Binding maps for reactants and intermediates." },
  { icon: Route, title: "Transition States", text: "Barriers, pathways, and rate-limiting steps." },
  { icon: Gauge, title: "Microkinetics", text: "Rate models connected to operating windows." },
  { icon: Waves, title: "Reactor Simulation", text: "Transport, conversion, and scale-up behavior." },
  { icon: BrainCircuit, title: "AI Screening", text: "Model-guided catalyst prioritization." },
  { icon: FlaskConical, title: "Validation", text: "Autoclave, synthesis, and characterization loops." },
  { icon: Sparkles, title: "Energy Impact", text: "Hydrogen and CO2 conversion outcomes." },
];

export default function ResearchWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    const nodes = element.querySelectorAll("[data-workflow-node]");
    const lines = element.querySelectorAll("[data-workflow-line]");
    const carriers = element.querySelectorAll("[data-carrier]");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(nodes, {
          opacity: [0, 1],
          translateY: [18, 0],
          scale: [0.96, 1],
          delay: stagger(90),
          duration: 720,
          easing: "outCubic",
        });
        animate(lines, {
          scaleX: [0, 1],
          opacity: [0, 1],
          delay: stagger(90, { start: 180 }),
          duration: 620,
          easing: "outCubic",
        });
        animate(carriers, {
          translateX: [0, 18, 0],
          opacity: [0.25, 1, 0.25],
          delay: stagger(140),
          duration: 1900,
          easing: "inOutSine",
          loop: true,
        });
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={ref} className="relative h-full overflow-hidden rounded-2xl border border-edge bg-glass-bg p-5 md:p-6 backdrop-blur-md">
      <div className="absolute inset-0 tech-grid opacity-30 mask-radial" />
      <div className="absolute left-8 right-8 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-accent-primary/25 to-transparent lg:block" />
      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative">
              <div
                data-workflow-node
                className="group relative h-full rounded-xl border border-edge bg-background/50 p-4 opacity-100 transition-all hover:-translate-y-1 hover:border-accent-primary/35 hover:shadow-[0_14px_34px_rgba(0,212,255,0.12)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-primary/25 bg-accent-primary/5 text-accent-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[10px] text-faint">S{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-faint">{step.text}</p>
                <span data-carrier className="mt-3 block h-1 w-10 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary opacity-60" />
              </div>
              {index < steps.length - 1 && (
                <div
                  data-workflow-line
                  className="absolute left-8 top-full z-10 h-3 w-px origin-top bg-gradient-to-b from-accent-primary to-transparent md:hidden"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
