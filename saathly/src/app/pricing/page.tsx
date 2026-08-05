import { PricingSection } from "@/components/PricingSection";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata = {
  title: "Pricing — RIZN",
  description: "Planned pricing: Personal ₹99/month, Parivaar ₹249/month. Early access preview is free.",
};

export default function PricingPage() {
  return (
    <div className="pt-24">
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
