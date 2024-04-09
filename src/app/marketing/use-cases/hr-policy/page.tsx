import FlowChartHrPolicy from "./components/flow-chart-hr";
import { Cta } from "../../components/cta";

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
