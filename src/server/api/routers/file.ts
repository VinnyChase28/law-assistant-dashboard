import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const fileRouter = createTRPCRouter({
  insertFileMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fileType: z.string(),
        fileSize: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Ensure the user is authenticated
      if (!ctx.session.user) {
        throw new Error("UNAUTHORIZED");
      }

      return ctx.db.file.create({
        data: {
          name: input.name,
          blobUrl: "",
          fileType: input.fileType,
          fileSize: input.fileSize,
          userId: ctx.session.user.id,
          projectId: input.projectId,
          processingStatus: "pending",
        },
      });
    }),
  // Fetch All Files for a User
  getUserFiles: protectedProcedure
    .input(z.string()) // userId
    .query(async ({ ctx, input }) => {
      return ctx.db.file.findMany({
        where: { userId: input },
        include: { project: true }, // Include project data if needed
      });
    }),

  // Fetch Files by Project
  getProjectFiles: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.file.findMany({
        where: { projectId: input },
      });
    }),

  // Update File Metadata
  updateFileMetadata: protectedProcedure
    .input(
      z.object({
        fileId: z.number(),
        name: z.string().optional(),
        fileType: z.string().optional(),
        fileSize: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.file.update({
        where: { id: input.fileId },
        data: {
          name: input.name,
          fileType: input.fileType,
          fileSize: input.fileSize,
        },
      });
    }),

  // Fetch Favorite Count for a File
  getFavoriteCount: protectedProcedure
    .input(z.number()) // fileId
    .query(async ({ ctx, input }) => {
      return ctx.db.favorite.count({
        where: { fileId: input },
      });
    }),

  // Fetch Favorite Files for a User
  getUserFavoriteFiles: protectedProcedure
    .input(z.string()) // userId
    .query(async ({ ctx, input }) => {
      return ctx.db.favorite.findMany({
        where: { userId: input },
        include: {
          file: true, // Include the file data
        },
      });
    }),
});
