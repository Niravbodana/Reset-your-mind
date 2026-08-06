"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bell,
  CalendarDays,
  CloudSun,
  CreditCard,
  Droplets,
  Footprints,
  Gift,
  Globe2,
  HeartHandshake,
  Moon,
  PauseCircle,
  Shield,
  Sparkles,
  Sunrise,
  Trophy,
  Wallet,
} from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { getMessageBankStats } from "@/lib/message-bank";

const MESSAGE_COUNT = getMessageBankStats().total;

type Feature = {
  icon: LucideIcon;
  title: string;
  problem: string;
  solution: string;
  benefit: string;
  example: string;
};

const FEATURES: Feature[] = [
  {
    icon: Sunrise,
    title: "Morning Card",
    problem: "Mornings feel chaotic.",
    solution: "One card with your first message and next bill.",
    benefit: "Start clear, not overwhelmed.",
    example: "“Priya, good morning — today’s one step: water first.”",
  },
  {
    icon: CreditCard,
    title: "Bill Reminder",
    problem: "Due dates sneak up and cause stress.",
    solution: "Caring alert 1 day before — amount, date, bank.",
    benefit: "Pay prepared, not panicked.",
    example: "“Rahul, HDFC EMI ₹12,500 due tomorrow.”",
  },
  {
    icon: Droplets,
    title: "Water",
    problem: "You forget to hydrate until you're drained.",
    solution: "Tap glasses. Gentle nudge if you miss goal.",
    benefit: "Energy stays steady through the day.",
    example: "“3 glasses left — quick sip?”",
  },
  {
    icon: Moon,
    title: "Sleep",
    problem: "Screens keep your mind racing at night.",
    solution: "Wind-down message at your sleep time.",
    benefit: "Easier rest, better tomorrow.",
    example: "“Phone down — 3 breaths, then sleep.”",
  },
  {
    icon: Footprints,
    title: "Steps",
    problem: "Movement goals feel abstract.",
    solution: "Daily step target with live count and nudges.",
    benefit: "Small walks add up without guilt.",
    example: "“800 steps to hit today’s goal.”",
  },
  {
    icon: Activity,
    title: "Health Score",
    problem: "Hard to see if you're actually improving.",
    solution: "Score from steps, water, sleep, mood, bills.",
    benefit: "One number that reflects your week.",
    example: "“Health score 72 — up from last week.”",
  },
  {
    icon: CloudSun,
    title: "Soft Day",
    problem: "Some days you can't push hard.",
    solution: "One tap — fewer messages, gentler tone.",
    benefit: "Rest without quitting.",
    example: "“Soft Day on — we’ll go easy today.”",
  },
  {
    icon: PauseCircle,
    title: "Pause Mode",
    problem: "Life gets busy; you don't want to cancel.",
    solution: "Pause up to 7 days. Habit stays safe.",
    benefit: "Come back without starting over.",
    example: "“Paused until Monday — welcome back anytime.”",
  },
  {
    icon: Trophy,
    title: "Weekly Wins",
    problem: "Progress feels invisible day to day.",
    solution: "Weekly recap: streak, habits, bills paid.",
    benefit: "See momentum. Share if you want.",
    example: "“4 bills marked paid · 6-day streak.”",
  },
  {
    icon: HeartHandshake,
    title: "Buddy Check-in",
    problem: "Habits are harder alone.",
    solution: "Send a gentle nudge to one friend.",
    benefit: "Accountability without pressure.",
    example: "“Check in on Amit — one tap.”",
  },
  {
    icon: Gift,
    title: "Referral",
    problem: "Friends ask what you're using.",
    solution: "Invite link — they get free trial.",
    benefit: "Help someone else start.",
    example: "“Share your link — 7 days free for them.”",
  },
  {
    icon: Globe2,
    title: "Languages",
    problem: "Motivation should sound like you.",
    solution: "English, Hinglish, or Hindi — your choice.",
    benefit: "Messages that feel natural.",
    example: "Switch anytime in Settings.",
  },
  {
    icon: Shield,
    title: "Streak Freeze",
    problem: "One bad day breaks your streak.",
    solution: "One forgiven miss each month.",
    benefit: "Stay consistent, stay human.",
    example: "“Streak freeze used — you’re still on track.”",
  },
  {
    icon: CalendarDays,
    title: "Calendar",
    problem: "Bills scattered across apps and memory.",
    solution: "Month view with due dates highlighted.",
    benefit: "See the whole picture at once.",
    example: "Gold dots on every due date.",
  },
  {
    icon: Wallet,
    title: "Mark Paid",
    problem: "Paid a bill but still feel behind?",
    solution: "Tap paid — progress updates instantly.",
    benefit: "Closure. Less mental load.",
    example: "“Marked paid — nice work.”",
  },
  {
    icon: Sparkles,
    title: "Daily Briefing",
    problem: "Too many tabs, too little clarity.",
    solution: "Messages left + bills due in one view.",
    benefit: "Your daily control panel.",
    example: "“2 bills this week · 4 messages left today.”",
  },
  {
    icon: Bell,
    title: "Daily Motivation",
    problem: "Generic quotes don't move you.",
    solution: `${MESSAGE_COUNT}+ unique messages with your name.`,
    benefit: "Feels personal. Never the same twice in a row.",
    example: "“{name}, small step today beats perfect someday.”",
  },
];

export function FeaturesShowcase() {
  return (
    <section id="features" className="py-16 sm:py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="section-label mb-3">Everything included</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            One app.{" "}
            <span className="text-gold-light">Every part of your day.</span>
          </h2>
          <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
            Not a feature list for show — each tool solves a real problem you already have.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={Math.min(i * 0.02, 0.2)}>
              <article className="group soft-card rounded-2xl p-5 border border-white/10 hover:border-gold/25 transition-all duration-300 h-full flex flex-col">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold mb-4 group-hover:scale-105 transition-transform">
                  <f.icon size={18} aria-hidden />
                </div>
                <h3 className="font-semibold text-white text-[15px] mb-3">{f.title}</h3>
                <dl className="space-y-2 text-xs flex-1">
                  <div>
                    <dt className="text-muted uppercase tracking-wide text-[10px] mb-0.5">Problem</dt>
                    <dd className="text-ink-soft leading-relaxed">{f.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-muted uppercase tracking-wide text-[10px] mb-0.5">Benefit</dt>
                    <dd className="text-white/90 leading-relaxed">{f.benefit}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-[11px] text-gold-light/80 italic border-t border-white/5 pt-3">
                  {f.example}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
