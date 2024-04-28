import { z } from "zod";

import { protectedProcedure, createTRPCRouter } from "src/server/api/trpc";

export const labelRouter = createTRPCRouter({
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
