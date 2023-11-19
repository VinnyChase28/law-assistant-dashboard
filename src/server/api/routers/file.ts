import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const fileRouter = createTRPCRouter({
  insertFileMetadata: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        fileType: z.string(),
        fileSize: z.string(),
        projectId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Ensure the user is authenticated
      if (!ctx.session.user) {
        throw new Error("UNAUTHORIZED");
      }

      // Insert the file metadata into the database
      return ctx.db.file.create({
        data: {
          name: input.name,
          blobUrl: "", // This should be set after handling the actual file upload
          fileType: input.fileType,
          fileSize: input.fileSize,
          userId: ctx.session.user.id, // Set the user ID from the session
          projectId: input.projectId,
          processingStatus: "pending",
        },
      });
    }),
});
