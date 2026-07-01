"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  childSelector?: string;
}

export default function AnimatedSection({
  children,
  className,
  childSelector = "[data-reveal-child]",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reducedMotion) {
      element.style.opacity = "1";
      element.style.transform = "none";
      element.style.filter = "none";
      return;
    }

    const children = Array.from(element.querySelectorAll(childSelector));
    const targets = children.length ? children : [element];
    targets.forEach((target) => {
      const item = target as HTMLElement;
      item.style.opacity = "0";
      item.style.transform = "translateY(24px)";
      item.style.filter = "blur(8px)";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(targets, {
          opacity: [0, 1],
          translateY: [24, 0],
          filter: ["blur(8px)", "blur(0px)"],
          duration: 760,
          delay: stagger(80),
          easing: "outCubic",
        });
        observer.disconnect();
      },
      { threshold: 0.16, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [childSelector, reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
