const steps = [
  {
    n: "01",
    title: "Apna profile banao",
    desc: "Naam, email, focus areas, language — 1 minute me ho jata hai.",
  },
  {
    n: "02",
    title: "EMI + schedule set karo",
    desc: "EMI amount, date, bank add karo. Message interval aur wake/sleep choose karo.",
  },
  {
    n: "03",
    title: "Roz value feel karo",
    desc: "Naam ke saath messages aur EMI alert — chhote steps, badi life change.",
  },
];

export function HowItWorksSimple() {
  return (
    <section id="how" className="py-14 sm:py-16 md:py-20 border-y border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="section-label mb-3 text-center">How it works</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Teen steps — life change shuru
        </h2>
        <p className="text-center text-ink-soft mb-8 sm:mb-12 max-w-lg mx-auto text-sm sm:text-base">
          Simple setup. Roz tumhare naam pe value — habit ban jati hai, plan continue karna easy.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="premium-card rounded-2xl p-6">
              <p className="text-sm font-semibold text-gold-light mb-3">{s.n}</p>
              <h3 className="font-semibold text-lg text-white mb-2">{s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
