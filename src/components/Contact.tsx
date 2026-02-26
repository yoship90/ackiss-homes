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
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us at ackisshomes@gmail.com.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Radial warm background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(201,149,46,0.045) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-3xl mx-auto">
        {/* Heading — centered above the form */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
              <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Contact Us</p>
              <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
            </div>
          </ScrollReveal>
          <SplitHeading className="text-4xl md:text-5xl font-heading font-bold">
            Let's Connect!
          </SplitHeading>
        </div>

        {/* Contact form — full width, centered */}
        <ScrollReveal>
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
                    <label htmlFor="contact-first-name" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="contact-first-name"
                      name="firstName"
                      required
                      autoComplete="given-name"
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-last-name" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                      Last Name <span className="normal-case tracking-normal text-gray-600 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="contact-last-name"
                      name="lastName"
                      autoComplete="family-name"
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
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
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      autoComplete="tel"
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
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
      </div>
    </section>
  );
}
