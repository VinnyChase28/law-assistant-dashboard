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


export const metadata: Metadata = {
  title: "CodeX | Law Assistant AI",
  description: "CodeX Dashboard",
  openGraph: {
    title: "CodeX | Law Assistant AI",
    description: "CodeX Dashboard",
    type: "website",
  },
};

// Define `RootLayout` as a server component
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
              <main className="flex w-full flex-1 flex-col">{children}</main>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}