"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PasswordGate, { INTERNAL_AUTH_KEY } from "@/components/PasswordGate";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                        */
/* ------------------------------------------------------------------ */

type Status = "live" | "in-progress" | "needs-approval" | "todo" | "idea";
type Decision = "approved" | "approved-with-notes" | "changes-requested";

interface Entry {
  id: string;
  title: string;
  description: string;
  date: string;
  status: Status;
  priority?: "high";
  link?: string;
}

const entries: Entry[] = [
  // ---- LIVE ----
  {
    id: "hero-redesign",
    title: "Hero Section Redesign",
    description: "Complete dark luxury redesign of the homepage hero. Desktop uses a typewriter animation. Mobile shows the A logo at full brightness first, then fades it back as the text slides in.",
    date: "Feb 2026",
    status: "live",
  },
  {
    id: "mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Full-featured calculator with amortization schedule, extra payment modeling, homeowner expenses, a donut chart breakdown of lifetime costs, and a live mortgage rate chart.",
    date: "Feb 2026",
    status: "live",
  },
  {
    id: "social-feed",
    title: "Instagram Social Feed",
    description: "Social feed section with two embedded Instagram reels. Add new reel URLs directly in the code as content is posted.",
    date: "Feb 2026",
    status: "live",
  },
  {
    id: "fub-lead-type",
    title: "FUB Lead Type Custom Field",
    description: "Created a 'Lead Type' dropdown custom field in FUB (Buyer / Seller / Both) to track lead intent going forward. Should be filled in on every new lead.",
    date: "Feb 2026",
    status: "live",
  },

  // ---- NEEDS APPROVAL ----
  {
    id: "deal-progress",
    title: "Deal Progress Page (/deal/[token])",
    description: "A private, unguessable-URL page Amanda or Jeremy texts to clients after going under contract. Shows a live timeline of all closing milestones — inspection, PICRA, mortgage paperwork, appraisal, title, clear to close, and more. Currently a hardcoded demo — data would eventually feed from Airtable. Try the demo link to see the concept.",
    date: "Feb 2026",
    status: "needs-approval",
    link: "/deal/demo-ah7k2m9p4x",
  },
  {
    id: "review-funnel",
    title: "Post-Closing Review Funnel (/reviews)",
    description: "A private page to send clients after closing. They pick their agent (Amanda or Jeremy), then get directed to leave a Google review (primary) or the right Zillow profile (secondary). Noindex — not listed on the main site. The Google review link is a placeholder until the GBP is set up.",
    date: "Feb 2026",
    status: "needs-approval",
    link: "/reviews",
  },
  {
    id: "referral-page",
    title: "Referral Page (/referrals)",
    description: "A private page to send past clients. They enter their name and their friend's contact info — we get a warm referral lead pushed straight into FUB, tagged 'website-referral'. Noindex — not listed on the main site.",
    date: "Feb 2026",
    status: "needs-approval",
    link: "/referrals",
  },
  {
    id: "email-campaign-1",
    title: "Email Campaign #1 — Market Shift",
    description: "First reactivation email to ~900 cold leads in FUB. Neutral market update framing that works for both buyers and sellers. Draft ready — needs your approval before sending via FUB bulk email.",
    date: "Feb 2026",
    status: "needs-approval",
  },

  // ---- IN PROGRESS ----
  {
    id: "email-campaigns-234",
    title: "Email Campaigns #2, #3, #4 (Drip Sequence)",
    description: "Follow-up drip emails for non-responders: #2 'Are you starting to browse online?' (buyer angle), #3 'What's your home worth?' (seller angle), #4 simple personal check-in. Drafts pending.",
    date: "Feb 2026",
    status: "in-progress",
  },

  // ---- TO DO ----
  {
    id: "stpatricks-postcards",
    title: "St. Patrick's Day Postcards",
    description: "Design and send St. Patrick's Day postcards to the mailing list. Drafts are ready — needs final approval and mailing.",
    date: "Feb 2026",
    status: "todo",
    priority: "high",
  },
  {
    id: "google-business-profile",
    title: "Google Business Profile — Jeremy to Set Up",
    description: "Highest-impact local SEO action remaining. A verified GBP listing makes Ackiss Homes eligible for the Google Maps pack (the 3 results shown above organic search), dramatically increases visibility for 'Virginia Beach real estate agent' searches, and is required before we can add a real Google review link to the post-closing review page. Go to business.google.com, create the listing, and verify via postcard or phone. Add both Amanda and Jeremy as managers once set up.",
    date: "Feb 2026",
    status: "todo",
    priority: "high",
  },
  {
    id: "seo-crawling",
    title: "SEO: Enable Search Engine Crawling",
    description: "The site currently blocks search engine indexing. Need to update robots.txt to allow crawling, generate a sitemap.xml, and add JSON-LD structured data for local business. Without this, the site won't appear in Google search results.",
    date: "Feb 2026",
    status: "todo",
  },
  {
    id: "og-image",
    title: "Improve Social Share (OG) Image",
    description: "When the site is shared on social media or iMessage, the preview image is a low-res screenshot (251×69px). Needs to be rebuilt as a proper high-res image for a professional appearance.",
    date: "Feb 2026",
    status: "live",
  },
  {
    id: "custom-domain",
    title: "Custom Domain (ackisshomes.com)",
    description: "ackisshomes.com is connected and live via Vercel.",
    date: "Feb 2026",
    status: "live",
  },
  {
    id: "calendly",
    title: "Calendly Booking Integration",
    description: "Add a 'Schedule a Free Consultation' button using Calendly. Could live in the hero, contact section, or as a sticky floating button. Free plan available at calendly.com — just needs availability configured.",
    date: "Feb 2026",
    status: "todo",
  },
  {
    id: "fub-listings",
    title: "FUB API for Featured Listings",
    description: "Wire up the featured listings section to automatically pull active listings from FUB custom fields. Currently the listings section is hidden when empty.",
    date: "Feb 2026",
    status: "todo",
  },
  {
    id: "instagram-behold",
    title: "Connect Live Instagram Feed via Behold",
    description: "Replace the current static Instagram embeds with a Behold widget that automatically updates when new posts are made to the Instagram account.",
    date: "Feb 2026",
    status: "todo",
  },
  {
    id: "triumph-permission",
    title: "Confirm Triumph Realty MLS iframe Permission",
    description: "The MLS search iframe from Triumph Realty works technically but needs their formal sign-off before going live permanently. Need to follow up with Triumph.",
    date: "Feb 2026",
    status: "todo",
  },
  {
    id: "fub-drip-setup",
    title: "Set Up Drip Sequence in FUB Action Plans",
    description: "Once all four email drafts are approved, configure them as an automated action plan in FUB so non-responders receive follow-ups on the right cadence.",
    date: "Feb 2026",
    status: "todo",
  },

  // ---- IDEAS ----
  {
    id: "google-voice",
    title: "Google Voice Business Number",
    description: "Set up one shared Google Voice number as the official Ackiss Homes business number — list it on the website, GBP, and business cards. Free plan forwards calls to both Amanda and Jeremy's phones simultaneously so whoever is available picks up. Texts are shared between both phones, so you'd need a quick system to avoid both replying to the same client. Recommendation: one shared number for brand consistency rather than individual numbers per agent.",
    date: "Feb 2026",
    status: "todo",
  },
  {
    id: "market-report",
    title: "Hampton Roads Market Report Page",
    description: "A quarterly-updated page showing local market stats — median price, days on market, active inventory, year-over-year change — sourced from Virginia REALTORS or HRRA data. Positions Jeremy & Amanda as the local market authority.",
    date: "Feb 2026",
    status: "idea",
  },
  {
    id: "neighborhoods",
    title: "Featured Neighborhoods Section",
    description: "Re-add the Neighborhoods component to the homepage (already built, just needs to be enabled). Showcases key Virginia Beach and Hampton Roads neighborhoods with descriptions and photos.",
    date: "Feb 2026",
    status: "idea",
  },
  {
    id: "zillow-landing-pages",
    title: "SEO Landing Pages — 'Alternatives to Zillow'",
    description: "Create targeted landing pages for low-competition, high-intent searches like 'alternatives to Zillow Virginia Beach' and 'is Zillow accurate Virginia Beach'. Strong SEO opportunity with minimal competition.",
    date: "Feb 2026",
    status: "idea",
  },
];

