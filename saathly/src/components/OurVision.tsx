"use client";

import { Sparkles, Sun, Heart } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { ScrollReveal } from "./ScrollReveal";

export function OurVision() {
  const { preferEnglish } = useLocale();
  const isIN = !preferEnglish;

  const pillars = isIN
    ? [
        { icon: Sun, text: "Positive mindset — roz thoda better feel karo" },
        { icon: Sparkles, text: "Full energy — chhoti habits, badi change" },
        { icon: Heart, text: "Real support — life improve karne me saath" },
      ]
    : [
        { icon: Sun, text: "A positive mindset — feel a little better every day" },
        { icon: Sparkles, text: "Full energy — small habits, meaningful change" },
        { icon: Heart, text: "Real support — help that actually improves life" },
      ];

  return (
    <section id="vision" className="py-12 sm:py-16 md:py-20 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <ScrollReveal className="text-center">
          <p className="section-label mb-3">{isIN ? "Hamara vision" : "Our vision"}</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
            {isIN ? (
              <>
                Har insaan ka mindset{" "}
                <span className="text-gold-light">positive</span> ho — full of energy, full of hope.
              </>
            ) : (
              <>
                Shift every mindset toward{" "}
                <span className="text-gold-light">positivity</span> — energy, hope, and real growth.
              </>
            )}
          </h2>
          <p className="text-ink-soft text-[15px] sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            {isIN
              ? "RIZN sirf ek app nahi — ek daily companion hai jo logon ka sochne ka tareeka badalna chahta hai. Hum chahte hain har koi positive energy ke saath uthe, apni life improve kare, aur kabhi akela feel na kare. Chhote steps, roz ki motivation, aur asli support — taaki change feel ho, sirf dikhe nahi."
              : "RIZN is more than an app — a daily companion built to change how people think and feel. We want everyone to wake up with positive energy, improve their life in real ways, and never feel alone. Small steps, daily motivation, and genuine support — so change is felt, not just promised."}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {pillars.map((p) => (
              <div
                key={p.text}
                className="soft-card rounded-2xl border border-white/10 p-4 sm:p-5 text-center hover:border-gold/25 transition-colors"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-light mb-3">
                  <p.icon size={18} />
                </span>
                <p className="text-sm text-ink-soft leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
