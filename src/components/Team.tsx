import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const agents = [
  {
    name: "Jeremy & Amanda Ackiss",
    title: "The Family Behind Ackiss Homes",
    bio: "What started with Amanda's passion for helping families find their perfect home has grown into a true family affair. A few years later, Jeremy jumped on board — because why should she have all the fun? Together, they bring heart, hustle, and a shared obsession with getting every detail right. Their littlest team member, Liam, hasn't closed a deal yet — but he's already nailing the open-house snack table.",
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 px-6 overflow-hidden relative">
      {/* Warm ambient glow behind the photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 60%, rgba(201,149,46,0.055) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto relative">
        {agents.map((agent, i) => (
          <div key={agent.name} className="grid md:grid-cols-[2fr_3fr] gap-0 items-stretch">
            {/* Photo — bleeds to left edge on desktop */}
            <ScrollReveal direction="left">
              <div className="h-72 md:h-full md:-ml-16 rounded-sm md:rounded-r-sm relative overflow-hidden">
                <Image
                  src="/IMG_20260225_131337.jpg"
                  alt="Amanda and Jeremy Ackiss — Ackiss Homes real estate team"
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
                <div className="flex items-center gap-3 mb-3">
                  <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Meet the Team</p>
                  <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-1">
                  {agent.name}
                </h2>
                <p className="text-gold-400 uppercase tracking-wider text-sm mb-6">
                  {agent.title}
                </p>
                <p className="text-gray-400 leading-relaxed text-lg mb-8 max-w-xl">
                  {agent.bio}
                </p>
              </div>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  );
}
