import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { HopeTransformation } from "@/components/HopeTransformation";
import { EmiReminderDemo } from "@/components/EmiReminderDemo";
import { ValueComparison } from "@/components/ValueComparison";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { NotificationFlow } from "@/components/NotificationFlow";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";
import { Problems } from "@/components/Problems";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { NoSpamPromise } from "@/components/NoSpamPromise";
import { OurVision } from "@/components/OurVision";

export default function HomePage() {
  return (
    <>
      <Hero />
      <OurVision />
      <section className="py-8 px-4 border-b border-white/5">
        <div className="mx-auto max-w-xl">
          <NoSpamPromise />
        </div>
      </section>
      <SocialProof />
      <FeaturesShowcase />
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
    </>
  );
}
