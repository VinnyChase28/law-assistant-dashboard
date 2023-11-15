// In your post.ts or a new file.ts
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "src/server/api/trpc";

export const fileRouter = createTRPCRouter({
  // ... other procedures

  moveFile: protectedProcedure
    .input(z.object({ fileId: z.number(), newFolder: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.file.update({
        where: { id: input.fileId },
        data: { folder: input.newFolder },
      });
    }),

  // Add other procedures like createFile, deleteFile, etc.
});
