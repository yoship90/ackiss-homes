"use client";

import { useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";

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
    name: "Burbage Grant",
    city: "Suffolk, VA",
    description:
      "A sought-after community in north Suffolk featuring spacious homes, excellent schools, and a welcoming neighborhood feel.",
    details:
      "Nestled in north Suffolk, Burbage Grant offers a perfect blend of suburban comfort and convenience. The community features well-maintained homes on generous lots, mature tree-lined streets, and easy access to shopping, dining, and major commuter routes. Families love the proximity to top-rated Suffolk schools and the neighborhood\u2019s strong sense of community.",
    stats: [
      { label: "Avg Home Price", value: "~$350K\u2013$450K" },
      { label: "Home Styles", value: "Single-family, 3\u20135 bed" },
      { label: "Built", value: "2000s\u20132010s" },
      { label: "Lot Sizes", value: "0.25\u20130.5 acres" },
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
      <section id="neighborhoods" className="py-24 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
                Explore the Area
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-bold">
                Featured Neighborhoods
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((n, i) => (
              <ScrollReveal key={n.name} delay={i * 100}>
                <div
                  className="bg-dark-700 border border-dark-600/50 rounded-sm p-8 hover:border-gold-500/30 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-300 group h-full flex flex-col cursor-pointer"
                  onClick={() => setSelected(n)}
                >
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
