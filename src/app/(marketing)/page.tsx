import { type Metadata } from "next";

import { CaseStudies } from "@marketing/components/case-studies";
import FlowChartHome from "@marketing/components/flow-chart/flow-chart-home";
import { Hero } from "@marketing/components/hero/hero-home";
import { HowItWorks } from "@marketing/components/how-it-works";
import { Pricing } from "@marketing/components/pricing";

import HeroHomeTwo from "./_components/hero/hero-home-two";
import { Sponsors } from "./_components/sponsors";
export const metadata: Metadata = {
  title: "Law Assistant AI - AI-Powered Compliance Automation Platform",
  description:
    "Revolutionize your compliance workflow with Law Assistant AI, the leading AI-powered platform designed to enhance compliance automation with cutting-edge technology and expert support.",
};

async function HomePage() {
  return (
    <>
      <Hero />
      <HeroHomeTwo />
      <Sponsors />
      <CaseStudies />
      <FlowChartHome />
      <HowItWorks />
      <Pricing />
    </>
  );
}

export default HomePage;
