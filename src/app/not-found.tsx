import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found — Ackiss Homes",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(201,149,46,0.03) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]" aria-hidden="true">
        <Image src="/logo.png" alt="" width={600} height={558} className="w-[70vw] max-w-2xl h-auto" />
      </div>

      <div className="relative z-10 text-center max-w-lg">

        {/* 404 */}
        <p className="text-gold-500/50 uppercase tracking-[0.4em] text-xs mb-4">404 — Not Found</p>

        <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
          This page has<br />moved on.
        </h1>

        <p className="text-gray-400 leading-relaxed mb-10">
          Looks like this address isn&apos;t on the market anymore.
          Let&apos;s get you back to somewhere that is.
        </p>

        <Link
          href="/"
          className="inline-block bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.25)] hover:shadow-[0_0_30px_rgba(201,149,46,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-300"
        >
          Back to Home
        </Link>

        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-gold-500/20" />
          <p className="text-xs text-gray-600 uppercase tracking-[0.25em]">Ackiss Homes &mdash; Virginia Beach</p>
          <div className="h-px w-8 bg-gold-500/20" />
        </div>

      </div>
    </div>
  );
}
