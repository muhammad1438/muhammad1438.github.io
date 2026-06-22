"use client";

import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
}

export default function Typewriter({
  text,
  delay = 400,
  speed = 70,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;

    const startTyping = () => {
      timer = setInterval(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
        if (index >= text.length) {
          clearInterval(timer);
        }
      }, speed);
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, delay, speed]);

  return (
    <span>
      {displayText}
      <span className="inline-block w-[3px] h-[0.9em] bg-accent-primary ml-[4px] align-[-0.05em] animate-pulse shadow-[0_0_12px_var(--accent-primary)]" />
    </span>
  );
}
