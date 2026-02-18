import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formType, name, email, phone, message, address, mlsId } = body;

  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) {
    console.error("FUB_API_KEY is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Split full name into first / last
  const parts = (name || "").trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";

  // Build note text
  let note = "";
  if (formType === "contact") {
    note = message || "";
  } else if (formType === "inquiry") {
    const lines: string[] = [];
    if (address) lines.push(`Property Address: ${address}`);
    if (mlsId) lines.push(`MLS ID: ${mlsId}`);
    note = lines.join("\n");
  }

  // Build person payload
  const person: Record<string, unknown> = { firstName, lastName };
  if (email) person.emails = [{ value: email }];
  if (phone) person.phones = [{ value: phone }];

  const payload: Record<string, unknown> = {
    source: "Ackiss Homes Website",
    type: formType === "inquiry" ? "Property Inquiry" : "General Inquiry",
    person,
  };
  if (note) payload.message = note;

  const fubRes = await fetch("https://api.followupboss.com/v1/events", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
      "X-System": "Ackiss Homes Website",
      "X-System-Key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!fubRes.ok) {
    const text = await fubRes.text();
    console.error("FUB API error:", fubRes.status, text);
    return NextResponse.json({ error: "Failed to submit lead" }, { status: 502 });
  }

  // Tag the person via a follow-up PATCH — /v1/events ignores tags on the person object
  const tags = formType === "inquiry"
    ? ["website-lead", "website-property-inquiry"]
    : ["website-lead", "website-contact"];

  try {
    const eventData = await fubRes.json();
    const personId = eventData?.person?.id;
    if (personId) {
      await fetch(`https://api.followupboss.com/v1/people/${personId}`, {
        method: "PUT",
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      });
    }
  } catch (err) {
    // Non-fatal — lead was created, tags just didn't apply
    console.error("Failed to apply tags:", err);
  }

  return NextResponse.json({ success: true });
}
