import { type Metadata } from "next";

import { CaseStudies } from "@marketing/components/case-studies";
import { Cta } from "@marketing/components/cta";
import FlowChartHome from "@marketing/components/flow-chart/flow-chart-home";
import { Footer } from "@marketing/components/footer";
import { Hero } from "@marketing/components/hero/hero-home";
import { HowItWorks } from "@marketing/components/how-it-works";
import { Pricing } from "@marketing/components/pricing";
import { Sponsors } from "@marketing/components/sponsors";

export const metadata: Metadata = {
  title: "CodeX - AI-Powered Compliance Automation Platform",
  description:
    "Revolutionize your compliance workflow with CodeX, the leading AI-powered platform designed to enhance compliance automation with cutting-edge technology and expert support.",
};

async function HomePage() {
  return (
    <>
      <Hero />
      <Sponsors />
      <CaseStudies />
      <FlowChartHome />
      <HowItWorks />
      <Pricing />
      <Cta />
      <Footer />
    </>
  );
}

export default HomePage;
