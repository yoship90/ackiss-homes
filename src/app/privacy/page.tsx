import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Ackiss Homes",
  description: "Privacy policy for Ackiss Homes, a real estate brokerage serving Virginia Beach and Hampton Roads.",
  robots: { index: false, follow: false },
};

const lastUpdated = "February 24, 2026";

export default function PrivacyPage() {
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">Last updated: {lastUpdated}</p>
          </div>

          <div className="prose-content space-y-10 text-gray-400 leading-relaxed">

            {/* Intro */}
            <section>
              <p>
                Ackiss Homes ("we," "us," or "our") operates this website at{" "}
                <span className="text-gray-300">ackisshomes.com</span>. This Privacy Policy explains what personal
                information we collect, how we use it, and your rights regarding that information. We are a licensed
                real estate brokerage operating in Virginia, brokered by Triumph Realty.
              </p>
            </section>

            <Divider />

            {/* 1 */}
            <section>
              <SectionHeading>1. Information We Collect</SectionHeading>
              <p className="mb-4">We only collect information you voluntarily provide to us through our website forms. This includes:</p>
              <ul className="space-y-2 pl-4">
                <Li><span className="text-gray-300">Name</span> — your first and last name</Li>
                <Li><span className="text-gray-300">Email address</span> — used to contact you about your inquiry</Li>
                <Li><span className="text-gray-300">Phone number</span> — optional; used to contact you directly</Li>
                <Li><span className="text-gray-300">Home search preferences</span> — beds, baths, price range, property type, timeline, and any notes you provide</Li>
                <Li><span className="text-gray-300">Messages</span> — any free-text you submit through the Contact form</Li>
              </ul>
              <p className="mt-4">
                We do not use tracking pixels, behavioral advertising, or analytics tools that collect data about your
                browsing activity. We do not collect payment information.
              </p>
            </section>

            <Divider />

            {/* 2 */}
            <section>
              <SectionHeading>2. How We Use Your Information</SectionHeading>
              <p className="mb-4">We use the information you provide solely to:</p>
              <ul className="space-y-2 pl-4">
                <Li>Respond to your inquiry or home search request</Li>
                <Li>Contact you about properties, listings, or real estate services that match your stated preferences</Li>
                <Li>Follow up on conversations you initiate with us</Li>
              </ul>
              <p className="mt-4">
                We will never use your information for unrelated marketing, and we will never sell your personal
                information to third parties.
              </p>
            </section>

            <Divider />

            {/* 3 */}
            <section>
              <SectionHeading>3. How We Store and Share Your Information</SectionHeading>
              <p className="mb-4">
                When you submit a form on this website, your information is transmitted to{" "}
                <span className="text-gray-300">Follow Up Boss</span>, a third-party customer relationship management
                (CRM) platform we use to manage client communications. Follow Up Boss stores your data on secure,
                encrypted servers. You can review their privacy practices at{" "}
                <a
                  href="https://www.followupboss.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 transition-colors"
                >
                  followupboss.com/privacy
                </a>.
              </p>
              <p>
                We do not share your information with any other third parties except as required by law or as necessary
                to complete a real estate transaction you have authorized.
              </p>
            </section>

            <Divider />

            {/* 4 */}
            <section>
              <SectionHeading>4. External Links</SectionHeading>
              <p>
                This website contains links to Instagram video content. Clicking those links will take you to
                Instagram's website, where{" "}
                <a
                  href="https://privacycenter.instagram.com/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Instagram's Privacy Policy
                </a>{" "}
                applies. We do not load any Instagram scripts or cookies on our website, and we have no access
                to any data Instagram may collect about you on their platform.
              </p>
            </section>

            <Divider />

            {/* 5 */}
            <section>
              <SectionHeading>5. Data Retention</SectionHeading>
              <p>
                We retain your information in our CRM for as long as necessary to service your real estate needs or
                maintain an ongoing client relationship. If you would like your information removed, please contact us
                using the information in Section 7 and we will delete your records promptly.
              </p>
            </section>

            <Divider />

            {/* 6 */}
            <section>
              <SectionHeading>6. Your Rights (Virginia VCDPA)</SectionHeading>
              <p className="mb-4">
                Under the Virginia Consumer Data Protection Act (VCDPA), Virginia residents have the right to:
              </p>
              <ul className="space-y-2 pl-4">
                <Li>Know what personal data we hold about you</Li>
                <Li>Request a copy of your personal data</Li>
                <Li>Request correction of inaccurate data</Li>
                <Li>Request deletion of your personal data</Li>
                <Li>Opt out of the sale of personal data (we do not sell personal data)</Li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, contact us using the information in Section 7. We will respond within
                45 days as required by law.
              </p>
            </section>

            <Divider />

            {/* 7 */}
            <section>
              <SectionHeading>7. Contact Us</SectionHeading>
              <p className="mb-4">
                If you have questions about this Privacy Policy, want to exercise your data rights, or want to request
                removal of your information, please contact us:
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

            <Divider />

            {/* 8 */}
            <section>
              <SectionHeading>8. Changes to This Policy</SectionHeading>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will update the "Last updated"
                date at the top of this page. Continued use of the website after any changes constitutes acceptance of
                the updated policy.
              </p>
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
