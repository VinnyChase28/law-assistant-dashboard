import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { z } from "zod";
import { OpenAI } from "langchain/llms/openai";

const llm = new OpenAI({
  temperature: 0.1,
  modelName: "gpt-4-1106-preview",
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

      const prompt = `Query: ${query}\n\nText to query:\n${combinedTextData}\n\n respond in markdown. information and source should be clearly outlined and separated. add two newlines between each source. The summary should be only relevant to the query, and contain no other information. Be Specific and consice. my life depends on it.`;

      const llmResult = await llm.predict(prompt);
      return llmResult;
    }),


});
