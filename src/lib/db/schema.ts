import { pgTable, uuid, text, integer, jsonb, timestamp, index } from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  createdBy: uuid("created_by"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const results = pgTable(
  "results",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email"),
    activeScore: integer("active_score").notNull(),
    passiveScore: integer("passive_score").notNull(),
    structuredScore: integer("structured_score").notNull(),
    freeScore: integer("free_score").notNull(),
    answers: jsonb("answers").notNull(),
    teamId: uuid("team_id").references(() => teams.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    teamIdIdx: index("results_team_id_idx").on(table.teamId),
  })
);

export type Team = typeof teams.$inferSelect;
export type Result = typeof results.$inferSelect;
