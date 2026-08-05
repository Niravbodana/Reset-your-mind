import { Hero } from "@/components/Hero";
import { ValueComparison } from "@/components/ValueComparison";
import { NotificationFlow } from "@/components/NotificationFlow";
import { WhatsAppPreview } from "@/components/WhatsAppPreview";
import { AppComingSoon } from "@/components/AppComingSoon";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";
import { DayTimeline } from "@/components/DayTimeline";
import { Problems } from "@/components/Problems";
import { ParivaarPlanVisual } from "@/components/ParivaarPlanVisual";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { HeroVideo } from "@/components/HeroVideo";

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0">
      <Hero />
      <ValueComparison />
      <section className="py-16 border-y border-white/5 bg-bg-elevated/30">
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-label mb-3">Product demo</p>
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Phone pe aisa dikhega
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              Ye preview hai — app launch pe push notifications ke saath same experience milega.
              Neeche sample messages aur live naam demo try karo.
            </p>
          </div>
          <HeroVideo />
        </div>
      </section>
      <NotificationFlow />
      <WhatsAppPreview />
      <AppComingSoon />
      <HowItWorksSimple />
      <DayTimeline />
      <Problems />
      <ParivaarPlanVisual />
      <PricingSection />
      <FaqSection />
      <FinalCTA />
      <StickyMobileCTA />
    </div>
  );
}
