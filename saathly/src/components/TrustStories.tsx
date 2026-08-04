const stories = [
  {
    name: "Priya, 29 · Mumbai",
    focus: "Money stress",
    text: "Pehle har raat EMI sochti thi. Ab message aata hai naam leke — chhota action deti hoon. 1 mahine me ₹8,000 side me.",
  },
  {
    name: "Rahul, 32 · Delhi",
    focus: "Burnout",
    text: "Lunch skip karta tha. Ab 1 baje reminder aata hai. Lagta hai koi hai jo notice karta hai. Office me bhi calm feel hota hai.",
  },
  {
    name: "Ananya, 26 · Bangalore",
    focus: "Heartbreak",
    text: "Quotes apps pe gussa aata tha. Yahan soft language hai, pressure nahi. 21 din ke baad pehli baar achhi neend aayi.",
  },
];

export function TrustStories() {
  return (
    <section className="py-20 md:py-28 bg-bg-deep text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-3">
            Log kyon continue karte hain
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-4">
            Pay tabhi karte hain jab life me farq mehsoos ho
          </h2>
          <p className="text-white/65 leading-relaxed">
            Humara goal: 1000 me se kam se kam 200 logon ka mindset stabilize ho — mood better,
            agey steps clear, depression wala feel kam. Tabhi subscription chalta hai.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {stories.map((s) => (
            <blockquote key={s.name} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-3">
                {s.focus}
              </p>
              <p className="text-[15px] leading-relaxed text-white/90 mb-5">&ldquo;{s.text}&rdquo;</p>
              <footer className="text-sm text-white/50">{s.name}</footer>
            </blockquote>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "6", v: "messages / day" },
            { k: "2 hr", v: "smart spacing" },
            { k: "₹99", v: "monthly, clear" },
            { k: "7 din", v: "free, no card" },
          ].map((item) => (
            <div key={item.v} className="rounded-2xl border border-white/10 p-5 text-center">
              <p className="font-display text-3xl text-accent font-semibold">{item.k}</p>
              <p className="text-xs text-white/50 mt-1">{item.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
