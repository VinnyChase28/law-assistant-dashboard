"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { CheckboxWithText } from "@components/checkbox-with-text";
import { api } from "src/trpc/react";

export default function TermsAndConditions() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();
  const acceptTerms = api.user.acceptTerms.useMutation();

  const handleContinue = async () => {
    if (accepted) {
      await acceptTerms.mutateAsync({ accepted });
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 text-2xl font-bold">Terms and Conditions</h1>
        {/* Add your terms and conditions content here */}
        <CheckboxWithText
          label="I accept the terms and conditions"
          description="You agree to our Terms of Service and Privacy Policy."
          checked={accepted}
          onCheckedChange={setAccepted}
        />
        <button
          onClick={handleContinue}
          disabled={!accepted}
          className="mt-8 rounded-md px-4 py-2 text-white disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}