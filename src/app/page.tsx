"use client";
import { CaseStudies } from "@/components/marketing/components/case-studies";
import { HowItWorks } from "@/components/marketing/components/how-it-works";
import { Pricing } from "@/components/marketing/components/pricing";
import { Sponsors } from "@/components/marketing/components/sponsors";
import { Cta } from "@/components/marketing/components/cta";
import { ScrollToTop } from "@/components/marketing/components/scroll-to-top";
import { Hero } from "@/components/marketing/components/hero";
import Script from "next/script";

//add seo

function Home() {
  return (
    <>
      <Hero />
      <Sponsors />
      <CaseStudies />
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
