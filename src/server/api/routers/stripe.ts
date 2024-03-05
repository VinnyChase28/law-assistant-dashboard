import { z } from "zod";
import Stripe from "stripe";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { stripe } from "src/utils/stripe";
import { prisma } from "src/utils/prisma";

const url = process.env.URL ?? "http://localhost:3000";

export const stripeRouter = createTRPCRouter({
  getSubscriptionCheckoutURL: protectedProcedure.query(async ({ ctx }) => {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],

      success_url: `${url}/settings/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/`,
      metadata: { userId: ctx.session.user.id },
      subscription_data: {
        metadata: {
          userId: ctx.session.user.id,
        },

        trial_period_days: 7,
      },
    });

    if (!checkoutSession.url) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Could not create checkout message",
      });
    }

    return { redirectURL: checkoutSession.url };
  }),

  cancelSubscription: protectedProcedure
    .input(z.object({ stripeCustomerId: z.string() }))
    .mutation(async ({ input }) => {
      const { stripeCustomerId } = input;

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
        apiVersion: "2023-10-16",
      });

      const subscription = await stripe.subscriptions.list({
        customer: stripeCustomerId,
      });
      const subscriptionId = subscription.data[0]!.id;

      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      return { message: "Membership Cancelled" };
    }),

  resumeSubscription: protectedProcedure
    .input(z.object({ stripeCustomerId: z.string() }))
    .mutation(async ({ input }) => {
      const { stripeCustomerId } = input;

      const subscription = await stripe.subscriptions.list({
        customer: stripeCustomerId,
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

    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomer?.stripeCustomerId,
    });

    if (subscriptions.data.length === 0) {
      return null; // No subscription found
    }

    // Directly use the first subscription in the array
    const subscription = subscriptions?.data[0];

    return {
      id: subscription?.id,
      status: subscription?.status,
      renewalDate: subscription?.current_period_end, // Rename this field
      items: subscription?.items.data.map((item) => ({
        id: item.id,
        price: item.price.unit_amount,
        currency: item.price.currency,
      })),
    };
  }),
});
