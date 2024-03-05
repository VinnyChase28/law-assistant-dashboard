import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "src/utils/stripe"; // Ensure this path is correct
import { prisma } from "src/utils/prisma"; // Ensure this path is correct
import { SubscriptionStatus } from "@prisma/client";

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
  return await prisma.subscription.upsert({
    where: {
      stripeSubscriptionId: subscription.id,
    },
    create: {
      stripeSubscriptionId: subscription.id,
      customerId: customerId,
      status: subscription.status as SubscriptionStatus,
      priceId: subscription.items.data[0]?.price.id ?? "",
    },
    update: {
      status: subscription.status as SubscriptionStatus,
      priceId: subscription.items.data[0]?.price.id,
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
        console.log("Checkout session completed");
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const customerStripeId = session.customer as string;

        if (!userId) {
          return new Response("User ID not found in session metadata", {
            status: 400,
          });
        }

        const stripeCustomer = await upsertStripeCustomer(
          userId,
          customerStripeId,
        );
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );
        await upsertSubscription(subscription, stripeCustomer.id);
        break;
      }

      case "invoice.payment_succeeded": {
        console.log("Invoice payment succeeded");
        const invoice = event.data.object as Stripe.Invoice;
        const subscription = await stripe.subscriptions.retrieve(
          invoice.subscription as string,
        );
        const stripeCustomer = await prisma.stripeCustomer.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (!stripeCustomer) {
          console.error(
            `StripeCustomer not found for Stripe Customer ID: ${subscription.customer}`,
          );
          return new Response("StripeCustomer record not found", {
            status: 400,
          });
        }

        await upsertSubscription(subscription, stripeCustomer.id);
        break;
      }

      case "customer.deleted": {
        console.log("Customer deleted");
        const customer = event.data.object as Stripe.Customer;
        await prisma.stripeCustomer.delete({
          where: { stripeCustomerId: customer.id },
        });
        break;
      }

      case "customer.subscription.updated": {
        console.log("Customer subscription updated");
        const subscription = event.data.object as Stripe.Subscription;
        console.log("🚀 ~ POST ~ subscription:", subscription);
        const stripeCustomer = await prisma.stripeCustomer.findUnique({
          where: { stripeCustomerId: subscription.customer as string },
        });

        if (!stripeCustomer) {
          console.error(
            `StripeCustomer not found for Stripe Customer ID: ${subscription.customer}`,
          );
          return new Response("StripeCustomer record not found", {
            status: 400,
          });
        }

        await upsertSubscription(subscription, stripeCustomer.id);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error handling webhook event:", error);
    return new Response("Server Error", { status: 500 });
  }

  return new Response(null, { status: 200 });
}
