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
  FileText,
  Mail,
  Briefcase,
  Puzzle,
  Book,
  Megaphone,
  Play,
  DollarSign,
  Award,
  Eye,
  Search,
  Folder,
  BookOpen,
  AlertTriangle,
  Gift,
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
    href: "/marketing/platform/overview",
    description: "AI-powered compliance assistance for all your needs",
    icon: PenTool,
  },
  {
    title: "How it Works",
    href: "/marketing/platform/how-it-works",
    description: "Seamless integration with your existing systems",
    icon: HelpCircle,
  },
  {
    title: "Why CodeX",
    href: "/marketing/platform/why-codex",
    description: "The leader in AI-powered compliance solutions",
    icon: Award,
  },
  {
    title: "Integrations",
    href: "/marketing/platform/integrations",
    description: "Explore our integrations with popular legal databases",
    icon: Puzzle,
  },
];
const useCasesItems = [
  {
    title: "Regulatory Monitoring",
    href: "/use-cases/regulatory-monitoring",
    description: "Stay up-to-date with the latest regulations",
    icon: Eye,
  },
  {
    title: "Compliance Research",
    href: "/use-cases/compliance-research",
    description: "Find relevant compliance information quickly",
    icon: Search,
  },
  {
    title: "Compliance Reporting",
    href: "/use-cases/compliance-reporting",
    description: "Generate comprehensive compliance reports",
    icon: FileText,
  },
  {
    title: "Policy Management",
    href: "/use-cases/policy-management",
    description: "Manage and distribute compliance policies effectively",
    icon: Folder,
  },
  {
    title: "Compliance Training",
    href: "/use-cases/compliance-training",
    description: "Deliver engaging compliance training to your team",
    icon: BookOpen,
  },
  {
    title: "Risk Assessment",
    href: "/use-cases/risk-assessment",
    description: "Identify and mitigate compliance risks proactively",
    icon: AlertTriangle,
  },
];
const resourcesItems = [
  {
    title: "Compliance Blog",
    href: "/resources/blog",
    description: "Insights and updates on compliance trends",
    icon: FileText,
  },
  {
    title: "Compliance Guides",
    href: "/resources/guides",
    description: "In-depth guides on key compliance topics",
    icon: Book,
  },
  {
    title: "Webinars & Events",
    href: "/resources/events-webinars",
    description: "Learn from compliance experts online and in-person",
    icon: Calendar,
  },
  {
    title: "Case Studies",
    href: "/resources/case-studies",
    description: "See how CodeX helps organizations stay compliant",
    icon: FileText,
  },
  {
    title: "Compliance Newsletter",
    href: "/resources/newsletter",
    description: "Get the latest compliance news delivered to your inbox",
    icon: Mail,
  },
];
const getStartedItems = [
  {
    title: "Request a Demo",
    href: "/get-started/request-demo",
    description: "See CodeX in action with a personalized demo",
    icon: Play,
  },
  {
    title: "Pricing",
    href: "/get-started/pricing",
    description: "Choose the right plan for your compliance needs",
    icon: DollarSign,
  },
  {
    title: "Free Trial",
    href: "/get-started/free-trial",
    description: "Get started with CodeX risk-free",
    icon: Gift,
  },
  {
    title: "Contact Sales",
    href: "/get-started/contact-sales",
    description: "Discuss your compliance needs with our experts",
    icon: Phone,
  },
];

const companyItems = [
  {
    title: "About",
    href: "/company/about",
    description: "Learn about our mission and team",
    icon: Briefcase,
  },
  {
    title: "Careers",
    href: "/company/careers",
    description: "Join us in revolutionizing compliance with AI",
    icon: Briefcase,
  },
  {
    title: "Press",
    href: "/company/press",
    description: "Read the latest news and press releases about CodeX",
    icon: Megaphone,
  },
  {
    title: "Contact Us",
    href: "/company/contact",
    description: "Get in touch with our team",
    icon: Mail,
  },
];

const Navbar = () => {
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