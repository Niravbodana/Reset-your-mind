"use client";

import { FlaskConical } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

/** Site-wide: product is in demo / preview until live payments + Google are enabled in Admin */
export function DemoModeBanner() {
  const { preferEnglish } = useLocale();
  return (
    <div className="bg-gold/15 border-b border-gold/25">
      <div className="mx-auto max-w-6xl px-4 py-2 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs text-ink-soft">
        <FlaskConical size={14} className="text-gold-light shrink-0" />
        <span>
          {preferEnglish ? (
            <>
              <strong className="text-gold-light">Demo mode</strong> — preview only. No real
              payment or Google charge yet. Live when Admin adds payment links.
            </>
          ) : (
            <>
              <strong className="text-gold-light">Demo mode</strong> — sirf preview. Abhi real
              payment / Google charge nahi. Admin me payment links add hone pe live.
            </>
          )}
        </span>
      </div>
    </div>
  );
}
