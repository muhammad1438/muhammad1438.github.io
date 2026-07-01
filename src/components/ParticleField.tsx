"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface ParticleFieldProps {
  className?: string;
  density?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export default function ParticleField({ className = "", density = 56 }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || reducedMotion) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.length = 0;
      const count = Math.max(18, Math.floor((width * height) / 18000 * (density / 56)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 1 + Math.random() * 1.7,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0, 212, 255, 0.48)";
      ctx.strokeStyle = "rgba(0, 212, 255, 0.12)";

      for (const p of particles) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 12000) {
          p.vx += dx * 0.000008;
          p.vy += dy * 0.000008;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 112) continue;
          ctx.globalAlpha = 1 - dist / 112;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    const move = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };
    const leave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseleave", leave);
    };
  }, [density, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-50 ${className}`}
    />
  );
}
