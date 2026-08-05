import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Privacy Policy — RIZN" };

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" phase="U">
      <p>RIZN (“we”) collects account data (name, email), goals, mood check-ins, and usage events to personalize pulses.</p>
      <p>We do not sell personal data. Payments go through Razorpay. WhatsApp delivery uses Meta Cloud API when enabled.</p>
      <p>You may request account deletion from settings / email hello@rizn.app. Data retained only as required by law.</p>
      <p>Not for children under 13. Demo mode stores data in your browser localStorage only.</p>
    </LegalShell>
  );
}

function LegalShell({ title, phase, children }: { title: string; phase: string; children: ReactNode }) {
  return (
    <div className="pt-28 pb-20 px-4">
      <article className="max-w-2xl mx-auto prose-invert">
        <p className="section-label mb-3">Phase {phase}</p>
        <h1 className="font-display text-4xl font-bold mb-6">{title}</h1>
        <div className="space-y-4 text-ink-soft leading-relaxed text-[15px]">{children}</div>
      </article>
    </div>
  );
}
