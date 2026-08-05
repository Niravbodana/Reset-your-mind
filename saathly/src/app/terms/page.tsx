import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service — RIZN" };

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <article className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-4 text-ink-soft leading-relaxed text-[15px]">
          <p>RIZN provides personalized motivational messages and tools. It is <strong className="text-white">not medical care or therapy</strong>.</p>
          <p>Subscriptions renew until cancelled. Trial terms shown at signup. Abuse, spam, or illegal use may result in account termination.</p>
          <p>Content is for personal use. Do not redistribute message libraries commercially without permission.</p>
          <p>Contact: hello@rizn.app</p>
        </div>
      </article>
    </div>
  );
}
