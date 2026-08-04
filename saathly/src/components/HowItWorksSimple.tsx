const steps = [
  {
    n: "1",
    title: "Naam + situation batao",
    desc: "2 minute. Paisa, health, love, career — jo abhi heavy hai, choose karo.",
  },
  {
    n: "2",
    title: "Timing set karo",
    desc: "Subah kab uthte ho, raat kab soote ho. Messages usi window me aayenge.",
  },
  {
    n: "3",
    title: "Roz saath raho",
    desc: "Har message pe chhota action. Mood tap. Streak. Weekly dekho kitna better feel hua.",
  },
];

export function HowItWorksSimple() {
  return (
    <section className="py-16 md:py-20 border-y border-line">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="section-label mb-3 text-center">Simple</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-ink mb-12">
          Complicated app nahi. Roz ka saath.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="text-center md:text-left">
              <div className="inline-flex w-12 h-12 rounded-2xl bg-accent text-white font-display text-xl font-semibold items-center justify-center mb-4">
                {s.n}
              </div>
              <h3 className="font-semibold text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
