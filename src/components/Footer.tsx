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
            <Image src="/logo.png" alt="Ackiss Homes" width={48} height={48} className="rounded-sm" />
            <div>
              <p className="text-2xl font-heading font-bold text-gold-400 tracking-wide">
                Ackiss Homes
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Premium real estate services
              </p>
            </div>
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
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
