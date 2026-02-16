import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
    >
      {/* Logo background */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <Image
          src="/logo.png"
          alt=""
          width={1200}
          height={1200}
          className="opacity-15 w-[70%] h-auto object-contain"
          priority
        />
      </div>
      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-dark-900/40" />

      <div className="relative text-center max-w-3xl mx-auto">
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6">
          Premium Real Estate
        </p>
        <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6">
          Find Your <span className="text-gold-400">Dream Home</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ackiss Homes delivers exceptional real estate experiences — whether
          you&apos;re buying, selling, or investing. Your next chapter starts here.
        </p>
        <a
          href="#contact"
          className="inline-block bg-gold-500 hover:bg-gold-600 text-dark-900 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest transition-colors duration-300"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