/* ------------------------------------------------------------------ */
/*  Config                                                              */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG: Record<Status, { label: string; color: string; dot: string }> = {
  "live":             { label: "Live",            color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
  "in-progress":      { label: "In Progress",     color: "bg-amber-500/10 text-amber-400 border-amber-500/20",       dot: "bg-amber-400" },
  "needs-approval":   { label: "Needs Approval",  color: "bg-gold-500/10 text-gold-400 border-gold-500/20",         dot: "bg-gold-400" },
  "todo":             { label: "To Do",            color: "bg-gray-500/10 text-gray-400 border-gray-500/20",         dot: "bg-gray-400" },
  "idea":             { label: "Idea",             color: "bg-purple-500/10 text-purple-400 border-purple-500/20",   dot: "bg-purple-400" },
};

const SECTIONS: { status: Status; heading: string }[] = [
  { status: "todo",           heading: "To Do" },
  { status: "needs-approval", heading: "Needs Your Approval" },
  { status: "in-progress",    heading: "In Progress" },
  { status: "idea",           heading: "Ideas" },
  { status: "live",           heading: "Live on the Site" },
];

/* ------------------------------------------------------------------ */
/*  Approval state per entry                                            */
/* ------------------------------------------------------------------ */

interface ApprovalState {
  stage: "idle" | "who" | "decision" | "notes" | "submitting" | "done";
  approver: string;
  decision: Decision | null;
  notes: string;
  error: boolean;
}

const defaultApproval = (): ApprovalState => ({
  stage: "idle",
  approver: "",
  decision: null,
  notes: "",
  error: false,
});

/* ------------------------------------------------------------------ */
/*  Team Feedback                                                       */
/* ------------------------------------------------------------------ */

const FEEDBACK_KEY = "ackiss_feedback_v1";

type Reaction = "up" | "down" | "sideways";
type ItemStatus =
  | "pending-nate"
  | "pending-amanda"
  | "pending-jeremy"
  | "in-review"
  | "blocked"
  | "on-hold"
  | "completed"
  | "not-doing";

interface FeedbackData {
  itemStatus: ItemStatus;
  reactions: { amanda: Reaction | null; jeremy: Reaction | null };
  reactionNotes: { amanda: string; jeremy: string };
  notes: { nate: string; amanda: string; jeremy: string };
}

const DEFAULT_FEEDBACK: FeedbackData = {
  itemStatus: "pending-nate",
  reactions: { amanda: null, jeremy: null },
  reactionNotes: { amanda: "", jeremy: "" },
  notes: { nate: "", amanda: "", jeremy: "" },
};

const ITEM_STATUS_OPTIONS: { value: ItemStatus; label: string; hex: string }[] = [
  { value: "pending-nate",   label: "Pending · Nate",   hex: "#9ca3af" },
  { value: "pending-amanda", label: "Pending · Amanda", hex: "#c9952e" },
  { value: "pending-jeremy", label: "Pending · Jeremy", hex: "#c9952e" },
  { value: "in-review",      label: "In Review",        hex: "#818cf8" },
  { value: "blocked",        label: "Blocked",          hex: "#f87171" },
  { value: "on-hold",        label: "On Hold",          hex: "#fb923c" },
  { value: "completed",      label: "Completed",        hex: "#34d399" },
  { value: "not-doing",      label: "Not Doing",        hex: "#4b5563" },
];

function loadFeedback(entryId: string): FeedbackData {
  try {
    const stored = localStorage.getItem(FEEDBACK_KEY);
    if (stored) {
      const all = JSON.parse(stored);
      if (all[entryId]) return { ...DEFAULT_FEEDBACK, ...all[entryId] };
    }
  } catch { /* ignore */ }
  return DEFAULT_FEEDBACK;
}

function persistFeedback(entryId: string, data: FeedbackData) {
  try {
    const stored = localStorage.getItem(FEEDBACK_KEY);
    const all = stored ? JSON.parse(stored) : {};
    all[entryId] = data;
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(all));
  } catch { /* ignore */ }
}

