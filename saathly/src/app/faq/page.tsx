import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQ — RIZN" };

const faqs = [
  ["RIZN kya hai?", "Har ~2 ghante tumhare naam ke saath personalized motivation pulses — finance, health, love, career, mind."],
  ["Therapist hai kya?", "Nahi. Mindset companion hai. Crisis me iCall 9152987821 / Vandrevala 9999666555."],
  ["Price?", "Personal ₹99/mo, Parivaar ₹249/mo (4 seats). 7 din free trial."],
  ["Notifications kaise?", "Abhi web/demo inbox. Next: Web Push + WhatsApp (Phases K & Q)."],
  ["Data kahan?", "Demo: browser localStorage. Production: Supabase Postgres + RLS."],
];

export default function FaqPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <p className="section-label mb-3">Phase D / U</p>
        <h1 className="font-display text-4xl font-bold mb-8">FAQ</h1>
        <div className="space-y-4">
          {faqs.map(([q, a]) => (
            <div key={q} className="soft-card rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-2">{q}</h2>
              <p className="text-sm text-ink-soft leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
        <Link href="/signup" className="btn-primary inline-flex mt-10 px-6 py-3 rounded-xl text-sm">Start free</Link>
      </div>
    </div>
  );
}
