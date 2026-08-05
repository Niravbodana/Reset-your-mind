"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PLANS } from "@/lib/plans";
import { RazorpayCheckout } from "@/components/RazorpayCheckout";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { parivaarMonthlyPrice, personalMonthlyPrice } from "@/lib/pricing";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function BillingPage() {
  const { state, activatePaid } = useApp();
  const { ready } = useRequireAuth();
  const config = useSiteConfig();
  const user = state.user;
  const plan = user
    ? PLANS[user.plan === "parivaar" ? "parivaar" : user.plan === "annual" ? "annual" : user.plan === "work" ? "work" : "personal"]
    : PLANS.personal;

  const displayPrice =
    user?.plan === "parivaar" ? parivaarMonthlyPrice(config) : personalMonthlyPrice(config);

  const paymentsLive = config.features.paymentsEnabled && Boolean(config.integrations.razorpayKeyId);

  if (!ready) {
    return <div className="pt-28 text-center text-muted">Loading…</div>;
  }

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Billing</h1>
        <p className="text-ink-soft text-sm mb-8">
          {paymentsLive
            ? `Pay securely with Razorpay. ${config.marketing.trialDays}-day trial applies on first charge when billing is fully live.`
            : "Paid subscriptions are not open yet. You are on the free web preview and waitlist — we will email you before any charge."}
        </p>

        <div className="soft-card rounded-2xl p-7 mb-6">
          <p className="text-xs text-muted mb-2 uppercase tracking-wide">Planned plan</p>
          <p className="font-display text-2xl font-bold">{plan.name}</p>
          <p className="text-3xl font-bold mt-2">
            ₹{displayPrice}
            <span className="text-sm text-muted font-normal">/mo target</span>
          </p>
          {user && (
            <p className="text-sm text-ink-soft mt-4">
              {user.email} ·{" "}
              {user.subStatus === "active"
                ? "Paid (this device)"
                : user.subStatus === "trial"
                  ? "Free preview / waitlist"
                  : user.subStatus}
            </p>
          )}

          {user && paymentsLive ? (
            <RazorpayCheckout
              planId={user.plan === "parivaar" ? "parivaar" : "personal"}
              email={user.email}
              name={user.name}
              onSuccess={activatePaid}
              className="btn-primary mt-6 w-full py-3 rounded-xl text-sm"
            >
              Pay ₹{displayPrice} — start {config.marketing.trialDays} day trial
            </RazorpayCheckout>
          ) : (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-ink-soft">
              <p className="font-semibold text-white mb-1">Billing coming soon</p>
              <p className="text-xs leading-relaxed">
                No card required during preview. When we open payments, you will get an email at{" "}
                {user?.email || "your signup address"} with clear trial terms.
              </p>
            </div>
          )}
        </div>

        <div className="soft-card rounded-2xl p-5 text-sm text-ink-soft">
          <p className="font-semibold text-white mb-2">Cancel anytime (when live)</p>
          <p className="text-xs leading-relaxed">
            Subscriptions will renew monthly until cancelled. See{" "}
            <Link href="/refund" className="text-gold-light underline">
              refund policy
            </Link>{" "}
            for trial and first-charge rules.
          </p>
        </div>

        {!user && (
          <Link href="/signup" className="btn-primary block text-center mt-6 py-3 rounded-xl text-sm">
            Join waitlist first
          </Link>
        )}
      </div>
    </div>
  );
}
