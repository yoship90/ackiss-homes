import {
  Lora,
  Cormorant_Garamond,
  Cinzel,
  Italiana,
  Bodoni_Moda,
  Playfair_Display,
} from "next/font/google";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Font Comparison — Ackiss Homes",
  robots: { index: false, follow: false },
};

// ── Font instances ────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const cinzel     = Cinzel            ({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const italiana   = Italiana          ({ subsets: ["latin"], weight: ["400"],               display: "swap" });
const bodoni     = Bodoni_Moda       ({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const playfair   = Playfair_Display  ({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const lora       = Lora              ({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

const goldGradient =
  "linear-gradient(135deg, #d4a853 0%, #f5d89a 25%, #c9952e 50%, #f5d89a 75%, #d4a853 100%)";

// ── Font options ──────────────────────────────────────────────────────────────
const options = [
  {
    font: cormorant,
    name: "Cormorant Garamond",
    desc: "Ultra-refined, luxury fashion — think Vogue or high-end jewellery",
    badge: null,
  },
  {
    font: cinzel,
    name: "Cinzel",
    desc: "Architectural, classical Roman — engraved and unmistakably upscale",
    badge: null,
  },
  {
    font: italiana,
    name: "Italiana",
    desc: "Italian chic, fashion-forward — elegant and distinctly modern",
    badge: null,
  },
  {
    font: bodoni,
    name: "Bodoni Moda",
    desc: "Dramatic thick-thin contrast — high fashion, bold and confident",
    badge: null,
  },
  {
    font: playfair,
    name: "Playfair Display",
    desc: "Matches the site's section headings — cohesive and refined",
    badge: null,
  },
  {
    font: lora,
    name: "Lora",
    desc: "Warm editorial serif — classic and readable",
    badge: "Currently Live" as const,
  },
];

// ── Card component ────────────────────────────────────────────────────────────
function FontCard({
  font,
  name,
  desc,
  badge,
}: {
  font: { className: string };
  name: string;
  desc: string;
  badge: "Currently Live" | "Original" | null;
}) {
  return (
    <div className="flex flex-col gap-6 bg-[#111111] border border-[#242424] hover:border-[#c9952e]/50 transition-[border-color] duration-300 p-8">

      {/* Large display sample */}
      <div className="text-center py-2">
        <span
          className={`${font.className} text-[3.5rem] leading-none font-semibold bg-clip-text text-transparent select-none`}
          style={{ backgroundImage: goldGradient }}
        >
          Ackiss
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9952e]/20 to-transparent" />

      {/* Mini header lockup */}
      <div className="flex items-center justify-center gap-3 py-3 px-4 bg-[#0a0a0a] border border-[#1c1c1c]">
        <Image
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          className="mix-blend-lighten drop-shadow-[0_0_6px_rgba(201,149,46,0.3)]"
        />
        <div className="h-6 w-px bg-[#c9952e]/40 shrink-0" />
        <div className="flex flex-col leading-none gap-1">
          <div className="flex items-baseline gap-2">
            <span
              className={`${font.className} text-[1.25rem] font-semibold tracking-[0.06em] bg-clip-text text-transparent`}
              style={{ backgroundImage: goldGradient }}
            >
              Ackiss
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-[#c9952e]/65" style={{ fontFamily: "Inter, sans-serif" }}>
              Homes
            </span>
          </div>
          <p className="text-[0.48rem] text-[#555] uppercase tracking-[0.18em]" style={{ fontFamily: "Inter, sans-serif" }}>
            Real Estate Services · Brokered by Triumph Realty
          </p>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <p className="text-[0.9rem] font-medium text-gray-200">{name}</p>
          {badge && (
            <span
              className={`text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 ${
                badge === "Currently Live"
                  ? "bg-[#c9952e]/15 text-[#c9952e] border border-[#c9952e]/30"
                  : "bg-[#333]/60 text-gray-500 border border-[#333]"
              }`}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-[0.72rem] text-gray-600 leading-relaxed max-w-[220px] mx-auto">{desc}</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function FontPicker() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-[#c9952e]/50" />
            <p className="text-[#c9952e] uppercase tracking-[0.4em] text-[0.7rem]">Brand Identity</p>
            <div className="h-px w-10 bg-[#c9952e]/50" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Font Comparison
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            Each card shows the same brand lockup in a different typeface.
            Pick your favourite for the <span className="text-gray-400">Ackiss</span> wordmark.
          </p>
        </div>

        {/* Font grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((opt) => (
            <FontCard key={opt.name} {...opt} />
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-[0.65rem] text-gray-700 uppercase tracking-[0.2em] mt-10">
          All other styling — colour, weight, sizing — stays exactly the same
        </p>
      </div>
    </div>
  );
}
