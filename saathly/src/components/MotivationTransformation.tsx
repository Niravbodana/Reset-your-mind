"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { MESSAGE_BANK } from "@/lib/message-bank";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { useLocale } from "@/context/LocaleContext";

const STORIES_IN = [
  {
    id: "priya",
    name: "Priya ji",
    beforeImg: "/images/animatic-before-hope.jpg",
    afterImg: "/images/animatic-after-hope.jpg",
    before: "Raat ko neend nahi. Subah uthne ka mann nahi. Akela lagta tha.",
    after: "Har din ek message — chhota step. Life phir se control me.",
    message: MESSAGE_BANK[0].hinglish.replace("{name}", "Priya ji"),
    action: MESSAGE_BANK[0].microAction,
  },
  {
    id: "rahul",
    name: "Rahul ji",
    beforeImg: "/images/animatic-before-emi.jpg",
    afterImg: "/images/animatic-after-emi.jpg",
    before: "EMI date miss, stress, bank call — har mahine tension.",
    after: "1 din pehle alert. Balance ready. Dil shaant.",
    message: formatEmiNotification("Rahul", DEMO_EMI, "hinglish"),
    action: "Aaj balance check karo",
  },
];

const STORIES_GLOBAL = [
  {
    id: "maya",
    name: "Maya",
    beforeImg: "/images/animatic-before-hope.jpg",
    afterImg: "/images/animatic-after-hope.jpg",
    before: "Couldn't sleep. Hard to get out of bed. Felt alone with it all.",
    after: "One message a day — a small step. Life feels in control again.",
    message: MESSAGE_BANK[0].english.replace("{name}", "Maya"),
    action: MESSAGE_BANK[0].microAction,
  },
  {
    id: "alex",
    name: "Alex",
    beforeImg: "/images/animatic-before-emi.jpg",
    afterImg: "/images/animatic-after-emi.jpg",
    before: "Missed bill dates, stress, late fees — every month.",
    after: "Alert one day early. Balance ready. Calm.",
    message: formatEmiNotification("Alex", DEMO_EMI, "english"),
    action: "Check your balance today",
  },
];

const ROTATE_MS = 8000;

export function MotivationTransformation() {
  const { region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const stories = isIN ? STORIES_IN : STORIES_GLOBAL;
  const [idx, setIdx] = useState(0);
  const story = stories[idx % stories.length];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % stories.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [stories.length]);

  return (
    <section id="transform" className="relative py-14 sm:py-16 md:py-24 overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.03] to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <p className="section-label mb-3">Before & After</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {isIN ? (
              <>
                Life <span className="text-gold-light">before</span> vs{" "}
                <span className="text-gold-light">after</span> RIZN.
              </>
            ) : (
              <>
                Life <span className="text-gold-light">before</span> vs{" "}
                <span className="text-gold-light">after</span> RIZN.
              </>
            )}
          </h2>
          <p className="text-ink-soft text-[15px] sm:text-base md:text-lg leading-relaxed">
            Real stories. Small steps. A daily path with your name.
          </p>
        </div>

        <div className="relative">
          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] min-h-[220px] rounded-2xl overflow-hidden border border-white/10 bg-[#1a1520] shadow-xl">
              <Image
                src={story.beforeImg}
                alt={`${story.name} — before`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/70 text-red-200 border border-red-400/40">
                  {isIN ? "Pehle" : "Before"}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-base sm:text-lg text-white/95 font-medium leading-snug">
                  {story.before}
                </p>
              </div>
            </div>

            <div className="relative aspect-[4/3] sm:aspect-[16/10] min-h-[220px] rounded-2xl overflow-hidden border border-gold/25 bg-[#151510] shadow-xl">
              <Image
                src={story.afterImg}
                alt={`${story.name} — after`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-gold/10" />
              <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-gold/25 text-gold-light border border-gold/50 flex items-center gap-1.5 w-fit">
                  <Sparkles size={12} />
                  {isIN ? "Ab RIZN ke saath" : "With RIZN"}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <p className="text-base sm:text-lg text-white font-semibold leading-snug">
                  {story.after}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="premium-card rounded-2xl p-5 sm:p-6 border border-gold/20 bg-black/75 shadow-2xl shadow-gold/10 min-h-[168px] flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-3 text-center">
                {isIN
                  ? `${story.name} ko aisa message aata hai`
                  : `${story.name} gets messages like this`}
              </p>
              <p className="text-[15px] sm:text-base leading-relaxed text-white text-center break-words line-clamp-4">
                {story.message}
              </p>
              <p className="text-sm text-gold-light mt-3 font-medium text-center">
                → {story.action}
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {stories.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.name}
                onClick={() => setIdx(i)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    i === idx ? "h-2.5 w-8 bg-gold" : "h-2.5 w-2.5 bg-white/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
