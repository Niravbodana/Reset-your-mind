"use client";

const STORIES = [
  { name: "Priya", city: "Mumbai", streak: 12, line: "Neend wapas aa gayi" },
  { name: "Rahul", city: "Pune", streak: 8, line: "EMI pehle se ready" },
  { name: "Ananya", city: "Delhi", streak: 21, line: "Roz ek chhota win" },
  { name: "Vikram", city: "Ahmedabad", streak: 15, line: "Tension kam, control zyada" },
  { name: "Sneha", city: "Bengaluru", streak: 9, line: "Messages naam pe — feel hota hai" },
];

export function SocialProof() {
  return (
    <section className="border-y border-white/5 bg-bg-elevated/50 py-8 sm:py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="section-label mb-4 text-center">Logon ki life better ho rahi hai</p>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory -mx-1 px-1">
          {STORIES.map((s) => (
            <article
              key={s.name}
              className="snap-start shrink-0 w-[240px] sm:w-[260px] premium-card rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold font-bold text-sm">
                  {s.name[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {s.name} ji · {s.city}
                  </p>
                  <p className="text-xs text-gold-light">{s.streak} din ki habit</p>
                </div>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">&ldquo;{s.line}&rdquo;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
