import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

import { handleError } from "../utils";

export const userRouter = createTRPCRouter({
  // Get user id
  getUserId: protectedProcedure.query(async ({ ctx }) => {
    try {
      return ctx.session.user.id;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to retrieve user ID");
    }
  }),

  // Get Stripe Customer
  getStripeCustomer: protectedProcedure.query(async ({ ctx }) => {
    try {
      const stripeCustomer = await ctx.db.stripeCustomer.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!stripeCustomer) {
        throw new Error("Stripe customer not found");
      }

      return stripeCustomer;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch Stripe customer");
    }
  }),

  // Create Stripe Customer
  createStripeCustomer: protectedProcedure
    .input(
      z.object({
        stripeCustomerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const stripeCustomer = await ctx.db.stripeCustomer.create({
          data: {
            stripeCustomerId: input.stripeCustomerId,
            userId: ctx.session.user.id,
          },
        });

        return stripeCustomer;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to create Stripe customer");
      }
    }),

  // Get Subscription
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    try {
      const subscriptions = await ctx.db.subscription.findMany({
        where: { stripeCustomer: { userId: ctx.session.user.id } },
      });

      if (subscriptions.length === 0) {
        return [];
      }

      return subscriptions;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to retrieve subscriptions");
    }
  }),

  // Get user details
  getUserDetails: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch user details");
    }
  }),

  // Update the user's name
  updateName: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedUser = await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { name: input.name },
        });

        return updatedUser;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to update user name");
      }
    }),

  // Update the user's bio
  updateBio: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedUser = await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { bio: input.bio },
        });

        return updatedUser;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to update user bio");
      }
    }),

  // Add a social link
  addSocialLink: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newLink = await ctx.db.socialLink.create({
          data: {
            url: input.url,
            userId: ctx.session.user.id,
          },
        });

        return newLink;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to add social link");
      }
    }),

  // Update a social link
  updateSocialLink: protectedProcedure
    .input(
      z.object({
        linkId: z.number(),
        newUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const updatedLink = await ctx.db.socialLink.update({
          where: { id: input.linkId },
          data: { url: input.newUrl },
        });

        return updatedLink;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to update social link");
      }
    }),
  // Get social links
  getSocialLinks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const links = await ctx.db.socialLink.findMany({
        where: { userId: ctx.session.user.id },
      });

      return links;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to retrieve social links");
    }
  }),

  // Remove a social link
  removeSocialLink: protectedProcedure
    .input(
      z.object({
        linkId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const deletedLink = await ctx.db.socialLink.delete({
          where: { id: input.linkId },
        });

        return deletedLink;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to remove social link");
      }
    }),

  // Delete all social links for a user
  deleteAllSocialLinks: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const deletedLinks = await ctx.db.socialLink.deleteMany({
        where: { userId: ctx.session.user.id },
      });

      return deletedLinks;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to delete all social links for the user");
    }
  }),

  // Accept terms
  acceptTerms: protectedProcedure
    .input(
      z.object({
        accepted: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { acceptedTerms: input.accepted },
        });
      } catch (error) {
        handleError(error);
        throw new Error("Failed to update acceptance of terms");
      }
    }),

  // Query to check if the user has accepted the terms
  hasAcceptedTerms: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
        select: { acceptedTerms: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user.acceptedTerms;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to check if user has accepted terms");
    }
  }),
});
