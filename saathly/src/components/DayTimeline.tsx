export function DayTimeline() {
  return (
    <section id="day" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3">Your schedule</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              A day built around your life
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Fixed 2-hour slots nahi — Settings me interval choose karo aur optional times set karo:
              lunch, dinner, medicine, gym, yoga, breakfast, paani.
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>30 min · 1h · 2h · 3h · 4h message gap</li>
              <li>Wake & sleep window</li>
              <li>Optional daily anchors — toggle on/off anytime</li>
              <li>Soft mode for gentler days (max 4 messages)</li>
            </ul>
          </div>

          <div className="relative space-y-4">
            <div className="absolute left-5 top-4 bottom-4 w-px bg-white/10" />
            {day.map((item) => (
              <div key={item.time} className="relative flex gap-5">
                <div className="relative z-10 w-10 h-10 rounded-full bg-bg border border-gold/40 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <div className="soft-card rounded-2xl p-5 flex-1">
                  <div className="flex justify-between gap-3 mb-1">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <span className="text-xs font-medium text-gold-light">{item.time}</span>
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

const day = [
  { time: "06:30", title: "Yoga (optional)", text: "Stretch + breath if you enabled it in Settings." },
  { time: "09:00", title: "Wake pulse", text: "Name + one clear intention for the day." },
  { time: "13:00", title: "Lunch anchor", text: "Fuel up — optional reminder you control." },
  { time: "17:00", title: "Life action", text: "Small step for money or health." },
  { time: "20:00", title: "Dinner", text: "Wind down — optional evening anchor." },
  { time: "21:00", title: "Sleep window", text: "Last message before your sleep time." },
];
