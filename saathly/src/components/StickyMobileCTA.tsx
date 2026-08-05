"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-gold/25 bg-black/95 backdrop-blur-lg px-4 py-3 safe-area-pb safe-area-px">
      <Link
        href="/signup"
        className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold min-h-[48px] overflow-hidden"
      >
        <span className="truncate">₹99 plan join karo — abhi</span>
        <ArrowRight size={16} className="shrink-0" />
      </Link>
    </div>
  );
}
