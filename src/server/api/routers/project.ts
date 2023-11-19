import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const projectRouter = createTRPCRouter({
  getAllProjects: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user) {
      throw new Error("UNAUTHORIZED");
    }

    return ctx.db.project.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
      select: {
        id: true, // Selecting projectId
        name: true, // Selecting projectName
        // Exclude other fields by not listing them here
      },
    });
  }),
});
