"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";
import { personalMonthlyPrice } from "@/lib/pricing";

const staticFaqs = [
  {
    q: "How is this different from quote apps?",
    a: "RIZN uses your name, your chosen focus areas, and the time of day. Each message includes a small action — not a generic motivational quote.",
  },
  {
    q: "How do notifications work?",
    a: "Open your dashboard for today's personalized messages. In Settings, choose your interval (30 min to 4 hours) and optional times for lunch, gym, medicine, and more. Phone push notifications arrive with the mobile app.",
  },
  {
    q: "Can I change my message schedule?",
    a: "Yes. Go to Settings to set wake/sleep times, message frequency, and optional anchors like lunch, dinner, gym, yoga, and medicine.",
  },
  {
    q: "Is the mobile app available?",
    a: "Android and iOS apps are launching soon. Sign up now to get early access and be first to receive push notifications on your phone.",
  },
  {
    q: "Is RIZN a therapy or medical service?",
    a: "No. RIZN is a daily motivation and habit-support tool. It does not replace counselling or medical care. If you are in crisis, contact iCall 9152987821 or Vandrevala 9999666555.",
  },
  {
    q: "Where is my data stored?",
    a: "Your account details are stored securely. Message history, mood, and streak sync to your profile. We never sell your data.",
  },
];

type Props = {
  variant?: "section" | "page";
};

export function FaqList({ variant = "section" }: Props) {
  const config = useSiteConfig();
  const personal = personalMonthlyPrice(config);
  const launchPersonal = config.marketing.launchPricePersonal;

  const pricingAnswer = config.features.earlyBirdActive
    ? `RIZN Personal ₹${personal}/month (regular ₹${launchPersonal}) — daily messages + EMI reminders included. Start free today — no payment required.`
    : `RIZN Personal ₹${personal}/month — messages and EMI reminders included.`;

  const faqs = [
    ...staticFaqs.slice(0, 3),
    {
      q: "How does EMI reminder work?",
      a: "Add EMI name, amount, due date (day of month), and bank/NBFC. RIZN sends a notification 1 day before with your name — so you never miss a payment or get a late fee.",
    },
    staticFaqs[3],
    { q: "What will pricing be?", a: pricingAnswer },
    ...staticFaqs.slice(4),
  ];

  if (variant === "page") {
    return (
      <div className="space-y-4">
        {faqs.map(({ q, a }) => (
          <div key={q} className="soft-card rounded-2xl p-5">
            <h2 className="font-semibold text-white mb-2">{q}</h2>
            <p className="text-sm text-ink-soft leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
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
  );
}
