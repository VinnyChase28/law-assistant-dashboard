import { postRouter } from "src/server/api/routers/post";
import { fileRouter } from "./routers/file";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "src/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  file: fileRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
