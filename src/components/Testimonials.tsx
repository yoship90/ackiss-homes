"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

const testimonials = [
  {
    name: "Kathy B.",
    role: "Buyer · Virginia Beach, VA",
    quote:
      "Amanda was the perfect realtor for us. She was patient and worked with us for over four months, negotiating the best deal for our dream home. If you need a personal recommendation, please reach out. I'd be happy to tell you more about how Amanda rocked our deal!",
  },
  {
    name: "TheAndrewJones",
    role: "Buyer & Seller · Norfolk, VA",
    quote:
      "Amazing Overall! We worked with Amanda 2 years ago to purchase our first property and used her to sell recently. Extremely friendly and open with each step in the process. Provides plenty of updates as they come. Stress free experience each time. She's quick to respond to questions and has great knowledge with real estate. Would highly recommend her to anyone looking to buy or sell!",
  },
  {
    name: "jholli1985",
    role: "Buyer · Norfolk, VA",
    quote:
      "Amanda was absolutely amazing. She was knowledgeable and helpful in every way of my home buying experience. She made everything easy. She was always available and responded instantly to all communication. I would 100% recommend her and will be using her in the future as well.",
  },
  {
    name: "JacksonHinkle88",
    role: "First-Time Buyer · Chesapeake, VA",
    quote:
      "First time buying and he had every answer to my questions. Made the whole process stress less and easy. Would always let me know what the next step was and what to be prepared for. Could not of asked for a better realtor.",
  },
  {
    name: "justin doering757",
    role: "Buyer & Seller · Suffolk, VA",
    quote:
      "Very knowledgeable about the area and surroundings. Positive experience all around. Would recommend. Good contact and communication as well. We bought and sold our house with him. Seamless timing.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

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

  // Auto-rotate — disabled when reduced motion preferred or paused on hover/focus
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, prefersReducedMotion, isPaused]);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20 px-6 bg-dark-800 section-texture">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
              <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Testimonials</p>
              <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
            </div>
          </ScrollReveal>
          <SplitHeading className="text-4xl md:text-5xl font-heading font-bold">
            What Our Clients Say
          </SplitHeading>
        </div>

        <ScrollReveal>
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {/* Card */}
            <div
              className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-10 md:p-14 text-center min-h-[280px] flex flex-col justify-center touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Large decorative background quote marks */}
              <div
                className="absolute -top-8 left-4 text-[200px] leading-none font-heading text-gold-400 select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <div
                className="absolute -bottom-8 right-0 text-[200px] leading-none font-heading text-gold-400 select-none pointer-events-none"
                aria-hidden="true"
              >
                &rdquo;
              </div>

              <div
                key={current}
                className="animate-fade-in relative z-10 pt-8 md:pt-0"
                aria-live="polite"
              >
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 bg-dark-800 border border-dark-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-90 transition-[color,border-color,transform] duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 bg-dark-800 border border-dark-600/50 rounded-full flex items-center justify-center text-gray-400 hover:text-gold-400 hover:border-gold-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-90 transition-[color,border-color,transform] duration-300"
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
                className={`w-2.5 h-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-90 transition-[width,background-color,transform] duration-300 ${
                  i === current
                    ? "bg-gold-400 w-8"
                    : "bg-dark-500 hover:bg-warm-400/40"
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
