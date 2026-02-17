"use client";

// Hero design: Option C (full-bleed photo + floating cards) — currently live.
// See CLAUDE.md "Hero Design Options" for full descriptions of Options A and B.

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fullText = "Find Your Dream Home";

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

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(fullText);
      setDone(true);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  // Parallax on logo watermark
  useEffect(() => {
    if (prefersReducedMotion) return;
    function handleScroll() {
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  return (
    <section
      id="hero"
      className="relative h-[60rem] flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Full-bleed background photo */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Dark overlay — heavier at center/bottom, lighter at edges to let photo breathe */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/60 to-dark-900/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/40 via-transparent to-dark-900/40" />

      {/* Logo watermark with parallax */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="/logo.png"
          alt=""
          width={1200}
          height={1200}
          className="opacity-10 w-[65rem] h-auto object-contain mix-blend-lighten"
          priority
        />
      </div>

      {/* Floating accent photo cards */}
      <div className="hidden md:block">
        {/* Left card */}
        <div className="absolute bottom-44 left-8 lg:left-16 -rotate-6 opacity-80">
          <div className="border-2 border-gold-500/30 rounded-sm shadow-[0_0_25px_rgba(201,149,46,0.15)] overflow-hidden">
            <Image src="/hero-1.jpg" alt="" width={260} height={180} className="w-[200px] lg:w-[240px] h-auto object-cover" />
          </div>
        </div>
        {/* Right card top */}
        <div className="absolute top-40 right-8 lg:right-16 rotate-3 opacity-80">
          <div className="border-2 border-gold-500/30 rounded-sm shadow-[0_0_25px_rgba(201,149,46,0.15)] overflow-hidden">
            <Image src="/hero-2.jpg" alt="" width={260} height={180} className="w-[200px] lg:w-[240px] h-auto object-cover" />
          </div>
        </div>
        {/* Right card bottom */}
        <div className="absolute bottom-32 right-12 lg:right-28 rotate-6 opacity-80">
          <div className="border-2 border-gold-500/30 rounded-sm shadow-[0_0_25px_rgba(201,149,46,0.15)] overflow-hidden">
            <Image src="/hero-3.jpg" alt="" width={260} height={180} className="w-[200px] lg:w-[240px] h-auto object-cover" />
          </div>
        </div>
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 hero-grain opacity-[0.035] pointer-events-none mix-blend-overlay" aria-hidden="true" />

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gold-400/40 transition-opacity duration-1000 ${
          done ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Text content — centered */}
      <div className="relative text-center max-w-5xl mx-auto">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6">
          Real Estate
        </p>
        <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 min-h-[1.2em]">
          {displayed.length <= 10 ? (
            <>
              {displayed}
              {!done && <span className="animate-pulse text-gold-400">|</span>}
            </>
          ) : (
            <>
              {displayed.slice(0, 10)}
              <span className="text-gold-400">{displayed.slice(10)}</span>
              {!done && <span className="animate-pulse text-gold-400">|</span>}
            </>
          )}
        </h1>
        <p
          className={`text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-3 leading-relaxed transition-opacity duration-700 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          Ackiss Homes delivers exceptional real estate experiences — whether
          you&apos;re buying, selling, or investing.
        </p>
        <p
          className={`text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-opacity duration-700 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          Already browsing homes online? Let us know the address and get live,
          fresh MLS data — availability, price history, days on market, and
          everything the listing sites aren&apos;t showing you. Free, no obligation.
        </p>
        <a
          href="#property-inquiry"
          className={`inline-block bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold px-10 py-5 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.3)] hover:shadow-[0_0_35px_rgba(201,149,46,0.6)] hover:scale-[1.07] transition-all duration-700 ${
            done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Get Live MLS Data &rarr;
        </a>
      </div>
    </section>
  );
}
