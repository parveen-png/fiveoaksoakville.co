import { ImageResponse } from "next/og";

export const alt = "Five Oaks Oakville — independent coming-soon project updates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#122033",
          color: "#F4EFE4",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#C4A35A",
          }}
        >
          Coming Soon · Oakville, Ontario, Canada
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.02, fontWeight: 600 }}>
            Five Oaks
          </div>
          <div style={{ marginTop: 16, fontSize: 32, fontFamily: "system-ui, sans-serif" }}>
            Caivan detached homes and townhomes
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            maxWidth: 860,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Independent project information. Not the official Caivan or Five Oaks
          website.
        </div>
      </div>
    ),
    size,
  );
}
