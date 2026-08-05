const steps = [
  {
    n: "01",
    title: "Create your profile",
    desc: "Name, email, focus areas, and language. Takes about two minutes.",
  },
  {
    n: "02",
    title: "Preview your daily flow",
    desc: "Default 9 AM–9 PM window in preview. Custom wake/sleep hours ship with the mobile app.",
  },
  {
    n: "03",
    title: "Receive and respond",
    desc: "Read pulses on the web today; get push notifications when the app ships.",
  },
];

export function HowItWorksSimple() {
  return (
    <section id="how" className="py-16 md:py-20 border-y border-white/10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="section-label mb-3 text-center">How it works</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Three steps to get started
        </h2>
        <p className="text-center text-ink-soft mb-12 max-w-lg mx-auto">
          No complicated setup. Join early access, configure once, and preview your daily flow.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="soft-card rounded-2xl p-6">
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
