"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import SkillsConstellation from "@/components/SkillsConstellation";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding border-t border-edge">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4 text-center">
          <div className="flex justify-center">
            <SectionBadge number="04" notation="{2 0 0}" label="Skills" dSpacing="1.953 Å" />
          </div>
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            A <span className="text-accent-primary">constellation</span> of capabilities.
          </h2>
          <p className="text-small text-faint max-w-md mx-auto">
            Hover nodes to reveal specific tools and models. Use group legends to toggle focus on specific expertise subnets.
          </p>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <SkillsConstellation />
        </motion.div>
      </div>
    </section>
  );
}
