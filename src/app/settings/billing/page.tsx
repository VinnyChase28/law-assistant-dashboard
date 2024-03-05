import { Separator } from "src/app/_components/ui/separator";
import Subscriptions from "src/app/_components/stripe/subscriptions";
import { ActiveSubscription } from "src/app/_components/stripe/active-subscription";
import { api } from "src/trpc/server";

export default async function SettingsAccountPage() {
  const subscription = await api.stripe.getUserSubscriptions.query();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">Coming soon!</p>
      </div>
      <Separator />
      {subscription ? (
        <ActiveSubscription subscription={subscription} />
      ) : (
        <Subscriptions />
      )}
    </div>
  );
}
