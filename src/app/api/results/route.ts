import { NextResponse } from "next/server";
import { createResult } from "@/lib/db/queries";
import { calculateScores, questions } from "@/lib/questions";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, answers, teamId } = body;

    if (!name || !answers) {
      return NextResponse.json({ error: "이름과 답변은 필수입니다." }, { status: 400 });
    }

    // Validate all 40 questions answered
    const answerCount = Object.keys(answers).length;
    if (answerCount !== questions.length) {
      return NextResponse.json(
        { error: `모든 질문에 답변해야 합니다. (${answerCount}/${questions.length})` },
        { status: 400 }
      );
    }

    const scores = calculateScores(answers);

    const result = await createResult({
      name,
      email: email || undefined,
      activeScore: scores.active,
      passiveScore: scores.passive,
      structuredScore: scores.structured,
      freeScore: scores.free,
      answers,
      teamId: teamId || undefined,
    });

    return NextResponse.json({
      id: result.id,
      teamId: result.teamId,
    });
  } catch (error) {
    console.error("Failed to create result:", error);
    return NextResponse.json({ error: "결과 저장에 실패했습니다." }, { status: 500 });
  }
}
