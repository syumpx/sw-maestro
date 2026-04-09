CREATE TABLE IF NOT EXISTS "teams" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "created_by" uuid,
  "created_at" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "results" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "email" text,
  "active_score" integer NOT NULL,
  "passive_score" integer NOT NULL,
  "structured_score" integer NOT NULL,
  "free_score" integer NOT NULL,
  "answers" jsonb NOT NULL,
  "team_id" uuid REFERENCES "teams"("id"),
  "created_at" timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "results_team_id_idx" ON "results" ("team_id");
