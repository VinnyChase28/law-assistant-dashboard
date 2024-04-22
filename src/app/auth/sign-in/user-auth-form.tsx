"use client";

import * as React from "react";

import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Icons } from "@components/icons";
import { Button } from "@components/ui/button";
import { useCheckedRowsStore } from "src/store/store";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { deleteAll } = useCheckedRowsStore();
  async function onSubmit(event: React.SyntheticEvent) {
    setIsLoading(true);
    event.preventDefault();
    deleteAll();
    await signIn("auth0", {
      // redirect: true,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Sign in to your preferred provider
          </span>
        </div>
      </div>

      <div className="justify-content center text-center">
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" />
        ) : (
          <Button onClick={onSubmit} variant={"secondary"} disabled={isLoading}>
            Authenticate
          </Button>
        )}
      </div>
    </div>
  );
}
