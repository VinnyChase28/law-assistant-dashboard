"use client";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";

import { Button } from "../ui/button";

export default function AuthButtonWrapper() {
  return (
    <SessionProvider>
      <AuthButton />
    </SessionProvider>
  );
}

function AuthButton() {
  const { data: session, status } = useSession();

  // Handle the loading state
  if (status === "loading") {
    return <Button disabled>Loading...</Button>; // Disable button while loading
  }

  if (session) {
    return (
      <Link href={"/dashboard"}>
        <Button variant="outline">Account</Button>
      </Link>
    );
  } else {
    return (
      <Link href={"/api/auth/signin"}>
        <Button variant="outline">Sign in</Button>
      </Link>
    );
  }
}
