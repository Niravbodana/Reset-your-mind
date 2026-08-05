import { PricingSection } from "@/components/PricingSection";
import { FinalCTA } from "@/components/FinalCTA";
import { readSettings } from "@/lib/site-settings-server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await readSettings();
  const personal = settings.features.earlyBirdActive
    ? settings.marketing.earlyBirdPricePersonal
    : settings.marketing.launchPricePersonal;
  return {
    title: "₹99 Plan — RIZN",
    description: `RIZN Personal ₹${personal}/month — daily messages + EMI reminders. Start free today.`,
  };
}

export default function PricingPage() {
  return (
    <div className="pt-24 pb-20 md:pb-0">
      <div className="text-center px-4 mb-2 max-w-xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">₹99 Life Change Plan</h1>
        <p className="text-ink-soft">
          Messages + EMI reminders — sab included. Start free, no payment.
        </p>
      </div>
      <PricingSection showTitle={false} />
      <FinalCTA />
    </div>
  );
}
