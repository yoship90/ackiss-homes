"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const leftNav = [
  { label: "Services", href: "#services" },
];

const rightNav = [
  { label: "Payment\nCalculator", href: "#calculator" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Social", href: "#social" },
  { label: "Contact", href: "#contact" },
];

const communities = [
  "Virginia Beach",
  "Chesapeake",
  "Suffolk",
  "Portsmouth",
  "Newport News",
  "Hampton",
  "Yorktown",
  "Williamsburg",
];

const allLinks = [...leftNav, ...rightNav];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const [mobileCommunitiesOpen, setMobileCommunitiesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openCommunities() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCommunitiesOpen(true);
  }
  function closeCommunities() {
    closeTimer.current = setTimeout(() => setCommunitiesOpen(false), 150);
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark-900/90 backdrop-blur-md border-b border-dark-600/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 shrink-0">
          <Image src="/logo.png" alt="Ackiss Homes" width={48} height={48} className="mix-blend-lighten drop-shadow-[0_0_8px_rgba(201,149,46,0.4)]" />
          {/* Thin vertical divider */}
          <div className="h-7 w-px bg-gold-500/40 shrink-0" aria-hidden="true" />
          {/* Stacked brand name */}
          <div className="flex flex-col leading-none gap-1 whitespace-nowrap">
            <div className="flex items-baseline gap-2">
              <span
                className="font-brand text-[1.35rem] font-semibold tracking-[0.06em] bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #d4a853 0%, #f5d89a 25%, #c9952e 50%, #f5d89a 75%, #d4a853 100%)",
                }}
              >
                Ackiss
              </span>
              <span className="font-body text-[0.65rem] uppercase tracking-[0.3em] text-gold-400/65">
                Homes
              </span>
            </div>
            <p className="text-[0.55rem] text-gray-500 uppercase tracking-[0.2em] flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-x-1.5">
              <span>Real Estate Services</span>
              <span className="hidden md:inline-block w-px h-2.5 bg-gold-500/50" aria-hidden="true" />
              <span>Brokered by Triumph Realty</span>
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-5 ml-8">
          {leftNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.82rem] uppercase tracking-widest text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Communities dropdown */}
          <div
            className="relative"
            onMouseEnter={openCommunities}
            onMouseLeave={closeCommunities}
          >
            <button className="text-[0.82rem] uppercase tracking-widest text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors duration-300 flex items-center gap-1 cursor-pointer">
              Communities
              <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {communitiesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-dark-800 border border-dark-600/50 rounded-sm py-2 min-w-[180px] z-50 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                {communities.map((city) => (
                  <span
                    key={city}
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-gold-400 hover:bg-dark-700 uppercase tracking-wider transition-colors duration-150 cursor-pointer"
                  >
                    {city}
                  </span>
                ))}
              </div>
            )}
          </div>

          {rightNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.82rem] uppercase tracking-widest text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors duration-300 text-center leading-tight"
            >
              {link.label.includes("\n") ? (
                <>
                  <span className="block text-[0.55rem] tracking-[0.2em]">{link.label.split("\n")[0]}</span>
                  <span className="block">{link.label.split("\n")[1]}</span>
                </>
              ) : (
                link.label
              )}
            </a>
          ))}

          {/* Find My Home CTA */}
          <a
            href="#property-inquiry"
            className="ml-2 px-4 py-1.5 text-[0.75rem] uppercase tracking-widest whitespace-nowrap text-gold-400 border border-gold-500/60 hover:bg-gold-500 hover:text-dark-900 hover:border-gold-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1 focus-visible:ring-offset-dark-900 active:scale-95 transition-[background-color,color,border-color,transform] duration-200"
          >
            Find My Home
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1 focus-visible:ring-offset-dark-900 active:scale-90 transition-[transform,color] duration-150 rounded-sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav aria-label="Mobile navigation" className="md:hidden bg-dark-800 border-t border-dark-600/50 px-6 pb-4">
          {leftNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Communities accordion */}
          <button
            onClick={() => setMobileCommunitiesOpen(!mobileCommunitiesOpen)}
            className="flex items-center justify-between w-full py-3 text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors"
          >
            Communities
            <svg className={`w-3 h-3 opacity-60 transition-transform duration-200 ${mobileCommunitiesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileCommunitiesOpen && (
            <div className="pl-4 pb-2 border-l border-dark-600/50 ml-1">
              {communities.map((city) => (
                <span
                  key={city}
                  className="block py-2 text-sm uppercase tracking-widest text-gray-500"
                >
                  {city}
                </span>
              ))}
            </div>
          )}

          {rightNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
