"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Sparkles } from "lucide-react";
import { LiveStats } from "./LiveStats";
import { NotificationPhone } from "./NotificationPhone";

const templates = [
  (n: string) =>
    `${n}, subah ka signal: aaj ek chhota step — paani + 5 min walk. Body on, mind sharp.`,
  (n: string) =>
    `${n}, EMI tension feel ho rahi? Panic band. Aaj sirf ₹50 side — future tumhara hai.`,
  (n: string) =>
    `${n}, dil heavy? Normal hai. 5 min saans. Tu akela nahi. Phir aage badh.`,
  (n: string) =>
    `${n}, office overload? Ek kaam finish, baaki kal. Tu machine nahi, insaan hai.`,
  (n: string) =>
    `${n}, raat ko overthink? Phone side. Kal fresh start. Tu rise kar sakta hai.`,
];

export function Hero() {
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const displayName = name.trim() || "Tumhara Naam";
  const message = useMemo(() => templates[tick % templates.length](displayName), [displayName, tick]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-premium.jpg"
          alt="RIZN premium daily motivation"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/30 to-black/50" />
      </div>

      <div className="absolute top-24 right-8 hidden xl:block">
        <div className="glass-gold rounded-2xl px-4 py-3 text-center">
          <p className="text-2xl font-display font-bold gradient-gold">4.9★</p>
          <p className="text-[10px] text-muted">12,000+ reviews</p>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-2 text-xs text-gold-light mb-6 backdrop-blur-sm">
              <Sparkles size={14} className="text-gold" />
              <span className="font-semibold">PREMIUM v2</span>
              <span className="text-white/40">·</span>
              <Star size={12} className="fill-gold text-gold" />
              47,000+ members
            </div>

            <h1 className="font-display text-[2.5rem] sm:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.06] tracking-tight mb-5 text-white">
              Har 2 ghante
              <br />
              <span className="gradient-gold">tumhare naam</span> pe
              <br />
              ek message jo life badle.
            </h1>

            <p className="text-base md:text-lg text-ink-soft max-w-lg leading-relaxed mb-6">
              Paisa, health, pyaar, career — jo bhi heavy hai, RIZN roz 6 baar tumhe yaad dilata hai.
              Sirf ₹99/month. 7 din bilkul free.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { icon: Shield, text: "Private & secure" },
                { icon: Star, text: "4.9★ rated" },
              ].map((b) => (
                <span
                  key={b.text}
                  className="inline-flex items-center gap-1.5 text-xs text-ink-soft bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                >
                  <b.icon size={12} className="text-gold" />
                  {b.text}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base text-lg"
              >
                7 din bilkul free shuru karo
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#transform"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-xl text-base"
              >
                Pehle vs Ab dekho
              </Link>
            </div>

            <LiveStats />
          </motion.div>

          <motion.div
            id="feel"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 z-20">
              <NotificationPhone name={displayName === "Tumhara Naam" ? "Nirav" : displayName} />
            </div>

            <div className="md:ml-[200px] glass-gold rounded-3xl p-6 relative overflow-hidden shimmer-border">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />

              <p className="text-sm font-semibold text-gold-light mb-1">Live demo — apna naam likho</p>
              <p className="text-xs text-muted mb-4">Bilkul waise hi message aayega jo roz milega</p>

              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya, Rahul, Nirav..."
                  maxLength={20}
                  className="flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-base text-white placeholder:text-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
                <button
                  type="button"
                  onClick={() => setTick((t) => t + 1)}
                  className="btn-secondary rounded-xl px-4 text-sm whitespace-nowrap"
                >
                  Agla
                </button>
              </div>

              <div className="rounded-2xl bg-black/70 border border-gold/20 p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-xs font-bold text-black">
                    R
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">RIZN</p>
                    <p className="text-[11px] text-gold-light">personalized · abhi</p>
                  </div>
                </div>
                <p className="text-[15px] md:text-base leading-relaxed text-white/95">{message}</p>
              </div>

              <p className="text-center text-xs text-muted mt-4">Card nahi chahiye · Kabhi bhi cancel</p>
            </div>

            <div className="md:hidden mt-8">
              <NotificationPhone name={displayName === "Tumhara Naam" ? "Nirav" : displayName} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
