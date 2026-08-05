"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { NotificationPhone } from "./NotificationPhone";

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
  const price = config.features.earlyBirdActive
    ? config.marketing.earlyBirdPricePersonal
    : config.marketing.launchPricePersonal;

  return (
    <section className="relative min-h-[72vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-premium.jpg"
          alt="RIZN personalized daily motivation"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/88 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {config.waitlistCount > 0 && (
              <p className="text-xs text-gold-light font-semibold mb-4">
                {config.waitlistCount}+ log early access me join kar chuke
              </p>
            )}
            <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight mb-5 text-white">
              Har 2 ghante
              <br />
              <span className="text-gold-light">tumhare naam</span> pe
              <br />
              ek message jo kaam kare.
            </h1>
            <p className="text-base md:text-lg text-ink-soft max-w-lg leading-relaxed mb-6">
              Paisa, health, pyaar, career — RIZN roz 6 baar tumhe yaad dilata hai.
              Website preview abhi free; app jaldi push notifications ke saath.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link href="/signup" className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base">
                Early access — free
                <ArrowRight size={18} />
              </Link>
              <Link href="/samples" className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-xl text-base">
                22 sample messages
              </Link>
            </div>
            <p className="text-sm text-muted">
              ₹{price}/month at launch · {config.marketing.trialDays} din trial · Card not required now
            </p>
          </motion.div>

          <motion.div
            id="feel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="hidden lg:block absolute -left-4 top-8 z-10">
              <NotificationPhone name={displayName} />
            </div>
            <div className="lg:ml-[180px] soft-card rounded-2xl p-6 md:p-7">
              <p className="text-sm font-semibold text-white mb-1">Apna naam likho — abhi feel karo</p>
              <div className="flex gap-2 mb-4 mt-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya, Rahul, Ananya..."
                  maxLength={20}
                  className="flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white placeholder:text-muted focus:outline-none focus:border-gold"
                />
                <button type="button" onClick={() => setTick((t) => t + 1)} className="btn-secondary rounded-xl px-4 text-sm">
                  Agla
                </button>
              </div>
              <div className="rounded-xl bg-black/60 border border-white/10 p-4">
                <p className="text-[15px] leading-relaxed text-white/95">{message}</p>
              </div>
            </div>
            <div className="lg:hidden mt-8">
              <NotificationPhone name={displayName} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
