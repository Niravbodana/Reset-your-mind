import type { Metadata } from "next";
import { AdminPanel } from "@/components/AdminPanel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — RIZN",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">Admin</h1>
        <p className="text-sm text-ink-soft">
          Razorpay, WhatsApp, Resend, VAPID keys, pricing, links — sab yahan se manage karo.
        </p>
      </div>
      <AdminPanel />
      <p className="text-center mt-8">
        <Link href="/" className="text-sm text-gold-light">← Homepage</Link>
      </p>
    </div>
  );
}
