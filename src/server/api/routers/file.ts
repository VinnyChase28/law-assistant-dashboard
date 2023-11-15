// In your post.ts or a new file.ts
import { z } from "zod";
import { put } from "@vercel/blob";
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

  uploadFile: protectedProcedure
    .input(z.object({ file: z.any(), folder: z.string() })) // Adjust the input validation as needed
    .mutation(async ({ ctx, input }) => {
      // Ensure the user is authenticated
      if (!ctx.session.user) {
        throw new Error("UNAUTHORIZED");
      }
      // Upload file to Vercel Blob Storage
      const { url } = await put(`files/${input.file.name}`, input.file, {
        access: "public",
      });

      return ctx.db.file.create({
        data: {
          name: input.file.name,
          folder: input.folder,
          userId: ctx.session.user.id,
          blobUrl: url,
        },
      });
    }),
});
