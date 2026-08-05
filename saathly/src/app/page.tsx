import { Hero } from "@/components/Hero";
import { HopeTransformation } from "@/components/HopeTransformation";
import { EmiReminderDemo } from "@/components/EmiReminderDemo";
import { ValueComparison } from "@/components/ValueComparison";
import { NotificationFlow } from "@/components/NotificationFlow";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";
import { Problems } from "@/components/Problems";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";

export default function HomePage() {
  return (
    <div className="has-mobile-cta">
      <Hero />
      <HopeTransformation />
      <EmiReminderDemo />
      <ValueComparison />
      <NotificationFlow />
      <HowItWorksSimple />
      <Problems />
      <PricingSection />
      <FaqSection />
      <FinalCTA />
      <StickyMobileCTA />
    </div>
  );
}
