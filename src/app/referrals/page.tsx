"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Stage = "form" | "submitting" | "done" | "error";

export default function ReferralsPage() {
  const [stage, setStage] = useState<Stage>("form");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Honeypot check
    if (data.get("website")) return;

    setStage("submitting");

    const firstName = (data.get("refFirstName") as string || "").trim();
    const lastName = (data.get("refLastName") as string || "").trim();
    const referrerName = (data.get("referrerName") as string || "").trim();
    const intent = data.get("intent") as string || "";
    const notes = data.get("notes") as string || "";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "referral",
          firstName,
          lastName,
          email: data.get("email"),
          phone: data.get("phone"),
          referrerName,
          intent,
          notes,
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error();
      setStage("done");
    } catch {
      setStage("error");
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Ambient gold glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(201,149,46,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Grain */}
      <div className="fixed inset-0 hero-grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Minimal header */}
      <header className="relative z-10 border-b border-white/5 px-6 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:opacity-70">
            <Image src="/logo.png" alt="Ackiss Homes" width={36} height={33} className="opacity-90" />
            <div>
              <div className="text-white font-heading font-bold text-base leading-none tracking-wide">Ackiss Homes</div>
              <div className="text-gold-500 text-[9px] uppercase tracking-[0.25em] mt-0.5">Virginia Beach &amp; Hampton Roads</div>
            </div>
          </Link>
          <Link
            href="/"
            className="text-xs text-gray-500 uppercase tracking-widest hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">

          {stage === "done" ? (
            /* Success state */
            <div className="text-center">
              <div className="flex justify-center mb-8" aria-hidden="true">
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-2xl opacity-50"
                    style={{ background: "radial-gradient(circle, rgba(201,149,46,0.5) 0%, transparent 70%)" }}
                  />
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="relative drop-shadow-[0_0_12px_rgba(201,149,46,0.4)]">
                    <circle cx="26" cy="26" r="22" stroke="#c9952e" strokeWidth="2" fill="rgba(201,149,46,0.08)" />
                    <path d="M16 26l7 7 13-13" stroke="#c9952e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="h-px w-8 bg-gold-500/40" />
                <p className="text-gold-400 uppercase tracking-[0.35em] text-[10px]">Thank You</p>
                <div className="h-px w-8 bg-gold-500/40" />
              </div>
              <h1 className="font-heading font-bold text-5xl text-center leading-[1.05] tracking-tight text-white mb-5">
                We&apos;ll Take<br />Good Care.
              </h1>
              <p className="text-gray-400 text-center leading-relaxed text-sm max-w-sm mx-auto">
                Your referral has been sent to our team. We&apos;ll reach out personally and make sure they&apos;re in great hands — just like you were.
              </p>
            </div>

          ) : (
            /* Form state */
            <>
              {/* Icon */}
              <div className="flex justify-center mb-8" aria-hidden="true">
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-2xl opacity-50"
                    style={{ background: "radial-gradient(circle, rgba(201,149,46,0.5) 0%, transparent 70%)" }}
                  />
                  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="relative drop-shadow-[0_0_12px_rgba(201,149,46,0.4)]">
                    {/* Two overlapping circles — referrer and referred */}
                    <circle cx="18" cy="18" r="9" stroke="#c9952e" strokeWidth="2.5" fill="rgba(201,149,46,0.1)" />
                    <circle cx="34" cy="18" r="9" stroke="#c9952e" strokeWidth="2.5" fill="rgba(201,149,46,0.1)" />
                    {/* Arrow connecting them */}
                    <path d="M27 18h-2" stroke="#c9952e" strokeWidth="2" strokeLinecap="round" />
                    {/* People dots */}
                    <circle cx="18" cy="15" r="3" fill="rgba(201,149,46,0.5)" />
                    <circle cx="34" cy="15" r="3" fill="rgba(201,149,46,0.5)" />
                    {/* Handshake base line */}
                    <path d="M10 36c2-4 8-6 16-6s14 2 16 6" stroke="#c9952e" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="h-px w-8 bg-gold-500/40" />
                <p className="text-gold-400 uppercase tracking-[0.35em] text-[10px]">Send a Referral</p>
                <div className="h-px w-8 bg-gold-500/40" />
              </div>

              {/* Headline */}
              <h1 className="font-heading font-bold text-5xl md:text-6xl text-center leading-[1.05] tracking-tight text-white mb-5">
                Know Someone<br />Ready to Move?
              </h1>

              {/* Body */}
              <p className="text-gray-400 text-center leading-relaxed text-sm max-w-sm mx-auto mb-2">
                Referrals from trusted clients are the greatest compliment we receive. Fill in your friend&apos;s info and we&apos;ll reach out personally — no pressure, just a conversation.
              </p>
              <p className="text-center text-[11px] text-gray-600 uppercase tracking-[0.2em] mb-10">
                Takes less than 2 minutes
              </p>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent mb-10" />

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {/* Honeypot */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
                  <label htmlFor="referral-website">Website</label>
                  <input type="text" id="referral-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Your name */}
                <div>
                  <label htmlFor="referrerName" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                    Your Name
                  </label>
                  <input
                    id="referrerName"
                    name="referrerName"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500 transition-[border-color] duration-200"
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-dark-600 to-transparent my-2" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-600 text-center">Their info</p>

                {/* Referred person name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="refFirstName" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                      First Name
                    </label>
                    <input
                      id="refFirstName"
                      name="refFirstName"
                      type="text"
                      required
                      placeholder="First"
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500 transition-[border-color] duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="refLastName" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                      Last Name
                    </label>
                    <input
                      id="refLastName"
                      name="refLastName"
                      type="text"
                      placeholder="Last"
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500 transition-[border-color] duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="refEmail" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                    Their Email
                  </label>
                  <input
                    id="refEmail"
                    name="email"
                    type="email"
                    placeholder="their@email.com"
                    className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500 transition-[border-color] duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="refPhone" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                    Their Phone
                  </label>
                  <input
                    id="refPhone"
                    name="phone"
                    type="tel"
                    placeholder="(757) 000-0000"
                    className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500 transition-[border-color] duration-200"
                  />
                </div>

                {/* Intent */}
                <div>
                  <label htmlFor="intent" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                    Are They Looking to…
                  </label>
                  <select
                    id="intent"
                    name="intent"
                    className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-gold-500 transition-[border-color] duration-200 appearance-none text-gray-300"
                    defaultValue=""
                  >
                    <option value="" disabled className="text-gray-600">Select one</option>
                    <option value="Buy">Buy a home</option>
                    <option value="Sell">Sell a home</option>
                    <option value="Buy and Sell">Buy &amp; sell</option>
                    <option value="Not sure">Not sure yet</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="refNotes" className="block text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                    Anything Else We Should Know? <span className="text-gray-700">(optional)</span>
                  </label>
                  <textarea
                    id="refNotes"
                    name="notes"
                    rows={3}
                    placeholder="Timeline, budget, neighborhood, anything helpful…"
                    className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500 transition-[border-color] duration-200 resize-none"
                  />
                </div>

                {stage === "error" && (
                  <p className="text-red-400 text-xs text-center">
                    Something went wrong. Please try again or email us at ackisshomes@gmail.com.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={stage === "submitting"}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-sm bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-dark-900 font-semibold text-sm uppercase tracking-widest shadow-[0_0_24px_rgba(201,149,46,0.25)] hover:shadow-[0_0_40px_rgba(201,149,46,0.45)] active:scale-[0.98] transition-[background-color,box-shadow,transform,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {stage === "submitting" ? "Sending…" : "Send Referral →"}
                </button>
              </form>

              {/* Sign-off */}
              <p className="text-center text-[11px] text-gray-700 mt-10 leading-relaxed">
                We&apos;ll reach out to your friend with care. Your name will be mentioned — they&apos;ll know a trusted client sent them our way.
              </p>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
