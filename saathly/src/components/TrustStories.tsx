const stories = [
  {
    name: "Priya · Mumbai",
    focus: "Money",
    text: "EMI panic kam hua. Roz chhota action. 1 mahine me ₹8k side.",
  },
  {
    name: "Rahul · Delhi",
    focus: "Burnout",
    text: "Lunch reminders ne routine badla. Office me calm feel.",
  },
  {
    name: "Ananya · Bangalore",
    focus: "Heart",
    text: "Soft language. No pressure. 21 din baad better sleep.",
  },
];

export function TrustStories() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-3">Why people renew</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Pay tabhi jab rise feel ho
          </h2>
          <p className="text-ink-soft">
            Goal: mindset stable, actions clear, low-mood days kam. Tabhi subscription chalta hai.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {stories.map((s) => (
            <blockquote key={s.name} className="soft-card rounded-2xl p-6">
              <p className="text-[11px] font-bold uppercase tracking-wider text-laser mb-3">{s.focus}</p>
              <p className="text-[15px] text-white/90 mb-5 leading-relaxed">&ldquo;{s.text}&rdquo;</p>
              <footer className="text-sm text-muted">{s.name}</footer>
            </blockquote>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: "6", v: "pulses / day" },
            { k: "2h", v: "spacing" },
            { k: "₹99", v: "personal" },
            { k: "7d", v: "free trial" },
          ].map((i) => (
            <div key={i.v} className="soft-card rounded-2xl p-5 text-center">
              <p className="font-display text-3xl font-bold laser-text">{i.k}</p>
              <p className="text-xs text-muted mt-1">{i.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
