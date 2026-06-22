"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import PublicationsList from "@/components/PublicationsList";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PublicationsSection() {
  return (
    <section id="publications" className="section-padding border-t border-edge">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
          <SectionBadge number="06" notation="[h k l]" label="Publications" />
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            11 peer-reviewed papers, <span className="text-accent-secondary">first-author</span> on 4.
          </h2>
          <p className="text-small text-faint max-w-xl">
            Academic publications fetched directly via OpenAlex + Crossref APIs, sorted and filterable dynamically below.
          </p>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <PublicationsList />
        </motion.div>
      </div>
    </section>
  );
}
