import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { prisma } from "src/utils/prisma";
import { stripe } from "src/utils/stripe";

import { createTRPCRouter, protectedProcedure } from "../trpc";



export const stripeRouter = createTRPCRouter({
  getSubscriptionCheckoutURL: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;
    const userId = user.id;

    const basePrice = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;
    const usagePrice = process.env.STRIPE_USAGE_PRICE_ID;

    if (!basePrice || !usagePrice) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Stripe price IDs are not configured",
      });
    }

    const lineItems = [
      { price: basePrice, quantity: 1 },
      { price: usagePrice }, // Remove the quantity for the metered usage price
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: lineItems,
      mode: "subscription",
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
      metadata: {
        userId,
      },
    });

    return { redirectURL: session.url };
  }),

  cancelSubscription: protectedProcedure
    .input(z.optional(z.object({ stripeCustomerId: z.string() })))
    .mutation(async ({ ctx }) => {
      const stripeCustomer = await prisma.stripeCustomer.findFirst({
        where: { userId: ctx.session.user.id },
      });

      const subscriptions = await stripe.subscriptions.list({
        customer: stripeCustomer?.stripeCustomerId,
      });

      if (subscriptions.data.length === 0) {
        return null; // No subcription found
      }

      const subscriptionId = subscriptions.data[0]!.id;
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      return { message: "Membership Cancelled" };
    }),

  resumeSubscription: protectedProcedure
    .input(z.optional(z.object({ stripeCustomerId: z.string() })))
    .mutation(async ({ ctx }) => {
      const stripeCustomer = await prisma.stripeCustomer.findFirst({
        where: { userId: ctx.session.user.id },
      });

      const subscription = await stripe.subscriptions.list({
        customer: stripeCustomer?.stripeCustomerId,
      });

      const subscriptionId = subscription.data[0]!.id;
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
      });

      return { message: "Membership Resumed" };
    }),

  //create a new mutation to get the user'd stripe customer id
  getStripeCustomerId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      const customer = await stripe.customers.list({
        email: userId,
      });

      return customer.data[0]!.id;
    }),

  getUserSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    const stripeCustomer = await prisma.stripeCustomer.findFirst({
      where: { userId: ctx.session.user.id },
    });

    // Assuming you have a Stripe client instance named `stripe`
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomer?.stripeCustomerId,
    });



    // Filter the subscriptions to only include those with the matching userId in metadata
    const filteredSubscriptions = subscriptions.data.filter((subscription) => {
      return subscription.metadata.userId === ctx.session.user.id;
    });



    // If no matching subscriptions are found, return null
    if (filteredSubscriptions.length === 0) {
      return null;
    }

    // You can now work with the filtered list of subscriptions
    // For example, if you want to use the first subscription:
    const subscription = filteredSubscriptions[0];

    return {
      id: subscription?.id,
      status: subscription?.status,
      renewalDate: subscription?.current_period_end,
      trialEndDate: subscription?.trial_end,
      cancelledAt: subscription?.canceled_at,
      cancelAtPeriodEnd: subscription?.cancel_at_period_end,
      items: subscription?.items.data.map((item) => ({
        id: item.id,
        price: item.price.unit_amount,
        currency: item.price.currency,
      })),
    };
  }),
});
