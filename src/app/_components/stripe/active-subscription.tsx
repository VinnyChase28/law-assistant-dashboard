"use client";

import { TimerIcon, StarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { AlertDialogComponent } from "../alert-dialogue";
import { api } from "src/trpc/react";
import { toast } from "../ui/use-toast";
import { IconSpinner } from "../ui/icons";

//TODO - Add proper props here when we force
//to the user to sign up for a subscription or a free trial
//not having the types is bad practice
export function SubscriptionManager({ subscription }: any) {
  const [isCanceled, setIsCanceled] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState(false);
  const cancelSubscription = api.stripe.cancelSubscription.useMutation();
  const resumeSubscription = api.stripe.resumeSubscription.useMutation();
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

  const cancel = async () => {
    setDisabled(true);
    setIsCanceled(true);
    await cancelSubscription.mutateAsync(undefined, {
      onSuccess: () => {
        toast({
          title: "Subscription Canceled",
          description: "Your subscription has been canceled.",
        });
      },
    });

    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };

  const resume = async () => {
    setDisabled(true);
    setIsCanceled(false);
    await resumeSubscription.mutateAsync(undefined, {
      onSuccess: () => {
        toast({
          title: "Subscription Resumed",
          description: "Your subscription has been resumed.",
        });
        setTimeout(() => {
          setDisabled(false);
        }, 3000);
      },
    });
  };

  const dialog = isCanceled ? (
    <AlertDialogComponent
      triggerLabel="Resume Subscription"
      title="Resume Subscription"
      description="Are you sure you want to resume?"
      confirmLabel="Yes, Resume"
      onConfirm={resume}
    />
  ) : (
    <AlertDialogComponent
      triggerLabel="Cancel Subscription"
      title="Cancel Subscription"
      description="Are you sure you want to cancel your subscription? We're sad to see you go."
      confirmLabel="Yes, Cancel"
      onConfirm={cancel}
    />
  );

  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_auto] items-start gap-4">
        <div>
          {/* TODO: ADD PROPER STRIPE SUB NAME */}
          <CardTitle>Solo</CardTitle>
          <CardDescription>
            {isTrial ? "Trial Subscription" : "Solo Subscription"}
          </CardDescription>
        </div>
        {disabled ? <IconSpinner /> : dialog}
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
