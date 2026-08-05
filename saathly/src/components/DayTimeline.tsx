const day = [
  { time: "9:00", title: "Subah ka signal", text: "Naam + clear intention. Din direction ke saath shuru." },
  { time: "11:00", title: "Focus time", text: "Kaam mode. Ek important task — noise band." },
  { time: "13:00", title: "Body check", text: "Lunch + paani. Pehle battery, phir hustle." },
  { time: "15:00", title: "Afternoon shield", text: "Crash se bachao — stretch ya short walk." },
  { time: "17:00", title: "Life nudge", text: "Paisa / health micro-action. Panic nahi — step." },
  { time: "21:00", title: "Raat ka calm", text: "Din proud close. Phone side. Soft shutdown." },
];

export function DayTimeline() {
  return (
    <section id="day" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3">Tumhara din</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              9 se 9 — har 2 ghante ek message
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Spam nahi. Sirf 6 messages jo matter karte hain. Timing tum set karo. Heavy din pe soft mode.
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li className="flex gap-2"><span className="text-gold">▸</span> Apna schedule choose karo</li>
              <li className="flex gap-2"><span className="text-gold-light">▸</span> Har message me chhota action</li>
              <li className="flex gap-2"><span className="text-gold-dark">▸</span> Streak + weekly progress report</li>
            </ul>
          </div>

          <div className="relative space-y-4">
            <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-gold via-gold-light to-gold-dark opacity-40" />
            {day.map((item) => (
              <div key={item.time} className="relative flex gap-5">
                <div className="relative z-10 w-10 h-10 rounded-full bg-bg border border-gold/50 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(201,162,39,0.25)]">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <div className="soft-card rounded-2xl p-5 flex-1">
                  <div className="flex justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <span className="text-xs font-bold text-gold-light">{item.time}</span>
                  </div>
                  <p className="text-sm text-ink-soft">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
