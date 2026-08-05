"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MESSAGE_BANK } from "@/lib/message-bank";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { ScrollReveal } from "./ScrollReveal";

/** Side-by-side Pehle → Ab pairs — landscape stressed + happy with RIZN */
const PAIRS = [
  {
    id: "priya",
    name: "Priya ji",
    beforeImg: "/images/person-stressed.jpg",
    afterImg: "/images/person-happy.jpg",
    before: "Raat ko neend nahi, subah zero motivation, akela lagta tha.",
    after: "Har din ek message — chhota step. Streak ban gaya, life control me.",
    message: MESSAGE_BANK[0].hinglish.replace("{name}", "Priya ji"),
    action: MESSAGE_BANK[0].microAction,
  },
  {
    id: "rahul",
    name: "Rahul ji",
    beforeImg: "/images/hero-bg.jpg",
    afterImg: "/images/testimonial-rahul.jpg",
    before: "EMI date miss, late fee lag jati thi, bank call se dar lagta tha.",
    after: "1 din pehle alert — balance ready, tension kam, credit safe.",
    message: formatEmiNotification("Rahul", DEMO_EMI, "hinglish"),
    action: "Aaj balance check karo",
  },
  {
    id: "amit",
    name: "Amit ji",
    beforeImg: "/images/person-wellness.jpg",
    afterImg: "/images/transform-premium.jpg",
    before: "Office overload, lunch skip, body aur dimaag dono thak gaye.",
    after: "Roz chhote steps — paani, walk, boundary. Energy wapas.",
    message: MESSAGE_BANK[4].hinglish.replace("{name}", "Amit ji"),
    action: MESSAGE_BANK[4].microAction,
  },
  {
    id: "sneha",
    name: "Sneha ji",
    beforeImg: "/images/person-couple.jpg",
    afterImg: "/images/customer-couple.jpg",
    before: "Ghar, kaam, sab ke liye time — apne liye kuch bacha hi nahi.",
    after: "Apne naam pe daily nudge — health, dil, paisa sab balance me.",
    message: MESSAGE_BANK[7].hinglish.replace("{name}", "Sneha ji"),
    action: MESSAGE_BANK[7].microAction,
  },
];

const ROTATE_MS = 7000;

export function HopeTransformation() {
  const [idx, setIdx] = useState(0);
  const pair = PAIRS[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PAIRS.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 md:py-28 border-y border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-label mb-3">Pehle vs Ab</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Real logon ki <span className="text-gold-light">real change.</span>
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            Pehle overwhelm, phir RIZN ke saath hope — side by side dekho kya farak padta hai.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <ScrollReveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={pair.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Side-by-side landscape cards */}
                <div className="flex items-stretch gap-2 sm:gap-3">
                  <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden border border-red-400/25 shadow-xl premium-card">
                    <Image
                      src={pair.beforeImg}
                      alt={`${pair.name} — pehle`}
                      fill
                      className="object-cover grayscale-[0.4] brightness-[0.75]"
                      sizes="(max-width: 768px) 45vw, 280px"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-red-950/30 to-black/20" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-500/25 text-red-200 border border-red-400/30">
                        Pehle
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[11px] sm:text-xs text-white/90 leading-snug">{pair.before}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center shrink-0 px-0.5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center">
                      <ArrowRight size={16} className="text-gold-light sm:w-[18px] sm:h-[18px]" />
                    </div>
                  </div>

                  <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden border border-emerald-400/30 shadow-xl shadow-gold/10 premium-card shimmer-border">
                    <Image
                      src={pair.afterImg}
                      alt={`${pair.name} — RIZN ke saath`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 45vw, 280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-emerald-950/15 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/25 text-emerald-200 border border-emerald-400/30">
                        Ab RIZN ke saath
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[11px] sm:text-xs text-white font-medium leading-snug">{pair.after}</p>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gold-light font-semibold mt-4">{pair.name}</p>

                <div className="flex justify-center gap-2 mt-3">
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

              <div className="min-h-[168px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${pair.id}-msg`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.45 }}
                    className="rounded-xl bg-[#12121a] border border-white/12 p-4"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black text-xs font-bold shrink-0 shadow-lg shadow-gold/20">
                        R
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">RIZN</p>
                        <p className="text-[10px] text-white/45">Notification · abhi</p>
                      </div>
                    </div>
                    <p className="text-[15px] leading-relaxed text-white/95">{pair.message}</p>
                    <p className="text-xs text-gold-light mt-3 font-medium">→ {pair.action}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex gap-2.5 items-start">
                <span className="text-gold-light mt-0.5">✓</span>
                Priya, Rahul, Amit, Sneha — naam ke saath respect
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
