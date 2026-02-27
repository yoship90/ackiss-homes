import { put, list, del } from "@vercel/blob";
import { NextResponse } from "next/server";

const BLOB_PATHNAME = "todo-feedback.json";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: BLOB_PATHNAME, limit: 1 });
    if (!blobs[0]) return NextResponse.json({ feedback: {}, order: [] });
    const res = await fetch(blobs[0].url, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      cache: "no-store",
    });
    return NextResponse.json(await res.json());
  } catch {
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
