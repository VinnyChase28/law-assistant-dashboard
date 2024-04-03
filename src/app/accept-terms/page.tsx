"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "src/trpc/react";

export default function TermsAndConditions() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();
  const acceptTerms = api.user.acceptTerms.useMutation();

  const handleAccept = async () => {
    await acceptTerms.mutateAsync();
    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Terms and Conditions</h1>
      {/* Add your terms and conditions content here */}
      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        I accept the terms and conditions
      </label>
      <button onClick={handleAccept} disabled={!accepted}>
        Accept
      </button>
    </div>
  );
}
