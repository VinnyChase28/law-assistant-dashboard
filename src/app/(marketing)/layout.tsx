import React from "react";

import { Cta } from "@marketing/components/cta";
import { Footer } from "@marketing/components/footer";

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
