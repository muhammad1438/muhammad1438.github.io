"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import ContactForm from "@/components/ContactForm";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const marqueeWords = [
  "H₂ Production", "CO₂ Valorisation", "DFT", "Molecular Dynamics",
  "Machine Learning", "Zeolites", "Heterogeneous Catalysis", "Biomass", "Photocatalysis",
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding border-t border-edge">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4 text-center">
          <div className="flex justify-center">
            <SectionBadge number="08" notation="⟨0 0 1⟩" label="Connection" dSpacing="3.905 Å" />
          </div>
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            Let&apos;s <span className="text-accent-primary">collaborate</span>.
          </h2>
          <p className="text-small text-faint max-w-md mx-auto">
            Open to postdoctoral positions, Senior R&amp;D scientist roles, and project consultancies in green energy, catalysis, and ML.
          </p>
        </motion.div>

        {/* Marquee CTA */}
        <div className="marquee-container py-6 border-y border-edge">
          <div className="marquee-track text-display text-faint/30 font-heading italic">
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span key={i} className="mx-8">{word} ·</span>
            ))}
          </div>
        </div>

        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
