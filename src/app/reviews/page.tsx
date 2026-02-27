"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// TODO: Replace with real Google Business Profile review URL once GBP is set up
// Format: https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=PLACEHOLDER";

const agents = {
  amanda: {
    name: "Amanda",
    zillowUrl: "https://www.zillow.com/profile/amanda5867#reviews",
  },
  jeremy: {
    name: "Jeremy",
    zillowUrl: "https://www.zillow.com/profile/jeremy2621#reviews",
  },
};

export default function ReviewsPage() {
  const [agent, setAgent] = useState<"amanda" | "jeremy" | null>(null);

  const zillowUrl = agent ? agents[agent].zillowUrl : null;

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Ambient gold glow — slightly more expressive than the main site */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(201,149,46,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Grain */}
      <div className="fixed inset-0 hero-grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Minimal header */}
      <header className="relative z-10 border-b border-white/5 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:opacity-70">
            <Image src="/logo.png" alt="Ackiss Homes" width={36} height={33} className="opacity-90" />
            <div>
              <div className="text-white font-heading font-bold text-base leading-none tracking-wide">Ackiss Homes</div>
              <div className="text-gold-500 text-[9px] uppercase tracking-[0.25em] mt-0.5">Virginia Beach &amp; Hampton Roads</div>
            </div>
          </Link>
          <Link
            href="/"
            className="text-xs text-gray-500 uppercase tracking-widest hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {/* Key icon */}
          <div className="flex justify-center mb-8" aria-hidden="true">
            <div className="relative">
              <div
                className="absolute inset-0 blur-2xl opacity-50"
                style={{ background: "radial-gradient(circle, rgba(201,149,46,0.5) 0%, transparent 70%)" }}
              />
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="relative drop-shadow-[0_0_12px_rgba(201,149,46,0.4)]">
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
          <h1 className="font-heading font-bold text-5xl md:text-6xl text-center leading-[1.05] tracking-tight text-white mb-5">
            You&apos;re Home.
          </h1>

          {/* Body */}
          <p className="text-gray-400 text-center leading-relaxed text-sm max-w-sm mx-auto mb-2">
            It&apos;s been a privilege to be part of your journey. If we delivered on that promise, a quick review makes a world of difference — it helps the next family find us when they need it most.
          </p>
          <p className="text-center text-[11px] text-gray-600 uppercase tracking-[0.2em] mb-10">
            Takes less than 2 minutes
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent mb-10" />

          {/* Step 1 — Agent selection */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 text-center mb-4">
              Who was your agent?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {(["amanda", "jeremy"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAgent(key)}
                  className={`py-3 rounded-sm text-sm uppercase tracking-wider font-semibold border transition-[background-color,border-color,color,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 ${
                    agent === key
                      ? "bg-gold-500 border-gold-500 text-dark-900"
                      : "border-dark-600 text-gray-400 hover:border-gold-500/50 hover:text-gold-400"
                  }`}
                >
                  {agents[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Review CTAs */}
          <div className="space-y-3">

            {/* Google — primary */}
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-sm bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold text-sm uppercase tracking-widest shadow-[0_0_24px_rgba(201,149,46,0.25)] hover:shadow-[0_0_40px_rgba(201,149,46,0.45)] active:scale-[0.98] transition-[background-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.706 17.64 9.2z" fill="#1a1a1a"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#1a1a1a"/>
                <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#1a1a1a"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#1a1a1a"/>
              </svg>
              Leave a Google Review
            </a>

            {/* Zillow — secondary, activates after agent is selected */}
            <a
              href={zillowUrl ?? "#"}
              target={zillowUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              onClick={!zillowUrl ? (e) => e.preventDefault() : undefined}
              aria-disabled={!zillowUrl}
              className={`flex items-center justify-center gap-3 w-full py-4 rounded-sm border text-sm uppercase tracking-widest font-semibold active:scale-[0.98] transition-[border-color,color,opacity,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                zillowUrl
                  ? "border-dark-600 text-gray-300 hover:border-gold-500/40 hover:text-gold-400 cursor-pointer"
                  : "border-dark-700 text-gray-700 cursor-not-allowed"
              }`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2L2 9.5h3V22h14V9.5h3L12 2zm0 2.8l7.5 5.7H4.5L12 4.8zM7 20V11.5h10V20H7z"/>
              </svg>
              {agent
                ? `Zillow Review — ${agents[agent].name}`
                : "Zillow Review"}
            </a>

            {!agent && (
              <p className="text-center text-[10px] text-gray-700 uppercase tracking-wider pt-0.5">
                Select your agent above to unlock the right Zillow link
              </p>
            )}
          </div>

          {/* Sign-off */}
          <p className="text-center text-[11px] text-gray-700 mt-12 leading-relaxed">
            Thank you for trusting Ackiss Homes with one of life&apos;s biggest moments.
          </p>

        </div>
      </main>
    </div>
  );
}
