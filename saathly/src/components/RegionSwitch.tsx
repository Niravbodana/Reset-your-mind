"use client";

import { Globe } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

/** Compact India / Worldwide toggle */
export function RegionSwitch({ className = "" }: { className?: string }) {
  const { region, setRegion } = useLocale();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1 ${className}`}
      role="group"
      aria-label="Region"
    >
      <Globe size={14} className="text-gold-light ml-2 shrink-0" />
      {(["GLOBAL", "IN"] as const).map((r) => (
        <button
          key={r}
          type="button"
          onClick={() => setRegion(r)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold min-h-[32px] transition-colors ${
            region === r ? "bg-gold text-black" : "text-white/70 hover:text-white"
          }`}
        >
          {r === "GLOBAL" ? "Worldwide" : "India"}
        </button>
      ))}
    </div>
  );
}
