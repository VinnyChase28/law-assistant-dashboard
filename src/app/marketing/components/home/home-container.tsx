"use client";
import { CaseStudies } from "src/app/marketing/components/case-studies";
import { HowItWorks } from "src/app/marketing/components/how-it-works";
import { Pricing } from "src/app/marketing/components/pricing";
import { Sponsors } from "src/app/marketing/components/sponsors";
import { Cta } from "src/app/marketing/components/cta";
import { ScrollToTop } from "src/app/marketing/components/scroll-to-top";
import { Hero } from "../hero/hero-home";
import Script from "next/script";
import FlowChartHome from "../flow-chart/flow-chart-home";
import VideoPlayer from "../videos/video-player";

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

export default HomeContainer;
