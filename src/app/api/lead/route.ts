import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formType, name, firstName: firstNameField, lastName: lastNameField,
          email, phone, message,
          beds, baths, priceMin, priceMax, propertyTypes, timeline, preApproval, notes: searchNotes } = body;

  const apiKey = process.env.FUB_API_KEY;
  if (!apiKey) {
    console.error("FUB_API_KEY is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Prefer separate first/last fields; fall back to splitting combined name (contact form)
  let firstName: string;
  let lastName: string;
  if (firstNameField || lastNameField) {
    firstName = (firstNameField || "").trim();
    lastName = (lastNameField || "").trim();
  } else {
    const parts = (name || "").trim().split(/\s+/);
    firstName = parts[0] || "";
    lastName = parts.slice(1).join(" ") || "";
  }

  // Build note text
  let note = "";
  if (formType === "contact") {
    note = message || "";
  } else if (formType === "inquiry") {
    const lines: string[] = ["🏠 Home Search Inquiry", ""];

    lines.push(`Beds: ${beds || "Any"}  |  Baths: ${baths || "Any"}`);

    const priceStr = [priceMin, priceMax].filter(Boolean).join(" – ");
    lines.push(`Price: ${priceStr || "No preference"}`);

    const types = Array.isArray(propertyTypes) ? propertyTypes : [propertyTypes];
    lines.push(`Type: ${types.length ? types.join(", ") : "Any"}`);

    if (timeline) lines.push(`Timeline: ${timeline}`);
    if (preApproval) lines.push(`Pre-Approved: ${preApproval}`);
    if (searchNotes) { lines.push(""); lines.push(`Notes: ${searchNotes}`); }

    note = lines.join("\n");
  }

  // Build person payload
  const person: Record<string, unknown> = { firstName, lastName };
  if (email) person.emails = [{ value: email }];
  if (phone) person.phones = [{ value: phone }];

  const payload: Record<string, unknown> = {
    source: formType === "inquiry" ? "Ackiss Homes Website - Property Inquiry" : "Ackiss Homes Website - General Contact",
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

  // Tag the person via a follow-up PUT to /v1/people/{id}
  const timelineTagMap: Record<string, string> = {
    "ASAP":           "timeline-asap",
    "1–3 Months":     "timeline-1-3mo",
    "3–6 Months":     "timeline-3-6mo",
    "Just Exploring": "timeline-exploring",
  };
  const preApprovalTagMap: Record<string, string> = {
    "Yes":           "pre-approved",
    "Working On It": "pre-approval-in-progress",
    "Not Yet":       "not-pre-approved",
  };
  const tags = formType === "inquiry"
    ? [
        "website-lead",
        "website-property-inquiry",
        ...(timelineTagMap[timeline]       ? [timelineTagMap[timeline]]       : []),
        ...(preApprovalTagMap[preApproval] ? [preApprovalTagMap[preApproval]] : []),
      ]
    : ["website-lead", "website-contact"];

  try {
    const eventData = await fubRes.json();
    const personId = eventData?.person?.id ?? eventData?.id;

    if (personId) {
      const authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;

      await fetch(`https://api.followupboss.com/v1/people/${personId}`, {
        method: "PUT",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tags }),
      });

      // Directly enroll in action plan
      const actionPlanId = formType === "inquiry"
        ? process.env.FUB_ACTION_PLAN_INQUIRY_ID
        : process.env.FUB_ACTION_PLAN_CONTACT_ID;

      if (actionPlanId) {
        await fetch("https://api.followupboss.com/v1/actionPlansPeople", {
          method: "POST",
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            actionPlanId: parseInt(actionPlanId),
            personId,
          }),
        });
      }
    }
  } catch (err) {
    // Non-fatal — lead was created, tags/action plan just didn't apply
    console.error("Failed to apply tags or action plan:", err);
  }

  return NextResponse.json({ success: true });
}
