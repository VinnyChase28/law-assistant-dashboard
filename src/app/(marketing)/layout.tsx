import { Footer } from "@marketing/components/footer";
import { Cta } from "@marketing/components/cta";
import React from "react";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Cta />
      <Footer />
    </>
  );
};

export default MarketingLayout;
