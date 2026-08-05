import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
        <div className="soft-card rounded-[2rem] p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-laser-2 to-transparent" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-laser/25 blur-3xl" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5 relative">
            Kal regret mat karna.
            <br />
            <span className="laser-text">Aaj rise start karo.</span>
          </h2>
          <p className="text-ink-soft mb-8 max-w-md mx-auto relative">
            7 din me feel hoga — ye quotes nahi, tumhare naam ke saath daily operating system hai.
          </p>
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base relative"
          >
            Free trial start
            <ArrowRight size={18} />
          </Link>
          <p className="mt-5 text-xs text-muted relative">
            Not a therapist. Crisis: iCall 9152987821
          </p>
        </div>
      </div>
    </section>
  );
}
