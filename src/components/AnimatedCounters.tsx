"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface AnimatedCountersProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounters({
  end,
  duration = 1400,
  suffix = "",
}: AnimatedCountersProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;

        const state = { value: 0 };
        animate(state, {
          value: end,
          duration,
          easing: "outCubic",
          modifier: (value) => Math.round(Number(value)),
          onUpdate: () => setCount(Math.round(state.value)),
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [duration, end, reducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {reducedMotion ? end : count}
      {suffix}
    </span>
  );
}
