import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { z } from "zod";
import Pezzo

const pezzo = new Pezzo({
  apiKey: "pez_3412a0858c13b18eea9c7113dc0ed16e",
  projectId: "clj0balve1845752xfpqlkg21f",
  environment: "Production", // Your desired environment
});

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
      // Fetch the prompt from Pezzo
      const prompt = await pezzo.getPrompt("ExtractInfo");

      // Concatenate all pages textData into a single string
      const combinedTextData = input.pages
        .map((page) => page.textData)
        .join("\n");

      const openai = new PezzoOpenAI(pezzo);
      const response = await openai.chat.completions.create(prompt, {
        variables: {
          query: input.userQuery,
          text: combinedTextData,
        },
      });

      if (!response.choices || !response.choices[0]) {
        throw new Error("No response from OpenAI.");
      }
      return response.choices[0].message;
    }),
});
