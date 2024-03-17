"use client";
import { About } from "@/components/marketing/About";
import { Cta } from "@/components/marketing/Cta";
import { FAQ } from "@/components/marketing/FAQ";
import { Features } from "@/components/marketing/Features";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Newsletter } from "@/components/marketing/Newsletter";
import { Pricing } from "@/components/marketing/Pricing";
import { ScrollToTop } from "@/components/marketing/ScrollToTop";
import { Services } from "@/components/marketing/Services";
import { Sponsors } from "@/components/marketing/Sponsors";
import { Team } from "@/components/marketing/Team";
// import { Testimonials } from "@/components/marketing/Testimonials";
import Script from "next/script";
function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Sponsors />
      <Pricing />
      <HowItWorks />
      {/* <Features /> */}
      <About />

      {/* <Cta /> */}
      {/* <Testimonials /> */}
      {/* <Team /> */}

      {/* <Newsletter /> */}
      {/* <FAQ /> */}
      {/* <Footer /> */}
      {/* HubSpot Chat Script */}
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
