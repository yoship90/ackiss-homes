import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Ackiss Homes",
  description: "Terms of service for Ackiss Homes, a real estate brokerage serving Virginia Beach and Hampton Roads.",
  robots: { index: false, follow: false },
};

const lastUpdated = "February 26, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Minimal header */}
      <header className="border-b border-dark-600/40 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
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

      {/* Content */}
      <main className="flex-1 px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Title */}
          <div className="mb-12">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-xs mb-4">Legal</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4">Terms of Service</h1>
            <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose-content space-y-10 text-gray-400 leading-relaxed">

            {/* Intro */}
            <section>
              <p>
                By accessing or using this website at{" "}
                <span className="text-gray-300">ackisshomes.com</span>, you agree to be bound by these Terms of
                Service. If you do not agree to these terms, please do not use the site. This website is operated
                by Ackiss Homes, a licensed real estate team in Virginia, brokered by Triumph Realty.
              </p>
            </section>

            <Divider />

            {/* 1 */}
            <section>
              <SectionHeading>1. Use of This Website</SectionHeading>
              <p className="mb-4">You may use this website for lawful purposes only. You agree not to:</p>
              <ul className="space-y-2 pl-4">
                <Li>Use the site in any way that violates applicable federal, state, or local law</Li>
                <Li>Submit false, misleading, or fraudulent information through any form</Li>
                <Li>Attempt to gain unauthorized access to any part of the site or its infrastructure</Li>
                <Li>Use automated tools to scrape, crawl, or harvest content from the site</Li>
              </ul>
            </section>

            <Divider />

            {/* 2 */}
            <section>
              <SectionHeading>2. Not Legal or Financial Advice</SectionHeading>
              <p>
                The content on this website is provided for general informational purposes only. Nothing on this
                site constitutes legal, financial, tax, or investment advice. Mortgage calculators, market
                information, and property data are provided as tools to help you explore your options — they are
                not guarantees of loan approval, property value, or investment return. Always consult a licensed
                professional before making real estate, financial, or legal decisions.
              </p>
            </section>

            <Divider />

            {/* 3 */}
            <section>
              <SectionHeading>3. No Guarantee of Results</SectionHeading>
              <p>
                While we work hard to deliver exceptional real estate outcomes for our clients, we make no
                guarantee of any specific result — including sale price, purchase price, days on market, or
                investment return. Real estate transactions involve market conditions, third parties, and
                circumstances outside our control.
              </p>
            </section>

            <Divider />

            {/* 4 */}
            <section>
              <SectionHeading>4. Intellectual Property</SectionHeading>
              <p>
                All content on this website — including text, images, logos, graphics, and design — is owned by
                or licensed to Ackiss Homes and is protected by applicable copyright and trademark law. You may
                not reproduce, distribute, or use any content from this site without our prior written permission.
              </p>
            </section>

            <Divider />

            {/* 5 */}
            <section>
              <SectionHeading>5. Third-Party Links</SectionHeading>
              <p>
                This website contains links to third-party websites, including Zillow, Instagram, Follow Up Boss,
                and Triumph Realty. These links are provided for your convenience. We do not control those sites
                and are not responsible for their content, privacy practices, or terms. Visiting a linked site is
                at your own discretion.
              </p>
            </section>

            <Divider />

            {/* 6 */}
            <section>
              <SectionHeading>6. Limitation of Liability</SectionHeading>
              <p>
                To the fullest extent permitted by law, Ackiss Homes and its agents shall not be liable for any
                indirect, incidental, special, or consequential damages arising from your use of this website or
                reliance on any content contained herein. Our total liability for any claim related to this
                website shall not exceed the amount you paid to us in the twelve months preceding the claim, if
                any.
              </p>
            </section>

            <Divider />

            {/* 7 */}
            <section>
              <SectionHeading>7. Disclaimer of Warranties</SectionHeading>
              <p>
                This website is provided on an "as is" and "as available" basis without warranties of any kind,
                either express or implied. We do not warrant that the site will be uninterrupted, error-free, or
                free of viruses or other harmful components.
              </p>
            </section>

            <Divider />

            {/* 8 */}
            <section>
              <SectionHeading>8. Governing Law</SectionHeading>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the
                Commonwealth of Virginia, without regard to its conflict of law provisions. Any disputes arising
                under these terms shall be subject to the exclusive jurisdiction of the courts located in
                Virginia Beach, Virginia.
              </p>
            </section>

            <Divider />

            {/* 9 */}
            <section>
              <SectionHeading>9. Changes to These Terms</SectionHeading>
              <p>
                We may update these Terms of Service from time to time. When we do, we will update the "Last
                updated" date at the top of this page. Continued use of the website after any changes constitutes
                your acceptance of the updated terms.
              </p>
            </section>

            <Divider />

            {/* 10 */}
            <section>
              <SectionHeading>10. Contact Us</SectionHeading>
              <p className="mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-dark-800 border border-dark-600/50 rounded-sm p-6 text-sm space-y-1">
                <p className="text-gray-300 font-semibold">Ackiss Homes</p>
                <p>Brokered by Triumph Realty</p>
                <p>2135 General Booth Blvd, Suite 146</p>
                <p>Virginia Beach, VA 23454</p>
                <p className="pt-2">
                  <a
                    href="/#contact"
                    className="text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    Use our contact form →
                  </a>
                </p>
              </div>
            </section>

          </div>
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-heading font-semibold text-white mb-4">{children}</h2>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 items-start">
      <span className="text-gold-500/60 mt-1.5 shrink-0">—</span>
      <span>{children}</span>
    </li>
  );
}

function Divider() {
  return <div className="border-t border-dark-600/30" />;
}
