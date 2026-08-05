"use client";

import { MapPin } from "lucide-react";
import { INDIA_ONLY } from "@/lib/market";
import { useLocale } from "@/context/LocaleContext";
import { useEffect } from "react";

/** India launch — show India badge only (Worldwide hidden for now) */
export function RegionSwitch({ className = "" }: { className?: string }) {
  const { region, setRegion } = useLocale();

  useEffect(() => {
    if (INDIA_ONLY && region !== "IN") setRegion("IN");
  }, [region, setRegion]);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 ${className}`}
      aria-label="Region"
    >
      <MapPin size={14} className="text-gold-light shrink-0" />
      <span className="text-xs font-semibold text-gold-light">India 🇮🇳</span>
    </div>
  );
}
