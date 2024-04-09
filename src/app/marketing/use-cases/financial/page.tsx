import FlowChartFinancial from "./components/flow-chart-financial";
import { Cta } from "../../components/cta";

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
