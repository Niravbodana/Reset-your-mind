"use client";

import { FaqList } from "./FaqList";
import { ScrollReveal } from "./ScrollReveal";

export function FaqSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6 page-pad">
        <ScrollReveal variant="blur-up" className="text-center mb-8 sm:mb-10">
          <p className="section-label mb-3">FAQ</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Common questions
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade" delay={0.06}>
          <FaqList />
        </ScrollReveal>
      </div>
    </section>
  );
}
