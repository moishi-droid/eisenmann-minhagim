import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF6EF",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: "#C4481A",
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          מ
        </span>
      </div>
    ),
    { ...size }
  );
}
