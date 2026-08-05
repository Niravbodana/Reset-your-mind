const steps = [
  { n: "01", title: "Naam + situation", desc: "2 minute. Paisa, health, pyaar, career — jo heavy hai batao." },
  { n: "02", title: "Apna time set karo", desc: "Subah se raat — messages usi window me aayenge." },
  { n: "03", title: "Roz rise karo", desc: "Actions, mood, streak — weekly report se khud dekho badlav." },
];

export function HowItWorksSimple() {
  return (
    <section id="how" className="py-16 md:py-20 border-y border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="section-label mb-3 text-center">Kaise kaam karta hai</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-4">
          3 step — bas itna simple
        </h2>
        <p className="text-center text-ink-soft mb-12 max-w-lg mx-auto">
          Koi complicated app nahi. Naam likho, problem batao, messages shuru.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="glass-gold rounded-2xl p-6 text-center md:text-left">
              <p className="font-display text-3xl font-bold gradient-gold mb-3">{s.n}</p>
              <h3 className="font-semibold text-lg text-white mb-2">{s.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
