import ScrollReveal from "./ScrollReveal";

const listings = [
  {
    address: "142 Oakwood Drive",
    city: "Maplewood, NJ",
    price: "$625,000",
    beds: 4,
    baths: 3,
    sqft: "2,400",
    status: "For Sale",
    link: "#",
  },
  {
    address: "38 Riverside Terrace",
    city: "Summit, NJ",
    price: "$489,000",
    beds: 3,
    baths: 2,
    sqft: "1,850",
    status: "For Sale",
    link: "#",
  },
  {
    address: "510 Elm Street, Unit 4B",
    city: "Montclair, NJ",
    price: "$375,000",
    beds: 2,
    baths: 2,
    sqft: "1,200",
    status: "Pending",
    link: "#",
  },
  {
    address: "27 Cedar Lane",
    city: "Short Hills, NJ",
    price: "$1,150,000",
    beds: 5,
    baths: 4,
    sqft: "3,800",
    status: "For Sale",
    link: "#",
  },
];

export default function Listings() {
  if (listings.length === 0) return null;

  return (
    <section id="listings" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
              On the Market
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              Featured Listings
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {listings.map((listing, i) => (
            <ScrollReveal key={listing.address} delay={i * 100}>
              <a
                href={listing.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-dark-700 border border-dark-600/50 rounded-sm overflow-hidden group hover:border-gold-500/30 hover:-translate-y-2 hover:shadow-lg hover:shadow-gold-500/5 transition-all duration-300"
              >
                {/* Placeholder image area */}
                <div className="h-48 bg-dark-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-500/50 to-dark-700/50 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-600 group-hover:text-gold-400/30 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                      />
                    </svg>
                  </div>
                  {/* Status badge */}
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm ${
                      listing.status === "Pending"
                        ? "bg-amber-600 text-white"
                        : "bg-gold-500 text-dark-900"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>

                {/* Listing details */}
                <div className="p-6">
                  <p className="text-2xl font-heading font-bold text-gold-400 mb-1">
                    {listing.price}
                  </p>
                  <p className="text-white font-semibold mb-1">
                    {listing.address}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">{listing.city}</p>

                  <div className="flex gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7h18" />
                      </svg>
                      {listing.beds} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 16V8a4 4 0 014-4h1m7 12h4M4 16h16" />
                      </svg>
                      {listing.baths} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {listing.sqft} sqft
                    </span>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center mt-12">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold-500/50 hover:bg-gold-500 hover:text-dark-900 text-gold-400 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-colors duration-300"
            >
              View All Listings on Zillow
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
