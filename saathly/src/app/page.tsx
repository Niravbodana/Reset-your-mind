import { Hero } from "@/components/Hero";
import { Problems } from "@/components/Problems";
import { DayTimeline } from "@/components/DayTimeline";
import { TrustStories } from "@/components/TrustStories";
import { PricingSection } from "@/components/PricingSection";
import { FinalCTA } from "@/components/FinalCTA";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <DayTimeline />
      <HowItWorksSimple />
      <TrustStories />
      <PricingSection />
      <FinalCTA />
    </>
  );
}
