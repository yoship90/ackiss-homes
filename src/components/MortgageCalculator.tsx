"use client";

import { useState, useMemo, useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import SplitHeading from "./SplitHeading";
import MortgageRateChart from "./MortgageRateChart";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ScheduleRow {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  extra: number;
  balance: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function fmtInt(n: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function parseNum(v: string) {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

/* ------------------------------------------------------------------ */
/*  Chevron SVG                                                        */
/* ------------------------------------------------------------------ */

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gold-400 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MortgageCalculator() {
  /* ---- Core fields ---- */
  const [purchasePrice, setPurchasePrice] = useState("350000");
  const [downPayment, setDownPayment] = useState("70000");
  const [downPaymentIsPercent, setDownPaymentIsPercent] = useState(false);
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState(30);

  /* ---- Extra payments ---- */
  const [extraMonthly, setExtraMonthly] = useState("");
  const [extraYearly, setExtraYearly] = useState("");
  const [extraOneTime, setExtraOneTime] = useState("");
  const [extraOneTimeMonth, setExtraOneTimeMonth] = useState("12");

  /* ---- Homeowner expenses ---- */
  const [propertyTax, setPropertyTax] = useState("");
  const [propertyTaxIsPercent, setPropertyTaxIsPercent] = useState(false);
  const [insurance, setInsurance] = useState("");
  const [pmi, setPmi] = useState("");
  const [hoa, setHoa] = useState("");

  /* ---- UI toggles ---- */
  const [showExtras, setShowExtras] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleView, setScheduleView] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const scheduleRef = useRef<HTMLDivElement>(null);

  /* ---- Derived values ---- */
  const price = parseNum(purchasePrice);
  const dp = downPaymentIsPercent
    ? (parseNum(downPayment) / 100) * price
    : parseNum(downPayment);
  const mortgageAmount = Math.max(price - dp, 0);
  const monthlyRate = parseNum(interestRate) / 100 / 12;
  const totalMonths = loanTerm * 12;

  /* ---- Monthly P&I ---- */
  const basePnI = useMemo(() => {
    if (mortgageAmount <= 0 || monthlyRate <= 0 || totalMonths <= 0) return 0;
    const r = monthlyRate;
    const n = totalMonths;
    const factor = Math.pow(1 + r, n);
    return (mortgageAmount * (r * factor)) / (factor - 1);
  }, [mortgageAmount, monthlyRate, totalMonths]);

  /* ---- Homeowner monthly costs ---- */
  const monthlyTax = propertyTaxIsPercent
    ? (parseNum(propertyTax) / 100) * price / 12
    : parseNum(propertyTax) / 12;
  const monthlyInsurance = parseNum(insurance) / 12;
  const monthlyPmi = parseNum(pmi);
  const monthlyHoa = parseNum(hoa);
  const hasExpenses =
    monthlyTax > 0 ||
    monthlyInsurance > 0 ||
    monthlyPmi > 0 ||
    monthlyHoa > 0;
  const totalMonthlyPayment =
    basePnI + monthlyTax + monthlyInsurance + monthlyPmi + monthlyHoa;

  /* ---- Amortization schedule (with extras) ---- */
  const { schedule, scheduleNoExtras } = useMemo(() => {
    const em = parseNum(extraMonthly);
    const ey = parseNum(extraYearly);
    const eo = parseNum(extraOneTime);
    const eoMonth = parseInt(extraOneTimeMonth) || 12;
    const hasExtras = em > 0 || ey > 0 || eo > 0;

    function generate(
      withExtras: boolean
    ): ScheduleRow[] {
      const rows: ScheduleRow[] = [];
      let balance = mortgageAmount;
      if (balance <= 0 || monthlyRate <= 0) return rows;

      const startDate = new Date();
      startDate.setDate(1);
      startDate.setMonth(startDate.getMonth() + 1);

      for (let m = 1; m <= totalMonths && balance > 0.005; m++) {
        const interestPayment = balance * monthlyRate;
        let principalPayment = basePnI - interestPayment;
        let extra = 0;

        if (withExtras) {
          extra += em;
          // Yearly extra: applied on the 12th payment of each year
          if (m % 12 === 0) extra += ey;
          // One-time extra
          if (m === eoMonth) extra += eo;
        }

        // Make sure we don't overpay
        const totalPossible = principalPayment + extra;
        if (totalPossible > balance) {
          const ratio =
            totalPossible > 0 ? balance / totalPossible : 1;
          principalPayment = principalPayment * ratio;
          extra = extra * ratio;
        }

        balance -= principalPayment + extra;
        if (balance < 0.005) balance = 0;

        const paymentDate = new Date(startDate);
        paymentDate.setMonth(paymentDate.getMonth() + (m - 1));

        rows.push({
          month: m,
          date: paymentDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }),
          payment: interestPayment + principalPayment,
          principal: principalPayment,
          interest: interestPayment,
          extra,
          balance,
        });
      }
      return rows;
    }

    return {
      schedule: generate(hasExtras),
      scheduleNoExtras: hasExtras ? generate(false) : null,
    };
  }, [
    mortgageAmount,
    monthlyRate,
    totalMonths,
    basePnI,
    extraMonthly,
    extraYearly,
    extraOneTime,
    extraOneTimeMonth,
  ]);

  /* ---- Savings from extra payments ---- */
  const extraSavings = useMemo(() => {
    if (!scheduleNoExtras) return null;
    const totalInterestBase = scheduleNoExtras.reduce(
      (s, r) => s + r.interest,
      0
    );
    const totalInterestExtras = schedule.reduce(
      (s, r) => s + r.interest,
      0
    );
    const interestSaved = totalInterestBase - totalInterestExtras;
    const monthsSaved = scheduleNoExtras.length - schedule.length;
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remainingMonths = monthsSaved % 12;
    return { interestSaved, yearsSaved, remainingMonths };
  }, [schedule, scheduleNoExtras]);

  /* ---- Pie chart: lifetime cost breakdown ---- */
  const pieSegments = useMemo(() => {
    if (schedule.length === 0) return [];

    const totalPrincipal = schedule.reduce((s, r) => s + r.principal, 0);
    const totalInterest = schedule.reduce((s, r) => s + r.interest, 0);
    const totalExtra = schedule.reduce((s, r) => s + r.extra, 0);
    const payoffMonths = schedule.length;
    const totalTax = monthlyTax * payoffMonths;
    const totalPmi = monthlyPmi * payoffMonths;
    const totalInsuranceFees = (monthlyInsurance + monthlyHoa) * payoffMonths;

    const segments: { label: string; value: number; color: string }[] = [];

    if (totalPrincipal > 0)
      segments.push({ label: "Principal", value: totalPrincipal, color: "#c9952e" });
    if (totalInterest > 0)
      segments.push({ label: "Interest", value: totalInterest, color: "#4a90d9" });
    if (totalExtra > 0)
      segments.push({ label: "Extra Payments", value: totalExtra, color: "#e67e22" });
    if (totalTax > 0)
      segments.push({ label: "Taxes", value: totalTax, color: "#d95a4a" });
    if (totalPmi > 0)
      segments.push({ label: "PMI", value: totalPmi, color: "#9b59b6" });
    if (totalInsuranceFees > 0)
      segments.push({ label: "Insurance & Fees", value: totalInsuranceFees, color: "#2ecc71" });
    if (dp > 0)
      segments.push({ label: "Down Payment", value: dp, color: "#5dade2" });

    return segments;
  }, [schedule, monthlyTax, monthlyInsurance, monthlyPmi, monthlyHoa, dp]);

  const pieTotal = pieSegments.reduce((s, seg) => s + seg.value, 0);

  /* ---- Yearly summary ---- */
  const yearlySchedule = useMemo(() => {
    const years: {
      year: number;
      label: string;
      payment: number;
      principal: number;
      interest: number;
      extra: number;
      balance: number;
    }[] = [];
    let currentYear = 0;
    let accPayment = 0;
    let accPrincipal = 0;
    let accInterest = 0;
    let accExtra = 0;
    let lastBalance = 0;
    let label = "";

    for (const row of schedule) {
      const yr = Math.ceil(row.month / 12);
      if (yr !== currentYear) {
        if (currentYear > 0) {
          years.push({
            year: currentYear,
            label,
            payment: accPayment,
            principal: accPrincipal,
            interest: accInterest,
            extra: accExtra,
            balance: lastBalance,
          });
        }
        currentYear = yr;
        accPayment = 0;
        accPrincipal = 0;
        accInterest = 0;
        accExtra = 0;
      }
      accPayment += row.payment;
      accPrincipal += row.principal;
      accInterest += row.interest;
      accExtra += row.extra;
      lastBalance = row.balance;
      label = row.date;
    }
    if (currentYear > 0) {
      years.push({
        year: currentYear,
        label,
        payment: accPayment,
        principal: accPrincipal,
        interest: accInterest,
        extra: accExtra,
        balance: lastBalance,
      });
    }
    return years;
  }, [schedule]);

  /* ---- LTV note for PMI ---- */
  const ltv = price > 0 ? (mortgageAmount / price) * 100 : 0;

  /* ---- Shared classes ---- */
  const inputCls =
    "w-full bg-dark-800 border border-dark-600 rounded-sm px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors";
  const labelCls =
    "block text-sm text-gray-400 mb-1.5 uppercase tracking-wider";

  return (
    <section id="calculator" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading — left-aligned asymmetric like About */}
        <div className="grid md:grid-cols-[2fr_3fr] gap-8 mb-10">
          <div>
            <ScrollReveal direction="left">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-gold-400 uppercase tracking-[0.3em] text-sm">Plan Your Purchase</p>
                <div className="h-px w-8 bg-gold-500/40 flex-shrink-0" />
              </div>
            </ScrollReveal>
            <SplitHeading className="text-4xl md:text-5xl font-heading font-bold">
              Mortgage Calculator
            </SplitHeading>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
          {/* ============================================================= */}
          {/*  Left column — Inputs                                         */}
          {/* ============================================================= */}
          <ScrollReveal direction="left">
            <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-8 md:p-10">
              {/* ---- Core Fields ---- */}
              <div className="space-y-5">
                {/* Purchase Price */}
                <div>
                  <label htmlFor="purchase-price" className={labelCls}>Purchase Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="text"
                      id="purchase-price"
                      inputMode="decimal"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      className={`${inputCls} pl-8`}
                      placeholder="350,000"
                    />
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <label htmlFor="down-payment" className={labelCls}>Down Payment</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        {downPaymentIsPercent ? "%" : "$"}
                      </span>
                      <input
                        type="text"
                        id="down-payment"
                        inputMode="decimal"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        className={`${inputCls} pl-8`}
                        placeholder={downPaymentIsPercent ? "20" : "70,000"}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (downPaymentIsPercent && price > 0) {
                          setDownPayment(
                            Math.round(
                              (parseNum(downPayment) / 100) * price
                            ).toString()
                          );
                          setDownPaymentIsPercent(false);
                        }
                      }}
                      className={`px-4 py-3 border rounded-sm text-sm transition-colors uppercase tracking-wider ${
                        !downPaymentIsPercent
                          ? "bg-gold-500 text-dark-900 border-gold-500 font-semibold"
                          : "border-dark-600 text-gray-300 hover:border-gold-500/50 hover:text-gold-400"
                      }`}
                    >
                      $
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!downPaymentIsPercent && price > 0) {
                          setDownPayment(
                            ((parseNum(downPayment) / price) * 100).toFixed(1)
                          );
                          setDownPaymentIsPercent(true);
                        }
                      }}
                      className={`px-4 py-3 border rounded-sm text-sm transition-colors uppercase tracking-wider ${
                        downPaymentIsPercent
                          ? "bg-gold-500 text-dark-900 border-gold-500 font-semibold"
                          : "border-dark-600 text-gray-300 hover:border-gold-500/50 hover:text-gold-400"
                      }`}
                    >
                      %
                    </button>
                  </div>
                </div>

                {/* Mortgage Amount — read-only */}
                <div>
                  <label className={labelCls}>Mortgage Amount</label>
                  <div className="w-full bg-dark-900 border border-dark-600 rounded-sm px-4 py-3 text-gold-400 cursor-default">
                    ${fmtInt(mortgageAmount)}
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label htmlFor="interest-rate" className={labelCls}>Interest Rate (%)</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="interest-rate"
                      inputMode="decimal"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className={inputCls}
                      placeholder="6.5"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      %
                    </span>
                  </div>
                </div>

                {/* Loan Term */}
                <div>
                  <label className={labelCls}>Loan Term</label>
                  <div className="flex gap-2">
                    {[15, 20, 30].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setLoanTerm(yr)}
                        className={`flex-1 py-3 rounded-sm text-sm uppercase tracking-wider transition-colors duration-300 border ${
                          loanTerm === yr
                            ? "bg-gold-500 text-dark-900 border-gold-500 font-semibold"
                            : "border-dark-600 text-gray-300 hover:border-gold-500/50 hover:text-gold-400"
                        }`}
                      >
                        {yr} yr
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ---- Extra Payments (collapsible) ---- */}
              <div className="mt-8 border-t border-dark-600/50 pt-6">
                <button
                  type="button"
                  onClick={() => setShowExtras(!showExtras)}
                  className="flex items-center justify-between w-full group"
                >
                  <span className="text-sm uppercase tracking-wider text-gray-300 group-hover:text-gold-400 transition-colors">
                    Extra Payments
                  </span>
                  <Chevron open={showExtras} />
                </button>

                {showExtras && (
                  <div className="mt-5 space-y-5 animate-fade-in">
                    <div>
                      <label htmlFor="extra-monthly" className={labelCls}>
                        Additional Monthly Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          id="extra-monthly"
                          inputMode="decimal"
                          value={extraMonthly}
                          onChange={(e) => setExtraMonthly(e.target.value)}
                          className={`${inputCls} pl-8`}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="extra-yearly" className={labelCls}>
                        Additional Yearly Payment
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          id="extra-yearly"
                          inputMode="decimal"
                          value={extraYearly}
                          onChange={(e) => setExtraYearly(e.target.value)}
                          className={`${inputCls} pl-8`}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="extra-one-time" className={labelCls}>One-Time Payment</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            $
                          </span>
                          <input
                            type="text"
                            id="extra-one-time"
                            inputMode="decimal"
                            value={extraOneTime}
                            onChange={(e) => setExtraOneTime(e.target.value)}
                            className={`${inputCls} pl-8`}
                            placeholder="0"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="extra-one-time-month" className={labelCls}>In Month #</label>
                        <input
                          type="text"
                          id="extra-one-time-month"
                          inputMode="numeric"
                          value={extraOneTimeMonth}
                          onChange={(e) =>
                            setExtraOneTimeMonth(e.target.value)
                          }
                          className={inputCls}
                          placeholder="12"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ---- Homeowner Expenses (collapsible) ---- */}
              <div className="mt-6 border-t border-dark-600/50 pt-6">
                <button
                  type="button"
                  onClick={() => setShowExpenses(!showExpenses)}
                  className="flex items-center justify-between w-full group"
                >
                  <span className="text-sm uppercase tracking-wider text-gray-300 group-hover:text-gold-400 transition-colors">
                    Homeowner Expenses
                  </span>
                  <Chevron open={showExpenses} />
                </button>

                {showExpenses && (
                  <div className="mt-5 space-y-5 animate-fade-in">
                    {/* Property Tax */}
                    <div>
                      <label htmlFor="property-tax" className={labelCls}>
                        Property Tax (Annual)
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            {propertyTaxIsPercent ? "%" : "$"}
                          </span>
                          <input
                            type="text"
                            id="property-tax"
                            inputMode="decimal"
                            value={propertyTax}
                            onChange={(e) => setPropertyTax(e.target.value)}
                            className={`${inputCls} pl-8`}
                            placeholder={
                              propertyTaxIsPercent ? "1.2" : "4,200"
                            }
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (!propertyTaxIsPercent && price > 0) {
                              setPropertyTax(
                                (
                                  (parseNum(propertyTax) / price) *
                                  100
                                ).toFixed(2)
                              );
                            } else {
                              setPropertyTax(
                                Math.round(
                                  (parseNum(propertyTax) / 100) * price
                                ).toString()
                              );
                            }
                            setPropertyTaxIsPercent(!propertyTaxIsPercent);
                          }}
                          className="px-4 py-3 border border-dark-600 rounded-sm text-sm text-gold-400 hover:border-gold-500/50 transition-colors uppercase tracking-wider"
                        >
                          {propertyTaxIsPercent ? "%" : "$"}
                        </button>
                      </div>
                    </div>

                    {/* Insurance */}
                    <div>
                      <label htmlFor="insurance" className={labelCls}>
                        Homeowner&apos;s Insurance (Annual)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          id="insurance"
                          inputMode="decimal"
                          value={insurance}
                          onChange={(e) => setInsurance(e.target.value)}
                          className={`${inputCls} pl-8`}
                          placeholder="1,200"
                        />
                      </div>
                    </div>

                    {/* PMI */}
                    <div>
                      <label htmlFor="pmi" className={labelCls}>PMI (Monthly)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          id="pmi"
                          inputMode="decimal"
                          value={pmi}
                          onChange={(e) => setPmi(e.target.value)}
                          className={`${inputCls} pl-8`}
                          placeholder="0"
                        />
                      </div>
                      {ltv > 80 && (
                        <p className="text-xs text-gray-500 mt-1.5">
                          LTV is {ltv.toFixed(1)}% — PMI is typically required
                          above 80% LTV and removed once you reach 80%.
                        </p>
                      )}
                    </div>

                    {/* HOA */}
                    <div>
                      <label htmlFor="hoa" className={labelCls}>HOA Fees (Monthly)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="text"
                          id="hoa"
                          inputMode="decimal"
                          value={hoa}
                          onChange={(e) => setHoa(e.target.value)}
                          className={`${inputCls} pl-8`}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rate chart — balances column height, contextual to interest rate */}
              <div className="mt-6 border-t border-dark-600/50 pt-6">
                <MortgageRateChart />
              </div>
            </div>
          </ScrollReveal>

          {/* ============================================================= */}
          {/*  Right column — Results                                       */}
          {/* ============================================================= */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              {/* Total Cost Breakdown with Donut Chart */}
              {pieSegments.length > 0 && (
                <div className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-8 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/15 hover:border-gold-500/50 transition-all duration-300 group">
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 group-hover:w-full transition-all duration-500 ease-out" aria-hidden="true" />
                  <h3 className="text-lg font-heading font-semibold mb-6 text-gold-400">
                    Total Cost Breakdown
                  </h3>

                  {/* Donut Chart */}
                  {(() => {
                    const radius = 80;
                    const stroke = 32;
                    const circumference = 2 * Math.PI * radius;
                    let accumulated = 0;

                    return (
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative w-[200px] h-[200px]">
                          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90" role="img" aria-label="Pie chart showing total cost breakdown by category">
                            {pieSegments.map((seg) => {
                              const pct = seg.value / pieTotal;
                              const dashLength = pct * circumference;
                              const dashOffset = -accumulated * circumference;
                              accumulated += pct;
                              return (
                                <circle
                                  key={seg.label}
                                  cx="100"
                                  cy="100"
                                  r={radius}
                                  fill="none"
                                  stroke={seg.color}
                                  strokeWidth={stroke}
                                  strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                                  strokeDashoffset={dashOffset}
                                  className="transition-all duration-500"
                                />
                              );
                            })}
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-bold text-white">${fmtInt(Math.round(pieTotal))}</span>
                            <span className="text-xs text-gray-400 uppercase tracking-wider">Total Cost</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Legend with amounts */}
                  <div className="space-y-2.5">
                    {pieSegments.map((seg) => (
                      <div key={seg.label} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: seg.color }}
                          />
                          <span className="text-gray-300">{seg.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-500 text-xs">
                            {((seg.value / pieTotal) * 100).toFixed(1)}%
                          </span>
                          <span className="text-gray-300 font-mono text-xs w-24 text-right">
                            ${fmtInt(Math.round(seg.value))}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Monthly Payment Summary */}
              <div className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-8 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/15 hover:border-gold-500/50 transition-all duration-300 group">
                <h3 className="text-lg font-heading font-semibold mb-6 text-gold-400">
                  Monthly Payment
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Principal &amp; Interest</span>
                    <span>${fmt(basePnI)}</span>
                  </div>

                  {hasExpenses && (
                    <>
                      {monthlyTax > 0 && (
                        <div className="flex justify-between text-gray-400 text-sm">
                          <span>Property Tax</span>
                          <span>${fmt(monthlyTax)}</span>
                        </div>
                      )}
                      {monthlyInsurance > 0 && (
                        <div className="flex justify-between text-gray-400 text-sm">
                          <span>Insurance</span>
                          <span>${fmt(monthlyInsurance)}</span>
                        </div>
                      )}
                      {monthlyPmi > 0 && (
                        <div className="flex justify-between text-gray-400 text-sm">
                          <span>PMI</span>
                          <span>${fmt(monthlyPmi)}</span>
                        </div>
                      )}
                      {monthlyHoa > 0 && (
                        <div className="flex justify-between text-gray-400 text-sm">
                          <span>HOA</span>
                          <span>${fmt(monthlyHoa)}</span>
                        </div>
                      )}
                      <div className="border-t border-dark-600/50 pt-3 mt-3" />
                    </>
                  )}

                  <div className="flex justify-between text-lg font-semibold text-gold-400">
                    <span>Total Monthly</span>
                    <span>${fmt(hasExpenses ? totalMonthlyPayment : basePnI)}</span>
                  </div>
                </div>

                {extraSavings && extraSavings.interestSaved > 0 && (
                  <div className="mt-6 bg-dark-800 border border-gold-500/20 rounded-sm p-4">
                    <p className="text-gold-400 text-sm font-semibold">
                      You save ${fmtInt(Math.round(extraSavings.interestSaved))}{" "}
                      in interest and pay off{" "}
                      {extraSavings.yearsSaved > 0 &&
                        `${extraSavings.yearsSaved} year${
                          extraSavings.yearsSaved !== 1 ? "s" : ""
                        }`}
                      {extraSavings.yearsSaved > 0 &&
                        extraSavings.remainingMonths > 0 &&
                        ", "}
                      {extraSavings.remainingMonths > 0 &&
                        `${extraSavings.remainingMonths} month${
                          extraSavings.remainingMonths !== 1 ? "s" : ""
                        }`}{" "}
                      early
                    </p>
                  </div>
                )}
              </div>

              {/* Loan Summary */}
              <div className="relative overflow-hidden bg-dark-700 border border-dark-600/50 rounded-sm p-8 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/15 hover:border-gold-500/50 transition-all duration-300 group">
                <h3 className="text-lg font-heading font-semibold mb-6 text-gold-400">
                  Loan Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Loan Amount</span>
                    <span>${fmtInt(mortgageAmount)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Down Payment</span>
                    <span>
                      ${fmtInt(dp)} ({price > 0 ? ((dp / price) * 100).toFixed(1) : "0"}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Total Interest</span>
                    <span>
                      $
                      {fmtInt(
                        Math.round(
                          schedule.reduce((s, r) => s + r.interest, 0)
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Total Payments</span>
                    <span>
                      $
                      {fmtInt(
                        Math.round(
                          schedule.reduce(
                            (s, r) => s + r.payment + r.extra,
                            0
                          )
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Payoff In</span>
                    <span>
                      {Math.floor(schedule.length / 12)} yr{" "}
                      {schedule.length % 12} mo
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-dark-600/50">
                  <button
                    type="button"
                    onClick={() => {
                      const opening = !showSchedule;
                      setShowSchedule(opening);
                      if (opening) {
                        setTimeout(() => {
                          scheduleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 50);
                      }
                    }}
                    className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-dark-900 border border-dark-600 rounded-sm text-sm uppercase tracking-widest text-gray-300 hover:text-gold-400 hover:border-gold-500/50 transition-colors duration-300 cursor-pointer"
                  >
                    {showSchedule ? "Hide" : "View Full"} Amortization Schedule
                    <Chevron open={showSchedule} />
                  </button>
                </div>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* ============================================================= */}
        {/*  Tips                                                          */}
        {/* ============================================================= */}
        <ScrollReveal direction="up" className="mt-10">
          <div className="bg-dark-700 border border-dark-600/50 rounded-sm p-8 md:p-10">
            <h3 className="text-lg font-heading font-semibold mb-6 text-gold-400">
              Money-Saving Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="text-gold-400 shrink-0 mt-0.5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="text-gray-200 font-medium">Split your payment in half.</span>{" "}
                  Instead of one monthly payment, make half-payments every two weeks. Because there are 52 weeks in a year, you&apos;ll make 26 half-payments — the equivalent of 13 full monthly payments instead of 12. That one extra payment each year can shave years off your mortgage and save thousands in interest.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-gold-400 shrink-0 mt-0.5">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  <span className="text-gray-200 font-medium">Add a little extra each month.</span>{" "}
                  Try entering just $50 or $100 as an extra monthly principal payment above and see how much interest you save over the life of your loan — the results might surprise you. Most mortgage companies let you set up automatic extra principal payments, making it effortless.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-gray-500 border-t border-dark-600/50 pt-4">
              These are general tips for informational purposes only and should not be considered financial advice. Always check with your mortgage lender about your specific loan terms, prepayment policies, and any fees before making changes to your payment schedule.
            </p>
          </div>
        </ScrollReveal>

        {/* ============================================================= */}
        {/*  Amortization Schedule                                         */}
        {/* ============================================================= */}
        <ScrollReveal direction="up" className="mt-10">
          {showSchedule && (
            <div ref={scheduleRef} className="mt-6 animate-fade-in">
              {/* Monthly / Yearly toggle */}
              <div className="flex gap-2 mb-4">
                {(["monthly", "yearly"] as const).map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setScheduleView(view)}
                    className={`px-4 py-2 rounded-sm text-sm uppercase tracking-wider transition-colors border ${
                      scheduleView === view
                        ? "bg-gold-500 text-dark-900 border-gold-500 font-semibold"
                        : "border-dark-600 text-gray-300 hover:border-gold-500/50 hover:text-gold-400"
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto rounded-sm border border-dark-600/50">
                <div className="max-h-[500px] overflow-y-auto amort-scroll">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-dark-700 z-10">
                      <tr className="text-left text-gray-400 uppercase tracking-wider text-xs">
                        <th className="px-4 py-3">
                          {scheduleView === "monthly" ? "#" : "Year"}
                        </th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3 text-right">Payment</th>
                        <th className="px-4 py-3 text-right">Principal</th>
                        <th className="px-4 py-3 text-right">Interest</th>
                        <th className="px-4 py-3 text-right">Extra</th>
                        <th className="px-4 py-3 text-right">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleView === "monthly"
                        ? schedule.map((row, i) => (
                            <tr
                              key={row.month}
                              className={`border-t border-dark-600/30 ${
                                i % 2 === 0 ? "bg-dark-800" : "bg-dark-700"
                              }`}
                            >
                              <td className="px-4 py-2.5 text-gray-400">
                                {row.month}
                              </td>
                              <td className="px-4 py-2.5 text-gray-300">
                                {row.date}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300">
                                ${fmt(row.payment)}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300">
                                ${fmt(row.principal)}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300">
                                ${fmt(row.interest)}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gold-400">
                                {row.extra > 0 ? `$${fmt(row.extra)}` : "—"}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300 font-mono">
                                ${fmtInt(Math.round(row.balance))}
                              </td>
                            </tr>
                          ))
                        : yearlySchedule.map((row, i) => (
                            <tr
                              key={row.year}
                              className={`border-t border-dark-600/30 ${
                                i % 2 === 0 ? "bg-dark-800" : "bg-dark-700"
                              }`}
                            >
                              <td className="px-4 py-2.5 text-gray-400">
                                {row.year}
                              </td>
                              <td className="px-4 py-2.5 text-gray-300">
                                {row.label}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300">
                                ${fmtInt(Math.round(row.payment))}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300">
                                ${fmtInt(Math.round(row.principal))}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300">
                                ${fmtInt(Math.round(row.interest))}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gold-400">
                                {row.extra > 0
                                  ? `$${fmtInt(Math.round(row.extra))}`
                                  : "—"}
                              </td>
                              <td className="px-4 py-2.5 text-right text-gray-300 font-mono">
                                ${fmtInt(Math.round(row.balance))}
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>

      </div>
    </section>
  );
}
