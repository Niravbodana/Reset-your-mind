"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { NotificationPhone } from "./NotificationPhone";
import { OfferBanner, OfferPrice } from "./OfferPrice";

const templates = [
  (n: string) =>
    `${n}, subah ka signal: paani piyo aur 5 min walk — body on, dimaag sharp.`,
  (n: string) =>
    `${n}, EMI tension? Panic band. Aaj sirf ₹50 side — chhota step, bada future.`,
  (n: string) =>
    `${n}, dil heavy? Normal hai. 5 min saans lo — tu akela nahi hai.`,
  (n: string) =>
    `${n}, office overload? Ek kaam finish, baaki kal. Tu machine nahi hai.`,
  (n: string) =>
    `${n}, raat ko overthink? Phone side. Kal fresh start.`,
];

export function Hero() {
  const config = useSiteConfig();
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const displayName = name.trim() || DEMO_NAME;
  const message = useMemo(() => templates[tick % templates.length](displayName), [displayName, tick]);

  return (
    <section className="relative min-h-[72vh] md:min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-premium.jpg"
          alt="RIZN personalized daily motivation"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/90 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <OfferBanner />
              {config.waitlistCount > 0 && (
                <span className="text-xs text-ink-soft">{config.waitlistCount}+ on waitlist</span>
              )}
            </div>
            <h1 className="font-display text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-bold leading-[1.15] tracking-[-0.02em] mb-5 text-white">
              Tumhare naam pe messages —
              <span className="text-gold-light"> tumhari timing</span> pe.
            </h1>
            <p className="text-base md:text-[1.05rem] text-ink-soft max-w-lg leading-[1.65] mb-6 font-normal">
              30 min se 4 hour — khud choose karo kitni der baad nudge chahiye. Wake, lunch, gym,
              medicine, dinner — sab Settings me. Preview abhi free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold"
              >
                Start free preview
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/samples"
                className="btn-secondary inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-[15px] font-medium"
              >
                Sample messages
              </Link>
            </div>
            <OfferPrice plan="personal" size="sm" className="text-sm" />
            <p className="text-xs text-muted mt-2">
              {config.marketing.trialDays} din trial when billing opens · No card now
            </p>
          </div>

          <div id="feel" className="relative">
            <div className="hidden lg:block absolute -left-4 top-8 z-10">
              <NotificationPhone name={displayName} />
            </div>
            <div className="lg:ml-[180px] soft-card rounded-2xl p-5 md:p-6">
              <p className="text-sm font-medium text-white mb-1">Apna naam likho — feel karo</p>
              <div className="flex gap-2 mb-3 mt-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya, Rahul, Ananya..."
                  maxLength={20}
                  className="flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-[15px] text-white placeholder:text-muted focus:outline-none focus:border-gold/60"
                />
                <button
                  type="button"
                  onClick={() => setTick((t) => t + 1)}
                  className="btn-secondary rounded-xl px-4 text-sm font-medium"
                >
                  Agla
                </button>
              </div>
              <div className="rounded-xl bg-black/50 border border-white/10 p-4">
                <p className="text-[15px] leading-[1.6] text-white/95 font-normal">{message}</p>
              </div>
            </div>
            <div className="lg:hidden mt-6">
              <NotificationPhone name={displayName} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
