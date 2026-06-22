"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import SectionBadge from "@/components/SectionBadge";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const containerReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const awards = [
  { year: "2022", title: "Outstanding International Student", org: "University of Chinese Academy of Sciences · Beijing" },
  { year: "2020–24", title: "CAS–TWAS Fellowship", org: "The World Academy of Sciences" },
  { year: "2017–20", title: "Belt & Road Fellowship", org: "UCAS · Beijing" },
];

const conferences = [
  { tag: "ECM", title: "European Combustion Meeting · Oral Talk", desc: "“Ab Initio Calculation of Surface Thermochemistry for Popular Solid Transition-Metal Species”" },
  { tag: "2025–26", title: "Lecturer · Process Engineering", desc: "UM6P Morocco · Reactor design, process optimisation, chemical-process safety." },
  { tag: "2020–21", title: "Graduate Teaching Assistant", desc: "University of Chinese Academy of Sciences · Postgraduate tutorials & lab supervisor." },
];

export default function AwardsSection() {
  return (
    <section id="awards" className="section-padding border-t border-edge bg-surface/30">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
          <SectionBadge number="07" notation="{h k l}" label="Recognition" />
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            Awards, conferences, and academic contributions.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Awards column */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-title text-accent-secondary flex items-center gap-2">
              <Award className="w-5 h-5" />
              Awards &amp; Fellowships
            </h3>
            <motion.div variants={containerReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
              {awards.map((award, i) => (
                <motion.div key={i} variants={itemReveal} className="flex gap-4 p-4 rounded-xl border border-edge bg-glass-bg">
                  <span className="font-mono text-small text-accent-secondary border border-accent-secondary/20 bg-accent-secondary/5 px-2.5 py-1 rounded-md shrink-0 h-fit">{award.year}</span>
                  <div>
                    <h4 className="font-heading font-medium text-small text-ink">{award.title}</h4>
                    <p className="text-small text-faint/70 mt-1">{award.org}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Conferences column */}
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-title text-accent-primary flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Conferences &amp; Lectures
            </h3>
            <motion.div variants={containerReveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
              {conferences.map((conf, i) => (
                <motion.div key={i} variants={itemReveal} className="flex gap-4 p-4 rounded-xl border border-edge bg-glass-bg">
                  <span className="font-mono text-small text-accent-primary border border-accent-primary/20 bg-accent-primary/5 px-2.5 py-1 rounded-md shrink-0 h-fit">{conf.tag}</span>
                  <div>
                    <h4 className="font-heading font-medium text-small text-ink">{conf.title}</h4>
                    <p className="text-small text-faint/70 mt-1">{conf.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
