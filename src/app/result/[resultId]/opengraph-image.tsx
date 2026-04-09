import { ImageResponse } from "next/og";
import { getResult } from "@/lib/db/queries";
import { getQuadrant, quadrantInfo } from "@/lib/questions";

export const runtime = "edge";
export const alt = "창업자 성향 테스트 결과";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const QUADRANT_COLORS: Record<string, string> = {
  active_structured: "#EEF2FF",
  active_free: "#FEF3C7",
  passive_structured: "#ECFDF5",
  passive_free: "#FFF1F2",
};

export default async function Image({ params }: { params: { resultId: string } }) {
  const result = await getResult(params.resultId);

  if (!result) {
    return new ImageResponse(
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#FAFAFA", fontSize: 32, color: "#6b7280" }}>
        결과를 찾을 수 없습니다
      </div>,
      { ...size }
    );
  }

  const scores = {
    active: result.activeScore,
    passive: result.passiveScore,
    structured: result.structuredScore,
    free: result.freeScore,
  };
  const quadrant = getQuadrant(scores);
  const info = quadrantInfo[quadrant];

  const plotSize = 300;
  const dotX = (scores.active / 20) * plotSize;
  const dotY = ((20 - scores.structured) / 20) * plotSize;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#FAFAFA",
        padding: 60,
        gap: 60,
      }}
    >
      {/* Mini scatter plot */}
      <div style={{ display: "flex", position: "relative", width: plotSize, height: plotSize, flexShrink: 0 }}>
        {/* Quadrant backgrounds */}
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.passive_structured }} />
        <div style={{ display: "flex", position: "absolute", top: 0, left: plotSize / 2, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.active_structured }} />
        <div style={{ display: "flex", position: "absolute", top: plotSize / 2, left: 0, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.passive_free }} />
        <div style={{ display: "flex", position: "absolute", top: plotSize / 2, left: plotSize / 2, width: plotSize / 2, height: plotSize / 2, backgroundColor: QUADRANT_COLORS.active_free }} />
        {/* Center lines */}
        <div style={{ display: "flex", position: "absolute", top: 0, left: plotSize / 2 - 1, width: 2, height: plotSize, backgroundColor: "#d1d5db" }} />
        <div style={{ display: "flex", position: "absolute", top: plotSize / 2 - 1, left: 0, width: plotSize, height: 2, backgroundColor: "#d1d5db" }} />
        {/* Dot */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: dotX - 12,
            top: dotY - 12,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: "#4F46E5",
            border: "3px solid white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 20, color: "#6b7280" }}>창업자 성향 테스트</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: "#111827" }}>
          {result.name}님은
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            color: "#4F46E5",
            backgroundColor: QUADRANT_COLORS[quadrant],
            padding: "8px 16px",
            borderRadius: 12,
          }}
        >
          {info.title}
        </div>
        <div style={{ fontSize: 16, color: "#9ca3af", maxWidth: 400, lineHeight: 1.5 }}>
          {info.description.slice(0, 80)}...
        </div>
      </div>
    </div>,
    { ...size }
  );
}
