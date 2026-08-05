"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Props = {
  planId: string;
  email: string;
  name: string;
  onSuccess?: () => void;
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

export function RazorpayCheckout({ planId, email, name, onSuccess, className, children }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pay = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/billing/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email, name }),
      });
      const data = await res.json();

      if (data.demo) {
        setError(
          data.message ||
            "Billing opens soon — we'll email you before any charge."
        );
        return;
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      await loadRazorpay();
      const rzp = new window.Razorpay!({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "RIZN",
        description: `${planId} plan`,
        order_id: data.orderId,
        prefill: { email, name },
        theme: { color: "#c9a227" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/billing/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const result = await verify.json();
          if (result.ok) onSuccess?.();
          else setError(result.error || "Payment verification failed");
        },
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
      <button type="button" onClick={pay} disabled={loading} className={className}>
        {loading ? "Loading…" : children || "Pay with Razorpay"}
      </button>
      {error && <p className="text-xs text-gold-light mt-2">{error}</p>}
    </div>
  );
}
