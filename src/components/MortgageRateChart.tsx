"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Static 30-yr fixed mortgage rate data (quarterly, Freddie Mac PMMS)
// Source: Freddie Mac Primary Mortgage Market Survey
const data = [
  { label: "Q1 '19", rate: 4.37 },
  { label: "Q2 '19", rate: 4.14 },
  { label: "Q3 '19", rate: 3.73 },
  { label: "Q4 '19", rate: 3.70 },
  { label: "Q1 '20", rate: 3.60 },
  { label: "Q2 '20", rate: 3.23 },
  { label: "Q3 '20", rate: 2.96 },
  { label: "Q4 '20", rate: 2.77 },
  { label: "Q1 '21", rate: 2.97 },
  { label: "Q2 '21", rate: 2.98 },
  { label: "Q3 '21", rate: 2.87 },
  { label: "Q4 '21", rate: 3.07 },
  { label: "Q1 '22", rate: 3.87 },
  { label: "Q2 '22", rate: 5.23 },
  { label: "Q3 '22", rate: 5.77 },
  { label: "Q4 '22", rate: 6.79 },
  { label: "Q1 '23", rate: 6.54 },
  { label: "Q2 '23", rate: 6.71 },
  { label: "Q3 '23", rate: 7.09 },
  { label: "Q4 '23", rate: 7.44 },
  { label: "Q1 '24", rate: 6.93 },
  { label: "Q2 '24", rate: 6.99 },
  { label: "Q3 '24", rate: 6.44 },
  { label: "Q4 '24", rate: 6.72 },
  { label: "Q1 '25", rate: 6.83 },
  { label: "Q2 '25", rate: 6.81 },
  { label: "Q3 '25", rate: 6.72 },
  { label: "Q4 '25", rate: 6.85 },
  { label: "Now",    rate: 6.96 },
];

// Year tick positions (first Q of each year + "Now")
const yearTicks = ["Q1 '19", "Q1 '20", "Q1 '21", "Q1 '22", "Q1 '23", "Q1 '24", "Q1 '25", "Now"];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-dark-800 border border-gold-500/40 rounded-sm px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-0.5">{label}</p>
      <p className="text-gold-400 font-semibold">{payload[0].value.toFixed(2)}%</p>
    </div>
  );
}

export default function MortgageRateChart() {
  const current = data[data.length - 1].rate;

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-gray-400 font-semibold mb-0.5">
            30-Yr Fixed Mortgage Rate
          </p>
          <p className="text-[10px] text-gray-400 pl-3">2019 – Present</p>
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-gold-400 font-heading font-bold text-2xl leading-none">
            {current.toFixed(2)}%
          </span>
          <span className="text-[10px] text-gray-300 uppercase tracking-wider">today</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c9952e" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#c9952e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <YAxis
              domain={[1, 10]}
              ticks={[2, 4, 6, 8, 10]}
              tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={false}
              width={30}
              tickFormatter={(v) => `${v}%`}
            />

            <XAxis
              dataKey="label"
              ticks={yearTicks}
              tick={{ fill: "#9ca3af", fontSize: 11, fontFamily: "inherit" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tickFormatter={(v) => {
                if (v === "Now") return "Now";
                return v.replace("Q1 ", "'");
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(201,149,46,0.35)", strokeWidth: 1 }}
            />

            {/* Reference lines at notable levels */}
            <ReferenceLine y={3} stroke="rgba(201,149,46,0.18)" strokeDasharray="3 3" />
            <ReferenceLine y={7} stroke="rgba(201,149,46,0.18)" strokeDasharray="3 3" />

            <Area
              type="monotone"
              dataKey="rate"
              stroke="#c9952e"
              strokeWidth={2}
              fill="url(#rateGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#c9952e", stroke: "#0a0a0a", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer note */}
      <p className="text-[9px] text-gray-400 text-right mt-1.5">
        Freddie Mac PMMS · 30-yr fixed · quarterly avg
      </p>
    </div>
  );
}
