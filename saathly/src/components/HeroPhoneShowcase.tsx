"use client";

import {
  Activity,
  CreditCard,
  Droplets,
  Flame,
  Footprints,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";

type FloatNotif = {
  name: string;
  text: string;
  className: string;
};

const FLOATING: FloatNotif[] = [
  { name: "Priya", text: "Aaj 1 glass paani 💧", className: "hero-notif hero-notif-1" },
  { name: "Rahul", text: "Kal EMI due hai.", className: "hero-notif hero-notif-2" },
  { name: "Amit", text: "800 steps aur.", className: "hero-notif hero-notif-3" },
  { name: "Sneha", text: "Soft Day enabled.", className: "hero-notif hero-notif-4" },
  { name: "Vikram", text: "Weekly streak complete 🔥", className: "hero-notif hero-notif-5" },
];

function Widget({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: typeof Sun;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="hero-widget">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className="hero-widget-label">{label}</span>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ background: accent || "rgba(201, 162, 39, 0.15)" }}
        >
          <Icon size={14} className="text-gold-light" strokeWidth={2.2} />
        </span>
      </div>
      <p className="hero-widget-value">{value}</p>
      {sub && <p className="hero-widget-sub">{sub}</p>}
    </div>
  );
}

/** Vector-sharp phone mockup — crisp on all screens, dark theme */
export function HeroPhoneShowcase() {
  return (
    <div className="hero-phone-stage" aria-hidden>
      <div className="hero-phone-glow" />

      {FLOATING.map((n) => (
        <div key={n.name + n.text} className={n.className}>
          <p className="text-[10px] font-semibold text-gold-light/90">{n.name},</p>
          <p className="text-[11px] font-medium text-ink leading-snug mt-0.5">{n.text}</p>
        </div>
      ))}

      <div className="hero-phone-float mx-auto w-full max-w-[280px] sm:max-w-[300px]">
        <div className="hero-phone-frame">
          <div className="hero-phone-notch" />
          <div className="hero-phone-screen">
            <div className="flex items-center justify-between px-1 mb-3">
              <div>
                <p className="text-[10px] font-medium text-muted">Good morning</p>
                <p className="text-sm font-bold text-ink">Priya</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-light text-bg text-xs font-bold shadow-md">
                R
              </div>
            </div>

            <div className="hero-morning-card mb-3">
              <div className="flex items-start gap-2">
                <Sun size={16} className="text-gold-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-semibold text-ink">Morning Card</p>
                  <p className="text-[10px] text-ink-soft leading-relaxed mt-0.5">
                    Priya, aaj ka pehla step — paani pijiye. Chhota step, bada feel.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <Widget icon={Activity} label="Health Score" value="78" sub="↑ 4 this week" />
              <Widget icon={Droplets} label="Water" value="5 / 8" sub="3 glasses left" accent="rgba(59, 130, 246, 0.15)" />
              <Widget icon={Footprints} label="Steps" value="4,200" sub="Goal 8,000" accent="rgba(168, 85, 247, 0.15)" />
              <Widget icon={Moon} label="Sleep" value="7h 12m" sub="Wind-down 10:30 PM" accent="rgba(99, 102, 241, 0.15)" />
            </div>

            <div className="hero-progress-block mb-3">
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="font-medium text-ink-soft">Today&apos;s progress</span>
                <span className="font-semibold text-gold-light">62%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold-dark to-gold-light" />
              </div>
            </div>

            <div className="hero-emi-chip mb-2">
              <CreditCard size={14} className="text-gold-light shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-ink">Upcoming EMI</p>
                <p className="text-[10px] text-muted truncate">HDFC · ₹12,500 · tomorrow</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-gold/10 border border-gold/25 px-3 py-2">
              <Flame size={14} className="text-gold-light" />
              <span className="text-[10px] font-semibold text-gold-light">6-day weekly streak</span>
              <Sparkles size={12} className="text-gold/70 ml-auto" />
            </div>
          </div>
          <div className="hero-phone-home-bar" />
        </div>
      </div>
    </div>
  );
}
