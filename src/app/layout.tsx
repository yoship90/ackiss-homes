import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-brand",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ackiss-homes.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ackiss Homes — Virginia Beach Real Estate",
  description:
    "Ackiss Homes delivers exceptional real estate experiences in Virginia Beach and Hampton Roads. Whether you're buying, selling, or investing — your next chapter starts here.",
  keywords: [
    "Virginia Beach real estate",
    "Hampton Roads real estate",
    "homes for sale Virginia Beach",
    "buy a home Virginia Beach",
    "sell a home Virginia Beach",
    "real estate agent Virginia Beach",
    "Ackiss Homes",
    "Virginia Beach Realtor",
    "Hampton Roads homes",
    "property listings Virginia Beach",
    "rentals Virginia Beach",
    "real estate consultations Virginia Beach",
  ],
  alternates: {
    canonical: siteUrl,
  },
  // TODO: when ready for launch, change to index: true, follow: true
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Ackiss Homes — Virginia Beach Real Estate",
    description:
      "Buying, selling, or investing in Virginia Beach? Ackiss Homes delivers exceptional real estate experiences with local expertise and a client-first approach.",
    url: siteUrl,
    siteName: "Ackiss Homes",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Ackiss Homes — Hampton Roads Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ackiss Homes — Virginia Beach Real Estate",
    description:
      "Buying, selling, or investing in Virginia Beach? Ackiss Homes delivers exceptional real estate experiences with local expertise and a client-first approach.",
    images: ["/hero-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${lora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
