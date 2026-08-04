"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stories = [
  {
    name: "Priya S.",
    city: "Mumbai",
    area: "Financial stress",
    before: "Har raat EMI ke baare me sochti thi, neend nahi aati thi.",
    after: "30 din me ₹8000 save kiya. Ab har message pe action leti hoon.",
    days: 45,
    avatar: "PS",
  },
  {
    name: "Rahul K.",
    city: "Delhi",
    area: "Work burnout",
    before: "12 ghante office, ghar pe bhi kaam. Health bigad gayi thi.",
    after: "Ab lunch break leta hoon, walk karta hoon. Boss bhi notice kiya change.",
    days: 28,
    avatar: "RK",
  },
  {
    name: "Ananya M.",
    city: "Bangalore",
    area: "Heartbreak",
    before: "Breakup ke baad 2 mahine depression me thi. Kuch feel nahi hota tha.",
    after: "Roz naam sunke lagta hai koi hai. 21 din program ne bahut help ki.",
    days: 60,
    avatar: "AM",
  },
  {
    name: "Vikram P.",
    city: "Pune",
    area: "Health neglect",
    before: "Subah se shaam tak baitha rehta tha, junk food, zero exercise.",
    after: "Har message pe paani peeta hoon, 15 min walk. 4 kg kam!",
    days: 35,
    avatar: "VP",
  },
];

export function Testimonials() {
  return (
    <section id="stories" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium mb-2">Real stories</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Logon ki <span className="gradient-gold">zindagi badli</span> — tumhari bhi bad sakti hai
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Ye sirf quotes nahi — ye real log hain jinhone Saathly se apni life me change mehsoos kiya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-gold rounded-2xl p-6 md:p-8"
            >
              <Quote size={24} className="text-gold/40 mb-4" />

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-red-400/80 mb-2">Pehle</p>
                  <p className="text-sm text-muted leading-relaxed">{story.before}</p>
                </div>
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-400/80 mb-2">Ab</p>
                  <p className="text-sm text-foreground leading-relaxed">{story.after}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-xs font-bold text-background">
                    {story.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{story.name}</p>
                    <p className="text-xs text-muted">
                      {story.city} · {story.area}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-bold text-gold-light">{story.days}</p>
                  <p className="text-[10px] text-muted">din streak</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
