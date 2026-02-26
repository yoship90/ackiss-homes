import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100090275910543" },
  { label: "Instagram", href: "https://www.instagram.com/ackisshomes/" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 py-12 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/35 to-transparent" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Ackiss Homes" width={56} height={56} className="mix-blend-lighten drop-shadow-[0_0_8px_rgba(201,149,46,0.4)]" />
            {/* Thin vertical divider */}
            <div className="h-8 w-px bg-gold-500/40 shrink-0" aria-hidden="true" />
            <div>
              <a href="#hero" className="flex items-baseline gap-2 whitespace-nowrap">
                <span
                  className="font-brand text-[1.6rem] font-semibold tracking-[0.06em] bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #d4a853 0%, #f5d89a 25%, #c9952e 50%, #f5d89a 75%, #d4a853 100%)",
                  }}
                >
                  Ackiss
                </span>
                <span className="font-body text-[0.7rem] uppercase tracking-[0.3em] text-gold-400/65">
                  Homes
                </span>
              </a>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-[0.2em] flex items-center gap-1.5">
                Real Estate Services
                <span className="inline-block w-px h-3 bg-gold-500/50" aria-hidden="true" />
                Brokered by Triumph Realty
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-70 transition-colors duration-300 uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Communities */}
        <div className="border-t border-dark-600/50 mt-8 pt-8">
          <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4">Communities</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2">
            {["Virginia Beach","Chesapeake","Suffolk","Portsmouth","Newport News","Hampton","Yorktown","Williamsburg"].map((city) => (
              <span key={city} className="text-xs text-gray-600 uppercase tracking-wider">
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-dark-600/50 mt-8 pt-8">
          <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Triumph Realty</p>
          <p className="text-xs text-gray-600">2135 General Booth Blvd, Suite 146 &middot; Virginia Beach, VA 23454</p>
        </div>

        <div className="border-t border-dark-600/50 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Equal Housing Opportunity logo */}
          {/* Equal Housing Opportunity — official vector logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/equal-housing.svg" alt="Equal Housing Opportunity" width={52} height={52} className="invert opacity-60" />
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-gray-600 uppercase tracking-wider hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-600 uppercase tracking-wider hover:text-gold-400 focus-visible:outline-none focus-visible:text-gold-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Ackiss Homes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
