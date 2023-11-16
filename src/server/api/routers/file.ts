import { ulid } from "ulid";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { createEmbedding } from "../../../utils/openai";
import { pinecone } from "src/utils/pinecone";

export const openAiPineconeRouter = createTRPCRouter({
  upsertEmbedding: protectedProcedure
    .input(z.object({ text: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { text, title } = input;
      const id = ulid();

      const embedding = await createEmbedding(text);
      const vectorEmbedding = embedding.data[0]?.embedding ?? [];
      await pinecone.upsert({
        vectors: [
          {
            id,
            values: vectorEmbedding,
            metadata: { userId: ctx.session.user.id, text, title },
          },
        ],
      });

      await prisma.embedding.create({
        data: {
          id,
          text,
          title,
          userId: ctx.session.user.id,
        },
      });

      return {
        text: input.text,
        user: ctx.session.user.email,
      };
    }),

  searchEmbedding: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const text = input.text;
      const embedding = await createEmbedding(text);
      const vectorEmbedding = embedding.data[0]?.embedding ?? [];
      const pineconeSearch = await pinecone.query({
        topK: 3,
        includeMetadata: true,
        vector: vectorEmbedding,
        filter: {
          userId: ctx.session.user.id,
        },
      });

      return { text: input.text, user: ctx.session.user.email, pineconeSearch };
    }),
});
