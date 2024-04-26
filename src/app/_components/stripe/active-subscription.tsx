"use client";

import { useState, useEffect } from "react";

import { TimerIcon, StarIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@components/ui/card";
import { api } from "src/trpc/react";

import { AlertDialogComponent } from "../alert-dialogue";
import { IconSpinner } from "../ui/icons";
import { toast } from "../ui/use-toast";

export function SubscriptionManager() {
  const [isCanceled, setIsCanceled] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState(false);
  const cancelSubscription = api.stripe.cancelSubscription.useMutation();
  const resumeSubscription = api.stripe.resumeSubscription.useMutation();
  const { data: latestSubscription, refetch } =
    api.stripe.getUserSubscriptions.useQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { status, renewalDate, cancelAtPeriodEnd, trialEndDate } =
    latestSubscription ?? {};

  if (!latestSubscription) {
    return <div>Loading...</div>;
  }

  const isTrial = status === "trialing";
  const endDate = isTrial ? trialEndDate : renewalDate;

  const formattedEndDate = new Date(endDate! * 1000).toLocaleDateString(
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
    try {
      await cancelSubscription.mutateAsync();
    } finally {
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
    }
  };

  const resume = async () => {
    setDisabled(true);
    setIsCanceled(false);
    try {
      await resumeSubscription.mutateAsync();
    } finally {
      setTimeout(() => {
        setDisabled(false);
      }, 3000);
    }
  };

  const handleCancel = () => {
    cancel().catch((error) => {
      console.error("Failed to cancel subscription:", error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription.",
      });
    });
  };

  const handleResume = () => {
    resume().catch((error) => {
      console.error("Failed to resume subscription:", error);
      toast({
        title: "Error",
        description: "Failed to resume subscription.",
      });
    });
  };

  const dialog = isCanceled ? (
    <AlertDialogComponent
      triggerLabel="Resume Subscription"
      title="Resume Subscription"
      description="Are you sure you want to resume?"
      confirmLabel="Yes, Resume"
      onConfirm={handleResume}
    />
  ) : (
    <AlertDialogComponent
      triggerLabel="Cancel Subscription"
      title="Cancel Subscription"
      description="Are you sure you want to cancel your subscription? We're sad to see you go."
      confirmLabel="Yes, Cancel"
      onConfirm={handleCancel}
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