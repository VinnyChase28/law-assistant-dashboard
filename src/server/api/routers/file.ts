import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/api/trpc";
import { pinecone } from "src/utils/pinecone";

export const fileRouter = createTRPCRouter({
  //insert file metadata on upload to my files
  insertFileMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fileType: z.string(),
        fileSize: z.string(),
        blobUrl: z.string(),
        documentType: z.enum(["REGULATORY_FRAMEWORK", "COMPLIANCE_SUBMISSION"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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

  // fetch my own uploaded files
  getMyFiles: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.file.findMany({
      where: {
        userId: ctx.session.user.id,
        documentType: { in: ["REGULATORY_FRAMEWORK", "COMPLIANCE_SUBMISSION"] },
      },
    });
  }),

  // fetch generated compliance reports
  getMyComplianceReports: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.file.findMany({
      where: {
        userId: ctx.session.user.id,
        documentType: "COMPLIANCE_SUBMISSION",
      },
    });
  }),

  // delete a specific file, and its associated vectors
  deleteFile: protectedProcedure
    .input(z.number())
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

  // create a new route that will create a new file in the files table and that will be a COMPLIANCE_REPORT and set it to IN_PROGRESS.

  createComplianceReportMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.file.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          processingStatus: "IN_PROGRESS",
          documentType: "COMPLIANCE_REPORT",
        },
      });
    }),

  updateComplianceReport: publicProcedure
    .input(
      z.object({
        id: z.number(),
        reportData: z.any(), // Expect an array of Violation objects
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.file.update({
        where: { id: input.id },
        data: {
          processingStatus: "COMPLETED",
          reportData: input.reportData, // Now correctly typed as an array of Violations
        },
      });
    }),
});
