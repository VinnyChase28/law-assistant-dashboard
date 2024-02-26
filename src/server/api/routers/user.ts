import { createTRPCRouter, protectedProcedure } from "src/server/api/trpc";
import { z } from "zod";
export const userRouter = createTRPCRouter({
  getUserId: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx.session);
    if (!ctx.session.user) {
      throw new Error("UNAUTHORIZED");
    }
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

  // Update Subscription
  updateSubscription: protectedProcedure
    .input(
      z.object({
        subscriptionId: z.string(),
        newStatus: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedSubscription = await ctx.db.subscription.update({
        where: { id: input.subscriptionId },
        data: { status: input.newStatus },
      });

      return updatedSubscription;
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
});
