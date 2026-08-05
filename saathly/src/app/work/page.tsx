import Link from "next/link";

export const metadata = {
  title: "RIZN Work — Corporate wellness",
  description: "Corporate wellness and team motivation — coming soon.",
};

export default function WorkPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <p className="section-label mb-3">For teams</p>
        <h1 className="font-display text-4xl font-bold mb-4">RIZN Work</h1>
        <p className="text-ink-soft text-lg mb-8 leading-relaxed">
          Daily personalized pulses for employees — reduce burnout and improve focus. Pilot program opening soon.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {[
            ["Admin dashboard", "Seats, departments, pause users"],
            ["Anonymous insights", "Mood trends without exposing names"],
            ["GST invoices", "Proper billing for finance teams"],
          ].map(([t, d]) => (
            <div key={t} className="soft-card rounded-2xl p-5">
              <h3 className="font-semibold mb-2">{t}</h3>
              <p className="text-sm text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
        <a href="mailto:work@rizn.app?subject=RIZN%20Work%20pilot" className="btn-primary inline-flex px-8 py-3.5 rounded-xl">
          Book pilot (email)
        </a>
        <Link href="/" className="block text-sm text-muted mt-8">← Home</Link>
      </div>
    </div>
  );
}
