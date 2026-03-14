import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Ackiss Homes — Virginia Beach & Hampton Roads Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
  const [playfairBold, interRegular, logoBuffer] = await Promise.all([
    loadGoogleFont("Playfair Display", 700),
    loadGoogleFont("Inter", 400),
    readFile(path.join(process.cwd(), "public", "logo-a-v2-optimized.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

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
            src={logoSrc}
            width={220}
            height={220}
            alt=""
            style={{ display: "flex" }}
          />

          {/* Wordmark */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            {/* Ackiss + Homes row */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
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
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 26,
                  fontWeight: 400,
                  color: "rgba(201,149,46,0.75)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  paddingBottom: 6,
                }}
              >
                Homes
              </span>
            </div>

            {/* Real Estate Services | Brokered by Triumph Realty */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 13,
                  color: "rgba(220,220,220,0.9)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
              >
                Real Estate Services
              </span>
              <div style={{ width: 1, height: 10, background: "rgba(201,149,46,0.4)", display: "flex" }} />
              <span
                style={{
                  fontFamily: "Inter",
                  fontSize: 13,
                  color: "rgba(220,220,220,0.9)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                }}
              >
                Brokered by Triumph Realty
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
              fontFamily: "Inter",
              fontSize: 15,
              color: "rgba(201,149,46,0.9)",
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
        ...(playfairBold  ? [{ name: "Playfair", data: playfairBold,  weight: 700 as const, style: "normal" as const }] : []),
        ...(interRegular  ? [{ name: "Inter",    data: interRegular,  weight: 400 as const, style: "normal" as const }] : []),
      ],
    }
  );
}
