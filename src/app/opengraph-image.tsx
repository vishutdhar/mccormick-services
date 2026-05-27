import { ImageResponse } from "next/og";

export const alt = "McCormick Services — Power Washing, Painting, Lawn Care | Macomb County MI";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fafaf5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#2f4f1c",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          McCormick Services
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#6b7f2c",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Power washing, painting, lawn care, and fall cleaning across Macomb County, Michigan.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
