import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@acme/db/client";
import { Account, Session, User, Verification } from "@acme/db/schema";

import { env } from "../env";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      account: Account,
      user: User,
      session: Session,
      verification: Verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // discord: {
    //   clientId: env.AUTH_DISCORD_ID,
    //   clientSecret: env.AUTH_DISCORD_SECRET,
    // },
  },
});
