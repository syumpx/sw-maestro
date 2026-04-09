import { NextResponse } from "next/server";
import { getResult } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: { resultId: string } }
) {
  try {
    const result = await getResult(params.resultId);
    if (!result) {
      return NextResponse.json({ error: "결과를 찾을 수 없습니다." }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch result:", error);
    return NextResponse.json({ error: "결과 조회에 실패했습니다." }, { status: 500 });
  }
}
