"use client";

import { Bell, Globe, CreditCard } from "lucide-react";
import { getMessageBankStats } from "@/lib/message-bank";
import { useLocale } from "@/context/LocaleContext";

const MESSAGE_COUNT = getMessageBankStats().total;

export function NotificationFlow() {
  const { region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;

  const channels = isIN
    ? [
        {
          icon: Bell,
          title: "Daily alerts",
          status: "Your habit",
          statusColor: "text-success",
          desc: `${MESSAGE_COUNT}+ unique messages — motivation, health, money, dil. Kabhi wahi repeat nahi jab tak pool complete na ho.`,
        },
        {
          icon: Globe,
          title: "Your schedule",
          status: "You control",
          statusColor: "text-gold-light",
          desc: "30 min se 4 hour interval — wake, lunch, gym, medicine, dinner. Sab tumhari life ke hisaab se.",
        },
        {
          icon: CreditCard,
          title: "EMI Reminder",
          status: "1 day before",
          statusColor: "text-gold-light",
          desc: "Amount, date, bank/NBFC — naam ke saath caring alert. Tension kam, confidence zyada.",
        },
      ]
    : [
        {
          icon: Bell,
          title: "Daily alerts",
          status: "Your habit",
          statusColor: "text-success",
          desc: `${MESSAGE_COUNT}+ unique messages — motivation, health, money, mind. No repeats until the pool is complete.`,
        },
        {
          icon: Globe,
          title: "Your schedule",
          status: "You control",
          statusColor: "text-gold-light",
          desc: "30 min to 4 hour intervals — wake, lunch, gym, medicine, dinner. Built around your life.",
        },
        {
          icon: CreditCard,
          title: "Bill reminders",
          status: "1 day before",
          statusColor: "text-gold-light",
          desc: "Amount, date, provider — a caring alert with your name. Less stress, more control.",
        },
      ];

  const steps = isIN
    ? [
        { n: "1", title: "Apna profile banao", text: "Naam, focus areas, language — 1 minute." },
        {
          n: "2",
          title: "EMI + schedule set karo",
          text: "EMI amount, date, bank — phir message interval aur wake/sleep.",
        },
        {
          n: "3",
          title: "Roz value feel karo",
          text: "Padho, chhota step karo — life better feel hogi, habit ban jayegi.",
        },
      ]
    : [
        { n: "1", title: "Create your profile", text: "Name, focus areas, language — about a minute." },
        {
          n: "2",
          title: "Set bills + schedule",
          text: "Bill amount, date, provider — then message interval and wake/sleep.",
        },
        {
          n: "3",
          title: "Feel daily value",
          text: "Read, take a small step — life feels better, habits stick.",
        },
      ];

  return (
    <section id="how" className="py-14 sm:py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-8 sm:mb-14">
          <p className="section-label mb-3">How it works</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {isIN ? (
              <>
                Ek rasta — roz chhote steps, <span className="text-gold-light">badi motivation</span>
              </>
            ) : (
              <>
                One path — small daily steps, <span className="text-gold-light">real motivation</span>
              </>
            )}
          </h2>
          <p className="text-ink-soft leading-relaxed">
            {isIN
              ? "RIZN sirf notifications nahi bhejta — tumhari life me value add karta hai. Har message alag, har din naya. Tum feel karoge: ye alerts meri wajah se accha ho raha hai."
              : "RIZN doesn’t just send notifications — it adds value to your day. Every message is different. You’ll feel these alerts are helping because they’re for you."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {channels.map((c) => (
            <article key={c.title} className="soft-card rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center">
                  <c.icon size={20} className="text-gold-light" />
                </div>
                <span className={`text-[11px] font-semibold uppercase tracking-wide ${c.statusColor}`}>
                  {c.status}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{c.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{c.desc}</p>
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div>
            <p className="section-label mb-3">{isIN ? "Tumhara din" : "Your day"}</p>
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              {isIN ? "Signup se roz ki habit tak" : "From signup to a daily habit"}
            </h3>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 text-sm font-bold text-gold-light">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{s.title}</p>
                    <p className="text-sm text-ink-soft mt-1 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-card rounded-2xl p-6 md:p-8">
            <p className="font-semibold text-white mb-4">
              {isIN
                ? "Ek din ka example — tumhare settings ke hisaab se"
                : "A day example — based on your settings"}
            </p>
            <ul className="space-y-3 text-sm">
              {(
                [
                  ["07:00", isIN ? "Gym anchor (if enabled)" : "Gym anchor (if enabled)"],
                  ["09:00", isIN ? "Wake — morning intention" : "Wake — morning intention"],
                  ["11:00", isIN ? "Focus block" : "Focus block"],
                  ["13:00", isIN ? "Lunch reminder" : "Lunch reminder"],
                  ["17:00", isIN ? "Life / money action" : "Life / money action"],
                  ["20:00", isIN ? "Dinner wind-down" : "Dinner wind-down"],
                ] as const
              ).map(([time, text]) => (
                <li key={time} className="flex gap-3 border-b border-white/5 pb-3 last:border-0">
                  <span className="text-gold-light font-mono text-xs w-14 shrink-0 pt-0.5">
                    {time}
                  </span>
                  <span className="text-ink-soft">{text}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-muted mt-4">
              {isIN
                ? "Actual times = your interval + enabled anchors"
                : "Actual times = your interval + enabled anchors"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
