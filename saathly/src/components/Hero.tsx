"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Shield, Zap } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { MESSAGE_BANK, getMessageBankStats } from "@/lib/message-bank";
import { formatCustomerName } from "@/lib/message-format";
import { IPhoneNotificationDemo } from "./IPhoneNotificationDemo";
import { OfferBanner, OfferPrice } from "./OfferPrice";

const MESSAGE_COUNT = getMessageBankStats().total;
const heroPool = MESSAGE_BANK.filter((t) => t.slot === "morning" || t.slot === "any");

const TRUST = [
  { icon: Heart, text: "Naam ke saath daily care" },
  { icon: Shield, text: "EMI 1 din pehle alert" },
  { icon: Zap, text: `${MESSAGE_COUNT}+ unique messages` },
];

export function Hero() {
  const config = useSiteConfig();
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const displayName = name.trim() || DEMO_NAME;
  const message = useMemo(() => {
    const tpl = heroPool[tick % heroPool.length];
    const n = formatCustomerName(displayName, "hinglish");
    return tpl.hinglish.replaceAll("{name}", n);
  }, [displayName, tick]);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-x-hidden md:min-h-[100dvh] md:flex md:items-center"
    >
      <div className="absolute inset-0 min-h-full">
        <Image
          src="/images/animatic-after-hope.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center scale-105 hero-kenburns"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030306] via-black/20 to-black/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 page-top pb-10 sm:pb-14 md:pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
          {/* Copy — always visible immediately on mobile */}
          <div className="min-w-0">
            <OfferBanner />
            {config.waitlistCount > 0 && (
              <p className="text-xs text-gold-light/80 mt-3 mb-1">
                {config.waitlistCount}+ logon ne apni life better banani shuru ki
              </p>
            )}
            <h1 className="font-display text-[1.65rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] font-bold leading-[1.12] tracking-[-0.03em] mb-3 sm:mb-5 text-white mt-2 sm:mt-4">
              Humse judo —
              <span className="text-gold-light"> life better</span> ho sakti hai.
            </h1>
            <p className="text-[15px] sm:text-base md:text-xl text-ink-soft max-w-lg leading-[1.65] mb-5 sm:mb-8">
              Roz tumhare naam pe messages. EMI 1 din pehle. ₹99 me poora plan — hope, habit, control
              wapas.
            </p>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap mb-5 sm:mb-8">
              {TRUST.map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-xs sm:text-sm text-ink-soft">
                  <t.icon size={14} className="text-gold-light shrink-0" />
                  {t.text}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-gold/30 w-full sm:w-auto min-h-[48px]"
              >
                ₹99 plan — abhi shuru karo
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#transform"
                className="btn-secondary inline-flex items-center justify-center px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-[15px] font-medium w-full sm:w-auto min-h-[48px]"
              >
                Pehle vs Ab dekho
              </Link>
            </div>
            <div className="mt-3">
              <OfferPrice plan="personal" size="sm" className="text-sm text-ink-soft" />
            </div>
          </div>

          {/* Phone demo */}
          <div className="relative w-full min-w-0" id="feel">
            <div className="relative scale-[0.92] sm:scale-100 origin-top mx-auto max-w-[min(280px,88vw)] sm:max-w-none">
              <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full opacity-60" />
              <IPhoneNotificationDemo name={displayName} compact />
            </div>
            <div className="mt-4 sm:mt-6 premium-card rounded-2xl p-4 sm:p-5 w-full max-w-sm mx-auto">
              <p className="text-sm font-medium text-white mb-2">Apna naam likho — message feel karo</p>
              <div className="flex flex-col sm:flex-row gap-2 mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya, Rahul, Amit..."
                  maxLength={20}
                  className="w-full min-w-0 flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white placeholder:text-muted focus:outline-none focus:border-gold/60"
                />
                <button
                  type="button"
                  onClick={() => setTick((t) => t + 1)}
                  className="btn-secondary rounded-xl px-5 py-3 text-sm font-medium w-full sm:w-auto shrink-0 min-h-[48px]"
                >
                  Agla
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
