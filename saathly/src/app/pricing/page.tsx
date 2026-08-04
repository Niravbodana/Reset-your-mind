import { PricingSection } from "@/components/PricingSection";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata = {
  title: "Plans — Humsafar",
  description: "Personal ₹99/month ya Parivaar ₹249/month. 7 din free.",
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      <div className="text-center px-4 mb-2">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-ink mb-3">
          Plans
        </h1>
        <p className="text-ink-soft">Do options. Clear price. Free trial pehle.</p>
      </div>
      <PricingSection showTitle={false} />
      <FinalCTA />
    </div>
  );
}
