import { type Metadata } from "next";

import { Cta } from "../_components/cta";
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
        <Cta />
      </main>
    </div>
  );
}
