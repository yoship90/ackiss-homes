interface SectionDividerProps {
  from: "dark-900" | "dark-800";
  to: "dark-900" | "dark-800";
}

const colorMap = {
  "dark-900": "#0a0a0a",
  "dark-800": "#171717",
};

export default function SectionDivider({ from, to }: SectionDividerProps) {
  const fromColor = colorMap[from];
  const toColor = colorMap[to];

  return (
    <div className="relative w-full h-16 md:h-24 -my-px" aria-hidden="true">
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id={`gold-accent-${from}-${to}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9952e" stopOpacity="0" />
            <stop offset="30%" stopColor="#d4a853" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#c9952e" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#d4a853" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c9952e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Top fill (from color) */}
        <path
          d="M0,0 L1440,0 L1440,48 Q1080,96 720,64 Q360,32 0,56 L0,0Z"
          fill={fromColor}
        />

        {/* Bottom fill (to color) */}
        <path
          d="M0,56 Q360,32 720,64 Q1080,96 1440,48 L1440,96 L0,96Z"
          fill={toColor}
        />

        {/* Gold accent line along the curve */}
        <path
          d="M0,56 Q360,32 720,64 Q1080,96 1440,48"
          fill="none"
          stroke={`url(#gold-accent-${from}-${to})`}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
