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
              A closer look at our latest listings and the Hampton Roads communities we serve.
            </p>
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
