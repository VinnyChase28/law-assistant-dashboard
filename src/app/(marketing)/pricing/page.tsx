import { Pricing } from "../_components/pricing";
import { Cta } from "../_components/cta";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Codex pricing",
};

export default function PricingPage() {
  return (
    <div>
      <main>
        <Pricing />
        <Cta />
      </main>
    </div>
  );
}
