import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).optional(),
    BETTER_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    // AUTH_DISCORD_ID: z.string().min(1),
    // AUTH_DISCORD_SECRET: z.string().min(1),
  },
  clientPrefix: "VITE_",
  client: {},
  runtimeEnv: process.env,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
