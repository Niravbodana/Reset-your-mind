import { PricingSection } from "@/components/PricingSection";
import { FinalCTA } from "@/components/FinalCTA";
import { readSettings } from "@/lib/site-settings-server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await readSettings();
  const personal = settings.features.earlyBirdActive
    ? settings.marketing.earlyBirdPricePersonal
    : settings.marketing.launchPricePersonal;
  const parivaar = settings.features.earlyBirdActive
    ? settings.marketing.earlyBirdPriceParivaar
    : settings.marketing.launchPriceParivaar;
  return {
    title: "Pricing — RIZN",
    description: `Planned pricing: Personal ₹${personal}/month, Parivaar ₹${parivaar}/month. Early access web preview is free.`,
  };
}

export default function PricingPage() {
  return (
    <div className="pt-24 pb-20 md:pb-0">
      <div className="text-center px-4 mb-2 max-w-xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Pricing</h1>
        <p className="text-ink-soft">
          Planned rates for when subscriptions launch. Join the waitlist to preview on web at no cost.
        </p>
      </div>
      <PricingSection showTitle={false} />
      <FinalCTA />
    </div>
  );
}
