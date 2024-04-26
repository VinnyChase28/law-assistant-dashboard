import React from "react";

import { getServerAuthSession } from "@/server/auth";
import { Cta } from "@marketing/components/cta";
import { Footer } from "@marketing/components/footer";
import Navbar from "@marketing/components/navigation/navbar";


interface MarketingLayoutProps {
  children: React.ReactNode;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = async ({
  children,
}) => {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      <div style={{ marginTop: "64px" }}>{children}</div>
      <Cta />
      <Footer />
    </>
  );
};
export default MarketingLayout;
