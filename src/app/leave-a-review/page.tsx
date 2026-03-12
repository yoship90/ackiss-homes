"use client";

import { useState, useEffect } from "react";
import PasswordGate, { INTERNAL_AUTH_KEY } from "@/components/PasswordGate";
import Header from "@/components/Header";

// TODO: Replace with real Google Business Profile review URL once GBP is set up
// Format: https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=PLACEHOLDER";

export default function ReviewsPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(INTERNAL_AUTH_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Ambient gold glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(201,149,46,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Grain */}
      <div className="fixed inset-0 hero-grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <Header />

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pt-20 pb-16">
        <div className="w-full max-w-md md:max-w-lg">

          {/* Key icon */}
          <div className="flex justify-center mb-8 md:mb-10" aria-hidden="true">
            <div className="relative">
              <div
                className="absolute inset-0 blur-2xl opacity-50"
                style={{ background: "radial-gradient(circle, rgba(201,149,46,0.5) 0%, transparent 70%)" }}
              />
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="relative md:w-16 md:h-16 drop-shadow-[0_0_12px_rgba(201,149,46,0.4)]">
                <circle cx="19" cy="19" r="12" stroke="#c9952e" strokeWidth="2.5" fill="none" />
                <circle cx="19" cy="19" r="5.5" fill="rgba(201,149,46,0.2)" stroke="#c9952e" strokeWidth="1.5" />
                <line x1="28" y1="28" x2="44" y2="44" stroke="#c9952e" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="38" y1="40" x2="38" y2="46" stroke="#c9952e" strokeWidth="2" strokeLinecap="round" />
                <line x1="43" y1="44" x2="43" y2="48" stroke="#c9952e" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-8 bg-gold-500/40" />
            <p className="text-gold-400 uppercase tracking-[0.35em] text-[10px]">Congratulations</p>
            <div className="h-px w-8 bg-gold-500/40" />
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold text-5xl md:text-7xl text-center leading-[1.05] tracking-tight text-white mb-5 md:mb-7">
            You&apos;re Home.
          </h1>

          {/* Body */}
          <p className="text-gray-400 text-center leading-relaxed text-sm md:text-base max-w-sm md:max-w-md mx-auto mb-2">
            It&apos;s been a privilege to be part of your journey. If we delivered on that promise, a quick review makes a world of difference — it helps the next family find us when they need it most.
          </p>
          <p className="text-center text-[11px] text-gray-600 uppercase tracking-[0.2em] mb-10 md:mb-12">
            Takes less than 2 minutes
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent mb-10 md:mb-12" />

          {/* Google Review CTA */}
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer btn-shimmer-filled flex items-center justify-center gap-3 w-full py-4 md:py-5 rounded-sm text-dark-900 font-semibold text-sm md:text-base uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:scale-[1.015] active:scale-[0.97] transition-transform duration-300"
          >
            <span className="relative z-[2] flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.706 17.64 9.2z" fill="#1a1a1a"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#1a1a1a"/>
                <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#1a1a1a"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#1a1a1a"/>
              </svg>
              Leave a Google Review
            </span>
          </a>

          {/* Sign-off */}
          <p className="text-center text-[11px] text-gray-700 mt-10 md:mt-14 leading-relaxed">
            Thank you for trusting Ackiss Homes with one of life&apos;s biggest moments.
          </p>

        </div>
      </main>
    </div>
  );
}
