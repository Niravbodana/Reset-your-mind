"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, Shield, Sparkles, X } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { MESSAGE_BANK, getMessageBankStats } from "@/lib/message-bank";
import { formatCustomerName } from "@/lib/message-format";
import { regionPersonalPriceLabel } from "@/lib/pricing";
import { IPhoneNotificationDemo } from "./IPhoneNotificationDemo";
import { Wordmark } from "./Logo";

const MESSAGE_COUNT = getMessageBankStats().total;
const heroPool = MESSAGE_BANK.filter((t) => t.slot === "morning" || t.slot === "any");

export function Hero() {
  const config = useSiteConfig();
  const { language, preferEnglish } = useLocale();
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const displayName = name.trim() || (preferEnglish ? "Priya" : DEMO_NAME);
  const priceLabel = regionPersonalPriceLabel(config, "IN");
  const trialDays = config.marketing.trialDays;

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

  const trust = [
    { icon: Sparkles, text: `${MESSAGE_COUNT}+ messages with your name` },
    { icon: Bell, text: "Bills reminded 1 day early" },
    { icon: Shield, text: "Cancel anytime · No spam" },
  ];

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/88 via-black/78 to-[#030306]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/45" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 page-top pb-14 sm:pb-20 md:pb-28 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="min-w-0">
            <div className="mb-5 lg:hidden">
              <Wordmark className="text-2xl sm:text-3xl" />
              <p className="text-xs text-gold-light mt-1.5 font-medium tracking-wide">
                aapki life change hone ka reason
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[11px] font-semibold text-gold-light">
                {trialDays}-day free trial
              </span>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80">
                {priceLabel}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
                <X size={10} className="text-white/40" aria-hidden />
                Cancel anytime
              </span>
            </div>

            <h1 className="font-display text-[1.9rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.03em] mb-4 text-white">
              Your day,{" "}
              <span className="text-gold-light">handled.</span>
              <br className="hidden sm:block" />
              Your life, better.
            </h1>

            <p className="text-[15px] sm:text-lg text-ink-soft max-w-lg leading-relaxed mb-8">
              Wake up to messages that know your name. Bills caught before they stress you. Habits
              that actually stick — water, sleep, steps, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold shadow-lg shadow-gold/25 w-full sm:w-auto min-h-[52px]"
              >
                Start free trial
                <ArrowRight size={18} className="shrink-0" />
              </Link>
              <Link
                href="/#transform"
                className="btn-secondary inline-flex items-center justify-center px-7 py-4 rounded-xl text-[15px] font-medium w-full sm:w-auto min-h-[52px]"
              >
                See before & after
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {trust.map((t) => (
                <div key={t.text} className="flex items-center gap-2.5 text-sm text-ink-soft">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                    <t.icon size={15} className="text-gold-light" />
                  </span>
                  {t.text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full min-w-0" id="feel">
            <div className="relative mx-auto w-full max-w-[300px]">
              <IPhoneNotificationDemo name={displayName} compact />
            </div>
            <div className="mt-5 premium-card rounded-2xl p-4 sm:p-5 w-full max-w-sm mx-auto border border-white/10">
              <p className="text-sm font-medium text-white mb-3">Type your name — feel the message</p>
              <div className="flex flex-col gap-2 mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya, Rahul, Amit…"
                  maxLength={20}
                  aria-label="Your name for message preview"
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-base text-white placeholder:text-muted focus:outline-none focus:border-gold/60 min-h-[48px]"
                />
                <button
                  type="button"
                  onClick={() => setTick((t) => t + 1)}
                  className="btn-secondary rounded-xl px-5 py-3 text-sm font-medium w-full min-h-[48px]"
                >
                  Next message
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
