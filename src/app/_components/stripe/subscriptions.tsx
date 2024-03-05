"use client";

import { api } from "src/trpc/react";
import { Button } from "../ui/button";
const Subscriptions = () => {
  const userId = api.user.getUserId.useQuery().data !== null;

  const { data: subscriptionSessionData } =
    api.stripe.getSubscriptionCheckoutURL.useQuery(void {}, {
      enabled: userId,
    });

  const handleGoToSubscriptionCheckoutSession = async () => {
    const redirectURL = subscriptionSessionData?.redirectURL;

    if (redirectURL) {
      window.location.assign(redirectURL);
    }
  };

  return (
    <section className="mt-10 flex flex-col gap-8">
      <header className="flex w-full flex-col gap-3">
        <h1 className="text-center text-4xl font-extrabold tracking-tight">
          Select a Plan
        </h1>
      </header>
      <div className="flex gap-2.5">
        <div className="flex h-40 w-1/2 flex-col justify-between p-5">
          <h2 className="text-center text-2xl font-extrabold tracking-tight">
            $19 a Month
          </h2>
          <p className="text-center">and $0.06 per 1000 tokens</p>
          <Button onClick={() => handleGoToSubscriptionCheckoutSession()}>
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Subscriptions;
