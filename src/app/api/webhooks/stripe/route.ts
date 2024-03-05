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
      console.log("checkout.session.completed");
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(session, "LALALALA");
      if (!session.metadata?.userId) {
        return new Response("User ID not found in session metadata", {
          status: 400,
        });
      }

      const userId = session.metadata.userId;
      const customerStripeId = session.customer as string;

      // Preemptively ensure the StripeCustomer exists
      let stripeCustomer = await prisma.stripeCustomer.upsert({
        where: { stripeCustomerId: customerStripeId },
        create: {
          userId: userId,
          stripeCustomerId: customerStripeId,
        },
        update: {},
      });

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      );

      console.log(subscription.status.toUpperCase(), "subscription status");

      // Upsert Subscription
      await prisma.subscription.upsert({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        create: {
          stripeSubscriptionId: subscription.id,
          customerId: stripeCustomer.id,
          status: subscription.status as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id ?? "",
        },
        update: {
          status: subscription.status as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id,
        },
      });

      break;
    }
    case "invoice.payment_succeeded": {
      console.log("invoice.payment_succeeded");
      const invoice = event.data.object as Stripe.Invoice;
      console.log(event.data.object, "payment_succeeded metadata");
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
      );

      // Fetch the corresponding StripeCustomer based on Stripe's customer ID
      let stripeCustomer = await prisma.stripeCustomer.findFirst({
        where: {
          stripeCustomerId: subscription.customer as string,
        },
      });

      console.log(
        stripeCustomer,
        "stripeCustomer in invoice.payment_succeeded",
      );

      //if no stripe customer, create one
      if (!stripeCustomer) {
        await prisma.stripeCustomer.create({
          data: {
            userId: event?.data?.object?.subscription_details?.metadata
              ?.userId as string,
            stripeCustomerId: subscription.customer as string,
          },
        });
      }

      // Fetch the corresponding StripeCustomer based on Stripe's customer ID
      stripeCustomer = await prisma.stripeCustomer.findFirst({
        where: {
          stripeCustomerId: subscription.customer as string,
        },
      });

      if (!stripeCustomer) {
        console.error(
          `StripeCustomer not found for Stripe Customer ID: ${subscription.customer}`,
        );
        return new Response(
          "StripeCustomer record not found within invoice.payment_succeeded",
          { status: 400 },
        );
      }

      // Upsert Subscription with the correct customerId
      await prisma.subscription.upsert({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        create: {
          stripeSubscriptionId: subscription.id,
          customerId: stripeCustomer.id,
          status: subscription.status as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id ?? "",
        },
        update: {
          status: subscription.status as SubscriptionStatus,
          priceId: subscription?.items?.data[0]?.price.id,
        },
      });

      break;
    }
    case "customer.deleted": {
      console.log("customer.deleted");
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
