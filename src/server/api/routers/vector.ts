import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { z } from "zod";
import { pinecone } from "src/utils/pinecone";

export const vectorRouter = createTRPCRouter({
  // Vector Search Query Scoped by Company ID
  vectorSearch: protectedProcedure
    .input(
      z.object({
        queryVector: z.array(z.number()), // The vector to query
        topK: z.number().optional(), // Number of top results to return
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get user's company ID
      const userCompanyId = ctx.session.user.companyId;
      if (!userCompanyId) {
        throw new Error("User's company ID is not available.");
      }

      const index = await pinecone.Index("law-assistant-ai");
      const companyNamespace = index.namespace(userCompanyId);
      // Perform vector search within the namespace of the user's company ID
      const queryResponse = await companyNamespace.query({
        vector: input.queryVector,
        topK: input.topK || 5,
        includeMetadata: true,
      });

      // Map Pinecone results to Prisma queries to fetch full document details
      const fileIds = queryResponse.matches.map((match) => parseInt(match.id));
      return ctx.db.file.findMany({
        where: {
          AND: [
            { id: { in: fileIds } },
            { project: { companyId: userCompanyId } },
          ],
        },
        include: {
          textSubsections: {
            select: { pageNumber: true }, // Select only pageNumber
          },
          // ...other includes if necessary...
        },
      });
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
