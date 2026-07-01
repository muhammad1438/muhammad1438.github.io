"use client";

import type { LucideIcon } from "lucide-react";
import { useRef } from "react";

interface EnhancedProjectCardProps {
  icon: LucideIcon;
  name: string;
  lang: string;
  desc: string;
  repo: string;
}

export default function EnhancedProjectCard({ icon: Icon, name, lang, desc, repo }: EnhancedProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 7;
    const rotateX = ((y / rect.height) - 0.5) * -7;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  };

  const handleLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <a
      ref={ref}
      href={repo}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="scientific-card group relative block h-full overflow-hidden rounded-2xl border border-glass-border bg-glass-bg p-6 shadow-xl backdrop-blur-md transition-all duration-200 hover:border-accent-primary/35"
    >
      <div className="absolute inset-0 tech-grid opacity-0 transition-opacity duration-300 group-hover:opacity-40" />
      <div className="relative flex gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent-primary/20 bg-accent-primary/5 text-accent-primary transition-all group-hover:scale-105">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-heading font-semibold text-ink transition-colors group-hover:text-accent-primary">{name}</h3>
            <span className="rounded-full border border-accent-secondary/25 bg-accent-secondary/5 px-2 py-0.5 font-mono text-label font-medium uppercase text-accent-secondary">
              {lang}
            </span>
          </div>
          <p className="text-small leading-relaxed text-faint">{desc}</p>
          <span className="inline-flex pt-2 font-mono text-label text-accent-primary">github repo -&gt;</span>
        </div>
      </div>
    </a>
  );
}
