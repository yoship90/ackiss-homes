import { ImageResponse } from "next/og";

export const alt = "Ackiss Homes — Virginia Beach Real Estate";
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
  const [playfairBold, playfairRegular] = await Promise.all([
    loadGoogleFont("Playfair Display", 700),
    loadGoogleFont("Playfair Display", 400),
  ]);

const fonts: ConstructorParameters<typeof ImageResponse>[1]["fonts"] = [];
  if (playfairBold)   fonts.push({ name: "Playfair", data: playfairBold,   weight: 700, style: "normal" });
  if (playfairRegular) fonts.push({ name: "Playfair", data: playfairRegular, weight: 400, style: "normal" });

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0a",
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
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,149,46,0.09) 0%, transparent 70%)",
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
            gap: 0,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                height: 1,
                width: 48,
                background: "rgba(201,149,46,0.5)",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "#c9952e",
                fontSize: 14,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
              }}
            >
              Virginia Beach &amp; Hampton Roads
            </span>
            <div
              style={{
                height: 1,
                width: 48,
                background: "rgba(201,149,46,0.5)",
                display: "flex",
              }}
            />
          </div>

          {/* Brand name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              marginBottom: 28,
            }}
          >
            {/* Stacked brand name */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "Playfair",
                    fontWeight: 700,
                    fontSize: 96,
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
                    fontSize: 22,
                    fontWeight: 400,
                    color: "rgba(201,149,46,0.65)",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    paddingBottom: 8,
                  }}
                >
                  Homes
                </span>
              </div>
              <span
                style={{
                  fontFamily: "sans-serif",
                  fontSize: 11,
                  color: "#4a4a4a",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                Real Estate Services &nbsp;·&nbsp; Brokered by Triumph Realty
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              width: 160,
              background: "rgba(201,149,46,0.25)",
              display: "flex",
              marginBottom: 28,
            }}
          />

          {/* Tagline */}
          <span
            style={{
              fontFamily: "Playfair",
              fontWeight: 400,
              fontSize: 36,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "0.04em",
            }}
          >
            Where Home Begins
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
