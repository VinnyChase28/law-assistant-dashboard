import { cookies } from "next/headers";
import "src/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "src/lib/utils";
import { TRPCReactProvider } from "src/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { MainNavigation } from "./_components/marketing/marketing-navigation";
import { UserNav } from "./_components/user-nav";
import { LawAssistantLogo } from "./_components/marketing/assets/logos/LawAssistantLogo";

export const metadata: Metadata = {
  title: "Casy | Law Assistant AI",
  description: "Casy AI Dashboard",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Define `RootLayout` as a server component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head />
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {/* Main content */}
              <header className="flex w-full items-center justify-between px-4 py-2 shadow-md">
                <MainNavigation />
                <div className="flex grow basis-0 items-center justify-center pr-3 lg:justify-end">
                  <div className="mr-2 text-6xl ">
                    <LawAssistantLogo />
                  </div>
                  <div className="font-['Inter'] text-xl font-bold ">
                    lawassistant.ai
                  </div>
                </div>
                <UserNav />
              </header>
              <main className="flex w-full flex-1 flex-col">{children}</main>
              {/* Toast notifications */}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
