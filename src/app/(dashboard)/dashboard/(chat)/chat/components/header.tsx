import * as React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { Button, buttonVariants } from "@components/ui/button";

import { ChatHistory } from "./chat-history";
import { IconGitHub, IconNextChat, IconSeparator, IconVercel } from "./icons";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarToggle } from "./sidebar-toggle";
import { UserMenu } from "./user-menu";

async function UserOrLogin() {
  const session = await getServerAuthSession(); // Changed from (await auth()) as Session
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/dashboard/chat/new" rel="nofollow">
          <IconNextChat className="mr-2 size-6 dark:hidden" inverted />
          <IconNextChat className="mr-2 hidden size-6 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b from-background/10 via-background/50 to-background/80 px-4 backdrop-blur-xl">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <a
          target="_blank"
          href="https://github.com/vercel/nextjs-ai-chatbot/"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <IconGitHub />
          <span className="ml-2 hidden md:flex">GitHub</span>
        </a>
        <a
          href="https://vercel.com/templates/Next.js/nextjs-ai-chatbot"
          target="_blank"
          className={cn(buttonVariants())}
        >
          <IconVercel className="mr-2" />
          <span className="hidden sm:block">Deploy to Vercel</span>
          <span className="sm:hidden">Deploy</span>
        </a>
      </div>
    </header>
  );
}
