import FlowChartEnvironmental from "./components/flow-chart-environmental";
import { Cta } from "../../components/cta";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Environmental Compliance - Eco-Friendly Solutions",
  description: "Achieve environmental compliance with our AI platform. Reduce your carbon footprint. Learn how today."
};

export default function EnvironmentalPage() {
  return (
    <div>
      <main>
        <FlowChartEnvironmental />
        <Cta />
      </main>
    </div>
  );
}
