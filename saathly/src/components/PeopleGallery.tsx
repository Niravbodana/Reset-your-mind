"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const people = [
  {
    src: "/images/testimonial-priya.jpg",
    name: "Priya",
    city: "Mumbai",
    tag: "Paisa",
    quote: "30 din me ₹8,000 save — chhote nudges ne farq kiya",
  },
  {
    src: "/images/customer-couple.jpg",
    name: "Sneha & Rohan",
    city: "Pune",
    tag: "Parivaar",
    quote: "Dono ek saath streak — ghar me positive energy",
  },
  {
    src: "/images/testimonial-ananya.jpg",
    name: "Ananya",
    city: "Bangalore",
    tag: "Dil & Mind",
    quote: "Soft messages, no pressure — sleep finally better",
  },
  {
    src: "/images/testimonial-rahul.jpg",
    name: "Rahul",
    city: "Delhi",
    tag: "Career",
    quote: "Burnout se nikla — lunch breaks ab miss nahi",
  },
];

export function PeopleGallery() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6 mb-10 text-center">
        <p className="section-label mb-2">Real stories</p>
        <h2 className="font-display text-2xl md:text-4xl font-bold text-white">
          Har koi apni <span className="gradient-gold italic">kahani</span> likh raha hai
        </h2>
        <p className="text-ink-soft mt-3 max-w-xl mx-auto">
          Mumbai se Delhi, Bangalore se Pune — 47,000+ log roz rise kar rahe hain.
        </p>
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
              <Image src={person.src} alt={person.name} fill className="object-cover" sizes="256px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="text-[10px] bg-gold/90 text-black font-bold px-2.5 py-1 rounded-full">
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
