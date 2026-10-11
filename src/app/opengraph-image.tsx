import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hossam Hassan Mohamed — Junior Penetration Tester";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#090A0C",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          color: "#E7E8EA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              color: "#E8A33D",
              fontFamily: "monospace",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Offensive Security Portfolio
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#FAFAFA" }}>
            Hossam Hassan Mohamed
          </div>
          <div style={{ fontSize: 34, color: "#F0B35A", marginTop: 12, fontFamily: "monospace" }}>
            Junior Penetration Tester
          </div>
          <div style={{ fontSize: 26, color: "#A1A1AA", marginTop: 24, maxWidth: 900 }}>
            Web · API · Android · Active Directory · Network security testing — labs,
            certifications, and methodology.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, color: "#71717A", fontFamily: "monospace" }}>
          <span>Cairo, Egypt</span>
          <span>·</span>
          <span>Hossam.sec@outlook.com</span>
        </div>
      </div>
    ),
    size,
  );
}
