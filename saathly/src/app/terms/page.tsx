import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — RIZN" };

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-4 text-ink-soft leading-relaxed text-[15px]">
          <p>
            RIZN provides personalized motivational messages and habit tools. It is{" "}
            <strong className="text-white">not medical care, therapy, or emergency support</strong>.
            For crisis, contact iCall 9152987821 or Vandrevala 9999666555.
          </p>
          <p>
            <strong className="text-white">Preview:</strong> The web preview is free and may change.
            Data may be stored in your browser; waitlist email is stored on our servers.
          </p>
          <p>
            <strong className="text-white">Subscriptions (when live):</strong> Paid plans renew monthly
            until cancelled. Trial terms shown at checkout. Prices may change for new subscribers;
            early bird pricing applies only while offered at signup.
          </p>
          <p>Do not misuse the service (spam, harassment, illegal content). We may suspend abusive accounts.</p>
          <p>Content is for personal use. Do not resell or redistribute message libraries commercially.</p>
          <p>Service provided &quot;as is&quot; during early access. Liability is limited to fees paid in the prior month when billing is live.</p>
          <p>Governing law: India. Disputes: courts at operator&apos;s principal place of business unless otherwise required by law.</p>
          <p>Contact: hello@rizn.app</p>
        </div>
      </article>
    </div>
  );
}
