import { ImageResponse } from "next/og";
import { getTeamWithMembers } from "@/lib/db/queries";

export const runtime = "edge";
export const alt = "팀 창업자 성향 그래프";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const DOT_COLORS = ["#4F46E5", "#DC2626", "#059669", "#D97706", "#7C3AED", "#DB2777", "#0891B2", "#65A30D"];

const QUADRANT_COLORS: Record<string, string> = {
  tl: "#ECFDF5",
  tr: "#EEF2FF",
  bl: "#FFF1F2",
  br: "#FEF3C7",
};

export default async function Image({ params }: { params: { teamId: string } }) {
  const data = await getTeamWithMembers(params.teamId);

  if (!data) {
    return new ImageResponse(
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#FAFAFA", fontSize: 32, color: "#6b7280" }}>
        팀을 찾을 수 없습니다
      </div>,
      { ...size }
    );
  }

  const plotSize = 350;
  const plotX = 80;
  const plotY = 100;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#FAFAFA",
        padding: "40px 60px",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
        {data.team.name}
      </div>
      <div style={{ display: "flex", fontSize: 16, color: "#9ca3af", marginBottom: 20 }}>
        팀원 {data.members.length}명의 창업자 성향 분포
      </div>

      <div style={{ display: "flex", flexDirection: "row", gap: 40 }}>
        {/* Scatter plot */}
        <div style={{ display: "flex", position: "relative", width: plotSize, height: plotSize, flexShrink: 0 }}>
          <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.tl }} />
          <div style={{ display: "flex", position: "absolute", top: 0, left: plotSize / 2, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.tr }} />
          <div style={{ display: "flex", position: "absolute", top: plotSize / 2, left: 0, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.bl }} />
          <div style={{ display: "flex", position: "absolute", top: plotSize / 2, left: plotSize / 2, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.br }} />
          <div style={{ display: "flex", position: "absolute", top: 0, left: plotSize / 2 - 1, width: 2, height: plotSize, backgroundColor: "#d1d5db" }} />
          <div style={{ display: "flex", position: "absolute", top: plotSize / 2 - 1, left: 0, width: plotSize, height: 2, backgroundColor: "#d1d5db" }} />

          {data.members.slice(0, 8).map((m, i) => {
            const dx = (m.activeScore / 20) * plotSize;
            const dy = ((20 - m.structuredScore) / 20) * plotSize;
            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  position: "absolute",
                  left: dx - 10,
                  top: dy - 10,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: DOT_COLORS[i % DOT_COLORS.length],
                  border: "2px solid white",
                }}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
          {data.members.slice(0, 8).map((m, i) => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: DOT_COLORS[i % DOT_COLORS.length],
                }}
              />
              <span style={{ fontSize: 16, color: "#374151" }}>{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
