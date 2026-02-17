"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Sarah & James M.",
    role: "First-Time Buyers",
    quote:
      "Ackiss Homes made our first home purchase feel effortless. They were patient, knowledgeable, and truly had our best interests at heart.",
  },
  {
    name: "David R.",
    role: "Home Seller",
    quote:
      "They sold our home in under two weeks and above asking price. The marketing strategy was incredible — we couldn't be happier.",
  },
  {
    name: "Michelle T.",
    role: "Real Estate Investor",
    quote:
      "I've worked with many agents, but the Ackiss team stands out. Professional, responsive, and always delivering results.",
  },
  {
    name: "Carlos & Elena P.",
    role: "Relocated from Out of State",
    quote:
      "Moving across the country was stressful, but Ackiss Homes made the house-hunting process seamless. They found us the perfect home before we even arrived.",
  },
  {
    name: "Jennifer W.",
    role: "Repeat Client",
    quote:
      "This was my third transaction with Ackiss Homes, and they never disappoint. Consistent, professional, and always fighting for the best deal.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }, [next, prev]);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 px-6 bg-dark-800">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
              Client Stories
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="relative">
            {/* Card */}
            <div
              className="bg-dark-700 border border-dark-600/50 rounded-sm p-10 md:p-14 text-center min-h-[280px] flex flex-col justify-center touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                key={current}
                className="animate-fade-in"
              >
                <div className="text-gold-400 text-5xl font-heading mb-6">&ldquo;</div>
                <p className="text-gray-300 leading-relaxed text-lg md:text-xl italic mb-8 max-w-2xl mx-auto">
                  {t.quote}
                </p>
                <div>
                  <p className="font-semibold text-white text-lg">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 bg-dark-800 border border-dark-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 bg-dark-800 border border-dark-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-gold-400 w-8"
                    : "bg-dark-600 hover:bg-dark-500"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
