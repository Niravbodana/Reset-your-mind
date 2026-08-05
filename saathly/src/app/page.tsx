import { Hero } from "@/components/Hero";
import { HopeTransformation } from "@/components/HopeTransformation";
import { EmiReminderDemo } from "@/components/EmiReminderDemo";
import { ValueComparison } from "@/components/ValueComparison";
import { NotificationFlow } from "@/components/NotificationFlow";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";
import { DayTimeline } from "@/components/DayTimeline";
import { Problems } from "@/components/Problems";
import { PricingSection } from "@/components/PricingSection";
import { FaqSection } from "@/components/FaqSection";
import { FinalCTA } from "@/components/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { IPhoneNotificationDemo } from "@/components/IPhoneNotificationDemo";
import { AppComingSoon } from "@/components/AppComingSoon";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <div className="pb-20 md:pb-0">
      <Hero />
      <HopeTransformation />
      <EmiReminderDemo />
      <ValueComparison />
      <section className="py-20 md:py-28 border-y border-white/5 bg-bg-elevated/30 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="section-label mb-3">Trust on screen</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              iPhone pe aise notifications — naam, value, timing
            </h2>
            <p className="text-ink-soft text-sm md:text-base leading-relaxed mb-6">
              EMI reminder, subah ka motivation, paisa ka nudge — sab tumhare naam pe, tumhari timing pe.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.12}>
            <IPhoneNotificationDemo />
          </ScrollReveal>
        </div>
      </section>
      <NotificationFlow />
      <HowItWorksSimple />
      <DayTimeline />
      <Problems />
      <AppComingSoon />
      <PricingSection />
      <FaqSection />
      <FinalCTA />
      <StickyMobileCTA />
    </div>
  );
}
