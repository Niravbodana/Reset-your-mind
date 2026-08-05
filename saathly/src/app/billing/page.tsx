"use client";

import Link from "next/link";
import { Check, CreditCard, Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PLANS, isTrialActive } from "@/lib/plans";
import { RazorpayCheckout } from "@/components/RazorpayCheckout";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { personalMonthlyPrice, parivaarMonthlyPrice } from "@/lib/pricing";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { UpiPayPreview } from "@/components/UpiPayPreview";

export default function BillingPage() {
  const { state, startTrialAutopay, trackEvent } = useApp();
  const { ready } = useRequireAuth();
  const config = useSiteConfig();
  const user = state.user;
  const trialDays = config.marketing.trialDays || 7;

  const plan = user
    ? PLANS[
        user.plan === "parivaar"
          ? "parivaar"
          : user.plan === "annual"
            ? "annual"
            : user.plan === "work"
              ? "work"
              : "personal"
      ]
    : PLANS.personal;

  const displayPrice =
    user?.plan === "parivaar" ? parivaarMonthlyPrice(config) : personalMonthlyPrice(config);

  const paymentsLive = config.features.paymentsEnabled && Boolean(config.integrations.razorpayKeyId);
  const trialLive = user?.trialEndsAt ? isTrialActive(user.trialEndsAt) : false;
  const trialEndLabel = user?.trialEndsAt
    ? new Date(user.trialEndsAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  if (!ready) {
    return <div className="page-top text-center text-muted px-4">Loading…</div>;
  }

  return (
    <div className="page-top pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-white">
          Free trial + Autopay
        </h1>
        <p className="text-ink-soft text-sm mb-8 leading-relaxed">
          Pehle <strong className="text-white">{trialDays} din free</strong>. Phir har mahine{" "}
          <strong className="text-gold-light">₹{displayPrice}</strong> bank/UPI se automatic cut —
          jab tak aap cancel na karo.
        </p>

        <div className="premium-card rounded-2xl p-6 sm:p-7 mb-6 border border-gold/25">
          <p className="text-xs text-muted mb-2 uppercase tracking-wide">Your plan</p>
          <p className="font-display text-2xl font-bold text-white">{plan.name}</p>
          <p className="text-3xl font-bold mt-2 text-white">
            ₹{displayPrice}
            <span className="text-sm text-muted font-normal">/month after trial</span>
          </p>

          <ul className="mt-5 space-y-2.5">
            {[
              `Day 1–${trialDays}: ₹0 — poora access free`,
              `Day ${trialDays + 1}: pehla ₹${displayPrice} autopay`,
              `Har mahine: ₹${displayPrice} automatic (UPI / card / netbanking)`,
              "Cancel anytime — next cycle se charge ruk jayega",
            ].map((t) => (
              <li key={t} className="flex gap-2 text-sm text-ink-soft">
                <Check size={16} className="text-success shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>

          {user && (
            <div className="mt-5 rounded-xl bg-black/40 border border-white/10 p-4 text-sm">
              <p className="text-white font-medium">{user.email}</p>
              <p className="text-xs text-ink-soft mt-1">
                Status:{" "}
                {user.autopayEnabled
                  ? trialLive
                    ? `Free trial active · Autopay set · pehla charge ${trialEndLabel}`
                    : user.subStatus === "active"
                      ? "Autopay active — monthly ₹" + (user.autopayAmount || displayPrice)
                      : user.subStatus
                  : user.subStatus === "trial"
                    ? "Trial (autopay mandate pending)"
                    : user.subStatus}
              </p>
              {user.razorpaySubscriptionId && (
                <p className="text-[11px] text-muted mt-2 font-mono break-all">
                  Sub: {user.razorpaySubscriptionId}
                </p>
              )}
            </div>
          )}

          {user && !user.autopayEnabled ? (
            <RazorpayCheckout
              planId={user.plan === "parivaar" ? "parivaar" : "personal"}
              email={user.email}
              name={user.name}
              phone={user.phone}
              onSuccess={(meta) => {
                startTrialAutopay(meta);
                trackEvent("trial_autopay_started", meta.demo ? "demo" : "live");
              }}
              className="btn-primary mt-6 w-full py-3.5 rounded-xl text-sm font-bold min-h-[52px]"
            >
              Start {trialDays}-day free trial — Autopay set karo
            </RazorpayCheckout>
          ) : user?.autopayEnabled ? (
            <div className="mt-6 rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-ink-soft">
              <p className="font-semibold text-success mb-1 flex items-center gap-2">
                <Shield size={16} /> Autopay ready
              </p>
              <p className="text-xs leading-relaxed">
                {trialLive
                  ? `${trialEndLabel} ke baad ₹${user.autopayAmount || displayPrice} auto-cut hoga. Usse pehle ₹0.`
                  : `Monthly ₹${user.autopayAmount || displayPrice} autopay active hai.`}
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-ink-soft">
              <p className="font-semibold text-white mb-1">Login / signup pehle</p>
              <p className="text-xs leading-relaxed">
                Account banao, phir yahan se {trialDays}-day free trial + autopay mandate set karo.
              </p>
            </div>
          )}

          {!paymentsLive && (
            <p className="mt-3 text-xs text-gold-light leading-relaxed flex gap-2">
              <CreditCard size={14} className="shrink-0 mt-0.5" />
              Razorpay abhi demo/local mode me hai. Admin me keys + &quot;Payments enabled&quot; on
              karo — tab real UPI/card mandate open hoga.
            </p>
          )}
        </div>

        <UpiPayPreview className="mb-6" />

        <div className="soft-card rounded-2xl p-5 text-sm text-ink-soft">
          <p className="font-semibold text-white mb-2">Kaise kaam karta hai?</p>
          <ol className="text-xs leading-relaxed space-y-2 list-decimal pl-4">
            <li>Aap UPI/card se <strong className="text-white">mandate authorize</strong> karte ho (aaj ₹0).</li>
            <li>{trialDays} din tak poora RIZN free use.</li>
            <li>
              Din {trialDays + 1} pe bank se <strong className="text-gold-light">₹{displayPrice}</strong>{" "}
              automatic cut — phir har mahine.
            </li>
            <li>Cancel anytime from support / Razorpay customer portal when live.</li>
          </ol>
          <p className="text-xs mt-4">
            Details:{" "}
            <Link href="/refund" className="text-gold-light underline">
              refund & trial policy
            </Link>
          </p>
        </div>

        {!user && (
          <Link
            href="/signup"
            className="btn-primary block text-center mt-6 py-3.5 rounded-xl text-sm font-bold min-h-[52px]"
          >
            Pehle account banao — free trial
          </Link>
        )}
      </div>
    </div>
  );
}
