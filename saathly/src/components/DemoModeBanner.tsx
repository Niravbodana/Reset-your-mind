"use client";

import { useLocale } from "@/context/LocaleContext";

/** Ultra-thin demo strip — must not cover nav / hero */
export function DemoModeBanner() {
  const { preferEnglish } = useLocale();
  return (
    <div className="bg-gold/10 border-b border-gold/15 leading-none">
      <p className="px-2 py-[3px] text-center text-[9px] sm:text-[10px] text-gold-light/90 tracking-wide truncate">
        {preferEnglish
          ? "Demo — preview only · no real payment yet"
          : "Demo — sirf preview · abhi real payment nahi"}
      </p>
    </div>
  );
}
