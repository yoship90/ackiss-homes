import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    name: "Sarah & James M.",
    role: "First-Time Buyers",
    quote:
      "Ackiss Homes made our first home purchase feel effortless. They were patient, knowledgeable, and truly had our best interests at heart.",
  },
  {
    name: "David R.",
    role: "Home Seller",
    quote:
      "They sold our home in under two weeks and above asking price. The marketing strategy was incredible — we couldn't be happier.",
  },
  {
    name: "Michelle T.",
    role: "Real Estate Investor",
    quote:
      "I've worked with many agents, but the Ackiss team stands out. Professional, responsive, and always delivering results.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-4">
              Client Stories
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 150}>
              <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-8 h-full">
                <div className="text-gold-400 text-4xl font-heading mb-4">&ldquo;</div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  {t.quote}
                </p>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
