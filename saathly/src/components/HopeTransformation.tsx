"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { MESSAGE_BANK } from "@/lib/message-bank";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { ScrollReveal } from "./ScrollReveal";

const STORIES = [
  {
    id: "priya",
    name: "Priya ji",
    beforeImg: "/images/animatic-before-hope.jpg",
    afterImg: "/images/animatic-after-hope.jpg",
    before: "Raat ko neend nahi. Subah uthne ka mann nahi. Akela lagta tha.",
    after: "Har din ek message — chhota step. Life phir se control me.",
    message: MESSAGE_BANK[0].hinglish.replace("{name}", "Priya ji"),
    action: MESSAGE_BANK[0].microAction,
  },
  {
    id: "rahul",
    name: "Rahul ji",
    beforeImg: "/images/animatic-before-emi.jpg",
    afterImg: "/images/animatic-after-emi.jpg",
    before: "EMI date miss, stress, bank call — har mahine tension.",
    after: "1 din pehle alert. Balance ready. Dil shaant.",
    message: formatEmiNotification("Rahul", DEMO_EMI, "hinglish"),
    action: "Aaj balance check karo",
  },
];

const ROTATE_MS = 8000;

export function HopeTransformation() {
  const [idx, setIdx] = useState(0);
  const story = STORIES[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STORIES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="transform" className="relative py-14 sm:py-16 md:py-24 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
          <p className="section-label mb-3">Pehle vs Ab</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            Judoge to life <span className="text-gold-light">better ho sakti hai.</span>
          </h2>
          <p className="text-ink-soft text-base md:text-lg leading-relaxed">
            Ye sirf app nahi — tumhare naam pe roz ek rasta. Chhote steps, badi hope.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="grid md:grid-cols-2 gap-3 md:gap-4 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] min-h-[200px] bg-[#1a1520] overflow-hidden">
              <Image
                src={story.beforeImg}
                alt={`${story.name} — pehle`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
              <div className="absolute inset-0 bg-red-950/20 mix-blend-multiply" />
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/60 text-red-200 border border-red-400/40">
                  Pehle
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <p className="text-base sm:text-lg md:text-xl text-white/95 font-medium leading-snug">
                  {story.before}
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] min-h-[200px] bg-[#151510] overflow-hidden">
              <Image
                src={story.afterImg}
                alt={`${story.name} — ab`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-gold/10" />
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-gold/25 text-gold-light border border-gold/50 flex items-center gap-1.5 w-fit">
                  <Sparkles size={12} />
                  Ab RIZN ke saath
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <p className="text-base sm:text-lg md:text-xl text-white font-semibold leading-snug">
                  {story.after}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6 md:mt-8">
            <div className="premium-card shimmer-border rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl shadow-gold/10 backdrop-blur-xl bg-black/70 border border-white/10">
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gold-light mb-2 sm:mb-3 text-center">
                {story.name} ko aisa message aata hai
              </p>
              <p className="text-[14px] sm:text-[15px] md:text-base leading-relaxed text-white text-center break-words">
                {story.message}
              </p>
              <p className="text-xs text-gold-light mt-3 font-medium text-center">
                → {story.action}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8 sm:mt-10">
            {STORIES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.name}
                onClick={() => setIdx(i)}
                className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-all duration-300 ${
                  i === idx ? "px-4 bg-gold" : "bg-white/25 hover:bg-white/50 w-2.5 h-2.5 min-w-0 min-h-0 p-0"
                }`}
              >
                {i === idx && <span className="sr-only">{s.name}</span>}
              </button>
            ))}
          </div>
        </div>

        <ScrollReveal className="text-center mt-10 sm:mt-14 md:mt-16">
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold w-full sm:w-auto max-w-sm mx-auto min-h-[48px]"
          >
            Meri life bhi better karni hai
            <ArrowRight size={18} className="shrink-0" />
          </Link>
          <p className="text-xs text-muted mt-4">₹99/month · EMI reminders included · Start free</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
