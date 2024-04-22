import { type Metadata } from "next";


import FlowChartContract from "./components/flow-chart-contracts";

export const metadata: Metadata = {
  title: "Contracts Compliance - Simplify Your Legal Processes",
  description:
    "Streamline contract management with AI-driven insights. Ensure legal compliance effortlessly. Explore now.",
};

export default function ContractPage() {
  return (
    <div>
      <main>
        <FlowChartContract />
      </main>
    </div>
  );
}
