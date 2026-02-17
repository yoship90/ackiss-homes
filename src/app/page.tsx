import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Team from "@/components/Team";
import Services from "@/components/Services";
import Neighborhoods from "@/components/Neighborhoods";
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

export default function Home() {
  return (
    <>
      <PageReveal>
        <Header />
        <main>
          <Hero />
          <About />
          <SectionDivider from="dark-900" to="dark-800" />
          <Team />
          <Services />
          <Neighborhoods />
          <SectionDivider from="dark-800" to="dark-900" />
          <MortgageCalculator />
          <SectionDivider from="dark-900" to="dark-800" />
          <Listings />
          <SectionDivider from="dark-800" to="dark-900" />
          <MLSSearch />
          <Testimonials />
          <SocialFeed />
          <SectionDivider from="dark-900" to="dark-800" />
          <Contact />
          <SectionDivider from="dark-800" to="dark-900" />
        </main>
        <Footer />
      </PageReveal>
      <StickyCTA />
    </>
  );
}
