import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const trpcRouter = createTRPCRouter({
  auth: authRouter,
  posts: postRouter,
});

// export type definition of API
export type TrpcRouter = typeof trpcRouter;
