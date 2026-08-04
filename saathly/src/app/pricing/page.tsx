import { PricingSection } from "@/components/PricingSection";
import { FinalCTA } from "@/components/FinalCTA";

export const metadata = {
  title: "Plans & Pricing — Saathly",
  description: "Saath Plan ₹99/month ya Parivaar Plan ₹249/month. 7 din free trial.",
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      <div className="text-center px-4 mb-4">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Choose your <span className="gradient-gold">plan</span>
        </h1>
        <p className="text-muted max-w-lg mx-auto">
          Do hi plans — simple aur affordable. 7 din bilkul free try karo.
        </p>
      </div>
      <PricingSection showTitle={false} />
      <FinalCTA />
    </div>
  );
}
