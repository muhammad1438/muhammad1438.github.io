"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import StatsCounter from "@/components/StatsCounter";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function AboutSection() {
  return (
    <section id="about" className="section-padding border-t border-edge bg-surface/30">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
          <SectionBadge number="01" notation="⟨1 0 0⟩" label="Biography" dSpacing="3.905 Å" />
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            A researcher at the boundary of <span className="text-accent-primary">simulation</span> and the <span className="text-accent-secondary">flask</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Identity Card */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="lg:col-span-4 p-6 rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-md space-y-6 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-edge shadow-inner">
                <img src="assets/profile.png" alt="Profile" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-base text-ink">Dr. M. Fahad Arshad</h3>
                <p className="text-small text-faint">PhD · Engineering Thermophysics</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-2 font-mono text-small text-faint">
              <div className="flex items-center gap-3"><span className="text-base">📍</span> Lahore, Pakistan</div>
              <div className="flex items-center gap-3"><span className="text-base">✉️</span> m.fahad1448@gmail.com</div>
              <div className="flex items-center gap-3"><span className="text-base">📞</span> +92-321-4881565</div>
              <div className="flex items-center gap-3"><span className="text-base">🌐</span> muhammad1438.github.io</div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-edge text-label">
              <a href="https://github.com/muhammad1438" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 bg-glass-bg border border-edge rounded-md text-faint hover:text-accent-primary transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/mfahadarshad" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 bg-glass-bg border border-edge rounded-md text-faint hover:text-accent-primary transition-colors">LinkedIn</a>
              <a href="https://scholar.google.com/citations?user=fwiNZasAAAAJ" target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 bg-glass-bg border border-edge rounded-md text-faint hover:text-accent-secondary transition-colors">Scholar</a>
            </div>
          </motion.div>

          {/* Narrative Info */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            <p className="text-body leading-relaxed text-prose font-light">
              I am an experimental and computational catalysis researcher &mdash; bridging hands-on heterogeneous experimentation with high-performance molecular modeling (<strong className="text-ink font-normal underline decoration-accent-primary/40 underline-offset-4">DFT, molecular dynamics, and AI/ML</strong>) to design low-carbon hydrogen production and CO₂ utilization pathways.
            </p>
            <p className="text-body leading-relaxed text-faint font-light">
              Over eight years of research across Pakistan, China, and Morocco, I have designed reactor innovations, mentored multinational research groups, and built data-driven workflows that accelerate catalyst discovery from initial electronic structure concepts to pilot-scale autoclave validations.
            </p>
            <p className="text-body leading-relaxed text-faint font-light">
              Most recently, at <strong className="text-ink font-normal">UM6P Morocco</strong>, I drove autonomous catalyst screening protocols, utilizing machine learning algorithms and language model tooling to reduce experimental screening timelines by approximately 40%.
            </p>

            {/* Animated Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {[
                { end: 191, label: "Citations" },
                { end: 11, label: "Papers" },
                { end: 8, suffix: "+", label: "Years research" },
                { end: 3, label: "Countries" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl border border-edge bg-glass-bg">
                  <div className="text-2xl font-heading font-bold text-ink"><StatsCounter end={stat.end} suffix={stat.suffix} /></div>
                  <div className="text-label uppercase tracking-wider text-faint/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
