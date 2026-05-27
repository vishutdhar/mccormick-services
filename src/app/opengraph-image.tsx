import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "McCormick Services — Power Washing, Painting, Lawn Care, Fall Cleaning | Macomb County, MI";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social / link-preview card: the hero home photo behind a forest-green
 * gradient with the brand name + services, matching the site's hero treatment.
 * The photo is read at build time and inlined as a data URL (Satori needs the
 * bytes, not a network fetch). PLACEHOLDER photo — swaps when Mike's real photo
 * replaces public/hero/home-exterior.jpg.
 */
export default async function Image() {
  const photo = await readFile(
    join(process.cwd(), "public/hero/home-exterior.jpg"),
  );
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background:
              "linear-gradient(115deg, rgba(26,31,18,0.94) 0%, rgba(47,79,28,0.82) 42%, rgba(47,79,28,0.28) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            padding: 72,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#a6ce38",
              marginBottom: 18,
            }}
          >
            Macomb County, Michigan
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 800,
              color: "#fafaf5",
              lineHeight: 1.02,
            }}
          >
            McCormick Services
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 33,
              color: "rgba(250,250,245,0.92)",
              marginTop: 22,
              maxWidth: 920,
            }}
          >
            Power washing · Painting · Lawn care · Fall cleaning
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
