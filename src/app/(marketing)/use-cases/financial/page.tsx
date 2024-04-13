import FlowChartFinancial from "./components/flow-chart-financial";
import { Cta } from "../../_components/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Compliance - Secure Financial Operations",
  description: "Safeguard your financial operations against compliance risks. Utilize AI for real-time insights. Get started."
};


export default function FinancialPage() {
  return (
    <div>
      <main>
        <FlowChartFinancial />
        <Cta />
      </main>
    </div>
  );
}
