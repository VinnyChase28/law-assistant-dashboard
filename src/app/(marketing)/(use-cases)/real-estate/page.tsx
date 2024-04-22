import { type Metadata } from "next";


import FlowChartRealEstate from "./components/flow-chart-real-estate";

export const metadata: Metadata = {
  title: "Real Estate Compliance - Optimize Property Management",
  description: "Navigate real estate compliance with ease. Leverage AI for property management solutions. Explore today."
};

export default function RealEsatePage() {
  return (
    <div>
      <main>
        <FlowChartRealEstate />
      </main>
    </div>
  );
}
