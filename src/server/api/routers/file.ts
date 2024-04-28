import { processingStatus } from "@prisma/client";
import { del } from "@vercel/blob";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
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

  //get all of a user's files
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
        include: {
          label: true,
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
  //TODO: need to ensure the user cant delete a file that is still processing
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

      if (file?.blobUrl) {
        await del(file?.blobUrl ?? "");
      }

      //only delete subsections in pinecone if they exist
      if (fileSubsections.length > 0) {
        //delete the vectors from pinecone
        const index = await pinecone.index(process.env.PINECONE_INDEX ?? "");
        const namespace = await index.namespace(ctx.session.user.id);
        const allPineconeIds = await fileSubsections.map(
          (sub) => sub.pineconeVectorId,
        );
        await namespace.deleteMany(allPineconeIds);
      }

      //delete the file from the database
      await ctx.db.file.delete({
        where: { id: fileId },
      });

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

  //fetch blob url based on file id
  getFile: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("Unauthorized");
      }
      const fileId = input;
      const file = await ctx.db.file.findUnique({
        where: { id: fileId },
      });

      return file;
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

  // allows a user to create a new label
  createLabel: protectedProcedure
    .input(
      z.object({
        text: z
          .string()
          .min(1)
          .max(20)
          .transform((str) => str.toLowerCase()), // Ensure label text is within length limits and lowercase
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { text } = input;
      // Optional: Check if the label already exists for the user
      const existingLabel = await ctx.db.label.findFirst({
        where: {
          text,
          userId: ctx.session.user.id,
        },
      });
      if (existingLabel) {
        throw new Error("Label already exists.");
      }
      // Create the new label
      return ctx.db.label.create({
        data: {
          text,
          userId: ctx.session.user.id, // Associate label with the user's ID
        },
      });
    }),

  getLabels: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.label.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  //delete a label
  deleteLabel: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.label.delete({
        where: {
          id,
        },
      });
    }),
  //assign a label to a file
  assignLabel: protectedProcedure
    .input(
      z.object({
        fileId: z.number(),
        labelId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fileId, labelId } = input;
      return ctx.db.file.update({
        where: { id: fileId },
        data: { labelId },
      });
    }),

  removeLabel: protectedProcedure
    .input(
      z.object({
        fileId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fileId } = input;
      return ctx.db.file.update({
        where: { id: fileId },
        data: { labelId: null },
      });
    }),

  // New route to assign a label to multiple files
  assignLabelToMultipleFiles: protectedProcedure
    .input(
      z.object({
        fileIds: z.array(z.number()), // Array of file IDs
        labelId: z.string(), // The label ID to apply
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { fileIds, labelId } = input;

      // Update all files with the new label
      await ctx.db.file.updateMany({
        where: {
          id: {
            in: fileIds, // Target only files with IDs in the provided array
          },
          userId: ctx.session.user.id, // Ensure files belong to the current user
        },
        data: {
          labelId: labelId,
        },
      });

      return {
        success: true,
        message: "Labels updated successfully for selected files.",
      };
    }),

  removeLabelFromFiles: protectedProcedure
    .input(
      z.object({
        labelId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { labelId } = input;
      await ctx.db.file.updateMany({
        where: {
          labelId: labelId,
          userId: ctx.session.user.id,
        },
        data: {
          labelId: null,
        },
      });
      return {
        success: true,
        message: "Label removed from all files successfully.",
      };
    }),
});
