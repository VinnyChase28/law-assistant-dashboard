import React from "react";

import { getServerAuthSession } from "@/server/auth";
import { Cta } from "@marketing/components/cta";
import { Footer } from "@marketing/components/footer";

import Navbar from "./_components/navigation/navbar";

// Props type definition if needed
interface MarketingLayoutProps {
  children: React.ReactNode;
  // This would come from your server-side logic
}

const MarketingLayout: React.FC<MarketingLayoutProps> = async ({
  children,
}) => {
  // Directly use server-side logic to fetch session data
  const session = await getServerAuthSession(); // Adjust as needed based on actual server-side fetching mechanism

  return (
    <>
      <Navbar session={session} />
      {children}
      <Cta />
      <Footer />
    </>
  );
};

export default MarketingLayout;
