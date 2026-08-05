import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";

export const metadata: Metadata = { title: "FAQ — RIZN" };

export default function FaqPage() {
  return (
    <div className="page-top pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-3">FAQ</h1>
        <p className="text-ink-soft text-sm mb-8">Straight answers about the product and roadmap.</p>
        <FaqList variant="page" />
        <Link href="/signup" className="btn-primary inline-flex mt-10 px-6 py-3 rounded-xl text-sm">
          Join early access
        </Link>
      </div>
    </div>
  );
}
