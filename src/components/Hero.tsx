"use client";

// Hero design: Option D (typographic — no photo, pure dark luxury)
// Option C (full-bleed photo + floating cards) is in git history — see CLAUDE.md

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fullText = "Where Home Begins";

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

  // Desktop typewriter state
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  // Mobile logo-first sequence
  const [isMobile, setIsMobile] = useState(false);
  const [logoPhase, setLogoPhase] = useState(false);

  const logoRef = useRef<HTMLDivElement>(null);

  // Detect mobile and trigger the logo → text reveal sequence
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setIsMobile(mobile);
    if (!mobile) return;

    if (prefersReducedMotion) {
      setLogoPhase(true);
      return;
    }
    const t = setTimeout(() => setLogoPhase(true), 1200);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  // Desktop typewriter — skipped on mobile
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return;
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

  // Subtle parallax on logo watermark
  useEffect(() => {
    if (prefersReducedMotion) return;
    function handleScroll() {
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // Shared class for mobile fade+slide-up reveal
  const mobileBase = "transition-[transform,opacity] duration-700 ease-out";
  const mobileVisible = "opacity-100 translate-y-0";
  const mobileHidden = "opacity-0 translate-y-8";

  return (
    <section
      id="hero"
      className="relative h-[44rem] md:h-[45rem] flex items-center justify-center px-6 pt-20 overflow-hidden bg-black"
    >
      {/* Faint radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,149,46,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div
        ref={logoRef}
        className="absolute inset-y-0 left-0 translate-x-0 md:left-auto md:right-[-8rem] flex items-center will-change-transform pointer-events-none transition-opacity duration-700 ease-out"
        aria-hidden="true"
        style={{ opacity: isMobile ? (logoPhase ? 0.3 : 1) : 0.55 }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={960}
          height={894}
          className="w-[150vw] md:w-[52rem] h-auto object-contain mix-blend-lighten [mask-image:linear-gradient(to_right,transparent,black_4%)]"
          priority
        />
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 hero-grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-gold-400/40 transition-opacity duration-1000 ${
          (isMobile ? logoPhase : done) ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Text content — centered */}
      <div className="relative text-center max-w-5xl mx-auto pt-4">

        {/* ---- DESKTOP: typewriter animation ---- */}
        {!isMobile && (
          <>
            {/* Eyebrow */}
            <div className={`flex items-center justify-center gap-4 mb-8 transition-opacity duration-700 ${done ? "opacity-100" : "opacity-0"}`}>
              <div className="h-px w-12 bg-gold-500/60" />
              <p className="text-gold-400 uppercase tracking-[0.4em] text-xs">Virginia Beach &amp; All of Hampton Roads</p>
              <div className="h-px w-12 bg-gold-500/60" />
            </div>

            {/* Main headline */}
            <h1 className="text-6xl md:text-8xl font-heading font-bold leading-[1.05] mb-8 min-h-[1.1em] tracking-tight">
              {displayed.length <= 6 ? (
                <>
                  {displayed}
                  {!done && displayed.length > 0 && <span className="animate-pulse text-gold-400">|</span>}
                </>
              ) : (
                <>
                  {displayed.slice(0, 6)}
                  <br />
                  <span className="text-gold-400">{displayed.slice(6)}</span>
                  {!done && displayed.length > 0 && <span className="animate-pulse text-gold-400">|</span>}
                </>
              )}
            </h1>

            <p className={`hidden md:block text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-3 leading-relaxed transition-opacity duration-700 ${done ? "opacity-100" : "opacity-0"}`}>
              Ackiss Homes delivers exceptional real estate experiences — whether
              you&apos;re buying, selling, or investing.
            </p>
            <p className={`text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed transition-opacity duration-700 ${done ? "opacity-100" : "opacity-0"}`}>
              Tell us what you&apos;re looking for — beds, baths, price range, and more —
              and we&apos;ll search the full MLS to find homes that match. Free, no obligation.
            </p>

            <a
              href="#property-inquiry"
              className={`inline-block bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold px-12 py-5 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.3)] hover:shadow-[0_0_40px_rgba(201,149,46,0.6)] hover:scale-[1.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.97] transition-[transform,opacity,box-shadow] duration-700 mb-16 md:mb-20 ${
                done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Find My Home &rarr;
            </a>
          </>
        )}

        {/* ---- MOBILE: logo moment → fade + slide-up ---- */}
        {isMobile && (
          <>
            {/* Eyebrow */}
            <div
              className={`flex items-center justify-center gap-4 mb-8 ${mobileBase} ${logoPhase ? mobileVisible : mobileHidden}`}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="h-px w-12 bg-gold-500/60" />
              <p className="text-gold-400 uppercase tracking-[0.4em] text-xs">Virginia Beach &amp; All of Hampton Roads</p>
              <div className="h-px w-12 bg-gold-500/60" />
            </div>

            {/* Main headline */}
            <h1
              className={`text-6xl font-heading font-bold leading-[1.05] mb-8 tracking-tight ${mobileBase} ${logoPhase ? mobileVisible : mobileHidden}`}
              style={{ transitionDelay: "150ms" }}
            >
              Where
              <br />
              <span className="text-gold-400">Home Begins</span>
            </h1>

            {/* Body */}
            <p
              className={`text-base text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed ${mobileBase} ${logoPhase ? mobileVisible : mobileHidden}`}
              style={{ transitionDelay: "300ms" }}
            >
              Tell us what you&apos;re looking for — beds, baths, price range, and more —
              and we&apos;ll search the full MLS to find homes that match. Free, no obligation.
            </p>

            {/* CTA */}
            <a
              href="#property-inquiry"
              className={`inline-block bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold px-12 py-5 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.3)] hover:shadow-[0_0_40px_rgba(201,149,46,0.6)] hover:scale-[1.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.97] mb-16 ${mobileBase} ${logoPhase ? mobileVisible : mobileHidden}`}
              style={{ transitionDelay: "450ms" }}
            >
              Find My Home &rarr;
            </a>
          </>
        )}
      </div>
    </section>
  );
}
