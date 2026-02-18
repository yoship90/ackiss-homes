import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ackiss Homes — Virginia Beach & All of Hampton Roads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ackiss-homes.vercel.app";

export default async function OGImage() {
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0" } }
  ).then((r) => r.text());

  const fontUrl = css.match(
    /url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/
  )?.[1];
  const fontData = fontUrl
    ? await fetch(fontUrl).then((r) => r.arrayBuffer())
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "48px 80px",
        }}
      >
        {/* Top decorative line */}
        <div style={{ width: "100%", height: 1, background: "rgba(201,149,46,0.3)" }} />

        {/* Center content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* Brand lockup screenshot */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${siteUrl}/brand-lockup.png`}
            width={502}
            height={138}
            alt="Ackiss Homes — Real Estate Services"
            style={{
              marginBottom: 52,
            }}
          />

          {/* Thin gold rule */}
          <div
            style={{
              width: 56,
              height: 1,
              background: "rgba(201,149,46,0.35)",
              marginBottom: 40,
            }}
          />

          {/* Geographic line */}
          <div
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: 48,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              textAlign: "center",
              lineHeight: 1.15,
            }}
          >
            Virginia Beach &amp; All of Hampton Roads
          </div>
        </div>

        {/* Bottom decorative line */}
        <div style={{ width: "100%", height: 1, background: "rgba(201,149,46,0.3)" }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [{ name: "Playfair Display", data: fontData, weight: 700, style: "normal" }]
        : [],
    }
  );
}
