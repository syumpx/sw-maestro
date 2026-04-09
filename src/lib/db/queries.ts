import { eq } from "drizzle-orm";
import { db } from ".";
import { results, teams } from "./schema";

export async function createResult(data: {
  name: string;
  email?: string;
  activeScore: number;
  passiveScore: number;
  structuredScore: number;
  freeScore: number;
  answers: Record<number, "A" | "B">;
  teamId?: string;
}) {
  const [result] = await db
    .insert(results)
    .values({
      name: data.name,
      email: data.email || null,
      activeScore: data.activeScore,
      passiveScore: data.passiveScore,
      structuredScore: data.structuredScore,
      freeScore: data.freeScore,
      answers: data.answers,
      teamId: data.teamId || null,
    })
    .returning();
  return result;
}

export async function getResult(id: string) {
  const [result] = await db.select().from(results).where(eq(results.id, id));
  return result || null;
}

export async function createTeam(data: { name: string; createdBy: string }) {
  const [team] = await db
    .insert(teams)
    .values({ name: data.name, createdBy: data.createdBy })
    .returning();

  // Link the creator's result to this team
  await db
    .update(results)
    .set({ teamId: team.id })
    .where(eq(results.id, data.createdBy));

  return team;
}

export async function getTeam(id: string) {
  const [team] = await db.select().from(teams).where(eq(teams.id, id));
  return team || null;
}

export async function getTeamMembers(teamId: string) {
  return db.select().from(results).where(eq(results.teamId, teamId));
}

export async function getTeamWithMembers(teamId: string) {
  const team = await getTeam(teamId);
  if (!team) return null;
  const members = await getTeamMembers(teamId);
  return { team, members };
}
