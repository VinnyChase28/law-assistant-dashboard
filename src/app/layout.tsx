import type { Metadata } from "next";
import { cookies } from "next/headers";

import "src/styles/globals.css";
import { ThemeProvider } from "@components/theme-provider";
import { Toaster } from "@components/ui/toaster";
import { TooltipProvider } from "@components/ui/tooltip";
import Navbar from "@marketing/components/navigation/navbar";
import { TRPCReactProvider } from "src/trpc/react";

export const metadata: Metadata = {
  title: "Codex | Law Assistant AI",
  description:
    "Compliance automation platform that helps businesses to automate their legal and compliance processes.",
  metadataBase: new URL("https://lawassistant.ai"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Navbar />

              <main className="flex w-full flex-1 flex-col">{children}</main>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
