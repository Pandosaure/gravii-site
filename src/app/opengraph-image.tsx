import { ImageResponse } from "next/og";

export const alt = "Gravii - Ask your company what it already knows";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfbf9",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", fontSize: 44, fontWeight: 700, color: "#15171a", letterSpacing: "-0.04em" }}>
          gravii
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#1f4d3f", marginLeft: 6, marginBottom: 8 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#15171a", letterSpacing: "-0.03em", lineHeight: 1.04, maxWidth: 940 }}>
            Ask your company what it already knows.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#5b6066", maxWidth: 860, lineHeight: 1.4, marginTop: 28 }}>
            A sovereign company brain. Every answer grounded in cited evidence, or an honest &quot;I don&apos;t have anything on that.&quot;
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <div style={{ display: "flex", color: "#1f4d3f", fontWeight: 600 }}>Grounded · Abstaining · Sovereign</div>
          <div style={{ display: "flex", color: "#6c7278" }}>EU region · your own key</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
