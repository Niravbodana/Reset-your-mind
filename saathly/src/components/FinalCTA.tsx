import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
        <div className="soft-card rounded-2xl p-10 md:p-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Start with the web preview today
          </h2>
          <p className="text-ink-soft mb-8 max-w-md mx-auto">
            Set up your profile, see how personalized pulses work, and get notified when the mobile
            app launches with push notifications.
          </p>
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base"
          >
            Join early access
            <ArrowRight size={18} />
          </Link>
          <p className="mt-5 text-xs text-muted">
            Free web preview · No card required · Crisis line: iCall 9152987821
          </p>
        </div>
      </div>
    </section>
  );
}
