"use client";

import { useEffect } from "react";
import Script from "next/script";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Add Instagram reel URLs here as they come in
const reels = [
  "https://www.instagram.com/reel/DU8NPEQDUTA/",
  "https://www.instagram.com/reel/DPmfalsjxQ1/",
];

export default function SocialFeed() {
  useEffect(() => {
    // If embed.js already loaded before this component mounted, process manually
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section id="social" className="py-20 px-6 bg-dark-800 section-texture">
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => window.instgrm?.Embeds?.process()}
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
              <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">See Us In Action</p>
              <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
            </div>
          </ScrollReveal>
          <SplitHeading className="text-4xl md:text-5xl font-heading font-bold">
            Featured Videos
          </SplitHeading>
          <ScrollReveal delay={200}>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              {"Most agents put up a sign. We put your home on a stage."}<br /><br /><span className="text-gold-400">{"We go the extra mile to get your home the extra views."}</span>
            </p>
            <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">

              {/* LIGHTS */}
              <div className="flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  {/* Glow */}
                  <circle cx="20" cy="13" r="12" fill="rgba(255,255,255,0.05)"/>
                  {/* Outer glow edge */}
                  <path d="M 11 21 A 12 12 0 1 0 29 21 L 27 27 L 13 27 Z" stroke="rgba(255,255,255,0.25)" strokeWidth="5" fill="none"/>
                  {/* Bulb globe — white edge */}
                  <path d="M 11 21 A 12 12 0 1 0 29 21 L 27 27 L 13 27 Z" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.18)"/>
                  {/* Filament — W shape */}
                  <path d="M 14 19 Q 16 13 18 17 Q 20 21 22 17 Q 24 13 26 19" stroke="#f9fafb" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  {/* Base collar + 3 ridges */}
                  <line x1="13" y1="27" x2="27" y2="27" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="14" y1="30" x2="26" y2="30" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="15" y1="33" x2="25" y2="33" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="16" y1="36" x2="24" y2="36" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* 7 rays evenly at 30° intervals from −90° to +90°, computed from center (20,13) */}
                  {/* −90° left  */}<line x1="8" y1="13" x2="5" y2="13" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  {/* −60°       */}<line x1="10" y1="7" x2="8" y2="4.5" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  {/* −30°       */}<line x1="14" y1="3" x2="13" y2="0.5" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  {/* 0° top     */}<line x1="20" y1="1" x2="20" y2="−1.5" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  {/* +30°       */}<line x1="26" y1="3" x2="27" y2="0.5" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  {/* +60°       */}<line x1="30" y1="7" x2="32" y2="4.5" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  {/* +90° right */}<line x1="32" y1="13" x2="35" y2="13" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                </svg>
                <span className="text-gray-400 text-xs uppercase tracking-[0.35em] font-semibold">Lights</span>
              </div>

              <div className="h-px w-6 bg-gray-600/50 self-center flex-shrink-0" />

              {/* CAMERA */}
              <div className="flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  {/* Lens barrel — extends left from body */}
                  <rect x="2" y="17" width="10" height="8" rx="2" stroke="#9ca3af" strokeWidth="1.5" fill="rgba(156,163,175,0.08)"/>
                  {/* Zoom / focus ring on barrel */}
                  <line x1="7" y1="17" x2="7" y2="25" stroke="#9ca3af" strokeWidth="1" opacity="0.55"/>
                  {/* Main camera body */}
                  <rect x="10" y="13" width="18" height="16" rx="1.5" stroke="#9ca3af" strokeWidth="1.5" fill="rgba(156,163,175,0.08)"/>
                  {/* Top carry handle — arched over body */}
                  <path d="M 12 13 Q 19 5 26 13" stroke="#9ca3af" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  {/* Rear viewfinder / eyepiece */}
                  <rect x="28" y="15" width="9" height="6" rx="1" stroke="#9ca3af" strokeWidth="1.2" fill="rgba(156,163,175,0.06)"/>
                  {/* Shotgun microphone on top-front */}
                  <rect x="12" y="8" width="7" height="3" rx="1.5" stroke="#9ca3af" strokeWidth="1.2" fill="rgba(156,163,175,0.06)"/>
                  {/* Mic mount brackets */}
                  <line x1="14.5" y1="11" x2="14.5" y2="13" stroke="#9ca3af" strokeWidth="1"/>
                  <line x1="17" y1="11" x2="17" y2="13" stroke="#9ca3af" strokeWidth="1"/>
                </svg>
                <span className="text-gray-400 text-xs uppercase tracking-[0.35em] font-semibold">Camera</span>
              </div>

              <div className="h-px w-6 bg-gray-600/50 self-center flex-shrink-0" />

              {/* SOLD */}
              <div className="flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  {/* House roof */}
                  <path d="M 4 20 L 20 5 L 36 20" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* House body */}
                  <rect x="7" y="20" width="26" height="16" rx="1.5" stroke="#9ca3af" strokeWidth="1.5" fill="rgba(156,163,175,0.08)"/>
                  {/* Checkmark */}
                  <path d="M 13 28 L 18 33 L 27 22" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-400 text-xs uppercase tracking-[0.35em] font-semibold">Sold</span>
              </div>

            </div>
          </ScrollReveal>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {reels.map((url, i) => (
            <ScrollReveal key={url} delay={i * 75}>
              <div className="overflow-hidden rounded-sm border border-dark-600/50 hover:border-gold-500/50 transition-colors duration-300 bg-white w-[340px]">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                  data-instgrm-version="14"
                  style={{ margin: 0, minWidth: "100%", width: "calc(100% - 2px)" }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
