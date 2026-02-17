"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fullText = "Find Your Dream Home";

export default function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  // Typed headline
  useEffect(() => {
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
  }, []);

  // Parallax on scroll
  useEffect(() => {
    function handleScroll() {
      if (logoRef.current) {
        const y = window.scrollY;
        logoRef.current.style.transform = `translateY(${y * 0.3}px)`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_200%] bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700" />

      {/* Logo background with parallax */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
      >
        <Image
          src="/logo.png"
          alt=""
          width={1200}
          height={1200}
          className="opacity-15 w-[70%] h-auto object-contain"
          priority
        />
      </div>

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-dark-900/40" />

      <div className="relative text-center max-w-3xl mx-auto">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6">
          Premium Real Estate
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
          className={`text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-opacity duration-700 ${
            done ? "opacity-100" : "opacity-0"
          }`}
        >
          Ackiss Homes delivers exceptional real estate experiences — whether
          you&apos;re buying, selling, or investing. Your next chapter starts here.
        </p>
        <a
          href="#contact"
          className={`inline-block bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-all duration-700 ${
            done ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
