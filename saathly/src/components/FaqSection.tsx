import { FaqList } from "./FaqList";

export function FaqSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6 page-pad">
        <p className="section-label mb-3 text-center">FAQ</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 text-white">
          Common questions
        </h2>
        <FaqList />
      </div>
    </section>
  );
}
