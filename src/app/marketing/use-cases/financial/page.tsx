import FlowChartRealEstate from "./components/flow-chart-financial";
import { Cta } from "../../components/cta";

export default function FinancialPage() {
  return (
    <div>
      <main>
        <FlowChartRealEstate />
        <Cta />
      </main>
    </div>
  );
}
