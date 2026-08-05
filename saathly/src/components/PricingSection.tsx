"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { getMessageBankStats } from "@/lib/message-bank";
import { dualPersonalPriceLabel, formatPersonalPrice } from "@/lib/pricing";
import { useLocale } from "@/context/LocaleContext";
import { formatMoney } from "@/lib/locale";
import { OfferPrice } from "./OfferPrice";
import { ScrollReveal } from "./ScrollReveal";
import { UpiPayPreview } from "./UpiPayPreview";
import { WhatsAppCTA } from "./WhatsAppCTA";
import { NoSpamPromise } from "./NoSpamPromise";
import { RegionSwitch } from "./RegionSwitch";

const MESSAGE_COUNT = getMessageBankStats().total;

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  const config = useSiteConfig();
  const { region, currency, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const priceLabel = formatPersonalPrice(config, currency);
  const trialDays = config.marketing.trialDays;
  const launchLabel = formatMoney(
    currency === "USD"
      ? config.marketing.launchPricePersonalUsd
      : config.marketing.launchPricePersonal,
    currency
  );

  const features = isIN
    ? [
        `${MESSAGE_COUNT}+ unique messages — naam ke saath`,
        "Steps goal + live walk · Water · Sleep wind-down",
        "Health score · naam ke saath goal nudges",
        "EMI / bills + calendar · Mark as paid",
        "Morning one-card · Soft Day · Pause 7 days",
        "Streak freeze · Weekly wins · Buddy check-in",
        "Trial day-5 value report",
        "Hinglish / Hindi / English · Worldwide",
      ]
    : [
        `${MESSAGE_COUNT}+ unique messages — with your name`,
        "Steps goal + live walk · Water · Sleep wind-down",
        "Health score · goal nudges with your name",
        "Bills + calendar · Mark as paid",
        "Morning one-card · Soft Day · Pause 7 days",
        "Streak freeze · Weekly wins · Buddy check-in",
        "Trial day-5 value report",
        "English / Hinglish / Hindi · Worldwide",
      ];

  return (
    <section id="pricing" className="py-14 sm:py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <RegionSwitch />
            </div>
            <p className="section-label mb-3">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              {isIN ? (
                <>
                  Sirf <span className="text-gold-light">{priceLabel}</span> — poora plan
                </>
              ) : (
                <>
                  From <span className="text-gold-light">{priceLabel}</span> — worldwide
                </>
              )}
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              {isIN
                ? `${trialDays}-day free trial, phir ${priceLabel}/month autopay. Daily messages + EMI reminders. Launch pe ${launchLabel}. Also ${dualPersonalPriceLabel(config)}.`
                : `${trialDays}-day free trial, then ${priceLabel}/month. Daily messages + bill reminders. Also ${dualPersonalPriceLabel(config)}.`}
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.1} className="max-w-xl mx-auto">
          <div className="rounded-2xl p-5 sm:p-8 md:p-10 relative bg-bg-card border border-gold/35 shadow-xl shadow-gold/5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-[11px] font-bold px-4 py-1 rounded-full">
              Life change plan
            </span>
            <h3 className="font-display text-2xl font-bold text-white mb-1 text-center">
              RIZN Personal
            </h3>
            <p className="text-sm text-muted mb-6 text-center">
              {isIN
                ? "Messages + EMI / bill reminders — sab included"
                : "Messages + bill reminders — everything included"}
            </p>
            <div className="flex justify-center mb-8">
              <OfferPrice plan="personal" size="lg" />
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                  <Check size={16} className="text-success shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="btn-primary block text-center py-4 rounded-xl text-base font-bold min-h-[52px]"
            >
              Start {trialDays}-day free trial
            </Link>
            <Link
              href="/billing"
              className="mt-3 text-center text-sm text-gold-light hover:underline min-h-[44px] flex items-center justify-center"
            >
              {isIN
                ? `Autopay detail — ${trialDays} din baad ${priceLabel}/mo`
                : `See autopay — ${priceLabel}/mo after trial`}
            </Link>
            <div className="mt-3">
              <WhatsAppCTA variant="bar" />
            </div>
            <p className="text-xs text-center text-muted mt-3">
              {isIN
                ? `Aaj ${formatMoney(0, currency)} · ${trialDays} din free · Phir ${priceLabel}/month automatic`
                : `${formatMoney(0, currency)} today · ${trialDays} days free · Then ${priceLabel}/month`}
            </p>
          </div>
          <div className="mt-6">
            <UpiPayPreview />
          </div>
          <div className="mt-4">
            <NoSpamPromise />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
