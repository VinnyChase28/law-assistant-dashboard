"use client";

import { useState } from "react";
import { ChevronDownIcon, CircleIcon, StarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { AlertDialogComponent } from "../alert-dialogue";
import { api } from "src/trpc/react";

//TODO - Add proper props here when we force
//to the user to sign up for a subscription or a free trial
export function ActiveSubscription({ subscription }: any) {
  const { status, renewalDate, cancelAtPeriodEnd, trialEndDate } = subscription;
  const formattedRenewalDate = new Date(renewalDate * 1000).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const formattedTrialEndDate = new Date(
    trialEndDate * 1000,
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const cancelSubscription = api.stripe.cancelSubscription.useMutation();
  const cancel = async () => {
    await cancelSubscription.mutateAsync();
  };

  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>Solo</CardTitle>
          <CardDescription>
            Your current subscription status and renewal information.
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary pr-4 text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            {status === "active" ? (
              <CircleIcon className="mr-2 h-4 w-4 fill-green-500 text-green-500" />
            ) : (
              <CircleIcon className="mr-2 h-4 w-4 fill-red-500 text-red-500" />
            )}
            {status}
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              alignOffset={-5}
              className="h-[50px] w-[25px] border-none shadow-none"
              forceMount
            >
              <AlertDialogComponent continue={cancel} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            Premium Features
          </div>
          {cancelAtPeriodEnd ? (
            <div>Your account will expire on {formattedTrialEndDate}</div>
          ) : (
            <div>Renews on {formattedRenewalDate}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
