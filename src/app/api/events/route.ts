import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(null, { status: 200 });
    }

    const userAgent = request.headers.get("user-agent") || undefined;

    await db.insert(events).values({
      name: body.name,
      properties: body.properties ?? null,
      sessionId: body.sessionId ?? null,
      referrer: body.referrer ?? null,
      userAgent: userAgent ?? null,
      pathname: body.pathname ?? null,
    });
  } catch (error) {
    console.error("Failed to record event:", error);
  }

  return NextResponse.json(null, { status: 200 });
}
