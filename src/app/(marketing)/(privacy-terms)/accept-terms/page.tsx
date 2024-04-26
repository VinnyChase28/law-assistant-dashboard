"use client";
import { useState } from "react";

import Link from "next/link"; // Import the Link component from next/link
import { useRouter } from "next/navigation";

import { CheckboxWithText } from "@components/checkbox-with-text";
import { Button } from "@components/ui/button";
import { api } from "src/trpc/react";

export default function TermsAndConditions() {
  const [accepted, setAccepted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const acceptTerms = api.user.acceptTerms.useMutation();

  const handleContinue = async () => {
    setDisabled(true);
    if (accepted) {
      await acceptTerms.mutateAsync({ accepted });
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-2xl font-bold">Terms and Conditions</h1>
        {/* Terms and conditions content or summary here */}
        <CheckboxWithText
          label="I accept"
          description={
            <span>
              You agree to our{" "}
              <Link className="text-indigo-500" href="/terms-of-use">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-indigo-500" href="/privacy-policy ">
                Privacy Policy
              </Link>
              .
            </span>
          }
          checked={accepted}
          onCheckedChange={setAccepted}
        />
        <Button
          onClick={() => {
            handleContinue();
          }}
          disabled={disabled || !accepted}
          className="mt-8 rounded-md px-4 py-2 text-white disabled:opacity-50"
          variant={accepted ? "secondary" : "ghost"}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
