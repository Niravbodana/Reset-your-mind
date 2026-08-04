import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { HowItWorks } from "@/components/HowItWorks";
import { LifeAreas } from "@/components/LifeAreas";
import { Testimonials } from "@/components/Testimonials";
import { PricingSection } from "@/components/PricingSection";
import { ReferralSection } from "@/components/ReferralSection";
import { FinalCTA } from "@/components/FinalCTA";
import { DailySchedule } from "@/components/DailySchedule";
import { PremiumShowcase } from "@/components/PremiumShowcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <DailySchedule />
      <PremiumShowcase />
      <HowItWorks />
      <LifeAreas />
      <Testimonials />
      <PricingSection />
      <ReferralSection />
      <FinalCTA />
    </>
  );
}
