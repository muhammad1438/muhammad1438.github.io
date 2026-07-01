"use client";

import AnimatedCounters from "@/components/AnimatedCounters";

interface StatsCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function StatsCounter(props: StatsCounterProps) {
  return <AnimatedCounters {...props} />;
}
