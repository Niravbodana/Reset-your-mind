"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";
import { regionPersonalPriceLabel } from "@/lib/pricing";
import { crisisResources } from "@/lib/locale";

type Props = {
  variant?: "section" | "page";
};

export function FaqList({ variant = "section" }: Props) {
  const config = useSiteConfig();
  const priceLabel = regionPersonalPriceLabel(config, "IN");
  const trialDays = config.marketing.trialDays || 7;
  const crisis = crisisResources("IN");
  const crisisLine = crisis.map((c) => `${c.label} (${c.value})`).join(" or ");

  const pricingAnswer = `${trialDays}-day free trial, then ${priceLabel}. UPI/card autopay after trial. Cancel anytime — billing stops on the next cycle.`;

  const faqs = [
    {
      q: "What is RIZN?",
      a: "RIZN is a daily life improvement platform. Personalized notifications for motivation, bill reminders, water, sleep, steps, and habits — with your name.",
    },
    {
      q: "How is RIZN different from quote apps?",
      a: "Quote apps send the same line to everyone. RIZN uses your name, your focus areas, and time of day. Each message includes a small action — not a generic poster.",
    },
    {
      q: "How much does RIZN cost?",
      a: pricingAnswer,
    },
    {
      q: "Is there a free trial?",
      a: `Yes — ${trialDays} days free with full access. No charge until the trial ends. Cancel before day ${trialDays + 1} and you pay nothing.`,
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. Cancel from Settings or billing. Autopay stops on the next cycle. No lock-in, no cancellation fee.",
    },
    {
      q: "How do notifications work?",
      a: "Open your dashboard for today's messages. In Settings, set interval (30 min to 4 hours) and optional anchors — lunch, gym, medicine, sleep. Push notifications arrive with the mobile app.",
    },
    {
      q: "How do bill and EMI reminders work?",
      a: "Add bill name, amount, due date, and bank/NBFC. RIZN sends a caring notification 1 day before — with your name, amount, and date. Supportive, not stressful.",
    },
    {
      q: "Can I change my message schedule?",
      a: "Yes. Settings → wake/sleep times, message frequency, and optional times for lunch, dinner, gym, yoga, and medicine.",
    },
    {
      q: "What languages are supported?",
      a: "English, Hinglish (Roman Hindi), and Hindi (Devanagari). Switch anytime in Settings or the language picker.",
    },
    {
      q: "What is Soft Day?",
      a: "One tap reduces message frequency and uses a gentler tone. For days when you need rest, not pressure.",
    },
    {
      q: "What is Pause Mode?",
      a: "Pause up to 7 days without cancelling. Your account and streak settings stay safe until you're back.",
    },
    {
      q: "What is Streak Freeze?",
      a: "One forgiven miss per month. Life happens — your streak doesn't have to break because of one off day.",
    },
    {
      q: "Is the mobile app available?",
      a: "Android and iOS apps are launching soon. Sign up now for early access and push notifications on your phone.",
    },
    {
      q: "Is RIZN a therapy or medical service?",
      a: `No. RIZN is daily motivation and habit support. It does not replace counselling or medical care. In crisis, contact ${crisisLine}.`,
    },
    {
      q: "Where is my data stored?",
      a: "Account details stored securely. Message history, mood, and streak sync to your profile. We never sell your data.",
    },
    {
      q: "Do you send spam?",
      a: "No. You control frequency and times. Soft Day and Pause exist for exactly when you need less — not more.",
    },
    {
      q: "How does the referral work?",
      a: "Share your invite link from the dashboard. Friends get a free trial when they sign up through your link.",
    },
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
          <summary className="font-semibold cursor-pointer list-none flex justify-between items-center gap-3 text-white min-h-[48px] py-1">
            <span className="text-[15px] leading-snug">{q}</span>
            <span className="text-gold-light group-open:rotate-45 transition-transform shrink-0 text-xl" aria-hidden>
              +
            </span>
          </summary>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">{a}</p>
        </details>
      ))}
    </div>
  );
}
