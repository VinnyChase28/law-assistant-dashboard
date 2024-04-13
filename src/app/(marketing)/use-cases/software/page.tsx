import FlowChartSoftwareCompliance from "./components/flow-chart-software-compliance";
import { Cta } from "../../components/cta";
import { Metadata } from "next";

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
        <Cta />
      </main>
    </div>
  );
}
