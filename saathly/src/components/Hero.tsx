"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { LiveStats } from "./LiveStats";

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
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-premium.jpg"
          alt="RIZN — premium daily motivation"
          fill
          priority
          className="object-cover object-[center_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/40" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs text-gold-light mb-6">
              <Star size={12} className="fill-gold text-gold" />
              47,000+ Indians · 4.9★ rating
            </div>

            <h1 className="font-display text-[2.4rem] sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight mb-5 text-white">
              Har 2 ghante
              <br />
              <span className="gradient-gold">tumhare naam</span> pe
              <br />
              ek message — jo sach me kaam kare.
            </h1>

            <p className="text-base md:text-lg text-ink-soft max-w-lg leading-relaxed mb-6">
              Paisa, health, pyaar, career — jo bhi heavy hai, RIZN roz 6 baar tumhe yaad dilata hai:
              tu akela nahi, tu aage badh sakta hai. Sirf ₹99/month.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base"
              >
                7 din bilkul free
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-gold rounded-3xl p-6 md:p-8 relative overflow-hidden shimmer-border"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />

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
                Agla message
              </button>
            </div>

            <div className="rounded-2xl bg-black/70 border border-white/10 p-5 text-left relative">
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

            <p className="text-center text-xs text-muted mt-4">
              Card ki zaroorat nahi · Kabhi bhi cancel
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
