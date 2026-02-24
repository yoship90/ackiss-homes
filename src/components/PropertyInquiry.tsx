"use client";

import { useState, type FormEvent } from "react";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";

const perks = [
  "Live MLS data — so you're not falling in love with homes that are no longer available",
  "Personalized matches based on your criteria",
  "Price history, days on market & neighborhood comps",
  "Local expertise from agents who know Hampton Roads",
];

const bedOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
const bathOptions = ["Any", "1+", "2+", "3+", "4+"];
const propertyTypes = ["Any", "Single Family", "Townhouse", "Condo", "Multi-Family"];
const timelines = ["ASAP", "1–3 Months", "3–6 Months", "Just Exploring"];
const preApprovalOptions = ["Yes", "Working On It", "Not Yet"];

function ButtonGroup({
  label,
  options,
  value,
  onChange,
  multi = false,
}: {
  label: string;
  options: string[];
  value: string | string[];
  onChange: (val: string | string[]) => void;
  multi?: boolean;
}) {
  function handleClick(opt: string) {
    if (multi) {
      const arr = value as string[];
      if (opt === "Any") {
        onChange(["Any"]);
      } else {
        const without = arr.filter((v) => v !== "Any");
        if (without.includes(opt)) {
          const next = without.filter((v) => v !== opt);
          onChange(next.length ? next : ["Any"]);
        } else {
          onChange([...without, opt]);
        }
      }
    } else {
      onChange(opt);
    }
  }

  function isActive(opt: string) {
    if (multi) return (value as string[]).includes(opt);
    return value === opt;
  }

  return (
    <div>
      <p className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleClick(opt)}
            className={`px-3 py-1.5 rounded-sm text-sm border transition-[background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 ${
              isActive(opt)
                ? "bg-gold-500 border-gold-500 text-dark-900 font-semibold"
                : "bg-dark-800 border-dark-600 text-gray-400 hover:border-gold-500/50 hover:text-gray-200"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PropertyInquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [propertyType, setPropertyType] = useState<string[]>(["Any"]);
  const [timeline, setTimeline] = useState("ASAP");
  const [preApproval, setPreApproval] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!preApproval) {
      setError("Please let us know your pre-approval status.");
      setLoading(false);
      return;
    }

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "inquiry",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          beds,
          baths,
          priceMin,
          priceMax,
          propertyTypes: propertyType,
          timeline,
          preApproval,
          notes: data.get("notes") as string || "",
        }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="property-inquiry" className="py-20 px-6 relative overflow-hidden">
      {/* Warm radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(201,149,46,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left — value proposition */}
          <div className="md:sticky md:top-28">
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Customized Home Search</p>
                <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
              </div>
            </ScrollReveal>

            <SplitHeading className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Find Your Perfect Home
            </SplitHeading>

            <ScrollReveal direction="left" delay={150}>
              <p className="text-gray-400 leading-relaxed text-lg mb-8">
                Tell us what you&apos;re looking for and we&apos;ll do the work for you.
              </p>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-gray-300">
                    <svg
                      className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {perk}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right — form */}
          <ScrollReveal direction="right">
            <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <p className="text-gold-400 text-lg font-heading font-semibold mb-2">
                    We&apos;re on it!
                  </p>
                  <p className="text-gray-400">
                    We&apos;ll search the MLS for homes that match and reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Home search preferences">

                  <ButtonGroup label="Bedrooms" options={bedOptions} value={beds} onChange={(v) => setBeds(v as string)} />
                  <ButtonGroup label="Bathrooms" options={bathOptions} value={baths} onChange={(v) => setBaths(v as string)} />

                  {/* Price range */}
                  <div>
                    <p className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Price Range</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                        placeholder="Min (e.g. $200k)"
                      />
                      <span className="text-gray-600 flex-shrink-0">–</span>
                      <input
                        type="text"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                        placeholder="Max (e.g. $500k)"
                      />
                    </div>
                  </div>

                  <ButtonGroup label="Property Type(s)" options={propertyTypes} value={propertyType} onChange={(v) => setPropertyType(v as string[])} multi />

                  <ButtonGroup label="Pre-Approved? *" options={preApprovalOptions} value={preApproval} onChange={(v) => setPreApproval(v as string)} />

                  {/* Timeline */}
                  <div>
                    <p className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Timeline</p>
                    <div className="flex flex-wrap gap-2">
                      {timelines.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(opt)}
                          className={`px-3 py-1.5 rounded-sm text-sm border transition-[background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 ${
                            timeline === opt
                              ? "bg-gold-500 border-gold-500 text-dark-900 font-semibold"
                              : "bg-dark-800 border-dark-600 text-gray-400 hover:border-gold-500/50 hover:text-gray-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional info */}
                  <div>
                    <label htmlFor="inquiry-notes" className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">
                      Anything Else? <span className="normal-case tracking-normal text-gray-600 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      id="inquiry-notes"
                      name="notes"
                      rows={3}
                      className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors resize-none text-sm"
                      placeholder="Garage, yard, school district, specific neighborhoods..."
                    />
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dark-600/50 pt-6 space-y-4">
                    <p className="text-xs text-gray-600 text-center">Don&apos;t worry, we don&apos;t sell your info — we sell homes</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inquiry-name" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="inquiry-name"
                          name="name"
                          required
                          autoComplete="name"
                          className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div>
                        <label htmlFor="inquiry-email" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          id="inquiry-email"
                          name="email"
                          required
                          autoComplete="email"
                          className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="inquiry-phone" className="block text-sm text-gray-400 mb-1.5 uppercase tracking-wider">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        name="phone"
                        required
                        autoComplete="tel"
                        className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400/80 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-60 disabled:cursor-not-allowed text-dark-900 font-semibold px-8 py-4 rounded-sm text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(201,149,46,0.25)] hover:shadow-[0_0_30px_rgba(201,149,46,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-700 active:scale-[0.97] transition-[background-color,box-shadow,transform] duration-300 cursor-pointer"
                  >
                    {loading ? "Submitting…" : "Find My Home →"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
