import React from "react";

import { getServerAuthSession } from "@/server/auth";
import { ThemeProvider } from "@components/theme-provider";
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
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar session={session} />
        <div style={{ marginTop: "20px" }}>{children}</div>
        <Cta />
        <Footer />
      </ThemeProvider>
    </>
  );
};
export default MarketingLayout;
