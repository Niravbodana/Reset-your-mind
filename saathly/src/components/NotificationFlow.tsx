import { Bell, Globe, MessageCircle, Smartphone } from "lucide-react";

const channels = [
  {
    icon: Globe,
    title: "Web dashboard",
    status: "Available now",
    statusColor: "text-success",
    desc: "Sign up on this website and read today's personalized messages in your dashboard. Try the full flow in preview mode.",
  },
  {
    icon: Bell,
    title: "Push notifications",
    status: "With mobile app",
    statusColor: "text-gold-light",
    desc: "When the Android and iOS app launches, messages will arrive as phone notifications — roughly every 2 hours during your chosen window.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp (optional)",
    status: "Planned",
    statusColor: "text-muted",
    desc: "Parivaar plan users will be able to receive the same pulses on WhatsApp. Same content, your preferred channel.",
  },
];

const steps = [
  { n: "1", title: "You set your profile", text: "Name, focus areas (money, health, love, career, mind), and message language at signup." },
  { n: "2", title: "RIZN schedules up to 6 pulses", text: "Short, name-personalized messages with one small action each — four in soft mode. Default 9 AM–9 PM window in preview." },
  { n: "3", title: "You receive & act", text: "Read on web dashboard today; push on phone when the app is live. Mark done, track mood, build streak." },
];

export function NotificationFlow() {
  return (
    <section id="notifications" className="py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">How messages reach you</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Notifications — clear and on your schedule
          </h2>
          <p className="text-ink-soft leading-relaxed">
            RIZN sends up to 6 short messages per day (4 in soft mode), spaced about 2 hours apart, in a
            default 9 AM–9 PM window during preview. Custom hours ship with the mobile app.
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
            <div className="flex items-center gap-3 mb-6">
              <Smartphone size={20} className="text-gold-light" />
              <p className="font-semibold text-white">Sample day (9 AM – 9 PM)</p>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                ["9:00 AM", "Morning intention — name + one priority for the day"],
                ["11:00 AM", "Focus — one task, cut distractions"],
                ["1:00 PM", "Body — lunch or water reminder"],
                ["3:00 PM", "Energy — short break before afternoon dip"],
                ["5:00 PM", "Life — small money or health action"],
                ["9:00 PM", "Wind-down — close the day calmly"],
              ].map(([time, text]) => (
                <li key={time} className="flex gap-3 border-b border-white/5 pb-3 last:border-0">
                  <span className="text-gold-light font-mono text-xs w-16 shrink-0 pt-0.5">{time}</span>
                  <span className="text-ink-soft">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
