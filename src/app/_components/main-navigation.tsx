"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { ModeToggle } from "@/components/dark-mode-toggle";
import { LawAssistantLogo } from "../(marketing)/assets/law-assistant-logo";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Profile",
    href: "/dashboard/settings/",
    description: "Edit your profile",
  },
  {
    title: "Billing",
    href: "/dashboard/settings/billing",
    description: "Manage your billing information",
  },
  {
    title: "Appearance",
    href: "/dashboard/settings/appearance",
    description: "Customize the look and feel",
  },
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
    description: "Manage your notifications settings",
  },
];

export function MainNavigation() {
  return (
    <NavigationMenu className="flex w-full justify-center">
      <ModeToggle />
      <NavigationMenuList className="flex items-center space-x-4">
        {/* Dashboard */}
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* Files */}
        <NavigationMenuItem>
          <Link href="/dashboard/files" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Files
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* Logo */}
        <NavigationMenuItem>
          <Link href="/" passHref className="flex items-center justify-center">
            <LawAssistantLogo />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">CodeX</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Your very own AI legal assistant.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/help/documents" title="Installation">
                Managing documents
              </ListItem>
              <ListItem href="/help/get-started" title="Introduction">
                Getting started with the platform
              </ListItem>
              <ListItem href="/docs/primitives/prompts" title="Typography">
                Useful prompts and tips
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
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
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
