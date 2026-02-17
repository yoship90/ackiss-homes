import Image from "next/image";

const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Zillow", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-600/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Ackiss Homes" width={68} height={68} className="mix-blend-lighten drop-shadow-[0_0_8px_rgba(201,149,46,0.4)]" />
            <div>
              <a
                href="#hero"
                className="text-2xl font-brand font-semibold tracking-[0.08em] bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #d4a853 0%, #f5d89a 25%, #c9952e 50%, #f5d89a 75%, #d4a853 100%)",
                }}
              >
                Ackiss{" "}<span className="-ml-[0.15em]">Homes</span>
              </a>
              <p className="text-sm text-gray-500 mt-1">
                Real estate services
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
                className="text-sm text-gray-400 hover:text-gold-400 transition-colors duration-300 uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-dark-600/50 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Ackiss Homes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
