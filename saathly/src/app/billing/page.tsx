"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PLANS } from "@/lib/plans";

export default function BillingPage() {
  const { state, activatePaid, trackEvent } = useApp();
  const user = state.user;
  const plan = user ? PLANS[user.plan === "parivaar" ? "parivaar" : user.plan === "annual" ? "annual" : user.plan === "work" ? "work" : "personal"] : PLANS.personal;

  const payDemo = async () => {
    trackEvent("checkout_start", plan.id);
    // Production: call /api/billing/create-subscription with Razorpay keys
    const res = await fetch("/api/billing/create-subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: plan.id, email: user?.email, name: user?.name }),
    });
    const data = await res.json();
    if (data.demo) {
      activatePaid();
      trackEvent("checkout_demo_success", plan.id);
      alert(data.message);
    }
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Billing</h1>
        <p className="text-ink-soft text-sm mb-8">Phase M — Razorpay ready (demo fallback).</p>

        <div className="soft-card rounded-3xl p-7 mb-6">
          <p className="text-xs text-laser-2 mb-2">CURRENT PLAN</p>
          <p className="font-display text-2xl font-bold">{plan.name}</p>
          <p className="text-3xl font-bold mt-2">
            ₹{plan.price}<span className="text-sm text-muted font-normal">/mo</span>
          </p>
          <p className="text-sm text-ink-soft mt-2">Status: {user?.subStatus || "guest"}</p>
          <button type="button" onClick={payDemo} className="btn-primary mt-6 w-full py-3 rounded-xl text-sm">
            Pay / Activate (demo)
          </button>
        </div>

        <div className="soft-card rounded-2xl p-5 text-sm text-ink-soft space-y-2">
          <p>Production setup:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Razorpay account + subscription plans</li>
            <li>Env keys in `.env.local`</li>
            <li>Webhook → `/api/billing/webhook`</li>
          </ol>
          <Link href="/pricing" className="text-laser-2 inline-block mt-2">View all plans →</Link>
        </div>
      </div>
    </div>
  );
}
