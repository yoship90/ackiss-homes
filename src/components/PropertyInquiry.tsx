"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

const perks = [
  "Live, fresh listing data — not 24–48 hrs stale",
  "Full price reduction & days-on-market history",
  "Comparable sales in the neighborhood",
  "Disclosure info & showing availability",
  "Local insight from agents who know the area",
];

export default function PropertyInquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [mlsId, setMlsId] = useState("");
  const [propertyError, setPropertyError] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!address.trim() && !mlsId.trim()) {
      setPropertyError(true);
      return;
    }
    setPropertyError(false);
    setSubmitted(true);
  }

  return (
    <section id="property-inquiry" className="py-20 px-6 relative overflow-hidden">
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(201,149,46,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — value proposition */}
          <div>
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Free MLS Lookup</p>
                <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
              </div>
            </ScrollReveal>

            <SplitHeading className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Browsing Homes Online?
            </SplitHeading>

            <ScrollReveal direction="left" delay={150}>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                Found a home you love online? Before you make any moves, let us
                pull live, fresh MLS data — the details the listing sites aren&apos;t showing you.
              </p>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-gray-300">
                    <svg
                      className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal direction="right">
            <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-gold-400 text-lg font-heading font-semibold mb-2">
                    We&apos;re on it!
                  </p>
                  <p className="text-gray-400">
                    We&apos;ll pull the fresh MLS data and reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" aria-label="Property MLS inquiry">
                  {/* Address OR MLS ID — either/or required */}
                  <div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <label htmlFor="inquiry-address" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                          Property Address
                        </label>
                        <input
                          type="text"
                          id="inquiry-address"
                          name="address"
                          value={address}
                          onChange={(e) => { setAddress(e.target.value); setPropertyError(false); }}
                          className={`w-full bg-dark-800 border rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors ${propertyError ? "border-red-500/70" : "border-dark-600"}`}
                          placeholder="123 Main St, Virginia Beach, VA"
                        />
                      </div>
                      <span className="text-xs text-gray-600 uppercase tracking-widest pb-3.5">or</span>
                      <div className="w-28">
                        <label htmlFor="inquiry-mls" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                          MLS ID #
                        </label>
                        <input
                          type="text"
                          id="inquiry-mls"
                          name="mls_id"
                          value={mlsId}
                          onChange={(e) => { setMlsId(e.target.value); setPropertyError(false); }}
                          className={`w-full bg-dark-800 border rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors ${propertyError ? "border-red-500/70" : "border-dark-600"}`}
                          placeholder="10054321"
                        />
                      </div>
                    </div>
                    {propertyError && (
                      <p className="text-red-400/80 text-xs mt-1.5">Please enter a property address or MLS ID.</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="inquiry-name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiry-phone" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        name="phone"
                        required
                        autoComplete="tel"
                        className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                      Email <span className="text-gray-600 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="inquiry-email"
                      name="email"
                      autoComplete="email"
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.25)] hover:shadow-[0_0_30px_rgba(201,149,46,0.4)] transition-all duration-300 cursor-pointer"
                  >
                    Get Live MLS Data &rarr;
                  </button>
                  <p className="text-xs text-gray-600 text-center">
                    No obligation.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
