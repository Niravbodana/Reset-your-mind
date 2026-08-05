"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { dualPersonalPriceLabel, personalMonthlyPrice } from "@/lib/pricing";
import { formatMoney, crisisResources } from "@/lib/locale";

type Props = {
  variant?: "section" | "page";
};

export function FaqList({ variant = "section" }: Props) {
  const config = useSiteConfig();
  const { region, currency, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const personal = personalMonthlyPrice(config, currency);
  const launchPersonal =
    currency === "USD"
      ? config.marketing.launchPricePersonalUsd
      : config.marketing.launchPricePersonal;
  const trialDays = config.marketing.trialDays || 7;
  const crisis = crisisResources(region);

  const pricingAnswer = config.features.earlyBirdActive
    ? isIN
      ? `RIZN Personal: ${trialDays}-day free trial, then ${formatMoney(personal, currency)}/month autopay (regular ${formatMoney(launchPersonal, currency)}). Also worldwide at ${dualPersonalPriceLabel(config)}. UPI/card mandate — trial ke baad automatic. Cancel anytime.`
      : `RIZN Personal: ${trialDays}-day free trial, then ${formatMoney(personal, currency)}/month autopay (regular ${formatMoney(launchPersonal, currency)}). Available worldwide — ${dualPersonalPriceLabel(config)}. Cancel anytime.`
    : isIN
      ? `RIZN Personal: ${trialDays}-day free trial, then ${formatMoney(personal, currency)}/month. Messages + EMI/bill reminders. Worldwide: ${dualPersonalPriceLabel(config)}.`
      : `RIZN Personal: ${trialDays}-day free trial, then ${formatMoney(personal, currency)}/month. Messages + bill reminders included. Also ${dualPersonalPriceLabel(config)}.`;

  const crisisLine = crisis
    .map((c) => `${c.label} (${c.value})`)
    .join(isIN ? " ya " : " or ");

  const faqs = [
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
      q: isIN ? "How does EMI / bill reminder work?" : "How do bill reminders work?",
      a: isIN
        ? "Add EMI/bill name, amount, due date (day of month), and bank/NBFC. RIZN sends a caring notification 1 day before with your name — supportive reminder, tension kam, confidence zyada."
        : "Add bill name, amount, due day of month, and provider. RIZN sends a caring notification 1 day before with your name — supportive, not stressful.",
    },
    {
      q: "Is the mobile app available?",
      a: "Android and iOS apps are launching soon. Sign up now to get early access and be first to receive push notifications on your phone — available worldwide.",
    },
    { q: "What will pricing be?", a: pricingAnswer },
    {
      q: "Is RIZN a therapy or medical service?",
      a: `No. RIZN is a daily motivation and habit-support tool. It does not replace counselling or medical care. If you are in crisis, contact ${crisisLine}.`,
    },
    {
      q: "Where is my data stored?",
      a: "Your account details are stored securely. Message history, mood, and streak sync to your profile. We never sell your data.",
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
            <span className="text-gold-light group-open:rotate-45 transition-transform shrink-0 text-xl">
              +
            </span>
          </summary>
          <p className="text-sm text-ink-soft mt-3 leading-relaxed">{a}</p>
        </details>
      ))}
    </div>
  );
}
