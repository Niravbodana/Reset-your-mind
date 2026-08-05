"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Zap } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { MESSAGE_BANK, getMessageBankStats } from "@/lib/message-bank";
import { formatCustomerName } from "@/lib/message-format";
import { formatPersonalPrice } from "@/lib/pricing";
import { IPhoneNotificationDemo } from "./IPhoneNotificationDemo";
import { OfferBanner, OfferPrice } from "./OfferPrice";
import { Wordmark } from "./Logo";
import { RegionSwitch } from "./RegionSwitch";

const MESSAGE_COUNT = getMessageBankStats().total;
const heroPool = MESSAGE_BANK.filter((t) => t.slot === "morning" || t.slot === "any");

export function Hero() {
  const config = useSiteConfig();
  const { region, currency, language, preferEnglish } = useLocale();
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const displayName = name.trim() || (preferEnglish ? "Alex" : DEMO_NAME);
  const priceLabel = formatPersonalPrice(config, currency);
  const isIN = region === "IN" && !preferEnglish;

  const message = useMemo(() => {
    const tpl = heroPool[tick % heroPool.length];
    const msgLang = preferEnglish
      ? "english"
      : language === "hindi"
        ? "hindi"
        : language === "english"
          ? "english"
          : "hinglish";
    const n = formatCustomerName(displayName, msgLang);
    const text =
      msgLang === "english"
        ? tpl.english || tpl.hinglish
        : msgLang === "hindi"
          ? tpl.hindi || tpl.hinglish
          : tpl.hinglish;
    return text.replaceAll("{name}", n);
  }, [displayName, tick, language, preferEnglish]);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 4500);
    return () => clearInterval(t);
  }, []);

  const trust = isIN
    ? [
        { icon: Heart, text: "Steps · Water · Sleep — naam ke saath nudge" },
        { icon: Shield, text: "Bills + Health score · Soft Day" },
        { icon: Zap, text: `${MESSAGE_COUNT}+ messages · Buddy · Wins` },
      ]
    : [
        { icon: Heart, text: "Steps · Water · Sleep — nudges with your name" },
        { icon: Shield, text: "Bills + Health score · Soft Day" },
        { icon: Zap, text: `${MESSAGE_COUNT}+ messages · Buddy · Wins` },
      ];

  const tagline = isIN
    ? config.marketing.indiaTagline || "Aapki life change ka reason"
    : config.marketing.globalTagline || "Your reason for life change";

  return (
    <section id="hero" className="relative overflow-x-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/animatic-after-hope.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%] sm:object-center scale-[1.04] sm:scale-105 sm:motion-safe:hero-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-[#030306]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 page-top pb-12 sm:pb-16 md:pb-24 w-full">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <RegionSwitch />
          <span className="text-[11px] text-white/45 uppercase tracking-wider">
            Available worldwide
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start lg:items-center">
          <div className="min-w-0">
            <div className="mb-4 lg:hidden">
              <Wordmark className="text-2xl sm:text-3xl" />
              <p className="text-xs text-gold-light mt-1.5 font-medium tracking-wide">{tagline}</p>
            </div>

            <OfferBanner />

            {config.waitlistCount > 0 && (
              <p className="text-xs text-gold-light/80 mt-3 mb-1">
                {isIN
                  ? `${config.waitlistCount}+ logon ne apni life better banani shuru ki`
                  : `${config.waitlistCount}+ people started building better days with RIZN`}
              </p>
            )}

            <h1 className="font-display text-[1.85rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.5rem] font-bold leading-[1.12] tracking-[-0.03em] mb-4 sm:mb-5 text-white mt-3 sm:mt-4">
              {isIN ? (
                <>
                  Humse join karo —
                  <span className="text-gold-light"> life better</span> ho sakti hai.
                </>
              ) : (
                <>
                  Join us —
                  <span className="text-gold-light"> life can get better</span>.
                </>
              )}
            </h1>

            <p className="text-[15px] sm:text-base md:text-xl text-ink-soft max-w-lg leading-[1.65] mb-6 sm:mb-8">
              {isIN
                ? `Roz tumhare naam pe messages. Bills/EMI 1 din pehle. ${priceLabel}/month — hope, habit, control wapas. ${config.marketing.trialDays}-day free trial.`
                : `Daily messages with your name. Bill reminders 1 day early. ${priceLabel}/month worldwide — hope, habits, control back. ${config.marketing.trialDays}-day free trial.`}
            </p>

            <div className="flex flex-col gap-3 mb-6 sm:mb-8">
              {trust.map((t) => (
                <div key={t.text} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                    <t.icon size={16} className="text-gold-light" />
                  </span>
                  {t.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-gold/30 w-full sm:w-auto min-h-[52px]"
              >
                {config.marketing.trialDays}-day free trial — start
                <ArrowRight size={18} className="shrink-0" />
              </Link>
              <Link
                href="/#transform"
                className="btn-secondary inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-xl text-[15px] font-medium w-full sm:w-auto min-h-[48px]"
              >
                {isIN ? "Pehle vs Ab dekho" : "See before vs after"}
              </Link>
            </div>

            <div className="mt-4">
              <OfferPrice plan="personal" size="sm" className="text-sm text-ink-soft" />
            </div>
          </div>

          <div className="relative w-full min-w-0" id="feel">
            <div className="relative mx-auto w-full max-w-[300px]">
              <IPhoneNotificationDemo name={displayName} compact />
            </div>
            <div className="mt-5 premium-card rounded-2xl p-4 sm:p-5 w-full max-w-sm mx-auto border border-white/10">
              <p className="text-sm font-medium text-white mb-3">
                {isIN ? "Apna naam likho — message feel karo" : "Type your name — feel the message"}
              </p>
              <div className="flex flex-col gap-2 mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isIN ? "Priya, Rahul, Amit..." : "Alex, Priya, Sam..."}
                  maxLength={20}
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-base text-white placeholder:text-muted focus:outline-none focus:border-gold/60 min-h-[48px]"
                />
                <button
                  type="button"
                  onClick={() => setTick((t) => t + 1)}
                  className="btn-secondary rounded-xl px-5 py-3 text-sm font-medium w-full min-h-[48px]"
                >
                  {isIN ? "Agla message dekho" : "Next message"}
                </button>
              </div>
              <p className="text-[14px] leading-relaxed text-white/95 break-words">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
