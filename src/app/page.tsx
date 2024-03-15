export const metadata = {
  title: "Home - Law Assistant AI",
  description: "Landing page for Law Assistant AI",
};

import { Brands } from "./_components/marketing/Brands";
import { Hero } from "./_components/marketing/Hero";
import { Features1 } from "./_components/marketing/Features1";
import { CaseStudies } from "./_components/marketing/CaseStudies";
import { Divider } from "./_components/marketing/Divider";
import { Testimonials } from "./_components/marketing/Testimonials";
import { FeaturesDiagonal } from "./_components/marketing/FeaturesDiagonal";
import { Pricing } from "./_components/marketing/Pricing";
import { Footer } from "./_components/marketing/Footer";
import { ScrollUpButton } from "./_components/marketing/ScrollUpButton";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="py-20"></div>
      <Features1 />
      <CaseStudies />
      <Divider />
      <Testimonials />
      <FeaturesDiagonal />
      <Pricing />
      <Brands />
      <Footer />
      <ScrollUpButton />
    </>
  );
}
