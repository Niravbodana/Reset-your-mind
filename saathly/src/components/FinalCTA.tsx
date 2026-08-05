import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 md:px-6 text-center">
        <div className="soft-card rounded-2xl p-10 md:p-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            Aaj se apna rasta shuru karo
          </h2>
          <p className="text-ink-soft mb-8 max-w-md mx-auto">
            Join karo — roz tumhare naam pe messages jo life me actually farak laate hain. Hope wapas
            lao, habit banao, aage badho.
          </p>
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base"
          >
            Free me shuru karo
            <ArrowRight size={18} />
          </Link>
          <p className="mt-5 text-xs text-muted">
            No card required · Crisis support: iCall 9152987821
          </p>
        </div>
      </div>
    </section>
  );
}
