"use client";

import Link from "next/link";
import { Check, CreditCard, Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PLANS, isTrialActive } from "@/lib/plans";
import { RazorpayCheckout } from "@/components/RazorpayCheckout";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { personalMonthlyPrice, parivaarMonthlyPrice } from "@/lib/pricing";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useLocale } from "@/context/LocaleContext";
import { formatMoney } from "@/lib/locale";
import { UpiPayPreview } from "@/components/UpiPayPreview";
import { RegionSwitch } from "@/components/RegionSwitch";
import { PausePlanCard } from "@/components/PausePlanCard";

export default function BillingPage() {
  const { state, startTrialAutopay, trackEvent } = useApp();
  const { ready } = useRequireAuth();
  const config = useSiteConfig();
  const { currency, region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
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
    user?.plan === "parivaar"
      ? parivaarMonthlyPrice(config, currency)
      : personalMonthlyPrice(config, currency);
  const displayPriceLabel =
    currency === "INR" ? `₹${displayPrice}/-` : formatMoney(displayPrice, currency);
  const zeroLabel = formatMoney(0, currency);

  const paymentsLive = config.features.paymentsEnabled && Boolean(config.integrations.razorpayKeyId);
  const hostedPayLink =
    user?.plan === "parivaar"
      ? config.integrations.paymentLinkParivaar
      : config.integrations.paymentLinkPersonal;
  const trialLive = user?.trialEndsAt ? isTrialActive(user.trialEndsAt) : false;
  const trialEndLabel = user?.trialEndsAt
    ? new Date(user.trialEndsAt).toLocaleDateString(isIN ? "en-IN" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  const bullets = isIN
    ? [
        `Day 1–${trialDays}: ${zeroLabel} — poora access free`,
        `Day ${trialDays + 1}: pehla ${displayPriceLabel} autopay`,
        `Har mahine: ${displayPriceLabel} automatic (UPI / card / netbanking)`,
        "Cancel anytime — next cycle se charge ruk jayega",
      ]
    : [
        `Day 1–${trialDays}: ${zeroLabel} — full access free`,
        `Day ${trialDays + 1}: first ${displayPriceLabel} autopay`,
        `Every month: ${displayPriceLabel} automatic (card / wallet)`,
        "Cancel anytime — billing stops on the next cycle",
      ];

  if (!ready) {
    return <div className="page-top text-center text-muted px-4">Loading…</div>;
  }

  if (!user) {
    return (
      <div className="page-top text-center px-4">
        <p className="text-muted text-sm mb-4">
          {preferEnglish ? "Sign in to continue…" : "Continue ke liye sign in karo…"}
        </p>
        <Link href="/signup" className="text-gold-light text-sm font-semibold underline">
          {preferEnglish ? "Create account" : "Account banao"}
        </Link>
      </div>
    );
  }

  return (
    <div className="page-top pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-4">
          <RegionSwitch />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-white">
          Free trial + Autopay
        </h1>
        <p className="text-ink-soft text-sm mb-8 leading-relaxed">
          {isIN ? (
            <>
              Pehle <strong className="text-white">{trialDays} din free</strong>. Phir har mahine{" "}
              <strong className="text-gold-light">
                {currency === "INR" ? `₹${displayPrice}/-` : displayPriceLabel}
              </strong>{" "}
              bank/UPI se automatic — jab tak cancel na karo.
            </>
          ) : (
            <>
              First <strong className="text-white">{trialDays} days free</strong>. Then{" "}
              <strong className="text-gold-light">{displayPriceLabel}/month</strong> autopay. Cancel
              anytime.
            </>
          )}
        </p>

        <div className="premium-card rounded-2xl p-6 sm:p-7 mb-6 border border-gold/25">
          <p className="text-xs text-muted mb-2 uppercase tracking-wide">Your plan</p>
          <p className="font-display text-2xl font-bold text-white">{plan.name}</p>
          <p className="text-3xl font-bold mt-2 text-white">
            {displayPriceLabel}
            <span className="text-sm text-muted font-normal">/month after trial</span>
          </p>

          <ul className="mt-5 space-y-2.5">
            {bullets.map((t) => (
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
                    ? isIN
                      ? `Free trial active · Autopay set · pehla charge ${trialEndLabel}`
                      : `Free trial active · Autopay set · first charge ${trialEndLabel}`
                    : user.subStatus === "active"
                      ? isIN
                        ? `Autopay active — monthly ${formatMoney(user.autopayAmount || displayPrice, currency)}`
                        : `Autopay active — ${formatMoney(user.autopayAmount || displayPrice, currency)}/month`
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
              {paymentsLive
                ? isIN
                  ? `Start ${trialDays}-day free trial — Autopay set karo`
                  : `Start ${trialDays}-day free trial — set autopay`
                : preferEnglish
                  ? `Start ${trialDays}-day free trial (Demo)`
                  : `${trialDays}-day free trial shuru (Demo)`}
            </RazorpayCheckout>
          ) : user?.autopayEnabled ? (
            <div className="mt-6 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-ink-soft">
              <p className="font-semibold text-gold-light mb-1 flex items-center gap-2">
                <Shield size={16} />{" "}
                {user.razorpaySubscriptionId
                  ? "Autopay ready"
                  : preferEnglish
                    ? "Demo autopay preview"
                    : "Demo autopay preview"}
              </p>
              <p className="text-xs leading-relaxed">
                {!user.razorpaySubscriptionId
                  ? preferEnglish
                    ? `No real payment collected. Demo trial until ${trialEndLabel || "trial end"}. Live when Admin adds payment links.`
                    : `Real payment nahi hua. Demo trial ${trialEndLabel || "trial end"} tak. Admin payment links add kare tab live.`
                  : trialLive
                    ? isIN
                      ? `${trialEndLabel} ke baad ${formatMoney(user.autopayAmount || displayPrice, currency)} auto-cut hoga. Usse pehle ${zeroLabel}.`
                      : `After ${trialEndLabel}, ${formatMoney(user.autopayAmount || displayPrice, currency)} autopay starts. Until then ${zeroLabel}.`
                    : isIN
                      ? `Monthly ${formatMoney(user.autopayAmount || displayPrice, currency)} autopay active hai.`
                      : `${formatMoney(user.autopayAmount || displayPrice, currency)}/month autopay is active.`}
              </p>
            </div>
          ) : (
            <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-ink-soft">
              <p className="font-semibold text-white mb-1">
                {isIN ? "Login / signup pehle" : "Sign in or create an account first"}
              </p>
              <p className="text-xs leading-relaxed">
                {isIN
                  ? `Account banao, phir yahan se ${trialDays}-day free trial + autopay mandate set karo.`
                  : `Create your account, then set your ${trialDays}-day free trial + autopay here.`}
              </p>
            </div>
          )}

          {!paymentsLive && (
            <p className="mt-3 text-xs text-gold-light leading-relaxed flex gap-2">
              <CreditCard size={14} className="shrink-0 mt-0.5" />
              {isIN
                ? 'Razorpay abhi demo/local mode me hai. Admin me keys + "Payments enabled" on karo — tab real UPI/card mandate open hoga.'
                : "Payments are in demo mode. Add Razorpay International (or Stripe) keys in Admin to go live worldwide."}
            </p>
          )}

          {hostedPayLink ? (
            <a
              href={hostedPayLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3.5 text-sm font-bold text-gold-light min-h-[48px] hover:bg-gold/15"
            >
              {preferEnglish ? "Open hosted payment link" : "Payment link kholo"}
              <CreditCard size={16} />
            </a>
          ) : null}
        </div>

        <UpiPayPreview className="mb-6" />
        {user && <PausePlanCard />}

        <div className="soft-card rounded-2xl p-5 text-sm text-ink-soft">
          <p className="font-semibold text-white mb-2">
            {isIN ? "Kaise kaam karta hai?" : "How it works"}
          </p>
          <ol className="text-xs leading-relaxed space-y-2 list-decimal pl-4">
            {isIN ? (
              <>
                <li>
                  Aap UPI/card se <strong className="text-white">mandate authorize</strong> karte ho
                  (aaj {zeroLabel}).
                </li>
                <li>{trialDays} din tak poora RIZN free use.</li>
                <li>
                  Din {trialDays + 1} pe bank se{" "}
                  <strong className="text-gold-light">{displayPriceLabel}</strong> automatic cut —
                  phir har mahine.
                </li>
                <li>Cancel anytime from support / Razorpay customer portal when live.</li>
              </>
            ) : (
              <>
                <li>
                  Authorize card/wallet <strong className="text-white">mandate</strong> today (
                  {zeroLabel} charged).
                </li>
                <li>Use full RIZN free for {trialDays} days.</li>
                <li>
                  On day {trialDays + 1},{" "}
                  <strong className="text-gold-light">{displayPriceLabel}</strong> autopay begins —
                  then monthly.
                </li>
                <li>Cancel anytime from Settings or your payment provider portal.</li>
              </>
            )}
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
            {isIN ? "Pehle account banao — free trial" : "Create account — start free trial"}
          </Link>
        )}
      </div>
    </div>
  );
}
