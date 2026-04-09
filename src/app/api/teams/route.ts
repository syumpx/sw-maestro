import { NextResponse } from "next/server";
import { createTeam, trackServerEvent } from "@/lib/db/queries";

export async function POST(request: Request) {
  try {
    const { name, createdBy } = await request.json();

    if (!name || !createdBy) {
      return NextResponse.json({ error: "팀 이름과 생성자 ID는 필수입니다." }, { status: 400 });
    }

    const team = await createTeam({ name, createdBy });
    trackServerEvent("team_create", { teamId: team.id, createdBy });
    return NextResponse.json(team);
  } catch (error) {
    console.error("Failed to create team:", error);
    return NextResponse.json({ error: "팀 생성에 실패했습니다." }, { status: 500 });
  }
}
