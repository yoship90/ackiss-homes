import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Listings from "@/components/Listings";
import MLSSearch from "@/components/MLSSearch";
import Testimonials from "@/components/Testimonials";
import SocialFeed from "@/components/SocialFeed";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Listings />
        <MLSSearch />
        <Testimonials />
        <SocialFeed />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
