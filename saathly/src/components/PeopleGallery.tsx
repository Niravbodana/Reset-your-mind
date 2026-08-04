"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const people = [
  {
    src: "/images/person-wellness.jpg",
    name: "Arjun",
    city: "Bangalore",
    tag: "Health & Mind",
    quote: "Roz subah motivation milti hai",
  },
  {
    src: "/images/person-couple.jpg",
    name: "Sneha & Rohan",
    city: "Pune",
    tag: "Love & Family",
    quote: "Dono ek saath streak banate hain",
  },
  {
    src: "/images/person-happy.jpg",
    name: "Priya",
    city: "Mumbai",
    tag: "Finance",
    quote: "₹8000 save kiya 30 din me",
  },
  {
    src: "/images/person-stressed.jpg",
    name: "Vikram",
    city: "Delhi",
    tag: "Career",
    quote: "Burnout se nikal gaya",
  },
];

export function PeopleGallery() {
  return (
    <section className="py-16 md:py-20 overflow-hidden bg-surface/40">
      <div className="mx-auto max-w-6xl px-4 md:px-6 mb-10 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">
          12,000+ log join kar chuke
        </p>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white">
          Har koi apni <span className="text-gold-light italic">kahani</span> likh raha hai
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-6 snap-x snap-mandatory scrollbar-hide md:justify-center">
        {people.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-64 snap-center group"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold/20 shadow-lg group-hover:border-gold/50 transition-all group-hover:scale-[1.02]">
              <Image
                src={person.src}
                alt={person.name}
                fill
                className="object-cover"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] bg-gold/90 text-background font-bold px-2.5 py-1 rounded-full">
                  {person.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">
                  {person.name}, {person.city}
                </p>
                <p className="text-white/75 text-xs mt-1 italic">&quot;{person.quote}&quot;</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
