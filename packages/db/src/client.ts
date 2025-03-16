import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

// Check for environment variables
const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url) {
  throw new Error("DATABASE_URL is not defined");
}

// Create the LibSQL client
const client = createClient({
  url,
  authToken,
});

export const db = drizzle(client, { schema });
