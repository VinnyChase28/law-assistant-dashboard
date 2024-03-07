// Import required modules, including `getServerAuthSession` from your auth setup
import { getServerAuthSession } from "src/server/auth";
import { cookies } from "next/headers";
import "src/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "src/lib/utils";
import { MainNavigation } from "@/components/main-navigation";
import { TRPCReactProvider } from "src/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserNav } from "@/components/user-nav";
import ChatBubble from "@/components/bubble/bubble";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casy",
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
  // Get session server-side
  const session = await getServerAuthSession();

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
                {/* add a header for non authed pages*/}
              </header>
              {/* Main content */}
              <main className="flex w-full flex-1 flex-col">{children}</main>
              <ChatBubble />
              {/* Toast notifications */}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
