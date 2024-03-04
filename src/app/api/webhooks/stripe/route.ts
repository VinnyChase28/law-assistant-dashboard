import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "src/utils/stripe"; // Ensure this path is correct
import { prisma } from "src/utils/prisma"; // Ensure this path is correct

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  // Try-catch block to construct the event from Stripe's webhook
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET ?? "",
    );
  } catch (error) {
    return new Response(`Webhook Error: ${error}`, { status: 400 });
  }

  // Handle checkout session completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    // Ensure the session has metadata with userId
    if (!session.metadata || !session.metadata.userId) {
      return new Response("User ID not found in session metadata", {
        status: 400,
      });
    }

    // Attempt to find a StripeCustomer entry for this user
    let stripeCustomer = await prisma.stripeCustomer.findFirst({
      where: {
        userId: session.metadata.userId,
      },
    });

    // If not found, create a new StripeCustomer
    if (!stripeCustomer) {
      stripeCustomer = await prisma.stripeCustomer.create({
        data: {
          userId: session.metadata.userId,
          stripeCustomerId: subscription.customer as string,
        },
      });
    }

    // Create or update a Subscription entry
    await prisma.subscription.upsert({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      update: {
        status: subscription.status,
        priceId: subscription?.items?.data[0]?.price.id,
      },
      create: {
        stripeSubscriptionId: subscription.id,
        customerId: stripeCustomer.id, // Use the id of the StripeCustomer record
        status: subscription.status,
        priceId: subscription?.items?.data[0]?.price.id ?? "",
      },
    });
  }

  // Handle invoice payment success
  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;

    // Update the Subscription entry based on invoice subscription ID
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string,
    );

    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: invoice.subscription as string,
      },
      data: {
        status: subscription.status,
        priceId: subscription?.items?.data[0]?.price.id,
      },
    });
  }

  // Return a successful response
  return new Response(null, { status: 200 });
}
