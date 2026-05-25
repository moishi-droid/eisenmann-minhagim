import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Eisenmann Family Minhagim";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF6EF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#C4481A",
            fontSize: 15,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 28,
            fontFamily: "sans-serif",
            fontWeight: 600,
          }}
        >
          Eisenmann Family
        </div>
        <div
          style={{
            color: "#2A1A08",
            fontSize: 80,
            fontWeight: "bold",
            lineHeight: 1.1,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Our Minhagim
        </div>
        <div
          style={{
            width: 60,
            height: 2,
            background: "#C4481A",
            marginBottom: 32,
          }}
        />
        <div
          style={{
            color: "#56401E",
            fontSize: 24,
            fontStyle: "italic",
            textAlign: "center",
          }}
        >
          Yekke customs preserved for generations
        </div>
      </div>
    ),
    { ...size }
  );
}
