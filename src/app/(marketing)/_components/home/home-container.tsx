import { CaseStudies } from "@marketing/components/case-studies";
import FlowChartHome from "@marketing/components/flow-chart/flow-chart-home";
import { Hero } from "@marketing/components/hero/hero-home";
import { HowItWorks } from "@marketing/components/how-it-works";
import { Pricing } from "@marketing/components/pricing";
import { ScrollToTop } from "@marketing/components/scroll-to-top";
import { Sponsors } from "@marketing/components/sponsors";

import { Cta } from "../cta";
import { Footer } from "../footer";
import Navbar from "../navigation/navbar";
import { getServerAuthSession } from "@/server/auth";

async function HomeContainer() {
  const session = await getServerAuthSession();
  return (
    <>
      <Navbar session={session} />
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

export default HomeContainer;
