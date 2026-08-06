"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { regionPersonalPriceLabel } from "@/lib/pricing";

export function FinalCTA() {
  const config = useSiteConfig();
  const { region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const priceLabel = regionPersonalPriceLabel(config, region);

  return (
    <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.06] via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-4xl px-4 md:px-6 text-center relative">
        <div className="premium-card shimmer-border rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-gold-light mx-auto mb-4" />
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight mb-4 sm:mb-5">
            {isIN ? (
              <>
                Aaj hi join karo — kal se life <span className="text-gold-light">better.</span>
              </>
            ) : (
              <>
                Join today — tomorrow can feel{" "}
                <span className="text-gold-light">better.</span>
              </>
            )}
          </h2>
          <p className="text-ink-soft text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-lg mx-auto leading-relaxed">
            {isIN
              ? `${priceLabel} me roz tumhare naam pe value. EMI/bill alert, daily motivation, habit — sab ek jagah. Tum deserve karte ho ye change.`
              : `${priceLabel} — daily messages with your name, bill reminders, habits in one place.`}
          </p>
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 sm:px-12 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold shadow-xl shadow-gold/25 w-full sm:w-auto max-w-sm mx-auto min-h-[52px]"
          >
            {isIN ? `Abhi shuru karo — ${priceLabel}` : `Start free — ${priceLabel}`}
            <ArrowRight size={20} className="shrink-0" />
          </Link>
          <p className="mt-6 text-xs text-muted">
            {config.marketing.trialDays}-day free trial · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
