import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { z } from "zod";
import { pinecone } from "src/utils/pinecone";

export const vectorRouter = createTRPCRouter({
  // Vector Search Query Scoped by Company ID
  vectorSearch: protectedProcedure
    .input(
      z.object({
        queryVector: z.array(z.number()),
        topK: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userCompanyId = ctx.session.user.companyId;
      if (!userCompanyId) {
        throw new Error("User's company ID is not available.");
      }

      const index = await pinecone.Index("law-assistant-ai");
      const companyNamespace = index.namespace(userCompanyId);

      const queryResponse = await companyNamespace.query({
        vector: input.queryVector,
        topK: input.topK || 5,
        includeMetadata: true,
      });

      const parsedIds = queryResponse.matches.map((match) => {
        const [fileId, pageNumber] = match.id.split("-").map(Number);
        return { fileId, pageNumber };
      });

      // Query the database for the corresponding TextSubsections and their related Files.
      const textSubsections = await ctx.db.textSubsection.findMany({
        where: {
          OR: parsedIds.map((id) => ({
            fileId: id.fileId,
            pageNumber: id.pageNumber,
          })),
        },
        include: {
          file: true, // Include all fields of the related File record
        },
      });

      return textSubsections.map((subsection) => ({
        fileName: subsection.file.name, // File name from the related File record
        textData: subsection.text, // Text data from the TextSubsection record
        pageNumber: subsection.pageNumber,
      }));
    }),

  //convert text to vector
  convertTextToVector: protectedProcedure
    .input(
      z.object({
        text: z.string(), // Input text to convert
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const embeddings = new OpenAIEmbeddings({
          modelName: "text-embedding-ada-002",
        });

        const vector = await embeddings.embedQuery(input.text);
        return vector;
      } catch (error) {
        console.error("Error in text-to-vector conversion:", error);
        throw new Error("Failed to convert text to vector.");
      }
    }),
});
