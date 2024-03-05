"use client";

import { Separator } from "@/components/ui/separator";
import Subscriptions from "@/components/stripe/subscriptions";
import { ActiveSubscription } from "@/components/stripe/active-subscription";
import { api } from "src/trpc/react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SkeletonAbstract } from "src/app/_components/skeleton-abstract";
export default function SettingsAccountPage() {
  const searchParams = useSearchParams();
  console.log("🚀 ~ SettingsAccountPage ~ searchParams:", searchParams);
  const hasSessionId: boolean = searchParams?.has("session_id");
  console.log("🚀 ~ SettingsAccountPage ~ hasSessionId:", hasSessionId);
  const { data: subscription, isLoading } =
    api.stripe.getUserSubscriptions.useQuery();

  if (isLoading) {
    console.log("🚀 ~ SettingsAccountPage ~ isLoading:", isLoading);

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Billing</h3>
          <p className="text-sm text-muted-foreground">Coming soon!</p>
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
        <p className="text-sm text-muted-foreground">Coming soon!</p>
      </div>
      <Separator />
      {hasSessionId && (
        <Alert variant="default" title="Subscription Created">
          <AlertDescription>
            Thanks for signing up! We're happy you're here.
          </AlertDescription>
        </Alert>
      )}
      {subscription ? (
        <ActiveSubscription subscription={subscription} />
      ) : (
        <Subscriptions />
      )}
    </div>
  );
}
