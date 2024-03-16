import { About } from "@/components/marketing/About";
import { Cta } from "@/components/marketing/Cta";
import { FAQ } from "@/components/marketing/FAQ";
import { Features } from "@/components/marketing/Features";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Navbar } from "@/components/marketing/Navbar";
import { Newsletter } from "@/components/marketing/Newsletter";
import { Pricing } from "@/components/marketing/Pricing";
import { ScrollToTop } from "@/components/marketing/ScrollToTop";
import { Services } from "@/components/marketing/Services";
import { Sponsors } from "@/components/marketing/Sponsors";
import { Team } from "@/components/marketing/Team";
import { Testimonials } from "@/components/marketing/Testimonials";
import "./App.css";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;
