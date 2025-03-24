import type { TRPCRouterRecord } from "@trpc/server";

import { authClient } from "@acme/auth/client";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  signOut: protectedProcedure.mutation(async (opts) => {
    if (!opts.ctx.token) {
      return { success: false };
    }
    await authClient.revokeSession({
      token: opts.ctx.token,
    });
    return { success: true };
  }),
} satisfies TRPCRouterRecord;
