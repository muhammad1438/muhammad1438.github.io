"use client";

import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SectionBadgeProps {
  number: string;
  notation: string;
  label: string;
  dSpacing?: string;
}

export default function SectionBadge({ number, notation, label, dSpacing }: SectionBadgeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chars = notation.split("");

  const inner = (
    <span
      ref={ref}
      className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-primary border border-accent-primary/30 bg-accent-primary/5 px-3 py-1 rounded-full uppercase tracking-widest cursor-default select-none"
    >
      <span className="text-faint">{number}</span>
      <span className="opacity-40">·</span>
      <span className="font-semibold tracking-widest">
        {chars.map((ch, i) => (
          <span
            key={i}
            className="transition-opacity duration-100"
            style={{ opacity: revealed ? 1 : 0, transitionDelay: `${i * 35}ms` }}
          >
            {ch}
          </span>
        ))}
      </span>
      <span className="opacity-60 ml-0.5">{label}</span>
    </span>
  );

  if (!dSpacing) return inner;

  return (
    <Tooltip>
      <TooltipTrigger>{inner}</TooltipTrigger>
      <TooltipContent side="right">
        <span className="font-mono">d-spacing: {dSpacing}</span>
      </TooltipContent>
    </Tooltip>
  );
}
