"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  UserIcon,
  Menu,
  Calendar,
  PenTool,
  HelpCircle,
  Phone,
  CreditCard,
  User,
  FileText,
  Mic,
  Mail,
  Briefcase,
  Send,
  Puzzle,
  Book,
  Megaphone,
  Play,
  DollarSign,
  ShieldCheck,
  Calculator,
  Video,
  Lock,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";
import { usePathname } from "next/navigation";
import { LawAssistantLogo } from "../../assets/law-assistant-logo";
import { useCheckedRowsStore } from "src/store/store";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

const platformItems = [
  {
    title: "Overview",
    href: "/platform/overview",
    description: "One engine for all your support channels",
    icon: PenTool,
  },
  {
    title: "How it Works",
    href: "/platform/how-it-works",
    description: "Automation that works with your existing systems",
    icon: HelpCircle,
  },
  {
    title: "Why Replicant",
    href: "/platform/why-replicant",
    description: "The leader in Contact Center Automation",
    icon: Phone,
  },
  {
    title: "Integrations",
    href: "/platform/integrations",
    description: "Explore our most common integrations",
    icon: Puzzle,
  },
];

const useCasesItems = [
  {
    title: "Appointments & Scheduling",
    href: "/use-cases/appointments-scheduling",
    description: "",
    icon: Calendar,
  },
  {
    title: "Dispatch Service Requests",
    href: "/use-cases/dispatch-service-requests",
    description: "",
    icon: Send,
  },
  {
    title: "First Notice of Loss",
    href: "/use-cases/first-notice-of-loss",
    description: "",
    icon: FileText,
  },
  {
    title: "Frequently Asked Questions",
    href: "/use-cases/faq",
    description: "",
    icon: HelpCircle,
  },
  {
    title: "Outbound Calling Reminders",
    href: "/use-cases/outbound-calling-reminders",
    description: "",
    icon: Phone,
  },
  {
    title: "Account & Order Management",
    href: "/use-cases/account-order-management",
    description: "",
    icon: User,
  },
  {
    title: "Authentication",
    href: "/use-cases/authentication",
    description: "",
    icon: Lock,
  },
  {
    title: "Billing & Payments",
    href: "/use-cases/billing-payments",
    description: "",
    icon: CreditCard,
  },
  {
    title: "Call Routing",
    href: "/use-cases/call-routing",
    description: "",
    icon: Phone,
  },
];

const resourcesItems = [
  {
    title: "Dialed In Podcast",
    href: "/resources/podcast",
    description: "",
    icon: Mic,
  },
  {
    title: "Blog",
    href: "/resources/blog",
    description: "",
    icon: FileText,
  },
  {
    title: "Guides & Reports",
    href: "/resources/guides-reports",
    description: "",
    icon: Book,
  },
  {
    title: "Events & Webinars",
    href: "/resources/events-webinars",
    description: "",
    icon: Calendar,
  },
  {
    title: "Case Studies",
    href: "/resources/case-studies",
    description: "",
    icon: FileText,
  },
  {
    title: "Newsletter",
    href: "/resources/newsletter",
    description: "",
    icon: Mail,
  },
];

const getStartedItems = [
  {
    title: "Interactive Demo",
    href: "/get-started/demo",
    description: "",
    icon: Play,
  },
  {
    title: "Pricing",
    href: "/get-started/pricing",
    description: "",
    icon: DollarSign,
  },
  {
    title: "Money Back Guarantee",
    href: "/get-started/guarantee",
    description: "",
    icon: ShieldCheck,
  },
  {
    title: "ROI Calculator",
    href: "/get-started/roi-calculator",
    description: "",
    icon: Calculator,
  },
  {
    title: "Talk to Sales",
    href: "/get-started/sales",
    description: "",
    icon: Phone,
  },
  {
    title: "Watch a Demo",
    href: "/get-started/watch-demo",
    description: "",
    icon: Video,
  },
];

const companyItems = [
  {
    title: "About",
    href: "/company/about",
    description: "",
    icon: Briefcase,
  },
  {
    title: "Careers",
    href: "/company/careers",
    description: "",
    icon: Briefcase,
  },
  {
    title: "Press",
    href: "/company/press",
    description: "",
    icon: Megaphone,
  },
  {
    title: "Contact Us",
    href: "/company/contact",
    description: "",
    icon: Mail,
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteAll } = useCheckedRowsStore();

  async function signInWithAuth0(event: React.SyntheticEvent) {
    event.preventDefault();
    deleteAll();
    await signIn("auth0", {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <header className="fixed top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
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
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex h-5 w-5 md:hidden"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">CodeX</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
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
                        <NavigationMenuLink href="/customers">
                          Customers
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          Get Started
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            <ListItem
                              title="Interactive Demo"
                              href="/get-started/demo"
                              icon={Play}
                            />
                            <ListItem
                              title="Pricing"
                              href="/get-started/pricing"
                              icon={DollarSign}
                            />
                            <ListItem
                              title="Money Back Guarantee"
                              href="/get-started/guarantee"
                              icon={ShieldCheck}
                            />
                            <ListItem
                              title="ROI Calculator"
                              href="/get-started/roi-calculator"
                              icon={Calculator}
                            />
                            <ListItem
                              title="Talk to Sales"
                              href="/get-started/sales"
                              icon={Phone}
                            />
                            <ListItem
                              title="Watch a Demo"
                              href="/get-started/watch-demo"
                              icon={Video}
                            />
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
              </SheetContent>
            </Sheet>
          </span>

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
                  <NavigationMenuLink href="/customers">
                    Customers
                  </NavigationMenuLink>
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
            <div
              className={`border ${buttonVariants({
                variant: "secondary",
              })} cursor-pointer`}
              role="button"
              onClick={signInWithAuth0}
            >
              <UserIcon className="mr-2 h-5 w-5" />
              Sign In
            </div>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

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
