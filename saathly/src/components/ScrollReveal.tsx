"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
};

/** Always visible — no scroll-hide animations (mobile-safe) */
export function ScrollReveal({ children, className = "" }: Props) {
  return <div className={className}>{children}</div>;
}
