import { type Quadrant, quadrantInfo } from "@/lib/questions";
import { COLORS } from "@/lib/constants";

interface PersonalityCardProps {
  quadrant: Quadrant;
  scores: {
    active: number;
    passive: number;
    structured: number;
    free: number;
  };
}

export function PersonalityCard({ quadrant, scores }: PersonalityCardProps) {
  const info = quadrantInfo[quadrant];
  const bgColor = COLORS.quadrants[quadrant];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div
        className="mb-4 inline-block rounded-lg px-3 py-1 text-sm font-semibold"
        style={{ backgroundColor: bgColor, color: "#374151" }}
      >
        {info.title}
      </div>
      <p className="mb-6 leading-relaxed text-gray-600">{info.description}</p>
      <div className="grid grid-cols-2 gap-3">
        <ScoreBar label="Active" value={scores.active} max={20} />
        <ScoreBar label="Passive" value={scores.passive} max={20} />
        <ScoreBar label="Structured" value={scores.structured} max={20} />
        <ScoreBar label="Free" value={scores.free} max={20} />
      </div>
    </div>
  );
}

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="font-semibold text-gray-700">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}
