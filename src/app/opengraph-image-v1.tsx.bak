import { ImageResponse } from "next/og";

export const alt = "Ackiss Homes — Virginia Beach Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (next/og renderer) fetches images from URLs — data URLs from readFileSync don't render
const LOGO_URL = "https://www.ackisshomes.com/logo.png";

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
  const [playfairBold, playfairRegular] = await Promise.all([
    loadGoogleFont("Playfair Display", 700),
    loadGoogleFont("Playfair Display", 400),
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
        {/* Radial gold glow — centered behind logo */}
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
          {/* Logo — large and centered */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_URL}
            width={300}
            height={300}
            alt=""
            style={{ display: "flex" }}
          />

          {/* Brand name */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              marginTop: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: "Playfair",
                fontWeight: 700,
                fontSize: 108,
                color: "#d4a853",
                lineHeight: 1,
                letterSpacing: "-0.01em",
              }}
            >
              Ackiss
            </span>
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 26,
                fontWeight: 400,
                color: "rgba(201,149,46,0.6)",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                paddingBottom: 8,
              }}
            >
              Homes
            </span>
          </div>

          {/* Geography */}
          <span
            style={{
              fontFamily: "sans-serif",
              fontSize: 16,
              color: "rgba(201,149,46,0.55)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Virginia Beach &amp; All of Hampton Roads
          </span>

          {/* Divider */}
          <div
            style={{
              height: 1,
              width: 160,
              background: "rgba(201,149,46,0.2)",
              display: "flex",
              marginBottom: 22,
            }}
          />

          {/* Tagline */}
          <span
            style={{
              fontFamily: "Playfair",
              fontWeight: 400,
              fontSize: 44,
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.05em",
            }}
          >
            Where Home Begins
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(playfairBold    ? [{ name: "Playfair", data: playfairBold,    weight: 700 as const, style: "normal" as const }] : []),
        ...(playfairRegular ? [{ name: "Playfair", data: playfairRegular, weight: 400 as const, style: "normal" as const }] : []),
      ],
    }
  );
}
