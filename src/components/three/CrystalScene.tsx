"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import PerovskiteCrystal from "./PerovskiteCrystal";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function CrystalScene() {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 12], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#00d4ff" />
          <Suspense fallback={null}>
            <PerovskiteCrystal reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
