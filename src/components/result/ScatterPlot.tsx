"use client";

import { COLORS } from "@/lib/constants";

export interface Dot {
  name: string;
  x: number; // active score (0-20)
  y: number; // structured score (0-20)
  color?: string;
  id?: string;
}

interface ScatterPlotProps {
  dots: Dot[];
  size?: number;
  onDotClick?: (dot: Dot) => void;
}

const PADDING = 50;
const LABEL_PADDING = 20;

export function ScatterPlot({ dots, size = 500, onDotClick }: ScatterPlotProps) {
  const plotSize = size - PADDING * 2;
  const toX = (v: number) => PADDING + (v / 20) * plotSize;
  const toY = (v: number) => PADDING + ((20 - v) / 20) * plotSize; // Invert Y: structured is top

  const quadrants = [
    { x: 0, y: 0, w: 10, h: 10, color: COLORS.quadrants.passive_free, label: "신중한 자유형" },
    { x: 10, y: 0, w: 10, h: 10, color: COLORS.quadrants.active_free, label: "주도적 자유형" },
    { x: 0, y: 10, w: 10, h: 10, color: COLORS.quadrants.passive_structured, label: "신중한 체계형" },
    { x: 10, y: 10, w: 10, h: 10, color: COLORS.quadrants.active_structured, label: "주도적 체계형" },
  ];

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      style={{ maxWidth: size }}
      className="select-none"
    >
      {/* Quadrant backgrounds */}
      {quadrants.map((q, i) => (
        <rect
          key={i}
          x={toX(q.x)}
          y={toY(q.y + q.h)}
          width={(q.w / 20) * plotSize}
          height={(q.h / 20) * plotSize}
          fill={q.color}
        />
      ))}

      {/* Grid lines */}
      {[5, 10, 15].map((v) => (
        <g key={v}>
          <line x1={toX(v)} y1={toY(0)} x2={toX(v)} y2={toY(20)} stroke="#e5e7eb" strokeWidth={v === 10 ? 2 : 1} strokeDasharray={v === 10 ? undefined : "4,4"} />
          <line x1={toX(0)} y1={toY(v)} x2={toX(20)} y2={toY(v)} stroke="#e5e7eb" strokeWidth={v === 10 ? 2 : 1} strokeDasharray={v === 10 ? undefined : "4,4"} />
        </g>
      ))}

      {/* Border */}
      <rect x={toX(0)} y={toY(20)} width={plotSize} height={plotSize} fill="none" stroke="#d1d5db" strokeWidth={1} />

      {/* Quadrant labels */}
      {quadrants.map((q, i) => (
        <text
          key={`label-${i}`}
          x={toX(q.x + q.w / 2)}
          y={toY(q.y + q.h / 2)}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fill="#9ca3af"
          fontWeight={500}
        >
          {q.label}
        </text>
      ))}

      {/* Axis labels */}
      <text x={toX(0) - LABEL_PADDING} y={toY(10)} textAnchor="middle" dominantBaseline="middle" fontSize={11} fill="#6b7280" transform={`rotate(-90, ${toX(0) - LABEL_PADDING}, ${toY(10)})`}>
        Free ← → Structured
      </text>
      <text x={toX(10)} y={toY(0) + LABEL_PADDING + 10} textAnchor="middle" fontSize={11} fill="#6b7280">
        Passive ← → Active
      </text>

      {/* Drop shadow filter */}
      <defs>
        <filter id="dot-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Dots */}
      {dots.map((dot, i) => {
        const cx = toX(dot.x);
        const cy = toY(dot.y);
        const color = dot.color || COLORS.dots[i % COLORS.dots.length];
        return (
          <g
            key={dot.id || i}
            style={{ cursor: onDotClick ? "pointer" : "default" }}
            onClick={() => onDotClick?.(dot)}
          >
            <circle cx={cx} cy={cy} r={8} fill={color} stroke="white" strokeWidth={2} filter="url(#dot-shadow)" />
            <text x={cx} y={cy - 14} textAnchor="middle" fontSize={11} fontWeight={600} fill="#374151">
              {dot.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
