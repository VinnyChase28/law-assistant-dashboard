// In your post.ts or a new file.ts
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
 
export const fileRouter = createTRPCRouter({
  moveFile: protectedProcedure
    .input(z.object({ fileId: z.number(), newFolder: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Fetch the file to check ownership
      const file = await ctx.db.file.findUnique({
        where: { id: input.fileId },
      });

      if (!file || file.userId !== ctx.session.user.id) {
        throw new Error("UNAUTHORIZED");
      }

      // Move the file to the new folder
      return ctx.db.file.update({
        where: { id: input.fileId },
        data: { folder: input.newFolder },
      });
    }),

  //TODO: Add other procedures like createFile, deleteFile, etc.
});
