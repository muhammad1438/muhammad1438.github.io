"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BookOpen, Download, Eye } from "lucide-react";
import StatsCounter from "@/components/StatsCounter";

const CrystalScene = dynamic(() => import("@/components/three/CrystalScene"), {
  ssr: false,
  loading: () => null,
});

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <header id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* 3D crystal background */}
      <CrystalScene />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5" />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none tech-grid opacity-60 mask-radial" />

      <div className="max-w-[1180px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Main Info */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 text-left"
        >
          <div className="flex flex-wrap gap-3 items-center text-xs font-mono">
            <span className="flex items-center gap-2 text-accent-primary bg-accent-primary/5 border border-accent-primary/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 bg-accent-primary rounded-full animate-ping shadow-[0_0_8px_var(--accent-primary)]" />
              Open to Opportunities
            </span>
            <span className="text-faint/60">·</span>
            <span className="text-faint">Lat 31.5204°N · Lon 74.3587°E</span>
          </div>

          <h1 className="text-hero font-heading font-bold text-ink tracking-tight">
            <span className="bg-gradient-to-r from-ink via-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Dr. Muhammad Fahad Arshad
            </span>
          </h1>

          <p className="text-body-lg text-prose font-light leading-relaxed">
            <strong className="text-ink font-medium">Experimental &amp; Computational Catalysis Researcher</strong> · Specializing in heterogeneous catalysis, DFT, MD, and AI/ML for hydrogen production and CO₂ valorisation.
          </p>

          <blockquote className="border-l-2 border-accent-primary/40 pl-4 py-1 text-small text-faint italic max-w-xl">
            &ldquo;Bridging experimental characterisation and high-performance computation to advance hydrogen production and CO₂ valorisation.&rdquo;
          </blockquote>

          {/* Action Row */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="cv-view.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-accent-primary hover:bg-accent-primary/90 text-background font-heading font-medium text-xs sm:text-sm hover:shadow-[0_8px_30px_color-mix(in_srgb,var(--accent-primary)_40%,transparent)] transition-all duration-300 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              View CV
            </a>
            <a
              href="assets/cv.pdf"
              download
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-edge hover:border-accent-primary hover:bg-accent-primary/5 text-ink hover:text-accent-primary font-heading font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <a
              href="#publications"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-edge hover:border-accent-secondary hover:bg-accent-secondary/5 text-ink/90 hover:text-accent-secondary font-heading font-medium text-xs sm:text-sm transition-all duration-300 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Publications · 11
            </a>
          </div>

          {/* Hero Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-edge max-w-2xl">
            <div className="space-y-1">
              <div className="text-label uppercase tracking-widest text-faint/60">Citations</div>
              <div className="text-xl sm:text-2xl font-heading font-bold text-accent-primary">
                <StatsCounter end={191} />
              </div>
            </div>
            <div className="space-y-1 border-l border-edge pl-6">
              <div className="text-label uppercase tracking-widest text-faint/60">h-index</div>
              <div className="text-xl sm:text-2xl font-heading font-bold text-accent-primary">
                <StatsCounter end={10} />
              </div>
            </div>
            <div className="space-y-1 border-l border-edge pl-6">
              <div className="text-label uppercase tracking-widest text-faint/60">i10-index</div>
              <div className="text-xl sm:text-2xl font-heading font-bold text-accent-primary">
                <StatsCounter end={10} />
              </div>
            </div>
            <div className="space-y-1 border-l border-edge pl-6">
              <div className="text-label uppercase tracking-widest text-faint/60">Countries</div>
              <div className="text-xl sm:text-2xl font-heading font-bold text-accent-secondary">PK · CN · MA</div>
            </div>
          </div>
        </motion.div>

        {/* Right Orb Image */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="lg:col-span-5 flex justify-center mt-6 lg:mt-0"
        >
          <div className="relative w-64 sm:w-80 aspect-square">
            {/* Outer Orbit rings */}
            <div className="absolute inset-[-14px] rounded-full border border-dashed border-accent-primary/30 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-[-30px] rounded-full border border-dashed border-accent-secondary/20 animate-[spin_50s_linear_reverse_infinite]" />
            <div className="absolute inset-[-50px] rounded-full border border-edge animate-[spin_70s_linear_infinite]" />

            <div className="absolute top-[-4px] left-[50%] -translate-x-1/2 w-2.5 h-2.5 bg-accent-primary rounded-full shadow-[0_0_12px_var(--accent-primary)]" />
            <div className="absolute bottom-[6%] left-[10%] w-2 h-2 bg-accent-secondary rounded-full shadow-[0_0_12px_var(--accent-secondary)]" />

            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent-primary/30 bg-surface shadow-[0_0_50px_color-mix(in_srgb,var(--accent-primary)_25%,transparent)] flex items-center justify-center">
              <img
                src="assets/profile.png"
                alt="Dr. Muhammad Fahad Arshad"
                className="w-full h-full object-cover object-top scale-[1.03] filter contrast-105 saturate-95"
              />
            </div>

            {/* Float Tags */}
            <div className="absolute -top-4 -right-4 px-3 py-1 bg-background/85 border border-accent-primary/35 rounded-full text-label text-accent-primary backdrop-blur-md">
              DFT · MD · ML
            </div>
            <div className="absolute -bottom-2 -left-6 px-3 py-1 bg-background/85 border border-accent-secondary/35 rounded-full text-label text-accent-secondary backdrop-blur-md">
              H₂ · CO₂ · zeolites
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
