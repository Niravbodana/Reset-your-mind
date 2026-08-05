const steps = [
  { n: "01", title: "Name + situation", desc: "2 min. Paisa, health, love, career — jo heavy hai." },
  { n: "02", title: "Set your window", desc: "Subah–raat timing. Pulses usi me fire honge." },
  { n: "03", title: "Rise daily", desc: "Actions. Mood. Streak. Weekly report — proof of change." },
];

export function HowItWorksSimple() {
  return (
    <section className="py-16 md:py-20 border-y border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="section-label mb-3 text-center">Protocol</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Simple system. Strong rise.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="soft-card rounded-2xl p-6 text-center md:text-left">
              <p className="font-display text-3xl font-bold laser-text mb-3">{s.n}</p>
              <h3 className="font-semibold text-lg text-white mb-2">{s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
