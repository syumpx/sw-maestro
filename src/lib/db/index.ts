import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Create a fresh Drizzle instance per call to avoid stale reads with Neon pooler
function createDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

// Proxy creates a fresh connection for each operation
export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_, prop) {
    return (createDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
