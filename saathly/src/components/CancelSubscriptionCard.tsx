"use client";

import { useState } from "react";
import { AlertTriangle, XCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { haptic } from "@/lib/haptic";

/** Cancel autopay — with confirm step (FAQ + billing promise) */
export function CancelSubscriptionCard() {
  const { state, cancelSubscription, trackEvent } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  if (!user) return null;

  const isIN = region === "IN" && !preferEnglish;
  const cancelled = user.subStatus === "cancelled" || done;
  const canCancel =
    user.autopayEnabled || user.subStatus === "active" || user.subStatus === "trial";

  if (!canCancel && !cancelled) return null;

  const onCancel = () => {
    haptic("medium");
    cancelSubscription();
    trackEvent("subscription_cancelled", user.razorpaySubscriptionId ? "live" : "demo");
    setConfirming(false);
    setDone(true);
  };

  return (
    <div className="soft-card rounded-2xl p-5 mb-6 border border-white/10">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
          <XCircle size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white text-sm">
            {cancelled
              ? isIN
                ? "Subscription cancel ho gayi"
                : "Subscription cancelled"
              : isIN
                ? "Cancel subscription"
                : "Cancel subscription"}
          </p>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed">
            {cancelled
              ? isIN
                ? "Autopay band. Trial/plan access trial end tak ya current cycle tak — phir charge nahi hoga."
                : "Autopay stopped. Access continues until trial or current cycle ends — no further charges."
              : isIN
                ? "Next billing cycle se charge ruk jayega. Koi cancellation fee nahi."
                : "Billing stops from the next cycle. No cancellation fee."}
          </p>

          {!cancelled && !confirming && (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 min-h-[44px] hover:bg-red-500/15"
            >
              {isIN ? "Cancel karo" : "Cancel subscription"}
            </button>
          )}

          {confirming && !cancelled && (
            <div className="mt-3 rounded-xl border border-red-500/25 bg-black/40 p-4">
              <p className="text-xs text-ink-soft flex gap-2 mb-3">
                <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                {isIN
                  ? "Pakka cancel? Autopay mandate band ho jayegi. Aap baad me dubara billing se join kar sakte ho."
                  : "Sure? Your autopay mandate will stop. You can re-subscribe from billing anytime."}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 rounded-xl bg-red-600 text-white py-2.5 text-sm font-semibold min-h-[44px] hover:bg-red-500"
                >
                  {isIN ? "Haan, cancel karo" : "Yes, cancel"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  className="flex-1 btn-secondary rounded-xl py-2.5 text-sm font-semibold min-h-[44px]"
                >
                  {isIN ? "Nahi, rakh do" : "Keep subscription"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
