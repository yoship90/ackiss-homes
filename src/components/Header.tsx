"use client";

import { useState } from "react";
import Image from "next/image";

const leftNav = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Neighborhoods", href: "#neighborhoods" },
];

const rightNav = [
  { label: "Mortgage\nCalculator", href: "#calculator" },
  { label: "Listings", href: "#listings" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Social", href: "#social" },
  { label: "Contact", href: "#contact" },
];

const allLinks = [...leftNav, ...rightNav];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark-900/90 backdrop-blur-md border-b border-dark-600/50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 shrink-0">
          <Image src="/logo.png" alt="Ackiss Homes" width={68} height={68} className="mix-blend-lighten drop-shadow-[0_0_8px_rgba(201,149,46,0.4)]" />
          <span
            className="font-brand text-[1.8rem] font-semibold tracking-[0.08em] whitespace-nowrap bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #d4a853 0%, #f5d89a 25%, #c9952e 50%, #f5d89a 75%, #d4a853 100%)",
            }}
          >
            Ackiss{" "}<span className="-ml-[0.15em]">Homes</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 ml-8">
          {allLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.82rem] uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors duration-300 text-center leading-tight"
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
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-gold-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
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
        <nav className="md:hidden bg-dark-800 border-t border-dark-600/50 px-6 pb-4">
          {allLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
