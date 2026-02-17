"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: string;
  className?: string;
}

export default function SplitHeading({ children, className = "" }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // If already in the viewport on mount, reveal immediately
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.trim().split(/\s+/);

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[inherit]">
          <span
            className={`inline-block transition-all duration-500 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.4em]"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 && "\u00a0"}
        </span>
      ))}
    </h2>
  );
}
