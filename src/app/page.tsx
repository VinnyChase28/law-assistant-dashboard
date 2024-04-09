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

//add seo

function Home() {
  return (
    <>
      <Hero />
      <Sponsors />
      <CaseStudies />
      <Image
        src="/images/workflow.png"
        alt="compliance workflow"
        width={1920}
        height={1080}
      />
      <HowItWorks />
      <Pricing />
      <Cta />

      <Script
        src="//js-na1.hs-scripts.com/40814956.js" // Your HubSpot Script Source
        id="hs-script-loader"
        async
        defer
        strategy="lazyOnload" // Loads the script after the page has finished loading
      />
      <ScrollToTop />
    </>
  );
}

export default Home;
