import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserId: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) {
      throw new Error("UNAUTHORIZED");
    }
    return ctx.session.user.id;
  }),
});
