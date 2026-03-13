import { ImageResponse } from "next/og";

export const alt = "Ackiss Homes — Virginia Beach Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
const LOGO_URL = `${baseUrl}/logo-a-v2-optimized.png`;

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());

    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    return fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [playfairBold] = await Promise.all([
    loadGoogleFont("Playfair Display", 700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial gold glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 65% at 50% 42%, rgba(201,149,46,0.13) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Top gold line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent 0%, #c9952e 50%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Bottom gold line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent 0%, #c9952e 50%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* A logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            width={220}
            height={220}
            alt=""
            style={{ display: "flex" }}
          />

          {/* Wordmark row — Ackiss + divider + Homes */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "Playfair",
                fontWeight: 700,
                fontSize: 96,
                backgroundImage: "linear-gradient(135deg,#a06719 0%,#e1a144 20%,#f0be68 40%,#9b681a 55%,#e0a853 78%,#a06719 100%)",
                backgroundClip: "text",
                color: "transparent",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              Ackiss
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: "rgba(201,149,46,0.75)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                }}
              >
                Homes
              </span>
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 13,
                  color: "rgba(150,150,150,0.7)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Real Estate Services
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              width: 140,
              background: "rgba(201,149,46,0.2)",
              display: "flex",
              marginBottom: 18,
            }}
          />

          {/* Geography */}
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 15,
              color: "rgba(201,149,46,0.5)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
            }}
          >
            Virginia Beach &amp; All of Hampton Roads
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(playfairBold ? [{ name: "Playfair", data: playfairBold, weight: 700 as const, style: "normal" as const }] : []),
      ],
    }
  );
}
