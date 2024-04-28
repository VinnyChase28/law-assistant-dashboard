import { processingStatus } from "@prisma/client";
import { del } from "@vercel/blob";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "src/server/api/trpc";
import { pinecone } from "src/utils/pinecone";

import { handleError } from "../utils";

export const fileRouter = createTRPCRouter({
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
      try {
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
      } catch (error) {
        handleError(error);
        throw new Error("Failed to insert file metadata.");
      }
    }),

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
      try {
        const { documentTypes } = input;
        return ctx.db.file.findMany({
          where: {
            userId: ctx.session.user.id,
            documentType: documentTypes ? { in: documentTypes } : undefined,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            label: true,
          },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to get user files.");
      }
    }),

  getMyComplianceReports: protectedProcedure.query(async ({ ctx }) => {
    try {
      return ctx.db.file.findMany({
        where: {
          userId: ctx.session.user.id,
          documentType: "COMPLIANCE_SUBMISSION",
        },
      });
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch compliance reports.");
    }
  }),

  deleteFile: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const fileId = input;
      try {
        const fileSubsections = await ctx.db.textSubsection.findMany({
          where: { fileId: fileId },
        });

        const file = await ctx.db.file.findUnique({
          where: { id: fileId },
        });

        if (file?.blobUrl) {
          await del(file.blobUrl);
        }

        if (fileSubsections.length > 0) {
          const index = await pinecone.index(process.env.PINECONE_INDEX ?? "");
          const namespace = await index.namespace(ctx.session.user.id);
          const allPineconeIds = fileSubsections.map(
            (sub) => sub.pineconeVectorId,
          );
          await namespace.deleteMany(allPineconeIds);
        }

        await ctx.db.file.delete({
          where: { id: fileId },
        });

        return {
          success: true,
          message: "File and associated vectors deleted successfully.",
        };
      } catch (error) {
        handleError(error);
        throw new Error("Failed to delete file.");
      }
    }),

  createComplianceReportMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.db.file.create({
          data: {
            name: input.name,
            userId: ctx.session.user.id,
            processingStatus: "IN_PROGRESS",
            documentType: "COMPLIANCE_REPORT",
          },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to create compliance report metadata.");
      }
    }),

  getFile: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      try {
        const fileId = input;
        const file = await ctx.db.file.findUnique({
          where: { id: fileId },
        });
        if (!file) {
          throw new Error("File not found.");
        }
        return file;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to retrieve file.");
      }
    }),

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
      try {
        const { fileId, status } = input;
        const updatedFile = await ctx.db.file.update({
          where: { id: fileId },
          data: {
            processingStatus: status,
          },
        });
        if (!updatedFile) {
          throw new Error("File not found or update failed.");
        }
        return updatedFile;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to update file status.");
      }
    }),
});
