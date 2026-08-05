"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { MESSAGE_BANK } from "@/lib/message-bank";
import { formatCustomerName } from "@/lib/message-format";
import { IPhoneNotificationDemo } from "./IPhoneNotificationDemo";
import { OfferBanner, OfferPrice } from "./OfferPrice";
import { ScrollReveal } from "./ScrollReveal";

const heroPool = MESSAGE_BANK.filter((t) => t.slot === "morning" || t.slot === "any").slice(0, 12);

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

  return (
    <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/transform-premium.jpg"
          alt="RIZN — life change"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/85 to-black/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-28 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <OfferBanner />
              {config.waitlistCount > 0 && (
                <span className="text-xs text-ink-soft">{config.waitlistCount}+ members joined</span>
              )}
            </div>
            <h1 className="font-display text-[2.1rem] sm:text-[2.85rem] lg:text-[3.25rem] font-bold leading-[1.12] tracking-[-0.03em] mb-5 text-white">
              Tumhari life
              <span className="text-gold-light"> better banane</span> ka ek rasta.
            </h1>
            <p className="text-base md:text-lg text-ink-soft max-w-lg leading-[1.7] mb-6">
              Roz naam pe messages + EMI 1 din pehle alert. ₹99 me poora plan — hope, habit, control.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold shadow-lg shadow-gold/25"
              >
                ₹99 plan join karo — abhi
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#emi-reminder"
                className="btn-secondary inline-flex items-center justify-center px-7 py-4 rounded-xl text-[15px] font-medium"
              >
                EMI reminder dekho
              </Link>
            </div>
            <OfferPrice plan="personal" size="sm" className="text-sm" />
            <p className="text-xs text-muted mt-2">
              Limited offer · {config.marketing.trialDays} din trial · No card now
            </p>
          </ScrollReveal>

          <div className="relative" id="feel">
            <ScrollReveal delay={0.15}>
              <IPhoneNotificationDemo name={displayName} />
              <div className="mt-6 soft-card rounded-2xl p-4 md:p-5 max-w-sm mx-auto">
              <p className="text-sm font-medium text-white mb-2">Apna naam likho — feel karo</p>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya, Anand, Rahul..."
                  maxLength={20}
                  className="flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-gold/60"
                />
                <button
                  type="button"
                  onClick={() => setTick((t) => t + 1)}
                  className="btn-secondary rounded-xl px-4 text-sm font-medium"
                >
                  Agla
                </button>
              </div>
              <p className="text-[14px] leading-relaxed text-white/95">{message}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
