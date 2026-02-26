import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Team from "@/components/Team";
import PropertyInquiry from "@/components/PropertyInquiry";
import Services from "@/components/Services";
import MortgageCalculator from "@/components/MortgageCalculator";
import Listings from "@/components/Listings";
import MLSSearch from "@/components/MLSSearch";
import Testimonials from "@/components/Testimonials";
import SocialFeed from "@/components/SocialFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import StickyCTA from "@/components/StickyCTA";
import PageReveal from "@/components/PageReveal";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ackiss-homes.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      name: "Ackiss Homes",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/hero-bg.jpg`,
      email: "ackisshomes@gmail.com",
      description:
        "Ackiss Homes delivers exceptional real estate experiences — buying, selling, or investing.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2135 General Booth Blvd, Suite 146",
        addressLocality: "Virginia Beach",
        addressRegion: "VA",
        postalCode: "23454",
        addressCountry: "US",
      },
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Buying" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Home Selling" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rentals" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Real Estate Consultations" } },
      ],
      sameAs: [
        "https://www.instagram.com/ackisshomes/",
        "https://www.facebook.com/profile.php?id=100090275910543",
      ],
    },
    {
      "@type": "Person",
      name: "Amanda Ackiss",
      jobTitle: "Real Estate Agent",
      image: `${siteUrl}/IMG_20260225_131337.jpg`,
      worksFor: { "@type": "Organization", name: "Ackiss Homes" },
      url: siteUrl,
      sameAs: [
        "https://www.zillow.com/profile/amanda5867",
        "https://www.instagram.com/amanda.ackiss/",
      ],
    },
    {
      "@type": "Person",
      name: "Jeremy Ackiss",
      jobTitle: "Real Estate Agent",
      image: `${siteUrl}/IMG_20260225_131337.jpg`,
      worksFor: { "@type": "Organization", name: "Ackiss Homes" },
      url: siteUrl,
      sameAs: [
        "https://www.zillow.com/profile/jeremy2621",
        "https://www.instagram.com/jeremy.ackiss/",
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageReveal>
        <Header />
        <main>
          <Hero />
          <Team />
          <SectionDivider from="dark-900" to="dark-800" />
          <Services />
          <SectionDivider from="dark-800" to="dark-900" />
          <PropertyInquiry />
          <MortgageCalculator />
          <Listings />
          <MLSSearch />
          <SectionDivider from="dark-900" to="dark-800" />
          <Testimonials />
          <SocialFeed />
          <SectionDivider from="dark-800" to="dark-900" />
          <Contact />
        </main>
        <Footer />
      </PageReveal>
      <StickyCTA />
    </>
  );
}
