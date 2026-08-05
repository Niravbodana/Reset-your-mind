"use client";

import { useEffect } from "react";
import { Globe } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useApp } from "@/context/AppContext";

/** India / Worldwide toggle — after login, only the chosen region stays visible */
export function RegionSwitch({ className = "" }: { className?: string }) {
  const { region, setRegion, regionLocked, setRegionLocked } = useLocale();
  const { state } = useApp();
  const loggedIn = Boolean(state.user);

  useEffect(() => {
    if (loggedIn && !regionLocked) setRegionLocked(true);
    if (!loggedIn && regionLocked) setRegionLocked(false);
  }, [loggedIn, regionLocked, setRegionLocked]);

  if (loggedIn || regionLocked) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 ${className}`}
        aria-label="Region"
      >
        <Globe size={14} className="text-gold-light shrink-0" />
        <span className="text-xs font-semibold text-gold-light">
          {region === "IN" ? "India" : "Worldwide"}
        </span>
      </div>
    );
  }

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
