"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PasswordGate, { INTERNAL_AUTH_KEY } from "@/components/PasswordGate";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type MilestoneStatus = "complete" | "active" | "pending";

interface Milestone {
  id: string;
  label: string;
  status: MilestoneStatus;
  date?: string;
  note?: string;
}

interface Phase {
  id: string;
  label: string;
  milestones: Milestone[];
}

/* ------------------------------------------------------------------ */
/*  Demo deal data — replace with Airtable API call when wiring up     */
/* ------------------------------------------------------------------ */

const DEMO_DEAL = {
  address: "2847 Sandpiper Lane",
  cityStateZip: "Virginia Beach, VA 23456",
  buyers: "Michael & Sarah Johnson",
  agent: "Amanda Ackiss",
  agentPhone: "tel:+17570000000",
  offerPrice: "$485,000",
  closingDate: "2026-03-28",
  phases: [
    {
      id: "contract",
      label: "Contract & Earnest Money",
      milestones: [
        { id: "offer-submitted",  label: "Offer submitted",                        status: "complete", date: "Feb 10" },
        { id: "offer-accepted",   label: "Offer accepted — under contract",         status: "complete", date: "Feb 11" },
        { id: "earnest-money",    label: "Earnest money deposited",                 status: "complete", date: "Feb 13", note: "$4,850 deposited with Monarch Title Group" },
      ],
    },
    {
      id: "inspection",
      label: "Inspection & PICRA",
      milestones: [
        { id: "inspection-scheduled", label: "Inspection scheduled",                status: "complete", date: "Feb 12" },
        { id: "inspection-complete",  label: "Home inspection complete",            status: "complete", date: "Feb 16" },
        { id: "picra-submitted",      label: "PICRA submitted to seller",           status: "complete", date: "Feb 19", note: "Requested $4,200 credit for HVAC service and roof flashing repair" },
        { id: "picra-resolution",     label: "PICRA negotiated & resolved",         status: "active",   note: "Seller countered with $3,000 credit — Amanda is reviewing with you, response due Feb 27" },
        { id: "repairs-scheduled",    label: "Repair work scheduled",               status: "pending" },
        { id: "repairs-complete",     label: "Repairs complete & verified",         status: "pending" },
      ],
    },
    {
      id: "mortgage",
      label: "Mortgage & Appraisal",
      milestones: [
        { id: "loan-application",   label: "Loan application submitted",            status: "complete", date: "Feb 10" },
        { id: "disclosures-signed", label: "Initial disclosures signed",            status: "complete", date: "Feb 12" },
        { id: "appraisal-ordered",  label: "Appraisal ordered",                    status: "complete", date: "Feb 14" },
        { id: "appraisal-date",     label: "Appraisal scheduled — Feb 28",         status: "active" },
        { id: "appraisal-complete", label: "Appraisal complete",                   status: "pending" },
        { id: "loan-conditional",   label: "Loan conditionally approved",           status: "pending" },
        { id: "mortgage-docs",      label: "Mortgage paperwork finalized",         status: "pending" },
        { id: "loan-final",         label: "Final loan approval",                  status: "pending" },
      ],
    },
    {
      id: "title-closing",
      label: "Title & Closing",
      milestones: [
        { id: "title-ordered",        label: "Title search ordered",               status: "complete", date: "Feb 14" },
        { id: "title-clear",          label: "Title cleared",                      status: "pending" },
        { id: "closing-disclosure",   label: "Closing disclosure received",        status: "pending", note: "Required at least 3 business days before closing" },
        { id: "clear-to-close",       label: "Clear to close",                     status: "pending" },
        { id: "final-walkthrough",    label: "Final walk-through",                 status: "pending" },
        { id: "closing-day",          label: "Closing day — March 28",             status: "pending" },
      ],
    },
  ] as Phase[],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function getPhaseStatus(phase: Phase): "complete" | "active" | "partial" | "pending" {
  const statuses = phase.milestones.map((m) => m.status);
  if (statuses.every((s) => s === "complete")) return "complete";
  if (statuses.some((s) => s === "active")) return "active";
  if (statuses.some((s) => s === "complete")) return "partial";
  return "pending";
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function DealPage() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(INTERNAL_AUTH_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  const now = new Date();
  const closing = new Date(DEMO_DEAL.closingDate);
  const daysToClose = Math.ceil((closing.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  const allMilestones = DEMO_DEAL.phases.flatMap((p) => p.milestones);
  const completedCount = allMilestones.filter((m) => m.status === "complete").length;
  const progress = Math.round((completedCount / allMilestones.length) * 100);

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 40% at 50% 0%, rgba(201,149,46,0.06) 0%, transparent 60%)" }}
        aria-hidden="true"
      />
      <div className="fixed inset-0 hero-grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:opacity-70">
            <Image src="/logo.png" alt="Ackiss Homes" width={32} height={29} className="opacity-90" />
            <div>
              <div className="text-white font-heading font-bold text-sm leading-none tracking-wide">Ackiss Homes</div>
              <div className="text-gold-500 text-[8px] uppercase tracking-[0.25em] mt-0.5">Virginia Beach</div>
            </div>
          </Link>
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.25em]">Closing Progress</p>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto">

          {/* Property hero card */}
          <div className="bg-dark-800 border border-dark-600/50 rounded-sm p-6 mb-6">
            <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-gold-500/70 mb-2">Under Contract</p>
                <h1 className="font-heading font-bold text-2xl md:text-3xl text-white leading-snug">
                  {DEMO_DEAL.address}
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">{DEMO_DEAL.cityStateZip}</p>
                <p className="text-gray-400 text-sm mt-3">
                  {DEMO_DEAL.buyers}
                  <span className="text-dark-500 mx-2">·</span>
                  <span className="text-gray-600">with {DEMO_DEAL.agent}</span>
                </p>
              </div>

              <div className="flex gap-6 shrink-0">
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-1">Offer Price</p>
                  <p className="text-white font-heading font-bold text-xl">{DEMO_DEAL.offerPrice}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-600 mb-1">Days to Close</p>
                  <p className={`font-heading font-bold text-xl ${daysToClose <= 14 ? "text-amber-400" : "text-gold-400"}`}>
                    {daysToClose}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="border-t border-dark-600/50 pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600">Progress</p>
                <p className="text-[10px] text-gold-500/80">
                  {completedCount} of {allMilestones.length} steps complete &mdash; {progress}%
                </p>
              </div>
              <div className="h-px bg-dark-600 relative overflow-visible">
                <div
                  className="absolute top-0 left-0 h-px bg-gradient-to-r from-gold-600 to-gold-400 transition-[width] duration-700"
                  style={{ width: `${progress}%` }}
                />
                {/* Progress marker dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(201,149,46,0.8)] transition-[left] duration-700"
                  style={{ left: `calc(${progress}% - 4px)` }}
                />
              </div>
            </div>
          </div>

          {/* Phase sections */}
          <div className="space-y-4">
            {DEMO_DEAL.phases.map((phase) => {
              const ps = getPhaseStatus(phase);
              return (
                <div
                  key={phase.id}
                  className={`rounded-sm border p-6 transition-[border-color,background-color] duration-300 ${
                    ps === "complete" ? "border-dark-600/25 bg-dark-800/30" :
                    ps === "active"   ? "border-gold-500/20 bg-dark-800" :
                    ps === "partial"  ? "border-dark-600/35 bg-dark-800/60" :
                                        "border-dark-600/15 bg-dark-800/15"
                  }`}
                >
                  {/* Phase header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      ps === "complete" ? "bg-gold-500/40" :
                      ps === "active" || ps === "partial" ? "bg-gold-500" :
                      "bg-dark-500"
                    }`} />
                    <h2 className={`text-[10px] uppercase tracking-[0.3em] font-medium ${
                      ps === "complete" ? "text-gray-600" :
                      ps === "active" || ps === "partial" ? "text-gold-400" :
                      "text-gray-700"
                    }`}>
                      {phase.label}
                    </h2>
                    {ps === "complete" && (
                      <span className="ml-auto text-[9px] text-gray-700 uppercase tracking-widest">Complete</span>
                    )}
                  </div>

                  {/* Milestones */}
                  <div>
                    {phase.milestones.map((milestone, i) => (
                      <div
                        key={milestone.id}
                        className={`relative flex items-start gap-3 ${
                          i < phase.milestones.length - 1 ? "pb-5" : "pb-0"
                        }`}
                      >
                        {/* Vertical connector line */}
                        {i < phase.milestones.length - 1 && (
                          <div className="absolute left-[9px] top-5 bottom-0 w-px bg-dark-500/50" />
                        )}

                        {/* Status indicator */}
                        <div className="relative shrink-0 z-10 mt-0.5">
                          {milestone.status === "complete" ? (
                            <div className="w-[18px] h-[18px] rounded-full bg-gold-500/15 border border-gold-500/35 flex items-center justify-center">
                              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                                <path d="M1 3.5l2 2L8 1" stroke="#c9952e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          ) : milestone.status === "active" ? (
                            <div className="w-[18px] h-[18px] rounded-full border border-gold-500/50 flex items-center justify-center">
                              <div className="w-[7px] h-[7px] rounded-full bg-gold-500 animate-pulse" />
                            </div>
                          ) : (
                            <div className="w-[18px] h-[18px] rounded-full border border-dark-500" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-3 flex-wrap">
                            <p className={`text-sm leading-snug ${
                              milestone.status === "complete" ? "text-gray-500" :
                              milestone.status === "active"   ? "text-white font-medium" :
                                                               "text-gray-700"
                            }`}>
                              {milestone.label}
                            </p>
                            {milestone.date && (
                              <span className="text-[11px] text-gray-600 shrink-0">{milestone.date}</span>
                            )}
                          </div>
                          {milestone.note && (
                            <p className={`text-xs mt-1 leading-relaxed ${
                              milestone.status === "active" ? "text-gold-400/70" : "text-gray-600"
                            }`}>
                              {milestone.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact strip */}
          <div className="mt-6 border border-dark-600/30 rounded-sm p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-600 mb-1">Questions about your deal?</p>
              <p className="text-white text-sm font-medium">{DEMO_DEAL.agent}</p>
            </div>
            <a
              href={DEMO_DEAL.agentPhone}
              className="text-[11px] uppercase tracking-widest text-gold-400 hover:text-gold-300 border border-gold-500/25 hover:border-gold-500/50 px-4 py-2 rounded-sm transition-[color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 active:scale-95"
            >
              Call or Text →
            </a>
          </div>

          {/* Privacy note */}
          <p className="text-center text-[10px] text-gray-700 uppercase tracking-widest mt-10 leading-relaxed">
            This page is private and intended only for {DEMO_DEAL.buyers}.
          </p>

        </div>
      </main>
    </div>
  );
}