function ThumbBtn({ type, active, onClick }: { type: Reaction; active: boolean; onClick: () => void }) {
  const rotation = type === "down" ? "180deg" : type === "sideways" ? "-90deg" : "0deg";
  const activeColor = type === "up" ? "#34d399" : type === "down" ? "#f87171" : "#fbbf24";
  const title = type === "up" ? "Looks good" : type === "down" ? "Not a fan" : "Needs discussion";
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-7 h-7 rounded flex items-center justify-center transition-[background-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold-500 active:scale-90 ${
        active ? "bg-dark-600/80" : "hover:bg-dark-600/40"
      }`}
      style={{ color: active ? activeColor : "#4b5563" }}
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style={{ transform: `rotate(${rotation})` }}>
        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
      </svg>
    </button>
  );
}

function FeedbackSection({ entryId }: { entryId: string }) {
  const [data, setData] = useState<FeedbackData>(DEFAULT_FEEDBACK);
  const [notesOpen, setNotesOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setData(loadFeedback(entryId));
    setLoaded(true);
  }, [entryId]);

  function save(updated: FeedbackData) {
    setData(updated);
    persistFeedback(entryId, updated);
  }

  function toggleReaction(person: "amanda" | "jeremy", reaction: Reaction) {
    save({
      ...data,
      reactions: { ...data.reactions, [person]: data.reactions[person] === reaction ? null : reaction },
    });
  }

  if (!loaded) return null;

  const statusOption = ITEM_STATUS_OPTIONS.find(o => o.value === data.itemStatus) ?? ITEM_STATUS_OPTIONS[0];
  const noteCount = Object.values(data.notes).filter(n => n.trim()).length;

  return (
    <div className="mt-4 pt-4 border-t border-dark-600/25">

      {/* Status + reactions row */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">

        {/* Status dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.25em] text-gray-700">Status</span>
          <div className="relative">
            <select
              value={data.itemStatus}
              onChange={(e) => save({ ...data, itemStatus: e.target.value as ItemStatus })}
              className="bg-dark-700/70 border border-dark-600/40 hover:border-dark-500 rounded-sm text-[11px] pl-2.5 pr-6 py-1.5 focus:outline-none focus:border-gold-500/50 appearance-none cursor-pointer transition-[border-color] duration-200"
              style={{ color: statusOption.hex }}
            >
              {ITEM_STATUS_OPTIONS.map(({ value, label, hex }) => (
                <option key={value} value={value} style={{ color: hex, background: "#1a1a1a" }}>
                  {label}
                </option>
              ))}
            </select>
            <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Thumbs — Amanda & Jeremy */}
        <div className="flex items-center gap-3">
          {(["amanda", "jeremy"] as const).map((person) => (
            <div key={person} className="flex items-center gap-0.5">
              <span className="text-[9px] uppercase tracking-[0.15em] text-gray-700 mr-1 capitalize">{person[0]}</span>
              {(["up", "down", "sideways"] as Reaction[]).map((type) => (
                <ThumbBtn
                  key={type}
                  type={type}
                  active={data.reactions[person] === type}
                  onClick={() => toggleReaction(person, type)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Sideways expansion — discussion notes per person */}
      {(["amanda", "jeremy"] as const).map((person) =>
        data.reactions[person] === "sideways" ? (
          <div key={`${person}-rx`} className="mb-3">
            <label className="block text-[9px] uppercase tracking-[0.25em] text-amber-500/60 mb-1.5 capitalize">
              {person} — what needs discussing?
            </label>
            <textarea
              value={data.reactionNotes[person]}
              onChange={(e) => save({ ...data, reactionNotes: { ...data.reactionNotes, [person]: e.target.value } })}
              rows={2}
              placeholder="Add discussion notes…"
              className="w-full bg-dark-700/50 border border-amber-500/15 rounded-sm px-3 py-2 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-amber-500/30 transition-[border-color] duration-200 resize-none"
            />
          </div>
        ) : null
      )}

      {/* Notes toggle */}
      <button
        type="button"
        onClick={() => setNotesOpen(o => !o)}
        className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] text-gray-600 hover:text-gray-400 transition-[color] duration-150 focus-visible:outline-none focus-visible:text-gold-400"
      >
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${notesOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        Notes
        {noteCount > 0 && <span className="text-gold-500/50 ml-0.5">{noteCount}</span>}
      </button>

      {notesOpen && (
        <div className="mt-3 space-y-3">
          {(["nate", "amanda", "jeremy"] as const).map((person) => (
            <div key={person}>
              <label className="block text-[9px] uppercase tracking-[0.25em] text-gray-600 mb-1.5 capitalize">
                {person}
              </label>
              <textarea
                value={data.notes[person]}
                onChange={(e) => save({ ...data, notes: { ...data.notes, [person]: e.target.value } })}
                rows={2}
                placeholder={person === "nate" ? "Your notes…" : `${person.charAt(0).toUpperCase() + person.slice(1)}'s notes…`}
                className="w-full bg-dark-700/50 border border-dark-600/30 rounded-sm px-3 py-2 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-gold-500/30 transition-[border-color] duration-200 resize-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card component                                                      */
/* ------------------------------------------------------------------ */

function EntryCard({ entry }: { entry: Entry }) {
  const [state, setState] = useState<ApprovalState>(defaultApproval());
  const cfg = STATUS_CONFIG[entry.status];

  async function submitApproval() {
    if (!state.approver || !state.decision) return;
    setState((s) => ({ ...s, stage: "submitting", error: false }));

    try {
      const res = await fetch("/api/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: entry.id,
          itemTitle: entry.title,
          approvedBy: state.approver,
          decision: state.decision,
          notes: state.notes,
        }),
      });
      if (!res.ok) throw new Error();
      setState((s) => ({ ...s, stage: "done" }));
    } catch {
      setState((s) => ({ ...s, stage: "notes", error: true }));
    }
  }

  return (
    <div className={`relative bg-dark-700 border rounded-sm p-6 transition-[border-color] duration-300 ${
      state.stage === "done"
        ? "border-emerald-500/40"
        : entry.status === "needs-approval"
        ? "border-gold-500/30 hover:border-gold-500/50"
        : "border-dark-600/50 hover:border-dark-600"
    }`}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
          {entry.priority === "high" && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">
              ↑ High Priority
            </span>
          )}
          {entry.link && (
            <Link href={entry.link} className="text-xs text-gold-500/60 hover:text-gold-400 transition-colors uppercase tracking-wider">
              View →
            </Link>
          )}
        </div>
        <span className="text-xs text-gray-600 shrink-0">{entry.date}</span>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold mb-2 leading-snug">{entry.title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed">{entry.description}</p>

      {/* Approval UI — only for needs-approval items */}
      {entry.status === "needs-approval" && (
        <div className="mt-5 pt-5 border-t border-dark-600/50">

          {/* Done */}
          {state.stage === "done" && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Response logged in FUB — thank you, {state.approver}!
            </div>
          )}

          {/* Idle */}
          {state.stage === "idle" && (
            <button
              onClick={() => setState((s) => ({ ...s, stage: "who" }))}
              className="text-xs uppercase tracking-widest text-gold-400 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 transition-colors border border-gold-500/30 hover:border-gold-500/60 px-4 py-2 rounded-sm"
            >
              Respond to this item →
            </button>
          )}

          {/* Who are you? */}
          {state.stage === "who" && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Who is responding?</p>
              <div className="flex gap-2">
                {["Amanda", "Jeremy"].map((name) => (
                  <button
                    key={name}
                    onClick={() => setState((s) => ({ ...s, stage: "decision", approver: name }))}
                    className="px-5 py-2 border border-dark-600 rounded-sm text-sm text-gray-300 hover:border-gold-500/50 hover:text-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 transition-colors"
                  >
                    {name}
                  </button>
                ))}
                <button
                  onClick={() => setState(defaultApproval())}
                  className="px-3 py-2 text-xs text-gray-600 hover:text-gray-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-60 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Decision */}
          {state.stage === "decision" && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{state.approver} — your decision:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setState((s) => ({ ...s, decision: "approved", notes: "", stage: "submitting" })); submitApproval(); }}
                  className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-sm text-sm hover:bg-emerald-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95 transition-colors uppercase tracking-wider"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => setState((s) => ({ ...s, decision: "approved-with-notes", stage: "notes" }))}
                  className="px-4 py-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 rounded-sm text-sm hover:bg-gold-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 transition-colors uppercase tracking-wider"
                >
                  📝 Approve with Notes
                </button>
                <button
                  onClick={() => setState((s) => ({ ...s, decision: "changes-requested", stage: "notes" }))}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-sm text-sm hover:bg-red-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 active:scale-95 transition-colors uppercase tracking-wider"
                >
                  🔄 Request Changes
                </button>
                <button
                  onClick={() => setState(defaultApproval())}
                  className="px-3 py-2 text-xs text-gray-600 hover:text-gray-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-60 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Notes */}
          {state.stage === "notes" && (
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                {state.decision === "approved-with-notes" ? "What changes would you like?" : "What needs to change?"}
              </p>
              <textarea
                value={state.notes}
                onChange={(e) => setState((s) => ({ ...s, notes: e.target.value }))}
                rows={3}
                placeholder="Add your notes here..."
                className="w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gold-500 transition-colors resize-none"
              />
              {state.error && (
                <p className="text-red-400 text-xs mt-1">Something went wrong — please try again.</p>
              )}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={submitApproval}
                  disabled={!state.notes.trim()}
                  className="px-5 py-2 bg-gold-500 hover:bg-gold-400 disabled:opacity-40 text-dark-900 font-bold rounded-sm text-xs uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-1 focus-visible:ring-offset-dark-800 active:scale-95 transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={() => setState(defaultApproval())}
                  className="px-3 py-2 text-xs text-gray-600 hover:text-gray-400 focus-visible:outline-none focus-visible:text-gold-400 active:opacity-60 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Submitting */}
          {state.stage === "submitting" && (
            <p className="text-xs text-gray-500 uppercase tracking-widest">Logging response...</p>
          )}
        </div>
      )}

      {/* Team feedback — status, reactions, notes */}
      <FeedbackSection entryId={entry.id} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function TodoPage() {
  const [authed, setAuthed] = useState(false);
  const [filter, setFilter] = useState<Status | "all">("all");

  useEffect(() => {
    if (localStorage.getItem(INTERNAL_AUTH_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  const filtered = filter === "all"
    ? entries
    : entries.filter((e) => e.status === filter);

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Header */}
      <header className="border-b border-dark-600/40 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Ackiss Homes" width={40} height={37} className="opacity-90" />
            <div>
              <div className="text-white font-heading font-bold text-lg leading-none tracking-wide">Ackiss Homes</div>
              <div className="text-gold-500 text-[10px] uppercase tracking-[0.25em] mt-0.5">To Do</div>
            </div>
          </Link>
          <Link href="/" className="text-xs text-gray-400 uppercase tracking-widest hover:text-gold-400 transition-colors">
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-6 py-14">
        <div className="max-w-5xl mx-auto">

          {/* Intro */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <p className="text-gold-400 uppercase tracking-[0.3em] text-xs">Internal</p>
              <div className="h-px w-8 bg-gold-500/40" />
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              What We&rsquo;re <span className="text-gold-400">Working On</span>
            </h1>
            <p className="text-gray-400 max-w-xl leading-relaxed">
              A running log of everything live on the site, in progress, and on the roadmap. Items marked <span className="text-gold-400 font-medium">Needs Approval</span> are waiting on your go-ahead before we move forward.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 ${
                filter === "all"
                  ? "bg-white/10 text-white border-white/20"
                  : "text-gray-500 border-dark-600 hover:border-gray-500 hover:text-gray-300"
              }`}
            >
              All ({entries.length})
            </button>
            {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
              const count = entries.filter((e) => e.status === status).length;
              if (count === 0) return null;
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status as Status)}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95 ${
                    filter === status
                      ? `${cfg.color}`
                      : "text-gray-500 border-dark-600 hover:border-gray-500 hover:text-gray-300"
                  }`}
                >
                  {cfg.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Sections */}
          {filter === "all" ? (
            SECTIONS.map(({ status, heading }) => {
              const items = entries.filter((e) => e.status === status);
              if (items.length === 0) return null;
              return (
                <div key={status} className="mb-12">
                  <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4 flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[status].dot}`} />
                    {heading}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {items.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-600/40 px-6 py-6 text-center">
        <p className="text-xs text-gray-600 uppercase tracking-widest">
          Ackiss Homes &mdash; Internal Use Only
        </p>
      </footer>
    </div>
  );
}
