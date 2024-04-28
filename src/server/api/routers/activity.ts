import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

import { handleError } from "../utils";

export const activity = createTRPCRouter({
  getFileTaskHistory: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.fileTaskHistory.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          relatedDocuments: {
            include: {
              file: true, 
            },
          },
        },
      });
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch file task history.");
    }
  }),

  getChatHistory: protectedProcedure.query(async ({ ctx }) => {
    try {
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
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch chat history.");
    }
  }),
});
