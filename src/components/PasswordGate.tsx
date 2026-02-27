"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const INTERNAL_AUTH_KEY = "ackiss_auth";
const PASSWORD = "Squad123";

export default function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === PASSWORD) {
      localStorage.setItem(INTERNAL_AUTH_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setShake(true);
      setValue("");
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,149,46,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 hero-grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="relative w-full max-w-sm text-center">
        <Link href="/" className="inline-flex flex-col items-center gap-2 mb-10 focus-visible:outline-none focus-visible:opacity-70">
          <Image src="/logo.png" alt="Ackiss Homes" width={40} height={37} className="opacity-80" />
          <span className="text-[9px] uppercase tracking-[0.35em] text-gold-500/70">Internal Access</span>
        </Link>

        <h1 className="font-heading font-bold text-3xl text-white mb-2">Team Portal</h1>
        <p className="text-gray-600 text-sm mb-8">Enter the password to continue.</p>

        <form onSubmit={handleSubmit} className={shake ? "animate-[shake_0.4s_ease]" : ""}>
          <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`}</style>
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className={`w-full bg-dark-800 border rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm text-center tracking-widest focus:outline-none transition-[border-color] duration-200 mb-3 ${
              error ? "border-red-500/60" : "border-dark-600 focus:border-gold-500"
            }`}
          />
          {error && <p className="text-red-400 text-xs mb-3">Incorrect password — try again.</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-sm bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold text-sm uppercase tracking-widest shadow-[0_0_24px_rgba(201,149,46,0.2)] hover:shadow-[0_0_36px_rgba(201,149,46,0.35)] active:scale-[0.98] transition-[background-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
