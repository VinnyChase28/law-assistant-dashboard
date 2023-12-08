import { fileRouter } from "./routers/file";
import { createTRPCRouter } from "src/server/api/trpc";
import { projectRouter } from "./routers/project";
import { userRouter } from "./routers/user";
import { vectorRouter } from "./routers/vector";
import { llmRouter } from "./routers/llm";
/**
 * This is the primary router for our server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  file: fileRouter,
  project: projectRouter,
  company: userRouter,
  vector: vectorRouter,
  llm: llmRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
