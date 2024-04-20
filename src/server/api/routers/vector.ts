import { OpenAIEmbeddings } from "@langchain/openai";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { pinecone } from "src/utils/pinecone";

export const vectorRouter = createTRPCRouter({
  // Vector Search Query Scoped by user ID
  vectorSearch: protectedProcedure
    .input(
      z.object({
        queryVector: z.array(z.number()),
        topK: z.number().optional(),
        fileIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      if (!userId) {
        throw new Error("User's user ID is not available.");
      }

      const index = await pinecone.index(process.env.PINECONE_INDEX ?? "");
      const userNamespace = index.namespace(userId);

      const queryResponse = await userNamespace.query({
        vector: input.queryVector,
        topK: input.topK ?? 4,
        includeMetadata: true,
        filter: {
          documentType: { $eq: "REGULATORY_FRAMEWORK" },
          fileId: { $in: input.fileIds.map(String) },
        },
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
          file: true,
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
        text: z.string(),
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

  // find k most relevant COMPLIANCE_SUBMISSION documents for a given COMPLIANCE_SUBMISSION
  findSimilarRegulatoryDocuments: protectedProcedure
    .input(
      z.object({
        fileId: z.number(), // ID of the COMPLIANCE_SUBMISSION document
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fileId } = input;
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

      const index = await pinecone.index(process.env.PINECONE_INDEX ?? "");
      const results = await Promise.all(
        textSubsections.map(async (subsection) => {
          const userNamespace = index.namespace(subsection.file.userId);
          const vectorId = subsection.pineconeVectorId;

          if (!vectorId) {
            throw new Error("Vector ID not found for TextSubsection.");
          }

          const vectorResponse = await userNamespace.fetch([vectorId]);
          const vector = vectorResponse.records[vectorId]?.values;

          if (!vector) {
            throw new Error(
              "Vector not found in Pinecone for the given Vector ID.",
            );
          }

          const queryResponse = await userNamespace.query({
            vector: vector,
            topK: 3,
            filter: { documentType: { $eq: "REGULATORY_FRAMEWORK" } },
            includeMetadata: true,
          });

          const matchedIds = queryResponse.matches.map((match) => match.id);
          const regulatoryTextSubsections =
            await ctx.db.textSubsection.findMany({
              where: {
                pineconeVectorId: { in: matchedIds },
                file: { documentType: "REGULATORY_FRAMEWORK" },
              },
              include: { file: true },
            });

          const topKResultsForAllPages = [];

          // Construct a JSON object for the top-k results of the current page
          const topKResults = {
            compliancePageNumber: subsection.pageNumber,
            regulatoryDocuments: regulatoryTextSubsections.map((r) => ({
              fileId: r.fileId,
              documentName: r.file.name,
              pageNumber: r.pageNumber,
            })),
          };

          // Add the top-k results for the current page to the array
          topKResultsForAllPages.push(topKResults);

          // Log the task in FileTaskHistory
          const fileTaskHistory = await ctx.db.fileTaskHistory.create({
            data: {
              fileId: subsection.fileId,
              userId: ctx.session.user.id,
              documentType: "COMPLIANCE_SUBMISSION",
              usedAt: new Date(),
              topKResults: topKResultsForAllPages,
            },
          });

          // After creating the FileTaskHistory, create related FileTaskDocument records
          for (const r of regulatoryTextSubsections) {
            // Check if the FileTaskDocument already exists
            const existingFileTaskDocument =
              await ctx.db.fileTaskDocument.findUnique({
                where: {
                  taskHistoryId_fileId: {
                    taskHistoryId: fileTaskHistory.id,
                    fileId: r.fileId,
                  },
                },
              });

            // If it doesn't exist, create a new FileTaskDocument
            if (!existingFileTaskDocument) {
              await ctx.db.fileTaskDocument.create({
                data: {
                  taskHistoryId: fileTaskHistory.id,
                  fileId: r.fileId,
                },
              });
            }
          }

          return {
            complianceSubmission: {
              fileId: subsection.fileId,
              documentName: subsection.file.name,
              textData: subsection.text,
              pageNumber: subsection.pageNumber,
            },
            regulatoryFramework: regulatoryTextSubsections.map((r) => ({
              fileId: r.fileId,
              documentName: r.file.name,
              textData: r.text,
              pageNumber: r.pageNumber,
            })),
          };
        }),
      );

      return { data: results };
    }),
});

