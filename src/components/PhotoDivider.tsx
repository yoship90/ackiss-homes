"use client";

import { useEffect, useRef } from "react";

export default function PhotoDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const offset = (rect.top / window.innerHeight) * -40;
        ref.current.style.backgroundPositionY = `${offset}px`;
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-[20rem] overflow-hidden">
      <div
        ref={ref}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-dark-900/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900" />
    </div>
  );
}
