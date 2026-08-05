"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PLANS } from "@/lib/plans";
import { RazorpayCheckout } from "@/components/RazorpayCheckout";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function BillingPage() {
  const { state, activatePaid } = useApp();
  const config = useSiteConfig();
  const user = state.user;
  const plan = user
    ? PLANS[user.plan === "parivaar" ? "parivaar" : user.plan === "annual" ? "annual" : user.plan === "work" ? "work" : "personal"]
    : PLANS.personal;

  const displayPrice =
    user?.plan === "parivaar"
      ? config.features.earlyBirdActive
        ? config.marketing.earlyBirdPriceParivaar
        : config.marketing.launchPriceParivaar
      : config.features.earlyBirdActive
        ? config.marketing.earlyBirdPricePersonal
        : config.marketing.launchPricePersonal;

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Billing</h1>
        <p className="text-ink-soft text-sm mb-8">
          Razorpay keys Admin → Integrations se add karo. Enable payments in Features tab.
        </p>

        <div className="soft-card rounded-2xl p-7 mb-6">
          <p className="text-xs text-muted mb-2 uppercase tracking-wide">Plan</p>
          <p className="font-display text-2xl font-bold">{plan.name}</p>
          <p className="text-3xl font-bold mt-2">
            ₹{displayPrice}
            <span className="text-sm text-muted font-normal">/mo</span>
          </p>
          {user && (
            <p className="text-sm text-ink-soft mt-4">
              {user.email} · {user.subStatus === "trial" ? "Preview / trial" : user.subStatus}
            </p>
          )}

          {user && config.features.paymentsEnabled ? (
            <RazorpayCheckout
              planId={user.plan === "parivaar" ? "parivaar" : "personal"}
              email={user.email}
              name={user.name}
              onSuccess={activatePaid}
              className="btn-primary mt-6 w-full py-3 rounded-xl text-sm"
            >
              Pay ₹{displayPrice} — {config.marketing.trialDays} day trial
            </RazorpayCheckout>
          ) : (
            <button type="button" disabled className="btn-secondary mt-6 w-full py-3 rounded-xl text-sm opacity-60">
              Enable payments in Admin panel
            </button>
          )}
        </div>

        <div className="soft-card rounded-2xl p-5 text-sm text-ink-soft">
          <p className="font-semibold text-white mb-2">Admin setup</p>
          <ol className="list-decimal pl-5 space-y-1 text-xs">
            <li>/admin → Integrations → Razorpay Key ID + Secret</li>
            <li>Features → Enable Razorpay payments</li>
            <li>Webhook: {config.marketing.siteUrl}/api/billing/webhook</li>
          </ol>
          <Link href="/admin" className="text-gold-light inline-block mt-4 text-xs">
            Open admin →
          </Link>
        </div>
      </div>
    </div>
  );
}
