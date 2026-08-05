"use client";

import Link from "next/link";
import {
  Activity,
  Bell,
  CalendarDays,
  CloudSun,
  CreditCard,
  Droplets,
  Flame,
  Footprints,
  Gift,
  Globe2,
  HeartHandshake,
  Moon,
  PauseCircle,
  Shield,
  Sparkles,
  Sunrise,
  Trophy,
  Wallet,
} from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { formatPersonalPrice, dualPersonalPriceLabel } from "@/lib/pricing";
import { ScrollReveal } from "./ScrollReveal";

type Feature = {
  icon: typeof Bell;
  titleIN: string;
  titleEN: string;
  bodyIN: string;
  bodyEN: string;
};

const FEATURES: Feature[] = [
  {
    icon: Bell,
    titleIN: "Daily messages — naam ke saath",
    titleEN: "Daily messages with your name",
    bodyIN: "1000+ unique messages. Kabhi generic quote nahi — har ek tumhare liye.",
    bodyEN: "1000+ unique messages. Never generic quotes — each one is for you.",
  },
  {
    icon: CreditCard,
    titleIN: "EMI / Bill reminders",
    titleEN: "Bill reminders",
    bodyIN: "1 din pehle caring alert — amount, date, bank. Tension kam.",
    bodyEN: "Caring alert 1 day early — amount, date, provider. Less stress.",
  },
  {
    icon: CalendarDays,
    titleIN: "Bill calendar",
    titleEN: "Bill calendar",
    bodyIN: "Poora mahina ek nazar me — due dates gold me highlight.",
    bodyEN: "See the whole month at a glance — due dates highlighted.",
  },
  {
    icon: Footprints,
    titleIN: "Steps goal + live walk",
    titleEN: "Steps goal + live walk",
    bodyIN: "3k–10k goal. Live walk count. Incomplete pe naam ke saath nudge.",
    bodyEN: "3k–10k goal. Live walk count. Incomplete? Nudge with your name.",
  },
  {
    icon: Droplets,
    titleIN: "Water / hydrate goal",
    titleEN: "Water / hydrate goal",
    bodyIN: "Glasses tap karo. Goal miss pe caring reminder — spam nahi.",
    bodyEN: "Tap glasses. Miss the goal? A caring reminder — never spam.",
  },
  {
    icon: Moon,
    titleIN: "Sleep wind-down",
    titleEN: "Sleep wind-down",
    bodyIN: "Raat ka soft close — screen down, clear mind for tomorrow.",
    bodyEN: "Evening soft close — screen down, clear mind for tomorrow.",
  },
  {
    icon: Activity,
    titleIN: "Health score",
    titleEN: "Health score",
    bodyIN: "Steps + water + sleep + mood + bills = shareable score.",
    bodyEN: "Steps + water + sleep + mood + bills = a shareable score.",
  },
  {
    icon: Sunrise,
    titleIN: "Morning one-card",
    titleEN: "Morning one-card",
    bodyIN: "Ek card: pehla message + next bill. Subah ka clear plan.",
    bodyEN: "One card: first message + next bill. Your morning, clear.",
  },
  {
    icon: Wallet,
    titleIN: "Mark as paid",
    titleEN: "Mark as paid",
    bodyIN: "Pay kiya → tap → peedha khatam. Progress dikhta hai.",
    bodyEN: "Paid it → tap → done. You see real progress.",
  },
  {
    icon: Sparkles,
    titleIN: "Today briefing",
    titleEN: "Today briefing",
    bodyIN: "Messages baaki + bills due — roz ka control panel.",
    bodyEN: "Messages left + bills due — your daily control panel.",
  },
  {
    icon: CloudSun,
    titleIN: "Soft Day",
    titleEN: "Soft Day",
    bodyIN: "Ek tap — kam messages, soft tone. Difficult din ke liye.",
    bodyEN: "One tap — fewer messages, gentler tone for hard days.",
  },
  {
    icon: PauseCircle,
    titleIN: "Pause 7 days",
    titleEN: "Pause 7 days",
    bodyIN: "Cancel mat karo — 7 din soft pause. Habit safe.",
    bodyEN: "Don't cancel — soft pause for 7 days. Habit stays safe.",
  },
  {
    icon: Shield,
    titleIN: "Streak freeze",
    titleEN: "Streak freeze",
    bodyIN: "Har mahine 1 miss maaf — streak tootegi nahi.",
    bodyEN: "1 forgiven miss every month — your streak stays alive.",
  },
  {
    icon: Trophy,
    titleIN: "Weekly wins",
    titleEN: "Weekly wins",
    bodyIN: "Streak, actions, mood, paid bills — share karo proudly.",
    bodyEN: "Streak, actions, mood, paid bills — share them proudly.",
  },
  {
    icon: Flame,
    titleIN: "Trial value report",
    titleEN: "Trial value report",
    bodyIN: "Day 5 pe dekho kitna move hua — autopay confidently.",
    bodyEN: "On day 5 see your progress — keep autopay with confidence.",
  },
  {
    icon: HeartHandshake,
    titleIN: "Buddy check-in",
    titleEN: "Buddy check-in",
    bodyIN: "Ek dost ko gentle nudge — saath me habit strong.",
    bodyEN: "Gentle nudge to one friend — habits stick together.",
  },
  {
    icon: Gift,
    titleIN: "Referral invites",
    titleEN: "Referral invites",
    bodyIN: "Dost ko invite — unhe free trial, tumhe feel-good.",
    bodyEN: "Invite a friend — they get a free trial, you feel good.",
  },
  {
    icon: Globe2,
    titleIN: "India + Worldwide",
    titleEN: "India + Worldwide",
    bodyIN: "Hinglish/Hindi/English · ₹ aur $ pricing · global crisis help.",
    bodyEN: "English/Hinglish/Hindi · ₹ and $ pricing · global crisis help.",
  },
];

export function FeaturesShowcase() {
  const { region, currency, preferEnglish } = useLocale();
  const config = useSiteConfig();
  const isIN = region === "IN" && !preferEnglish;
  const price = formatPersonalPrice(config, currency);

  return (
    <section id="features" className="py-14 sm:py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="section-label mb-3">Everything included</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            {isIN ? (
              <>
                Jo milta hai <span className="text-gold-light">{price}/month</span> me
              </>
            ) : (
              <>
                Everything in <span className="text-gold-light">{price}/month</span>
              </>
            )}
          </h2>
          <p className="text-ink-soft text-sm leading-relaxed">
            {isIN
              ? `Steps, water, sleep, bills, Soft Day, wins — sab ek jagah. ${dualPersonalPriceLabel(config)} worldwide.`
              : `Steps, water, sleep, bills, Soft Day, wins — in one place. ${dualPersonalPriceLabel(config)} worldwide.`}
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {FEATURES.map((f) => (
            <article
              key={f.titleEN}
              className="soft-card rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-gold/25 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold mb-3">
                <f.icon size={18} />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1.5">
                {isIN ? f.titleIN : f.titleEN}
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                {isIN ? f.bodyIN : f.bodyEN}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold min-h-[52px] w-full sm:w-auto max-w-sm"
          >
            {isIN
              ? `${config.marketing.trialDays}-day free trial — sab unlock`
              : `${config.marketing.trialDays}-day free trial — unlock all`}
          </Link>
          <p className="text-xs text-muted mt-3">
            {isIN
              ? "Aaj ₹0 · Cancel anytime · Soft Day + Pause included"
              : "$0 today · Cancel anytime · Soft Day + Pause included"}
          </p>
        </div>
      </div>
    </section>
  );
}
