"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCheckedRowsStore } from "src/store/store";
import { signIn } from "next-auth/react";

export default function AuthButton() {
  const { deleteAll } = useCheckedRowsStore();
  async function signInWithAuth0(event: React.SyntheticEvent) {
    event.preventDefault();
    deleteAll();
    await signIn("auth0", {
      // redirect: true,
      callbackUrl: "/dashboard",
    });
  }

  return (
    <Button onClick={signInWithAuth0} variant="outline">
      Sign in
    </Button>
  );
}
