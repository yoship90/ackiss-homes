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
  title: "Ackiss Homes — Real Estate",
  description:
    "Ackiss Homes delivers exceptional real estate experiences. Whether you're buying, selling, or investing — your next chapter starts here.",
  keywords: [
    "real estate",
    "homes for sale",
    "buy a home",
    "sell a home",
    "real estate agent",
    "Ackiss Homes",
    "property listings",
    "rentals",
    "real estate consultations",
  ],
  openGraph: {
    title: "Ackiss Homes — Real Estate",
    description:
      "Exceptional real estate experiences — buying, selling, or investing. Your next chapter starts here.",
    url: "/",
    siteName: "Ackiss Homes",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Ackiss Homes — Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ackiss Homes — Real Estate",
    description:
      "Exceptional real estate experiences — buying, selling, or investing. Your next chapter starts here.",
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
