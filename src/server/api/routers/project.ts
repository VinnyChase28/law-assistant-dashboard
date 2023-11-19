import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/api/trpc";
export const projectRouter = createTRPCRouter({
  uploadFile: protectedProcedure
    .input(
      z.object({
        fileName: z.string(),
        folder: z.string(),
        blobUrl: z.string(), // Add the blobUrl field
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new Error("UNAUTHORIZED");
      }
      return ctx.db.file.create({
        data: {
          name: input.fileName,
          folder: input.folder,
          blobUrl: input.blobUrl, // Include the blobUrl in the data being saved
          userId: ctx.session.user.id,
        },
      });
    }),
});
