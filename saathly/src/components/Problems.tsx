import { Wallet, HeartPulse, HeartCrack, Briefcase, Brain, Users } from "lucide-react";

const problems = [
  {
    icon: Wallet,
    who: "Paisa ka tension",
    pain: "EMI, bills, salary delay — raat ko dimaag band hi nahi hota.",
    help: "Chhote money nudges + micro savings — panic se action.",
    line: "“Aaj ₹50 side — kal ka tension kam.”",
  },
  {
    icon: Briefcase,
    who: "Office burnout",
    pain: "10–12 ghante grind, lunch skip, ghar pe bhi laptop on.",
    help: "Break + boundary reminders — crash se pehle signal.",
    line: "“Ek kaam finish. Baaki kal.”",
  },
  {
    icon: HeartCrack,
    who: "Dil bhari",
    pain: "Breakup, loneliness, koi samajhne wala nahi.",
    help: "Soft healing messages — bina toxic positivity ke.",
    line: "“Dil toota, tu nahi. 10 min apne liye.”",
  },
  {
    icon: HeartPulse,
    who: "Health ignore",
    pain: "Junk khana, paani nahi, walk zero.",
    help: "Meal, water, walk, sleep — chhote healthy hits.",
    line: "“Body low hai — recharge karo.”",
  },
  {
    icon: Brain,
    who: "Overthinking",
    pain: "Raat ko loop, Sunday dread, dimaag full.",
    help: "Mood check + soft night mode — calm close.",
    line: "“Heavy day? Soft mode on.”",
  },
  {
    icon: Users,
    who: "Family load",
    pain: "Sab ke liye time, khud ke liye zero.",
    help: "Parivaar plan — pure ghar ke liye rise.",
    line: "“5 min sirf tere liye.”",
  },
];

export function Problems() {
  return (
    <section id="problems" className="py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-3">Tumhari problem, hamara focus</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Jo bhi heavy ho — message usi pe aata hai
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Generic quotes nahi. Tumhara naam + tumhari situation + sahi timing. Jab dimaag thake, tab signal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <article
              key={p.who}
              className="soft-card rounded-2xl p-6 hover:border-gold/40 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(201,162,39,0.25)] transition-shadow">
                <p.icon size={20} className="text-gold-light" />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{p.who}</h3>
              <p className="text-sm text-ink-soft mb-2">{p.pain}</p>
              <p className="text-sm text-white/90 mb-4 font-medium">{p.help}</p>
              <p className="text-sm italic text-gold-light border-l-2 border-gold pl-3">{p.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
