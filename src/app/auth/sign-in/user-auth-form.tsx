"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    // Trigger the sign-in process with Auth0
    signIn("auth0", {
      callbackUrl: `/settings/billing`,
    });
    // You can handle loading state, errors, or redirections after the signIn call if needed
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Sign in to your preffered provider
          </span>
        </div>
      </div>

      <Button onClick={onSubmit} variant={"secondary"} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Sign In"
        )}
      </Button>
    </div>
  );
}
