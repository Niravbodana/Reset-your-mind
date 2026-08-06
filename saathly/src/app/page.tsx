import { Hero } from "@/components/Hero";
import { OurVision } from "@/components/OurVision";
import { SocialProof } from "@/components/SocialProof";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { MotivationTransformation } from "@/components/MotivationTransformation";
import { NotificationFlow } from "@/components/NotificationFlow";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { LandingJsonLd } from "@/components/LandingJsonLd";

export default function HomePage() {
  return (
    <>
      <LandingJsonLd />
      <Hero />
      <SocialProof />
      <OurVision />
      <FeaturesShowcase />
      <MotivationTransformation />
      <NotificationFlow />
      <PricingSection />
      <FaqSection />
      <FinalCTA />
      <StickyMobileCTA />
    </>
  );
}
