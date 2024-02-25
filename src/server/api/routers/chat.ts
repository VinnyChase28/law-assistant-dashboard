import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { z } from "zod";

export const chatRouter = createTRPCRouter({
  // create chat session
  createChatSession: protectedProcedure.mutation(async ({ input, ctx }) => {
    const chatSession = await ctx.db.chatSession.create({
      data: {
        userId: ctx.session.user.id,
      },
    });
    return chatSession;
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
      const chatMessage = await ctx.db.chatMessage.create({
        data: {
          chatSessionId: input.chatSessionId,
          content: input.content,
          role: input.role,
          prompt: input.prompt,
        },
      });
      return chatMessage;
    }),

  // get all messages for current session
  getAllMessagesForSession: protectedProcedure
    .input(z.object({ chatSessionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const messages = await ctx.db.chatMessage.findMany({
        where: { chatSessionId: input.chatSessionId },
        orderBy: { createdAt: "asc" },
      });
      return messages;
    }),
});
