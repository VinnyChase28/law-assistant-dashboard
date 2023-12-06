import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

const llm = new OpenAI({
  temperature: 0.4,
});

// TRPC router implementation
export const llmRouter = createTRPCRouter({
  openAIQueryAnalysis: protectedProcedure
    .input(
      z.object({
        userQuery: z.string(),
        pages: z.array(
          z.object({
            fileName: z.string(),
            textData: z.string(),
            pageNumber: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      // Combine all pages textData into a single string
      const combinedTextData = input.pages
        .map((page) => page.textData)
        .join("\n");
      const query = input.userQuery;

      const prompt = `Query: ${query}\n\nPages:\n${combinedTextData}\n\nAnswer:`;

      const llmResult = await llm.predict(prompt);
      return llmResult;
    }),
});
