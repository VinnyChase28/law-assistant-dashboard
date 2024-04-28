import { z } from "zod";

import { protectedProcedure, createTRPCRouter } from "src/server/api/trpc";

import { handleError } from "../utils";

export const labelRouter = createTRPCRouter({
  // allows a user to create a new label
  createLabel: protectedProcedure
    .input(
      z.object({
        text: z
          .string()
          .min(1)
          .max(20)
          .transform((str) => str.toLowerCase()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { text } = input;
        const existingLabel = await ctx.db.label.findFirst({
          where: {
            text,
            userId: ctx.session.user.id,
          },
        });
        if (existingLabel) {
          throw new Error("Label already exists.");
        }
        return await ctx.db.label.create({
          data: {
            text,
            userId: ctx.session.user.id,
          },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to create label.");
      }
    }),

  getLabels: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.label.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch labels.");
    }
  }),

  deleteLabel: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;
        return await ctx.db.label.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to delete label.");
      }
    }),

  assignLabel: protectedProcedure
    .input(
      z.object({
        fileId: z.number(),
        labelId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { fileId, labelId } = input;
        return await ctx.db.file.update({
          where: { id: fileId },
          data: { labelId },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to assign label to file.");
      }
    }),

  removeLabel: protectedProcedure
    .input(
      z.object({
        fileId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { fileId } = input;
        return await ctx.db.file.update({
          where: { id: fileId },
          data: { labelId: null },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to remove label from file.");
      }
    }),

  assignLabelToMultipleFiles: protectedProcedure
    .input(
      z.object({
        fileIds: z.array(z.number()),
        labelId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { fileIds, labelId } = input;
        await ctx.db.file.updateMany({
          where: {
            id: { in: fileIds },
            userId: ctx.session.user.id,
          },
          data: {
            labelId: labelId,
          },
        });
        return {
          success: true,
          message: "Labels updated successfully for selected files.",
        };
      } catch (error) {
        handleError(error);
        throw new Error("Failed to assign label to multiple files.");
      }
    }),

  removeLabelFromFiles: protectedProcedure
    .input(
      z.object({
        labelId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
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
      } catch (error) {
        handleError(error);
        throw new Error("Failed to remove label from files.");
      }
    }),
});
