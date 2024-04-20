import { type Metadata } from "next";

import { Cta } from "../../_components/cta";

import FlowChartHrPolicy from "./components/flow-chart-hr";

export const metadata: Metadata = {
  title: "HR Policy Compliance - Streamline HR Processes",
  description:
    "Ensure HR policies are up-to-date and compliant with AI support. Enhance your HR workflow. Discover more.",
};

export default function HrPolicyPage() {
  return (
    <div>
      <main>
        <FlowChartHrPolicy />
        <Cta />
      </main>
    </div>
  );
}
