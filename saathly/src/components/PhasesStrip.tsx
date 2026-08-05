import Link from "next/link";

const phases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function PhasesStrip() {
  return (
    <section className="py-14 border-y border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
        <p className="section-label mb-3">Roadmap A → Z</p>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Poora system scaffolded</h2>
        <p className="text-sm text-ink-soft mb-6 max-w-xl mx-auto">
          Demo mode me signup → pulses → mood → family → billing chalega. Live keys se production unlock.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {phases.map((p) => (
            <span
              key={p}
              className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-xs font-bold flex items-center justify-center text-laser-2"
            >
              {p}
            </span>
          ))}
        </div>
        <Link href="/faq" className="text-sm text-laser hover:underline">
          FAQ & docs →
        </Link>
      </div>
    </section>
  );
}
