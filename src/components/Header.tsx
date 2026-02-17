"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Neighborhoods", href: "#neighborhoods" },
  { label: "Mortgage\nCalculator", href: "#calculator" },
  { label: "Listings", href: "#listings" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Social", href: "#social" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-dark-900/90 backdrop-blur-md border-b border-dark-600/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3 shrink-0">
          <Image src="/logo.png" alt="Ackiss Homes" width={40} height={40} className="rounded-sm" />
          <span className="text-2xl font-heading font-bold text-gold-400 tracking-wide whitespace-nowrap">
            Ackiss Homes
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors duration-300 text-center leading-tight"
            >
              {link.label.includes("\n") ? (
                <>
                  <span className="block text-[0.6rem] tracking-[0.2em]">{link.label.split("\n")[0]}</span>
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 transition-colors"
            >
              {link.label.replace("\n", " ")}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
