import { fileRouter } from "./routers/file";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "src/server/api/trpc";
import { projectRouter } from "./routers/project";
import { companyRouter } from "./routers/company";
/**
 * This is the primary router for our server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  file: fileRouter,
  user: userRouter,
  project: projectRouter,
  company: companyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
