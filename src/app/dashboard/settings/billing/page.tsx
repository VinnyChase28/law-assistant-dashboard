"use client";

import { useSearchParams } from "next/navigation";

import { SkeletonAbstract } from "@/components/skeleton-abstract";
import { SubscriptionManager } from "@/components/stripe/active-subscription";
import Subscriptions from "@/components/stripe/subscriptions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { api } from "src/trpc/react";



export default function SettingsAccountPage() {
  const searchParams = useSearchParams();
  const hasSessionId: boolean = searchParams?.has("session_id");
  const {
    data: subscription,
    isLoading,
    error,
    refetch,
  } = api.stripe.getUserSubscriptions.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Billing</h3>
          <p className="text-sm text-muted-foreground">
            Manage your subscription
          </p>
        </div>
        <Separator />
        <SkeletonAbstract />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Billing</h3>
          <p className="text-sm text-muted-foreground">
            Manage your subscription
          </p>
        </div>
        <Separator />
        <Alert variant="destructive" title="Error">
          <AlertDescription>
            Failed to fetch subscription data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription
        </p>
      </div>
      <Separator />
      {hasSessionId && (
        <Alert variant="default" title="Subscription Created">
          <AlertDescription>
            Thanks for signing up! We&apos;re happy you&apos;re here.
          </AlertDescription>
        </Alert>
      )}

      {subscription ? (
        <SubscriptionManager subscription={subscription} refetch={refetch} />
      ) : (
        <Subscriptions />
      )}
    </div>
  );
}