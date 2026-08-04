const day = [
  {
    time: "9:00 AM",
    title: "Subah ka push",
    text: "Aankh khulte hi — naam ke saath ek clear intention. Din ka pehla direction.",
  },
  {
    time: "11:00 AM",
    title: "Focus check",
    text: "Work start ho chuka. Deep breath + ek important kaam. Distraction kam.",
  },
  {
    time: "1:00 PM",
    title: "Body yaad",
    text: "Lunch skip mat kar. Paani. 10 min break. Health pehle, hustle baad me.",
  },
  {
    time: "3:00 PM",
    title: "Energy dip",
    text: "Thakaan normal hai. Short walk ya stretch. Afternoon crash se bachao.",
  },
  {
    time: "5:00 PM",
    title: "Money / goals",
    text: "Chhota financial ya life goal nudge. Panic nahi — practical step.",
  },
  {
    time: "9:00 PM",
    title: "Calm close",
    text: "Din wrap. Proud feel. Phone side. Neend ke liye soft message.",
  },
];

export function DayTimeline() {
  return (
    <section id="day" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-label mb-3">Ek normal busy din</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4 leading-tight">
              Subah 9 se raat 9 — har 2 ghante ek saathi
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Zyada notifications irritate karte hain. Isliye smart schedule: 6 messages, sahi
              timing pe, tumhari life ke hisaab se. Weekend pe kam bhi kar sakte ho.
            </p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li className="flex gap-2">
                <span className="text-accent font-bold">→</span> Wake / sleep time tum set karte ho
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">→</span> “Aaj heavy din” pe softer mode
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">→</span> Har message ke saath 1 micro-action
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-line" />
            <div className="space-y-5">
              {day.map((item) => (
                <div key={item.time} className="relative flex gap-5">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-bg border-2 border-accent flex items-center justify-center shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>
                  <div className="soft-card rounded-2xl p-5 flex-1">
                    <div className="flex items-baseline justify-between gap-3 mb-1">
                      <h3 className="font-semibold text-ink">{item.title}</h3>
                      <span className="text-xs font-semibold text-accent whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-ink-soft leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
