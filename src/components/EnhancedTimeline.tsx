"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface TimelineItem {
  date: string;
  location: string;
  title: string;
  org: string;
  active?: boolean;
  items: string[];
}

export default function EnhancedTimeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion) return;
    const cards = element.querySelectorAll("[data-timeline-card]");
    const line = element.querySelector("[data-timeline-line]");
    if (!line) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(line, { scaleY: [0, 1], duration: 900, easing: "outCubic" });
        animate(cards, {
          opacity: [0, 1],
          translateX: [-18, 0],
          delay: stagger(120, { start: 150 }),
          duration: 680,
          easing: "outCubic",
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={ref} className="relative pl-6 md:pl-10">
      <div data-timeline-line className="timeline-line absolute left-1.5 top-2 bottom-2 w-px origin-top md:left-2.5" />
      <div className="space-y-12">
        {items.map((item) => (
          <article key={`${item.date}-${item.title}`} data-timeline-card className="relative rounded-2xl border border-edge bg-glass-bg p-5 backdrop-blur-sm">
            <div className={`absolute left-[-31px] top-6 h-4 w-4 rounded-full border-2 bg-background md:left-[-41px] ${item.active ? "border-accent-primary shadow-[0_0_14px_var(--accent-primary)]" : "border-accent-primary/40"}`} />
            <div className="flex flex-wrap items-center gap-2 font-mono text-small text-faint">
              <span className={`rounded-full border border-edge bg-glass-bg px-2.5 py-0.5 ${item.active ? "text-accent-secondary" : "text-faint"}`}>
                {item.date}
              </span>
              <span>{item.location}</span>
            </div>
            <h3 className="mt-3 text-title font-heading font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-small font-light text-accent-primary">{item.org}</p>
            <ul className="mt-4 grid list-disc grid-cols-1 gap-3 pl-4 text-small leading-relaxed text-faint md:grid-cols-2">
              {item.items.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
