import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
        <div className="soft-card rounded-2xl p-10 md:p-14 border border-gold/25">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-3">
            RIZN — aapki life change ka reason
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            ₹99 me shuru karo — aaj hi
          </h2>
          <p className="text-ink-soft mb-8 max-w-md mx-auto">
            Daily messages + EMI 1 din pehle alert. Hope wapas lao, habit banao, life control me lao.
          </p>
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
          >
            Abhi join karo — ₹99
            <ArrowRight size={18} />
          </Link>
          <p className="mt-5 text-xs text-muted">No card required · Crisis support: iCall 9152987821</p>
        </div>
      </div>
    </section>
  );
}
