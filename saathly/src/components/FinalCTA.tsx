import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
        <div className="glass-gold rounded-[2rem] p-10 md:p-14 relative overflow-hidden shimmer-border">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-5 relative">
            Kal regret mat karna.
            <br />
            <span className="gradient-gold">Aaj rise shuru karo.</span>
          </h2>
          <p className="text-ink-soft mb-8 max-w-md mx-auto relative">
            7 din free me feel hoga — ye sirf quotes nahi, tumhare naam ke saath roz ka system hai.
          </p>
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base relative"
          >
            Abhi 7 din free shuru karo
            <ArrowRight size={18} />
          </Link>
          <p className="mt-5 text-xs text-muted relative">
            Card ki zaroorat nahi · Kabhi bhi cancel · Crisis: iCall 9152987821
          </p>
        </div>
      </div>
    </section>
  );
}
