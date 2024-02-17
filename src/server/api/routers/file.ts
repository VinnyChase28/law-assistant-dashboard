import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { pinecone } from "src/utils/pinecone";
export const fileRouter = createTRPCRouter({
  //insert file metadata
  insertFileMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fileType: z.string(),
        fileSize: z.string(),
        blobUrl: z.string(),
        // Add documentType to the input validation schema
        documentType: z.enum(["REGULATORY_FRAMEWORK", "COMPLIANCE_SUBMISSION"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Include documentType in the database creation logic
      return ctx.db.file.create({
        data: {
          name: input.name,
          blobUrl: input.blobUrl,
          fileType: input.fileType,
          fileSize: input.fileSize,
          userId: ctx.session.user.id,
          processingStatus: "IN_PROGRESS",
          documentType: input.documentType,
        },
      });
    }),

  // Fetch All Files for a User
  getUserFiles: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.file.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),

  deleteFile: protectedProcedure
    .input(z.number()) // File ID
    .mutation(async ({ ctx, input }) => {
      const fileId = input;

      const fileSubsections = await ctx.db.textSubsection.findMany({
        where: { fileId: fileId },
      });

      const index = pinecone.Index("law-assistant-ai");
      fileSubsections.forEach(async (subsection) => {
        await index.deleteOne(subsection.pineconeVectorId);
      });

      await ctx.db.file.delete({ where: { id: fileId } });

      return {
        success: true,
        message: "File and associated vectors deleted successfully.",
      };
    }),
});
