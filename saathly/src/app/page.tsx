import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { PressTrustBar } from "@/components/PressTrustBar";
import { TransformationSection } from "@/components/TransformationSection";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";
import { DayTimeline } from "@/components/DayTimeline";
import { Problems } from "@/components/Problems";
import { PeopleGallery } from "@/components/PeopleGallery";
import { TrustStories } from "@/components/TrustStories";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <PressTrustBar />
      <TransformationSection />
      <HowItWorksSimple />
      <DayTimeline />
      <Problems />
      <PeopleGallery />
      <TrustStories />
      <PricingSection />
      <FaqSection />
      <FinalCTA />
    </>
  );
}
