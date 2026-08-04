import { Wallet, HeartPulse, HeartCrack, Briefcase, Brain, Users } from "lucide-react";

const problems = [
  {
    icon: Wallet,
    who: "Paisa tension wale",
    pain: "EMI, salary delay, ghar ka kharcha — raat ko neend nahi aati.",
    help: "Roz chhote money mindset nudges + saving micro-actions. Panic kam, plan clear.",
    line: "“Aaj ₹50 side me rakh — ye teri freedom ki shuruaat hai.”",
  },
  {
    icon: Briefcase,
    who: "Overworked professionals",
    pain: "10–12 ghante kaam, lunch skip, ghar pe bhi laptop.",
    help: "Break reminders, boundary messages, evening wind-down — burnout se pehle rokna.",
    line: "“Tu machine nahi hai. Ek kaam perfect kar, baaki kal.”",
  },
  {
    icon: HeartCrack,
    who: "Dil tootne wale",
    pain: "Breakup, loneliness, “main hi galat hoon” wala loop.",
    help: "Soft healing messages, self-worth, no toxic “move on” pressure.",
    line: "“Dil toota hai, par tu toota nahi. Aaj 10 min khud ke liye.”",
  },
  {
    icon: HeartPulse,
    who: "Health ignore karne wale",
    pain: "Junk food, paani nahi, walk zero — body pehle, dimaag baad me bigadta hai.",
    help: "Meal, water, walk, sleep nudges — guilt free, practical.",
    line: "“1 baj gaya — khana khaya? Body ko mat bhoolo.”",
  },
  {
    icon: Brain,
    who: "Overthinking / low mood",
    pain: "Raat bhar sochna, Sunday evening dread, “kuch nahi ho raha”.",
    help: "Mood check-ins, crisis soft mode, calm evening messages. Helpline bridge jab zarurat ho.",
    line: "“Aaj heavy hai to theek hai. Kal better ho sakta hai. Ab rest.”",
  },
  {
    icon: Users,
    who: "Family load uthane wale",
    pain: "Parents, bachche, expectations — khud ke liye time zero.",
    help: "“Tu enough hai” type reminders + family plan jisme ghar saath chale.",
    line: "“Tu sab sambhalta hai. Aaj 5 minute sirf apne liye.”",
  },
];

export function Problems() {
  return (
    <section id="problems" className="py-20 md:py-28 bg-bg-soft/60">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p className="section-label mb-3">1 lakh alag log. Ek common feel.</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4 leading-tight">
            Tumhari problem jo bhi ho — Humsafar usi pe baat karta hai
          </h2>
          <p className="text-ink-soft leading-relaxed">
            Generic quotes nahi. Situation samajh ke, naam leke, usi waqt pe message aata hai jab
            dimaag thak jata hai.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {problems.map((p) => (
            <article
              key={p.who}
              className="soft-card rounded-2xl p-6 flex flex-col hover:border-accent/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
                <p.icon size={20} className="text-accent" />
              </div>
              <h3 className="font-semibold text-lg text-ink mb-2">{p.who}</h3>
              <p className="text-sm text-ink-soft mb-3 leading-relaxed">{p.pain}</p>
              <p className="text-sm text-ink mb-4 leading-relaxed font-medium">{p.help}</p>
              <p className="mt-auto text-sm italic text-accent-deep border-l-2 border-accent pl-3 leading-relaxed">
                {p.line}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
