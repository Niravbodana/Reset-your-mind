import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Privacy Policy — RIZN" };

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>RIZN collects account data (name, email), goals, mood check-ins, and usage events to personalize messages.</p>
      <p>We do not sell personal data. Payments will be processed through Razorpay. WhatsApp delivery may use Meta&apos;s Cloud API when enabled.</p>
      <p>You may request account deletion by emailing hello@rizn.app. Data is retained only as required by law.</p>
      <p>Not intended for children under 13. During early access, preview data is stored in your browser only.</p>
    </LegalShell>
  );
}

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="pt-28 pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-6">{title}</h1>
        <div className="space-y-4 text-ink-soft leading-relaxed text-[15px]">{children}</div>
      </article>
    </div>
  );
}
