"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "contact",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20 px-6 relative overflow-hidden">
      {/* Radial warm background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(201,149,46,0.045) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto">
        {/* Heading — right-aligned to contrast with About's left-aligned heading */}
        <div className="grid md:grid-cols-[3fr_2fr] gap-8 mb-16">
          <div className="hidden md:block" />
          <div>
            <ScrollReveal direction="right">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
                <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Reach Out</p>
              </div>
            </ScrollReveal>
            <SplitHeading className="text-4xl md:text-5xl font-heading font-bold">
              Get in Touch
            </SplitHeading>
          </div>
        </div>

        <div className="grid md:grid-cols-[3fr_2fr] gap-12">
          {/* Contact form — takes more space */}
          <ScrollReveal direction="left">
            <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-gold-400 text-lg font-heading font-semibold mb-2">
                    Thank you!
                  </p>
                  <p className="text-gray-400">
                    We&apos;ve received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact us">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  {error && (
                    <p className="text-red-400/80 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-60 disabled:cursor-not-allowed text-dark-900 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.25)] hover:shadow-[0_0_30px_rgba(201,149,46,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-700 active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-300 cursor-pointer"
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Business info — narrower column, offset up */}
          <ScrollReveal direction="right">
            <div className="md:-mt-8 space-y-8">
              <div className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-6 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/15 hover:border-gold-500/50 transition-[transform,box-shadow,border-color] duration-300 group">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 group-hover:w-full transition-[width] duration-500 ease-out" aria-hidden="true" />
                <h3 className="text-lg font-heading font-semibold mb-3 text-gold-400">
                  Office
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  2135 General Booth Blvd, Suite 146
                  <br />
                  Virginia Beach, VA 23454
                </p>
              </div>
              <div className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-6 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/15 hover:border-gold-500/50 transition-[transform,box-shadow,border-color] duration-300 group">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 group-hover:w-full transition-[width] duration-500 ease-out" aria-hidden="true" />
                <h3 className="text-lg font-heading font-semibold mb-3 text-gold-400">
                  Contact Info
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Email:{" "}
                  <a href="mailto:ackisshomes@gmail.com" className="hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors">
                    ackisshomes@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
