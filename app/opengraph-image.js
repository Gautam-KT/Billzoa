import { ImageResponse } from "next/og";

export const alt = "Billzoa — Digital Experience & Web Development Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#0f100f", color: "#f1f2ec", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>
          Billzoa<div style={{ width: 14, height: 14, background: "#c8ff3e", marginLeft: 6, marginTop: 20 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 800, letterSpacing: -5, lineHeight: 0.95 }}>
          <div>WE BUILD DIGITAL</div><div>EXPERIENCES THAT WORK.</div>
        </div>
      </div>
    ),
    size
  );
}
