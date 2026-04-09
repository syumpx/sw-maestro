import { NextResponse } from "next/server";
import { getTeamWithMembers } from "@/lib/db/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const data = await getTeamWithMembers(params.teamId);
    if (!data) {
      return NextResponse.json({ error: "팀을 찾을 수 없습니다." }, { status: 404 });
    }
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to fetch team:", error);
    return NextResponse.json({ error: "팀 조회에 실패했습니다." }, { status: 500 });
  }
}
