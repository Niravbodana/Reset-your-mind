import type { Metadata } from "next";

export const metadata: Metadata = { title: "Refund Policy — RIZN" };

export default function RefundPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <p className="section-label mb-3">Phase U</p>
        <h1 className="font-display text-4xl font-bold mb-6">Refund & Cancellation</h1>
        <div className="space-y-4 text-ink-soft leading-relaxed text-[15px]">
          <p>Cancel anytime from Billing. Access continues until period end.</p>
          <p>Free trial: no charge if cancelled before trial ends (when card collected).</p>
          <p>Paid month: refunds case-by-case within 7 days of first charge if unused — email hello@rizn.app.</p>
          <p>Parivaar seats removed do not auto-refund mid-cycle.</p>
        </div>
      </article>
    </div>
  );
}
