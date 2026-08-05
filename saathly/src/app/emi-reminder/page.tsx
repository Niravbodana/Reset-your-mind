import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EmiReminderDemo } from "@/components/EmiReminderDemo";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Bill & EMI Reminders — 1 day early | RIZN",
  description:
    "EMI/bill caring alert 1 din pehle — naam, amount, bank ke saath. ₹99/- plan me included. Made in India.",
  openGraph: {
    title: "Bill & EMI Reminders — RIZN",
    description: "1-day early supportive EMI/bill alerts + daily motivation. India · ₹99/-.",
  },
};

export default function EmiReminderLandingPage() {
  return (
    <div>
      <section className="page-top pb-10 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label mb-3">Bill & EMI Reminders · Demo</p>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Payment due soon?{" "}
            <span className="text-gold-light">1 day early, caring alert.</span>
          </h1>
          <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
            Name, amount, date, provider — set once. Get a supportive notification the day before.
            Kam tension, zyada control. Har plan me included — India ke liye.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link
              href="/signup"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold min-h-[48px]"
            >
              Start free — bills + messages (Demo)
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <EmiReminderDemo />
      <FinalCTA />
      <StickyMobileCTA />
    </div>
  );
}
