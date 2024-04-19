import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const activity = createTRPCRouter({
  getFileTaskHistory: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.fileTaskHistory.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        relatedDocuments: {
          include: {
            file: true, // Include the file details
          },
        },
      },
    });
  }),

  // Updated procedure to get only user's questions in chat history
  getChatHistory: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.chatSession.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        messages: {
          where: {
            role: "USER",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
});
