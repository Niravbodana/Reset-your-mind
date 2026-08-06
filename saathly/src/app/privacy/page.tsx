import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Privacy Policy — RIZN" };

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p>
        <strong className="text-white">Operator:</strong> RIZN (hello@rizn.app). This policy covers
        the website preview and waitlist.
      </p>
      <p>
        <strong className="text-white">What we collect:</strong> Waitlist signups (name, email, plan,
        focus areas, language) are stored on our server so we can notify you at launch. Preview usage
        (messages read, mood, streak, family seat list) is stored in your browser on this device until
        cloud accounts ship.
      </p>
      <p>
        <strong className="text-white">Payments:</strong> When billing opens, payments will be
        processed by Razorpay. We do not store full card numbers.
      </p>
      <p>
        <strong className="text-white">WhatsApp:</strong> If you opt in on Parivaar at launch,
        delivery may use Meta&apos;s Cloud API under their terms.
      </p>
      <p>We do not sell personal data. We use data to personalize messages and operate the service.</p>
      <p>
        <strong className="text-white">Your rights (India):</strong> You may request access, correction,
        or deletion by emailing hello@rizn.app. We respond within reasonable time as per applicable law.
      </p>
      <p>
        <strong className="text-white">Grievance:</strong> For privacy concerns, email hello@rizn.app
        with subject &quot;Privacy grievance&quot;.
      </p>
      <p>Not intended for children under 13 without parental consent.</p>
    </LegalShell>
  );
}

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="page-top pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-6">{title}</h1>
        <div className="space-y-4 text-ink-soft leading-relaxed text-[15px]">{children}</div>
      </article>
    </div>
  );
}
