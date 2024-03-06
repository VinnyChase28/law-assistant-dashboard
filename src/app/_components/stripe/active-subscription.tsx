"use client";

import { useState } from "react";
import { ChevronDownIcon, TimerIcon, StarIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { AlertDialogComponent } from "../alert-dialogue";
import { api } from "src/trpc/react";

//TODO - Add proper props here when we force
//to the user to sign up for a subscription or a free trial
//not having the types is bad practice
export function SubscriptionManager({ subscription }: any) {
  const [subscriptionVersion, setSubscriptionVersion] = useState(0);
  const { status, renewalDate, cancelAtPeriodEnd, trialEndDate } = subscription;
  const isTrial = status === "trialing";
  const endDate = isTrial ? trialEndDate : renewalDate;

  const formattedEndDate = new Date(endDate * 1000).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const cancelSubscription = api.stripe.cancelSubscription.useMutation();
  const cancel = async () => {
    await cancelSubscription.mutateAsync();
    setSubscriptionVersion((prevVersion) => prevVersion + 1);
  };

  const resumeSubscription = api.stripe.resumeSubscription.useMutation();
  const resume = async () => {
    await resumeSubscription.mutateAsync();
    setSubscriptionVersion((prevVersion) => prevVersion + 1);
  };

  const cancelDialog = (
    <AlertDialogComponent
      triggerLabel="Cancel Subscription"
      title="Cancel Subscription"
      description="Are you sure you want to cancel your subscription? We're sad to see you go."
      confirmLabel="Yes, Cancel"
      onConfirm={cancel}
    />
  );

  const resumeDialog = (
    <AlertDialogComponent
      triggerLabel="Resume Subscription"
      title="Resume Subscription"
      description="Are you sure you want to resume your subscription and continue enjoying our services?"
      confirmLabel="Yes, Resume"
      onConfirm={resume}
    />
  );

  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4">
        <div>
          <CardTitle>
            {isTrial ? "Trial Subscription" : "Solo Subscription"}
          </CardTitle>
          <CardDescription>
            {isTrial
              ? `Your trial will expire on ${formattedEndDate}.`
              : `Your subscription will ${
                  cancelAtPeriodEnd ? "expire" : "renew"
                } on ${formattedEndDate}.`}
          </CardDescription>
        </div>
        {cancelAtPeriodEnd ? resumeDialog : cancelDialog}
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            Premium Features
          </div>

          <div className="flex items-center">
            <TimerIcon className="mr-1 h-3 w-3" />
          </div>
          {isTrial
            ? `Your trial will expire on ${formattedEndDate}.`
            : `Your subscription will ${
                cancelAtPeriodEnd ? "expire" : "renew"
              } on ${formattedEndDate}.`}
        </div>
      </CardContent>
    </Card>
  );
}
