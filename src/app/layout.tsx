import { cookies } from "next/headers";
import "src/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "src/lib/utils";
import { TRPCReactProvider } from "src/trpc/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { MainNavigation } from "./_components/main-navigation";
import { UserNav } from "./_components/user-nav";
import { Navbar } from "./_components/marketing/Navbar";
import { getServerAuthSession } from "src/server/auth";
import { Home, Newspaper } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CodeX | Law Assistant AI",
  description: "CodeX AI Dashboard",
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
              {/* Main content */}
              {session ? (
                <header className="flex w-full items-center justify-between px-4 py-2 shadow-md">
                  <MainNavigation />

                  <Link href="/">
                    <Home className="h-5 w-5 cursor-pointer" />
                  </Link>
                  <Link href="/news">
                    <Newspaper className="h-5 w-5 cursor-pointer" />
                  </Link>
                  <UserNav />
                </header>
              ) : (
                <header className="flex w-full items-center justify-between px-4 py-2 shadow-md">
                  <Navbar />
                </header>
              )}

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
