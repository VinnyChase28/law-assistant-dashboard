import "src/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { cookies } from "next/headers";
import { cn } from "src/lib/utils";
import { MainNavigation } from "@/components/main-navigation";
import { TRPCReactProvider } from "src/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserNav } from "./_components/user-nav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
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
              {/* Header container */}
              <header className="flex w-full items-center justify-between px-4 py-2 shadow-md">
                <MainNavigation />
                <UserNav />
              </header>

              {/* Main content */}
              <main className="flex w-full flex-1 flex-col">{children}</main>
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}