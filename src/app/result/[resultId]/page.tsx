import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getResult } from "@/lib/db/queries";
import { getQuadrant, quadrantInfo } from "@/lib/questions";
import { ResultClient } from "./ResultClient";

interface Props {
  params: { resultId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getResult(params.resultId);
  if (!result) return { title: "결과를 찾을 수 없습니다" };

  const quadrant = getQuadrant({
    active: result.activeScore,
    passive: result.passiveScore,
    structured: result.structuredScore,
    free: result.freeScore,
  });
  const info = quadrantInfo[quadrant];

  return {
    title: `${result.name}님의 창업자 성향: ${info.title}`,
    description: info.description,
    openGraph: {
      title: `${result.name}님의 창업자 성향: ${info.title}`,
      description: info.description,
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const result = await getResult(params.resultId);
  if (!result) notFound();

  const scores = {
    active: result.activeScore,
    passive: result.passiveScore,
    structured: result.structuredScore,
    free: result.freeScore,
  };

  const quadrant = getQuadrant(scores);

  return (
    <ResultClient
      resultId={result.id}
      name={result.name}
      scores={scores}
      quadrant={quadrant}
      teamId={result.teamId}
    />
  );
}
