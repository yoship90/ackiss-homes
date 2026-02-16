"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

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
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
              Who We Are
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              About Ackiss Homes
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
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
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 100} direction="right">
                <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-6 text-center">
                  <p className="text-3xl font-heading font-bold text-gold-400 mb-1">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                    />
                  </p>
                  <p className="text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
