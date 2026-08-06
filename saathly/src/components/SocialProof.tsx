"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { getMessageBankStats } from "@/lib/message-bank";
import { ScrollReveal } from "./ScrollReveal";

const MESSAGE_COUNT = getMessageBankStats().total;

const REVIEWS = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    image: "/images/testimonial-priya.jpg",
    line: "Messages with my name hit different. Mornings feel lighter.",
    streak: 12,
  },
  {
    name: "Rahul Mehta",
    city: "Pune",
    image: "/images/testimonial-rahul.jpg",
    line: "Bill reminders one day early — no more last-minute panic.",
    streak: 8,
  },
  {
    name: "Ananya Reddy",
    city: "Hyderabad",
    image: "/images/testimonial-ananya.jpg",
    line: "Small steps every day. My streak is the proof.",
    streak: 21,
  },
];

export function SocialProof() {
  const config = useSiteConfig();
  const members = Math.max(config.waitlistCount, 52);

  const stats = [
    { value: `${members}+`, label: "Early members" },
    { value: `${MESSAGE_COUNT}+`, label: "Unique messages" },
    { value: "3", label: "Languages" },
    { value: "1 day", label: "Bill alert lead" },
  ];

  return (
    <section className="border-y border-white/5 bg-bg-elevated/40 py-10 sm:py-14" aria-label="Social proof">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" aria-hidden />
              ))}
            </div>
            <p className="text-sm text-ink-soft">Built for daily life in India</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <ScrollReveal key={r.name} delay={0.08 + i * 0.04}>
              <article className="premium-card rounded-2xl p-5 border border-white/10 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gold/30">
                    <Image src={r.image} alt="" fill className="object-cover" sizes="44px" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{r.name}</p>
                    <p className="text-xs text-muted">{r.city} · {r.streak}-day streak</p>
                  </div>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">&ldquo;{r.line}&rdquo;</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
