import { NextResponse } from "next/server";

export const revalidate = 86400; // Cache for 24 hours

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

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) {
    return NextResponse.json({ error: "FRED fetch failed" }, { status: 502 });
  }

  const json = await res.json();
  const observations: FredObservation[] = json.observations ?? [];

  // Build quarterly averages (skip FRED missing-value marker ".")
  const buckets: Record<string, number[]> = {};
  let latestDate = "";
  let latestRate = 0;

  for (const obs of observations) {
    if (obs.value === ".") continue;
    const rate = parseFloat(obs.value);
    const [year, month] = obs.date.split("-").map(Number);
    const q = Math.ceil(month / 3);
    const key = `Q${q} '${String(year).slice(-2)}`;
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(rate);

    // Track most recent weekly reading
    if (obs.date > latestDate) {
      latestDate = obs.date;
      latestRate = rate;
    }
  }

  // Convert to sorted array of quarterly averages
  const quarterly = Object.entries(buckets).map(([label, values]) => ({
    label,
    rate: parseFloat((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)),
  }));

  // Determine current quarter label so we don't double-count it as "Now"
  const now = new Date();
  const currentQ = Math.ceil((now.getMonth() + 1) / 3);
  const currentQLabel = `Q${currentQ} '${String(now.getFullYear()).slice(-2)}`;

  // Remove current (incomplete) quarter from quarterly array — add as "Now" instead
  const historicalQuarters = quarterly.filter((d) => d.label !== currentQLabel);

  const data = [...historicalQuarters, { label: "Now", rate: latestRate }];

  return NextResponse.json({ data, updatedAt: new Date().toISOString() });
}
