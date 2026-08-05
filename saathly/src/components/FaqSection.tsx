"use client";

const faqs = [
  ["Ye free quotes se alag kaise?", "Naam + situation + timing + micro-action. Generic suvichar nahi."],
  ["Depression cure?", "Nahi. Support + habits. Professional help ke saath use karo."],
  ["Cancel?", "Kabhi bhi. Billing se 1 click (live Razorpay ke baad)."],
];

export function FaqSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <p className="section-label mb-3 text-center">FAQ</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Clear answers</h2>
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="soft-card rounded-2xl p-5 group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between gap-3">
                {q}
                <span className="text-laser group-open:rotate-45 transition">+</span>
              </summary>
              <p className="text-sm text-ink-soft mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
