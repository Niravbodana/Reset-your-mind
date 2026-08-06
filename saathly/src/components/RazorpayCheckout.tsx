"use client";

import { useState } from "react";
import { haptic } from "@/lib/haptic";
import { useLocale } from "@/context/LocaleContext";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: (resp: unknown) => void) => void;
    };
  }
}

type Props = {
  planId: string;
  email: string;
  name: string;
  phone?: string;
  onSuccess?: (meta: {
    demo?: boolean;
    subscriptionId?: string;
    trialEndsAt?: string;
    trialDays?: number;
    amount?: number;
  }) => void;
  className?: string;
  children?: React.ReactNode;
};

function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Razorpay load failed"));
    document.body.appendChild(s);
  });
}

export function RazorpayCheckout({
  planId,
  email,
  name,
  phone,
  onSuccess,
  className,
  children,
}: Props) {
  const { currency, region } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const start = async () => {
    setLoading(true);
    setError("");
    setInfo("");
    haptic("medium");
    try {
      const res = await fetch("/api/billing/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email, name, phone, currency, region }),
      });
      const data = await res.json();

      if (data.demo) {
        setInfo(
          data.message ||
            (region === "GLOBAL"
              ? "Demo only — no real payment. Live checkout when Admin adds payment links."
              : "Demo only — real payment nahi. Admin me payment links add hone pe live.")
        );
        onSuccess?.({
          demo: true,
          trialEndsAt: data.trialEndsAt,
          trialDays: data.trialDays,
          amount: data.amount,
        });
        return;
      }

      if (data.error) {
        setError(data.error + (data.detail ? `: ${data.detail}` : ""));
        return;
      }

      await loadRazorpay();

      const rzp = new window.Razorpay!({
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: "RIZN",
        description: data.description || `${data.trialDays}-day free trial → ₹${data.amount}/month`,
        prefill: {
          email,
          name,
          contact: phone || undefined,
        },
        notes: {
          planId,
          trialDays: String(data.trialDays),
        },
        theme: { color: "#c9a227" },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_subscription_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/billing/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const result = await verify.json();
          if (result.ok) {
            haptic("success");
            onSuccess?.({
              subscriptionId: response.razorpay_subscription_id,
              trialEndsAt: data.trialEndsAt,
              trialDays: data.trialDays,
              amount: data.amount,
            });
          } else {
            setError(result.error || "Payment verification failed");
          }
        },
      });

      rzp.on("payment.failed", (resp: unknown) => {
        const r = resp as { error?: { description?: string } };
        setError(r?.error?.description || "Payment failed / cancelled");
      });

      rzp.open();
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={start} disabled={loading} className={className}>
        {loading ? "Setting up trial…" : children || "Start 7-day free trial"}
      </button>
      {error && <p className="text-xs text-red-300 mt-2 leading-relaxed">{error}</p>}
      {info && <p className="text-xs text-gold-light mt-2 leading-relaxed">{info}</p>}
    </div>
  );
}
