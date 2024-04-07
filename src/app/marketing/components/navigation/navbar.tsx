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
import { UserIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
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
    description: "Learn about our platform and its capabilities.",
  },
  {
    title: "Features",
    href: "/platform/features",
    description: "Explore the key features of our platform.",
  },
  {
    title: "Integrations",
    href: "/platform/integrations",
    description: "Discover how our platform integrates with other tools.",
  },
  {
    title: "Pricing",
    href: "/platform/pricing",
    description: "Find the right pricing plan for your needs.",
  },
];

const solutionsItems = [
  {
    title: "Use Case 1",
    href: "/solutions/use-case-1",
    description: "Learn how our platform solves specific use case 1.",
  },
  {
    title: "Use Case 2",
    href: "/solutions/use-case-2",
    description: "Discover how our platform addresses use case 2.",
  },
  {
    title: "Use Case 3",
    href: "/solutions/use-case-3",
    description: "Explore how our platform handles use case 3.",
  },
  {
    title: "Custom Solutions",
    href: "/solutions/custom",
    description: "Learn about our custom solution offerings.",
  },
];

const customersItems = [
  {
    title: "Case Studies",
    href: "/customers/case-studies",
    description: "Read success stories from our customers.",
  },
  {
    title: "Testimonials",
    href: "/customers/testimonials",
    description: "See what our customers are saying about us.",
  },
  {
    title: "Customer Support",
    href: "/customers/support",
    description: "Get help and support for your account.",
  },
  {
    title: "FAQ",
    href: "/customers/faq",
    description: "Find answers to frequently asked questions.",
  },
];

const resourcesItems = [
  {
    title: "Blog",
    href: "/resources/blog",
    description: "Read our latest blog posts and articles.",
  },
  {
    title: "Guides",
    href: "/resources/guides",
    description: "Explore our guides and tutorials.",
  },
  {
    title: "Documentation",
    href: "/resources/docs",
    description: "Access our comprehensive documentation.",
  },
  {
    title: "API Reference",
    href: "/resources/api",
    description: "Learn how to integrate with our API.",
  },
];

const companyItems = [
  {
    title: "About Us",
    href: "/company/about",
    description: "Learn about our company and mission.",
  },
  {
    title: "Careers",
    href: "/company/careers",
    description: "Explore job opportunities at our company.",
  },
  {
    title: "Press",
    href: "/company/press",
    description: "Read our latest press releases and media coverage.",
  },
  {
    title: "Contact Us",
    href: "/company/contact",
    description: "Get in touch with our team.",
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
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {platformItems.map((item) => (
                              <ListItem
                                key={item.title}
                                title={item.title}
                                href={item.href}
                              >
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {solutionsItems.map((item) => (
                              <ListItem
                                key={item.title}
                                title={item.title}
                                href={item.href}
                              >
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>Customers</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {customersItems.map((item) => (
                              <ListItem
                                key={item.title}
                                title={item.title}
                                href={item.href}
                              >
                                {item.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href="/auth/sign-in"
                          className={navigationMenuTriggerStyle()}
                        >
                          Get Started
                        </NavigationMenuLink>
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
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {solutionsItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Customers</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {customersItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/auth/sign-in"
                    className={navigationMenuTriggerStyle()}
                  >
                    Get Started
                  </NavigationMenuLink>
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
