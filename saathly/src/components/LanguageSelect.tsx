"use client";

import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import type { UiLang } from "@/lib/i18n";

/** India launch languages — English default */
const INDIA_LANGS: { code: UiLang; native: string; label: string }[] = [
  { code: "en", native: "English", label: "Default" },
  { code: "hinglish", native: "Hinglish", label: "Hinglish" },
  { code: "hi", native: "हिन्दी", label: "Hindi" },
];

export function LanguageSelect({ compact = false }: { compact?: boolean }) {
  const { uiLang, setUiLang, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = INDIA_LANGS.find((l) => l.code === uiLang) || INDIA_LANGS[0];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 text-white/90 hover:border-gold/40 ${
          compact ? "px-2.5 py-1.5 text-[11px] min-h-[32px]" : "px-3 py-2 text-xs min-h-[36px]"
        }`}
        aria-label={t("nav.language")}
        aria-expanded={open}
      >
        <Languages size={14} className="text-gold-light shrink-0" />
        <span className="font-semibold max-w-[4.5rem] truncate">{current.native}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-[80] w-[min(16rem,calc(100vw-2rem))] max-h-[60vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0c0c12]/98 backdrop-blur-xl shadow-2xl p-2">
          <p className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted font-semibold">
            Language
          </p>
          {INDIA_LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setUiLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm min-h-[44px] ${
                uiLang === l.code
                  ? "bg-gold/20 text-gold-light"
                  : "text-white/85 hover:bg-white/5"
              }`}
            >
              <span className="font-medium">{l.native}</span>
              <span className="text-[11px] text-muted">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
