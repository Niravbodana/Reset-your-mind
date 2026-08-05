"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Skip scroll animation — use for above-the-fold content */
  immediate?: boolean;
};

export function ScrollReveal({ children, className = "", delay = 0, immediate = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  useEffect(() => {
    setHydrated(true);
  }, []);

  // SSR + first paint: always visible (fixes blank hero on slow mobile)
  if (immediate || !hydrated) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
