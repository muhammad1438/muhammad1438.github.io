"use client";

import { motion } from "framer-motion";
import { Flame, BookOpen, Code, Compass } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";
import EnhancedProjectCard from "@/components/EnhancedProjectCard";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const containerReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const projects = [
  { icon: Flame, name: "Autoclave Calculator", lang: "Python", desc: "Pressure-parameter calculator for high-pressure autoclave experiments — keeps biomass and catalytic runs within safe operating envelopes.", repo: "https://github.com/muhammad1438/autoclave_calculator" },
  { icon: BookOpen, name: "oa_corpus", lang: "Python", desc: "Scientific publication downloader and corpus builder — turns OpenAlex queries into mineable text bodies for large-scale literature analysis.", repo: "https://github.com/muhammad1438/oa-corpus" },
  { icon: Code, name: "scrysrust", lang: "Rust", desc: "Rust-based molecular-modelling toolkit. Fast DFT pre/post-processing, leveraging Rust's zero-cost abstractions for crystallographic workloads.", repo: "https://github.com/muhammad1438/scrysrust" },
  { icon: Compass, name: "OpenContextFramework", lang: "AI Agent", desc: "Agentic AI framework for scientific workflows — automated catalyst screening, literature-informed hypothesis generation, and tool use across DFT pipelines.", repo: "https://github.com/muhammad1438/OpenContextFramework" },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding border-t border-edge bg-surface/30">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
          <SectionBadge number="05" notation="⟨2 1 0⟩" label="Software" />
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            Tools I&apos;ve shipped for <span className="text-accent-primary">my own research</span>.
          </h2>
          <p className="text-small text-faint max-w-xl">
            Open-source utilities and frameworks engineered across Python, Rust, and agentic AI models to streamline scientific workflows.
          </p>
        </motion.div>

        <motion.div variants={containerReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <motion.div key={i} variants={itemReveal}>
              <EnhancedProjectCard {...proj} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
