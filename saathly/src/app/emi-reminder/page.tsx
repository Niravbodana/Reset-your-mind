import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EmiReminderDemo } from "@/components/EmiReminderDemo";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Bill & EMI Reminders — 1 day early | RIZN",
  description:
    "Never miss a bill or EMI. RIZN sends a caring alert 1 day early with your name, amount, and provider. From ₹99 / $2.99 — available worldwide.",
  openGraph: {
    title: "Bill & EMI Reminders — RIZN",
    description: "1-day early supportive bill alerts + daily motivation. Worldwide. From ₹99 / $2.99.",
  },
};

export default function EmiReminderLandingPage() {
  return (
    <div>
      <section className="page-top pb-10 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label mb-3">Bill & EMI Reminders</p>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            Never miss a payment.{" "}
            <span className="text-gold-light">1 day early, caring alert.</span>
          </h1>
          <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
            Name, amount, date, provider — set once. Get a supportive notification the day before.
            Less stress, more control. Included in every plan — India to worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link
              href="/signup"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold min-h-[48px]"
            >
              Start free — bills + messages
              <ArrowRight size={16} />
            </Link>
            <WhatsAppCTA />
          </div>
        </div>
      </section>
      <EmiReminderDemo />
      <FinalCTA />
      <StickyMobileCTA />
    </div>
  );
}
