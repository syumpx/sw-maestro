"use client";

import { useRef } from "react";
import Link from "next/link";
import { ScatterPlot } from "@/components/result/ScatterPlot";
import { PersonalityCard } from "@/components/result/PersonalityCard";
import { ShareButtons } from "@/components/result/ShareButtons";
import { ResultCapture } from "@/components/result/ResultCapture";
import type { Quadrant } from "@/lib/questions";

interface Props {
  resultId: string;
  name: string;
  scores: { active: number; passive: number; structured: number; free: number };
  quadrant: Quadrant;
  teamId: string | null;
}

export function ResultClient({ resultId, name, scores, quadrant, teamId }: Props) {
  const captureRef = useRef<HTMLDivElement>(null);

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-900">
        {name}님의 창업자 성향
      </h1>

      <ResultCapture ref={captureRef}>
        <div className="mb-6 flex justify-center">
          <ScatterPlot
            dots={[{ name, x: scores.active, y: scores.structured, id: resultId }]}
          />
        </div>
        <PersonalityCard quadrant={quadrant} scores={scores} />
      </ResultCapture>

      <div className="mt-8 flex flex-col items-center gap-4">
        <ShareButtons resultId={resultId} captureRef={captureRef} />
        {teamId && (
          <Link
            href={`/team/${teamId}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            팀 그래프 보기 →
          </Link>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600">
          나도 해보기
        </Link>
      </div>
    </main>
  );
}
