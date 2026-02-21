import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { itemId, itemTitle, approvedBy, decision, notes } = await req.json();

  const apiKey = process.env.FUB_API_KEY;
  const personId = process.env.FUB_UPDATES_PERSON_ID;

  if (!apiKey || !personId) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const emoji = decision === "approved" ? "✅" : decision === "approved-with-notes" ? "📝" : "🔄";
  const label = decision === "approved" ? "Approved" : decision === "approved-with-notes" ? "Approved with Notes" : "Changes Requested";

  const lines = [
    `${emoji} ${label}: ${itemTitle}`,
    `By: ${approvedBy}`,
    `Date: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
  ];
  if (notes) lines.push(`Notes: ${notes}`);

  const res = await fetch("https://api.followupboss.com/v1/notes", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personId: parseInt(personId),
      body: lines.join("\n"),
      isHtml: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("FUB note error:", res.status, text);
    return NextResponse.json({ error: "Failed to log approval" }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
