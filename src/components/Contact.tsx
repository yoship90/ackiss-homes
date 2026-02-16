"use client";

import { useState, type FormEvent } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24 px-6 bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
            Reach Out
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Get in Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <div>
            {submitted ? (
              <div className="bg-dark-700 border border-gold-500/30 rounded-sm p-8 text-center">
                <p className="text-gold-400 text-lg font-heading font-semibold mb-2">
                  Thank you!
                </p>
                <p className="text-gray-400">
                  We&apos;ve received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-dark-700 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
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
                    className="w-full bg-dark-700 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
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
                    className="w-full bg-dark-700 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
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
                    className="w-full bg-dark-700 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
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

          {/* Business info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-gold-400">
                Office
              </h3>
              <p className="text-gray-400 leading-relaxed">
                123 Main Street, Suite 200
                <br />
                Your City, State 12345
              </p>
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-gold-400">
                Contact Info
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Phone: (555) 123-4567
                <br />
                Email: hello@ackisshomes.com
              </p>
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-gold-400">
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
        </div>
      </div>
    </section>
  );
}
