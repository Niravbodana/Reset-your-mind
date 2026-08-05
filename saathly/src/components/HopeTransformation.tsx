"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MESSAGE_BANK } from "@/lib/message-bank";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { ScrollReveal } from "./ScrollReveal";

type Pair = {
  id: string;
  name: string;
  /** Same person — one photo, pehle vs ab styling */
  image?: string;
  /** Male stories only — verified matching gender */
  beforeImg?: string;
  afterImg?: string;
  before: string;
  after: string;
  message: string;
  action: string;
};

const PAIRS: Pair[] = [
  {
    id: "priya",
    name: "Priya ji",
    image: "/images/testimonial-priya.jpg",
    before: "Raat ko neend nahi, subah zero motivation, akela lagta tha.",
    after: "Har din ek message — chhota step. Streak ban gaya, life control me.",
    message: MESSAGE_BANK[0].hinglish.replace("{name}", "Priya ji"),
    action: MESSAGE_BANK[0].microAction,
  },
  {
    id: "rahul",
    name: "Rahul ji",
    beforeImg: "/images/person-stressed.jpg",
    afterImg: "/images/testimonial-rahul.jpg",
    before: "EMI date miss, late fee lag jati thi, bank call se dar lagta tha.",
    after: "1 din pehle alert — balance ready, tension kam, credit safe.",
    message: formatEmiNotification("Rahul", DEMO_EMI, "hinglish"),
    action: "Aaj balance check karo",
  },
  {
    id: "ananya",
    name: "Ananya ji",
    image: "/images/testimonial-ananya.jpg",
    before: "Overthink, phone scroll, khud ke liye time zero tha.",
    after: "Roz apne naam pe nudge — health, dil, paisa sab balance me.",
    message: MESSAGE_BANK[7].hinglish.replace("{name}", "Ananya ji"),
    action: MESSAGE_BANK[7].microAction,
  },
  {
    id: "amit",
    name: "Amit ji",
    image: "/images/person-wellness.jpg",
    before: "Office overload, lunch skip, body aur dimaag dono thak gaye.",
    after: "Roz chhote steps — paani, walk, boundary. Energy wapas.",
    message: MESSAGE_BANK[4].hinglish.replace("{name}", "Amit ji"),
    action: MESSAGE_BANK[4].microAction,
  },
];

const ROTATE_MS = 7500;

function TransformPhoto({
  src,
  alt,
  mode,
}: {
  src: string;
  alt: string;
  mode: "before" | "after";
}) {
  const isBefore = mode === "before";
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover object-top transition-all duration-700 ${
          isBefore ? "scale-105 grayscale brightness-[0.45] contrast-110" : "scale-100 brightness-105"
        }`}
        sizes="(max-width: 768px) 45vw, 300px"
      />
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isBefore
            ? "bg-gradient-to-t from-black/95 via-red-950/45 to-black/35"
            : "bg-gradient-to-t from-black/85 via-emerald-950/20 to-transparent"
        }`}
      />
      {!isBefore && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent pointer-events-none" />
      )}
    </>
  );
}

export function HopeTransformation() {
  const [idx, setIdx] = useState(0);
  const pair = PAIRS[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PAIRS.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const beforeSrc = pair.beforeImg ?? pair.image!;
  const afterSrc = pair.afterImg ?? pair.image!;

  return (
    <section className="py-20 md:py-28 border-y border-white/[0.06] overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.04] via-transparent to-violet-950/10 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-label mb-3">Pehle vs Ab</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Same insaan — <span className="text-gold-light">real transformation.</span>
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            Pehle struggle, phir RIZN ke saath control. Har story me wahi insaan — pehle aur ab.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <ScrollReveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-stretch gap-2 sm:gap-4">
                  <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden border border-red-400/20 shadow-2xl premium-card">
                    <TransformPhoto src={beforeSrc} alt={`${pair.name} pehle`} mode="before" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500/30 text-red-100 border border-red-400/40 backdrop-blur-sm">
                        Pehle
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <p className="text-[11px] sm:text-xs text-white/95 leading-snug">{pair.before}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center shrink-0">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/50 flex items-center justify-center shadow-lg shadow-gold/10"
                    >
                      <ArrowRight size={18} className="text-gold-light" />
                    </motion.div>
                  </div>

                  <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden border border-emerald-400/25 shadow-2xl shadow-gold/5 premium-card shimmer-border">
                    <TransformPhoto src={afterSrc} alt={`${pair.name} ab`} mode="after" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/30 text-emerald-100 border border-emerald-400/40 backdrop-blur-sm">
                        Ab RIZN ke saath
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <p className="text-[11px] sm:text-xs text-white font-medium leading-snug">{pair.after}</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gold-light font-semibold mt-5 tracking-wide">
                  {pair.name}
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  {PAIRS.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={p.name}
                      onClick={() => setIdx(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === idx ? "w-8 bg-gold" : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>

          <ScrollReveal delay={0.15} className="space-y-6">
            <div className="premium-card shimmer-border rounded-2xl p-5 md:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-light mb-3">
                Phone pe aise messages — {pair.name}
              </p>

              <div className="min-h-[172px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${pair.id}-msg`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl bg-[#0f0f16]/90 border border-white/15 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black text-xs font-bold shrink-0 shadow-lg shadow-gold/25">
                        R
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">RIZN</p>
                        <p className="text-[10px] text-white/50">Notification · abhi</p>
                      </div>
                    </div>
                    <p className="text-[15px] leading-relaxed text-white">{pair.message}</p>
                    <p className="text-xs text-gold-light mt-3 font-medium">→ {pair.action}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex gap-2.5 items-start">
                <span className="text-gold-light mt-0.5">✓</span>
                Priya, Rahul, Ananya, Amit — naam ke saath respect
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-gold-light mt-0.5">✓</span>
                EMI 1 din pehle — late fee se bacho
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-gold-light mt-0.5">✓</span>
                50+ unique messages — roz naya value
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
