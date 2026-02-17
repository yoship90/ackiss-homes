import ScrollReveal from "./ScrollReveal";

export default function MLSSearch() {
  return (
    <section id="mls-search" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
              Full MLS Access
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Search All Listings
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Browse the full MLS database below. See something you like?{" "}
              <a href="#contact" className="text-gold-400 hover:text-gold-500 underline underline-offset-4">
                Contact us
              </a>{" "}
              to schedule a showing.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          {/* TODO: Re-enable Triumph IDX iframe once we have broker approval */}
          {/* <div
            className="border border-dark-600/50 rounded-sm overflow-y-auto mls-scroll"
            style={{ height: "80vh", minHeight: "600px" }}
          >
            <iframe
              src="https://www.triumphrealtyva.com/listings/residential/"
              title="MLS Listings Search"
              className="w-full bg-white"
              style={{ height: "200vh" }}
              scrolling="no"
              loading="lazy"
            />
          </div> */}
          <div className="border border-dark-600/50 rounded-sm flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gold-400 text-4xl font-heading mb-4">Coming Soon</p>
            <p className="text-gray-400 max-w-md">
              Full MLS search will be available here soon. In the meantime,{" "}
              <a href="#contact" className="text-gold-400 hover:text-gold-500 underline underline-offset-4">
                contact us
              </a>{" "}
              and we&apos;ll help you find your perfect home.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              Listings provided through Triumph Realty &middot; Powered by MLS
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
