import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

const WEEKLY_START_YEAR = 2025;

interface FredObservation {
  date: string;
  value: string;
}

export async function GET() {
  const apiKey = process.env.FRED_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing FRED_API_KEY" }, { status: 500 });
  }

  const url =
    `https://api.stlouisfed.org/fred/series/observations` +
    `?series_id=MORTGAGE30US` +
    `&api_key=${apiKey}` +
    `&observation_start=2019-01-01` +
    `&sort_order=asc` +
    `&file_type=json`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return NextResponse.json({ error: "FRED fetch failed" }, { status: 502 });
  }

  const json = await res.json();
  const observations: FredObservation[] = json.observations ?? [];

  // ── Historical (pre-2025): quarterly averages ──────────────────────
  const buckets: Record<string, number[]> = {};

  for (const obs of observations) {
    if (obs.value === ".") continue;
    const year = parseInt(obs.date.split("-")[0]);
    if (year >= WEEKLY_START_YEAR) continue;
    const rate = parseFloat(obs.value);
    const month = parseInt(obs.date.split("-")[1]);
    const q = Math.ceil(month / 3);
    const key = `Q${q} '${String(year).slice(-2)}`;
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(rate);
  }

  const quarterly = Object.entries(buckets).map(([label, values]) => ({
    label,
    rate: parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)),
  }));

  // ── Recent (2025+): weekly readings ───────────────────────────────
  const weeklyPoints: { label: string; rate: number }[] = [];
  const ticks: string[] = quarterly
    .filter((d) => d.label.startsWith("Q1"))
    .map((d) => d.label);

  let lastMonth = -1;
  let latestDate = "";

  for (const obs of observations) {
    if (obs.value === ".") continue;
    const year = parseInt(obs.date.split("-")[0]);
    if (year < WEEKLY_START_YEAR) continue;

    const rate = parseFloat(obs.value);
    const date = new Date(obs.date + "T12:00:00");
    const month = date.getMonth();
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    const label = `${monthName} ${date.getDate()}`;

    weeklyPoints.push({ label, rate });

    // First reading of each month → add to ticks
    if (month !== lastMonth) {
      ticks.push(label);
      lastMonth = month;
    }

    if (obs.date > latestDate) latestDate = obs.date;
  }

  const data = [...quarterly, ...weeklyPoints];

  return NextResponse.json({ data, ticks, ratesAsOf: latestDate });
}
