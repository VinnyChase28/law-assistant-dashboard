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
        // TODO: add projectid from list of selectable projects.
        // we default to "Default Project" for now.
        // files must be seperated by project
        projectId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let projectId = input.projectId;
      if (!projectId) {
        const defaultProject = await ctx.db.project.findFirst({
          where: {
            name: "Default Project",
            userId: ctx.session.user.id,
          },
        });

        if (!defaultProject) {
          throw new Error("Default Project not found.");
        }
        projectId = defaultProject.id;

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
