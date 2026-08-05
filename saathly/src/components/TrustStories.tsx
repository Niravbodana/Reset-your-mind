import Image from "next/image";
import { Star } from "lucide-react";

const stories = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    focus: "Paisa",
    image: "/images/testimonial-priya.jpg",
    text: "EMI panic kam hua. Roz chhota action. 1 mahine me ₹8k side. Ab confident feel karti hoon.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    city: "Delhi",
    focus: "Burnout",
    image: "/images/testimonial-rahul.jpg",
    text: "Lunch reminders ne routine badla. Office me calm. Ghar pe bhi present rehta hoon ab.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    city: "Bangalore",
    focus: "Dil & Mind",
    image: "/images/testimonial-ananya.jpg",
    text: "Soft language, no toxic positivity. 21 din baad better sleep. Dil halka lagta hai.",
    rating: 5,
  },
];

export function TrustStories() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-12 text-center mx-auto">
          <p className="section-label mb-3">Kyoon log renew karte hain</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Pay tabhi jab <span className="gradient-gold">rise feel ho</span>
          </h2>
          <p className="text-ink-soft">
            4.9★ rating · 12,000+ reviews · 89% log 2nd month renew karte hain
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {stories.map((s) => (
            <blockquote key={s.name} className="glass-gold rounded-2xl p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold/30">
                  <Image src={s.image} alt={s.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{s.name}</p>
                  <p className="text-xs text-muted">{s.city}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: s.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gold mb-2">{s.focus}</p>
              <p className="text-[15px] text-white/90 leading-relaxed">&ldquo;{s.text}&rdquo;</p>
            </blockquote>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: "47K+", v: "happy members" },
            { k: "6", v: "messages / din" },
            { k: "₹99", v: "se shuru" },
            { k: "7 din", v: "free trial" },
          ].map((i) => (
            <div key={i.v} className="soft-card rounded-2xl p-5 text-center">
              <p className="font-display text-3xl font-bold gradient-gold">{i.k}</p>
              <p className="text-xs text-muted mt-1">{i.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
