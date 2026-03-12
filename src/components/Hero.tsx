"use client";

// Hero design: Option D (typographic — no photo, pure dark luxury)
// Option C (full-bleed photo + floating cards) is in git history — see CLAUDE.md

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 200, suffix: "+", label: "Homes Sold" },
  { target: 10,  suffix: "+", label: "Years Experience" },
  { target: 50,  suffix: "+", label: "5-Star Reviews" },
];


function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

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
  const [revealed, setRevealed] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  // Trigger staggered reveal
  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  // Parallax on logo — desktop only (mobile would override -translate-x-1/2)
  useEffect(() => {
    if (prefersReducedMotion) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;
    function handleScroll() {
      if (logoRef.current) {
        logoRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // Fade-up for existing hero content (unchanged)
  const r = (delay: number, lift = 12) => ({
    style: {
      opacity: revealed ? 1 : 0,
      transform: revealed ? "translateY(0)" : `translateY(${lift}px)`,
      transitionDelay: `${delay}ms`,
    },
    className: "transition-[transform,opacity] duration-700 ease-out",
  });


  return (
    <section
      id="hero"
      className="relative min-h-screen md:min-h-0 flex items-start justify-center overflow-hidden bg-black"
    >
      {/* Faint radial glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,149,46,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Logo watermark — UNCHANGED */}
      <div
        ref={logoRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[16rem]
        flex items-center will-change-transform pointer-events-none
        opacity-[0.4] md:opacity-[0.75]"
      >
        <Image src="/logo-a-v2.svg" alt="" width={788} height={716}
          className="w-[65vw] md:w-[30rem] h-auto object-contain mix-blend-lighten
          [mask-image:linear-gradient(to_right,transparent,black_12%)]"
          priority />
      </div>

      {/* Grain texture — UNCHANGED */}
      <div className="absolute inset-0 hero-grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* ── HERO CONTENT ── */}
      <div className="flex items-start justify-center px-6 pt-24 pb-24 md:pb-6">
        <div className="relative text-center max-w-5xl mx-auto">

          {/* Eyebrow */}
          <div {...r(0)} className={`${r(0).className} flex items-center justify-center gap-4 mb-8`}>
            <div className="h-px w-12 bg-gold-500/60" />
            <p className="text-gold-400 uppercase tracking-[0.4em] text-xs">Virginia Beach &amp; All of Hampton Roads</p>
            <div className="h-px w-12 bg-gold-500/60" />
          </div>

          {/* Headline — two lines reveal independently */}
          <h1 className="text-6xl md:text-8xl font-heading font-bold leading-[1.05] mb-8 tracking-tight">
            <span {...r(60, 20)} className={`${r(60, 20).className} block`}>
              Where
            </span>
            <span {...r(150, 20)} className={`${r(150, 20).className} block text-gold-400`}>
              Home Begins
            </span>
          </h1>

          {/* Brand copy */}
          <p {...r(250)} className={`${r(250).className} text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-5 leading-relaxed`}>
            At Ackiss Homes, we believe that finding the right property is about more than square footage and price - it&apos;s about finding a place where life happens. We bring a personalized, client-first approach to every transaction.
          </p>
          <p {...r(340)} className={`${r(340).className} text-base md:text-lg text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed`}>
            With deep local market knowledge and a commitment to integrity, we guide buyers, sellers, and investors through every step of the real estate journey. Our reputation is built on results, relationships, and trust.
          </p>

          {/* Stats */}
          <div {...r(430)} className={`${r(430).className} flex justify-center gap-10 md:gap-16 mb-5`}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-gold-400">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </p>
                <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mt-1.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Zillow review links */}
          <div {...r(520)} className={`${r(520).className} flex flex-wrap items-center justify-center gap-3`}>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">Verified reviews on</span>
            <div className="h-px w-4 bg-gold-500/30" />
            <a
              href="https://www.zillow.com/profile/amanda5867"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors duration-300"
            >
              <svg className="w-3.5 h-3.5 text-gold-500/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Zillow — Amanda
            </a>
            <span className="text-gray-700">·</span>
            <a
              href="https://www.zillow.com/profile/jeremy2621"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-gray-500 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors duration-300"
            >
              <svg className="w-3.5 h-3.5 text-gold-500/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              Zillow — Jeremy
            </a>
          </div>

          {/* Scroll indicator */}
          <div {...r(620)} className={`${r(620).className} flex justify-center mt-8`} aria-hidden="true">
            <div className="flex flex-col items-center gap-1.5 text-gold-400/40">
              <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
              <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
