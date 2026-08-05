"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-gold/20 bg-black/95 backdrop-blur-lg px-4 py-3 safe-area-pb">
      <Link
        href="/signup"
        className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold"
      >
        Join early access — free preview
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
