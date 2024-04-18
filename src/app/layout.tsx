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
import Navbar from "./(marketing)/_components/navigation/navbar";
import { getServerAuthSession } from "src/server/auth";
import { Home, NewspaperIcon } from "lucide-react";
import Link from "next/link";
import { LawAssistantLogo } from "./(marketing)/assets/law-assistant-logo";

export const metadata: Metadata = {
  title: "CodeX | Law Assistant AI",
  description: "CodeX Dashboard",
  openGraph: {
    title: "CodeX | Law Assistant AI",
    description: "CodeX Dashboard",
    type: "website",
  },
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
      <head>
        {" "}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {/* Main content */}
              {session ? (
                <header className="flex w-full items-center justify-between py-2 shadow-md">
                  <MainNavigation />

                  {/* This Link component for Home icon now has margin-left:auto to push everything to the right */}
                  <Link href="/" passHref>
                    <div className="flex items-center">
                      <LawAssistantLogo />
                      {/* Added span around text for better control */}
                    </div>
                  </Link>
                  <Link href="/blog" passHref>
                    <div className="flex items-center">
                      <NewspaperIcon />
                      <span className="ml-2">Blog</span>

                      {/* Added span around text for better control */}
                    </div>
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
