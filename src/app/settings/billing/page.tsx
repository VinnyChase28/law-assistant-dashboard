"use client";

import { Separator } from "@/components/ui/separator";
import Subscriptions from "@/components/stripe/subscriptions";
import { SubscriptionManager } from "@/components/stripe/active-subscription";
import { api } from "src/trpc/react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SkeletonAbstract } from "@/components/skeleton-abstract";

export default function SettingsAccountPage() {
  const searchParams = useSearchParams();
  const hasSessionId: boolean = searchParams?.has("session_id");
  //find a better way to refetch the data
  const { data: subscription, isLoading } =
    api.stripe.getUserSubscriptions.useQuery();

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
        <SubscriptionManager subscription={subscription} />
      ) : (
        <Subscriptions />
      )}
    </div>
  );
}
