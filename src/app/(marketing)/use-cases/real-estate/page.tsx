import FlowChartRealEstate from "./components/flow-chart-real-estate";
import { Cta } from "../../components/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Compliance - Optimize Property Management",
  description: "Navigate real estate compliance with ease. Leverage AI for property management solutions. Explore today."
};

export default function RealEsatePage() {
  return (
    <div>
      <main>
        <FlowChartRealEstate />
        <Cta />
      </main>
    </div>
  );
}
