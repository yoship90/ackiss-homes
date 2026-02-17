"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageIntro() {
  const [phase, setPhase] = useState<"visible" | "shimmer" | "exit" | "done">("visible");

  useEffect(() => {
    const shimmerTimer = setTimeout(() => setPhase("shimmer"), 300);
    const exitTimer = setTimeout(() => setPhase("exit"), 900);
    const doneTimer = setTimeout(() => setPhase("done"), 1700);

    return () => {
      clearTimeout(shimmerTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-dark-900 ${
        phase === "exit" ? "animate-intro-exit pointer-events-none" : ""
      }`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={1200}
        height={1200}
        className="w-[70vw] max-w-[800px] h-auto object-contain animate-intro-logo-in"
        priority
      />

      {/* Gold shimmer sweep */}
      {phase === "shimmer" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[70vw] max-w-[800px] overflow-hidden">
            <div className="animate-intro-shimmer absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" style={{ height: "100vh" }} />
          </div>
        </div>
      )}
    </div>
  );
}
