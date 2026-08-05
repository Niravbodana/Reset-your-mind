import { Wallet, HeartPulse, HeartCrack, Briefcase, Brain, Users } from "lucide-react";

const problems = [
  {
    icon: Wallet,
    who: "Money stress",
    pain: "EMI, bills, salary delay — raat ko dimaag on.",
    help: "Chhote money nudges + micro savings actions.",
    line: "“Aaj ₹50 side — freedom signal.”",
  },
  {
    icon: Briefcase,
    who: "Burnout mode",
    pain: "10–12 hr grind, lunch skip, ghar pe bhi laptop.",
    help: "Break + boundary pulses before crash.",
    line: "“Ek task clean. Baaki kal.”",
  },
  {
    icon: HeartCrack,
    who: "Heart heavy",
    pain: "Breakup / loneliness loop.",
    help: "Soft healing, no toxic pressure.",
    line: "“Dil toota, tu nahi. 10 min self.”",
  },
  {
    icon: HeartPulse,
    who: "Health offline",
    pain: "Junk, no water, zero walk.",
    help: "Meal / water / walk / sleep hits.",
    line: "“Body battery low — recharge.”",
  },
  {
    icon: Brain,
    who: "Overthink spiral",
    pain: "Night loops, Sunday dread.",
    help: "Mood check + soft night mode.",
    line: "“Heavy day? Soft mode on.”",
  },
  {
    icon: Users,
    who: "Family load",
    pain: "Sab ke liye time, khud ke liye zero.",
    help: "Parivaar plan + ‘tu enough hai’ pulses.",
    line: "“5 min sirf tere liye.”",
  },
];

export function Problems() {
  return (
    <section id="problems" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-3">Built for 1 lakh different lives</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Problem jo bhi ho — pulse usi pe
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Generic quotes nahi. Situation + naam + timing. Jab dimaag thake, tab signal aaye.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <article
              key={p.who}
              className="soft-card rounded-2xl p-6 hover:border-laser/40 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(255,45,106,0.35)] transition-shadow">
                <p.icon size={20} className="text-laser" />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{p.who}</h3>
              <p className="text-sm text-ink-soft mb-2">{p.pain}</p>
              <p className="text-sm text-white/90 mb-4 font-medium">{p.help}</p>
              <p className="text-sm italic text-laser-2 border-l-2 border-laser pl-3">{p.line}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
