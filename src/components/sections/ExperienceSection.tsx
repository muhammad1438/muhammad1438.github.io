"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/SectionBadge";
import EnhancedTimeline from "@/components/EnhancedTimeline";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const experiences = [
  {
    date: "Jan 2025 → May 2026",
    location: "📍 Ben Guerir, Morocco",
    title: "Postdoctoral Researcher · Chemical & Biochemical Sciences",
    org: "University Mohammed VI Polytechnic (UM6P)",
    active: true,
    items: [
      "Steered multi-institutional hydrogen production and CO₂ valorisation programmes from concept to pilot scale.",
      "Automated DFT, MD, and micro-kinetic HPC pipelines for catalyst stability and reaction-pathway studies.",
      "ML + LLM tooling reducing experimental screening time by ~40%.",
      "Built OpenContextFramework — an agentic AI for literature mining and hypothesis generation.",
      "High-pressure autoclave experiments with biomass feedstocks; zeolite catalyst synthesis & characterisation.",
    ],
  },
  {
    date: "Aug 2023 → Aug 2024",
    location: "📍 Beijing, China",
    title: "Postdoctoral Researcher",
    org: "Institute of Engineering Thermophysics, Chinese Academy of Sciences (CAS)",
    active: false,
    items: [
      "Mentored a cohort of 5+ international researchers; instituted protocols that raised catalytic-test repeatability by 25%.",
      "Co-led CO oxidation and methane activation campaigns — three peer-reviewed papers and two invited talks.",
      "Managed instrumentation sharing across CAS institutes, doubling collaborative project inflow.",
    ],
  },
  {
    date: "Jun 2016 → Jul 2017",
    location: "📍 Lahore, Pakistan",
    title: "Intern Engineer",
    org: "Pakistan Industrial Technical Assistance Centre (PITAC)",
    active: false,
    items: [
      "Supported CAD/CAM workflows and produced fabrication drawings for bespoke tooling projects.",
      "Documented test procedures, contributing to design refinements for thermal systems.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding border-t border-edge">
      <div className="max-w-[1180px] mx-auto px-6 space-y-12">
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-4">
          <SectionBadge number="02" notation="⟨1 1 0⟩" label="Experience" dSpacing="2.761 Å" />
          <h2 className="text-display font-heading font-semibold text-ink tracking-tight">
            Eight years across <span className="text-accent-primary">three continents</span>.
          </h2>
          <p className="text-small max-w-xl text-faint">
            From mechanical manufacturing drawings in Lahore to high-performance supercomputing clusters in Beijing and Ben Guerir.
          </p>
        </motion.div>

        <EnhancedTimeline items={experiences} />
      </div>
    </section>
  );
}
