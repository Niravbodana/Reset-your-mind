import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQ — RIZN" };

const faqs = [
  {
    q: "What is RIZN?",
    a: "RIZN sends short, personalized messages with your name — about every two hours during the day — covering money, health, relationships, career, and mental clarity. Each message includes one small action.",
  },
  {
    q: "Is this a therapy or medical service?",
    a: "No. RIZN is a motivation and habit-support product. For crisis support, contact iCall 9152987821 or Vandrevala 9999666555.",
  },
  {
    q: "How do I get messages today?",
    a: "Join early access, set up your profile, and open your web dashboard to read today's pulses. This is a preview of the full experience.",
  },
  {
    q: "When will push notifications work?",
    a: "With the Android and iOS app, currently in development. The same messages you see on the web will arrive as phone notifications at your chosen times.",
  },
  {
    q: "Will WhatsApp be supported?",
    a: "Yes, planned for Parivaar plan members who prefer WhatsApp over app notifications.",
  },
  {
    q: "What will pricing be?",
    a: "Personal: ₹99/month. Parivaar (up to 4 members): ₹249/month. Web preview is free during early access.",
  },
  {
    q: "Where is my data stored?",
    a: "In this preview, data stays in your browser. Production will use encrypted cloud storage with strict access controls.",
  },
];

export default function FaqPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-3">FAQ</h1>
        <p className="text-ink-soft text-sm mb-8">Straight answers about the product and roadmap.</p>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="soft-card rounded-2xl p-5">
              <h2 className="font-semibold text-white mb-2">{q}</h2>
              <p className="text-sm text-ink-soft leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
        <Link href="/signup" className="btn-primary inline-flex mt-10 px-6 py-3 rounded-xl text-sm">
          Join early access
        </Link>
      </div>
    </div>
  );
}
