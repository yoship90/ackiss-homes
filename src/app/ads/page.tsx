"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PasswordGate, { INTERNAL_AUTH_KEY } from "@/components/PasswordGate";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const sections = [
  {
    id: "big-picture",
    label: "The Big Picture",
  },
  {
    id: "meta-pixel",
    label: "The Meta Pixel",
  },
  {
    id: "retargeting",
    label: "Retargeting",
  },
  {
    id: "lookalike",
    label: "Lookalike Audiences",
  },
  {
    id: "instagram",
    label: "Instagram Ads",
  },
  {
    id: "tiktok",
    label: "TikTok",
  },
  {
    id: "priority",
    label: "What to Do First",
  },
  {
    id: "setup",
    label: "Your Action Items",
  },
];

/* ------------------------------------------------------------------ */
/*  Components                                                          */
/* ------------------------------------------------------------------ */

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} className="mb-6 pt-2">
      <p className="text-gold-400 uppercase tracking-[0.3em] text-[10px] mb-2">{eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">{title}</h2>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-dark-700 border border-dark-600/50 rounded-sm p-6 ${className}`}>
      {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-dark-600/50">
            {headers.map((h, i) => (
              <th key={i} className="text-left text-[10px] uppercase tracking-[0.2em] text-gray-500 pb-3 pr-6 font-normal">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-dark-600/20 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="py-3 pr-6 text-gray-400 align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Step({ number, title, children, highlight }: { number: number; title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`flex gap-5 p-5 rounded-sm border ${highlight ? "border-gold-500/30 bg-gold-500/5" : "border-dark-600/40 bg-dark-700/50"}`}>
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${highlight ? "bg-gold-500 text-dark-900" : "bg-dark-600 text-gray-400"}`}>
        {number}
      </div>
      <div>
        <p className={`font-semibold mb-1 ${highlight ? "text-gold-400" : "text-white"}`}>{title}</p>
        <div className="text-gray-400 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) {
  const styles = {
    info:    "border-blue-500/20 bg-blue-500/5 text-blue-300",
    warning: "border-amber-500/20 bg-amber-500/5 text-amber-300",
    tip:     "border-gold-500/20 bg-gold-500/5 text-gold-300",
  };
  return (
    <div className={`border rounded-sm px-5 py-4 text-sm leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function AdsPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(INTERNAL_AUTH_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-black">

      {/* Header */}
      <header className="border-b border-dark-600/40 px-6 py-4 sticky top-0 bg-black/95 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Ackiss Homes" width={36} height={33} className="opacity-90" />
            <div>
              <div className="text-white font-heading font-bold text-base leading-none tracking-wide">Ackiss Homes</div>
              <div className="text-gold-500 text-[10px] uppercase tracking-[0.25em] mt-0.5">Internal</div>
            </div>
          </Link>
          <Link href="/todo" className="text-xs text-gray-400 uppercase tracking-widest hover:text-gold-400 transition-colors">
            ← To Do
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-14 flex gap-12">

        {/* Sidebar nav — desktop only */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-4">On this page</p>
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-xs text-gray-500 hover:text-gold-400 transition-colors py-1 leading-snug"
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 space-y-16">

          {/* Hero */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="text-gold-400 uppercase tracking-[0.3em] text-xs">Internal Reference</p>
              <div className="h-px w-8 bg-gold-500/40" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Facebook & Instagram <span className="text-gold-400">Ads Guide</span>
            </h1>
            <p className="text-gray-400 max-w-xl leading-relaxed">
              Everything you need to know about Meta advertising, the Pixel, retargeting, and what to do next — written specifically for Ackiss Homes.
            </p>
          </div>

          {/* -------------------------------------------------------- */}
          {/* 1. The Big Picture                                         */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="big-picture" eyebrow="Overview" title="The Big Picture" />
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Facebook and Instagram ads are run from a single platform — <strong className="text-white">Meta Ads Manager</strong>. One account, one budget, one set of targeting tools covers both platforms simultaneously. You choose which platforms to show your ads on, or let Meta decide automatically where they perform best.
              </p>
              <p>
                The reason Meta ads are so powerful for real estate is that Meta has <strong className="text-white">extraordinarily detailed data</strong> on its users — age, location, income signals, homeownership status, life events (recently engaged, new job, recently moved), and browsing behavior. You can put your ads in front of exactly the right people.
              </p>
            </div>

            <div className="mt-6">
              <Table
                headers={["Platform", "Best for", "Core demographic"]}
                rows={[
                  ["Facebook", "Older buyers, sellers, referral network", "35–65+"],
                  ["Instagram", "First-time buyers, move-up buyers, visual listings", "25–44"],
                  ["Both together", "Full-funnel coverage", "All age groups"],
                ]}
              />
            </div>

            <div className="mt-6">
              <Callout type="tip">
                <strong>Key insight:</strong> Instagram is arguably more valuable for real estate than Facebook right now. Real estate is visual — a great listing photo or 30-second property walkthrough Reel performs extremely well there, and the 25–44 demographic is exactly your buyer market.
              </Callout>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/* 2. The Meta Pixel                                          */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="meta-pixel" eyebrow="The Foundation" title="The Meta Pixel" />
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                The Meta Pixel is a small piece of JavaScript code installed on ackisshomes.com. Once in place, it runs invisibly in the background on every page. When someone visits the site, the Pixel fires and sends that visit data to Meta — matched back to their Facebook or Instagram account if they&apos;re logged in.
              </p>
              <p>
                Think of it as a silent list-builder. Every person who visits your website automatically gets added to an audience pool that you can later advertise to.
              </p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <Card>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">What it tracks</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    "Who visited the site",
                    "Which pages they viewed",
                    "Whether they submitted a form",
                    "How long they spent on the site",
                    "Whether they came back later",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold-500 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">What it enables</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    "Show ads to past site visitors",
                    "Find new people similar to your visitors",
                    "Measure exactly which ads drive leads",
                    "Optimize ad spend automatically",
                    "Track cost per lead precisely",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold-500 mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="mt-4">
              <Callout type="info">
                <strong>Important:</strong> The Pixel data is cumulative and can&apos;t be collected retroactively. Every day without it installed is visitor data permanently lost. Even at low traffic, installing it now means the audience pool is already building by the time you&apos;re ready to run ads.
              </Callout>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/* 3. Retargeting                                             */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="retargeting" eyebrow="Audience Type 1" title="Retargeting" />
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Retargeting means showing ads specifically to people who have <strong className="text-white">already visited your website</strong>. These are your warmest possible prospects — they already know who Ackiss Homes is.
              </p>
            </div>

            <Card className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4">How it plays out</p>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Someone searches 'Virginia Beach real estate agent' and finds ackisshomes.com" },
                  { step: "2", text: "They browse around, use the mortgage calculator, but don't contact you" },
                  { step: "3", text: "They go back to scrolling Instagram that evening" },
                  { step: "4", text: "Your ad appears in their feed: 'Still thinking about buying in Virginia Beach?'" },
                  { step: "5", text: "They click, come back, and submit the contact form" },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-dark-600 text-gray-500 flex items-center justify-center text-[10px] mt-0.5">{step}</span>
                    {text}
                  </div>
                ))}
              </div>
            </Card>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-4">Why retargeting outperforms cold ads:</p>
              <Table
                headers={["Audience", "Cost per 1k impressions", "Conversion rate", "Cost per lead"]}
                rows={[
                  ["Broad / untargeted", "Lower", "~0.5%", "~$40+"],
                  [<span key="r" className="text-gold-400 font-medium">Retargeting (past visitors)</span>, "Similar", "~5–15%", <span key="c" className="text-gold-400 font-medium">~$5–10</span>],
                ]}
              />
              <p className="text-xs text-gray-600 mt-2">Numbers are illustrative. Actual results vary by market, creative, and budget.</p>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/* 4. Lookalike Audiences                                     */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="lookalike" eyebrow="Audience Type 2" title="Lookalike Audiences" />
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Once the Pixel has collected enough visitors (typically 1,000+), Meta can analyze what those people have in common and find <strong className="text-white">thousands of new people who match that profile</strong> — even if they&apos;ve never heard of Ackiss Homes.
              </p>
              <p>
                This is how you reach brand new prospects without guessing at who to target manually. Meta&apos;s data is deep enough to identify people who look like your typical buyer or seller based on dozens of signals — not just age and zip code.
              </p>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[
                { label: "Life events", examples: "Recently engaged, new job, recently moved, expecting a baby" },
                { label: "Financial signals", examples: "Income bracket, homeownership status, credit card behavior" },
                { label: "Behavior", examples: "Browsing real estate content, Zillow activity, mortgage research" },
              ].map(({ label, examples }) => (
                <Card key={label}>
                  <p className="text-xs font-semibold text-white mb-2">{label}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{examples}</p>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Callout type="tip">
                <strong>No extra setup needed.</strong> Lookalike Audiences are built automatically from your Pixel data inside Meta Ads Manager. Once you have 1,000+ visitors collected, the option simply appears as a button when creating a campaign. Installing the Pixel is the only prerequisite.
              </Callout>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/* 5. Instagram                                               */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="instagram" eyebrow="Platform" title="Instagram Ads" />
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Instagram is part of the same Meta platform — the same Pixel, the same Ads Manager, the same targeting. You don&apos;t set up anything separately for Instagram. When creating a campaign you simply check which placements you want, and Instagram is one of them.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-4">Ad formats that work well for real estate on Instagram:</p>
              <div className="space-y-3">
                {[
                  { format: "Single image", desc: "A great listing photo with a clear headline and CTA. Simple, effective, especially for retargeting." },
                  { format: "Carousel", desc: "Swipe through multiple images — perfect for showing multiple rooms of a listing or several properties at once." },
                  { format: "Reels / Video", desc: "15–30 second property walkthrough, neighborhood tour, or market update. Highest engagement format right now. Also gets organic reach to non-followers." },
                  { format: "Stories", desc: "Full-screen vertical ads between Stories. High visibility, feels native. Quick swipe-up to your site." },
                ].map(({ format, desc }) => (
                  <div key={format} className="flex gap-4 p-4 bg-dark-700/50 border border-dark-600/30 rounded-sm">
                    <span className="shrink-0 text-xs font-semibold text-gold-400 w-24">{format}</span>
                    <span className="text-sm text-gray-400">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Callout type="warning">
                <strong>Organic vs. Paid are different strategies.</strong> Posting regularly to your Instagram account (free) builds your brand and following over time. Paid ads reach people who don&apos;t follow you. Both are valuable — organic builds trust, paid drives specific campaigns. They work best together.
              </Callout>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/* 6. TikTok                                                  */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="tiktok" eyebrow="Platform" title="TikTok — Worth It?" />
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                TikTok is worth understanding, but the answer for Ackiss Homes is: <strong className="text-white">don&apos;t run TikTok ads yet, but do consider it for organic content.</strong>
              </p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <Card>
                <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 mb-3">The case for it</p>
                <ul className="space-y-3 text-sm text-gray-400">
                  {[
                    { title: "Audience older than you think", desc: "25–34 is now one of TikTok's largest segments — that's first-time homebuyer territory." },
                    { title: "Organic reach is exceptional", desc: "A property walkthrough that might reach 500 people on Instagram could reach 50,000 on TikTok for free. The algorithm pushes content to non-followers aggressively." },
                    { title: "Ads are currently cheaper", desc: "The ad platform is less saturated than Meta right now. Cost per click and cost per lead tend to be lower — though that gap will close." },
                  ].map(({ title, desc }) => (
                    <li key={title} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5 shrink-0">→</span>
                      <span><strong className="text-white">{title}.</strong> {desc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <p className="text-[10px] uppercase tracking-[0.2em] text-red-400/70 mb-3">The case against it</p>
                <ul className="space-y-3 text-sm text-gray-400">
                  {[
                    { title: "Video only", desc: "TikTok is video-only. No image ads or carousels. Someone needs to be comfortable on camera filming walkthroughs, market updates, neighborhood content." },
                    { title: "Weaker local targeting", desc: "Meta's zip code and radius targeting is more precise. For a hyperlocal Virginia Beach business, Meta is simply better for paid ads." },
                    { title: "Platform uncertainty", desc: "TikTok has faced ongoing US ban threats for over a year. Investing heavily in a platform that could be restricted is a real risk. Meta isn't going anywhere." },
                    { title: "Less refined ad tools", desc: "The TikTok Pixel exists but isn't as mature as Meta's. Retargeting and lookalike audiences work, but the sophistication isn't there yet." },
                  ].map(({ title, desc }) => (
                    <li key={title} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5 shrink-0">→</span>
                      <span><strong className="text-white">{title}.</strong> {desc}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="mt-6">
              <Table
                headers={["", "Meta (Facebook/Instagram)", "TikTok"]}
                rows={[
                  ["Ad platform maturity",   "Very mature",         "Less mature"],
                  ["Local targeting",        "Excellent",           "Good but weaker"],
                  ["Pixel / retargeting",    "Industry-leading",    "Exists, less refined"],
                  ["Ad cost right now",      "Moderate",            "Currently lower"],
                  ["Organic reach",          "Weak on FB, decent on Reels", "Exceptional"],
                  ["Content requirement",    "Images or video",     "Video only"],
                  ["Platform stability",     "Very stable",         "Uncertain (ban risk)"],
                  ["Best use for real estate", "Paid ads + retargeting", "Organic video content"],
                ]}
              />
            </div>

            <div className="mt-6">
              <Callout type="tip">
                <strong>The organic opportunity is real.</strong> Some of the most successful real estate agents on TikTok aren&apos;t running a single paid ad — they post consistently (property tours, &quot;what $400k buys you in Virginia Beach,&quot; neighborhood guides, market updates) and let the algorithm drive free reach to a local audience. If either of you is comfortable on camera, this is worth exploring alongside Meta — just don&apos;t pay for TikTok ads until Meta is dialed in first.
              </Callout>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/* 7. Priority Order                                          */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="priority" eyebrow="Strategy" title="What to Do First" />
            <div className="space-y-4 text-gray-400 leading-relaxed mb-6">
              <p>
                The site currently has low traffic. Running paid ads before building an organic foundation is putting the cart before the horse. Here&apos;s the recommended order:
              </p>
            </div>

            <Table
              headers={["Priority", "Action", "Cost", "Why"]}
              rows={[
                [
                  <span key="1" className="text-gold-400 font-bold">1</span>,
                  <span key="a" className="text-white font-medium">Google Business Profile</span>,
                  "Free",
                  "Highest-impact local SEO action. Gets Ackiss Homes into Google Maps results for 'Virginia Beach real estate agent' searches. People searching Google are further along in their buying decision than anyone scrolling Instagram."
                ],
                [
                  <span key="2" className="text-gray-400">2</span>,
                  "Install Meta Pixel",
                  "Free",
                  "Starts collecting visitor data silently in the background. Every visitor GBP sends to the site gets added to your future ad audience automatically."
                ],
                [
                  <span key="3" className="text-gray-400">3</span>,
                  "Post organically on Instagram",
                  "Free",
                  "Listing photos, neighborhood content, market updates. Builds brand and sends followers to the site — pixel collects them too."
                ],
                [
                  <span key="4" className="text-gray-400">4</span>,
                  "TikTok organic content",
                  "Free",
                  "If comfortable on camera — property tours, neighborhood guides, market updates. TikTok's algorithm gives exceptional organic reach to non-followers. No ad spend needed."
                ],
                [
                  <span key="5" className="text-gray-400">5</span>,
                  "Run first Meta paid campaign",
                  "$5–10/day",
                  "Once the pixel has a meaningful audience pool (1,000+ visitors), retargeting and lookalike audiences are ready. First campaign can start very small."
                ],
                [
                  <span key="6" className="text-gray-400">6</span>,
                  "TikTok paid ads",
                  "$",
                  "Not a priority until Meta is dialed in. Consider only after Meta campaigns are running and performing well."
                ],
              ]}
            />

            <div className="mt-6">
              <Callout type="tip">
                Steps 1–3 build on each other. GBP drives traffic → Pixel collects that traffic → organic posts drive more traffic → Pixel collects those too. By the time you run paid ads (step 5), the audience data is already there and campaigns are more effective from day one.
              </Callout>
            </div>
          </section>

          {/* -------------------------------------------------------- */}
          {/* 7. Action Items                                            */}
          {/* -------------------------------------------------------- */}
          <section>
            <SectionHeading id="setup" eyebrow="Next Steps" title="Your Action Items" />
            <p className="text-gray-400 mb-8 leading-relaxed">
              Here&apos;s exactly what needs to happen and who does what.
            </p>

            <div className="space-y-4">
              <Step number={1} title="Jeremy: Set up Meta Business Manager" highlight>
                <p>Go to <strong className="text-white">business.facebook.com</strong> and create a Business Manager account (or log in if you already have one from running previous ads). This is the professional dashboard for running ads — separate from your personal Facebook profile.</p>
                <p className="mt-2">If you ran Facebook ads before, you may already have one. Check first.</p>
              </Step>

              <Step number={2} title="Jeremy: Create a Meta Pixel" highlight>
                <p>Inside Business Manager, go to <strong className="text-white">Events Manager → Connect Data Sources → Web → Meta Pixel</strong>. Create a new Pixel named &quot;Ackiss Homes.&quot;</p>
                <p className="mt-2">Meta will give you a <strong className="text-white">Pixel ID</strong> — a number like <code className="text-gold-400 text-xs bg-dark-800 px-1.5 py-0.5 rounded">1234567890123456</code>. Share that number with Nate.</p>
              </Step>

              <Step number={3} title="Nate: Install Pixel on the site">
                <p>Once the Pixel ID is shared, it gets added to the site&apos;s root layout — covers every page automatically. Takes about 5 minutes. The Privacy Policy page will also be updated with a one-paragraph disclosure.</p>
              </Step>

              <Step number={4} title="Wait and let it collect data">
                <p>No action needed. The Pixel runs silently in the background and builds your audience pool over time. Check back in Meta Ads Manager after 30–60 days to see the audience size growing.</p>
              </Step>

              <Step number={5} title="Jeremy: Run first campaign when ready">
                <p>When the audience pool has grown (and ideally after GBP is set up driving organic traffic), start a small retargeting campaign. $5–10/day is enough to test. Target site visitors from the last 60 days with a simple awareness or lead-generation ad.</p>
              </Step>
            </div>

            <div className="mt-8 p-6 border border-dark-600/40 rounded-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Privacy & Legal</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                No cookie consent popup is required for a US-based local business not targeting EU visitors. The Privacy Policy on the site will be updated with a paragraph disclosing Meta Pixel usage once it&apos;s installed. That&apos;s sufficient for legal compliance at your scale and audience.
              </p>
            </div>
          </section>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-dark-600/40 px-6 py-6 text-center mt-8">
        <p className="text-xs text-gray-600 uppercase tracking-widest">
          Ackiss Homes &mdash; Internal Use Only
        </p>
      </footer>

    </div>
  );
}
