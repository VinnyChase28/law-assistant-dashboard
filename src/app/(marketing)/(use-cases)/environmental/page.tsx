import { type Metadata } from "next";


import FlowChartEnvironmental from "./components/flow-chart-environmental";
export const metadata: Metadata = {
  title: "Environmental Compliance - Eco-Friendly Solutions",
  description: "Achieve environmental compliance with our AI platform. Reduce your carbon footprint. Learn how today."
};

export default function EnvironmentalPage() {
  return (
    <div>
      <main>
        <FlowChartEnvironmental />
      </main>
    </div>
  );
}
