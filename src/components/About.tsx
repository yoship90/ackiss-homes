export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
            Who We Are
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            About Ackiss Homes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gray-400 leading-relaxed text-lg mb-6">
              At Ackiss Homes, we believe that finding the right property is
              about more than square footage and price — it&apos;s about finding a
              place where life happens. We bring a personalized, client-first
              approach to every transaction.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              With deep local market knowledge and a commitment to integrity,
              we guide buyers, sellers, and investors through every step of the
              real estate journey. Our reputation is built on results,
              relationships, and trust.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "200+", label: "Homes Sold" },
              { number: "15+", label: "Years Experience" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "50+", label: "5-Star Reviews" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-dark-700 border border-dark-600/50 rounded-sm p-6 text-center"
              >
                <p className="text-3xl font-heading font-bold text-gold-400 mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
