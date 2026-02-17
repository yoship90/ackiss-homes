"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading — right-aligned to contrast with About's left-aligned heading */}
        <div className="grid md:grid-cols-[3fr_2fr] gap-8 mb-16">
          <div className="hidden md:block" />
          <ScrollReveal direction="right">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
              Reach Out
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Get in Touch
            </h2>
          </ScrollReveal>
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
                  <button
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Business info — narrower column, offset up */}
          <ScrollReveal direction="right">
            <div className="md:-mt-8 space-y-8">
              <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-6 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/5 hover:border-gold-500/30 transition-all duration-300">
                <h3 className="text-lg font-heading font-semibold mb-3 text-gold-400">
                  Office
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  123 Main Street, Suite 200
                  <br />
                  Your City, State 12345
                </p>
              </div>
              <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-6 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/5 hover:border-gold-500/30 transition-all duration-300">
                <h3 className="text-lg font-heading font-semibold mb-3 text-gold-400">
                  Contact Info
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Phone:{" "}
                  <a href="tel:+15551234567" className="hover:text-gold-400 transition-colors">
                    (555) 123-4567
                  </a>
                  <br />
                  Email:{" "}
                  <a href="mailto:hello@ackisshomes.com" className="hover:text-gold-400 transition-colors">
                    hello@ackisshomes.com
                  </a>
                </p>
              </div>
              <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-6 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/5 hover:border-gold-500/30 transition-all duration-300">
                <h3 className="text-lg font-heading font-semibold mb-3 text-gold-400">
                  Hours
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Monday &ndash; Friday: 9:00 AM &ndash; 6:00 PM
                  <br />
                  Saturday: 10:00 AM &ndash; 4:00 PM
                  <br />
                  Sunday: By Appointment
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
