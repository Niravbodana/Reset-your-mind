import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EmiReminderDemo } from "@/components/EmiReminderDemo";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "EMI Reminder 1 din pehle — RIZN",
  description:
    "EMI date miss mat karo. RIZN 1 din pehle naam, amount, bank ke saath caring alert bhejta hai. ₹99 plan me included.",
  openGraph: {
    title: "EMI Reminder — RIZN",
    description: "1 din pehle supportive EMI alert. Daily motivation + EMI. ₹99/month.",
  },
};

export default function EmiReminderLandingPage() {
  return (
    <div>
      <section className="page-top pb-10 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label mb-3">EMI Reminder</p>
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            EMI yaad dilana? <span className="text-gold-light">1 din pehle, caring alert.</span>
          </h1>
          <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
            Naam, amount, date, bank/NBFC — set karo. Kal EMI hai to aaj supportive notification.
            Tension kam, confidence zyada. ₹99 plan me free included.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link
              href="/signup"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold min-h-[48px]"
            >
              ₹99 plan — EMI + messages
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
