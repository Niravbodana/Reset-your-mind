"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PLANS } from "@/lib/plans";

export default function BillingPage() {
  const { state } = useApp();
  const user = state.user;
  const plan = user
    ? PLANS[user.plan === "parivaar" ? "parivaar" : user.plan === "annual" ? "annual" : user.plan === "work" ? "work" : "personal"]
    : PLANS.personal;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Billing</h1>
        <p className="text-ink-soft text-sm mb-8">
          Subscriptions are not open yet. You are on the early-access waitlist.
        </p>

        <div className="soft-card rounded-2xl p-7 mb-6">
          <p className="text-xs text-muted mb-2 uppercase tracking-wide">Selected plan interest</p>
          <p className="font-display text-2xl font-bold">{plan.name}</p>
          <p className="text-3xl font-bold mt-2">
            ₹{plan.price}
            <span className="text-sm text-muted font-normal">/month at launch</span>
          </p>
          {user && (
            <p className="text-sm text-ink-soft mt-4">
              Account: {user.email}
              <br />
              Status: {user.subStatus === "trial" ? "Early access preview" : user.subStatus}
            </p>
          )}
          <button type="button" disabled className="btn-secondary mt-6 w-full py-3 rounded-xl text-sm opacity-60 cursor-not-allowed">
            Payments open at launch
          </button>
        </div>

        <div className="soft-card rounded-2xl p-5 text-sm text-ink-soft">
          <p className="font-semibold text-white mb-2">What happens next</p>
          <ul className="space-y-2 list-disc pl-5">
            <li>We will email you before any charge</li>
            <li>Razorpay for UPI, cards, and wallets</li>
            <li>Cancel anytime from your account</li>
          </ul>
          <Link href="/pricing" className="text-gold-light inline-block mt-4">
            View pricing →
          </Link>
        </div>
      </div>
    </div>
  );
}
