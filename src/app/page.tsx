export const metadata = {
  title: "Home - Law Assistant AI",
  description: "Landing page for Law Assistant AI",
};

import Hero from "./_components/marketing/hero";
import Features from "./_components/marketing/features";
import Newsletter from "./_components/marketing/newsletter";
import Zigzag from "./_components/marketing/zigzag";
import Testimonials from "./_components/marketing/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Zigzag />
      <Testimonials />
      <Newsletter />
    </>
  );
}
