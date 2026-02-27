import { put, list, del } from "@vercel/blob";
import { NextResponse } from "next/server";

const BLOB_PATHNAME = "todo-feedback.json";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    console.log("[todo-feedback GET] blobs found:", blobs.length, blobs[0]?.url);
    if (!blobs[0]) return NextResponse.json({ feedback: {}, order: [] });
    const res = await fetch(blobs[0].url, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: "no-store",
    });
    console.log("[todo-feedback GET] fetch status:", res.status);
    const data = await res.json();
    console.log("[todo-feedback GET] keys in feedback:", Object.keys(data.feedback ?? {}).length);
    return NextResponse.json(data);
  } catch (err) {
    console.error("[todo-feedback GET]", err);
    return NextResponse.json({ feedback: {}, order: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Delete existing blob before writing so we don't accumulate stale versions
    const { blobs } = await list({ prefix: BLOB_PATHNAME });
    await Promise.all(blobs.map((b) => del(b.url)));
    await put(BLOB_PATHNAME, JSON.stringify(body), {
      access: "private",
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[todo-feedback POST]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
