"use client";
import React, { useState } from "react";

import { Gift } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Session } from "next-auth";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@components/mode-toggle";
import MobileAccordionNav from "@components/navigation/mobile-nav";
import { useCheckedRowsStore } from "src/store/store";

import {
  platformItems,
  useCasesItems,
  resourcesItems,
  getStartedItems,
  companyItems,
} from "@marketing/config/nav";
import { LawAssistantLogo } from "../../assets/law-assistant-logo";
import AuthButtonWrapper from "../sign-in-out";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

interface NavbarProps {
  session: Session | null; // Include null because the session might not always be present
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const pathname = usePathname();
  const isOnDashboardRoute = pathname.includes("/dashboard");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteAll } = useCheckedRowsStore();

  async function signInWithAuth0(event: React.SyntheticEvent) {
    event.preventDefault();
    deleteAll();
    await signIn("auth0", {
      callbackUrl: "/dashboard",
    });
  }

  if (isOnDashboardRoute) {
    return null;
  }

  return (
    <header className="fixed top-0 z-40 w-full bg-background dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen justify-between px-4">
          <NavigationMenuItem className="flex items-center font-bold">
            <Link href="/" passHref>
              <div className="flex items-center">
                <LawAssistantLogo />
                <span className="ml-2">CodeX</span>
              </div>
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <div className="md:hidden">
            <MobileAccordionNav />
          </div>

          {/* desktop */}
          <nav className="hidden gap-2 md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {platformItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Use Cases</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {useCasesItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Get Started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {getStartedItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}

                      <ListItem
                        title="Free Trial"
                        icon={Gift}
                        onClick={signInWithAuth0}
                        className="hover:cursor-pointer"
                      >
                        Get started with CodeX risk-free
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {resourcesItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {companyItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="hidden gap-2 md:flex">
            <AuthButtonWrapper session={session} />

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4" />
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
