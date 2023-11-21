import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const fileRouter = createTRPCRouter({
  //insert file metadata
  insertFileMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fileType: z.string(),
        fileSize: z.string(),
        blobUrl: z.string(),
        //TODO: add projectid from list of selectable projects. we default to "Default Project" for now. files must be seperated by project
        projectId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let projectId = input.projectId;
      if (!projectId) {
        const defaultProject = await ctx.db.project.findFirst({
          where: {
            name: "Default Project",
            // Add additional conditions if necessary, like userId
            userId: ctx.session.user.id,
          },
        });
        if (!defaultProject) {
          throw new Error("Default Project not found.");
        }
        projectId = defaultProject.id;
        // Insert file metadata into the database
        return ctx.db.file.create({
          data: {
            name: input.name,
            blobUrl: input.blobUrl || "",
            fileType: input.fileType,
            fileSize: input.fileSize,
            userId: ctx.session.user.id,
            projectId: projectId,
            processingStatus: "IN_PROGRESS",
          },
        });
      }
    }),

  // Fetch All Files for a User
  getUserFiles: protectedProcedure.query(async ({ ctx }) => {
    console.debug("ctx.session.user", ctx.session.user);
    return ctx.db.file.findMany({
      where: { userId: ctx.session.user.id },
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
