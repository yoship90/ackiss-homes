"use client";

import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

interface NeighborhoodStat {
  label: string;
  value: string;
}

interface Neighborhood {
  name: string;
  city: string;
  description: string;
  details: string;
  stats: NeighborhoodStat[];
}

const neighborhoods: Neighborhood[] = [
  {
    name: "Green Run",
    city: "Virginia Beach, VA",
    description:
      "One of Virginia Beach\u2019s largest and most established neighborhoods, offering affordable homes, great amenities, and a true community atmosphere.",
    details:
      "Green Run is a sprawling, well-established community in the heart of Virginia Beach. With over 8,000 homes, it\u2019s one of the largest planned neighborhoods in the city. Residents enjoy access to multiple community pools, tennis courts, playgrounds, and walking trails. The neighborhood is conveniently located near shopping centers, restaurants, and the Virginia Beach Town Center. Green Run is served by well-regarded schools and offers easy access to I-264, making commutes to Norfolk, Chesapeake, and the Oceanfront a breeze.",
    stats: [
      { label: "Avg Home Price", value: "~$250K\u2013$375K" },
      { label: "Home Styles", value: "Single-family, townhomes" },
      { label: "Built", value: "1970s\u20131990s" },
      { label: "Community", value: "8,000+ homes" },
    ],
  },
];

export default function Neighborhoods() {
  const [selected, setSelected] = useState<Neighborhood | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (!selected) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected, closeModal]);

  const handleCTA = () => {
    closeModal();
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <section id="neighborhoods" className="py-24 px-6 bg-dark-800 section-texture">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
                <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Explore the Area</p>
                <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
              </div>
            </ScrollReveal>
            <SplitHeading className="text-4xl md:text-5xl font-heading font-bold">
              Featured Neighborhoods
            </SplitHeading>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((n, i) => (
              <ScrollReveal key={n.name} delay={i * 100} direction="scale">
                <div
                  className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-8 hover:border-gold-500/50 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/15 transition-all duration-300 group h-full flex flex-col cursor-pointer"
                  onClick={() => setSelected(n)}
                >
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 group-hover:w-full transition-all duration-500 ease-out" aria-hidden="true" />
                  {/* Gradient placeholder for future image */}
                  <div className="w-full h-40 rounded-sm mb-6 bg-gradient-to-br from-dark-600 to-dark-800 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gold-400/40 group-hover:text-gold-400/60 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>

                  <p className="text-gold-400 text-sm uppercase tracking-widest mb-1">
                    {n.city}
                  </p>
                  <h3 className="text-xl font-heading font-semibold mb-3">
                    {n.name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                    {n.description}
                  </p>
                  <button className="text-gold-400 text-sm font-semibold uppercase tracking-widest hover:text-gold-300 transition-colors self-start">
                    Learn More &rarr;
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal content */}
          <div
            className="relative bg-dark-800 border border-dark-600/50 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <p className="text-gold-400 text-sm uppercase tracking-widest mb-1">
              {selected.city}
            </p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {selected.name}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              {selected.details}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {selected.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-dark-700 border border-dark-600/50 rounded-sm p-4"
                >
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-white font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handleCTA}
              className="w-full bg-gold-500 hover:bg-gold-600 text-dark-900 font-bold py-3 px-6 rounded-sm uppercase tracking-widest text-sm transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </>
  );
}
