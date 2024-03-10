import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/api/trpc";
import { pinecone } from "src/utils/pinecone";
import { processingStatus } from "@prisma/client";
import { del } from "@vercel/blob";


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
  getMyFiles: protectedProcedure
    .input(
      z.object({
        documentTypes: z
          .array(
            z.enum([
              "REGULATORY_FRAMEWORK",
              "COMPLIANCE_SUBMISSION",
              "COMPLIANCE_REPORT",
            ]),
          )
          .optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { documentTypes } = input;
      return ctx.db.file.findMany({
        where: {
          userId: ctx.session.user.id,
          documentType: documentTypes ? { in: documentTypes } : undefined,
        },
        orderBy: {
          createdAt: "desc",
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
  //TODO: change this to delete all subsections and vectors at once
  deleteFile: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const fileId = input;
      const fileSubsections = await ctx.db.textSubsection.findMany({
        where: { fileId: fileId },
      });

      //get the blob url to delete the file from the blob storage
      const file = await ctx.db.file.findUnique({
        where: { id: fileId },
      });
      const blobDeleteResponse = await del(file?.blobUrl ?? "");
      console.log("🚀 ~ .mutation ~ blobDeleteResponse:", blobDeleteResponse);

      //delete the vectors from pinecone
      const index = pinecone.Index(process.env.PINECONE_INDEX ?? "");
      console.log("🚀 ~ .mutation ~ index:", index);
      const namespace = index.namespace(ctx.session.user.id);
      console.log("🚀 ~ .mutation ~ namespace:", namespace);
      const allPineconeIds = fileSubsections.map((sub) => sub.pineconeVectorId);
      console.log("🚀 ~ .mutation ~ allPineconeIds:", allPineconeIds);
      const response = await namespace.deleteMany(allPineconeIds);
      console.log("🚀 ~ .mutation ~ deleteManyPinecone ~ response:", response);

      //delete the file from the database
      const prismaFileDeleteResponse = await ctx.db.file.delete({
        where: { id: fileId },
      });
      console.log(
        "🚀 ~ .mutation ~ prismaFileDeleteResponse:",
        prismaFileDeleteResponse,
      );

      return {
        success: true,
        message: "File and associated vectors deleted successfully.",
      };
    }),

  // create the compliance report metadata
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

  // update compliance report with the generated report data and set status to done
  updateComplianceReport: publicProcedure
    .input(
      z.object({
        id: z.number(),
        reportData: z.any(), // TODO: adjust with a real type
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx?.session?.user) {
        throw new Error("Unauthorized");
      }
      return ctx.db.file.update({
        where: { id: input.id },
        data: {
          processingStatus: "DONE",
          reportData: input.reportData,
        },
      });
    }),

  //fetch blob url based on file id
  getBlobUrl: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("Unauthorized");
      }
      const fileId = input;
      const file = await ctx.db.file.findUnique({
        where: { id: fileId },
      });

      return file?.blobUrl;
    }),
  //for a given file id, set the status to failed
  setFileStatus: protectedProcedure
    .input(
      z.object({
        fileId: z.number(),
        status: z.enum([
          processingStatus.FAILED,
          processingStatus.DONE,
          processingStatus.IN_PROGRESS,
        ]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("Unauthorized");
      }
      const { fileId, status } = input;
      return ctx.db.file.update({
        where: { id: fileId },
        data: {
          processingStatus: status,
        },
      });
    }),
});
