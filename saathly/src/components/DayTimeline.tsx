const day = [
  { time: "9:00", title: "Boot sequence", text: "Naam + clear intention. Din start with direction." },
  { time: "11:00", title: "Focus pulse", text: "Work mode. Ek important task. Noise cut." },
  { time: "13:00", title: "Body check", text: "Lunch / water. Battery pehle, hustle baad." },
  { time: "15:00", title: "Dip shield", text: "Afternoon crash se bachao — stretch / walk." },
  { time: "17:00", title: "Goal nudge", text: "Money / life micro-action. Panic nahi — step." },
  { time: "21:00", title: "Shutdown calm", text: "Wrap proud. Phone side. Soft close." },
];

export function DayTimeline() {
  return (
    <section id="day" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3">Daily protocol</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              9 se 9 — har 2 ghante ek laser nudge
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Spam nahi. 6 precise pulses. Wake/sleep tum set karte ho. Heavy day pe soft mode.
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li className="flex gap-2"><span className="text-laser">▸</span> Custom schedule window</li>
              <li className="flex gap-2"><span className="text-laser-2">▸</span> Micro-action every pulse</li>
              <li className="flex gap-2"><span className="text-laser-3">▸</span> Streak + weekly rise report</li>
            </ul>
          </div>

          <div className="relative space-y-4">
            <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-laser via-laser-2 to-laser-3 opacity-40" />
            {day.map((item) => (
              <div key={item.time} className="relative flex gap-5">
                <div className="relative z-10 w-10 h-10 rounded-full bg-bg border border-laser/50 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(255,45,106,0.35)]">
                  <div className="w-2 h-2 rounded-full bg-laser" />
                </div>
                <div className="soft-card rounded-2xl p-5 flex-1">
                  <div className="flex justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <span className="text-xs font-bold text-laser-2">{item.time}</span>
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
