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
  Home,
  Search,
  Folder,
  Code,
  Gift,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "../../../_components/mode-toggle";
import { usePathname } from "next/navigation";
import { LawAssistantLogo } from "../../assets/law-assistant-logo";
import { useCheckedRowsStore } from "src/store/store";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

const platformItems = [
  {
    title: "Overview",
    href: "/platform/overview",
    description: "AI-powered compliance assistance for all your needs",
    icon: PenTool,
  },
  {
    title: "How it Works",
    href: "/platform/how-it-works",
    description: "Seamless integration with your existing systems",
    icon: HelpCircle,
  },
  {
    title: "Why CodeX",
    href: "/platform/why-codex",
    description: "The leader in AI-powered compliance solutions",
    icon: Award,
  },
  {
    title: "Integrations",
    href: "/platform/integrations",
    description: "Explore our integrations with popular legal databases",
    icon: Puzzle,
  },
];
const useCasesItems = [
  {
    title: "Real Estate",
    href: "/use-cases/real-estate",
    description:
      "Ensure real estate projects adhere to zoning and building bylaws",
    icon: Home,
  },
  {
    title: "Contracts",
    href: "/use-cases/contracts",
    description: "Analyze contracts for deviations from standards and policies",
    icon: Search,
  },
  {
    title: "Environmental",
    href: "/use-cases/environmental",
    description:
      "Assess projects against environmental regulations and standards",
    icon: FileText,
  },
  {
    title: "Financial",
    href: "/use-cases/financial",
    description: "Detect suspicious transactions and ensure AML law compliance",
    icon: DollarSign,
  },
  {
    title: "HR Policy",
    href: "/use-cases/hr-policy",
    description:
      "Monitor communications for HR policy adherence and conduct issues",
    icon: Folder,
  },
  {
    title: "Best Practices",
    href: "/use-cases/software",
    description: "Verify code against best practices and company standards",
    icon: Code,
  },
];

const resourcesItems = [
  {
    title: "Blog",
    href: "/blog",
    description: "Insights and updates on compliance trends",
    icon: FileText,
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
    href: "https://calendly.com/vince-gauthier/30min?month=2024-04",
    description: "See CodeX in action with a personalized demo",
    icon: Play,
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Choose the right plan for your compliance needs",
    icon: DollarSign,
  },

  {
    title: "Contact Sales",
    href: "https://calendly.com/vince-gauthier/30min?month=2024-04",
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
    href: "/jobs",
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
