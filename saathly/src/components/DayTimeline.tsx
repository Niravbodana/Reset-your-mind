export function DayTimeline() {
  return (
    <section id="day" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3">Your schedule</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Up to six messages between 9 AM and 9 PM
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Not spam — six focused touchpoints in preview (four in soft mode). Custom wake/sleep
              times and weekly summary are planned for the mobile app launch.
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                <span className="text-white">Now:</span> default 9 AM–9 PM window in web preview
              </li>
              <li>One small action per message</li>
              <li>Streak tracking in dashboard today</li>
              <li className="text-muted">Planned: custom hours, weekly summary, push delivery</li>
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
  { time: "9:00", title: "Morning start", text: "Name + one clear intention for the day." },
  { time: "11:00", title: "Focus block", text: "One important task — reduce noise." },
  { time: "13:00", title: "Body check", text: "Lunch or water — fuel before more work." },
  { time: "15:00", title: "Afternoon reset", text: "Short break before the energy dip." },
  { time: "17:00", title: "Life action", text: "A small step for money or health." },
  { time: "21:00", title: "Evening close", text: "Wrap the day and wind down." },
];
