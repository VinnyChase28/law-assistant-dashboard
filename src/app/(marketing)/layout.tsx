import React from "react";
import Navbar from "./_components/navigation/navbar";
import { Cta } from "@marketing/components/cta";
import { Footer } from "@marketing/components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Cta />
      <Footer />
    </>
  );
};

export default MarketingLayout;
