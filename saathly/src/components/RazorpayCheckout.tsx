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

  const pay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/billing/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, email, name }),
      });
      const data = await res.json();

      if (data.demo) {
        alert(
          data.message ||
            "Billing is not live yet. You stay on the free preview — we will email you when payments open."
        );
        return;
      }

      if (data.error) {
        alert(data.error);
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
        handler: () => {
          onSuccess?.();
        },
      });
      rzp.open();
    } catch (e) {
      alert(String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={pay} disabled={loading} className={className}>
      {loading ? "Loading…" : children || "Pay with Razorpay"}
    </button>
  );
}
