"use client";

import Image from "next/image";
import { Sparkles, Sun, Heart } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { ScrollReveal } from "./ScrollReveal";

export function OurVision() {
  const { preferEnglish } = useLocale();

  const pillars = preferEnglish
    ? [
        { icon: Sun, text: "Positive mindset — feel a little better every day" },
        { icon: Sparkles, text: "Full energy — small habits, meaningful change" },
        { icon: Heart, text: "Real support — help that actually improves life" },
      ]
    : [
        { icon: Sun, text: "Positive mindset — roz thoda better feel karo" },
        { icon: Sparkles, text: "Full energy — chhoti habits, badi change" },
        { icon: Heart, text: "Real support — life improve karne me saath" },
      ];

  return (
    <section id="vision" className="py-12 sm:py-16 md:py-24 border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.05] via-transparent to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal className="order-2 lg:order-1">
            <p className="section-label mb-3">{preferEnglish ? "Our vision" : "Hamara vision"}</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
              {preferEnglish ? (
                <>
                  Change every mindset toward{" "}
                  <span className="text-gold-light">positivity</span> — full of energy, full of hope.
                </>
              ) : (
                <>
                  Har insaan ka mindset{" "}
                  <span className="text-gold-light">positive</span> ho — full of energy, full of hope.
                </>
              )}
            </h2>
            <p className="text-ink-soft text-[15px] sm:text-base leading-relaxed mb-8">
              {preferEnglish
                ? "RIZN is built to shift how people think — from stress and doubt to hope, energy, and action. Daily motivation, gentle habits, and real support — so you never feel alone on the journey."
                : "RIZN logon ka sochne ka tareeka badalna chahta hai — stress se hope, energy aur action ki taraf. Daily motivation, chhoti habits aur asli support — taaki koi bhi akela feel na kare."}
            </p>

            <div className="grid sm:grid-cols-3 gap-3">
              {pillars.map((p) => (
                <div
                  key={p.text}
                  className="soft-card rounded-2xl border border-white/10 p-3 sm:p-4 hover:border-gold/25 transition-colors"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold-light mb-2">
                    <p.icon size={16} />
                  </span>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 bg-gradient-to-br from-gold/25 via-transparent to-gold/10 rounded-3xl blur-2xl opacity-70" />
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/30 shadow-2xl shadow-gold/10">
                <div className="relative aspect-[16/10] sm:aspect-[4/3]">
                  <Image
                    src="/images/rizn-vision-hero.png"
                    alt={
                      preferEnglish
                        ? "Person feeling positive energy at sunrise — RIZN vision"
                        : "Positive energy aur hope — RIZN vision"
                    }
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 90vw, 540px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <p className="font-display text-lg sm:text-xl font-bold text-white">
                      {preferEnglish ? "Your life can change." : "Tumhari life change ho sakti hai."}
                    </p>
                    <p className="text-xs sm:text-sm text-gold-light/90 mt-1">
                      {preferEnglish
                        ? "Positivity · Energy · Real improvement"
                        : "Positivity · Energy · Asli improvement"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
