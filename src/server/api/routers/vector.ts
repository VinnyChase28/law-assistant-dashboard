import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { z } from "zod";
import { pinecone } from "src/utils/pinecone";

export const vectorRouter = createTRPCRouter({
  // Vector Search Query Scoped by user ID
  vectorSearch: protectedProcedure
    .input(
      z.object({
        queryVector: z.array(z.number()),
        topK: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      if (!userId) {
        throw new Error("User's user ID is not available.");
      }

      const index = await pinecone.Index("law-assistant-ai");
      const userNamespace = index.namespace(userId);

      const queryResponse = await userNamespace.query({
        vector: input.queryVector,
        topK: input.topK ?? 5,
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

  // New route to find similar REGULATORY_FRAMEWORK documents for a given COMPLIANCE_SUBMISSION
  findSimilarRegulatoryDocuments: protectedProcedure
    .input(
      z.object({
        fileId: z.number(), // ID of the COMPLIANCE_SUBMISSION document
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fileId } = input;
      // Retrieve all TextSubsections for the given COMPLIANCE_SUBMISSION document
      const textSubsections = await ctx.db.textSubsection.findMany({
        where: { fileId, file: { documentType: "COMPLIANCE_SUBMISSION" } },
        include: { file: true },
      });


      if (
        textSubsections.length === 0 ||
        textSubsections[0]?.file.documentType !== "COMPLIANCE_SUBMISSION"
      ) {
        throw new Error(
          "File is not a COMPLIANCE_SUBMISSION document or does not exist.",
        );
      }

      const index = await pinecone.Index("law-assistant-ai");

      const results = await Promise.all(
        textSubsections.map(async (subsection) => {
          const userNamespace = index.namespace(subsection.file.userId);
          const vectorId = subsection.pineconeVectorId;

          if (!vectorId) {
            throw new Error("Vector ID not found for TextSubsection.");
          }

          // Retrieve the actual vector from Pinecone
          const vectorResponse = await userNamespace.fetch([vectorId]);
          const vector = vectorResponse.records[vectorId]?.values;

          if (!vector) {
            throw new Error(
              "Vector not found in Pinecone for the given Vector ID.",
            );
          }

          // Perform a Pinecone search for similar vectors within REGULATORY_FRAMEWORK documents
          const queryResponse = await userNamespace.query({
            vector: vector,
            topK: 5,
            filter: { documentType: { $eq: "REGULATORY_FRAMEWORK" } },
            includeMetadata: true,
          });

          console.log

          // Retrieve the corresponding TextSubsections for the top matches
          const matchedIds = queryResponse.matches.map((match) => match.id);

          console.log("Matched file IDs:", matchedIds);
          const regulatoryTextSubsections =
            await ctx.db.textSubsection.findMany({
              where: {
                pineconeVectorId: { in: matchedIds },
                file: { documentType: "REGULATORY_FRAMEWORK" },
              },
              include: { file: true },
            });

            return {
              complianceSubmission: {
                fileId: subsection.fileId,
                documentName: subsection.file.name,
                textData: subsection.text,
                pageNumber: subsection.pageNumber,
              },
              regulatoryFramework: regulatoryTextSubsections.map(
                (regulatorySubsection) => ({
                  fileId: regulatorySubsection.fileId,
                  documentName: regulatorySubsection.file.name, // Include the document name
                  textData: regulatorySubsection.text,
                  pageNumber: regulatorySubsection.pageNumber,
                }),
              ),
            };
        }),
      );

      return results;
    }),
});
