import { type Metadata } from "next";


import FlowChartSoftwareCompliance from "./components/flow-chart-software-compliance";

export const metadata: Metadata = {
  title: "Software Compliance - Ensure Software Integrity",
  description:
    "Guarantee your software meets compliance standards with AI. Protect your digital assets. Learn how now.",
};

export default function SoftwarePage() {
  return (
    <div>
      <main>
        <FlowChartSoftwareCompliance />
      </main>
    </div>
  );
}
