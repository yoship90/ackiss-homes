import type { Metadata } from "next";
import { Playfair_Display, Inter, Bodoni_Moda } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import HashScrollHandler from "@/components/HashScrollHandler";

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

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bodoni",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ackiss-homes.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ackiss Homes — Virginia Beach & All of Hampton Roads Real Estate",
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
  verification: {
    google: "DYn3guIYiOMqOMoT4U69IonMLftkhqEHOBsFl3rBi48",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Ackiss Homes — Virginia Beach & All of Hampton Roads Real Estate",
    description:
      "Buying, selling, or investing in Virginia Beach? Ackiss Homes delivers exceptional real estate experiences with local expertise and a client-first approach.",
    url: siteUrl,
    siteName: "Ackiss Homes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ackiss Homes — Virginia Beach & All of Hampton Roads Real Estate",
    description:
      "Buying, selling, or investing in Virginia Beach? Ackiss Homes delivers exceptional real estate experiences with local expertise and a client-first approach.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${bodoni.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y20W26TBDS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y20W26TBDS');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <HashScrollHandler />
        {children}
      </body>
    </html>
  );
}
