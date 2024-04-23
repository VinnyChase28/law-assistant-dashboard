import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";

export const userRouter = createTRPCRouter({
  //get user id
  getUserId: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session.user.id;
  }),

  // Get Stripe Customer
  getStripeCustomer: protectedProcedure.query(async ({ ctx }) => {
    const stripeCustomer = await ctx.db.stripeCustomer.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (!stripeCustomer) {
      return null;
    }

    return stripeCustomer;
  }),

  // Create Stripe Customer
  createStripeCustomer: protectedProcedure
    .input(
      z.object({
        stripeCustomerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const stripeCustomer = await ctx.db.stripeCustomer.create({
        data: {
          stripeCustomerId: input.stripeCustomerId,
          userId: ctx.session.user.id,
        },
      });

      return stripeCustomer;
    }),

  // Get Subscription
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    const subscriptions = await ctx.db.subscription.findMany({
      where: { stripeCustomer: { userId: ctx.session.user.id } },
    });

    if (subscriptions.length === 0) {
      return [];
    }

    return subscriptions;
  }),

  //get user details
  getUserDetails: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }),

  //update the user's name
  updateName: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name },
      });

      return updatedUser;
    }),

  updateBio: protectedProcedure
    .input(
      z.object({
        bio: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedUser = await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { bio: input.bio },
      });

      return updatedUser;
    }),

  addSocialLink: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newLink = await ctx.db.socialLink.create({
        data: {
          url: input.url,
          userId: ctx.session.user.id, // Assuming the session has the user's ID
        },
      });

      return newLink;
    }),
  updateSocialLink: protectedProcedure
    .input(
      z.object({
        linkId: z.number(), // or z.string() if your ID is a string
        newUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedLink = await ctx.db.socialLink.update({
        where: { id: input.linkId },
        data: { url: input.newUrl },
      });

      return updatedLink;
    }),
  //get social links
  getSocialLinks: protectedProcedure.query(async ({ ctx }) => {
    const links = await ctx.db.socialLink.findMany({
      where: { userId: ctx.session.user.id },
    });

    return links;
  }),
  removeSocialLink: protectedProcedure
    .input(
      z.object({
        linkId: z.number(), // or z.string() if your ID is a string
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const deletedLink = await ctx.db.socialLink.delete({
        where: { id: input.linkId },
      });

      return deletedLink;
    }),

  //delete all social links for a user

  deleteAllSocialLinks: protectedProcedure.mutation(async ({ ctx }) => {
    const deletedLinks = await ctx.db.socialLink.deleteMany({
      where: { userId: ctx.session.user.id },
    });

    return deletedLinks;
  }),

  acceptTerms: protectedProcedure
    .input(
      z.object({
        accepted: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { acceptedTerms: input.accepted },
      });
    }),

  // Query to check if the user has accepted the terms
  hasAcceptedTerms: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { acceptedTerms: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.acceptedTerms;
  }),
});
