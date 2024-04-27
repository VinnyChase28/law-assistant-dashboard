import { createTRPCRouter } from "src/server/api/trpc";

import { activity } from "./routers/activity";
import { chatRouter } from "./routers/chat";
import { fileRouter } from "./routers/file";
import { inngestRouter } from "./routers/inngest";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";
import { vectorRouter } from "./routers/vector";

/**
 * This is the primary router for our server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  file: fileRouter,
  company: userRouter,
  vector: vectorRouter,
  inngest: inngestRouter,
  chat: chatRouter,
  user: userRouter,
  stripe: stripeRouter,
  activity: activity,
});

// export type definition of API
export type AppRouter = typeof appRouter;
