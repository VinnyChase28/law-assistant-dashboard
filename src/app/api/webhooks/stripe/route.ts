import { type SubscriptionStatus } from "@prisma/client";
import { headers } from "next/headers";
import type Stripe from "stripe";

import { prisma } from "src/utils/prisma"; // Ensure this path is correct
import { stripe } from "src/utils/stripe"; // Ensure this path is correct

// Helper function to upsert StripeCustomer
async function upsertStripeCustomer(userId: string, customerStripeId: string) {
  return await prisma.stripeCustomer.upsert({
    where: { stripeCustomerId: customerStripeId },
    create: {
      userId: userId,
      stripeCustomerId: customerStripeId,
    },
    update: {},
  });
}

// Helper function to upsert Subscription
async function upsertSubscription(
  subscription: Stripe.Subscription,
  customerId: string,
) {
  const priceIds = subscription.items.data.map((item) => item.price.id);

  return await prisma.subscription.upsert({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    create: {
      stripeSubscriptionId: subscription.id,
      customerId: customerId,
      status: subscription.status as SubscriptionStatus,
      priceIds: priceIds,
    },
    update: {
      status: subscription.status as SubscriptionStatus,
      priceIds: priceIds,
    },
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? "",
    );
  } catch (error: any) {
    console.error("Webhook Error:", error.message);
    return new Response("Webhook Error: Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        if (!userId) {
          console.error("User ID not found in session metadata");
          return new Response("User ID not found in session metadata", {
            status: 400,
          });
        }
      
        const customerStripeId = session.customer as string;
        try {
          const stripeCustomer = await upsertStripeCustomer(
            userId,
            customerStripeId,
          );
          const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
          );
          await upsertSubscription(subscription, stripeCustomer.id);
        } catch (error) {
          console.error("Error processing checkout.session.completed", error);
          return new Response("Error processing event", { status: 500 });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription as string,
        );
        const stripeCustomer = await prisma.stripeCustomer.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (!stripeCustomer) {
          console.error(
            `StripeCustomer not found for Stripe Customer ID: ${JSON.stringify(
              subscription.customer,
            )}`,
          );
          return new Response("StripeCustomer record not found", {
            status: 400,
          });
        }

        await upsertSubscription(subscription, stripeCustomer.id);
        break;
      }

      case "customer.deleted": {
        const customer = event.data.object;
        await prisma.stripeCustomer.delete({
          where: { stripeCustomerId: customer.id },
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const stripeCustomer = await prisma.stripeCustomer.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (!stripeCustomer) {
          console.error(
            `StripeCustomer not found for Stripe Customer ID: ${
              subscription.customer as string
            }`,
          );
          return new Response("StripeCustomer record not found", {
            status: 400,
          });
        }

        await upsertSubscription(subscription, stripeCustomer.id);
        break;
      }

      default:
      
    }
  } catch (error) {
    console.error("Error handling webhook event:", error);
    return new Response("Server Error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
