import Link from "next/link";
import { Apple, Play, ArrowRight } from "lucide-react";

export function AppComingSoon() {
  return (
    <section id="app" className="py-20 md:py-24 border-y border-white/5 bg-bg-elevated/50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-label mb-3">Mobile app</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Android & iOS — coming soon
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              This website is the first version of RIZN. You can join early access, set up your profile,
              and preview messages in the browser today. The native app will add lock-screen push
              notifications, offline reading, and a smoother daily experience.
            </p>
            <ul className="space-y-2 text-sm text-ink-soft mb-8">
              <li className="flex gap-2">
                <span className="text-gold">•</span> Push notifications at your chosen times
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span> Same personalized pulses as the web preview
              </li>
              <li className="flex gap-2">
                <span className="text-gold">•</span> Streak, mood, and weekly summary on your phone
              </li>
            </ul>
            <Link href="/signup" className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm">
              Join waitlist for app launch
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 opacity-50 pointer-events-none select-none">
              <div className="soft-card rounded-2xl px-6 py-4 flex items-center gap-3 min-w-[180px]">
                <Play size={24} className="text-gold-light" />
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wide">Google Play</p>
                  <p className="font-semibold text-white text-sm">Coming soon</p>
                </div>
              </div>
              <div className="soft-card rounded-2xl px-6 py-4 flex items-center gap-3 min-w-[180px]">
                <Apple size={24} className="text-gold-light" />
                <div>
                  <p className="text-[10px] text-muted uppercase tracking-wide">App Store</p>
                  <p className="font-semibold text-white text-sm">Coming soon</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted text-center max-w-xs">
              Join the waitlist — we will email you when the app is ready. No spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
