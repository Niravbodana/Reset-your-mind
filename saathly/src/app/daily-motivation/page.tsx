import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { HopeTransformation } from "@/components/HopeTransformation";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { NoSpamPromise } from "@/components/NoSpamPromise";
import { getMessageBankStats } from "@/lib/message-bank";

const COUNT = getMessageBankStats().total;

export const metadata: Metadata = {
  title: "Daily Motivation Messages — naam ke saath | RIZN",
  description: `${COUNT}+ unique daily motivation messages in Hinglish, Hindi, English — personalized with your name. ₹99/month + EMI reminders.`,
  openGraph: {
    title: "Daily Motivation — RIZN",
    description: "Roz tumhare naam pe messages. Chhote steps, badi hope. ₹99.",
  },
};

export default function DailyMotivationLandingPage() {
  return (
    <div>
      <Hero />
      <section className="py-10 px-4">
        <div className="mx-auto max-w-xl">
          <NoSpamPromise />
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup"
              className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold min-h-[48px] flex-1"
            >
              Free start — ₹99 plan
              <ArrowRight size={16} />
            </Link>
            <WhatsAppCTA className="flex-1" />
          </div>
        </div>
      </section>
      <SocialProof />
      <HopeTransformation />
      <StickyMobileCTA />
    </div>
  );
}
