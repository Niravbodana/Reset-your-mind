import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink leading-tight mb-5">
          Kal regret mat karna.
          <br />
          <span className="text-accent">Aaj se saath shuru karo.</span>
        </h2>
        <p className="text-ink-soft mb-8 max-w-md mx-auto leading-relaxed">
          7 din me feel hoga — messages sirf quotes nahi, tumhare naam ke saath ek roz ka humsafar
          hain.
        </p>
        <Link
          href="/signup"
          className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base"
        >
          Free trial shuru karo
          <ArrowRight size={18} />
        </Link>
        <p className="mt-4 text-xs text-muted">
          Therapist nahi hai ye. Agar bahut heavy ho — iCall: 9152987821
        </p>
      </div>
    </section>
  );
}
