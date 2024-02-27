import { Separator } from "src/app/_components/ui/separator";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">Coming soon!</p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  );
}
