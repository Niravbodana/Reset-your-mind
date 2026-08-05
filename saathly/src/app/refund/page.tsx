import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy — RIZN" };

export default function RefundPage() {
  return (
    <div className="page-top pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-6">Refund & Cancellation</h1>
        <div className="space-y-4 text-ink-soft leading-relaxed text-[15px]">
          <p>
            <strong className="text-white">Preview (now):</strong> No charges during the free web
            preview. Joining the waitlist does not create a subscription.
          </p>
          <p>
            <strong className="text-white">When billing opens:</strong> Cancel anytime from Billing or
            by emailing hello@rizn.app. Access continues until the end of the paid period.
          </p>
          <p>
            <strong className="text-white">Free trial:</strong> If a card is collected, you will not be
            charged if you cancel before the trial ends (exact days shown at checkout).
          </p>
          <p>
            <strong className="text-white">Refunds:</strong> First paid month — case-by-case refund
            within 7 days of charge if the service was unused, at our discretion. Contact
            hello@rizn.app with your Razorpay payment ID.
          </p>
          <p>Parivaar seat changes mid-cycle do not automatically prorate unless stated at purchase.</p>
        </div>
      </article>
    </div>
  );
}
