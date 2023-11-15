import { postRouter } from "src/server/api/routers/post";
import { fileRouter } from "./routers/file";
import { createTRPCRouter } from "src/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  file: fileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
