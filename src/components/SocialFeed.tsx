import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

// To add a thumbnail: screenshot the reel, drop the image in /public/reels/,
// then set thumbnail to e.g. "/reels/reel-1.jpg"
const reels: { url: string; thumbnail: string | null }[] = [
  { url: "https://www.instagram.com/p/DU8NPEQDUTA/", thumbnail: "/reels-1.png" },
  { url: "https://www.instagram.com/p/C-7ndFNO9wj/",  thumbnail: null },
  { url: "https://www.instagram.com/p/DIT3kupu6Cp/",  thumbnail: null },
  { url: "https://www.instagram.com/p/DSH0N-SDvrP/",  thumbnail: null },
];

// Instagram logo SVG
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}

// Play button SVG
function PlayIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="23" stroke="rgba(201,149,46,0.5)" strokeWidth="1.5" fill="rgba(0,0,0,0.45)"/>
      <path d="M20 16l14 8-14 8V16z" fill="#d4a853"/>
    </svg>
  );
}

function ReelCard({ url, thumbnail }: { url: string; thumbnail: string | null }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-dark-600/50 hover:border-gold-500/50 transition-[border-color] duration-300 bg-dark-800"
    >
      {/* Thumbnail area — 9:16 portrait aspect ratio */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-dark-900">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt="Instagram reel"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 340px"
          />
        ) : (
          /* Placeholder — gold radial glow on dark bg */
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,149,46,0.08) 0%, transparent 70%)" }}
          >
            <div className="flex flex-col items-center gap-4 opacity-60 group-hover:opacity-90 transition-opacity duration-300">
              <PlayIcon />
            </div>
          </div>
        )}

        {/* Dark gradient at bottom for button legibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Instagram badge — top right */}
        <div className="absolute top-3 right-3 text-white/50 group-hover:text-gold-400/80 transition-colors duration-300">
          <InstagramIcon />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-dark-600/40">
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-gray-500">
          Watch on Instagram
        </span>
        <svg className="w-3.5 h-3.5 text-gold-500/60 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-[color,transform] duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}

export default function SocialFeed() {
  return (
    <section id="social" className="py-20 px-6 bg-dark-800 section-texture">
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
              {"Most agents put up a sign; Ackiss Homes puts your home on a stage."}<br /><br /><span className="text-gold-400">{"We go the extra mile to get your home the extra views."}</span>
            </p>
            <div className="grid grid-cols-2 place-items-center gap-x-10 gap-y-6 mt-10 w-fit mx-auto md:flex md:items-center md:justify-center md:gap-8 md:w-auto">

              {/* LIGHTS */}
              <div className="flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="13" r="12" fill="rgba(255,255,255,0.05)"/>
                  <path d="M 11 21 A 12 12 0 1 1 29 21 L 27 27 L 13 27 Z" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="rgba(255,255,255,0.35)" strokeLinejoin="round"/>
                  <path d="M 14 19 Q 16 13 18 17 Q 20 21 22 17 Q 24 13 26 19" stroke="#f9fafb" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <line x1="13" y1="27" x2="27" y2="27" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="14" y1="30" x2="26" y2="30" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="15" y1="33" x2="25" y2="33" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="16" y1="36" x2="24" y2="36" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="6.5" y1="13" x2="3.5" y2="13" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  <line x1="8.7" y1="6.2" x2="6.7" y2="3.7" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  <line x1="13.2" y1="1.7" x2="12.2" y2="-0.8" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  <line x1="20" y1="1" x2="20" y2="-1.5" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  <line x1="26.8" y1="1.7" x2="27.8" y2="-0.8" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  <line x1="31.3" y1="6.2" x2="33.3" y2="3.7" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                  <line x1="33.5" y1="13" x2="36.5" y2="13" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" opacity="0.65"/>
                </svg>
                <span className="text-gray-400 text-xs uppercase tracking-[0.35em] font-semibold">Lights</span>
              </div>

              <div className="hidden md:block h-px w-6 bg-gray-600/50 self-center flex-shrink-0" />

              {/* CAMERA */}
              <div className="flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <rect x="10" y="5" width="16" height="7" rx="1.5" stroke="#9ca3af" strokeWidth="1.5" fill="rgba(156,163,175,0.08)"/>
                  <circle cx="22" cy="8.5" r="1" fill="#9ca3af" opacity="0.55"/>
                  <circle cx="25" cy="8.5" r="1" fill="#9ca3af" opacity="0.55"/>
                  <rect x="2" y="11" width="26" height="22" rx="1.5" stroke="#9ca3af" strokeWidth="1.5" fill="rgba(156,163,175,0.08)"/>
                  <rect x="4" y="13" width="14" height="17" rx="1" stroke="#9ca3af" strokeWidth="1.2" fill="rgba(156,163,175,0.05)"/>
                  <line x1="6" y1="28" x2="13" y2="15" stroke="#9ca3af" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
                  <line x1="10" y1="29" x2="17" y2="16" stroke="#9ca3af" strokeWidth="1.2" opacity="0.5" strokeLinecap="round"/>
                  <rect x="20" y="14" width="6" height="7" rx="1" stroke="#9ca3af" strokeWidth="1.2" fill="rgba(156,163,175,0.06)"/>
                  <rect x="20" y="23" width="6" height="7" rx="1" stroke="#9ca3af" strokeWidth="1.2" fill="rgba(156,163,175,0.06)"/>
                  <path d="M 28 16 L 38 13 L 38 28 L 28 26 Z" stroke="#9ca3af" strokeWidth="1.5" fill="rgba(156,163,175,0.06)"/>
                  <rect x="7" y="33" width="5" height="2.5" rx="0.5" stroke="#9ca3af" strokeWidth="1" fill="rgba(156,163,175,0.08)"/>
                  <rect x="17" y="33" width="5" height="2.5" rx="0.5" stroke="#9ca3af" strokeWidth="1" fill="rgba(156,163,175,0.08)"/>
                </svg>
                <span className="text-gray-400 text-xs uppercase tracking-[0.35em] font-semibold">Camera</span>
              </div>

              <div className="hidden md:block h-px w-6 bg-gray-600/50 self-center flex-shrink-0" />

              {/* SOLD */}
              <div className="col-span-2 md:col-auto flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path d="M 4 20 L 20 5 L 36 20" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="7" y="20" width="26" height="16" rx="1.5" stroke="#9ca3af" strokeWidth="1.5" fill="rgba(156,163,175,0.08)"/>
                  <path d="M 13 28 L 18 33 L 27 22" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-gray-400 text-xs uppercase tracking-[0.35em] font-semibold">Sold</span>
              </div>

            </div>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {reels.map((reel, i) => (
            <ScrollReveal key={reel.url} delay={i * 75}>
              <ReelCard {...reel} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
