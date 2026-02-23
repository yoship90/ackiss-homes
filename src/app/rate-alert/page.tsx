"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MortgageCalculator from "@/components/MortgageCalculator";

const inputCls =
  "w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors";
const labelCls =
  "block text-sm text-gray-400 mb-1.5 uppercase tracking-wider";

export default function RateAlertPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    targetRate: "",
    loanType: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "rate-alert",
          name: form.name,
          email: form.email,
          phone: form.phone,
          targetRate: form.targetRate,
          loanType: form.loanType,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Minimal header */}
      <header className="border-b border-dark-600/40 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Ackiss Homes" width={40} height={37} className="opacity-90" />
            <div>
              <div className="text-white font-heading font-bold text-lg leading-none tracking-wide">Ackiss Homes</div>
              <div className="text-gold-500 text-[10px] uppercase tracking-[0.25em] mt-0.5">Virginia Beach &amp; Hampton Roads</div>
            </div>
          </Link>
          <Link
            href="/"
            className="text-xs text-gray-400 uppercase tracking-widest hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-5xl mx-auto">

          {/* Intro */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <p className="text-gold-400 uppercase tracking-[0.3em] text-xs">Free Service</p>
                <div className="h-px w-8 bg-gold-500/40" />
              </div>

              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
                Get Notified When Rates Hit
                <span className="text-gold-400"> Your Number</span>
              </h1>

              <p className="text-gray-400 leading-relaxed mb-8">
                Mortgage rates are shifting. Tell us the rate you need to feel good about making a move, and we'll reach out the moment it gets there — no automated emails, just a direct call or message from Jeremy or Amanda.
              </p>

              {/* How it works */}
              <div className="space-y-5">
                {[
                  {
                    n: "01",
                    title: "Tell us your target rate",
                    body: "Not sure what rate you need for your budget? Use our mortgage calculator to figure it out in about 60 seconds.",
                  },
                  {
                    n: "02",
                    title: "We watch the market",
                    body: "We work closely with a preferred local lender who monitors rates daily and keeps us informed as they move.",
                  },
                  {
                    n: "03",
                    title: "We reach out when it's time",
                    body: "When rates get in range for your situation, Jeremy or Amanda will reach out personally — no spam, no automated messages.",
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-gold-500/50 font-heading font-bold text-2xl leading-none w-10 shrink-0 pt-0.5">
                      {step.n}
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-1">{step.title}</div>
                      <div className="text-gray-500 text-sm leading-relaxed">{step.body}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculator callout */}
              <div className="mt-10 bg-dark-700/50 border border-dark-600/50 rounded-sm p-5">
                <p className="text-sm text-gray-400 leading-relaxed">
                  <span className="text-gray-200 font-medium">Not sure what rate you need?</span>{" "}
                  Use the mortgage calculator below — plug in a home price, down payment, and try different rates to find your number.
                </p>
                <a
                  href="#calculator"
                  className="inline-block mt-3 text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors"
                >
                  Jump to Calculator ↓
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-8 md:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-5">
                    <svg className="w-7 h-7 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-heading font-bold mb-3">You're on the list.</h2>
                  <p className="text-gray-400 leading-relaxed max-w-sm">
                    We'll be in touch the moment rates get in range for your situation. Keep an eye out for a call or message from Jeremy or Amanda.
                  </p>
                  <Link
                    href="/"
                    className="mt-8 text-xs text-gold-400 uppercase tracking-widest hover:text-gold-300 transition-colors"
                  >
                    ← Back to Ackiss Homes
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-heading font-semibold text-gold-400 mb-6">
                    Set Up Your Rate Alert
                  </h2>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelCls}>Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="Jane Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelCls}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className={labelCls}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="(757) 555-0100"
                    />
                  </div>

                  {/* Target Rate */}
                  <div>
                    <label htmlFor="targetRate" className={labelCls}>My Target Rate</label>
                    <div className="relative w-36">
                      <input
                        type="text"
                        id="targetRate"
                        name="targetRate"
                        required
                        inputMode="decimal"
                        value={form.targetRate}
                        onChange={handleChange}
                        className={`${inputCls} pr-8`}
                        placeholder="6.0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">
                      Not sure? <a href="#calculator" className="text-gold-500/70 hover:text-gold-400 transition-colors">Use our calculator below to find your number.</a>
                    </p>
                  </div>

                  {/* Loan Type */}
                  <div>
                    <label htmlFor="loanType" className={labelCls}>Loan Type <span className="normal-case text-gray-600">(optional)</span></label>
                    <select
                      id="loanType"
                      name="loanType"
                      value={form.loanType}
                      onChange={handleChange}
                      className={`${inputCls} appearance-none`}
                    >
                      <option value="">Select loan type...</option>
                      <option value="Conventional">Conventional</option>
                      <option value="FHA">FHA</option>
                      <option value="VA">VA</option>
                      <option value="Other">Other / Not sure</option>
                    </select>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong — please try again or call us directly.</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-dark-900 font-bold py-4 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.2)] hover:shadow-[0_0_30px_rgba(201,149,46,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-700 active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-300 mt-2"
                  >
                    {status === "submitting" ? "Submitting..." : "Set My Rate Alert →"}
                  </button>

                  {/* Disclaimer */}
                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    Rates vary based on loan type, credit score, and down payment. We'll reach out when rates are in range for your situation to have a real conversation — not an automated message.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div id="calculator" className="mt-20 pt-10 border-t border-dark-600/40">
          <div className="text-center mb-2">
            <p className="text-gray-500 text-sm uppercase tracking-widest">Not sure what rate you need?</p>
          </div>
          <MortgageCalculator />
        </div>

      </main>

      {/* Minimal footer */}
      <footer className="border-t border-dark-600/40 px-6 py-6 text-center">
        <p className="text-xs text-gray-600 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Ackiss Homes &mdash; Virginia Beach &amp; Hampton Roads
        </p>
      </footer>

    </div>
  );
}
