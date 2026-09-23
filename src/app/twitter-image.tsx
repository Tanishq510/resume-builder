import { ImageResponse } from "next/og";

export const alt = "Free Resume Builder — Create & Download an ATS-Friendly Resume Online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0f172a",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 12,
              backgroundColor: "#f8fafc",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, color: "#94a3b8" }}>
            createfreeresume.com
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 72,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.1,
          }}
        >
          Free Resume Builder,
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.1,
          }}
        >
          Built for ATS.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            color: "#cbd5e1",
          }}
        >
          Live preview · Drag &amp; drop sections · PDF download · No sign-up
        </div>
      </div>
    ),
    { ...size }
  );
}
