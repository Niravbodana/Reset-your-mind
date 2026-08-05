import { Hero } from "@/components/Hero";
import { NotificationFlow } from "@/components/NotificationFlow";
import { AppComingSoon } from "@/components/AppComingSoon";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";
import { DayTimeline } from "@/components/DayTimeline";
import { Problems } from "@/components/Problems";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NotificationFlow />
      <AppComingSoon />
      <HowItWorksSimple />
      <DayTimeline />
      <Problems />
      <PricingSection />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
