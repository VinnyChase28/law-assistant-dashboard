import "src/styles/globals.css";

import { Inter as FontSans } from "next/font/google";
import { cookies } from "next/headers";
import { cn } from "src/lib/utils";
import { MainNavigation } from "@/components/main-navigation";
import { TRPCReactProvider } from "src/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip"; // Import TooltipProvider

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "flex min-h-screen items-center justify-center bg-background font-sans antialiased",
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
              {" "}
              {/* Wrap content with TooltipProvider */}
              <div className="flex w-full flex-col items-center justify-center">
                <MainNavigation />
                {children}
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
