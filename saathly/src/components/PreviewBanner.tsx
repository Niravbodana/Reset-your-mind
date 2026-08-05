import Link from "next/link";
import { Info } from "lucide-react";

export function PreviewBanner() {
  return (
    <div className="bg-gold/10 border-b border-gold/20">
      <div className="mx-auto max-w-6xl px-4 py-2.5 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-soft">
        <Info size={14} className="text-gold-light shrink-0" />
        <span>
          Website preview — try RIZN in your browser. Mobile app with push notifications coming soon.
        </span>
        <Link href="/signup" className="text-gold-light font-semibold hover:underline">
          Join waitlist
        </Link>
      </div>
    </div>
  );
}
