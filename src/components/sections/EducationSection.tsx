"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const containerReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function EducationSection() {
  return (
    <section id="education" className="section-padding border-t border-edge bg-surface/30">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
          <SectionBadge number="03" notation="⟨1 1 1⟩" label="Education" dSpacing="2.254 Å" />
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            Foundations in <span className="text-accent-primary">thermophysics</span> &amp; thermodynamics.
          </h2>
        </motion.div>

        <motion.div variants={containerReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PhD */}
          <motion.div variants={itemReveal} className="p-6 md:p-8 rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-md space-y-5 relative overflow-hidden shadow-xl group hover:border-accent-primary/35 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-accent-primary/10 to-transparent pointer-events-none" />
            <div className="space-y-1.5">
              <span className="font-mono text-small text-accent-primary uppercase tracking-wider font-semibold">PhD · Engineering Thermophysics</span>
              <h3 className="text-card-title font-heading font-semibold text-ink group-hover:text-accent-primary transition-colors">
                University of Chinese Academy of Sciences
              </h3>
              <p className="text-small text-faint">New Technology Lab · Beijing, China</p>
            </div>
            <p className="text-small text-faint leading-relaxed">
              <strong className="text-ink font-medium">Thesis:</strong> Investigation on catalysis and surface thermochemistry of La-based transition metal oxide catalysts.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-label text-faint">
              <span className="px-2 py-0.5 rounded-full bg-glass-bg border border-edge">DFT</span>
              <span className="px-2 py-0.5 rounded-full bg-glass-bg border border-edge">Micro-kinetics</span>
              <span className="px-2 py-0.5 rounded-full bg-glass-bg border border-edge">Reactor design</span>
              <span className="px-2 py-0.5 rounded-full bg-accent-secondary/5 border border-accent-secondary/20 text-accent-secondary">+35% quantum efficiency</span>
            </div>
            <div className="pt-4 border-t border-edge font-mono text-small text-faint">Aug 2017 → Aug 2023</div>
          </motion.div>

          {/* BSc */}
          <motion.div variants={itemReveal} className="p-6 md:p-8 rounded-2xl bg-glass-bg border border-glass-border backdrop-blur-md space-y-5 relative overflow-hidden shadow-xl group hover:border-accent-secondary/35 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-accent-secondary/10 to-transparent pointer-events-none" />
            <div className="space-y-1.5">
              <span className="font-mono text-small text-accent-secondary uppercase tracking-wider font-semibold">BSc · Mechanical Engineering</span>
              <h3 className="text-card-title font-heading font-semibold text-ink group-hover:text-accent-secondary transition-colors">
                University of Engineering &amp; Technology
              </h3>
              <p className="text-small text-faint">Lahore, Pakistan</p>
            </div>
            <p className="text-small text-faint leading-relaxed">
              Specialisation in fluid dynamics with industry-sponsored capstone projects covering thermodynamics, heat transfer, and energy systems.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-label text-faint">
              <span className="px-2 py-0.5 rounded-full bg-glass-bg border border-edge">Thermodynamics</span>
              <span className="px-2 py-0.5 rounded-full bg-glass-bg border border-edge">Heat transfer</span>
              <span className="px-2 py-0.5 rounded-full bg-glass-bg border border-edge">CFD</span>
              <span className="px-2 py-0.5 rounded-full bg-glass-bg border border-edge">Experimental validation</span>
            </div>
            <div className="pt-4 border-t border-edge font-mono text-small text-faint">Sep 2012 → Jul 2016</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
