import type { TRPCRouterRecord } from "@trpc/server";
import { eq } from "drizzle-orm";

import { db } from "@acme/db/client";
import { Post, zCreatePost } from "@acme/db/schema";

import { publicProcedure } from "../trpc";

export const postRouter = {
  list: publicProcedure.query(async () => {
    return db.query.Post.findMany({
      orderBy: (post) => post.createdAt,
      columns: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }),
  byId: publicProcedure.input(String).query(async (req) => {
    const post = await db.query.Post.findFirst({
      where: eq(Post.id, req.input),
      columns: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return post ?? null;
  }),
  create: publicProcedure.input(zCreatePost).mutation(async ({ input }) => {
    const newPosts = await db.insert(Post).values(input).returning();

    if (!newPosts[0]) {
      throw new Error("Failed to create post");
    }

    return newPosts[0];
  }),
} satisfies TRPCRouterRecord;
