"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type ScrollRevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "fade"
  | "blur-up"
  | "rotate-in";

type Props = {
  children: ReactNode;
  className?: string;
  /** Seconds — keep small for snappy feel */
  delay?: number;
  /** Skip observer (above fold) */
  immediate?: boolean;
  variant?: ScrollRevealVariant;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
  variant = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(() => {
    if (immediate) return true;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (immediate || visible) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, visible]);

  return (
    <div
      ref={ref}
      data-variant={variant}
      className={`scroll-reveal scroll-reveal--${variant} ${visible ? "scroll-reveal--in" : ""} ${className}`}
      style={{ ["--sr-delay" as string]: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/** Full-width section entrance — distinct motion per block */
export function SectionReveal({
  children,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  className?: string;
}) {
  return (
    <ScrollReveal variant={variant} className={className}>
      {children}
    </ScrollReveal>
  );
}
