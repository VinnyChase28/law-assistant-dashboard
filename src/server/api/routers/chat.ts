import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

import { handleError } from "../utils"; // Ensure handleError is imported

export const chatRouter = createTRPCRouter({
  // create chat session
  createChatSession: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const chatSession = await ctx.db.chatSession.create({
        data: {
          userId: ctx.session.user.id,
        },
      });
      return chatSession;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to create chat session.");
    }
  }),

  // create chat message, either from user or AI
  createChatMessage: protectedProcedure
    .input(
      z.object({
        chatSessionId: z.string(),
        content: z.string(),
        role: z.enum(["USER", "AI"]),
        prompt: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const chatMessage = await ctx.db.chatMessage.create({
          data: {
            chatSessionId: input.chatSessionId,
            content: input.content,
            role: input.role,
            prompt: input.prompt,
          },
        });
        return chatMessage;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to create chat message.");
      }
    }),

  // get all messages for current session
  getAllMessagesForSession: protectedProcedure
    .input(z.object({ chatSessionId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const messages = await ctx.db.chatMessage.findMany({
          where: { chatSessionId: input.chatSessionId },
          orderBy: { createdAt: "asc" },
        });
        return messages;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to get all messages for session.");
      }
    }),

  // Modified mutation to get the most recent chat session for the current user or create a new one if none exists
  getMostRecentSessionForUser: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      let recentSession = await ctx.db.chatSession.findFirst({
        where: { userId: ctx.session.user.id },
        orderBy: { createdAt: "desc" }, // Order by creation date in descending order
      });

      if (!recentSession) {
        recentSession = await ctx.db.chatSession.create({
          data: {
            userId: ctx.session.user.id,
          },
        });
      }

      return recentSession;
    } catch (error) {
      handleError(error);
      throw new Error(
        "Failed to get or create the most recent session for user.",
      );
    }
  }),
});
