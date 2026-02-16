import ScrollReveal from "./ScrollReveal";

const placeholderPosts = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

export default function SocialFeed() {
  return (
    <section id="social" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
              Follow Along
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              @AckissHomes
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">
              Check out our latest videos, listings, and behind-the-scenes content.
            </p>
          </div>
        </ScrollReveal>

        {/*
          TODO: Replace placeholders with live Instagram feed.
          Options:
            - Behold (behold.so) — drop-in widget, no API key needed
            - Instagram Basic Display API — requires Meta app approval
            - Elfsight or EmbedSocial — third-party widget services
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholderPosts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 75}>
              <div className="aspect-square bg-dark-700 border border-dark-600/50 rounded-sm flex items-center justify-center group hover:border-gold-500/30 transition-colors duration-300">
                <div className="text-center px-4">
                  <svg
                    className="w-10 h-10 mx-auto text-gray-600 group-hover:text-gold-400 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth={1.5} />
                    <circle cx="12" cy="12" r="5" strokeWidth={1.5} />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <p className="text-xs text-gray-600 mt-3 uppercase tracking-wider">
                    Coming Soon
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="text-center mt-10">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gold-500/50 hover:bg-gold-500 hover:text-dark-900 text-gold-400 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-colors duration-300"
            >
              Follow Us on Instagram
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
