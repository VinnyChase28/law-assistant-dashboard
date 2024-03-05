import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "src/utils/stripe"; // Ensure this path is correct
import { prisma } from "src/utils/prisma"; // Ensure this path is correct
import { SubscriptionStatus } from "@prisma/client";

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
  } catch (error) {
    return new Response(`Webhook Error: ${error}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata?.userId) {
        return new Response("User ID not found in session metadata", {
          status: 400,
        });
      }
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      // Ensure StripeCustomer exists or create it
      let stripeCustomer = await prisma.stripeCustomer.upsert({
        where: {
          userId: session.metadata?.userId,
        },
        create: {
          userId: session.metadata?.userId,
          stripeCustomerId: subscription.customer as string,
        },
        update: {},
      });

      // Upsert Subscription
      await prisma.subscription.upsert({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        create: {
          stripeSubscriptionId: subscription.id,
          customerId: stripeCustomer.id,
          status: subscription.status.toUpperCase() as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id ?? "",
        },
        update: {
          status: subscription.status.toUpperCase() as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id,
        },
      });

      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
      );

      // Fetch the corresponding StripeCustomer based on Stripe's customer ID
      const stripeCustomer = await prisma.stripeCustomer.findFirst({
        where: {
          stripeCustomerId: subscription.customer as string,
        },
      });

      if (!stripeCustomer) {
        console.error(
          `StripeCustomer not found for Stripe Customer ID: ${subscription.customer}`,
        );
        return new Response("StripeCustomer record not found", { status: 400 });
      }

      // Upsert Subscription with the correct customerId
      await prisma.subscription.upsert({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        create: {
          stripeSubscriptionId: subscription.id,
          customerId: stripeCustomer.id,
          status: subscription.status.toUpperCase() as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id ?? "",
        },
        update: {
          status: subscription.status.toUpperCase() as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id,
        },
      });

      break;
    }
    case "customer.deleted": {
      const customer = event.data.object as Stripe.Customer;

      // Delete StripeCustomer and related Subscriptions
      await prisma.stripeCustomer.delete({
        where: {
          stripeCustomerId: customer.id,
        },
      });

      break;
    }
    // Add more cases as needed
  }

  return new Response(null, { status: 200 });
}
