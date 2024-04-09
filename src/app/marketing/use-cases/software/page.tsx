import FlowChartSoftwareCompliance from "./components/flow-chart-software-compliance";
import { Cta } from "../../components/cta";

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
