import { Bell, Globe, MessageCircle } from "lucide-react";

const channels = [
  {
    icon: Globe,
    title: "Web dashboard",
    status: "Available now",
    statusColor: "text-success",
    desc: "Sign up and read today's messages. Full Settings: interval, wake/sleep, lunch, gym, medicine, and more.",
  },
  {
    icon: Bell,
    title: "Push notifications",
    status: "With mobile app",
    statusColor: "text-gold-light",
    desc: "App launch pe wahi schedule phone pe — tumne jo interval choose kiya Settings me.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp (optional)",
    status: "Planned",
    statusColor: "text-muted",
    desc: "Parivaar plan users will be able to receive pulses on WhatsApp at their chosen times.",
  },
];

const steps = [
  { n: "1", title: "You set your profile", text: "Name, focus areas, language — 1 minute signup." },
  { n: "2", title: "Open Settings", text: "Pick 30 min–4 hr interval, wake & sleep, optional lunch, gym, yoga, medicine, dinner." },
  { n: "3", title: "You receive & act", text: "Read on web today; push on phone when the app is live." },
];

export function NotificationFlow() {
  return (
    <section id="notifications" className="py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">Your schedule</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Not fixed 2 hours — tum decide karo
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Half hour, 1 hour, 2, 3, ya 4 hour gap — plus optional anchors for lunch, dinner, gym,
            yoga, medicine. Sab plan ke baad Settings me change kar sakte ho.
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
            <p className="section-label mb-3">End-to-end flow</p>
            <h3 className="font-display text-2xl font-bold text-white mb-6">From signup to daily pulse</h3>
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
            <p className="font-semibold text-white mb-4">Example day (your settings)</p>
            <ul className="space-y-3 text-sm">
              {[
                ["07:00", "Gym anchor (if enabled)"],
                ["09:00", "Wake — morning intention"],
                ["11:00", "Focus block"],
                ["13:00", "Lunch reminder"],
                ["17:00", "Life / money action"],
                ["20:00", "Dinner wind-down"],
              ].map(([time, text]) => (
                <li key={time} className="flex gap-3 border-b border-white/5 pb-3 last:border-0">
                  <span className="text-gold-light font-mono text-xs w-14 shrink-0 pt-0.5">{time}</span>
                  <span className="text-ink-soft">{text}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-muted mt-4">Actual times = your interval + enabled anchors</p>
          </div>
        </div>
      </div>
    </section>
  );
}
