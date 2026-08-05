"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MESSAGE_BANK } from "@/lib/message-bank";
import { ScrollReveal } from "./ScrollReveal";

const TRANSFORMS = [
  {
    beforeImg: "/images/person-stressed.jpg",
    afterImg: "/images/person-happy.jpg",
    before: "Pehle: raat ko neend nahi, subah zero motivation, akela lagta tha.",
    after: "Ab: har din ek message — chhota step. Streak ban gaya, life control me.",
  },
  {
    beforeImg: "/images/hero-bg.jpg",
    afterImg: "/images/transform-premium.jpg",
    before: "Pehle: EMI date miss, late fee, bank call se dar.",
    after: "Ab: 1 din pehle alert — balance ready, tension kam.",
  },
  {
    beforeImg: "/images/person-couple.jpg",
    afterImg: "/images/customer-couple.jpg",
    before: "Pehle: sab ke liye time, apne liye kuch nahi.",
    after: "Ab: roz apne naam pe nudge — health, paisa, dil sab cover.",
  },
];

const previews = [MESSAGE_BANK[0], MESSAGE_BANK[8], MESSAGE_BANK[16], MESSAGE_BANK[24]];

export function HopeTransformation() {
  const [pairIdx, setPairIdx] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  const pair = TRANSFORMS[pairIdx];

  useEffect(() => {
    const t = setInterval(() => setShowAfter((v) => !v), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setShowAfter(false);
      setPairIdx((i) => (i + 1) % TRANSFORMS.length);
    }, 14000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % previews.length), 3200);
    return () => clearInterval(t);
  }, []);

  const sample = previews[msgIdx];
  const text = sample.hinglish.replace("{name}", "Priya ji");

  return (
    <section className="py-20 md:py-28 border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-label mb-3">Pehle vs Ab</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Life change ka reason — <span className="text-gold-light">hope wapas.</span>
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            RIZN roz tumhare naam pe value deta hai. Feel hoga: ye alerts meri life better kar rahe
            hain — isliye ₹99 plan continue karna easy hai.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-red-400/20 shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`b-${pairIdx}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image src={pair.beforeImg} alt="Pehle" fill className="object-cover" sizes="200px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 p-4">
                      <p className="text-[10px] font-bold uppercase text-red-300 mb-1">Pehle</p>
                      <p className="text-xs text-white/90 leading-snug">{pair.before}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold/30 shadow-xl shadow-gold/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`a-${pairIdx}-${showAfter}`}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: showAfter ? 1 : 0.85, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <Image src={pair.afterImg} alt="Ab RIZN ke saath" fill className="object-cover" sizes="200px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 p-4">
                      <p className="text-[10px] font-bold uppercase text-success mb-1">Ab RIZN ke saath</p>
                      <p className="text-xs text-white/90 leading-snug">{pair.after}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {TRANSFORMS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    setPairIdx(i);
                    setShowAfter(true);
                  }}
                  className={`h-1.5 rounded-full transition-all ${i === pairIdx ? "w-6 bg-gold" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="space-y-6">
            <div className="soft-card rounded-2xl p-5 border border-gold/20">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-light mb-3">
                Phone pe aise messages
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={msgIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-xl bg-[#0b141a] border border-white/10 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black text-xs font-bold">
                      R
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">RIZN</p>
                      <p className="text-[10px] text-muted">now</p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-white/95">{text}</p>
                  <p className="text-xs text-gold-light mt-2">→ {sample.microAction}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                Priya ji, Anand ji — naam ke saath respect
              </li>
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                EMI 1 din pehle — late fee se bacho
              </li>
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                50+ unique messages — kabhi boring nahi
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
