"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { target: 200, suffix: "+", label: "Homes Sold" },
  { target: 15, suffix: "+", label: "Years Experience" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 50, suffix: "+", label: "5-Star Reviews" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading — left-aligned instead of centered */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 mb-20">
          <ScrollReveal direction="left">
            <div className="flex items-center gap-3 mb-4">
              <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Who We Are</p>
              <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
            </div>
            <SplitHeading className="text-4xl md:text-5xl font-heading font-bold">
              About Ackiss Homes
            </SplitHeading>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="md:pt-8">
              <p className="text-gray-400 leading-relaxed text-lg mb-6">
                At Ackiss Homes, we believe that finding the right property is
                about more than square footage and price — it&apos;s about finding a
                place where life happens. We bring a personalized, client-first
                approach to every transaction.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg">
                With deep local market knowledge and a commitment to integrity,
                we guide buyers, sellers, and investors through every step of the
                real estate journey. Our reputation is built on results,
                relationships, and trust.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats — offset row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:pl-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100} direction="scale">
              <div className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-8 text-center hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/15 hover:border-gold-500/50 transition-all duration-300 group">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 group-hover:w-full transition-all duration-500 ease-out" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
                  <span className="text-[6rem] font-heading font-bold text-gold-400/[0.06] leading-none">{stat.target}{stat.suffix}</span>
                </div>

                <p className="text-3xl md:text-4xl font-heading font-bold text-gold-400 mb-1 relative z-10">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wider relative z-10">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Decorative line */}
        <ScrollReveal>
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
