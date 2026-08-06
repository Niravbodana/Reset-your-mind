"use client";

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

/** Landing page — each section owns its scroll animations */
export function HomePageContent() {
  return (
    <>
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
