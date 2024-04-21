import { type Metadata } from "next";

import { Pricing } from "../_components/pricing";


export const metadata: Metadata = {
  title: "Pricing",
  description: "Codex pricing",
};

export default function PricingPage() {
  return (
    <div>
      <main>
        <Pricing />
      </main>
    </div>
  );
}
