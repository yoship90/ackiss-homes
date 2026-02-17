import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const agents = [
  {
    name: "Jeremy & Amanda Ackiss",
    title: "The Family Behind Ackiss Homes",
    bio: "What started with Amanda's passion for helping families find their perfect home has grown into a true family affair. A few years later, Jeremy jumped on board — because why should she have all the fun? Together, they bring heart, hustle, and a shared obsession with getting every detail right. Their littlest team member, Liam, hasn't closed a deal yet — but he's already nailing the open-house snack table.",
    phone: "(555) 123-4567",
    email: "hello@ackisshomes.com",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {agents.map((agent, i) => (
          <div key={agent.name} className="grid md:grid-cols-[2fr_3fr] gap-0 items-stretch">
            {/* Photo — bleeds to left edge on desktop */}
            <ScrollReveal direction="left">
              <div className="h-72 md:h-full md:-ml-16 rounded-sm md:rounded-r-sm relative overflow-hidden">
                <Image
                  src="/family-photo.png"
                  alt="Ackiss Homes team"
                  fill
                  className="object-cover" style={{ objectPosition: "center 20%" }}
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                {/* Gold accent bar */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-gold-500/60 to-transparent z-10" />
              </div>
            </ScrollReveal>

            {/* Agent info — right side with heading above */}
            <ScrollReveal direction="right">
              <div className="p-8 md:p-14 md:pl-16">
                <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-3">
                  Meet the Team
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-1">
                  {agent.name}
                </h2>
                <p className="text-gold-400 uppercase tracking-wider text-sm mb-6">
                  {agent.title}
                </p>
                <p className="text-gray-400 leading-relaxed text-lg mb-8 max-w-xl">
                  {agent.bio}
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <a
                    href={`tel:${agent.phone}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {agent.phone}
                  </a>
                  <a
                    href={`mailto:${agent.email}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-gold-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {agent.email}
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  );
}
