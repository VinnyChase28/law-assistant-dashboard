"use client";
import { CaseStudies } from "@/marketing/components/case-studies";
import { HowItWorks } from "@/marketing/components/how-it-works";
import { Pricing } from "@/marketing/components/pricing";
import { Sponsors } from "@/marketing/components/sponsors";
import { Cta } from "@/marketing/components/cta";
import { ScrollToTop } from "@/marketing/components/scroll-to-top";
import { Hero } from "@/marketing/components/hero/hero-home";
import FlowChartHome from "@/marketing/components/flow-chart/flow-chart-home";
import Script from "next/script";

function HomeContainer() {
  return (
    <>
      <Hero />
      {/* <VideoPlayer
        streamType="on-demand"
        playbackId="ELHiDecJkhfF5JJ4wUDte8JKR4NCY02Azb1iKQhXPVBQ"
      /> */}
      <Sponsors />
      <CaseStudies />
      <FlowChartHome />
      <HowItWorks />
      <Pricing />
      <Cta />
      <ScrollToTop />
    </>
  );
}

export default HomeContainer;
