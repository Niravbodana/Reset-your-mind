"use client";

const faqs = [
  {
    q: "How is this different from quote apps?",
    a: "RIZN uses your name, your chosen focus areas, and the time of day. Each message includes a small action — not a generic motivational quote.",
  },
  {
    q: "How do notifications work right now?",
    a: "On the website preview, you open your dashboard to read today's pulses. When the mobile app launches, the same messages will arrive as push notifications on your phone.",
  },
  {
    q: "Is the mobile app available?",
    a: "Not yet. Android and iOS apps are in development. Join the waitlist to get an email when they are ready.",
  },
  {
    q: "Is RIZN a therapy or medical service?",
    a: "No. RIZN is a daily motivation and habit-support tool. If you are in crisis, please contact iCall 9152987821 or a licensed professional.",
  },
  {
    q: "What will pricing be?",
    a: "Personal plan is planned at ₹99/month; Parivaar (up to 4 members) at ₹249/month. Web preview is free while we are in early access.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="section-label mb-3 text-center">FAQ</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10 text-white">
          Common questions
        </h2>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details key={q} className="soft-card rounded-2xl p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between gap-3 text-white">
                {q}
                <span className="text-gold-light group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
