"use client";
import { CaseStudies } from "src/app/marketing/components/case-studies";
import { HowItWorks } from "src/app/marketing/components/how-it-works";
import { Pricing } from "src/app/marketing/components/pricing";
import { Sponsors } from "src/app/marketing/components/sponsors";
import { Cta } from "src/app/marketing/components/cta";
import { ScrollToTop } from "src/app/marketing/components/scroll-to-top";
import { Hero } from "./marketing/components/hero/hero-home";
import Script from "next/script";
import Image from "next/image";
import FlowChartList from "./marketing/components/flow-chart/flow-chart-list";


function Home() {
  return (
    <>
      <Hero />
      <Sponsors />
      <CaseStudies />
      <FlowChartList />
      <HowItWorks />
      <Pricing />
      <Cta />

      <Script
        src="//js-na1.hs-scripts.com/40814956.js"
        id="hs-script-loader"
        async
        defer
        strategy="lazyOnload"
      />
      <ScrollToTop />
    </>
  );
}

export default Home;
