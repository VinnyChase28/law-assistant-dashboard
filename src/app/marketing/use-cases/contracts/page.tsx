import FlowChartContract from "./components/flow-chart-contracts";
import { Cta } from "../../components/cta";
import { Metadata } from "next";

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
        <Cta />
      </main>
    </div>
  );
}
